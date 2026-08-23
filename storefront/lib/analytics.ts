// Client-side PostHog wrapper. No-ops when the key is missing (dev without .env).
"use client";

import posthog from "posthog-js";

let initialised = false;

export function initPostHog(): void {
  if (initialised || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_KEY;
  if (!key) return;
  posthog.init(key, {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
  });
  initialised = true;
}

export type AnalyticsEvent =
  | { name: "product_viewed"; props: { product_id: string; handle: string; title: string } }
  | { name: "add_to_cart"; props: { product_id: string; variant_id: string; quantity: number } }
  | { name: "checkout_started"; props: { cart_size: number } }
  | { name: "purchase"; props: { order_id: string; total: number; currency: string } }
  | { name: "subscribed"; props: { source: string } };

export function track(event: AnalyticsEvent): void {
  if (!initialised) return;
  posthog.capture(event.name, event.props);
}
