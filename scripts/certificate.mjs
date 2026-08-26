#!/usr/bin/env node
// SkillSync completion certificates — generate + register + (optionally) email.
//
//   node scripts/certificate.mjs --test
//     Idempotent end-to-end test: cert SSC-<year>-0000 for "Test Student",
//     rendered to PDF+PNG, registered in Supabase, emailed via Brevo SMTP to
//     the founder's own inbox (FOUNDER_EMAIL, fallback BREVO_SMTP_USER). No real recipients.
//
//   node scripts/certificate.mjs --name "Full Name" --email s@x.in \
//        --program ai_generalist [--cohort "Sep 2026"] [--send]
//     Real issue: allocates the next SSC-<year>-NNNN, registers, sends only
//     with --send (human-triggered per AGENTS.md; mark emailed_at on success).
//
// Env (repo-root .env): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
// BREVO_SMTP_USER, BREVO_SMTP_PASS. SITE_URL overrides the verify-link base
// (default http://localhost:3000). Secrets are never printed.
// Schema: infra/supabase-certificates.sql · Issuer: SkillSync · completion only.

import { config as loadEnv } from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import nodemailer from "nodemailer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: path.join(ROOT, ".env"), override: false });

const PROGRAMS = {
  workshop: "2-Day AI Workshop",
  ai_generalist: "AI Generalist Accelerator",
  ai_engineer: "AI Engineer Accelerator",
};

function need(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var ${name} — fill it in the repo-root .env (Notepad).`);
  return v;
}

function parseArgs(argv) {
  const a = { send: false, test: false };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k === "--test") a.test = true;
    else if (k === "--send") a.send = true;
    else if (k.startsWith("--")) {
      const key = k.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) throw new Error(`Flag ${k} needs a value`);
      a[key] = next;
      i++;
    }
  }
  return a;
}

const sbHeaders = () => ({
  apikey: need("SUPABASE_SERVICE_ROLE_KEY"),
  Authorization: `Bearer ${need("SUPABASE_SERVICE_ROLE_KEY")}`,
  "Content-Type": "application/json",
});

async function allocateCertNo(year) {
  const url = `${need("SUPABASE_URL")}/rest/v1/certificates?cert_no=like.SSC-${year}-*&select=cert_no`;
  const res = await fetch(url, { headers: sbHeaders() });
  if (!res.ok) throw new Error(`Supabase list failed: HTTP ${res.status}`);
  const rows = await res.json();
  let max = 0;
  for (const r of rows) {
    const m = /SSC-\d{4}-(\d{4})$/.exec(r.cert_no);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  }
  return `SSC-${year}-${String(max + 1).padStart(4, "0")}`; // 0000 reserved for --test
}

async function registerCert(row) {
  const res = await fetch(`${need("SUPABASE_URL")}/rest/v1/certificates?on_conflict=cert_no`, {
    method: "POST",
    headers: { ...sbHeaders(), Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase upsert failed: HTTP ${res.status} ${await res.text()}`);
  return (await res.json())[0];
}

async function markEmailed(certNo) {
  const res = await fetch(
    `${need("SUPABASE_URL")}/rest/v1/certificates?cert_no=eq.${encodeURIComponent(certNo)}`,
    { method: "PATCH", headers: sbHeaders(), body: JSON.stringify({ emailed_at: new Date().toISOString() }) }
  );
  if (!res.ok) throw new Error(`Supabase emailed_at patch failed: HTTP ${res.status}`);
}

