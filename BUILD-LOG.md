# Build log

Append-only record of what each build-loop iteration actually did. Newest entry at the
bottom. The loop (`/marketing-loop`) reads this before working so nothing is redone, and
writes one entry per iteration in this format:

```
## YYYY-MM-DD — Stage N
- Done: <what was completed>
- Verified: <how it was checked>
- Next: <next task + class (EXECUTE / USER / DECISION)>
- Open questions: <or "none">
```

---

## 2026-08-21 — Stage 0 (manual session with Claude, before the loop started)
- Done: project domain identified and recovered — `infra-sync.online` at Spaceship
  (registered ~17 Apr 2026, expires 17 Apr 2027, privacy ON, auto-renew OFF by choice —
  renewal decision logged in plan/06). Domain confirmed present in the user's Spaceship
  Domain Manager. Domain written into README, plan/02 Caddyfile, plan/06 triggers.
- Verified: WHOIS/registry lookups + user's Domain Manager screenshot.
- Next: user secures the Spaceship account (2FA, transfer lock, account email noted) and
  points nameservers to Cloudflare → then Stage 0 checklist items in plan/00-stack.md.
- Open questions: none.

## 2026-08-21 (late) — Stage 0 (manual session with Claude)
- Done: full domain lockdown + Cloudflare handover, step by step with the user:
  Spaceship account secured (passkey + TOTP 2FA active, account email captured by user);
  transfer lock verified ON at registry; auto-renew deliberately OFF (renewal decision
  Mar 2027, plan/06); Cloudflare free account created under the same email; zone
  `infra-sync.online` added (Free plan, AI-crawl defaults kept: search/agents allowed,
  training blocked); Spaceship's 3 email-forwarding records auto-imported into Cloudflare
  DNS; nameservers switched to jaziel/uma.ns.cloudflare.com.
- Verified: registry WHOIS shows both Cloudflare nameservers + clientTransferProhibited.
  Cloudflare zone still "pending" while global DNS propagates — flips to Active
  automatically.
- Next: remaining Stage 0 accounts — start Meta WhatsApp business verification and the
  Oracle Always-Free VPS hunt first (both slow), then Supabase, GitHub repo push, Brevo,
  PostHog, Sentry, NIM/Groq/Gemini keys, Pexels/Pixabay.
- Open questions: none.

## 2026-08-22 — Stage 0 (update)
- Done: Cloudflare zone `infra-sync.online` confirmed **Active** by the user (nameserver propagation complete).
- Next: remaining Stage 0 accounts (Meta WhatsApp verification + Oracle VPS first).

## 2026-08-22 — Plan pivot: ads via Google Flow + niche locked
- Done: local ComfyUI/Wan ad pipeline dropped. Ads now generated in Google Flow (Veo 3.1)
  on the user's existing Google AI Pro (₹0 extra). New competitor-research → brief → Flow
  → join → publish loop written to plan/03, workflows/ugc-ad-pipeline.md, plan/05 §6.
  Niche locked: AI-skills training ($199 workshop · $1,000 basics · $3,000 accelerator),
  CTA "Join our masterclass today" → agent/offers.md created as the single source of facts.
  SEO layer defined (₹0 stack; every-app/open-seo optional, needs paid DataForSEO key).
- Verified: Flow facts checked against 2026 sources (8s segments, 3 reference images,
  Extend, Pro = 1,000 credits, watermark on Pro, no API).
- Next: user confirms the compliance decision (AI people as hosts, not "students");
  confirms masterclass mechanics in agent/offers.md; then Stage 0 accounts continue.
- Open questions: masterclass free vs paid · platform for a 2-hour live session at ₹0
  (YouTube Live unlisted) · payment provider / currency display.

## 2026-08-22 — PIPELINES.md added
- Done: one-page map of the final pipelines (A ads via Flow · B masterclass funnel · C leads ·
  D SEO/content · E weekly rhythm · F build loop) + the 4 open decisions gating the funnel.

