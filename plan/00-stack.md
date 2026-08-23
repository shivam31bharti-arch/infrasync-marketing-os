# Stage 0 — The stack, accounts & keys

Everything used in this build, its license, where it runs, and its free-tier ceiling.
Do the checklist at the bottom before Stage 1 — it's all account creation, ~2–3 hours.

## Core stack

| # | Job | Tool | License / plan | Free-tier ceiling |
|---|-----|------|----------------|-------------------|
| 1 | Storefront hosting | [Cloudflare Pages](https://pages.cloudflare.com) | Free, **commercial use allowed** | 500 builds/mo — plenty |
| 2 | DNS + bot protection | Cloudflare DNS + [Turnstile](https://www.cloudflare.com/products/turnstile/) | Free | Unlimited widgets |
| 3 | Commerce backend (catalog, cart, checkout, orders, admin) | [Medusa](https://github.com/medusajs/medusa) v2 | MIT, self-host | Unlimited (your VPS). Alt: WooCommerce |
| 4 | Payments | Razorpay (INR) · Stripe (intl) | Per-transaction fees only | No fixed cost — fees are cost of goods |
| 5 | Marketing DB · auth · vectors | [Supabase](https://supabase.com) | Free tier | 500MB DB, 50k MAU auth; pgvector included |
| 6 | 24/7 server | [Oracle Cloud Always Free](https://www.oracle.com/cloud/free/) | Free forever | VM.Standard.A1.Flex: 4 OCPU, 24GB RAM, 200GB disk |
| 7 | Email campaigns + flows | [Listmonk](https://github.com/knadh/listmonk) | AGPL, self-host | Unlimited lists/campaigns |
| 8 | Email SMTP | [Brevo](https://www.brevo.com) free (primary) / [Resend](https://resend.com) free (alt) | Free | Brevo 300/day (~9k/mo); Resend 3k/mo, 100/day |
| 9 | WhatsApp | [Meta Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api) | Official, no monthly fee | Service-window replies free; utility templates ₹0.115; marketing templates ₹0.86 (India) |
| 10 | Social scheduling | [Postiz](https://github.com/gitroomhq/postiz-app) | AGPL, self-host | Unlimited; 30+ networks incl. Instagram, Pinterest, YouTube; API + MCP |
| 11 | Free product distribution | Google Merchant Center free listings · Meta Commerce Manager (IG/FB Shop tags) · Pinterest catalog | Free | Product feed exported from Medusa |
| 12 | Static creative | [Pomelli](https://labs.google.com/pomelli) + Canva free | Free beta / freemium | English-only beta; live in India |
| 13 | Competitor research | [Firecrawl](https://github.com/firecrawl/firecrawl) (self-host) · YouTube Data API · ad-library screenshots | OSS / free | Runs on your PC |
| 14 | Workflow glue | [n8n](https://github.com/n8n-io/n8n) (optional) | Fair-code, self-host | Unlimited on own VPS |
| 15 | Analytics | [PostHog](https://posthog.com) cloud free | Free tier | 1M events/mo |
| 16 | Errors | [Sentry](https://sentry.io) free | Free tier | 5k errors/mo |
| 17 | Code + CI | GitHub free | Free | 2,000 Actions min/mo |
| — | *Optional B2B lane only* | [Twenty](https://github.com/twentyhq/twenty) CRM · Scout / google-maps-scraper | AGPL / OSS | Only if wholesale/influencer outreach is added |

## Ad pipeline (Google Flow — AI Pro already owned)

| Step | Tool | Cost |
|---|---|---|
| Competitor research | Agent + Firecrawl + YouTube Data API + Meta Ad Library / Instagram / Pinterest (screenshots → LLM vision) | ₹0 |
| Reference images (9 per ad) | 3 **real product photos** per clip + scene refs from Nano Banana Pro (Gemini app, in AI Pro) · Pomelli | ₹0 |
| Video (4 × 8s → 30s) | **Google Flow / Veo 3.1** — Google AI Pro, 1,000 credits/mo (Fast = 20 per segment) | ₹0 extra (plan already paid) |
| Join · captions · price/CTA card | FFmpeg (free) or Remotion | ₹0 |
| Voiceover (optional) | Kokoro / Chatterbox (local) or ElevenLabs free tier | ₹0 |
| Publishing | Postiz → IG Reels / YT Shorts / Pinterest / Facebook | ₹0 |

Known limits: 8-second segments (use Extend for continuity) · up to 3 reference images per
clip · **no API** (a human runs Flow, ~15–20 min per ad) · visible "Veo" watermark on the
Pro tier (only Ultra removes it) · realistic output ~5–7 ads/month on Fast · the product on
screen must match the real SKU (real photos as refs, QC rejects drift).

## SEO layer (₹0 by default)

| Need | Tool | Cost |
|---|---|---|
| Technical SEO | Built into the storefront: sitemap, meta/Open Graph, **Product/Offer + BreadcrumbList + Review JSON-LD**, fast static hosting | ₹0 |
| Indexing + data | Google Search Console + Bing Webmaster Tools | ₹0 |
| Shopping surfaces | Google Merchant Center free listings · Pinterest catalog (from the Medusa feed) | ₹0 |
| Content | Agent writes collection intros, style/size/care guides on free LLM keys (pattern: igorlemes/OpenSEO) — human approves | ₹0 |
| Rank tracking | SerpBear (open source) | ₹0 |
| Ahrefs-style research (optional) | every-app/open-seo — needs a DataForSEO key (pay-as-you-go, ~$50 minimum top-up); documented exception only if keyword data proves necessary | one-time ~₹4,200 |

## LLM keys (rotate — total cost ₹0)

| Provider | What you get | Notes |
|----------|--------------|-------|
| [NVIDIA NIM](https://build.nvidia.com) | ~1,000 credits, 40 req/min, 100+ models | OpenAI-compatible endpoint; Llama 4, Qwen3, Mistral Large, DeepSeek, Nemotron |
| [Groq](https://console.groq.com) | Free tier, very fast Llama/Qwen | Good default for high-volume drafting |
| [Google AI Studio](https://aistudio.google.com) | Gemini free tier | Best free long-context + vision (ad-library screenshots) |

Router rule: try Groq → fall back to Gemini → NIM for models the others lack.
Keep keys in `.env` (never committed); one `LLM_BASE_URL`/`LLM_API_KEY` pair per provider.

## Stage 0 checklist — create these before Stage 1

- [x] Cloudflare account; move domain nameservers to Cloudflare ✓ 2026-08-21 — `infra-sync.online` on `jaziel`/`uma.ns.cloudflare.com`, verified at registry
- [x] Google AI Pro (Flow + Nano Banana Pro) — already owned
- [x] GitHub repo ✓ 2026-08-23 — private `shivam31bharti-arch/infrasync-marketing-os`, main pushed
- [x] Supabase project ✓ 2026-08-23 — `infrasync` (Mumbai ap-south-1), 5 marketing tables + pgvector created and probe-verified; keys in .env (legacy JWT format — works)
- [ ] Oracle Cloud account — **home region is permanent**; pick for ARM capacity (see [02-free-server.md](02-free-server.md) before choosing)
- [ ] Razorpay and/or Stripe account (test mode first) — business KYC takes days, start now
- [x] Brevo account ✓ 2026-08-23 — free plan, SMTP login + key in .env (server smtp-relay.brevo.com:587 for Listmonk in Stage 2)
- [ ] Meta developer account + WhatsApp Business app (verification takes days — start now) + Meta Commerce Manager
- [ ] Google Merchant Center account (domain verification after Stage 1) · Pinterest business account
- [x] PostHog ✓ + Sentry ✓ 2026-08-24 — PostHog US cloud (token in .env, live-verified); Sentry org infrasync-yc, Next.js project `storefront`, DSN in .env
- [ ] NVIDIA Developer account → NIM API key; Groq key; Google AI Studio key
- [ ] YouTube Data API key (free) for competitor research
- [ ] Pexels + Pixabay API keys (b-roll fill)
- [ ] A "research inbox" Gmail subscribed to 5 competitor brands' newsletters + following them on IG/Pinterest
- [ ] Pomelli: sign in at labs.google.com/pomelli, generate the Business DNA from the storefront (after Stage 1)
- [ ] Real product photos collected per hero SKU (front · detail · on-model) — required for ads and the store

## Stage 0.5 — machine + repo prep (do before the first agent session)

Human-only; the agent can't install software on your PC or create accounts.

- [x] Installed ✓ 2026-08-23: Git 2.53 · Node 24 · Python 3.11 · Docker 29 · gh CLI · FFmpeg 9.0 ✓ (verified)
- [ ] Agent tool of choice signed in: Antigravity (Google AI Pro account) and/or Kilo Code with the
  NIM key; model picked (Opus 4.6 / Gemini 3.5 Flash in Antigravity; `deepseek-v4-flash` or Kimi on NIM)
- [x] `git init` + `.gitignore` + first commit + pushed to private GitHub ✓ 2026-08-23
- [x] `.env.example` created ✓ 2026-08-23 — **[ ] copy to `.env` and fill the real keys** (never committed)
- [ ] Knowledge graph (after Stage 1 code exists): `uv tool install graphifyy` → `graphify install`
  (+ `--platform kilo` / `gemini`) → `/graphify .` — see `knowledge/README.md`
- [ ] Fill `agent/offers.md`: catalog categories + hero SKUs, product source, audience, currency &
  payment provider, shipping/returns, welcome offer, brand-name decision, 3–5 competitors,
  Medusa vs WooCommerce — the agent asks instead of inventing any of these
- [ ] Put real product photos in `assets/products/<sku>/` (front · detail · on-model)
- [ ] Tell the agent its git rule in the first message ("commit after every verified task") —
  the loop only commits if you've said so

### Minimum to start Stage 1 today
GitHub repo pushed · Node + Git installed · Supabase project created · `agent/offers.md` filled at
least for categories, audience, currency, and the Medusa decision. Everything else (Oracle VPS,
Razorpay/Stripe KYC, Meta verification, Merchant Center) is slow and runs in parallel — start
them now, don't wait on them.

## The ways money can leak

1. WhatsApp **marketing** templates: ₹0.86 + GST each. Overhead cap ₹100 ≈ 110/month. Utility
   order-update messages (₹0.115) are per-order cost of goods, not overhead (plan/06).
2. Outgrowing Brevo's 300/day. Upgrade trigger and options in [06-operate-and-scale.md](06-operate-and-scale.md).
3. Payment-gateway fees and shipping are per-order costs — priced into the product, never overhead.
