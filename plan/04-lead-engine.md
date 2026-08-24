# Stage 4 — The growth engine (Week 4)

**Objective:** a steady, consent-based flow of leads into the workshop funnel: registrations
captured, reminders delivered, attendees quizzed and offered the right accelerator, real
testimonials collected.

**Definition of done:** 1,000 leads · workshop reminder flow live (email + WhatsApp utility)
· post-workshop track-offer sequence live · WhatsApp answers inbound within the free window ·
first cohort's enrollments tracked end-to-end in PostHog.

## 1. Know the student before buying reach
- [ ] `agent/icp.md` per track: the non-tech professional (Generalist) and the Python dev
  (Engineer) — goals, objections (time, price, "will I keep up?", EMI), where they scroll
- [ ] Sources, consent-first (no scraping of people): site forms/quiz · workshop buyers ·
  content followers (IG/YT/LinkedIn) · webinars · referrals

## 2. Capture + segment
- [ ] Forms → Supabase `subscribers` with segments: new · engaged · workshop_registered ·
  workshop_attended · quiz_generalist · quiz_engineer · enrolled · alumni · lapsed
- [ ] Nightly sync script computes segments from payments + PostHog events → Listmonk lists

## 3. Email flows (Listmonk + Brevo, free)
- [ ] Warmup ramp on `mail.infra-sync.online` (~20/day → +20/week toward 300/day)
- [ ] Flows: welcome → workshop invite · registration confirm → T-24h → T-1h · post-workshop:
  recording + quiz + track offer (3 emails) · cohort-start countdown · win-back 60/90d
- [ ] Transactional and marketing never share a list; unsubscribe instant

## 4. WhatsApp (official Cloud API)
- [ ] Business verification (Stage 0, pending) · webhook → log to `touches`
- [ ] **Utility templates** (₹0.115, per-sale cost): registration confirmed · T-1h reminder ·
  recording link. Marketing templates only within the ₹100 overhead cap.
- [ ] Inbound-first: wa.me CTA for questions (prereqs, EMI, schedule) → free 24h windows

## 5. Distribution (₹0)
- [ ] Postiz cadence: 1 ad/day + 2 value posts (AI tips per track) across IG/YT/LinkedIn/X
- [ ] SEO lane per PIPELINES D · Pomelli statics for workshop dates/drops
- [ ] Referral: alumni code (free workshop seat or accelerator credit — confirm in offers.md)

## 6. Proof (real only)
- [ ] Post-workshop feedback form → quotes with written consent → site + ads
- [ ] Outcome data collection starts cohort 1 (completion %, projects shipped) — the only
  path to ever making outcome claims

**Next →** [05-agent-automation.md](05-agent-automation.md)
