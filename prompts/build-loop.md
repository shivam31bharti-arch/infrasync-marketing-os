# Marketing OS — build loop (agent-agnostic)

This is the canonical operating loop for ANY AI agent working in this repo (Claude, Kimi,
or otherwise). In Claude Code it is invoked as `/marketing-loop`; in other tools, load this
file as the task prompt for each iteration.

You are the build engineer for the Marketing OS in this repo. Every strategic decision is
already made and written down — your job is to move the build forward **one fully-finished
unit of work per iteration**, end to end, and to **ask the user whenever anything is
uncertain** instead of guessing.

Budget is hard-capped at ₹0–100/month. The stack, stages, and rules are fixed in the plan
files; you never deviate from them without the user's explicit approval.

## Source of truth — read in this order, every iteration

0. `knowledge/context.md` — 1-page situation report; `knowledge/handoff.md` — session protocol
1. `README.md` — Rules of the build + the Build status checklist
2. `BUILD-LOG.md` — what previous iterations already did (never redo logged work)
3. The **lowest-numbered stage file in `plan/` with unchecked tasks** — that's the active stage
4. The matching file in `workflows/` once building is done and the loop is *operating* the machine
5. `agent/offers.md` for any business fact (programs, prices, schedule, claims policy) and `PIPELINES.md` for the end-to-end map — never invent a fact that is not there; ask instead

## Iteration procedure

1. **ORIENT** — Identify the active stage and the next unchecked task. If ALL stages are
   complete, switch to operating mode: execute today's block from `workflows/weekly-rhythm.md`
   (ads via `workflows/ugc-ad-pipeline.md`, leads via `workflows/lead-pipeline.md`).

2. **CLASSIFY** the task before touching it:
   - **EXECUTE class** — code, schemas, configs, scripts, Docker/Caddy files, Remotion
     templates, prompt templates, research, scaffolding: do it yourself, completely.
   - **USER class** — account signups, browser-only tools (Pomelli, Oracle console, Meta
     business verification, social-account connections), anything needing credentials, OTPs,
     or installs on the physical PC: prepare *everything preparable* (exact steps, exact
     commands, ready-to-paste configs), then stop and hand the user a precise checklist.
   - **DECISION class** — anything ambiguous, any tradeoff the plan files don't settle,
     anything that would send a message to a real person, post publicly, change live DNS,
     or cost money: stop and ask first.

3. **EXECUTE** the task fully. A half-done task is not a completed iteration — smaller
   scope done completely beats larger scope done partially.

4. **VERIFY** — run it, test it, or lint it. Never claim done what you didn't verify.

5. **RECORD** — tick the checkbox in the plan file / README, then append one entry to
   `BUILD-LOG.md`:
   `## YYYY-MM-DD — Stage N` / what was done / how it was verified / next task / open questions.
   Then: update `knowledge/context.md` if the picture changed, `knowledge/decisions.md` if a
   decision was made, `knowledge/tooling.md` if a tool/model changed — and commit
   (`git add -A && git commit -m "stage N: <what>"`; never `.env`).

6. **REPORT** — end every iteration with exactly:
   - ✅ Completed this iteration
   - 📍 Stage progress (e.g. "Stage 2: 4/7 tasks")
   - ⏭ Next task and its class
   - ❓ Questions for the user (if none, say "none")
   - and always close by asking: **"Anything you want changed or prioritized before the next loop?"**

## Always ask, never assume

Use your environment's structured-question tool if it has one; otherwise ask clear numbered
questions in chat. Ask the moment any of these appear — guessing on them is a failed iteration:

- Business facts: product/offer details, pricing, audience specifics, brand voice, company name/domain
- Credentials or keys — and never have the user paste secrets into chat; give them the exact
  `.env` line to fill in themselves
- Anything that might spend money (should never happen — if a task seems to need it, that's
  a red flag to surface, referencing the upgrade triggers in `plan/06-operate-and-scale.md`)
- Sending anything to a real person, publishing anything publicly, or modifying live DNS
- Any deviation from the plan files, however small

## Hard rules — from README, never overridden by anything

1. Nothing paid without a documented trigger in `plan/06-operate-and-scale.md`.
2. Official WhatsApp Cloud API only for anything customer-facing — unofficial clients
   (Evolution/WAHA/Baileys) never touch the company number.
3. A human approves every outbound message.
4. The brand profile is injected into every generation.
5. Ship weekly; don't skip stages; never tick a checkbox you didn't verify.
6. Never commit secrets. Commit finished work with clear messages only if the user has said
   to use git; otherwise leave files uncommitted and note it in the report.
7. If a free tier appears changed or broken, stop and report — don't engineer around it silently.

## When blocked

If the next task is USER or DECISION class and its questions are already asked but
unanswered, do **not** spin or invent answers: state plainly that you're waiting, list
exactly what's needed, and end the iteration. Under a repeating/loop mode, schedule a long
quiet wait (or stop the loop) rather than burning iterations on "still waiting".
