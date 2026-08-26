# Staying Ahead — Follow-up Caller (OmniDimension agent 244918)

Created 2026-08-26 in the connected OmniDimension account. The second voice bot,
separate from the SkillSync Course Counselor (244841).

## Who it calls — and why

We already hold the lead's **name, phone number, and email** (Supabase
`subscribers`). Two situations trigger this bot:

1. **Missed by sales** — our sales team called about the AI courses but the
   person didn't pick up. The bot reconnects.
2. **Not interested — follow-up** — the person earlier told the team "no."
   The bot takes one gentle, no-pressure follow-up to see if anything changed.

## What it does on the call

- Greets them **by name**, identifies itself as calling from Staying Ahead by
  GrowthSchool, references their earlier interest, asks if it's a good time
  (2 minutes).
- Its ONE goal: find out if they'd like to **talk to our executive**. If they
  say yes — even just "yes" / "haan" — it confirms **someone from our team will
  personally call them back**, and captures their preferred time.
- It does NOT sell: no prices, no dates, no discounts, no outcome promises —
  "the executive will cover exactly that on the callback."
- Not interested? It accepts the first no, asks one light question to learn the
  objection (price / time / relevance / trust), offers the free WhatsApp
  community as a no-commitment option, and closes politely.
- "Don't call me again" → apologizes, confirms, ends. The team marks do-not-call.

## What comes back after every call

Email to marketing.od@growthschool.io with summary + sentiment + fields:
`caller_name` · `reached` · `still_interested` (YES/NO/MAYBE/UNKNOWN) ·
**`wants_executive_call`** · `preferred_callback_time` · `objection` ·
`do_not_call` · `outcome` (EXEC_CALLBACK_BOOKED / INTERESTED_NO_CALLBACK /
NOT_INTERESTED / CALL_LATER / NO_ANSWER / WRONG_NUMBER / DO_NOT_CALL) ·
`followup_note`.

## Supabase integration — `scripts/followup-calls.mjs`

Leads live in `subscribers`; the flag lives in `meta.sales_call_status`.

```bash
node scripts/followup-calls.mjs --mark +91XXXXXXXXXX missed
```

```bash
node scripts/followup-calls.mjs --mark +91XXXXXXXXXX not_interested
```

```bash
node scripts/followup-calls.mjs --list
```

```bash
node scripts/followup-calls.mjs
```

The last command dispatches the calls (needs `OMNIDIM_API_KEY` +
`STAYINGAHEAD_FOLLOWUP_AGENT_ID` in root `.env`) and stamps
`meta.followup_called_at` so a lead is never auto-called twice. Re-flagging with
`--mark` makes them eligible again. Dispatch is **human-triggered only**
(AGENTS.md rule) — no cron.

## Ops rules (same as all voice)

Consent-based contacts only (these leads gave their number to us) · respect
do-not-call on first ask · call minutes are per-lead COGS · first test call goes
to your own number.
