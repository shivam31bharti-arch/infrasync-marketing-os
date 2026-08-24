# Design loop — build · see · judge · fix, until peak (client-demo quality gate)

Run AFTER (or alongside) `prompts/design-sprint.md`. Paste this whole block into the agent.

---

You are now in a **design refinement loop** for the storefront in D:\MArketing. Your job is
to raise the running site to the highest visual + performance quality it can reach, by
actually LOOKING at it every iteration — never by imagining it. Do not stop after one pass.

## Setup (once)
1. Dev server up: storefront (`npm run dev`, :3000). Start it if down.
2. `npm i -D playwright @playwright/test && npx playwright install chromium` (storefront/).
3. Write `qa/snap.mjs`: Playwright script that captures FULL-PAGE screenshots of
   `/`, `/workshop`, `/programs/ai-generalist`, `/programs/ai-engineer`, `/quiz`
   at **1440×900** and **390×844** (mobile emulation), saving to `qa/shots/iter-N/…png`,
   plus a console-error dump per page (`qa/shots/iter-N/console.txt`).
4. Add `qa/shots/` to .gitignore (keep `qa/snap.mjs` committed).

## Each iteration (repeat until STOP RULE)
1. **RENDER** — run `node qa/snap.mjs N`. Zero uncaught console errors allowed; fix any first.
2. **SEE + JUDGE** — open every screenshot and review AS IMAGES (you have vision; if your
   environment truly cannot view images, say so in BUILD-LOG and judge via DOM/CSS audit +
   metrics only). Judge as a merciless senior art director at a premium technology-education brand.
   Score 1–10 on each: typography & hierarchy · spacing/alignment/grid · color & contrast
   discipline · imagery quality & art direction · motion & micro-interactions (probe with
   Playwright hovers/scrolls) · mobile layout · cross-page consistency · "premium feel"
   (would a top-tier tech-education brand ship this? if not, fix it) · accessibility (contrast, focus states,
   alt text) · performance (see #3). Write the scorecard + every concrete defect
   ("H1 clips at 390px on /workshop", "card hover shadow too heavy — cheapens it")
   with the file that owns each defect.
3. **MEASURE** — `npx lighthouse http://localhost:3000 --preset=perf --chrome-flags="--headless" --output=json --output-path=qa/shots/iter-N/lh.json`
   (and the same for /workshop). Record mobile perf + a11y scores and total JS KB.
4. **FIX** — repair the lowest-scoring dimensions first, worst defects first. Real fixes in
   code, not score inflation. Re-run `npm run build` — must pass.
5. **RECORD** — BUILD-LOG entry: `design loop iter N — overall X.X (prev Y.Y)` + scorecard +
   fixes made. Commit + push: `design loop iter N: <top fixes>`.

## Functional checks woven in (every 2nd iteration)
- Playwright walkthrough: workshop registration form happy + error path · track-fit quiz
  completes and routes to the right program page · subscribe form works · payment-link
  buttons resolve (test mode). Any break = fix before visual polish continues.

## STOP RULE (whichever comes first)
- **PASS**: every dimension ≥ 8 AND overall ≥ 8.5 AND Lighthouse mobile perf ≥ 80 / a11y ≥ 90
  AND zero console errors → write the final scorecard, a `qa/FINAL-REPORT.md` (scores,
  remaining nice-to-haves, screenshot index), commit, and stop.
- **Diminishing returns**: two consecutive iterations improve overall by < 0.3 → stop, report
  honestly what plateaued and why (often: needs real photography/videos — list exactly what
  assets would break the ceiling, for the user's Flow session).
- **Cap**: 6 iterations max. Never loop past the cap.

## Rules that survive the loop
Demo-content policy from design-sprint.md holds · never the real domain · no paid services ·
no user-photo storage · keep Supabase/analytics wiring working (walkthrough proves it) ·
`.env` untouched · honest scores — a 7 that ships beats a fake 9.
