// Client-side PostHog wrapper. No-ops when the key is missing (dev without .env).
"use client";

import posthog from "posthog-js";

let initialised = false;

export function initPostHog(): void {
  if (initialised || typeof window === "undefined") return;
  // Public project key (ships to every browser by design) — literal fallback because
  // Cloudflare's build env does not inject NEXT_PUBLIC vars; env override still wins.
  const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_KEY || "phc_kNMTjQATm79Vr3iNCNGAnVEyAMPL6T3Uc6QVzTMPcZXm";
  if (!key) return;
  posthog.init(key, {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
  });
  initialised = true;
}

export type AnalyticsEvent =
  | { name: "workshop_register"; props: { email: string; source: string } }
  | { name: "quiz_completed"; props: { recommended_track: string; score_generalist: number; score_engineer: number } }
  | { name: "checkout_click"; props: { product: string; price: number; currency: string } }
  | { name: "purchase"; props: { product: string; amount: number; currency: string } }
  | { name: "subscribed"; props: { source: string } }
  | { name: "chat_opened"; props: Record<string, never> }
  | { name: "chat_message"; props: { role: "user" | "assistant"; length: number } }
  | { name: "callback_requested"; props: Record<string, never> }
  | { name: "whatsapp_join_click"; props: { source: string } };

export function track(event: AnalyticsEvent): void {
  if (!initialised) return;
  posthog.capture(event.name, event.props);
}