## 2026-08-22 — Plan pivot #2: the business is now D2C apparel & footwear
- Done: InfraSync redefined as a direct-to-consumer apparel and footwear brand (clothing,
  shoes, bags and accessories; innerwear sold but never advertised; no food/electronics).
  Propagated everywhere: README (constraints, stack, status, rules incl. innerwear rule and
  per-order-cost clarification), AGENTS.md (brand + compliance rules), PIPELINES.md (ads,
  shopping funnel, customer pipeline, SEO, rhythm, build), agent/offers.md (catalog table,
  open items, claims policy), plan/00 (Medusa commerce backend, Razorpay/Stripe, Merchant
  Center / Meta catalog / Pinterest, checklist), plan/01 (storefront: Next.js + Medusa,
  subscribers schema), plan/02 (Medusa on the VPS, Caddy routes), plan/03 (product ads from
  real product photos; product-accuracy rule), plan/04 (growth engine: capture, flows,
  WhatsApp order updates, free listings, real reviews), plan/05 (customer-touch loop +
  content agent + competitor agent), plan/06 (e-com funnel, COGS vs overhead, risks),
  workflows (ad pipeline, customer pipeline, weekly rhythm), prompts/kimi-kickoff.md.
- Verified: repo-wide grep shows no course/masterclass-era references outside this log; no
  encoding issues.
- Next: user fills the catalog table + open items in agent/offers.md (products source,
  photos, audience, currency/payments, shipping/returns, brand name decision, competitors,
  Medusa vs WooCommerce); then Stage 0 accounts continue (Razorpay/Stripe KYC, Meta
  verification, Oracle VPS first).
- Open questions: see agent/offers.md open items.

## 2026-08-22 — Research artifact re-synced
- Done: the published "Open Marketing Stack" page now reflects the apparel + Google Flow plan (TL;DR build, ad factory section, architecture, footer); catalog sections kept as the record of alternatives. Same URL.

## 2026-08-23 — Stage 0.5 prep done by the agent (no user input needed) — CHECKLIST
- [x] Machine audit: Git 2.53 ✓ · Node 24 ✓ · npm 11 ✓ · Python 3.11.9 ✓ · Docker 29 ✓ · gh 2.95 ✓ · **FFmpeg missing** (user: `winget install Gyan.FFmpeg`)
- [x] `.gitignore` (secrets, tool state incl. `.freebuff/`, node_modules, renders) · `.gitattributes` (LF for scripts) · `.env.example` (all key names)
- [x] `infra/`: Caddyfile (api/admin/news/social) · docker-compose.yml (Caddy, Postgres, Redis, Medusa, Listmonk, Postiz) · init-dbs.sql · supabase-schema.sql
- [x] `scripts/`: join.sh (FFmpeg concat → VO → captions → end card → −14 LUFS) · captions.py (faster-whisper SRT) · tts.py (Kokoro) · feed.py (stub) · README with tested/untested table — all UNTESTED skeletons
- [x] `agent/`: icp.md template · research/README (brief template + sources) · prompts/ (ad-brief, email-touch, product-copy)
- [x] `knowledge/` model-agnostic memory: README (how it works + Graphify install/use) · context.md (1-page situation) · decisions.md (ADR log) · tooling.md (agents/models/providers + deprecations) · glossary.md · handoff.md (session protocol)
- [x] Wired the knowledge base into AGENTS.md, prompts/build-loop.md, prompts/kimi-kickoff.md (read context first; update decisions/tooling/context; git ON — commit after every verified task)
- [x] README repo layout updated · plan/00-stack.md Stage 0.5 ticks + FFmpeg + GitHub push + Graphify items
- [x] Placeholders: assets/products/README · ads/README · storefront/README
- [x] `git init -b main` + first commit `4df0e1c` (43 files, .env not included)
- Verified: file tree + git log; scripts not executed (FFmpeg absent; no audio sample yet)
- Next (user): install FFmpeg · `gh repo create infrasync-marketing-os --private --source . --push` · create `.env` from `.env.example` · fill `agent/offers.md` + `agent/icp.md` · product photos · Supabase project → then Stage 1 with Antigravity (Opus 4.6)
- Open questions: none new — see agent/offers.md open items

## 2026-08-23 — Stage 0: FFmpeg + GitHub done (steps 1–2 of the prep walkthrough)
- Done: FFmpeg 9.0 installed & verified; repo pushed to private GitHub (shivam31bharti-arch/infrasync-marketing-os, main). plan/00 ticks updated.
- Next: user creates .env from .env.example (step 3), then account batch (step 4).

## 2026-08-23 — Stage 0: Supabase done (step 4a)
- Done: org InfraSync + project infrasync (Mumbai, free). URL + anon + service keys in .env (legacy JWT variants — valid). infra/supabase-schema.sql executed; all 5 tables verified live via REST probe.
- Next: Brevo (4b) → PostHog + Sentry (4c) → Groq/Gemini/YouTube keys (4d).

