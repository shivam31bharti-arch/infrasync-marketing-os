# Final pipelines — InfraSync (D2C apparel & footwear) Marketing OS

One page, five pipelines. Every arrow has a tool, an owner (🤖 agent / 👤 you), and a cost
of ₹0 unless marked. Detail lives in `plan/` and `workflows/`; this is the map.

---

## A · Ad pipeline — competitor research → Google Flow → published 30-second product ad
*Cadence: weekly batch · Output: 5–7 ads/month on Flow Fast · Hands-on: ~35 min per ad*

```
🤖 RESEARCH (Mon)   Meta Ad Library screenshots (LLM vision) · competitors' IG / Pinterest / YouTube
                    (YouTube Data API) · their product pages via Firecrawl · their newsletters
                    (research inbox) → agent/research/YYYY-WW-brief.md (hooks · offers · unused angles)
🤖 BRIEF            per angle: hero SKU(s) · 4-beat 30s script (hook · product in motion ·
                    detail/benefit · CTA "Shop now") · 9 image prompts · 4 clip prompts · sources
👤 APPROVE (5 min)  edit / approve
👤 IMAGES (5 min)   3 REAL product photos per clip (front · detail · on-model) as Flow refs;
                    extra scene refs via Nano Banana Pro / Pomelli → ads/<slug>/refs/
👤 FLOW (15–20 min) flow.google · 9:16 · Fast · Ingredients-to-Video (3 refs) → clip 1 +
                    Extend ×3, or 4 clips for outfit/scene changes → clips/ (4 × 8s)
👤/🤖 JOIN (5–10)   scripts/join.sh: FFmpeg concat → one VO (optional) → captions → price/CTA
                    end card → out/<slug>.mp4 (Veo watermark untouched)
👤 QC (3 min)       product on screen matches the real SKU · price/discount true · no innerwear ·
                    no fake urgency · hook works muted · −14 LUFS
🤖 SHIP             Postiz → IG Reels / YT Shorts / Pinterest / Facebook · AI-content disclosure ON
🤖 LOG + READ       campaigns row → day-3 retention → day-7 kill/scale → next Monday
```
Budget guard: ~80 Flow credits per ad (AI Pro = 1,000/mo). Never buy credits or Ultra.

---

## B · Shopping funnel — the revenue path
*Owner: automatic once built (Stages 1, 2, 4)*

```
Ad (A) · Instagram/Pinterest organic · Google Merchant Center free listings · SEO (D)
   ↓
Storefront   Next.js storefront on Cloudflare Pages ↔ Medusa (open-source commerce) on the
             Oracle VPS: collections · product pages · cart · checkout (Razorpay / Stripe)
   ↓
Capture      welcome-offer popup → email (Listmonk) + optional WhatsApp opt-in · Turnstile
   ↓
Order        Medusa order → WhatsApp utility template (confirmed · shipped · delivered, ₹0.115 each)
             + email (free) · PostHog purchase event
   ↓
Recovery     abandoned cart: email at 1h / 24h (free) · WhatsApp only inside a free window
   ↓
Loyalty      delivery +7d: real review request · +30d: new-drop mail · referral code
   ↓
Proof loop   real reviews + UGC (with consent) → back into ads (A) and product pages
```
Metrics: sessions → product views → add-to-cart → checkout → purchase · AOV · repeat rate ·
ROAS per ad (PostHog funnel + Medusa orders).

---

## C · Customer pipeline — subscriber → first order → repeat
*Cadence: always-on flows + weekly review · Detail: workflows/lead-pipeline.md*

```
SOURCE    site popup/footer · checkout opt-in · WhatsApp inbound · Instagram DMs · giveaways
          (no scraping for B2C — consent-first)                      → Supabase subscribers/leads
SEGMENT   🤖 new · browsed · carted · bought-once · repeat · lapsed (90d)  (Medusa + PostHog signals)
NURTURE   welcome series (offer → bestsellers → style guide) · drop announcements · win-back at 60/90d
          🤖 drafts → 👤 approves → Listmonk (email) / WhatsApp Cloud API (utility or free windows)
SERVICE   WhatsApp service window: sizing, returns, order status — human same-day
MEASURE   subscriber → first-order rate · repeat rate · unsubscribe/complaint guardrails
```
(Optional B2B lane — wholesale buyers / boutiques / influencers — is the only place Twenty CRM
and scraping come back; off by default.)

---

## D · SEO / content pipeline — ₹0, compounding
*Cadence: 2 pieces/week · 🤖 drafts, 👤 approves*

```
IDEAS     🤖 from competitor research + Search Console + category/style questions
BRIEF     target query · intent · internal links · Product/Offer + BreadcrumbList JSON-LD
DRAFT     🤖 collection descriptions · style guides ("how to style X") · size guides · care pages
APPROVE   👤 (brand voice from Pomelli Business DNA)
PUBLISH   storefront repo → Cloudflare Pages → sitemap · product feed → Google Merchant Center
          (free listings) · Pinterest catalog
INDEX     Google Search Console + Bing Webmaster
TRACK     SerpBear rank tracking · PostHog landing→purchase
REFRESH   monthly: seasonal updates, prune losers
```
Optional later: every-app/open-seo for Ahrefs-style data (paid DataForSEO key — documented exception only).

---

## E · Weekly operating rhythm (ties A–D together) — workflows/weekly-rhythm.md
Mon measure + research · Tue briefs / images / Flow · Wed join + schedule in Postiz · Thu flows,
campaign, catalog/feeds, reviews · Fri review, log, backups. Daily 20 min: WhatsApp service
window + draft approvals.

---

## F · Build pipeline — how all of the above gets built
`/marketing-loop` (Claude) or `prompts/build-loop.md` (Kimi): read plan + BUILD-LOG → one task,
finished and verified → checkbox + log → report → ask. Stage order: 0 accounts → 1 storefront →
2 server (Medusa · Listmonk · Postiz) → 3 ad factory → 4 growth engine → 5 agent → 6 operate.

---

## Open decisions that gate B (logged in agent/offers.md)
1. Catalog source + real product photos · audience & positioning · INR/USD + Razorpay/Stripe
2. Shipping zones, COD, returns window · welcome offer · free-shipping threshold
3. Brand name on the storefront (keep "InfraSync" or choose a fashion name + cheap .in domain)
4. Store platform: Medusa (recommended, ₹0 on the VPS) vs WooCommerce (easier admin, heavier)
