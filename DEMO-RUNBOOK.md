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

- **Voice is already wired** (verified 2026-08-26): `.env` holds
  `OMNIDIM_API_KEY` (validated against the API), `OMNIDIM_AGENT_ID=244948`
  (Course Counselor — site callback) and `STAYINGAHEAD_FOLLOWUP_AGENT_ID=244927`
  (Follow-up Caller). Confirm both agents' Post-Call email actions are saved in
  the dashboard (recipient busnz122@gmail.com, all five trigger statuses).
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
**Call me now**. OmniDimension's *SkillSync Course Counselor* (agent 244948)
calls your phone within seconds — answer on speaker.
Every request is also stored in Supabase `subscribers` (source=`callback`), and
a post-call summary email with extracted lead fields goes to
busnz122@gmail.com.

## 4) Lead capture → live data (1 min)

- Take the `/quiz` (6 questions, enter an email at the end) → show the row
  appear in Supabase `subscribers` (refresh the table).
- Newsletter form (footer or popup) → same table, source=`footer`/`popup`.
- Bonus: the follow-up bot demo — `node scripts/followup-calls.mjs --mark
  +91<your number> missed` then `node scripts/followup-calls.mjs` → your phone
  gets the "our team tried to reach you" call from agent 244927.

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
- Both voice agents (244948 counselor, 244927 follow-up) live in the user's own
  OmniDimension account; post-call lead emails go to busnz122@gmail.com. That
  account has no purchased phone number yet — calls go out from the platform's
  default caller ID.
