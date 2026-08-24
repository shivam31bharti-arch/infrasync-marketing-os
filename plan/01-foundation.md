# Stage 1 — Foundation: the program site (Week 1)

**Objective:** the program site is live on our domain, every visitor is measured, a workshop
registration lands in our database, and a test payment link completes.

**Definition of done:** site deployed on Cloudflare Pages over HTTPS · workshop registration
→ Supabase row → confirmation state · Stripe test link ($20) completes · track-fit quiz
routes to the right program page · PostHog shows the funnel events · Sentry catches a test error.

> The `storefront/` app from the retired commerce experiment is REPURPOSED, not rebuilt:
> keep the scaffold, Supabase capture, PostHog/Sentry wiring, and drafts dashboard; remove
> collections/products/cart/Medusa client; add the program pages below. Medusa itself is
> retired (see knowledge/decisions.md 2026-08-24 pivot #3).

## Tasks

### 1. Pages (facts from `agent/offers.md`; open items stay visibly TBD)
- [ ] `/` home — the funnel's pitch: hook → what InfraSync is → the $20 workshop CTA →
  two-track overview → quiz CTA → FAQ → footer capture
- [ ] `/workshop` — 2-Day AI Workshop, $20: what's covered, next dates (TBD until offers.md),
  registration form → Supabase + payment link
- [ ] `/programs/ai-generalist` — for non-tech: vibe coding + AI tools; $1,200 / ₹95,000
- [ ] `/programs/ai-engineer` — **Python prerequisite stated at the top**; AI-augmented
  engineering, performance, time management; $1,200 / ₹95,000
- [ ] `/quiz` — track-fit quiz (5–7 questions: coding background, goals, time) → recommends a
  track → routes to that page; result saved to the lead row
- [ ] `/policies/{terms,privacy,refund,contact}` — required before payments go live
- [ ] Course JSON-LD on program pages · sitemap · Open Graph · Turnstile on all forms

### 2. Payments (no code checkout in v1)
- [ ] **Stripe Payment Links**: $20 workshop · $1,200 per accelerator (test mode until KYC)
- [ ] **Razorpay Payment Pages**: ₹ equivalents + EMI once enabled (KYC pending)
- [ ] Buttons link out; success URLs return to `/thank-you?product=…` which fires PostHog
  `purchase` and flags the Supabase row

### 3. Supabase (schema already live — adapt, don't recreate)
- [ ] Reuse `subscribers` as the leads table; segments per PIPELINES C (`workshop_registered`,
  `quiz_generalist`, …) · `meta.program` records quiz result + purchases
- [ ] RLS policies for the form-insert path (service role server-side only)

### 4. Measurement
- [ ] PostHog events: `workshop_register`, `quiz_completed` (with track), `checkout_click`,
  `purchase`, `subscribed` · Sentry wired (already) · email DNS (SPF/DKIM/DMARC) — done ✅

**Next →** [02-free-server.md](02-free-server.md)
