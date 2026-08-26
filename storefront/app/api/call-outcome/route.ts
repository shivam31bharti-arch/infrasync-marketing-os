import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv();

// POST /api/call-outcome?secret=... — OmniDimension post-call webhook receiver.
// Writes call results back onto the Supabase subscriber row so outcomes
// (wants_executive_call, do_not_call, ...) are queryable, not email-only.
//
// Dashboard setup (once the site is publicly deployed): on each agent's
// Post-Call tab, "Add Configuration" → Webhook →
//   https://infra-sync.online/api/call-outcome?secret=<OMNIDIM_WEBHOOK_SECRET>
// with extracted variables + metadata included. The dispatch side already
// sends metadata.subscriber_id, which this route uses to find the row.

type UnknownRecord = Record<string, unknown>;

function normalizeVars(payload: UnknownRecord): UnknownRecord {
  // extracted variables arrive either as an object or as [{key, value}]
  const raw =
    payload.extracted_variables ??
    payload.extracted_info ??
    payload.extractedVariables ??
    {};
  if (Array.isArray(raw)) {
    const out: UnknownRecord = {};
    for (const item of raw) {
      if (item && typeof item === "object" && "key" in item) {
        out[String((item as UnknownRecord).key)] = (item as UnknownRecord).value;
      }
    }
    return out;
  }
  return typeof raw === "object" && raw !== null ? (raw as UnknownRecord) : {};
}

const truthy = (v: unknown) => v === true || v === "true" || v === "True";

export async function POST(req: Request) {
  const secret = serverEnv("OMNIDIM_WEBHOOK_SECRET");
  if (!secret) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 503 });
  }
  const url = new URL(req.url);
  if (url.searchParams.get("secret") !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as UnknownRecord | null;
  if (!body) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const metadata = (body.metadata ?? {}) as UnknownRecord;
  const subscriberId = metadata.subscriber_id;
  const vars = normalizeVars(body);

  const supabaseUrl = serverEnv("SUPABASE_URL");
  const supabaseKey = serverEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !supabaseKey || !subscriberId) {
    // Nothing to update against — acknowledge so OmniDimension doesn't retry forever
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const headers = {
      apikey: supabaseKey,
      authorization: `Bearer ${supabaseKey}`,
      "content-type": "application/json",
    };
    const rowRes = await fetch(
      `${supabaseUrl}/rest/v1/subscribers?id=eq.${subscriberId}&select=meta`,
      { headers }
    );
    const rows = (await rowRes.json()) as Array<{ meta: UnknownRecord | null }>;
    if (!rows.length) return NextResponse.json({ ok: true, stored: false });

    const meta = {
      ...(rows[0].meta ?? {}),
      last_call_outcome: {
        ...vars,
        summary: typeof body.summary === "string" ? body.summary.slice(0, 500) : undefined,
        received_at: new Date().toISOString(),
      },
      ...(truthy(vars.do_not_call) ? { do_not_call: true } : {}),
      ...(truthy(vars.wants_executive_call)
        ? { exec_callback_requested: true }
        : {}),
    };

    const patch = await fetch(
      `${supabaseUrl}/rest/v1/subscribers?id=eq.${subscriberId}`,
      { method: "PATCH", headers, body: JSON.stringify({ meta }) }
    );
    if (!patch.ok) throw new Error(`supabase patch ${patch.status}`);
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: "storage failed" }, { status: 500 });
  }
}
