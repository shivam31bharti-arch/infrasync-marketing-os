# Marketing OS

A complete customer-acquisition + marketing engine for a 1–10 person **D2C apparel &
footwear brand**, built entirely on free and open-source tools. Fixed overhead: **₹0/month**
(hard cap ₹100 for optional WhatsApp marketing templates). Per-order costs (payment fees,
shipping, WhatsApp order updates) are cost of goods and scale with revenue.

## Hard constraints

| Constraint | Value |
|---|---|
| Budget | ₹0–100 / month overhead, total (per-order costs excluded — see plan/06) |
| Hardware | 1× PC — RTX 5070 12GB, 32GB RAM (research, joining, captions — GPU no longer required) |
| Team | 1 person now, max 10 |
| Domain | `infra-sync.online` @ Spaceship — current brand name **InfraSync** (fashion name TBD, see agent/offers.md); expires 17 Apr 2027, auto-renew off by choice (see plan/06) |
| Business | InfraSync — D2C **apparel & footwear**: clothing, shoes, bags & accessories (anything worn or carried). Innerwear sold but **never advertised**. No food/electronics. Facts, catalog, and claims policy in `agent/offers.md` |
| Ad style | 30-second 9:16 **product ads** generated in **Google Flow** (Veo 3.1, AI Pro already owned) from real product photos — AI models/hosts show the product; no fake reviews, no fake urgency (see plan/03) |
| Licenses | Free / open source; free API tiers allowed (NVIDIA NIM, Groq, Gemini) |

## The stack at a glance

| Layer | Tool | Runs on |
|---|---|---|
| Storefront (self-designed) | Next.js storefront ↔ Medusa | Cloudflare Pages (free) + VPS |
| Commerce backend | Medusa v2 (catalog, cart, checkout, orders, admin) | Docker on VPS |
| Payments | Razorpay (INR) · Stripe (intl) | Cloud, per-txn fees |
| DNS + bot protection | Cloudflare + Turnstile | Cloud |
| Marketing DB · auth · vectors | Supabase free (Postgres + pgvector) | Cloud |
| 24/7 server | Oracle Cloud Always-Free VPS (4 ARM cores · 24GB) | Cloud, ₹0 |
| Email flows + campaigns | Listmonk + Brevo free SMTP (300/day) | VPS + cloud |
| Social scheduling | Postiz (Instagram, Pinterest, YouTube, Facebook) | Docker on VPS |
| WhatsApp | Meta Cloud API — utility order updates + free service windows | Cloud |
| Free product distribution | Google Merchant Center free listings · Meta/IG Shop catalog · Pinterest catalog | Cloud |
| Competitor research | Firecrawl · YouTube Data API · ad-library screenshots (LLM vision) | Local PC |
| Workflow glue | n8n (optional) or cron | Docker on VPS |
| Static creative | Pomelli (free beta) + Canva free | Cloud |
| Ads (30s, 9:16) | Google Flow / Veo 3.1 (AI Pro, owned) + real product photos + Nano Banana Pro / Pomelli scene refs + FFmpeg join | Cloud + local PC |
| Analytics · errors | PostHog free + Sentry free | Cloud |
| Code · CI | GitHub free | Cloud |
| LLM keys | NVIDIA NIM · Groq · Gemini (rotate, all free) | Cloud |
| *Optional B2B lane* | Twenty CRM + scrapers — only if wholesale/influencer outreach is added | — |

Full details, licenses, and free-tier limits: [plan/00-stack.md](plan/00-stack.md).
Full research catalog (every alternative considered): the "Open Marketing Stack" artifact
— https://claude.ai/code/artifact/f59d9822-3e69-410d-b227-73a90b4f58a3

## Repo layout

