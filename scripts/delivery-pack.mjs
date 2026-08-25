#!/usr/bin/env node
// SkillSync "8 PM delivery pack" — the post-session fulfilment machine.
//
//   node scripts/delivery-pack.mjs            full run: pull -> cert -> drive -> hubspot -> email
//   node scripts/delivery-pack.mjs --check    connectivity self-test only (no writes, no sends)
//   node scripts/delivery-pack.mjs --dry-run  pull + plan, but no cert/drive/hubspot/email writes
//
// What a full run does (idempotent — safe to re-run any number of times):
//   1. Pull captured Razorpay payments (test or live keys) from the last LOOKBACK_DAYS.
//   2. Upsert each into Supabase `registrations` (keyed by payment_id).
//   3. For every registration not yet emailed:
//        a. issue a PARTICIPATION certificate (via certificate.mjs --type participation)
//        b. grant their email read access to the session-date folder in Drive (SKILLSYNC/<date>)
//        c. upsert the contact in HubSpot (lifecycle=customer, program, enrollment status)
//        d. email the 3-link pack from MAIL_FROM via Brevo; stamp emailed_at
//   Failures in one stage stop THAT registrant only; the stamp columns record progress.
//
// Env (repo-root .env): RAZORPAY_KEY_ID/SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
// BREVO_SMTP_USER/PASS, MAIL_FROM, HUBSPOT_TOKEN (optional — skips CRM sync if absent),
// GDRIVE_SA_KEY_PATH (default .secrets/gdrive-sa.json), DRIVE_ROOT_NAME (default SKILLSYNC),
// SITE_URL. Secrets are never printed.

import { config as loadEnv } from "dotenv";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import nodemailer from "nodemailer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: path.join(ROOT, ".env"), override: false });

const argvFlags = new Set(process.argv.slice(2));
const CHECK = argvFlags.has("--check");
const DRY = argvFlags.has("--dry-run");
const LOOKBACK_DAYS = Number(process.env.DELIVERY_LOOKBACK_DAYS || 3);

const need = (n) => {
  const v = process.env[n];
  if (!v) throw new Error(`Missing env var ${n} (repo-root .env)`);
  return v;
};
const log = (s) => console.log(s);

// ---------- Razorpay ----------
function rzpAuth() {
  return "Basic " + Buffer.from(`${need("RAZORPAY_KEY_ID")}:${need("RAZORPAY_KEY_SECRET")}`).toString("base64");
}
async function fetchPayments() {
  const to = Math.floor(Date.now() / 1000);
  const from = to - LOOKBACK_DAYS * 86400;
  const res = await fetch(`https://api.razorpay.com/v1/payments?from=${from}&to=${to}&count=100`, {
    headers: { Authorization: rzpAuth() },
  });
  if (!res.ok) throw new Error(`Razorpay list failed: HTTP ${res.status} ${await res.text()}`);
  const { items = [] } = await res.json();
  return items.filter((p) => p.status === "captured");
}
function classifyProgram(p) {
  const rupees = (p.amount || 0) / 100;
  const hay = `${p.description || ""} ${JSON.stringify(p.notes || {})}`.toLowerCase();
  if (rupees <= 5000) return "workshop";
  if (hay.includes("engineer")) return "ai_engineer";
  if (hay.includes("generalist")) return "ai_generalist";
  return "accelerator";
}
function extractName(p) {
  const notes = p.notes || {};
  for (const k of Object.keys(notes)) {
    if (/full\s*_?\s*name|^name$/i.test(k) && notes[k]) return String(notes[k]).trim();
  }
  return (p.email || "student").split("@")[0];
}