## 2026-08-23 — Stage 0: Brevo done (step 4b)
- Done: Brevo free account (company InfraSync, sells-online yes, promo emails opted out). SMTP login + generated key stored in .env, format-verified.
- Next: PostHog + Sentry (4c), then Groq/Gemini/YouTube keys (4d).

## 2026-08-24 — Stage 0: .env recovered + PostHog done
- Incident: re-running "copy .env.example .env" wiped the filled .env; .env.example and git verified clean (no secret ever committed). All values re-entered from their dashboards; Brevo SMTP key regenerated.
- Done: PostHog account (US cloud) + project token in .env. All 7 present keys length-checked; Supabase re-probed OK end-to-end.
- Rule reinforced: .env is only ever edited via notepad; the copy command is never re-run.
- Next: Sentry DSN (finishes 4c) -> Groq/Gemini/YouTube keys (4d).

## 2026-08-24 (night shift) — Stage 1 task 1: storefront scaffold
- Done: `storefront/` = Next.js 15 App Router (TS). Home, 3 collections (clothing/footwear/bags-accessories), product page w/ variant selector + JSON-LD, cart (localStorage; checkout button is a placeholder — no payments), 4 policy pages w/ obvious placeholders, subscriber popup + footer form → `/api/subscribe` → Supabase (service-role, server-side only, root `.env` loaded dev-only), Turnstile stubbed w/ TODO. PostHog + Sentry wired (events defined). All copy `[[PLACEHOLDER]]`; samples marked DO NOT PUBLISH. `storefront/.env.local` generated from root `.env` w/ public keys only (gitignored).
- Verified: `npm run build` passes — 14 routes, 0 errors.
- Next: Medusa backend (task 2), then live subscribe test (task 3), live PostHog/Sentry smoke (task 4).
- Open questions: Turnstile site key needs user (Cloudflare dashboard).

## 2026-08-24 (night shift) — Stage 1 task 2: local Medusa v2 commerce backend
- Done: `medusa/` hand-rolled Medusa v2 app (@medusajs 2.19) + Postgres 16 & Redis 7 in Docker
  Desktop containers (`medusa-pg` :5433, `medusa-redis` :6380 — NOT infra/docker-compose.yml,
  that stays VPS-only). Migrations run; admin user `admin@infrasync.local` / `infrasync-dev-2026`
  (LOCAL DEV ONLY — rotate for VPS); seed script created publishable API key + INR/India region +
  3 categories + 3 clearly-fake samples ("…— DO NOT PUBLISH", ₹999 placeholder). Storefront wired
  to `http://localhost:9000` + publishable key (in `storefront/.env.local`, gitignored).
  Gotchas fixed: starter expects `ts-node` (+`ts-node.transpileOnly` in tsconfig) and exact-pinned
  `@mikro-orm/*@6.6.14` set present in package.json.
- Verified: `/store/products` returns the 3 samples (HTTP 200, key-auth); Admin `/app` HTTP 200;
  storefront dev server renders Sample Tee on `/`, Sneaker on `/collections/footwear`,
  `/products/sample-tee` renders, and the "backend unreachable" fallback badge is ABSENT.
- Next: subscribe live test (task 3).
- Open questions: none.

## 2026-08-24 (night shift) — Stage 5 task 5: LLM router (done out of order while npm installed)
- Done: `agent/llm.py` — Groq → Gemini → NIM fallback, OpenAI-compatible, stdlib-only (no deps),
  keys from root `.env`, 429 retry once then fall through, per-provider attempt trail. Defaults
  updated to current models: `openai/gpt-oss-120b` (Groq) · `gemini-3.5-flash` (Gemini) ·
  `meta/llama-3.1-8b-instruct` (NIM). Fixes found live: Groq edge blocks default urllib UA
  (403 code 1010 → custom UA header); `llama-3.3-70b-versatile` + `gemini-2.0-flash` retired (404).
- Verified: one tiny live call per provider — 3/3 returned `ok` (136/75/42 tokens). Full router
  path also exercised (fallback trail works).
- Next: wire usage logging into Supabase (`drafts.agent_reasoning`/`meta`) when draft
  generation lands (plan/05 §1 last bullet).
- Open questions: none.

