# Stage 5 — The marketing agent (Weeks 5–6)

**Objective:** an agent that researches competitors, writes ad briefs and product/marketing
copy, segments customers, and drafts every email/WhatsApp touch for one-click human approval —
LLM cost ₹0.

**Definition of done:** one full week runs on agent drafts: Monday competitor brief → 3 ad
briefs approved → welcome/cart/win-back emails drafted and approved → sent and logged, with
no manual copywriting.

## 1. LLM router (₹0)

- [ ] `agent/llm.py|ts`: one client, three OpenAI-compatible providers, fallback order
  **Groq → Gemini → NVIDIA NIM** (NIM ≈ 1,000 credits @ 40 req/min — save it for models the
  others lack)
- [ ] `.env`: `GROQ_API_KEY`, `GEMINI_API_KEY`, `NVIDIA_API_KEY` — never committed
- [ ] Log provider + tokens per call into Supabase (`drafts.agent_reasoning` / `meta`) so free-tier burn is visible

## 2. Brand DNA (Rule 4: injected into every generation)

- [ ] `agent/brand_dna.py`: Firecrawl the storefront → LLM extracts tone, audience, banned
  words, visual style prefix → upsert into `brand_profiles` (seeded from Pomelli's Business DNA)
- [ ] Every prompt template starts with the brand profile block + the relevant rows of
  `agent/offers.md` — ads, product copy, emails, WhatsApp, social, SEO pages

## 3. The customer-touch loop

```
nightly segment sync (Medusa orders + PostHog events → subscribers.segment)
  → SELECT     who is due a touch today (welcome day 0/2/5 · cart 1h/24h · review +7d · win-back 60/90d)
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

- [ ] Product descriptions + collection intros + size/care guides drafted from the catalog
  table (facts only) → `drafts` (kind = product_copy | seo_page) → 👤 approves → storefront repo
- [ ] 2 SEO pieces/week per [PIPELINES.md](../PIPELINES.md) D

## 5. n8n automations (VPS) — or plain cron

- [ ] `segment-sync` nightly · `drafts-due` morning · `dispatch` on approval · `feed-export`
  (Medusa → Google Merchant / Meta catalog feed) nightly · `weekly-report` Mondays 9:00

## 6. The marketing agent (competitor research → ad briefs) — weekly

```
Monday cron
  → RESEARCH  Firecrawl competitor product pages · YouTube Data API (their latest shorts/ads) ·
              Meta Ad Library screenshots (vision) · Instagram/Pinterest · our research inbox
  → ANALYZE   hooks, offers, price points, drop/bundle tactics, objections they answer (fit, returns)
  → ANGLES    3 angles competitors are NOT using, per category (clothing / footwear / bags)
  → BRIEFS    1 ad brief per angle (hero SKU, 4-beat script, 9 image prompts, 4 clip prompts,
              CTA) → drafts queue → you approve → you run Flow (plan/03)
  → LEARN     day-7 results feed next Monday's angle selection
```
Rules: facts only from `agent/offers.md`; product accuracy instruction in every visual
prompt; AI people are models/hosts, never customers; innerwear never briefed; every brief
names its sources.

## 7. Autonomy gate (Rule 3)

The agent sends nothing on its own until **4 consecutive weeks with ≥95% of drafts approved
unedited**. Even then: autonomous sending only for the lowest-risk flows (transactional
order updates, welcome email to consented subscribers) — never WhatsApp marketing templates.

**Next →** [06-operate-and-scale.md](06-operate-and-scale.md)
