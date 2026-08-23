# Stage 6 — Operate & scale (ongoing)

**Objective:** run the store's marketing on a fixed weekly rhythm, measure one funnel, and only
spend money when a documented trigger fires.

## The one funnel that matters

```
sessions → product views → add to cart → checkout → purchase → repeat
```

- [ ] PostHog dashboard: the funnel above + per-channel breakdown (Flow ads / Instagram /
  Pinterest / Google free listings / email / WhatsApp / organic) — UTM discipline makes this possible
- [ ] Commerce KPIs from Medusa: AOV · repeat rate · return rate · revenue per ad (campaigns table)
- [ ] Weekly numbers reviewed every Monday ([workflows/weekly-rhythm.md](../workflows/weekly-rhythm.md))
- Kill rule: any ad/angle below half the median after 7 days dies; winners get 3 variants

## Fixed cost vs per-order cost (the budget rule, made precise)

**Fixed/overhead stays ₹0–100/month.** Costs that only exist because an order happened —
payment-gateway fees, shipping, packaging, WhatsApp utility messages (~₹0.35 per order for
confirmed/shipped/delivered) — are **cost of goods**, scale with revenue, and are allowed.
They're tracked per order, not against the overhead cap.

## Upgrade triggers — the only reasons to spend on overhead

| Trigger | Then spend | Cost |
|---|---|---|
| Email needs > 9k/mo (Brevo cap) | Amazon SES behind Listmonk | ~₹80 / 1,000 sends |
| WhatsApp abandoned-cart/marketing templates actually convert | Raise template budget deliberately | ₹0.86 + GST each |
| VPS RAM/CPU maxed (check monthly) | Prune services first; then a paid VPS | ~₹400–800/mo |
| Product images outgrow the VPS disk | Cloudflare R2 (10 GB free, then per-GB) | ₹0 → tiny |
| Flow credits run out mid-month | Fewer variants, Fast only, queue to next month — never buy credits or Ultra | ₹0 |
| Revenue > $1M ARR | Remotion company license (or switch to Revideo, ₹0) | $50+/mo |
| A free tier changes terms | Re-run the stack review, swap the piece | — |
| Domain renewal — `infra-sync.online` expires **17 Apr 2027** (auto-renew OFF on purpose) | Decide by **Mar 2027**: renew once (~US$20/yr), or buy a fashion-brand `.in` (~₹600/yr) and migrate before expiry | ~₹1,700/yr or ~₹600/yr |

Everything else stays ₹0. No tool gets adopted without replacing something or unlocking a
funnel step.

## Risk register

| Risk | Mitigation |
|---|---|
| Oracle reclaims idle free VMs | Cron heartbeat + real usage; nightly off-site backups (required by Stage 2) |
| Free-tier terms change (Brevo/Supabase/PostHog/NIM) | Monthly 30-min stack review; alternatives cataloged in the research artifact |
| Deliverability collapse | Warmup ramp respected; transactional/marketing never mixed; DMARC monitored; stop-send if bounce > 3% |
| WhatsApp number ban | Official API only (Rule 2); no unofficial clients on the company number |
| **AI visuals misrepresent the product** (Veo invents garments) | Real product photos as references in every clip; QC rejects colour/cut/logo drift; price card matches storefront |
| Fake reviews / fake urgency (ASCI + CCPA dark-pattern guidelines India; FTC US) | Real reviews only with consent; no fabricated scarcity/countdowns; discounts against real prior prices |
| E-commerce legal basics missed (Consumer Protection E-commerce Rules 2020, Legal Metrology MRP) | Policies pages (returns, shipping, seller details, country of origin) live before payments go live |
| Innerwear slips into marketing | Category excluded from feeds used for ads/social; QC checklist item; never in subject lines |
| Model/tool deprecation (Flow limits, Veo versions, free tiers) | Briefs, prompts, and Flow settings versioned in this repo; reviewed in the monthly stack review |
| Bus factor (team of 1) | Everything in this repo; backups tested; credentials in a shared vault |

## Monthly stack review (30 min, first Monday)

- [ ] Free-tier usage: Brevo sends, Supabase storage, PostHog events, NIM credits, Flow credits left, R2 storage
- [ ] VPS: disk, RAM, backup restore test (quarterly)
- [ ] Scan [github.com/topics/ai-marketing-agent](https://github.com/topics/ai-marketing-agent),
  [topics/lead-generation](https://github.com/topics/lead-generation) and the research artifact's
  directories for new tools worth swapping in
- [ ] Cost ledger still ₹0–100 overhead? Per-order costs trending down with volume? Which trigger fired, and was it written down first?