## 2026-08-24 — Stage 0: Sentry done (4c complete)
- Done: Sentry org infrasync-yc, Next.js project "storefront", DSN in .env (format-verified). All 8 core keys now present.
- Next: 4d — Groq + Google AI Studio (Gemini) + YouTube Data API keys; then only the slow items remain (Oracle VPS, Meta verification, Razorpay/Stripe, Merchant Center/Pinterest, product photos, offers.md).

## 2026-08-24 — Stage 0: key batch complete (4d)
- Done: Groq + Gemini (AI Studio) + YouTube Data API v3 keys in .env; 11/13 keys verified (Pexels/Pixabay deferred to Stage 3).
- Remaining Stage 0 (all human/slow): Oracle VPS · Razorpay/Stripe KYC · Meta WhatsApp verification + Commerce Manager · Merchant Center + Pinterest (after site) · research inbox · Pomelli DNA (after site) · product photos · agent/offers.md + icp.md answers.

## 2026-08-24 (night shift) — Task 7: drafts dashboard + CI
- Done: `/drafts` page skeleton (server component) listing Supabase `drafts` — gated behind
  `DRAFTS_DASHBOARD=1` in root `.env` (404 otherwise; TODO: real Supabase auth before public
  deploy). Approve/Reject buttons → `PATCH /api/drafts/[id]` → sets `approved` + `reviewed_by`.
  Page ONLY flips queue rows — nothing sends. `.github/workflows/storefront-build.yml` runs
  `npm ci && npm run build` on storefront pushes (no secrets needed).
- Verified: inserted test draft via REST → page listed it w/ buttons → PATCH approve → row shows
  `approved=true, reviewed_by=local-user` → test row deleted (queue clean). `npm run build`
  passes with both new routes (only benign Sentry/OpenTelemetry bundling warning).
- Open questions: none.

## 2026-08-24 (night shift) — Task 6: media scripts tested end-to-end (all PASS)
- Done: two 5s test clips (testsrc+440Hz, smptebars+880Hz) → Kokoro `vo.wav` → faster-whisper
  `captions.srt` (transcription accurate) → `join.sh --vo` full run. venv `.venv/` created with
  faster-whisper/kokoro/soundfile. scripts/README table updated honestly.
- Bugs found & fixed (real ones, in the skeletons): (1) `join.sh` concat list had paths relative
  to the ad folder but the list file lives in `out/` — ffmpeg couldn't open inputs (now `../clips/…`);
  (2) caption `MarginV=260` is ASS units (PlayResY≈288) not pixels — 260 overflowed and pinned
  captions to the TOP of frame; verified visually, set to 40 (≈267px bottom safe zone, confirmed
  in extracted frame); (3) `captions.py` `device=auto` crashed (cublas64_12.dll absent) → CPU
  int8 default, `WHISPER_DEVICE=cuda` env to opt back in; (4) MSYS/Windows path-in-filter gotcha
  documented in scripts/README.
- Verified: final `adtest.mp4` 6.1s, 1080x1920, burned captions bottom-third (frame inspected), VO
  audio aac, loudnorm −14 LUFS pass ran. tts.py + captions.py ran live.
- Open questions: end-card step untested (needs `assets/brand/endcard.png` → asset + user).

## 2026-08-24 (night shift) — Stage 1 task 3: subscriber capture live
- Done: `/api/subscribe` (Next route → Supabase `subscribers` via service role, upsert on email,
  consent=true) tested end-to-end on the dev server.
- Verified: POST `{email: nightshift-devtest@…, source: 'dev-test'}` → HTTP 200 → row present in
  Supabase via REST (consent ✓, segment 'new') → row deleted (0 rows remain). Bad email → 400.
- Next: Turnstile verification once the user creates a site key (stub TODO already in place).
- Open questions: Turnstile site key (user).

## 2026-08-24 (night shift) — Stage 1 task 4: analytics + error monitoring smoke
- Done: PostHog — one `night_shift_smoke` capture event accepted (`status: Ok`); the storefront
  SDK fires product_viewed/add_to_cart/checkout_started/subscribed on real interactions, and
  `purchase` is defined for when checkout exists. Sentry — one test error event accepted
  (HTTP 200, event_id 57dd4d73…) via the project DSN; SDK wired via instrumentation.ts.
  One event each — no floods.
- Verified: exact responses above.
- Open questions: none.

