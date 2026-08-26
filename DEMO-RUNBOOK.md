# Manager Demo Runbook — SkillSync full funnel (design v3.1)

One page: what to run, what to click, what your manager sees. Built for the
`design-v3-growthschool` branch demoed from localhost (the live site still runs
the old design until the founder merges + redeploys).

## 0) Prep — 10 minutes before

```powershell
cd C:\Testing\Marketing\infrasync-marketing-os
git checkout design-v3-growthschool
cd storefront
npm install
npm run build
npm start          # serves http://localhost:3000
```

- **Real voice callback (recommended):** add the OmniDimension API key to the
  root `.env` (open in Notepad, add these two lines — key from the OmniDimension
  dashboard → Settings → API):

  ```
  OMNIDIM_API_KEY=<your key>
  OMNIDIM_AGENT_ID=244841
  ```

  Then restart `npm start`. Without the key, callback requests are still stored
  in Supabase and the widget says "Request received" — no live call.
- Open two tabs in advance: **Supabase → Table Editor → `subscribers` +
  `registrations`**, and **HubSpot → Contacts**.
- Test payments: use the **netbanking mock** or domestic test card
  **5267 3181 8797 5449** (international 4111… is rejected — merchant is
  domestic-only in test mode).

## 1) The site (2 min)

Open http://localhost:3000 — one deep funnel page:
full-bleed hero → fact blocks → how it works → workshop offer (live Razorpay
button) → both accelerator deep-dives (anchored: `/#ai-generalist`,
`/#ai-engineer`) → what's included → mentors → reviews (labeled illustrative —
compliance) → FAQ → CTA band. Scroll slowly: sections spring in; the sticky
price bar slides up after the hero. `/workshop` is the focused conversion page.

## 2) AI chat agent (1 min)

Click the **Talk to us** bot pill (bottom-right) → **Chat with AI** → tap
"What does the workshop cost?" or "Is EMI available?". Answers come from
`/api/chat` — an LLM router grounded ONLY in `agent/offers.md` (it will not
invent facts). Provider fallback chain: Groq → Gemini → NVIDIA NIM.

## 3) Voice callback (1 min)

**Talk to us → Request a Callback** → your name + your number (with +91) →
**Call me now**. With the API key set, OmniDimension's *SkillSync Course
Counselor* (agent 244841) calls your phone within seconds — answer on speaker.
Every request is also stored in Supabase `subscribers` (source=`callback`), and
a post-call summary email with extracted lead fields goes to
busnz122@gmail.com.

## 4) Lead capture → live data (1 min)

- Take the `/quiz` (6 questions, enter an email at the end) → show the row
  appear in Supabase `subscribers` (refresh the table).
- Newsletter form (footer or popup) → same table, source=`footer`/`popup`.
- Note: a test row "Test Probe / +919999999999" exists from pre-demo
  verification — ignore or delete it.

## 5) Payment → certificate → Drive → CRM (5 min, the closer)

1. On the homepage workshop block, click **Register Now** → Razorpay TEST
   payment page → pay ₹1,999 with the netbanking mock (use a real-looking name
   + an email you control).
2. Run the delivery pipeline:

   ```powershell
   cd C:\Testing\Marketing\infrasync-marketing-os
   node scripts/delivery-pack.mjs
   ```

   (`--check` = connectivity self-test, `--dry-run` = plan only.)
3. Show the chain, in order:
   - Supabase `registrations`: new row with `cert_no` (SSC-2026-NNNN) + stamps
   - Certificate publicly verifiable at
     `http://localhost:3000/verify/SSC-2026-NNNN` (also on the live domain)
   - Google Drive: session folder shared to the payer email (reader grant)
   - **HubSpot: contact created/updated** — lifecycle `customer`, program +
     enrollment status set
   - Pack email sent from team@infra-sync.online (recording + notes + cert link)
4. Run the script again → "0 pending": the pipeline is **idempotent** (never
   double-sends).

**If the manager asks "is CRM live?"** — honest answer: HubSpot is updated by
the pipeline run (normally the daily 8:30 PM IST GitHub Action, or on-demand
like we just did), not by a per-second webhook. Every payment is captured in
Razorpay + Supabase immediately; the pipeline syncs certs/Drive/CRM/email in
one idempotent pass.

## Known state / caveats

- Live infra-sync.online still serves the old design + (until the founder
  redeploys the Worker) the pre-hotfix garbled pages. The demo is the branch.
- Instructor names, accelerator duration, seat caps: founder-pending — the site
  deliberately shows "announced soon" (claims policy: no invented facts).
- Reviews are labeled illustrative until real, consented student quotes exist.
- The OmniDimension agent currently lives in the connected (demo) OmniDimension
  account; the founder can recreate it in the dedicated account later using
  `agent/voice-agent-config.md` and swap `OMNIDIM_AGENT_ID`.
