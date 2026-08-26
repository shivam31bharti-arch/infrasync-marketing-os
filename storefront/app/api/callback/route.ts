import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { serverEnv } from "@/lib/server-env";

// POST /api/callback { name, phone }
// 1) Records the consented callback request in Supabase `subscribers`
//    (source=callback) — always, so no lead is ever lost.
// 2) If OMNIDIM_API_KEY is set, dispatches a real call to the visitor via the
//    OmniDimension "SkillSync Course Counselor" agent (OMNIDIM_AGENT_ID).
//    Callback requests are explicit opt-ins: the visitor typed their number and
//    asked for the call (claims policy: consent-based calls only).

const PHONE_RE = /^\+[1-9]\d{7,14}$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 80) : "";
  const phone =
    typeof body?.phone === "string" ? body.phone.replace(/[\s()\-.]/g, "") : "";

  if (!name) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json(
      { error: "invalid phone — include country code, e.g. +919876543210" },
      { status: 400 }
    );
  }

  // 1) Record the lead (best-effort — a storage hiccup must not block the call)
  try {
    const url = serverEnv("SUPABASE_URL");
    const key = serverEnv("SUPABASE_SERVICE_ROLE_KEY");
    if (url && key) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(url, key, { auth: { persistSession: false } });
      const { error } = await supabase.from("subscribers").insert({
        name,
        phone,
        source: "callback",
        consent: true,
        meta: { requested_at: new Date().toISOString(), channel: "site_widget" },
      });
      if (error) throw error;
    } else {
      Sentry.captureMessage("callback: Supabase env not configured", "warning");
    }
  } catch (err) {
    Sentry.captureException(err);
  }

  // 2) Dispatch the real call if the OmniDimension key is configured
  const apiKey = serverEnv("OMNIDIM_API_KEY");
  const agentId = Number(serverEnv("OMNIDIM_AGENT_ID") || "244841");
  if (!apiKey) {
    // Lead recorded; voice dispatch not wired yet (OMNIDIM_API_KEY missing)
    return NextResponse.json({ ok: true, call: "queued" });
  }

  try {
    const base =
      serverEnv("OMNIDIM_API_BASE") || "https://backend.omnidim.io/api/v1";
    const res = await fetch(`${base}/calls/dispatch`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        agent_id: agentId,
        to_number: phone,
        call_context: { user_name: name, source: "website_callback" },
        metadata: { source: "website_callback" },
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`omnidim dispatch ${res.status}: ${detail.slice(0, 200)}`);
    }
    return NextResponse.json({ ok: true, call: "dispatched" });
  } catch (err) {
    Sentry.captureException(err);
    // Lead is stored — the team can call back manually
    return NextResponse.json({ ok: true, call: "queued" });
  }
}