```
├── README.md                  ← you are here
├── AGENTS.md                  ← instructions for ANY AI agent working in this repo
├── PIPELINES.md               ← one-page map of the 5 final pipelines (ads, shopping funnel, customers, SEO, rhythm)
├── BUILD-LOG.md               ← append-only record of every build-loop iteration
├── knowledge/                 ← model-agnostic memory: context · decisions · tooling · glossary · handoff (READ FIRST)
├── .env.example · .gitignore  ← key names only · never commit secrets or renders
├── prompts/
│   ├── build-loop.md          ← the canonical build loop (agent-agnostic)
│   └── kimi-kickoff.md        ← first-message prompt for Kimi (or any agent tool)
├── .claude/commands/
│   └── marketing-loop.md      ← /marketing-loop — Claude Code wrapper for the same loop
├── plan/                      ← stage guide: what to build, in order
│   ├── 00-stack.md            final tool list, limits, accounts & keys checklist
│   ├── 01-foundation.md       Stage 1 — storefront (Next.js ↔ Medusa), Supabase, capture (week 1)
│   ├── 02-free-server.md      Stage 2 — Oracle VPS: Medusa, Listmonk, Postiz (week 2)
│   ├── 03-ugc-factory.md      Stage 3 — Google Flow product-ad factory + competitor research (week 3)
│   ├── 04-lead-engine.md      Stage 4 — growth engine: subscribers, carts, WhatsApp, free listings, reviews (week 4)
│   ├── 05-agent-automation.md Stage 5 — the marketing agent loop (weeks 5–6)
│   └── 06-operate-and-scale.md Stage 6 — KPIs, upgrade triggers, risks
├── agent/
│   ├── offers.md              brand, catalog, offers, funnel, claims policy — source of truth for prompts
│   ├── icp.md                 customer profile (fill in)
│   ├── prompts/               ad-brief · email-touch · product-copy prompt templates
│   └── research/              weekly competitor briefs (template in README)
├── infra/                     ← Caddyfile · docker-compose.yml · init-dbs.sql · supabase-schema.sql
├── scripts/                   ← join.sh · captions.py · tts.py · feed.py (skeletons until tested)
├── assets/products/<sku>/     ← real product photos (refs for ads + store)
├── ads/                       ← per-ad folders (briefs + refs committed; renders ignored)
├── storefront/                ← Next.js storefront (created in Stage 1)
└── workflows/                 ← recurring operating procedures
    ├── weekly-rhythm.md       the Mon–Fri operating cadence
    ├── ugc-ad-pipeline.md     competitor research → Google Flow → published 30s product ad
    └── lead-pipeline.md       customer pipeline: subscriber → first order → repeat
```

## Running the build loop

The whole build is driven by one repeatable prompt, saved as a project slash command:

- `/marketing-loop` — run **one** iteration: read the plan + BUILD-LOG, do the next task
  end-to-end, verify it, tick the checkbox, log it, report, and ask any open questions.
- `/loop /marketing-loop` — run it continuously, self-paced; it pauses and asks whenever a
  task needs your accounts, credentials, a decision, or anything outbound/public.

The loop never guesses on business facts, never spends money, and never sends anything to a
real person without approval. Progress is always visible in [BUILD-LOG.md](BUILD-LOG.md)
and the checklist below.

**Using a different AI agent (Kimi, etc.):** point it at [AGENTS.md](AGENTS.md) — most agent
tools read that file automatically — and have it run iterations of
[prompts/build-loop.md](prompts/build-loop.md), which is the same loop in agent-agnostic form.

## Build status

- [ ] Stage 0 — accounts + API keys ([plan/00-stack.md](plan/00-stack.md)) — domain + Cloudflare ✅, rest pending
- [ ] Stage 1 — storefront live, test order completes, first subscriber captured
- [ ] Stage 2 — VPS up: Medusa + email + social reachable over HTTPS
- [ ] Stage 3 — first 3 product ads produced and published
- [ ] Stage 4 — 1,000 subscribers, flows live, free listings approved, first 10 real reviews
- [ ] Stage 5 — agent drafts briefs/copy/touches, human approves, one full week on autopilot drafts
- [ ] Stage 6 — weekly rhythm running, funnel dashboard live

## Rules of the build

1. **Nothing paid** on overhead without hitting a documented upgrade trigger ([plan/06](plan/06-operate-and-scale.md)). Per-order costs are cost of goods.
2. **Official WhatsApp API only** for anything customer-facing. Unofficial clients (Evolution/WAHA/Baileys) are ban-bait — never on the company number.
3. **A human approves every outbound message** until the agent earns autonomy (Stage 5 rule).
4. **The brand profile is injected into every generation** — no off-brand AI output; **the product on screen is always the real product**.
5. **Ship weekly.** Volume and iteration beat polish; the pipeline exists to make variants cheap.
6. **Innerwear is never advertised** — sold on the site, absent from ads, social, and subject lines.
