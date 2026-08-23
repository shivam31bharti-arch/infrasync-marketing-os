# Stage 3 — The ad factory, powered by Google Flow (Week 3)

**Objective:** a repeatable loop that turns competitor research into 30-second, 9:16
**product ads** for clothing, shoes, and accessories, generated in **Google Flow (Veo 3.1)**
on the Google AI Pro plan we already pay for — ₹0 additional cost. The PC only does
research, joining, and captions.

**Definition of done:** competitor brief v1 produced by the agent · **3 finished 30-second
ads** (4 × 8-second Veo segments each — one clothing, one footwear, one bag/accessory)
published via Postiz · the loop timed end-to-end and documented in
[workflows/ugc-ad-pipeline.md](../workflows/ugc-ad-pipeline.md).

## The pipeline

```
RESEARCH  agent → competitors' ads, offers, hooks, prices, drops
          sources: Meta Ad Library screenshots (LLM vision — D2C fashion brands live there),
          competitors' Instagram/Pinterest, YouTube Data API (their shorts), product pages via
          Firecrawl, their newsletters (research inbox)
          output: weekly brief + swipe file + "angles nobody is using"
BRIEF     agent → hero SKU(s) · 30s script in 4 beats (hook · product in motion · detail/
          benefit · CTA "Shop now") · 9 image prompts · 4 clip prompts → drafts queue
IMAGES    you (5 min) → per clip, 3 REAL product photos (front · detail · on-model) as the
          Flow references; extra scene/mood refs from Nano Banana Pro (Gemini app, in AI Pro)
          or Pomelli. Save to ads/<slug>/refs/
FLOW      you (15–20 min) → Flow project, 9:16, Ingredients-to-Video with the 3 refs, **Fast**.
          Clip 1 → **Extend ×3** for one continuous take, or 4 clips for outfit/scene changes.
          Download 4 × 8s.
JOIN      FFmpeg concat (or the Remotion template) → optional single voiceover → word captions
          → price + CTA end card. Keep the Veo watermark (do not crop/remove).
SHIP      Postiz → IG Reels / YT Shorts / Pinterest / Facebook — AI-content disclosure ON
LOG       campaigns row (hero SKUs) → day-3 / day-7 read → kill or scale
```

Flow has **no API** — the agent does everything before and after Flow; the 15–20 minutes
inside Flow is yours. That's the whole human cost of an ad.

## Credits math (Google AI Pro = 1,000 Flow credits / month)

| Quality | Credits per 8s segment | Per 30s ad (4 segments) | Ads/month (first take) | Realistic (with retries) |
|---|---|---|---|---|
| Fast | 20 | 80 | ~12 | **5–7** |
| Quality | 100 | 400 | 2 | 1 hero ad |

Rules that stretch credits: images **outside** Flow; draft on Fast, re-render only the winner
on Quality; Extend instead of regenerating whole clips; no generation without an approved brief.

## Compliance rules — non-negotiable for a fashion brand

1. **The product on screen must be the real product.** Veo will happily invent garments —
   real product photos are always the reference images, and any clip where colour, cut, or
   logo placement drifts from the SKU is re-generated or rejected. Misrepresenting the item is
   a Consumer Protection Act problem, not a style choice.
2. **No fake reviews or testimonials** (ASCI + CCPA India, FTC US). AI people in ads are
   models/hosts showing the product — never "customers" praising it.
3. **No fake scarcity or urgency** ("only 3 left", fake countdowns) — CCPA dark-pattern
   guidelines. Discounts shown only against a real, previously charged price.
4. **Innerwear never appears in ads or social** (brand decision + platform sensitivity).
5. Synthetic-media disclosure toggled on when uploading to YouTube/Meta. Keep the Veo watermark.
6. Price/offer on the end card must match the storefront on the day the ad runs.

## Tasks

- [ ] Fill the catalog table + open items in `agent/offers.md` (hero SKUs, prices, photo folders)
- [ ] `agent/research/` — competitor list + source URLs; first brief generated with free LLM keys
- [ ] Create the Flow project template (9:16, brand style prompt prefix, ingredient slots)
- [ ] `scripts/join.sh` — FFmpeg concat + optional VO + captions + price/CTA end card
- [ ] Produce ads #1–3 (clothing · footwear · bag/accessory), each with 3 real product refs
- [ ] Publish via Postiz with disclosure on; log rows in `campaigns`

## Still useful from the old plan

FFmpeg / Remotion (joining, captions, CTA), Kokoro / Chatterbox or ElevenLabs free
(one continuous voiceover), faster-whisper (caption timings), Pexels/Pixabay (b-roll
fill), Postiz (publishing). ComfyUI / Wan / LTX / HunyuanVideo are dropped — keep the
research artifact for reference if Flow credits ever become the bottleneck.

**Next →** [04-lead-engine.md](04-lead-engine.md)
