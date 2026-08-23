"use client";

import { useState } from "react";

export default function DraftActions({ id }: { id: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function decide(approved: boolean) {
    setState("busy");
    try {
      const res = await fetch(`/api/drafts/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ approved }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      window.location.reload();
    } catch {
      setState("error");
    }
  }

  if (state === "done") return null;
  return (
    <p>
      <button onClick={() => decide(true)} disabled={state === "busy"}>Approve</button>{" "}
      <button className="ghost" onClick={() => decide(false)} disabled={state === "busy"}>Reject</button>
      {state === "error" && <span className="muted"> failed — try again</span>}
    </p>
  );
}
