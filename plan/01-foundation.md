# Stage 1 — Foundation: the storefront (Week 1)

**Objective:** the store is live on our domain, every visitor is measured, and a real order
can be placed end-to-end (test mode), with subscriber capture working.

**Definition of done:** storefront deployed on Cloudflare Pages over HTTPS · products load
from Medusa · one test order completes through checkout (Razorpay/Stripe test mode) · one
subscriber row lands in Supabase through the popup · PostHog shows the visit + `purchase`
event · Sentry catches a test error.

> Store platform decision (default): **Medusa** (open-source, MIT, headless) on the Oracle
> VPS + a **Next.js storefront** on Cloudflare Pages. Alternative if you prefer a classic admin
> and don't mind PHP/WordPress upkeep: WooCommerce on the VPS. Either is ₹0; the plan below
> assumes Medusa. (Reference architecture: the Next.js Commerce pattern — URL-driven variants,
> optimistic cart, tag-based revalidation.)

## Tasks

### 1. Repo + storefront
- [x] Init monorepo folders: `storefront/`, `infra/`, `agent/`, `scripts/`
- [ ] Storefront (you design it): Next.js + the Medusa JS SDK
  - Pages: home · collections (men / women / footwear / bags & accessories — innerwear exists
    but is not featured) · product pages with variants (size/colour) · cart · checkout ·
    order confirmation · account/orders · policies (returns, shipping, privacy, seller details,
    country of origin, MRP display)
  - One clear CTA per page: "Shop now" — facts, prices, and copy rules from `agent/offers.md`
  - Product/Offer + BreadcrumbList JSON-LD on product pages; sitemap + Open Graph
  - Subscriber popup (welcome offer) → Supabase `subscribers` (+ optional WhatsApp opt-in)
- [ ] Connect repo to **Cloudflare Pages** (not Vercel — Vercel's free Hobby plan is
  non-commercial by ToS; Cloudflare's free tier allows commercial use)
- [ ] Custom domain + always-HTTPS in Cloudflare · Turnstile on every form

### 2. Commerce backend (Medusa on the Oracle VPS — see Stage 2 for the server itself)
- [ ] Medusa v2 + Postgres + Redis in Docker · Medusa Admin reachable at `admin.infra-sync.online`
- [ ] Regions/currency (INR first; USD if selling abroad) · tax + shipping options
- [ ] Payment provider plugin: Razorpay (India) and/or Stripe (intl) — **test mode** until launch
- [ ] Import the first catalog (categories from `agent/offers.md`), real product photos, sizes
- [ ] Storefront API key + CORS set for the Pages domain

### 3. Supabase (marketing data — orders/customers stay in Medusa)
- [ ] Create project, enable pgvector, run:

```sql
create extension if not exists vector;

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text,
  name text,
  source text,                 -- 'popup' | 'checkout' | 'whatsapp' | 'instagram' | 'giveaway'
  whatsapp_optin boolean default false,
  consent boolean default false,
  segment text default 'new',  -- new|browsed|carted|bought_once|repeat|lapsed
  meta jsonb default '{}',
  embedding vector(768),
  created_at timestamptz default now()
);

create table touches (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid references subscribers(id),
  channel text,                -- email|whatsapp|social
  direction text,              -- in|out
  subject text, body text,
  status text,                 -- draft|approved|sent|delivered|opened|replied
  created_at timestamptz default now()
);

create table campaigns (
  id uuid primary key default gen_random_uuid(),
  name text, channel text, angle text, hero_skus text[],
  started_at date, ended_at date,
  results jsonb default '{}'
);

create table brand_profiles (
  id uuid primary key default gen_random_uuid(),
  name text, tone text, colors jsonb, fonts jsonb,
  audience text, banned_words text[], style_prefix text,
  updated_at timestamptz default now()
);

create table drafts (
  id uuid primary key default gen_random_uuid(),
  kind text,                   -- ad_brief|email|whatsapp|product_copy|seo_page
  target_id uuid,              -- subscriber or campaign
  content text, agent_reasoning text,
  approved boolean, reviewed_by text,
  created_at timestamptz default now()
);
```

### 4. Capture + measurement
- [ ] Popup/footer form → Pages Function → `subscribers` (`consent=true`) → PostHog `subscribed`
- [ ] PostHog: `product_viewed`, `add_to_cart`, `checkout_started`, `purchase` events; Sentry SDK
- [ ] Email DNS on `mail.infra-sync.online`: SPF + DKIM (from Brevo) + DMARC `p=none` — set
  now so the domain ages before campaigns start

## Don'ts
- Don't buy a theme, a plugin, or a "pro" tier of anything. Don't go live with payments until
  policies pages exist (returns, shipping, seller details) — they're legally required for
  e-commerce in India.

**Next →** [02-free-server.md](02-free-server.md)
