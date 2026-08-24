# Context — read this first (updated 2026-08-24, pivot #3)

**What:** Marketing OS for **InfraSync**, an **AI education company**. Products: **2-Day AI
Workshop ($20**, funnel front door) → two accelerators at **$1,200 international / ₹95,000
India**: **AI Generalist** (non-tech people: vibe coding + AI tools) and **AI Engineer**
(Python required — basic/intermediate coders taught AI-augmented engineering, performance,
time management). Full facts + open items: `agent/offers.md`. Domain `infra-sync.online`
(Spaceship, Cloudflare DNS active, expires 17 Apr 2027, auto-renew off by choice).

**History in one line:** the business pivoted AI-courses → apparel (2026-08-22) → **back to
AI courses with real pricing (2026-08-24)**. Medusa/commerce is retired; if you find
apparel/product/shoe references anywhere, they are stale — fix on sight.

**Who:** 1 person (the founder), up to 10 later. Budget: **₹0–100/month overhead**; per-sale
costs (payment fees, WhatsApp utility) are cost of goods. Free/open-source only; Google AI
Pro is owned (Flow ads + Antigravity + Nano Banana).

**Stack:** Next.js program site on Cloudflare Pages · site chat agent (/api/chat on the free
LLM router, offers.md-only) · OmniDimension voice counselor (DEDICATED account — NOT the demo
account connected to some Claude sessions; config in agent/voice-agent-config.md) · Outskill
completion certificates (scripts/certificate.mjs + Supabase + Brevo + /verify/[code]) · Stripe Payment Links + Razorpay Payment
Pages (hosted; EMI for ₹95k pending) · Supabase (leads/segments/drafts + pgvector) · Oracle
Always-Free VPS (pending) running Listmonk + Postiz behind Caddy · WhatsApp Cloud API
(official only) · YouTube Live for ₹0 delivery · PostHog + Sentry · ads made by the founder
in Google Flow from agent briefs, joined by tested `scripts/` · LLM: local LiteLLM proxy
:4000 (`auto-coder` fast / `auto-heavy` = Nemotron 3 Ultra) + Antigravity's own quota.

**Where we are:** Stage 0 mostly done — domain+Cloudflare ✅, Supabase live (5 tables) ✅,
Brevo/PostHog/Sentry/Groq/Gemini/NIM/YouTube keys in `.env` ✅, repo on private GitHub ✅,
FFmpeg+Docker ready ✅. Night shift built a Next.js site skeleton in `storefront/` (builds
clean; Supabase capture, PostHog+Sentry, drafts dashboard) — it currently still contains
retired commerce routes; **Stage 1 = repurpose it into the program site** per `plan/01` +
`prompts/design-sprint.md` (premium tech-education theme, track-fit quiz as hero feature).
`medusa/` folder + local containers on :5433/:6380 are retired — safe to delete. Media
scripts tested; `agent/llm.py` router verified.
Pending (founder-only): Oracle VPS · Razorpay/Stripe KYC · Meta WhatsApp verification ·
research inbox · offers.md open items (dates, duration, curriculum, EMI, refund policy) ·
Turnstile key.

**Brand note:** company/issuer = **Outskill**; "InfraSync" was the working codename; domain
stays infra-sync.online for now. **Today-mode:** plan/TODAY.md is the active one-day runbook.

**Non-negotiables:** no overhead spend without a plan/06 trigger · official WhatsApp only ·
human approves all outbound · facts only from offers.md · **no fake students/testimonials,
no outcome claims without data, Python prereq always stated for the Engineer track** ·
verify before ticking · secrets only in `.env` (edit via notepad only — never re-copy the
template).
