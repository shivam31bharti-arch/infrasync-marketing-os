# Stage 5 — The marketing agent (Weeks 5–6)

**Objective:** an agent that researches competitors, writes ad briefs and product/marketing
copy, segments customers, and drafts every email/WhatsApp touch for one-click human approval —
LLM cost ₹0.

**Definition of done:** one full week runs on agent drafts: Monday competitor brief → 3 ad
briefs approved → welcome/cart/win-back emails drafted and approved → sent and logged, with
no manual copywriting.

## 1. LLM router (₹0)

- [x] `agent/llm.py|ts`: one client, three OpenAI-compatible providers, fallback order
  **Groq → Gemini → NVIDIA NIM** (NIM ≈ 1,000 credits @ 40 req/min — save it for models the
  others lack)
- [x] `.env`: `GROQ_API_KEY`, `GEMINI_API_KEY`, `NVIDIA_API_KEY` — never committed
- [ ] Log provider + tokens per call into Supabase (`drafts.agent_reasoning` / `meta`) so free-tier burn is visible

## 2. Brand DNA (Rule 4: injected into every generation)

- [ ] `agent/brand_dna.py`: Firecrawl the storefront → LLM extracts tone, audience, banned
  words, visual style prefix → upsert into `brand_profiles` (seeded from Pomelli's Business DNA)
- [ ] Every prompt template starts with the brand profile block + the relevant rows of
  `agent/offers.md` — ads, product copy, emails, WhatsApp, social, SEO pages

## 3. The customer-touch loop

```
nightly segment sync (payments + PostHog events → subscribers.segment)
  → SELECT     who is due a touch today (welcome d0/2/5 · workshop confirm/T-24h/T-1h ·
               post-workshop offer ×3 · cohort countdown · win-back 60/90d)
  → DRAFT      🤖 personalized email / WhatsApp text from the flow template + brand DNA +
               offers.md → INSERT into drafts (kind = email | whatsapp)
  → APPROVE    👤 drafts dashboard (approve / edit / reject + reason) — batch, 10 minutes
  → SEND       approved → Listmonk transactional API / WhatsApp Cloud API → log to touches
  → LEARN      weekly: rejected drafts + reasons fed back into the prompts as counter-examples
```

- [ ] Build as a plain scheduled worker first (cron on the VPS or the PC). Graduate to
  **LangGraph** when branching/state gets real. Borrow from
  [kaymen99/sales-outreach-automation-langgraph](https://github.com/kaymen99/sales-outreach-automation-langgraph)
  for the draft→approve→send shape.
- [ ] Drafts dashboard: one Next.js page (auth: Supabase) listing pending drafts with
  approve/edit/reject — 1 day of work, not a project

## 4. The content agent (product + SEO copy)

- [ ] Program-page copy, workshop copy, FAQ answers, and per-track SEO guides drafted from
  `agent/offers.md` (facts only) → `drafts` (kind = program_copy | seo_page) → 👤 approves → site repo
- [ ] 2 SEO pieces/week per [PIPELINES.md](../PIPELINES.md) D

## 5. n8n automations (VPS) — or plain cron

- [ ] `segment-sync` nightly (payments + PostHog → segments) · `drafts-due` morning ·
  `dispatch` on approval · `weekly-report` Mondays 9:00

## 6. The marketing agent (competitor research → ad briefs) — weekly

```
Monday cron
  → RESEARCH  Firecrawl competitor product pages · YouTube Data API (their latest shorts/ads) ·
              Meta Ad Library screenshots (vision) · Instagram/Pinterest · our research inbox
  → ANALYZE   hooks, offers, price points, drop/bundle tactics, objections they answer (fit, returns)
  → ANGLES    3 angles competitors are NOT using, per program (workshop / generalist / engineer)
  → BRIEFS    1 ad brief per angle (program, 4-beat script, 9 image prompts, 4 clip prompts,
              CTA) → drafts queue → you approve → you run Flow (plan/03)
  → LEARN     day-7 results feed next Monday's angle selection
```
Rules: facts only from `agent/offers.md`; AI people are hosts, never students; no outcome
claims without data; Python prereq in every Engineer-track brief; every brief names its sources.

## 7. Site chat agent (general queries, ₹0)

- [ ] `/api/chat`: LLM router (Groq→Gemini→NIM) with `agent/offers.md` + FAQ as the ONLY
  context; system prompt enforces the claims policy (no outcome promises, Python prereq,
  "the team will follow up" for unknowns); escalation buttons (WhatsApp, email).
- [ ] Widget on every page · per-session rate limit · transcripts to `touches`
  (channel='chat') · PostHog `chat_opened` / `chat_message`.

## 8. Certificate automation (issuer: Outskill)

- [ ] `infra/supabase-certificates.sql` run · `scripts/certificate.mjs` renders the branded
  HTML template to PDF/PNG via Playwright (name, program, date, code OSK-YYYY-NNNN).
- [ ] Trigger: marking a student completed (drafts-dashboard button or
  `node scripts/certificate.mjs --complete <subscriber_id>`) → generate → email via Brevo
  (transactional; auto-send allowed as founder-enabled transactional flow) → `emailed_at` set.
- [ ] `/verify/[code]` public page reads the certificates table (RLS: read-only by code).
- [ ] Rule: certificates state completion only — no accreditation or outcome claims.

## 9. Autonomy gate (Rule 3)

The agent sends nothing on its own until **4 consecutive weeks with ≥95% of drafts approved
unedited**. Even then: autonomous sending only for the lowest-risk flows (transactional
order updates, welcome email to consented subscribers) — never WhatsApp marketing templates.

**Next →** [06-operate-and-scale.md](06-operate-and-scale.md)
