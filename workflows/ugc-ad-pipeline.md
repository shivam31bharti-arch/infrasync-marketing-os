# Ad pipeline — competitor research → Google Flow → published 30-second course ad

Hands-on ~35 min per ad. Folder: `ads/YYYY-MM-DD_slug/` → `brief.md`, `refs/`, `clips/`
(git-ignored), `vo.txt|wav`, `captions.srt`, `out/` (git-ignored).

## 0 · Weekly research (agent, Mondays)
Meta Ad Library screenshots you paste (edtech brands run heavy ad volume — LLM vision reads
them) · competitor YouTube/IG via YouTube Data API · their funnels via the research inbox ·
landing pages via Firecrawl. Output `agent/research/YYYY-WW-brief.md`: hooks, offers, price
framing, objections handled, 3 unused angles per program.

## 1 · Brief (agent drafts, you approve — 5 min)
```md
program: [workshop $20 | AI Generalist $1,200/₹95k | AI Engineer $1,200/₹95k]
angle (from research):
hook style: [myth-bust | day-in-the-life | tool-demo | before/after-skill | cost-of-waiting]
script: 4 beats × ~7s (hook · pain/insight · what the program IS — modules/format from
        offers.md · price + CTA "Join the $20 workshop")
people: AI host/explainer only — never a "student"; Engineer ads state the Python prereq
9 image prompts: host/studio · real-tool screens (no brand logos) · workshop energy
4 clip prompts: one per beat, each naming its 3 refs
```

## 2 · Reference images (you, 5 min)
Nano Banana Pro in the Gemini app → generate the 9, keep style/host consistent → `refs/`.

## 3 · Flow (you, 15–20 min)
9:16 · **Fast** · Ingredients-to-Video with 3 refs → clip 1 + **Extend ×3** (or 4 clips on
scene change) → download 4 × 8s → `clips/`. ~80 credits/ad; 5–7 ads/month on AI Pro.

## 4 · Voice + captions (5 min)
`python scripts/tts.py --text vo.txt --out vo.wav` (Kokoro, tested) ·
`python scripts/captions.py vo.wav > captions.srt` (tested; CPU default).

## 5 · Join (5 min)
`bash scripts/join.sh ads/<slug> --vo [--card assets/brand/endcard.png]` (tested).
Keep the Veo watermark.

## 6 · QC (3 min)
- [ ] Every claim traceable to offers.md; no outcome promises without data
- [ ] No AI "students"/testimonials; Engineer ad states Python prerequisite
- [ ] Price on end card = site price today; CTA links to /workshop with UTM
- [ ] Hook readable muted in 1s · −14 LUFS · 9:16 safe zones

## 7 · Ship + log
Postiz → IG Reels / YT Shorts / LinkedIn / Facebook, AI-content disclosure ON.
Name `{date}_{program}_{angle}_v{n}` · row in `campaigns`.

## 8 · Read (day 3 / day 7)
Day 3: 3s retention + workshop-page clicks. Day 7: kill rule — below half of median → dead;
winner → 3 hook variants.
