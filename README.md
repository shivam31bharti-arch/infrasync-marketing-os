# Marketing OS

A complete student-acquisition + marketing engine for a 1–10 person **AI education company**
(InfraSync — AI-skills accelerators), built entirely on free and open-source tools. Fixed
overhead: **₹0/month** (hard cap ₹100 for optional WhatsApp marketing templates). Per-sale
costs (payment-gateway fees, WhatsApp utility messages) are cost of goods.

## Hard constraints

| Constraint | Value |
|---|---|
| Budget | ₹0–100 / month overhead, total (per-sale costs excluded — see plan/06) |
| Hardware | 1× PC — RTX 5070 12GB, 32GB RAM (research, ad joining, captions) |
| Team | 1 person now, max 10 |
| Domain | `infra-sync.online` @ Spaceship — brand **InfraSync**; expires 17 Apr 2027, auto-renew off by choice (see plan/06) |
| Business | **AI education**: $20 2-Day AI Workshop (funnel front door) → **AI Generalist Accelerator** (non-tech: vibe coding + AI tools) and **AI Engineer Accelerator** (Python required; AI-augmented engineering, performance, time management) — both **$1,200 intl · ₹95,000 India**. Facts in `agent/offers.md` |
| Ad style | 30-second 9:16 ads generated in **Google Flow** (Veo 3.1, AI Pro already owned): AI hosts/explainers + screen/tool visuals — **never AI "students" or fake testimonials**, no outcome claims without data (see plan/03) |
| Licenses | Free / open source; free API tiers allowed (NVIDIA NIM, Groq, Gemini) |

## The stack at a glance

| Layer | Tool | Runs on |
|---|---|---|
| Website (program site) | Next.js | Cloudflare Pages (free) |
| Payments | Stripe Payment Links (intl $1,200 · $20) · Razorpay Payment Pages (India ₹95k, EMI) | Cloud, per-txn fees only |
| DNS + bot protection | Cloudflare + Turnstile | Cloud |
| Marketing DB · auth · vectors | Supabase free (Postgres + pgvector) | Cloud |
| 24/7 server | Oracle Cloud Always-Free VPS (4 ARM cores · 24GB) | Cloud, ₹0 |
| Email flows + campaigns | Listmonk + Brevo free SMTP (300/day) | VPS + cloud |
| Social scheduling | Postiz (Instagram, YouTube, LinkedIn, X, Facebook) | Docker on VPS |
| WhatsApp | Meta Cloud API — workshop reminders (utility) + free service windows | Cloud |
| Live sessions | YouTube Live (unlisted) — ₹0, no time cap; workshop delivery TBD in offers.md | Cloud |
| Competitor research | Firecrawl · YouTube Data API · ad-library screenshots (LLM vision) | Local PC |
| Workflow glue | n8n (optional) or cron | Docker on VPS |
| Static creative | Pomelli (free beta) + Canva free | Cloud |
| Ads (30s, 9:16) | Google Flow / Veo 3.1 (AI Pro, owned) + Nano Banana Pro scene stills + FFmpeg join | Cloud + local PC |
| Chat agent (site) | /api/chat on the free LLM router — answers only from offers.md | Site + cloud |
| Voice agent | OmniDimension "SkillSync Course Counselor" — DEDICATED account (config: agent/voice-agent-config.md); minutes = COGS | Cloud |
| Certificates | scripts/certificate.mjs (Playwright render) + Supabase + Brevo + /verify/[code] — issuer SkillSync | Site + cloud |
| Analytics · errors | PostHog free + Sentry free | Cloud |
| Code · CI | GitHub free | Cloud |
| LLM keys + fallback | NVIDIA NIM · Groq · Gemini via local LiteLLM proxy (`auto-coder` / `auto-heavy`) | Local + cloud |

Full details: [plan/00-stack.md](plan/00-stack.md). Research catalog of alternatives: the
"Open Marketing Stack" artifact — https://claude.ai/code/artifact/f59d9822-3e69-410d-b227-73a90b4f58a3

## Repo layout

```
├── README.md                  ← you are here
├── AGENTS.md                  ← instructions for ANY AI agent working in this repo
├── PIPELINES.md               ← one-page map of the 5 pipelines (ads, enrollment funnel, students, SEO, rhythm)
├── BUILD-LOG.md               ← append-only record of every build-loop iteration
├── knowledge/                 ← model-agnostic memory: context · decisions · tooling · glossary · handoff (READ FIRST)
├── .env.example · .gitignore  ← key names only · never commit secrets or renders
├── prompts/                   ← START-HERE (universal onboarding) · build-loop · night-shift · design-sprint · design-loop
├── .claude/commands/          ← /marketing-loop (Claude Code wrapper for the build loop)
├── plan/                      ← stage guide 00–06 (stack & keys · site · VPS · ad factory · growth · agent · operate)
├── agent/                     ← offers.md (BUSINESS FACTS) · icp.md · prompts/ · research/
├── infra/                     ← Caddyfile · docker-compose.yml (VPS) · supabase-schema.sql · litellm.config.yaml
├── scripts/                   ← join.sh · captions.py · tts.py (ad pipeline, tested)
├── ads/                       ← per-ad folders (briefs + refs committed; renders ignored)
├── storefront/                ← Next.js site (being repurposed from the retired commerce experiment)
└── workflows/                 ← weekly-rhythm · ugc-ad-pipeline · lead-pipeline (student funnel)
```

## Running the build loop

- `/marketing-loop` (Claude Code) or `prompts/build-loop.md` (any agent): one task, finished,
  verified, logged to BUILD-LOG, committed — then ask.
- ANY new model/agent: paste `prompts/START-HERE.md` as its first message — full onboarding + the execute→test→save loop. Night runs: `prompts/night-shift.md`.

## Build status

- [ ] Stage 0 — accounts + keys — domain/Cloudflare ✅ · Supabase ✅ · Brevo ✅ · PostHog/Sentry ✅ · LLM+YouTube keys ✅ · pending: Oracle VPS, Razorpay/Stripe KYC, Meta verification, research inbox
- [ ] Stage 1 — program site live: workshop page + both accelerator pages + track quiz + chat agent + registration → Supabase; test payment link works; certificate test passes (see plan/TODAY.md for the one-day runbook)
- [ ] Stage 2 — VPS up: Listmonk + Postiz reachable over HTTPS
- [ ] Stage 3 — first 3 course ads produced and published
- [ ] Stage 4 — 1,000 leads, workshop funnel + reminder flows live, first cohort filled
- [ ] Stage 5 — agent drafts briefs/copy/touches, human approves, one full week on autopilot drafts
- [ ] Stage 6 — weekly rhythm running, funnel dashboard live

## Rules of the build

1. **Nothing paid** on overhead without a documented trigger ([plan/06](plan/06-operate-and-scale.md)). Per-sale costs are cost of goods.
2. **Official WhatsApp API only** — unofficial clients never touch the company number.
3. **A human approves every outbound message** until the agent earns autonomy.
4. **Facts only from `agent/offers.md`** — and for edtech: no fake students/testimonials, no outcome claims without data, prerequisites stated plainly.
5. **Ship weekly.** Volume and iteration beat polish.
