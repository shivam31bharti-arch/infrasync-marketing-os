import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { serverEnv } from "@/lib/server-env";

// POST /api/subscribe { email, source }
// Inserts into Supabase `subscribers` with the SERVICE ROLE key — server-side only.
// TODO(turnstile): verify cf-turnstile-response token once the user creates a site key.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body?.source === "string" ? body.source : "popup";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const url = serverEnv("SUPABASE_URL");
  const key = serverEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    Sentry.captureMessage("subscribe: Supabase env not configured", "warning");
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await supabase
      .from("subscribers")
      .upsert({ email, source, consent: true }, { onConflict: "email" });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: "insert failed" }, { status: 500 });
  }
}
