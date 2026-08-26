# Context — read this first (updated 2026-08-26)

**CURRENT TRUTH (2026-08-26):** SkillSync is LIVE at infra-sync.online (Cloudflare Workers,
OpenNext, git-connected — push main = deploy). Delivery pipeline PROVEN end-to-end
(Razorpay → Supabase registrations → participation cert → Drive grant → HubSpot → pack
email from team@infra-sync.online). Certificates verify publicly at /verify. HubSpot Free
= CRM. OmniDimension counselor live (dedicated acct). Design rebuild v3 (Auxia light-first)
lives on branch design-v3 with auto-updating preview
https://design-v3-skillsync-site.busnz122.workers.dev — merge to main ONLY on founder
approval. Delivery cron workflow awaits GitHub repo secrets. BUILD-LOG.md tail is always
the freshest truth; older text below is partially historical.

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
account connected to some Claude sessions; config in agent/voice-agent-config.md) · SkillSync
completion certificates (scripts/certificate.mjs + Supabase + Brevo + /verify/[code],
code `SSC-YYYY-NNNN`) · Razorpay Payment Pages only — hosted, TEST links wired in root .env
(`NEXT_PUBLIC_RAZORPAY_{WORKSHOP,GENERALIST,ENGINEER}_LINK`); EMI for ₹95k; live-mode after
KYC (Stripe dropped — no India onboarding) · Supabase (leads/segments/drafts + pgvector) · Oracle
Always-Free VPS (pending) running Listmonk + Postiz behind Caddy · WhatsApp Cloud API
(official only) · YouTube Live for ₹0 delivery · PostHog + Sentry · ads made by the founder
in Google Flow from agent briefs, joined by tested `scripts/` · LLM: local LiteLLM proxy
:4000 (`auto-coder` fast / `auto-heavy` = Nemotron 3 Ultra) + Antigravity's own quota.

**Where we are:** Stage 0 mostly done — domain+Cloudflare ✅, Supabase live (5 tables) ✅,
Brevo/PostHog/Sentry/Groq/Gemini/NIM/YouTube keys in `.env` ✅, repo on private GitHub ✅,
FFmpeg+Docker ready ✅. **Stage 1 storefront repurpose DONE** — `storefront/` is now the
InfraSync AI education program site (16 routes, builds clean): home, /workshop ($20),
/programs/ai-generalist + /programs/ai-engineer (Python prereq stated), /quiz (6-Q
deterministic scoring), /thank-you, /policies/{refund,privacy,terms,contact}, /verify/[code]
(certificate lookup), /api/chat (LLM router, offers.md-only knowledge, claims policy),
/api/quiz (Supabase upsert), ChatWidget on every page. Design system rethemed (ink/paper/
electric/JetBrains Mono). Commerce code fully stripped. TBD items (dates, curriculum, EMI,
refund, schedule, instructor) render as styled "announced soon". `medusa/` folder + local
containers on :5433/:6380 are retired — safe to delete.
Pages now show founder-confirmed facts (workshop Sat+Sun 2–8 PM IST, dates Aug 29–30 /
Sep 5–6 / Sep 12–13 · cohort Sep 15 · EMI 3/6/10 · workshop non-refundable stated before
payment · accelerator 4-week money-back · curricula) and Razorpay TEST payment buttons;
Cloudflare adapter (@opennextjs/cloudflare) committed — dashboard connect pending.
Pending (founder-only): Oracle VPS · Razorpay KYC (live mode) · Meta WhatsApp verification ·
research inbox · offers.md open items (accelerator duration, instructor + signatory names,
seats cap, cert template sign-off) · Turnstile key · certificate.mjs end-to-end test ·
Cloudflare Pages connect + DNS.

**Brand note:** company/issuer = **SkillSync** (renamed 2026-08-25 — name conflict with an
existing company; full story in knowledge/decisions.md; history in BUILD-LOG/decisions kept
as-is); "InfraSync" was the working codename; domain stays infra-sync.online for now.
**Today-mode:** plan/TODAY.md is the active one-day runbook.

**Non-negotiables:** no overhead spend without a plan/06 trigger · official WhatsApp only ·
human approves all outbound · facts only from offers.md · **no fake students/testimonials,
no outcome claims without data, Python prereq always stated for the Engineer track** ·
verify before ticking · secrets only in `.env` (edit via notepad only — never re-copy the
template).
