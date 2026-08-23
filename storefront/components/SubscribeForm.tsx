"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

// TODO(turnstile): drop in Cloudflare Turnstile widget here once the user
// creates a free Turnstile site key (needs the Cloudflare dashboard login).
// The API route will then verify the cf-turnstile-response token.
export default function SubscribeForm({ source, compact = false }: { source: string; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      track({ name: "subscribed", props: { source } });
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") return <p className="muted">Thanks — you&apos;re on the list. ✳ [[WELCOME_OFFER]]</p>;

  return (
    <form className="subscribe" onSubmit={onSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
      />
      <button type="submit" disabled={state === "busy"}>
        {state === "busy" ? "…" : compact ? "Join" : "Get [[WELCOME_OFFER]]"}
      </button>
      {state === "error" && <span className="muted">Something went wrong — try again.</span>}
    </form>
  );
}
