# TODAY — the one-day ship runbook (2026-08-25)

Goal by tonight: **site LIVE on infra-sync.online** with workshop funnel, track quiz, chat
agent, voice agent configured, and certificate automation working end-to-end on a test.
Three tracks run in parallel. Facts from `agent/offers.md`; anything TBD ships as a styled
"announced soon" state.

## Honest physics — cannot finish today no matter what (workarounds included)
| Item | Why | Today's workaround |
|---|---|---|
| Razorpay LIVE approval (₹95k + EMI) | KYC review takes days | Create account + submit KYC NOW; site ships with **test-mode links** or "Reserve your seat" form; swap to live links when approved |
| Meta WhatsApp verification | Meta review | Email reminders only (Brevo, free); WhatsApp joins later |
| Oracle VPS + Listmonk/Postiz | Capacity lottery | Not needed today: confirmations/certificates send via **Brevo SMTP directly** from scripts/site; social posting stays manual |
| Stripe (intl $1,200/$20) | India onboarding varies | Attempt signup; if blocked, intl payments = "Request invoice" button for now |

## Track A — YOU (browser + decisions; ~2–3 h total, start immediately)
1. **Fill `agent/offers.md` open items** (30 min, unblocks everything): workshop dates,
   accelerator duration/schedule, curriculum bullets (5–8 per track), instructor line,
   refund policy sentence, EMI yes/no, seats. TBD is allowed — decide what's decidable.
2. **Razorpay**: signup + submit KYC + create test Payment Pages ($…/₹ equivalents).
   **Stripe**: attempt signup + two Payment Links ($20, $1,200) in test mode.
3. **Cloudflare Pages** (10 min, with me when site builds green): connect the GitHub repo →
   build `storefront/` → attach `infra-sync.online`. + Create a **Turnstile** site key.
4. **OmniDimension — in your OTHER account**: create the agent from
   `agent/voice-agent-config.md` (copy-paste), attach the offers PDF to its knowledge base,
   and note the widget/number options. **No outbound dispatch today** except a test call to
   YOUR OWN number.
5. Research inbox + Pexels/Pixabay keys if time remains (not blocking).

## Track B — BUILD AGENT (Antigravity/Opus or `auto-heavy`; runs all day)
Prompt: *"Read prompts/night-shift.md and execute the green-lit list top to bottom."*
The list now covers: strip commerce → program pages → track quiz → **chat agent** →
**certificate system** → payment-link wiring → design-sprint Phase A → design loop.
Definition of done per task is in the prompt; commits after every verified task.

## Track C — CLAUDE (review + glue)
Reviews Track B commits · helps drive Cloudflare Pages connect + DNS · verifies Supabase
policies + certificate test end-to-end · final pre-launch QC sweep (claims policy, prereq
lines, policies pages, Lighthouse).

## New components (specs)
- **Chat agent** (site widget): `/api/chat` on the LLM router (Groq→Gemini→NIM, keys in
  .env) with `agent/offers.md` + FAQ as its ONLY knowledge; refuses invention; answers
  prereqs/price/schedule; escalates to WhatsApp link + email. Rate-limited per session.
  PostHog `chat_opened`/`chat_message`. ₹0.
- **Voice agent** (OmniDimension, other account): config in `agent/voice-agent-config.md`.
  Use: inbound queries via web-call widget; outbound = workshop-registrant reminders ONLY
  (consent-based, human-triggered dispatch, DND respected). Call minutes = per-lead COGS
  from that account's credits.
- **Certificates (issuer: Outskill)**: on completion mark → generate branded certificate
  (HTML template → Playwright PDF/PNG, `scripts/certificate.mjs`) with unique code
  `OSK-YYYY-NNNN` → auto-email via Brevo (transactional) → public verify page
  `/verify/[code]` reads Supabase `certificates` (see `infra/supabase-certificates.sql` —
  run in the SQL editor). States completion only — no accreditation claims.

## Tonight's definition of DONE
- [ ] infra-sync.online serves the program site over HTTPS (Pages + domain attached)
- [ ] Workshop registration → Supabase row → confirmation email (Brevo direct)
- [ ] Track quiz works and saves results · chat agent answers from offers.md only
- [ ] Payment buttons live (test mode clearly OK) · policies pages exist
- [ ] Voice agent created in the correct OmniDimension account + one test call to yourself
- [ ] One test certificate generated, emailed, and verifiable at /verify/[code]
- [ ] BUILD-LOG updated · everything committed · design loop running or scheduled overnight
