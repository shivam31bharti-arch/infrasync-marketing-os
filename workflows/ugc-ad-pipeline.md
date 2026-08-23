# Ad pipeline — competitor research → Google Flow → published 30-second product ad

Repeatable procedure. Hands-on time per ad: **~35 minutes** (5 images · 15–20 Flow ·
10 join/QC). Agent time: automatic. Folder convention: `ads/YYYY-MM-DD_slug/` containing
`brief.md`, `refs/` (product photos + scene refs), `clips/` (4 × 8s), `vo.wav` (optional),
`captions.json`, `out/`.

## 0 · Weekly research (agent, Mondays — automatic)

Sources the agent pulls: Meta Ad Library screenshots you paste (LLM vision — D2C fashion
brands live there) · competitors' Instagram / Pinterest · YouTube Data API (their latest
shorts/ads) · competitor product pages via Firecrawl (prices, drops, bundles, shipping
promises) · their newsletters in our research inbox.
Output: `agent/research/YYYY-WW-brief.md` — top hooks, offers, price points, drop tactics, and
3 angles competitors are NOT using.

## 1 · Brief (agent drafts, you approve — 5 min)

```md
hero SKU(s): [from agent/offers.md catalog table — name, colour, price, photo folder]
category: [clothing | footwear | bags & accessories]   (never innerwear)
angle (from research):
hook style: [outfit-transition | detail-macro | day-in-the-life | problem-solve (fit/comfort) | drop-reveal]
script: 4 beats × ~7 s  (beat 1 = hook · beat 2 = product in motion · beat 3 = detail/benefit
        (fabric, sole, fit) · beat 4 = price + CTA "Shop now")
people on screen: AI model/host showing the product — never a "customer" praising it
9 image prompts: refs 1–3 = REAL product photos (front · detail · on-model); refs 4–9 = scene/
        mood/second outfit via Nano Banana Pro or Pomelli
4 clip prompts: one per beat, each naming which 3 refs it uses; product accuracy instruction in every prompt
```

## 2 · Reference images (you, 5 min)

Copy the 3 real product photos into `refs/`. Generate the scene/mood refs in the Gemini app
(**Nano Banana Pro**, in AI Pro) or Pomelli; keep the same model/style across all. (Images made
outside Flow save Flow credits for video.)

## 3 · Flow (you, 15–20 min)

1. flow.google → New project → **9:16** → quality **Fast**.
2. **Ingredients to Video** → attach the 3 product refs → paste clip-1 prompt (+ brand style
   prefix from `agent/offers.md`) → generate.
3. Continuity route: **Extend** ×3 with the beat-2/3/4 prompts (one continuous take).
   Outfit/scene-change route: 4 separate Ingredients clips, product refs in every one.
4. Reject any clip where the product drifts (colour, cut, logo) — fix the prompt, not the dice;
   1–2 retries max per segment.
5. Download the 4 segments → `clips/`.

Credits: ~80 per ad on Fast. Budget: 1,000/month → plan **5–7 ads/month**, 1 hero re-render on Quality.

## 4 · Voice + captions (5 min, optional)

```bash
python scripts/tts.py --text vo.txt --out vo.wav          # Kokoro / Chatterbox, or ElevenLabs free
python scripts/captions.py vo.wav > captions.json         # faster-whisper word timings
```
Many product ads need no VO — music + captions + price card work. If you do use VO, one
continuous track beats four Veo voices.

## 5 · Join + brand (5 min)

```bash
bash scripts/join.sh ads/<slug>      # ffmpeg concat → (VO) → captions → price + CTA end card → out/<slug>.mp4
```
(or `npx remotion render AdTemplate` for animated captions). **Do not crop or cover the Veo watermark.**

## 6 · QC checklist (3 min)

- [ ] Product on screen = the real SKU (colour, cut, logo placement); price on the card = storefront price today
- [ ] No innerwear; no fake scarcity/urgency; no "customer" claims from AI people
- [ ] Hook readable + works muted in the first second; 9:16 safe zones clear; ≈ −14 LUFS
- [ ] CTA links to the exact product/collection page; UTM attached

## 7 · Ship + log

Postiz → IG Reels / YT Shorts / Pinterest / Facebook with **AI-content disclosure ON**.
Naming `{date}_{category}_{sku}_{angle}_v{n}`. Row in `campaigns` with hero SKUs + brief path.

## 8 · Read (day 3 / day 7)

Day 3: 3-second retention (swap hook if < 60%) and product-page clicks. Day 7: kill rule —
below half the median → dead; winner → 3 variants (same product refs, new hook/scene).
