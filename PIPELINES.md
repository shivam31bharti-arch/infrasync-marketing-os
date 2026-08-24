# Final pipelines — InfraSync (AI education) Marketing OS

One page, five pipelines. 🤖 = agent · 👤 = you. Cost ₹0 unless marked. Detail in `plan/` and
`workflows/`; facts only from `agent/offers.md`.

---

## A · Ad pipeline — competitor research → Google Flow → published 30-second course ad
*Cadence: weekly · Output: 5–7 ads/month on Flow Fast · Hands-on: ~35 min per ad*

```
🤖 RESEARCH (Mon)   Meta Ad Library screenshots (LLM vision — edtech runs heavy ads) ·
                    competitor YouTube/IG (YouTube Data API) · their funnels via research inbox ·
                    landing pages via Firecrawl → agent/research/YYYY-WW-brief.md
🤖 BRIEF            per angle: program (workshop / generalist / engineer) · 4-beat 30s script
                    (hook · pain/insight · what the program actually is · price + CTA "Join the
                    $20 workshop") · 9 image prompts · 4 clip prompts · sources
👤 APPROVE (5 min)  edit / approve
👤 IMAGES (5 min)   scene refs via Nano Banana Pro (Gemini app): host in studio · screens with
                    real tool UIs · workshop energy — NO fake students → ads/<slug>/refs/
👤 FLOW (15–20 min) 9:16 · Fast · Ingredients-to-Video (3 refs) → clip 1 + Extend ×3 → 4 × 8s
👤/🤖 JOIN (5–10)   scripts/join.sh: concat → VO → captions → price/CTA end card
👤 QC (3 min)       every claim matches offers.md · no outcome promises without data · no AI
                    "students" · Python prereq stated for Engineer-track ads · price current
🤖 SHIP             Postiz → IG Reels / YT Shorts / LinkedIn / Facebook · AI disclosure ON
🤖 LOG + READ       campaigns row → day-3 retention → day-7 kill/scale → next Monday
```

---

## B · Enrollment funnel — the revenue path

```
Ad (A) · content · SEO (D)
   ↓
Program site (Cloudflare Pages): home · /workshop ($20) · /programs/ai-generalist ·
/programs/ai-engineer (Python prereq explicit) · track-fit quiz · policies
   ↓
Workshop registration → Supabase (consent) → payment: Stripe link ($20) / Razorpay page (₹)
   ↓
Reminders   email (Listmonk, free): confirm · T-24h · T-1h · WhatsApp utility T-1h (per-sale cost)
   ↓
2-Day Workshop (delivery platform per offers.md — YouTube Live unlisted is the ₹0 default)
   ↓
Track-fit quiz + accelerator pitch → offer: $1,200 intl / ₹95,000 India (EMI if enabled)
   ↓
Checkout (Stripe / Razorpay) → onboarding sequence → cohort starts
   ↓
Real alumni testimonials (with consent) + referrals → back into ads (A)
```
Metrics: visitors → workshop regs → show-rate → quiz completions → accelerator conversations →
enrollments · revenue per cohort · CAC by channel (PostHog + payment exports).

---

## C · Student pipeline — lead → workshop buyer → accelerator student
*Detail: workflows/lead-pipeline.md. Consent-first; no scraping of people.*

```
SOURCE    site forms/quiz · workshop buyers · WhatsApp inbound · content followers · webinars
SEGMENT   🤖 new · engaged · workshop_registered · workshop_attended · quiz_generalist ·
          quiz_engineer · enrolled · alumni · lapsed
NURTURE   welcome series → workshop invite → post-workshop track offer → cohort-start
          countdown → alumni/referral. 🤖 drafts → 👤 approves → Listmonk / WhatsApp windows
SERVICE   WhatsApp service window: prerequisites, schedule, EMI, refunds — human same-day
MEASURE   reg→attend rate · attend→enroll rate · unsubscribe/complaint guardrails
```

---

## D · SEO / content — ₹0, compounding
🤖 ideas from research + Search Console → briefs (Course JSON-LD on program pages) → drafts
(guides: "vibe coding for non-tech", "AI workflows for Python devs") → 👤 approves → publish →
Search Console/Bing → SerpBear tracking → monthly refresh.

---

## E · Weekly rhythm — workflows/weekly-rhythm.md
Mon measure + research · Tue briefs/images/Flow · Wed join + schedule · Thu flows + campaign +
cohort ops · Fri review/log/backups. Daily 20 min: WhatsApp window + draft approvals.

---

## F · Build pipeline
`/marketing-loop` (Claude) or `prompts/build-loop.md` (any agent) · night runs via
`prompts/night-shift.md` · design work via `prompts/design-sprint.md` + `design-loop.md`.
Stage order: 0 accounts → 1 program site → 2 VPS (Listmonk·Postiz) → 3 ad factory →
4 growth engine → 5 agent → 6 operate.

---

## G · Support & certification layer (added 2026-08-25)

```
CHAT AGENT   site widget → /api/chat → LLM router (free keys) → answers ONLY from
             agent/offers.md + FAQ → escalation: WhatsApp link + email · rate-limited ·
             PostHog chat_opened/chat_message
VOICE AGENT  OmniDimension "Outskill Course Counselor" (DEDICATED account — config in
             agent/voice-agent-config.md) · inbound web-call widget · outbound = registrant
             reminders only, consent-based, human-dispatched, DND respected · minutes = COGS
CERTIFICATES completion marked (drafts dashboard / script) → scripts/certificate.mjs
             (HTML → Playwright PDF/PNG, issuer Outskill, code OSK-YYYY-NNNN) → auto-email
             via Brevo (transactional) → /verify/[code] public page (Supabase certificates
             table — infra/supabase-certificates.sql)
```

---

## Open decisions gating B (logged in agent/offers.md)
Accelerator duration/schedule · workshop dates + delivery platform · curriculum + instructors ·
EMI for ₹95k · refund policy · certificates/outcome data · seats per cohort.
