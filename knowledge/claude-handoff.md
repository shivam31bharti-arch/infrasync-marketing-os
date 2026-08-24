# Handoff to the next Claude (or any senior agent taking the reins)

Written 2026-08-24 by the Claude session that built this system with the founder. A new session onboards via `prompts/START-HERE.md`. Read
`context.md` first for the current state; this file is the *operator's manual* — how to work
with this founder and this repo without relearning three days of lessons.

## The 60-second story
Founder (solo, marketing background, working nights around a day job) wanted a ₹0-overhead
marketing engine. In ~3 days we: recovered a forgotten domain (infra-sync.online @ Spaceship —
the account hunt is a BUILD-LOG story), locked Cloudflare, stood up Supabase/Brevo/PostHog/
Sentry + all free LLM keys, built the multi-agent build system (this repo), ran AI night
shifts (Kimi K3, then Nemotron 3 Ultra) that scaffolded a Next.js site and tested the ad
scripts, and pivoted the business twice — final: **AI education** (see context.md). Claude's
role: architect, reviewer, and step-by-step guide; cheap/free agents do the typing.

## How this founder works (respect these)
- **One step at a time.** For anything hands-on (accounts, dashboards) they want a single
  numbered step, then they screenshot or say "done", then the next step. They skip-read long
  instructions — put the ONE action first.
- **Verify everything.** They expect you to check their work with real probes (grep the .env
  shapes, hit the API, read the registry) — never take "done" on faith; they respect being
  told when something is not actually done.
- **They pivot.** Plans changed 3× in 3 days. Never resist; update the docs sweep-style
  (grep for stale references), log the decision, and move. The repo, not the chat, is truth.
- **Budget is identity:** ₹0–100/month overhead is a hard rule they're proud of. Per-sale
  costs are fine. Never suggest paid tiers casually; there's a trigger table in plan/06.
- **Security needs guardrails, not lectures:** they once pasted a blank .env into chat and
  once nuked their filled .env by re-running the copy command. Rules that stuck: secrets go
  dashboard→Notepad only, Claude verifies with yes/no probes, `.env` is edited only via
  notepad. Watch for the "saved from a stale Notepad window" failure — it happened twice.
- **They run multiple AI tools** (Antigravity/Opus+Gemini by day, Kimi K3 nights 1–6 AM IST,
  Nemotron via the LiteLLM proxy, Kilo Code as the harness). BUILD-LOG.md is the shared
  memory across all of them. Never let two agents edit the working tree simultaneously.

## The machinery (all built, all working)
- **Build loop**: `prompts/build-loop.md` (canonical) / `/marketing-loop` (Claude Code) —
  one verified task per iteration, EXECUTE/USER/DECISION classes, log → commit → ask.
- **Night shift**: `prompts/night-shift.md` — unattended variant: questions get logged, not
  asked; green-lit task list; placeholders instead of invented facts.
- **Design**: `prompts/design-sprint.md` (what to build) + `design-loop.md` (see-judge-fix
  with Playwright screenshots + Lighthouse until PASS / plateau / 6 iterations).
- **Model failover**: `infra/litellm.config.yaml` → localhost:4000, ids `auto-coder` and
  `auto-heavy` (Nemotron 3 Ultra first). Kimi is fast ~1–6 AM IST, congested by day.
- **Memory**: `knowledge/` pack + BUILD-LOG + git. Optional Graphify (see knowledge/README).

## Known landmines
- `.env` — see above. Never print values; verify by length/format only.
- Old Kimi/Nemo sessions may hold stale context after a pivot — always start agents fresh
  with the kickoff line; the repo re-teaches them.
- `storefront/` still carries retired commerce code until the Stage-1 repurpose finishes;
  `medusa/` folder + Docker containers (pg :5433, redis :6380) are retired — delete when convenient.
- The published research artifact ("Open Marketing Stack") predates pivot #3 — update it or
  label it historical if the founder asks.
- Compliance is real here: edtech + ASCI/CCPA/FTC — no fake students, no outcome claims
  without data, Python prereq stated. The founder once wanted AI "student interviews";
  the agreed line is AI hosts/explainers only.

## First moves for a new session
1. Read `context.md`, BUILD-LOG tail, `git log --oneline -10`, `agent/offers.md` open items.
2. Ask the founder for: any pivots since the last BUILD-LOG entry, and which agent is
   currently mid-task (never overlap).
3. Continue the stage the README status table says is active. Verify before ticking.
