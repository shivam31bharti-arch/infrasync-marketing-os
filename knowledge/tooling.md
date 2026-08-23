# Tooling — agents, models, providers (keep dated; models change monthly)

## Coding agents for the build loop (as of 2026-08-23)
| Use | Tool + model | Notes |
|---|---|---|
| Daytime, structural work | **Antigravity** (Google AI Pro, owned) — Opus 4.6; Gemini 3.5 Flash when Claude quota runs low | Gemini CLI retired 2026-06-18 → Antigravity CLI/app. Claude models burn AI Pro quota faster. |
| Free backup / nights | **Kilo Code** → "OpenAI Compatible" → `https://integrate.api.nvidia.com/v1` + NIM key → `deepseek-ai/deepseek-v4-flash-0731` (reasoning OFF by default) or a Kimi K2.x/K3 id if listed | NIM free: ~1,000 credits, 40 req/min. `deepseek-ai/deepseek-v4-pro` is **gated** (504/no entitlement) — don't chase. `z-ai/glm-5.2` EOL 2026-08-21. |
| Off-peak option | Kimi K2.7 Code / K3 via Moonshot | Fast ~1–6 AM IST; slow during China daytime/evening. |
| Free filler | MiMo 2.5 (Xiaomi) on the free option | Small edits only. |
| Plan changes, reviews, decisions | Claude (this assistant) | Token-expensive → use sparingly. |

Rules for every agent: read `knowledge/context.md` → `BUILD-LOG.md` tail → active stage; commit after each verified task (user said yes to git); append decisions here and to `decisions.md`.

## Runtime LLM router (inside the product, ₹0)
Groq → Gemini (AI Studio free) → NVIDIA NIM. Keys in `.env`. Spec: `plan/05-agent-automation.md`.

## Memory / context tools
- **Graphify** — `uv tool install graphifyy`; `graphify install [--platform kilo|gemini|opencode]`; `/graphify .`; outputs `graphify-out/`. Use once code exists; re-run `--update` after big changes.
- Later, if needed: **Graphiti** (getzep) temporal knowledge-graph memory via MCP (needs Neo4j/FalkorDB); **Potpie** codebase agents (knowledge graph of a large repo). Not installed.

## Deprecations seen
- 2026-08-21 `z-ai/glm-5.2` end of life on NIM (HTTP 410).
- 2026-06-18 Gemini CLI stopped serving AI Pro/free → Antigravity.

## Auto model fallback (added 2026-08-24)
`infra/litellm.config.yaml` — local LiteLLM proxy on :4000 exposing one model id `auto-coder`
that falls through Groq → Gemini → NIM DeepSeek (Kimi direct slot commented until
MOONSHOT_API_KEY exists). 429/5xx reroute automatically with cooldowns. Kilo: OpenAI
Compatible → http://localhost:4000 → model `auto-coder` (speed chain) or `auto-heavy` (quality chain: Nemotron 3 Ultra 550B-A55B on NIM → Gemini → Groq — use for the design loop, architecture, debugging). Caveats: free-tier DAILY caps still
apply per provider (the proxy dodges outages, not quotas); quality varies per fallback;
Antigravity keeps its own AI Pro quota and stays the daytime primary.