// ---------- Supabase ----------
const sb = () => ({
  apikey: need("SUPABASE_SERVICE_ROLE_KEY"),
  Authorization: `Bearer ${need("SUPABASE_SERVICE_ROLE_KEY")}`,
  "Content-Type": "application/json",
});
async function upsertRegistration(row) {
  const res = await fetch(`${need("SUPABASE_URL")}/rest/v1/registrations?on_conflict=payment_id`, {
    method: "POST",
    headers: { ...sb(), Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`registrations upsert failed: HTTP ${res.status} ${await res.text()}`);
  return (await res.json())[0];
}
async function pendingRegistrations() {
  const res = await fetch(`${need("SUPABASE_URL")}/rest/v1/registrations?emailed_at=is.null&select=*`, { headers: sb() });
  if (!res.ok) throw new Error(`registrations list failed: HTTP ${res.status}`);
  return res.json();
}
async function stamp(id, patch) {
  const res = await fetch(`${need("SUPABASE_URL")}/rest/v1/registrations?id=eq.${id}`, {
    method: "PATCH", headers: sb(), body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`registrations stamp failed: HTTP ${res.status}`);
}

// ---------- Google Drive (service account, JWT — no SDK) ----------
function saKey() {
  const p = process.env.GDRIVE_SA_KEY_PATH || path.join(ROOT, ".secrets", "gdrive-sa.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}
async function driveToken() {
  const key = saKey();
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: key.client_email, scope: "https://www.googleapis.com/auth/drive",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
  })}`;
  const sig = crypto.createSign("RSA-SHA256").update(unsigned).sign(key.private_key).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
  });
  if (!res.ok) throw new Error(`Drive token failed: HTTP ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}
async function driveApi(token, pathAndQuery, init = {}) {
  const res = await fetch(`https://www.googleapis.com/drive/v3/${pathAndQuery}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(`Drive ${pathAndQuery} failed: HTTP ${res.status} ${await res.text()}`);
  return res.json();
}
async function findRootFolder(token) {
  const name = process.env.DRIVE_ROOT_NAME || "SKILLSYNC";
  const q = encodeURIComponent(`name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`);
  const { files } = await driveApi(token, `files?q=${q}&fields=files(id,name)&pageSize=5`);
  if (!files?.length) throw new Error(`Drive folder '${name}' not found — is it shared with the service account?`);
  return files[0];
}
async function sessionFolder(token, rootId, dateStr) {
  const q = encodeURIComponent(`name='${dateStr}' and '${rootId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`);
  const { files } = await driveApi(token, `files?q=${q}&fields=files(id)&pageSize=2`);
  if (files?.length) return files[0].id;
  const created = await driveApi(token, `files?fields=id`, {
    method: "POST",
    body: JSON.stringify({ name: dateStr, mimeType: "application/vnd.google-apps.folder", parents: [rootId] }),
  });
  return created.id;
}
async function grantReader(token, fileId, email) {
  await driveApi(token, `files/${fileId}/permissions?sendNotificationEmail=false&fields=id`, {
    method: "POST",
    body: JSON.stringify({ role: "reader", type: "user", emailAddress: email }),
  });
}

// ---------- HubSpot ----------
async function hubspotUpsert(reg) {
  const token = process.env.HUBSPOT_TOKEN;
  if (!token) return "skipped (no HUBSPOT_TOKEN)";
  const [firstname, ...rest] = String(reg.student_name || reg.email.split("@")[0]).split(/\s+/);
  const props = {
    email: reg.email,
    firstname,
    lastname: rest.join(" ") || "",
    lifecyclestage: "customer",
    program: { workshop: "2-Day AI Workshop", ai_generalist: "AI Generalist Accelerator", ai_engineer: "AI Engineer Accelerator" }[reg.program] || "Undecided",
    enrollment_status: `Paid ₹${reg.amount_inr} — ${reg.program} — ${String(reg.paid_at).slice(0, 10)} — cert ${reg.cert_no || "pending"}`,
  };
  const h = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const upd = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(reg.email)}?idProperty=email`, {
    method: "PATCH", headers: h, body: JSON.stringify({ properties: props }),
  });
  if (upd.ok) return "updated";
  if (upd.status === 404) {
    const crt = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST", headers: h, body: JSON.stringify({ properties: props }),
    });
    if (!crt.ok) throw new Error(`HubSpot create failed: HTTP ${crt.status} ${await crt.text()}`);
    return "created";
  }
  throw new Error(`HubSpot update failed: HTTP ${upd.status} ${await upd.text()}`);
}

// ---------- Email ----------
async function sendPack(reg, links) {
  const tx = nodemailer.createTransport({
    host: "smtp-relay.brevo.com", port: 587, secure: false,
    auth: { user: need("BREVO_SMTP_USER"), pass: need("BREVO_SMTP_PASS") },
  });
  const info = await tx.sendMail({
    from: process.env.MAIL_FROM || `"SkillSync" <${need("BREVO_SMTP_USER")}>`,
    to: reg.email,
    subject: `Your SkillSync session pack — certificate, recording & notes`,
    text: [
      `Hi ${reg.student_name || "there"},`,
      ``,
      `Thank you for registering for the SkillSync AI Masterclass. Here is everything from your session:`,
      ``,
      `1. Certificate of participation (${reg.cert_no}): ${links.verifyUrl}`,
      `2. Lecture recording & notes (Google Drive): ${links.driveUrl}`,
      `   (Access is granted to THIS email address only — open while signed in to it.)`,
      ``,
      `Next step: the AI Generalist / AI Engineer Accelerator cohorts start soon.`,
      `Reply to this email and our team will help you pick your track.`,
      ``,
      `— Team SkillSync · ${process.env.SITE_URL || "https://infra-sync.online"}`,
    ].join("\n"),
  });
  if (!/^2\d\d/.test(info.response || "")) throw new Error(`SMTP not accepted: ${info.response}`);
}

// ---------- main ----------
if (CHECK) {
  log("— connectivity self-test (no writes) —");
  const pays = await fetchPayments();
  log(`Razorpay: OK — ${pays.length} captured payment(s) in last ${LOOKBACK_DAYS} day(s)`);
  const regsRes = await fetch(`${need("SUPABASE_URL")}/rest/v1/registrations?select=id&limit=1`, { headers: sb() });
  log(`Supabase registrations table: ${regsRes.ok ? "OK" : `MISSING (HTTP ${regsRes.status}) — run infra/supabase-registrations.sql`}`);
  try {
    const t = await driveToken();
    const root = await findRootFolder(t);
    log(`Drive: OK — folder '${root.name}' (${root.id.slice(0, 8)}…) reachable as service account`);
  } catch (e) { log(`Drive: FAIL — ${e.message}`); }
  if (process.env.HUBSPOT_TOKEN) {
    const hs = await fetch("https://api.hubapi.com/crm/v3/objects/contacts?limit=1", { headers: { Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}` } });
    log(`HubSpot: ${hs.ok ? "OK" : `FAIL (HTTP ${hs.status})`}`);
  } else log("HubSpot: skipped (no token)");
  log(`Brevo sender: ${process.env.MAIL_FROM || "(fallback smtp user)"}`);
  process.exit(0);
}

