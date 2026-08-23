---
description: One iteration of the end-to-end Marketing OS build loop — orient, execute one task fully, verify, record, report, and ask the user when anything is unclear. Designed to be run repeatedly via /loop.
---

Read `prompts/build-loop.md` in this repo and execute exactly one iteration of the loop it
defines. That file is the canonical, agent-agnostic version of this command — follow it
verbatim, including the classification gates (EXECUTE / USER / DECISION), the verification
requirement, the BUILD-LOG.md entry, the fixed report format, and the closing question to
the user. In this environment, use AskUserQuestion for USER/DECISION-class questions.
