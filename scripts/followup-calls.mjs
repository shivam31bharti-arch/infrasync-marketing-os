// Staying Ahead — follow-up call dispatcher (agent 244918)
// Calls leads the sales team couldn't reach, and gentle follow-ups for
// "not interested" leads. HUMAN-TRIGGERED only (AGENTS.md ops rule) — run it
// yourself after the sales pass. Zero dependencies: Node 18+ fetch only.
//
// Usage (from repo root):
//   node scripts/followup-calls.mjs --list                     show eligible leads
//   node scripts/followup-calls.mjs --mark +91XXXXXXXXXX missed           flag a lead (sales team couldn't reach)
//   node scripts/followup-calls.mjs --mark +91XXXXXXXXXX not_interested   flag a lead (said no, follow up later)
//   node scripts/followup-calls.mjs --dry-run                  show who WOULD be called
//   node scripts/followup-calls.mjs                            dispatch calls to all eligible leads
//
// Eligible = subscribers with meta.sales_call_status in (missed, not_interested)
//            and no meta.followup_called_at stamp and consent=true.
// After dispatch each row is stamped (idempotent — never double-calls).
// Call outcomes arrive by email (post-call action on the agent) to
// marketing.od@growthschool.io with wants_executive_call / preferred time.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = {};
for (const line of readFileSync(join(root, ".env"), "utf-8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const SUPABASE_URL = env.SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
const OMNIDIM_KEY = env.OMNIDIM_API_KEY;
const AGENT_ID = Number(env.STAYINGAHEAD_FOLLOWUP_AGENT_ID || "244918");
const OMNIDIM_BASE = env.OMNIDIM_API_BASE || "https://backend.omnidim.io/api/v1";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const sbHeaders = {
  apikey: SUPABASE_KEY,
  authorization: `Bearer ${SUPABASE_KEY}`,
  "content-type": "application/json",
};

async function sb(path, init = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { ...sbHeaders, ...(init.headers || {}) },
  });
  if (!res.ok) throw new Error(`supabase ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const CONTEXTS = {
  missed:
    "our sales team tried calling them earlier but could not reach them — this call reconnects",
  not_interested:
    "they earlier told our team they were not interested — this is a gentle, no-pressure follow-up to see if anything changed",
};

async function eligibleLeads() {
  const rows = await sb(
    "subscribers?select=id,name,phone,email,meta,consent&consent=eq.true&phone=not.is.null&order=created_at.desc&limit=200"
  );
  return rows.filter((r) => {
    const status = r.meta?.sales_call_status;
    return (
      (status === "missed" || status === "not_interested") &&
      !r.meta?.followup_called_at
    );
  });
}

const argv = process.argv.slice(2);

async function main() {
  if (argv[0] === "--mark") {
    const phone = argv[1];
    const status = argv[2];
    if (!phone || !["missed", "not_interested"].includes(status)) {
      console.error("Usage: --mark +91XXXXXXXXXX missed|not_interested");
      process.exitCode = 1;
      return;
    }
    const rows = await sb(
      `subscribers?select=id,name,meta&phone=eq.${encodeURIComponent(phone)}`
    );
    if (!rows.length) {
      console.error(`No subscriber with phone ${phone}`);
      process.exitCode = 1;
      return;
    }
    for (const row of rows) {
      const meta = { ...(row.meta || {}), sales_call_status: status };
      delete meta.followup_called_at; // re-flagging makes them eligible again
      await sb(`subscribers?id=eq.${row.id}`, {
        method: "PATCH",
        body: JSON.stringify({ meta }),
      });
      console.log(`marked ${row.name || row.id} as ${status}`);
    }
    return;
  }

  const leads = await eligibleLeads();

  if (argv[0] === "--list" || argv[0] === "--dry-run") {
    console.log(`${leads.length} eligible lead(s):`);
    for (const l of leads) {
      console.log(
        `  ${l.name || "-"} · ${l.phone} · ${l.meta.sales_call_status}${
          argv[0] === "--dry-run" ? " → would dispatch" : ""
        }`
      );
    }
    return;
  }

  // dispatch
  if (!OMNIDIM_KEY) {
    console.error(
      "OMNIDIM_API_KEY missing in .env — cannot dispatch. Use --list to review leads."
    );
    process.exitCode = 1;
    return;
  }
  if (!leads.length) {
    console.log("0 eligible leads — nothing to dispatch.");
    return;
  }

  for (const lead of leads) {
    try {
      const res = await fetch(`${OMNIDIM_BASE}/calls/dispatch`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${OMNIDIM_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          agent_id: AGENT_ID,
          to_number: lead.phone,
          call_context: {
            user_name: lead.name || "there",
            lead_context: CONTEXTS[lead.meta.sales_call_status],
          },
          metadata: { subscriber_id: lead.id, source: "followup_script" },
        }),
      });
      if (!res.ok) throw new Error(`dispatch ${res.status}: ${await res.text()}`);
      const meta = {
        ...lead.meta,
        followup_called_at: new Date().toISOString(),
      };
      await sb(`subscribers?id=eq.${lead.id}`, {
        method: "PATCH",
        body: JSON.stringify({ meta }),
      });
      console.log(`✓ dispatched → ${lead.name || lead.id} (${lead.phone})`);
    } catch (err) {
      console.error(`✗ FAILED for ${lead.phone}: ${err.message}`);
    }
  }
  console.log(
    "Done. Outcomes arrive by email (wants_executive_call, preferred time, objections)."
  );
}

await main();
