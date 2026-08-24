# Stage 3 — The ad factory, powered by Google Flow (Week 3)

**Objective:** a repeatable loop turning competitor research into 30-second, 9:16 **course
ads** for the $20 workshop and both accelerators, generated in **Google Flow (Veo 3.1)** on
the owned Google AI Pro plan — ₹0 extra.

**Definition of done:** competitor brief v1 · **3 finished 30-second ads** (workshop ·
generalist · engineer) published via Postiz · loop timed and documented in
[workflows/ugc-ad-pipeline.md](../workflows/ugc-ad-pipeline.md).

## The pipeline

```
RESEARCH  agent → edtech competitors' ads (Meta Ad Library screenshots → LLM vision),
          their YouTube/IG (YouTube Data API), funnels via the research inbox, landing pages
          via Firecrawl → weekly brief + "angles nobody is using"
BRIEF     agent → program · 4-beat 30s script (hook · pain/insight · what the program IS,
          from offers.md · price + CTA "Join the $20 workshop") · 9 image prompts · 4 clip
          prompts → drafts queue → you approve
IMAGES    you (5 min) → scene refs via Nano Banana Pro (Gemini app, in AI Pro): confident
          host in a studio · screens showing real AI tools · cohort/workshop energy —
          NO fake students, no real-brand logos → ads/<slug>/refs/
FLOW      you (15–20 min) → 9:16, Fast, Ingredients-to-Video (3 refs) → clip 1 + Extend ×3
          (or 4 clips on scene change) → 4 × 8s
JOIN      scripts/join.sh (TESTED): concat → single VO (Kokoro/ElevenLabs free) → word
          captions → price + CTA end card. Veo watermark untouched.
SHIP      Postiz → IG Reels / YT Shorts / LinkedIn / Facebook — AI-content disclosure ON
LOG       campaigns row → day-3 / day-7 read → kill or scale
```

Flow has no API — the agent works before and after; your 15–20 min inside Flow is the whole
human cost. Credits: Fast = 20/segment → ~80/ad → **5–7 ads/month** on the 1,000-credit AI
Pro pool; 1 hero re-render on Quality (100/segment).

## Compliance — edtech is specifically watched (ASCI + CCPA India; FTC US — we price in USD)

1. **No AI-generated "students", no fake testimonials, ever.** AI people are hosts/
   explainers. Real student stories only with consent, once real students exist.
2. **No outcome claims without data** — "get hired", "3x salary" don't ship unsubstantiated.
   Curriculum facts and demos beat promises.
3. **Engineer-track ads state the Python prerequisite.** Mis-sold seats become refunds.
4. No fake scarcity/countdowns; prices on end cards match the site the day the ad runs.
5. Synthetic-media disclosure ON when publishing; keep the Veo watermark.

## Tasks
- [ ] Competitor list in `agent/offers.md` open items → `agent/research/` first brief
- [ ] Flow project template (9:16, brand style prefix from design-sprint theme)
- [ ] Produce ads #1–3 (workshop hook · generalist story · engineer story)
- [ ] Publish via Postiz with disclosure; log `campaigns` rows

**Next →** [04-lead-engine.md](04-lead-engine.md)