## 2026-08-24 — PIVOT #3: AI education (final), full doc sweep + Claude handoff
- Done: business re-defined — $20 2-Day AI Workshop → AI Generalist Accelerator (non-tech;
  vibe coding + AI tools) + AI Engineer Accelerator (Python required; AI-augmented
  engineering, performance, time management), both $1,200 intl / ₹95,000 India. Rewritten:
  README, AGENTS, PIPELINES, offers.md (REAL prices now), icp.md, plan/00–06, all workflows,
  agent/prompts (product-copy → program-copy), night-shift + design-sprint (premium tech-ed
  theme; hero feature = track-fit quiz) + design-loop retargeted, infra (Medusa removed from
  compose/Caddy/init-dbs), .env.example (Medusa keys dropped), glossary, context.md.
  scripts/feed.py deleted. knowledge/claude-handoff.md created (operator's manual for the
  next Claude/senior agent). Audit: no live apparel/Medusa references outside history files
  and explicit removal instructions.
- Retired, safe to delete when convenient: medusa/ folder · Docker containers pg:5433 +
  redis:6380 · storefront commerce routes (Stage 1 task removes them).
- Verified: repo-wide grep audit (above); all patches applied ok.
- Next: user stops any agent still running the apparel design loop → new session with
  prompts/design-sprint.md (education theme). User-only: Stripe + Razorpay accounts, Oracle
  VPS, Meta verification, offers.md open items (dates/duration/curriculum/EMI/refund).
- Open questions: offers.md open-items list.

