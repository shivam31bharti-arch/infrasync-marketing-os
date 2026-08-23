# Customer pipeline — subscriber → first order → repeat

The full journey of a shopper. Segments live in Supabase `subscribers.segment` (mirrored to
Listmonk lists) and are computed nightly from Medusa orders + PostHog events:
`new → browsed → carted → bought_once → repeat | lapsed (90d)`

## 1 · Source (always-on, consent-first — no scraping of people)

| Source | Tool | Rule |
|---|---|---|
| Welcome-offer popup / footer | Turnstile-protected form → Supabase `subscribers` | `consent=true`, `source='popup'`; best list |
| Checkout opt-in | Medusa checkout → sync → `subscribers` | `source='checkout'`; order-update messages are transactional regardless |
| WhatsApp inbound | Cloud API webhook | auto-create, `source='whatsapp'`, 24h free service window |
| Instagram/Pinterest DMs + giveaways | manual/Postiz | consent captured before any marketing message |
| *(Optional B2B lane)* wholesale buyers, boutiques, influencers | Firecrawl/Scout + Twenty CRM | only by deliberate decision; cold-outreach rules apply |

## 2 · Segment (🤖 nightly script)

- `browsed` = product view, no cart (PostHog) · `carted` = cart abandoned ≥1h · `bought_once` /
  `repeat` from Medusa orders · `lapsed` = no order/visit in 90 days
- Product-affinity tags from viewed/bought categories → used for drop announcements

## 3 · Nurture (🤖 drafts → 👤 approves → send)

| Segment | Flow (channel + timing) |
|---|---|
| new | Welcome series: offer → bestsellers → style guide (email, days 0/2/5) |
| carted | Cart reminder email at 1h and 24h (free); WhatsApp only inside a free service window |
| bought_once | Shipped / delivered (WhatsApp utility + email) → review request +7d → "complete the look" +14d |
| repeat | Early access to drops, referral code |
| lapsed | Win-back at 60d and 90d, then stop |

Hard rules: transactional and marketing never share a list · unsubscribe honored instantly
(Listmonk) · WhatsApp marketing templates only from the budget cap · innerwear never in
subject lines or social · no fake urgency.

## 4 · Service (👤, daily 20 min)

WhatsApp/IG inbox: sizing, delivery, returns — answered same-day inside the free window; the
agent supplies order context from Medusa + touch history from `touches`.

## 5 · Measure (feeds Monday review)

- subscriber → first-order rate · cart-recovery rate · repeat rate · AOV · revenue per email/WA send
- Guardrails: bounce > 3% or spam complaints > 0.1% → **stop sends**, fix hygiene first
- Weekly target: subscribers and recovered carts at the current conversion rate → adjust ad/organic mix, not vanity totals