function certificateHtml({ studentName, programLabel, issuedDate, certNo, cohort, verifyUrl, kind = "completion" }) {
  const kindTitle = kind === "participation" ? "Certificate of Participation" : "Certificate of Completion";
  const kindVerb = kind === "participation" ? "participated in" : "has successfully completed";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @page { size: A4 landscape; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 297mm; height: 210mm; font-family: "Segoe UI", Inter, Arial, sans-serif;
         background: #F4F2EC; color: #0A0E14; }
  .frame { width: 100%; height: 100%; padding: 14mm; display: flex; }
  .card { flex: 1; border: 1.2mm solid #0A0E14; border-radius: 4mm; padding: 14mm 16mm;
          display: flex; flex-direction: column; position: relative; background: #FDFCF9; }
  .brand { font-size: 9mm; font-weight: 700; letter-spacing: 0.35em; color: #4F7CFF; }
  .brand small { display: block; font-size: 3.2mm; letter-spacing: 0.12em; color: #8A8F98;
                 font-weight: 500; margin-top: 1.5mm; }
  .title { margin-top: 12mm; font-size: 12mm; font-weight: 600; }
  .sub { margin-top: 4mm; font-size: 4.2mm; color: #8A8F98; }
  .name { margin-top: 8mm; font-size: 16mm; font-weight: 700; border-bottom: 0.5mm solid #0A0E14;
          display: inline-block; padding-bottom: 2mm; align-self: flex-start; }
  .prog { margin-top: 8mm; font-size: 5.5mm; }
  .prog strong { color: #4F7CFF; }
  .foot { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end;
          font-size: 3.6mm; color: #8A8F98; }
  .sig { text-align: left; }
  .sig .line { border-top: 0.4mm solid #0A0E14; padding-top: 1.5mm; color: #0A0E14;
               font-size: 4mm; margin-bottom: 1mm; }
  .meta { text-align: right; line-height: 1.8; }
  .code { font-family: Consolas, "JetBrains Mono", monospace; color: #0A0E14; font-weight: 600; }
  .legal { position: absolute; bottom: 5mm; left: 0; right: 0; text-align: center;
           font-size: 2.8mm; color: #8A8F98; }
</style></head><body>
  <div class="frame"><div class="card">
    <div class="brand">SKILLSYNC<small>AI EDUCATION · LIVE COHORT PROGRAMS</small></div>
    <div class="title">${kindTitle}</div>
    <div class="sub">This certifies that</div>
    <div class="name">${esc(studentName)}</div>
    <div class="prog">${kindVerb} the <strong>${esc(programLabel)}</strong>${
      cohort ? ` · cohort ${esc(cohort)}` : ""
    }</div>
    <div class="foot">
      <div class="sig"><div class="line">Program Director, SkillSync</div>Authorized signatory</div>
      <div class="meta">
        Issued ${esc(issuedDate)}<br>
        Certificate <span class="code">${esc(certNo)}</span><br>
        Verify: ${esc(verifyUrl)}
      </div>
    </div>
    <div class="legal">This certificate states ${kind} of the program only. It does not constitute an accreditation or professional qualification.</div>
  </div></div>
</body></html>`;
}

async function render(html, base) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 906 }, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.pdf({ path: `${base}.pdf`, format: "A4", landscape: true, printBackground: true });
    await page.screenshot({ path: `${base}.png`, fullPage: true });
  } finally {
    await browser.close();
  }
}

async function sendEmail({ to, certNo, studentName, programLabel, verifyUrl, pdfPath, pngPath, kind = "completion" }) {
  const user = need("BREVO_SMTP_USER");
  const tx = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: { user, pass: need("BREVO_SMTP_PASS") },
  });
  return tx.sendMail({
    from: process.env.MAIL_FROM || `"SkillSync Certificates" <${user}>`,
    to,
    subject: `Your SkillSync certificate of ${kind} — ${certNo}`,
    text: [
      `Hi ${studentName},`,
      ``,
      `Congratulations — you're certified! Attached is your SkillSync certificate of`,
      `${kind} for the ${programLabel}.`,
      ``,
      `Certificate code: ${certNo}`,
      `Public verification page: ${verifyUrl}`,
      ``,
      `This certificate states ${kind} of the program only.`,
      ``,
      `— Team SkillSync`,
    ].join("\n"),
    attachments: [
      { filename: `SkillSync-Certificate-${certNo}.pdf`, path: pdfPath },
      { filename: `SkillSync-Certificate-${certNo}.png`, path: pngPath },
    ],
  });
}

const args = parseArgs(process.argv);
const year = new Date().getFullYear();
const cert = args.test
  ? { studentName: "Test Student", email: process.env.FOUNDER_EMAIL || need("BREVO_SMTP_USER"), program: "ai_generalist",
      cohort: "Sep 2026", certNo: `SSC-${year}-0000`, send: true }
  : {
      studentName: args.name, email: args.email, program: args.program,
      cohort: args.cohort || null, send: args.send,
      certNo: null,
    };
cert.kind = args.type === "participation" ? "participation" : "completion";

if (!cert.studentName || !cert.program || !PROGRAMS[cert.program])
  throw new Error(`Usage: node certificate.mjs --test | --name ".." --email .. --program [${Object.keys(PROGRAMS).join("|")}] [--cohort ".."] [--send]`);
if (cert.send && !cert.email) throw new Error("--send requires an --email recipient");
if (!cert.certNo) cert.certNo = await allocateCertNo(year);

const issuedDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const issuedIso = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD local — explicit so cert == verify page even across UTC midnight
const siteUrl = process.env.SITE_URL || "http://localhost:3000";
const verifyUrl = `${siteUrl}/verify/${cert.certNo}`;

// 1) Register in Supabase
const row = await registerCert({
  cert_no: cert.certNo,
  student_name: cert.studentName,
  program: cert.program,
  cohort: cert.cohort,
  issued_at: issuedIso,
  kind: cert.kind, // participation | completion (verify page renders accordingly)
});
console.log(`[1/3] Supabase registered: ${row.cert_no} (id ${row.id.slice(0, 8)}…, issued ${row.issued_at})`);

// 2) Render PDF + PNG
const outDir = path.join(ROOT, "scripts", "out", "certificates");
fs.mkdirSync(outDir, { recursive: true });
const base = path.join(outDir, cert.certNo);
await render(
  certificateHtml({ studentName: cert.studentName, programLabel: PROGRAMS[cert.program], issuedDate, certNo: cert.certNo, cohort: cert.cohort, verifyUrl, kind: cert.kind }),
  base
);
for (const ext of ["pdf", "png"]) {
  const st = fs.statSync(`${base}.${ext}`);
  if (st.size < 5000) throw new Error(`${ext} render suspiciously small (${st.size} bytes)`);
  console.log(`[2/3] rendered ${cert.certNo}.${ext} (${Math.round(st.size / 1024)} KB)`);
}

// 3) Email (test mode → founder's own inbox only; real students only with --send)
if (cert.send) {
  const info = await sendEmail({
    to: cert.email, certNo: cert.certNo, studentName: cert.studentName,
    programLabel: PROGRAMS[cert.program], verifyUrl, pdfPath: `${base}.pdf`, pngPath: `${base}.png`, kind: cert.kind,
  });
  if (!/^(250|2\d\d)/.test(info.response || "")) throw new Error(`SMTP not accepted: ${info.response}`);
  await markEmailed(cert.certNo);
  console.log(`[3/3] emailed via Brevo — SMTP "${info.response}" · recipient is ${args.test ? "the founder inbox (Brevo account address)" : cert.email} · emailed_at set`);
} else {
  console.log(`[3/3] email skipped (no --send)`);
}
console.log(`DONE — ${cert.certNo} · verify at ${verifyUrl}`);
