# Stage 4 — The growth engine (Week 4)

**Objective:** steady, consent-based customer acquisition and retention for the store:
subscribers captured, abandoned carts recovered, orders updated on WhatsApp, products listed
everywhere they can be listed for free, real reviews flowing.

**Definition of done:** 1,000 subscribers · welcome + abandoned-cart flows live in Listmonk ·
WhatsApp Cloud API sends order updates and answers inbound within the free window · products
approved in **Google Merchant Center free listings** and the **Meta/Instagram catalog** · first
10 real reviews on product pages.

## 1. Know the customer before buying traffic

- [ ] Write `agent/icp.md`: who buys (gender/age/city tier), occasions, price sensitivity,
  objections (fit, returns, delivery time), where they scroll (Instagram, Pinterest, YouTube)
- [ ] Sources, ranked for a D2C fashion brand (consent-first — **no scraping of people**):
  1. **On-site capture** — welcome-offer popup, checkout opt-in, footer signup
  2. **Social** — Instagram/Pinterest/YouTube organic + the Flow ads (Stage 3)
  3. **Free listings** — Google Merchant Center free product listings, Instagram/Facebook Shop
     catalog tags, Pinterest catalog
  4. **Giveaways / collabs** — micro-creators, styled UGC with consent
  (Scraping and Twenty CRM return only for an optional B2B lane: wholesale buyers,
  boutiques, influencers. Off by default.)

## 2. Capture + segment

- [ ] Popup offer (e.g., 10% off first order — confirm in `agent/offers.md`) → `subscribers`
- [ ] Segments mirrored to Listmonk lists: new · browsed · carted · bought-once · repeat · lapsed
  (signals from Medusa orders + PostHog events via a nightly sync script)
- [ ] Preference center + instant unsubscribe (Listmonk handles it); DPDP basics: clear identity, consent logged

## 3. Email flows (Listmonk + Brevo free SMTP)

- [ ] Warmup ramp on `mail.infra-sync.online`: ~20/day week 1 → +20/week toward Brevo's 300/day
- [ ] Flows: welcome (offer → bestsellers → style guide) · abandoned cart (1h, 24h) ·
  post-purchase (shipped → delivered → review request +7d) · win-back (60d, 90d) · drop announcements
- [ ] Never mix transactional (order) mail with marketing lists; one sender identity

## 4. WhatsApp (official Cloud API)

- [ ] Meta app → WhatsApp product → business verification (started in Stage 0)
- [ ] Webhook → Supabase Edge Function (or VPS endpoint) → log to `touches`, notify you
- [ ] **Utility templates** (₹0.115 each): order confirmed · shipped · delivered · return update
  — per-order cost, treated as COGS (see plan/06)
- [ ] Inbound-first CTA on site/IG: `wa.me/<number>` for sizing/returns → 24h service window,
  replies free. Marketing templates (₹0.86) only within the budget cap — abandoned-cart on
  WhatsApp only inside a free window
- [ ] Rule 2 of the build: unofficial APIs never touch the company number

## 5. Free product-distribution channels

- [ ] **Google Merchant Center** — verify the domain, upload the product feed (generated from
  Medusa by `scripts/feed.py`), enable free listings; fix disapprovals (GTIN optional for apparel)
- [ ] **Meta Commerce Manager** — catalog from the same feed → Instagram/Facebook Shop product tags
  (India: checkout on the website, not in-app)
- [ ] **Pinterest** — business account, claim the domain, upload catalog; Postiz schedules pins
- [ ] Pomelli Business DNA → statics for collections and drops; scheduled via Postiz

## 6. Reviews + proof (real only)

- [ ] Post-delivery review request (email +7d) → reviews stored in Medusa/Supabase → shown on
  product pages with Review JSON-LD
- [ ] UGC from customers only with written consent; never fabricated (ASCI/CCPA/FTC)

**Next →** [05-agent-automation.md](05-agent-automation.md)
