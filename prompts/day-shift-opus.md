# Day shift — Claude Opus 4.6 (Antigravity) — 2026-08-25 (ship day, continued)

Read `prompts/START-HERE.md` first. Then work this list IN ORDER. Checkpoint after every
task: test with evidence → BUILD-LOG entry with resume line → commit → push.

## State you inherit (verified by Claude this morning)
- Night shift landed `bfcc4a3`: SkillSync sweep (outskill=0 in storefront), Razorpay-only
  payment wiring (3 buttons render rzp.io hrefs), ₹1,999 workshop price, offers facts on all
  pages, chat-prompt refresh, NIM key bug fixed. Build was green (16 routes).
- Certificate system: `scripts/certificate.mjs` built and 90% verified — PDF+PNG rendered
  (`scripts/out/certificates/SSC-2026-0000.*`), DB row `SSC-2026-0000` registered in
  Supabase. **Email leg blocked**: Brevo 535 — `BREVO_SMTP_USER` in `.env` is a gmail
  address but Brevo SMTP auth needs the generated `...@smtp-brevo.com` login. Founder is
  fixing `.env` (new SMTP login + fresh key + `FOUNDER_EMAIL=` line). Recipient logic
  already patched: `--test` emails `FOUNDER_EMAIL || BREVO_SMTP_USER`.
- Voice agent: live in the DEDICATED OmniDimension account, web-call tested. KB PDF ready
  at `agent/skillsync-kb.pdf` (founder uploads it manually).
- Founder-side: 3 Razorpay TEST pages live · HubSpot CRM "SkillSync" with 14-contact demo
  pipeline · test payment made. Cloudflare deploy happens founder+Claude in the dashboard.

## Tasks (in order)

### 1. Certificate email leg (BLOCKED until founder says .env is fixed — skip and return)
- `cd scripts && node certificate.mjs --test` → expect `[3/3] emailed` and `emailed_at` set
  on SSC-2026-0000. Recipient must be FOUNDER_EMAIL. Never any other recipient.
- Then prove `/verify/SSC-2026-0000`: `npm run dev` in storefront, curl the page, confirm it
  renders cert_no + student + program. Screenshot or HTML-grep as evidence. Checkpoint.

### 2. Production smoke tests (BLOCKED until founder says the Cloudflare deploy is live)
- All 16 routes return 200 on https://infra-sync.online (loop with curl).
- The 3 payment buttons render rzp.io hrefs in production HTML.
- `/api/chat` answers a test question with offers.md facts (POST a sample).
- `/verify/SSC-2026-0000` resolves in production.
- PostHog + Sentry beacons fire (check page source for keys, then dashboards).
- Any failure: diagnose, fix, push (Cloudflare auto-redeploys), re-test. Checkpoint.

### 3. Design loop (the rest of the day)
- Run `prompts/design-loop.md` (see-judge-fix with qa/snap.mjs + Lighthouse) until a stop
  rule fires (PASS ≥8.5 / plateau / 6 iterations). Premium tech-education aesthetic per
  `prompts/design-sprint.md`. Facts from `agent/offers.md` ONLY. Checkpoint per iteration.

### 4. If time remains
- Ad brief drafts for Google Flow (agent writes briefs; founder shoots in Flow) per
  `plan/TODAY.md` track 3. No fake students, no outcome claims (claims policy in offers.md).

## Hard rules
- Facts only from `agent/offers.md`. If a fact is missing, ASK the founder — never invent.
- `.env` is founder-owned: READ keys, never write or print values.
- No outbound sends to anyone except FOUNDER_EMAIL. No bulk anything.
- Never claim done without evidence in BUILD-LOG. If blocked, log the resume line and move on.
