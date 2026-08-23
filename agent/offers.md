# InfraSync — brand, catalog & offers (source of truth for every prompt)

> Every ad script, product description, email, WhatsApp message, and page must pull its facts
> from here. If a fact is missing, the agent asks — it never invents.

## What InfraSync is
A direct-to-consumer **apparel & footwear** brand: clothing, shoes, and accessories people
wear or carry (handbags, backpacks, belts, caps, socks…). Innerwear is sold on the site but
**never advertised** (not in ads, not in social posts, not in email subject lines). We do not
sell food, electronics, bikes, or anything that isn't worn/carried.

## Catalog (fill in — this table drives ads, pages, and product feeds)

| Category | Sub-categories | Price range | Hero SKUs (with photo folder) |
|---|---|---|---|
| Clothing | tees, shirts, dresses, jeans, jackets, ethnic… | | |
| Footwear | sneakers, sandals, formal, sports… | | |
| Bags & accessories | handbags, backpacks, belts, caps, socks | | |
| Innerwear (site only) | — | | not advertised |

Open items to confirm before the store/ads ship:
- [ ] Who makes the products — own label, sourced, or marketplace/dropship? (affects photos, returns, country-of-origin labels)
- [ ] Audience: men / women / kids / all · age band · India-first or international · budget vs premium positioning
- [ ] Currency & payments: INR via Razorpay · USD via Stripe · both?
- [ ] Shipping zones, delivery promise, COD yes/no, return/exchange window
- [ ] Real product photos available? (required: Flow ads use them as reference images; the store needs them)
- [ ] Brand name on the storefront — "InfraSync" is a tech-sounding name for a fashion label; keep it,
      or choose a fashion brand name + a matching cheap .in domain while keeping infra-sync.online as the technical home?
- [ ] 3–5 competitor brands to research (Indian D2C examples: Bewakoof, The Souled Store, Snitch, Campus, Neeman's — replace with the real set)

## Funnel
Ad (Flow-made, 30s, product-centric) / Instagram / Pinterest / Google free listings
→ collection or product page (storefront) → add to cart → checkout (Razorpay / Stripe)
→ WhatsApp + email order updates (utility) → delivery → review request (real) → repeat / referral.
Capture along the way: email/WhatsApp subscribers (welcome offer), abandoned-cart recovery.

## Offers & CTAs (fill in)
- Welcome offer for subscribers (e.g., 10% off first order) — confirm
- Free-shipping threshold — confirm
- Seasonal drops / sale calendar — confirm
- CTA vocabulary: "Shop now" · "Shop the drop" · "Get yours" (never "limited stock" unless true)

## Voice & style (fill in after Pomelli's Business DNA run)
- Tone:
- Words we use / never use:
- Visual style prefix for Flow prompts (e.g., "sunlit street-style, real fabric texture,
  natural skin, product always in frame and accurate, 9:16"):

## Claims policy
- AI-generated visuals must show the **actual product** (colour, cut, logo placement) — real
  product photos are the reference images; anything invented is re-generated or rejected.
- No fake reviews/testimonials (ASCI + CCPA India, FTC US). Real reviews only, with consent.
- No fake scarcity/urgency/countdowns (CCPA dark-pattern guidelines). Discounts shown against
  a real, previously charged price (MRP rules).
- Innerwear never appears in ads or social.
- Mandatory e-commerce disclosures on the site: seller details, returns policy, country of origin, MRP.
