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

## 2026-08-24 — Stage 0: Sentry done (4c complete)
- Done: Sentry org infrasync-yc, Next.js project "storefront", DSN in .env (format-verified). All 8 core keys now present.
- Next: 4d — Groq + Google AI Studio (Gemini) + YouTube Data API keys; then only the slow items remain (Oracle VPS, Meta verification, Razorpay/Stripe, Merchant Center/Pinterest, product photos, offers.md).

## 2026-08-24 — Stage 0: key batch complete (4d)
- Done: Groq + Gemini (AI Studio) + YouTube Data API v3 keys in .env; 11/13 keys verified (Pexels/Pixabay deferred to Stage 3).
- Remaining Stage 0 (all human/slow): Oracle VPS · Razorpay/Stripe KYC · Meta WhatsApp verification + Commerce Manager · Merchant Center + Pinterest (after site) · research inbox · Pomelli DNA (after site) · product photos · agent/offers.md + icp.md answers.