log(`[1/3] pulling captured Razorpay payments (last ${LOOKBACK_DAYS} days)…`);
const payments = await fetchPayments();
log(`      ${payments.length} captured payment(s)`);
for (const p of payments) {
  if (!p.email) { log(`      skip ${p.id} — no email on payment`); continue; }
  const row = {
    payment_id: p.id,
    email: String(p.email).toLowerCase(),
    student_name: extractName(p),
    phone: p.contact || null,
    program: classifyProgram(p),
    amount_inr: (p.amount || 0) / 100,
    paid_at: new Date(p.created_at * 1000).toISOString(),
    session_date: new Date(p.created_at * 1000).toLocaleDateString("en-CA"),
  };
  if (DRY) { log(`      DRY: would upsert ${row.payment_id} ${row.email} ${row.program} ₹${row.amount_inr}`); continue; }
  await upsertRegistration(row);
}

if (DRY) { log("DRY RUN complete — no deliveries attempted."); process.exit(0); }

log(`[2/3] processing pending registrations…`);
const pending = await pendingRegistrations();
log(`      ${pending.length} pending`);
let delivered = 0, failed = 0;
const token = pending.length ? await driveToken() : null;
const rootId = pending.length ? (await findRootFolder(token)).id : null;

for (const reg of pending) {
  try {
    // a) participation certificate (idempotent-ish: reuse cert_no if already stamped)
    let certNo = reg.cert_no;
    if (!certNo) {
      const out = execFileSync(process.execPath, [
        path.join(ROOT, "scripts", "certificate.mjs"),
        "--name", reg.student_name || reg.email.split("@")[0],
        "--email", reg.email,
        "--program", ["workshop", "ai_generalist", "ai_engineer"].includes(reg.program) ? reg.program : "workshop",
        "--type", "participation",
      ], { encoding: "utf8", cwd: path.join(ROOT, "scripts") }); // no --send: pack email below carries the links
      certNo = (out.match(/SSC-\d{4}-\d{4}/) || [])[0];
      if (!certNo) throw new Error("certificate.mjs produced no cert number");
      await stamp(reg.id, { cert_no: certNo });
    }
    // b) Drive grant on the session-date folder
    if (!reg.drive_granted_at) {
      const folderId = await sessionFolder(token, rootId, reg.session_date || new Date().toLocaleDateString("en-CA"));
      await grantReader(token, folderId, reg.email);
      reg._driveFolderId = folderId;
      await stamp(reg.id, { drive_granted_at: new Date().toISOString() });
    }
    // c) HubSpot
    if (!reg.hubspot_synced_at) {
      const r = await hubspotUpsert({ ...reg, cert_no: certNo });
      if (!String(r).startsWith("skipped")) await stamp(reg.id, { hubspot_synced_at: new Date().toISOString() });
      log(`      ${reg.email}: hubspot ${r}`);
    }
    // d) the pack email
    const folderId = reg._driveFolderId || (await sessionFolder(token, rootId, reg.session_date || new Date().toLocaleDateString("en-CA")));
    await sendPack({ ...reg, cert_no: certNo }, {
      verifyUrl: `${process.env.SITE_URL || "https://infra-sync.online"}/verify/${certNo}`,
      driveUrl: `https://drive.google.com/drive/folders/${folderId}`,
    });
    await stamp(reg.id, { emailed_at: new Date().toISOString() });
    delivered++;
    log(`      ✔ ${reg.email} — cert ${certNo}, drive granted, pack emailed`);
  } catch (e) {
    failed++;
    log(`      ✘ ${reg.email} — ${e.message.slice(0, 200)}`);
  }
}
log(`[3/3] done: ${delivered} delivered, ${failed} failed, ${pending.length - delivered - failed} untouched`);
