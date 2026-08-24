# Student pipeline — lead → workshop buyer → accelerator student

Segments live in Supabase `subscribers.segment`, mirrored to Listmonk lists, computed nightly
from forms + payments + PostHog:
`new → engaged → workshop_registered → workshop_attended → quiz_{generalist|engineer} →
enrolled → alumni | lapsed (90d)`

## 1 · Source (always-on, consent-first — no scraping of people)
| Source | Tool | Rule |
|---|---|---|
| Site forms + track quiz | Turnstile form → Supabase | `consent=true`; quiz result → `meta.program` |
| Workshop purchases | Stripe/Razorpay success → `/thank-you` → row flagged | transactional messages allowed regardless |
| WhatsApp inbound | Cloud API webhook | auto-create, free 24h service window |
| Content followers / webinars / referrals | Postiz + manual | consent before any marketing message |

## 2 · Nurture (🤖 drafts → 👤 approves → send)
| Segment | Flow |
|---|---|
| new / engaged | Welcome: what InfraSync is → free value → workshop invite (email d0/2/5) |
| workshop_registered | Confirm → T-24h → T-1h (email free; WhatsApp utility T-1h) |
| workshop_attended | Recording + track quiz → track offer ×3 emails → cohort-start countdown |
| quiz_generalist / quiz_engineer | Track-specific proof + curriculum + EMI/price answers |
| enrolled | Onboarding sequence · cohort logistics (transactional) |
| alumni | Referral code · testimonial ask (consent) |
| lapsed | Win-back at 60/90d, then stop |

Hard rules: transactional ≠ marketing lists · unsubscribe instant · outcome claims only with
data · Python prereq repeated in every Engineer-track offer email.

## 3 · Service (👤 daily 20 min)
WhatsApp/IG inbox: prereqs, schedule, EMI, refunds — same-day inside the free window; agent
supplies the lead's history from `touches`.

## 4 · Measure (Monday review)
reg→attend rate · attend→enroll rate · CAC per channel · revenue per cohort ·
guardrails: bounce >3% or complaints >0.1% → stop sends, fix hygiene.
