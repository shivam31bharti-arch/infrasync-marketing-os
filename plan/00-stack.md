# Stage 0 — The stack, accounts & keys

Everything used in this build, its license, where it runs, and its free-tier ceiling.

## Core stack

| # | Job | Tool | License / plan | Free-tier ceiling |
|---|-----|------|----------------|-------------------|
| 1 | Site hosting | [Cloudflare Pages](https://pages.cloudflare.com) | Free, commercial use allowed | 500 builds/mo |
| 2 | DNS + bot protection | Cloudflare DNS + [Turnstile](https://www.cloudflare.com/products/turnstile/) | Free | Unlimited |
| 3 | Payments | **Stripe Payment Links** ($20 · $1,200) · **Razorpay Payment Pages** (₹95,000, EMI) | Per-transaction fees only | No fixed cost — fees are cost of goods |
| 4 | Marketing DB · auth · vectors | [Supabase](https://supabase.com) | Free tier | 500MB DB; pgvector included ✅ live |
| 5 | 24/7 server | [Oracle Cloud Always Free](https://www.oracle.com/cloud/free/) | Free forever | VM.Standard.A1.Flex 4 OCPU/24GB |
| 6 | Email flows + campaigns | [Listmonk](https://github.com/knadh/listmonk) | AGPL, self-host | Unlimited |
| 7 | Email SMTP | [Brevo](https://www.brevo.com) free ✅ / [Resend](https://resend.com) alt | Free | 300/day (~9k/mo) |
| 8 | WhatsApp | [Meta Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api) | Official | Service-window replies free; utility ₹0.115; marketing ₹0.86 |
| 9 | Live delivery | YouTube Live (unlisted) | Free | No time cap (workshop platform TBD in offers.md) |
| 10 | Social scheduling | [Postiz](https://github.com/gitroomhq/postiz-app) | AGPL, self-host | 30+ networks; API + MCP |
| 11 | Competitor research | [Firecrawl](https://github.com/firecrawl/firecrawl) self-host · YouTube Data API ✅ · ad-library screenshots (LLM vision) | OSS / free | Local PC |
| 12 | Static creative | [Pomelli](https://labs.google.com/pomelli) + Canva free | Free beta | After site is live |
| 13 | Workflow glue | [n8n](https://github.com/n8n-io/n8n) (optional) or cron | Fair-code | Own VPS |
| 14 | Analytics | [PostHog](https://posthog.com) ✅ | Free | 1M events/mo |
| 15 | Errors | [Sentry](https://sentry.io) ✅ | Free | 5k errors/mo |
| 16 | Code + CI | GitHub ✅ (private repo, Actions) | Free | 2,000 min/mo |

## Ad pipeline (Google Flow — AI Pro already owned)

| Step | Tool | Cost |
|---|---|---|
| Competitor research | Agent + Firecrawl + YouTube Data API + ad-library screenshots → LLM vision | ₹0 |
| Scene reference images (9/ad) | Nano Banana Pro (Gemini app, in AI Pro) — hosts/studios/tool screens, never fake students | ₹0 |
| Video (4 × 8s → 30s) | **Google Flow / Veo 3.1** — AI Pro, 1,000 credits/mo (Fast = 20/segment → 5–7 ads/mo) | ₹0 extra |
| Join · captions · price/CTA card | `scripts/join.sh` + `captions.py` + `tts.py` — **tested** | ₹0 |
| Publishing | Postiz → IG Reels / YT Shorts / LinkedIn / Facebook | ₹0 |

Limits: 8s segments (Extend for continuity) · 3 refs/clip · no API (human runs Flow ~15–20
min/ad) · visible Veo watermark on Pro tier · edtech claims rules in plan/03.

## SEO layer (₹0)

Technical SEO in the site (sitemap, OG, **Course JSON-LD** on program pages) · Google Search
Console + Bing · content agent on free LLM keys (guides per track) · SerpBear rank tracking ·
every-app/open-seo optional later (paid DataForSEO key — documented exception only).

## LLM keys + failover (₹0) — all ✅ in .env

Groq · Gemini (AI Studio — also vision for ad screenshots) · NVIDIA NIM. Local **LiteLLM
proxy** `infra/litellm.config.yaml` → :4000, ids `auto-coder` (fast) / `auto-heavy`
(Nemotron 3 Ultra 550B first). Antigravity uses its own AI Pro quota.

## Stage 0 checklist

- [x] Cloudflare + domain ✓ 2026-08-21 (`infra-sync.online` on jaziel/uma nameservers, registry-verified)
- [x] Google AI Pro (Flow · Nano Banana Pro · Antigravity) — owned
- [x] GitHub private repo pushed ✓ · [x] Supabase project + schema live ✓ · [x] Brevo SMTP ✓
- [x] PostHog ✓ · Sentry ✓ · [x] Groq/Gemini/NIM keys ✓ · [x] YouTube Data API key ✓
- [x] FFmpeg 9 ✓ · Docker ✓ · git identity ✓ · `.env` populated (11 keys verified)
- [ ] Oracle Cloud account + ARM VM (home region permanent; retry daily or Singapore)
- [ ] **Stripe** account ($20 + $1,200 links) · **Razorpay** KYC (₹95,000 page + EMI) — start now, takes days
- [ ] Meta developer + WhatsApp Business verification — start now, takes days
- [ ] Research-inbox Gmail subscribed to 5 edtech competitors' funnels
- [ ] Pexels + Pixabay keys (Stage 3 b-roll, 2 min)
- [ ] Turnstile site key (when Stage 1 forms ship)
- [ ] Pomelli Business DNA (after the program site is live)
- [ ] `agent/offers.md` open items: dates, duration, curriculum, instructors, EMI, refund policy

## The ways money can leak
1. WhatsApp **marketing** templates ₹0.86 (cap ≈ 110/mo); utility reminders ₹0.115 are per-sale COGS.
2. Outgrowing Brevo 300/day → SES trigger in plan/06.
3. Payment-gateway fees are per-sale COGS — priced into the programs, never overhead.
