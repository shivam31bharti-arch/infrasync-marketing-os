# knowledge/ — the model-agnostic memory of this project

Models change every few months; this folder doesn't. Any agent — Claude, Gemini/Antigravity,
DeepSeek, Kimi, MiMo — gets the full context by reading these files in order. Keep each one
short and current; this is a briefing pack, not an archive (the archive is `BUILD-LOG.md`).

| File | What it is | Who updates it |
|---|---|---|
| `context.md` | 1-page situation report: what we're building, for whom, with what, where we are | agent, at the end of any session that changed the picture |
| `decisions.md` | Decision log (ADR style): what was decided, why, what was rejected | agent, whenever a decision is made or reversed |
| `tooling.md` | Which agents/models/providers we use, their limits, and what's deprecated | agent/user, whenever a tool changes |
| `glossary.md` | Project terms so nobody re-explains "Stage 0.5" or "free window" | agent |
| `handoff.md` | The session protocol: how to start and how to end a session | fixed |

## Two layers of memory

1. **This folder + `BUILD-LOG.md` + `agent/offers.md`** — plain markdown, read by every agent
   first. This is the layer that survives model churn.
2. **Graphify (optional, recommended once code exists)** — builds a queryable knowledge graph of
   the whole repo so a model answers "where/why" questions from the graph instead of re-reading
   files (~70× fewer tokens per query). Install once, re-run after big changes:
   - `uv tool install graphifyy` → `graphify install` (Claude Code) · `graphify install --platform kilo` ·
     `graphify install --platform gemini` · `graphify cursor install` · `graphify codex install`
   - In the agent: `/graphify .` → creates `graphify-out/` (GRAPH_REPORT.md, graph.json, graph.html)
   - Update: `/graphify . --update` · Query: `graphify query "how do ads get published?"`
   - Code parsing is local; docs need an LLM key — use the free `GEMINI_API_KEY`.
   `graphify-out/graph.json` + `GRAPH_REPORT.md` are committed; `graph.html` is git-ignored.

Heavier options (Graphiti/Zep temporal memory graph via MCP, Potpie codebase agents) are
documented in `tooling.md` as "later, if the codebase outgrows markdown + Graphify".
