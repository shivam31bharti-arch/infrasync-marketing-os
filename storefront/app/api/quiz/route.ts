import { NextRequest, NextResponse } from "next/server";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

// POST /api/quiz — save quiz result to Supabase subscribers table
// Upserts into the `meta` jsonb column and sets segment to the recommended track.
// Non-authenticated — this is a lead-capture endpoint.
export async function POST(req: NextRequest) {
  loadServerEnv();

  const supabaseUrl = serverEnv("SUPABASE_URL");
  const supabaseKey = serverEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    console.error("[quiz] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  let body: {
    answers: Record<string, number>;
    score_generalist: number;
    score_engineer: number;
    recommended_track: string;
    email?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { answers, score_generalist, score_engineer, recommended_track, email } = body;

  if (!recommended_track || !answers) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const segment =
    recommended_track === "engineer"
      ? "quiz_engineer"
      : "quiz_generalist";

  // If email is provided, upsert by email; otherwise just log (anonymous quiz)
  if (email) {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/subscribers`,
      {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          email,
          segment,
          consent: true,
          meta: {
            quiz_answers: answers,
            score_generalist,
            score_engineer,
            recommended_track,
            quiz_taken_at: new Date().toISOString(),
          },
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("[quiz] Supabase error:", res.status, text);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, recommended_track, segment });
}
