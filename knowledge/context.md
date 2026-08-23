# Context — read this first (updated 2026-08-23)

**What:** Marketing OS for **InfraSync**, a D2C **apparel & footwear** brand (clothing, shoes,
bags & accessories; innerwear sold but never advertised; no food/electronics). Domain
`infra-sync.online` (Spaceship, Cloudflare DNS active, expires 17 Apr 2027, auto-renew off by
choice; brand name may change to a fashion name later).

**Who:** 1 person now (the user), up to 10 later. Budget: **₹0–100/month overhead**; per-order
costs (payment fees, shipping, WhatsApp order updates) are cost of goods. Free tiers and open
source only; Google AI Pro is already owned.

**Stack (decided):** Next.js storefront on Cloudflare Pages ↔ **Medusa v2** (commerce) on an
**Oracle Always-Free VPS** with Listmonk (email) + Postiz (social) behind Caddy · Supabase
(marketing DB + pgvector) · Razorpay/Stripe · WhatsApp Cloud API (official only) · Google
Merchant Center / Meta catalog / Pinterest (free listings) · PostHog + Sentry · free LLM keys
(Groq → Gemini → NVIDIA NIM) · ads made by the user in **Google Flow** (Veo 3.1, AI Pro) from
**real product photos**, joined with FFmpeg, published via Postiz.

**Pipelines:** `PIPELINES.md` (A ads · B shopping funnel · C customers · D SEO · E weekly rhythm ·
F build loop). **Stage guide:** `plan/00`–`06`. **Facts:** `agent/offers.md` (mostly still to be
filled by the user). **History:** `BUILD-LOG.md`.

**Where we are:** Stage 0 mostly done — domain + Cloudflare ✅, all core API keys ✅ (Supabase,
Brevo, PostHog, Sentry, Groq, Gemini, NIM, YouTube; 11/13 verified). **Night shift 2026-08-24 built
Stage 1 skeleton:** `storefront/` (Next.js 15, builds clean; home/collections/product/cart/policies,
subscribe popup → Supabase, PostHog+Sentry wired, `/drafts` approval queue env-gated) · `medusa/`
local backend running (npx medusa develop :9000, admin /app, admin@infrasync.local — local-only
creds; Postgres `:5433` + Redis `:6380` in Docker; seeded with 3 clearly-fake samples) ·
`agent/llm.py` router verified live on all 3 providers · media scripts (tts/captions/join) tested
end-to-end with real fixes. Nothing deployed; nothing touches a real person.
Pending (user-only): Oracle VPS, Razorpay/Stripe KYC, Meta verification, Merchant Center/Pinterest,
product photos, `agent/offers.md` + `icp.md` answers, Turnstile site key, brand-name decision.
Next build steps: real checkout wiring (after payments KYC) · Stage 2 VPS deploy of Medusa/Listmonk/
Postiz · brand DNA once Pomelli runs.

**Non-negotiables:** no overhead spend without a trigger · official WhatsApp API only · human
approves all outbound · product on screen = real product · no fake reviews/urgency · innerwear
never in marketing · verify before ticking any checkbox · secrets only in `.env`.
