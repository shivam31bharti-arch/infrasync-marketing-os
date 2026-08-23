import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { serverEnv } from "@/lib/server-env";

// PATCH /api/drafts/<id> { approved: boolean }
// Marks a draft approved/rejected — this only flips the queue row; SENDING is a
// separate workflow step (Listmonk/WhatsApp) and never triggered from here.
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (serverEnv("DRAFTS_DASHBOARD") !== "1") {
    return NextResponse.json({ error: "disabled" }, { status: 404 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!id || typeof body?.approved !== "boolean") {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const url = serverEnv("SUPABASE_URL");
  const key = serverEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return NextResponse.json({ error: "not configured" }, { status: 503 });

  try {
    const res = await fetch(`${url}/rest/v1/drafts?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ approved: body.approved, reviewed_by: "local-user" }),
    });
    if (!res.ok) throw new Error(`supabase ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: "update failed" }, { status: 500 });
  }
}
