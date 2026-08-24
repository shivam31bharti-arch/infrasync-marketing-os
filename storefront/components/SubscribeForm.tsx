"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

// TODO(turnstile): drop in Cloudflare Turnstile widget here once the user
// creates a free Turnstile site key (needs the Cloudflare dashboard login).
// The API route will then verify the cf-turnstile-response token.
export default function SubscribeForm({
  source,
  compact = false,
}: {
  source: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">(
    "idle"
  );

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

  if (state === "done")
    return (
      <p className="muted">
        You&apos;re on the list — we&apos;ll notify you about upcoming
        workshops and programs. ✓
      </p>
    );

  return (
    <form className="subscribe-inline" onSubmit={onSubmit}>
      <input
        type="email"
        required
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="button button--primary"
        disabled={state === "busy"}
      >
        {state === "busy" ? "…" : compact ? "Subscribe" : "Get Updates"}
      </button>
      {state === "error" && (
        <span className="muted" style={{ fontSize: "0.8125rem" }}>
          Something went wrong — try again.
        </span>
      )}
    </form>
  );
}