## 2026-08-25 — TODAY-mode: one-day ship runbook + voice/chat/certificates
- Done: plan/TODAY.md (3 parallel tracks, honest cannot-finish-today list with workarounds,
  tonight's definition of done). New components specced + wired into docs: site chat agent
  (/api/chat, offers.md-only knowledge), OmniDimension voice counselor (config in
  agent/voice-agent-config.md — to be created in the DEDICATED account, NOT the demo account
  connected to Claude's session; no calls dispatched), Outskill completion certificates
  (infra/supabase-certificates.sql + scripts/certificate.mjs spec + /verify/[code]).
  Brand/issuer confirmed: Outskill ("InfraSync" was the codename). night-shift greenlist
  extended (chat agent, certificates); README/PIPELINES/plan05/offers/context updated.
- Note: Claude listed the connected OmniDimension account read-only (4 demo agents, 0 phone
  numbers), created NOTHING there per founder instruction.
- Next: Track A (founder browser tasks + offers.md answers) · Track B (build agent runs
  night-shift greenlist NOW) · Track C (Claude reviews + drives Pages deploy).
- Open questions: offers.md open items (dates/duration/curriculum/EMI/refund/cert signatory).

## 2026-08-25 — Continuity system audited + hardened
- Done: audit of the new-agent context system (all knowledge files present; git clean/pushed;
  BUILD-LOG carries Next lines). Fixes: prompts/kimi-kickoff.md → **prompts/START-HERE.md**
  (universal onboarding for ANY model, includes the PLAN→EXECUTE→TEST→SAVE→REPORT loop with
  mandatory test evidence + resume lines); checkpoint rule added to knowledge/handoff.md;
  build-loop RECORD step now requires actual evidence + exact resume instructions; README
  pointers updated.
- Verified: reference grep (one live pointer updated; history mentions left); git mv tracked.
- Next: proceed with plan/TODAY.md Track B — new agent starts by pasting prompts/START-HERE.md.
- Open questions: none.

## 2026-08-25 — Stage 1: storefront repurposed (green-lit tasks 1–7)
- Done: complete storefront repurpose from retired AURELIAN apparel e-commerce to InfraSync
  AI education program site. Executed plan/TODAY.md Track B green-lit list:
  **Task 1 — commerce strip**: deleted app/collections/, app/products/, app/cart/,
  lib/medusa.ts, lib/cart.ts, lib/demo-data.ts, components/ProductCard+ProductDetail.
  **Task 2 — program pages**: `/` (hero + two-track split + how-it-works + FAQ), `/workshop`
  ($20, payment link from env), `/programs/ai-generalist` ($1,200/₹95,000),
  `/programs/ai-engineer` (Python prereq at top + prereq section + prereq box),
  `/thank-you` (dynamic product param), `/policies/{refund,privacy,terms,contact}` (education
  context; TBD items styled "announced soon").
  **Task 3 — track-fit quiz**: `/quiz` — 6 deterministic questions, weighted scoring,
  recommends Generalist/Engineer, progress bar, score bar, retake option → saves to Supabase
  via `/api/quiz` (upserts into subscribers with segment + meta.program) → PostHog
  `quiz_completed` event.
  **Task 5 — design system**: rethemed globals.css — palette (ink #0A0E14, paper #F4F2EC,
  electric #4F7CFF, warm gray #8A8F98), fonts (Space Grotesk display, Inter body, JetBrains
  Mono code), alternating dark/light sections, track cards, program badges, responsive nav,
  TBD styling. Layout rewritten: education nav, Outskill branding, education footer.
  Components updated: SubscribeForm (education copy + design classes), SubscriberPopup
  (education copy + styled panel).
  **Task 6 — chat agent**: `/api/chat` — LLM router (Groq → Gemini → NIM), offers.md-only
  system prompt, claims policy enforced (refuses to invent), rate-limited (20 msgs/session,
  500 char/msg), 10s timeout per provider, fallback message. ChatWidget component: floating
  panel on every page, PostHog `chat_opened`/`chat_message` events.
  **Task 7 — certificates**: `/verify/[code]` page reads `certificates` table (schema in
  infra/supabase-certificates.sql — already existed). Verified/not-found states. Displays
  student name, program, date, cert code. States completion-only (no accreditation claims).
  Analytics updated: commerce events replaced with education events (workshop_register,
  quiz_completed, checkout_click, chat_opened, chat_message).
- Verified: `npm run build` → 0 errors, 16 routes (13 static/SSG + 5 dynamic API/pages).
  Grep for stale commerce refs (Medusa/AURELIAN/apparel/clothing/footwear/DEMO_BRAND/
  Cormorant) → 0 matches in storefront source. Python prereq visible on `/programs/ai-engineer`
  (badge + prereq box + prerequisites section). All prices match offers.md ($20/$1,200/₹95,000).
  TBD items (dates, curriculum, refund, EMI, schedule, instructor) render as styled "announced
  soon" — nothing invented. Chat agent system prompt enforces claims policy.
- Next: `scripts/certificate.mjs` (Playwright render + Brevo SMTP email) end-to-end test
  → then design-loop polish → then deploy prep. Resume: `node scripts/certificate.mjs --test`
  after founder runs `infra/supabase-certificates.sql` in Supabase SQL editor.
- Open questions: offers.md open items (dates, schedule, curriculum, EMI, refund, cert
  signatory) still unchecked — pages show "announced soon" which is correct per night-shift
  rules. Founder: please fill them when ready; agent will refresh all pages on next run.

## 2026-08-25 — SHIFT HANDOFF: Opus (Antigravity) → Kimi K3 (checkpoint closed by Claude)
- Opus shift delivered (verified per its log above): commerce fully stripped · program site
  pages built (/, /workshop, /programs/*, /quiz + api/quiz, /thank-you, /verify, /policies) ·
  chat agent (/api/chat + widget, claims-policy system prompt) · education analytics events ·
  npm build 0 errors / 16 routes · stale-commerce grep = 0.
- Gap fixed here: Opus wrote its log but did NOT commit/push — this commit is its checkpoint,
  closed by Claude. ALSO: founder-confirmed facts landed in agent/offers.md AFTER Opus's last
  page refresh (workshop Sat+Sun 2–8 PM IST + dates Aug 29–30/Sep 5–6/Sep 12–13 · cohort
  Sep 15 · no-cost EMI 3/6/10 · workshop non-refundable, shown BEFORE payment · accelerator
  4-week money-back · AI reminder-call feature + consent line · curricula) — pages still show
  "announced soon" for these.
- NEXT (Kimi K3, in order):
  1. Re-read agent/offers.md → refresh ALL pages/chat-prompt with the confirmed facts above.
  2. Certificate system end-to-end (resume: `node scripts/certificate.mjs --test` — BLOCKED
     until founder runs infra/supabase-certificates.sql in the Supabase SQL editor; if still
     blocked, build the script + /verify page logic and test everything except the DB insert).
  3. Then prompts/design-loop.md until a stop rule fires.
- Open questions: founder to run the certificates SQL · accelerator duration number ·
  instructor + signatory names.

## 2026-08-25 — Certificates SQL run (founder) — blocker cleared
- certificates table live in Supabase, probe-verified by Claude. Kimi may run the FULL certificate end-to-end test (DB insert + render + Brevo email to founder inbox + /verify page).

## 2026-08-25 — Kimi K3 shift: facts refresh + SkillSync rename + Razorpay wiring + Cloudflare adapter
- Done (task 0, own commit c3de849): @opennextjs/cloudflare 1.20.2 + wrangler 4.125.0;
  open-next.config.ts, wrangler.jsonc (main .open-next/worker.js, ASSETS binding,
  nodejs_compat, compat 2026-08-01), preview/deploy scripts, .gitignore (.open-next/,
  .wrangler/), server-env.ts try/catch (Workers has no fs). Verified: `npm run build`
  16 routes 0 errors · `npx opennextjs-cloudflare build` → worker.js + assets generated.
  FOUNDER UNBLOCKED: connect Pages (build `npx opennextjs-cloudflare build`, output
  `.open-next/assets`; set 3 NEXT_PUBLIC_RAZORPAY_*_LINK vars in Pages settings).
- Done (facts refresh, all pages + chat prompt): workshop Sat+Sun 2–8 PM IST + dates
  Aug 29–30 / Sep 5–6 / Sep 12–13 2026 (/workshop + home) · cohort Sep 15, 2026 + Tue/Thu
  8–10 PM IST + weekend office hours (both program pages) · no-cost EMI 3/6/10 lines ·
  workshop NON-REFUNDABLE stated before payment (hero near button, schedule button, FAQ) ·
  accelerator 4-week money-back (FAQ, refund policy page — now real copy, program pages) ·
  AI reminder-call feature + consent line on /workshop · founder curricula replace TBD
  cards (Generalist 5 modules, Engineer 6) · /api/chat system prompt rewritten with all of it.
- Done (brand sweep): Outskill → SkillSync across site copy, layout/footer, policies,
  /verify, chat prompt, globals.css, offers.md, voice-agent-config.md, README, PIPELINES,
  plan/05, plan/TODAY, night-shift, context.md, infra SQL comments. Cert prefix OSK-→SSC-.
  History in BUILD-LOG/decisions untouched; rename logged as a new decision.
- Done (payments): .env key renamed NEXT_PUBLIC_STRIPE_WORKSHOP_LINK →
  NEXT_PUBLIC_RAZORPAY_WORKSHOP_LINK (surgical single-line, encoding preserved); code reads
  only NEXT_PUBLIC_RAZORPAY_{WORKSHOP,GENERALIST,ENGINEER}_LINK via serverEnv (root .env is
  loaded at build — NEXT_PUBLIC vars outside storefront/ were invisible before); Stripe vars
  removed from code; terms/privacy updated; .env.example updated.
- Done (price): workshop = $20 international · ₹1,999 India (founder-locked) on /workshop,
  home, metadata; offers.md workshop row updated.
- Bug fixed: chat NIM provider read NIM_API_KEY but .env has NVIDIA_API_KEY — fallback never
  fired. Now correct.
- Verified: npm run build 0 errors / 16 routes · prerendered HTML contains rzp.io href on
  /workshop, /programs/ai-generalist, /programs/ai-engineer (all 3 buttons live) · UTF-8
  spot checks pass (₹1,999, 2:00–8:00 PM IST, Sep 15 2026, EMI, curricula, PYTHON REQUIRED) ·
  `grep -ri outskill` → only BUILD-LOG.md history + decisions.md rename entry · `OSK` → only
  the decisions.md entry.
- Next: certificate end-to-end — build scripts/certificate.mjs (issuer SkillSync, code
  SSC-YYYY-NNNN; `--test` = Test Student cert emailed via Brevo SMTP to founder inbox only
  (= Brevo account address in .env, value never printed)) + prove /verify/[code] resolves it.
  Then prompts/design-loop.md until a stop rule fires.
- Open questions: founder to connect Cloudflare Pages + swap test→live Razorpay links after
  KYC · accelerator duration in weeks · instructor + cert signatory names.

## 2026-08-25 (morning) — Claude audit: night shift verified, cert task closed to 90%, day shift prepped
- Verified bfcc4a3 evidence honestly: outskill=0 in storefront ✓ · offers.md header = SkillSync ✓ ·
  3 payment buttons + ₹1,999 confirmed in the log's build evidence ✓.
- Founder-side milestones (done with Claude, logged here for continuity): 3 Razorpay TEST
  Payment Pages live + probed HTTP 200 (workshop ₹1,999 YnzvRKMr · generalist 95k BZZDx5n ·
  engineer 95k 416AflD), URLs in .env AND storefront/.env.local (Next.js only reads the
  latter) · HubSpot Free CRM "SkillSync" created; Gmail inbox-sync disabled + scraped
  contacts wiped; 14-contact @example.com demo pipeline imported (Program dropdown +
  Enrollment Status text properties) · OmniDimension Course Counselor created + web-call
  tested in the DEDICATED account · Twenty/Docker CRM dropped (demo runs from any laptop) —
  HubSpot chosen; compose kept in crm/ for the future VPS · test payment made (4111 card).
- Cert e2e (was stalled overnight): ran `--test` → PDF+PNG rendered
  (scripts/out/certificates/SSC-2026-0000.*) + DB row SSC-2026-0000 registered ✓ · email leg
  FAILED Brevo 535: BREVO_SMTP_USER is a gmail address; Brevo SMTP needs the generated
  @smtp-brevo.com login. Patched --test recipient to FOUNDER_EMAIL || BREVO_SMTP_USER.
  RESUME: founder fixes .env (SMTP login + fresh xsmtpsib- key + FOUNDER_EMAIL=) →
  `node scripts/certificate.mjs --test` → expect [3/3] emailed + emailed_at set → then prove
  /verify/SSC-2026-0000 renders.
- Voice-agent KB generated from swept offers.md → agent/skillsync-kb.pdf (founder uploads to
  OmniDimension Knowledge Base manually).
- NEXT: day shift runs prompts/day-shift-opus.md (cert email leg → production smoke tests
  after founder's Cloudflare deploy → design loop → ad briefs).

## 2026-08-25 (evening) — 🚀 GO-LIVE: infra-sync.online is in production (founder office + Claude)
- Cloudflare Workers Builds connected to GitHub (project skillsync-site, root storefront,
  OpenNext build/deploy). Custom domains attached: infra-sync.online + www (instant, zone
  in-account). Build vars set in dashboard but NOT injected into build env by CF → pages
  baked the "link coming soon" fallback. Fixed in 1ab595f: three PUBLIC payment URLs are
  code defaults in serverEnv (env override wins).
- Production smoke test PASSED: 11/11 routes HTTP 200 · each program page serves exactly its
  own rzp.io link (workshop YnzvRKMr · generalist BZZDx5n · engineer 416AflD) · ₹1,999 in
  workshop title.
- KNOWN GAPS: (1) Worker RUNTIME vars empty → /api/chat, /api/quiz, /verify lookups fail —
  founder adds SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY + GROQ/GEMINI/NVIDIA keys as runtime
  secrets in dash (values from each provider's dashboard) → auto-redeploys. (2) Brand text
  still "InfraSync" in layout metadata/home — day-shift cosmetic task. (3) Cloudflare may
  auto-PR a wrangler.jsonc name fix (infrasync-storefront→skillsync-site) — merge on sight.
- RESUME: day shift task 2 (production smoke) largely done by Claude; re-run after runtime
  secrets land, then design loop.

## 2026-08-26 (~1 AM) — Certificate e2e 100% + Drive delivery infra ready (founder + Claude)
- SMTP root cause: BREVO_SMTP_USER must be the generated login b6766c001@smtp-brevo.com, NOT
  the gmail. Existing key was valid all along. .env fixed (login + FOUNDER_EMAIL added).
- `node scripts/certificate.mjs --test` → [3/3] SMTP 250 OK queued → cert email delivered to
  founder inbox. Cert task CLOSED.
- Google Drive delivery infra (personal acct busnz122 — work acct blocked SA keys by org
  policy): GCP project skillsync-506618 · Drive API enabled · SA
  skillsync-delivery@skillsync-506618.iam.gserviceaccount.com · JSON key at
  .secrets/gdrive-sa.json (gitignored) · Drive folder "SKILLSYNC" shared with SA as Editor,
  General access Restricted.
- Razorpay TEST API keys in .env (rzp_test_, shapes verified).
- NEXT: delivery-pack.mjs (Razorpay→Supabase→participation certs→Drive grants→8:30 PM email)
  + Brevo domain auth for team@infra-sync.online + Worker runtime secrets (founder, CF dash).
