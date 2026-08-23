# Session handoff protocol (any agent, any model)

## Start of session (≤5 minutes of reading)
1. `knowledge/context.md` — the 1-page situation report
2. `BUILD-LOG.md` — last 3 entries
3. `AGENTS.md` rules → `prompts/build-loop.md` procedure
4. Active stage file (`plan/`, lowest with unchecked tasks) and `agent/offers.md` for facts
5. If `graphify-out/GRAPH_REPORT.md` exists, skim it; prefer `graphify query` over re-reading files

## End of session (non-negotiable)
1. `BUILD-LOG.md` entry: done · verified · next · open questions
2. Tick only verified checkboxes in the plan files
3. If the picture changed: update `knowledge/context.md` ("Where we are") and add a line to `knowledge/decisions.md`
4. If a tool/model changed or died: update `knowledge/tooling.md`
5. Commit (`git add -A && git commit -m "stage N: <what>"`) — never commit `.env`
6. Report in the fixed format and ask: "Anything you want changed or prioritized before the next loop?"
