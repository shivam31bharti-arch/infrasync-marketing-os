# Stage 6 — Operate & scale (ongoing)

**Objective:** run the company's marketing on a fixed weekly rhythm, measure one funnel, and only
spend money when a documented trigger fires.

## The one funnel that matters

```
visitors → workshop registrations → attendance → quiz completions → enrollments → alumni/referrals
```

- [ ] PostHog dashboard: the funnel above + per-channel breakdown (Flow ads / Instagram /
  YouTube / LinkedIn / email / WhatsApp / organic) — UTM discipline makes this possible
- [ ] Revenue KPIs from Stripe/Razorpay exports: enrollments per cohort · revenue · refund rate · CAC per channel
- [ ] Weekly numbers reviewed every Monday ([workflows/weekly-rhythm.md](../workflows/weekly-rhythm.md))
- Kill rule: any ad/angle below half the median after 7 days dies; winners get 3 variants

## Fixed cost vs per-order cost (the budget rule, made precise)

**Fixed/overhead stays ₹0–100/month.** Costs that only exist because a sale happened —
payment-gateway fees, WhatsApp utility reminders (~₹0.35 per registrant) — are **cost of
goods**, scale with revenue, and are allowed. Tracked per sale, not against the overhead cap.

## Upgrade triggers — the only reasons to spend on overhead

| Trigger | Then spend | Cost |
|---|---|---|
| Email needs > 9k/mo (Brevo cap) | Amazon SES behind Listmonk | ~₹80 / 1,000 sends |
| WhatsApp marketing templates actually convert (workshop pushes) | Raise template budget deliberately | ₹0.86 + GST each |
| VPS RAM/CPU maxed (check monthly) | Prune services first; then a paid VPS | ~₹400–800/mo |
| Flow credits run out mid-month | Fewer variants, Fast only, queue to next month — never buy credits or Ultra | ₹0 |
| Revenue > $1M ARR | Remotion company license (or switch to Revideo, ₹0) | $50+/mo |
| A free tier changes terms | Re-run the stack review, swap the piece | — |
| Domain renewal — `infra-sync.online` expires **17 Apr 2027** (auto-renew OFF on purpose) | Decide by **Mar 2027**: renew once (~US$20/yr), or buy a matching `.in` (~₹600/yr) and migrate before expiry | ~₹1,700/yr or ~₹600/yr |

Everything else stays ₹0. No tool gets adopted without replacing something or unlocking a
funnel step.

## Risk register

| Risk | Mitigation |
|---|---|
| Oracle reclaims idle free VMs | Cron heartbeat + real usage; nightly off-site backups (required by Stage 2) |
| Free-tier terms change (Brevo/Supabase/PostHog/NIM) | Monthly 30-min stack review; alternatives cataloged in the research artifact |
| Deliverability collapse | Warmup ramp respected; transactional/marketing never mixed; DMARC monitored; stop-send if bounce > 3% |
| WhatsApp number ban | Official API only (Rule 2); no unofficial clients on the company number |
| **Edtech claims risk** — fake students/testimonials or unsubstantiated outcome claims (ASCI + CCPA India, edtech specifically watched; FTC US) | AI people are hosts only; real testimonials with consent; outcome claims only with cohort data; QC gate in every ad |
| Mis-sold Engineer seats (Python prereq unclear) → refunds/complaints | Prereq stated on the page, in ads, and in offer emails |
| Fake urgency / dark patterns | No fabricated scarcity/countdowns; prices in ads match the site |
| Payments legal basics missed | Terms, privacy, refund, contact pages live before payment links go live |
| Model/tool deprecation (Flow limits, Veo versions, free tiers) | Briefs, prompts, and Flow settings versioned in this repo; reviewed in the monthly stack review |
| Bus factor (team of 1) | Everything in this repo; backups tested; credentials in a shared vault |

## Monthly stack review (30 min, first Monday)

- [ ] Free-tier usage: Brevo sends, Supabase storage, PostHog events, NIM credits, Flow credits left
- [ ] VPS: disk, RAM, backup restore test (quarterly)
- [ ] Scan [github.com/topics/ai-marketing-agent](https://github.com/topics/ai-marketing-agent),
  [topics/lead-generation](https://github.com/topics/lead-generation) and the research artifact's
  directories for new tools worth swapping in
- [ ] Cost ledger still ₹0–100 overhead? Per-order costs trending down with volume? Which trigger fired, and was it written down first?
