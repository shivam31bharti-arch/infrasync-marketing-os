import { notFound } from "next/navigation";
import { serverEnv } from "@/lib/server-env";
import DraftActions from "@/components/DraftActions";

// Drafts dashboard skeleton (plan/05 §3): lists pending agent drafts for the
// human approve/reject step. Hidden unless DRAFTS_DASHBOARD=1 in the root .env
// AND the service role key is present. TODO(launch): real auth (Supabase) before
// this page is reachable on the public deployment.
export const dynamic = "force-dynamic";

type Draft = {
  id: string;
  kind: string;
  content: string | null;
  agent_reasoning: string | null;
  approved: boolean | null;
  reviewed_by: string | null;
  created_at: string;
};

async function getDrafts(): Promise<Draft[]> {
  const url = serverEnv("SUPABASE_URL");
  const key = serverEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return [];
  const res = await fetch(
    `${url}/rest/v1/drafts?order=created_at.desc&limit=100`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function DraftsPage() {
  if (serverEnv("DRAFTS_DASHBOARD") !== "1") notFound();
  const drafts = await getDrafts();
  return (
    <>
      <h1>Drafts queue</h1>
      <p className="muted">Agent drafts awaiting human approval. Nothing sends without approval.</p>
      {drafts.length === 0 && <p className="muted">No drafts in the queue.</p>}
      {drafts.map((d) => (
        <div key={d.id} className="card" style={{ marginBottom: "1rem" }}>
          <p><strong>{d.kind}</strong> <span className="muted">{new Date(d.created_at).toLocaleString()}</span>{" "}
            <span className="badge">{d.approved === null ? "pending" : d.approved ? `approved by ${d.reviewed_by}` : `rejected by ${d.reviewed_by}`}</span></p>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: "0.85rem" }}>{d.content}</pre>
          {d.agent_reasoning && <p className="muted" style={{ fontSize: "0.8rem" }}>🤖 {d.agent_reasoning}</p>}
          {d.approved === null && <DraftActions id={d.id} />}
        </div>
      ))}
    </>
  );
}
