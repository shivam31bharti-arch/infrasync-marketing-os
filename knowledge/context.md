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

**Where we are:** Stage 0 — domain + Cloudflare ✅, AI Pro ✅, NIM key ✅, local tools ✅ (git, Node 24,
Python 3.11, Docker, gh; **FFmpeg missing**), repo prepped (folders, .gitignore, .env.example,
infra configs, script skeletons, prompt templates, this knowledge base). Pending (user-only):
GitHub push, Supabase, Oracle VPS, Razorpay/Stripe, Meta verification, Merchant Center,
Brevo/PostHog/Sentry/Groq/Gemini/YouTube keys, product photos, `agent/offers.md` answers.
Next build step: Stage 1 storefront once the minimum prerequisites in `plan/00-stack.md`
(Stage 0.5) are met.

**Non-negotiables:** no overhead spend without a trigger · official WhatsApp API only · human
approves all outbound · product on screen = real product · no fake reviews/urgency · innerwear
never in marketing · verify before ticking any checkbox · secrets only in `.env`.
