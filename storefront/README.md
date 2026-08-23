# storefront/ — Next.js 15 (App Router, TypeScript)

InfraSync D2C storefront. Talks to Medusa v2 (dev: `http://localhost:9000`, prod: `https://api.infra-sync.online`).

## Pages
- `/` home · `/collections` + `/collections/{clothing,footwear,bags-accessories}` · `/products/[handle]` (variant selector, JSON-LD) · `/cart` (localStorage; checkout is a placeholder until payments) · `/policies/{shipping,returns,privacy,terms}` (**placeholders — legally required real content before launch**)
- Subscriber capture: timed popup + footer form → `POST /api/subscribe` → Supabase `subscribers` (service role, server-side). Turnstile: stub/TODO (needs user's site key).
- Analytics: PostHog (`product_viewed` · `add_to_cart` · `checkout_started` · `subscribed`; `purchase` event defined, fires when checkout exists). Sentry via `instrumentation.ts`.

All copy is `[[PLACEHOLDER]]` until `agent/offers.md` is filled. Sample products are clearly fake ("DO NOT PUBLISH").

## Run
```
npm install
npm run dev        # needs frontend/.env.local (public keys) + repo root .env (server keys)
npm run build      # verified passing 2026-08-24
```
Env loading: server code reads repo-root `../.env` via `lib/server-env.ts` (dev only; set real env vars in hosting).
