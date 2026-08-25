# Design Rebuild v3 — cinematic rebuild of the presentation layer (Kimi K3)

Read `prompts/START-HERE.md`. Facts ONLY from `agent/offers.md`. This REPLACES the current
generic look. Reference feel: antigravity.google, gemini.google — dark, cinematic,
scroll-driven storytelling, buttery spring physics. Not a template. Not Bootstrap-adjacent.

## Hard boundaries
- WORK ON BRANCH `design-v3` — NEVER commit this rebuild to main directly. `git checkout -b
  design-v3`; push the branch; Cloudflare builds a PREVIEW version (founder reviews the
  preview URL from the Workers Builds run). Merge to main ONLY when the founder approves.
- REBUILD ONLY the presentation layer: `app/(pages)`, `components/`, `globals.css`.
  DO NOT touch: `app/api/`, `lib/`, `scripts/`, `infra/`, wrangler/open-next configs,
  payment-button hrefs/env logic, ChatWidget's API wiring, analytics init, Sentry.
- Every fact (prices ₹1,999 / ₹95,000, timings 10 AM–6 PM & 7:30–10:30 PM, dates, EMI,
  refunds, Python prereq) from offers.md, verbatim policy wording where required.
- Reviews stay ILLUSTRATIVE with the visible caption "Illustrative reviews — real student
  stories publish after our first cohorts." (non-negotiable; a previous agent dropped it).

## Motion doctrine ("buttery")
- Springs only: framer-motion `type:"spring", stiffness 90–120, damping 18–24`. No linear
  tweens for movement. Durations via physics, not ms.
- GPU transforms only (translate/scale/rotate/opacity). Never animate layout properties.
- Scroll choreography with `useScroll` + `useTransform`; pinned sections via sticky.
- Micro-interactions everywhere: magnetic buttons (±6px pull toward cursor), 3D card tilt
  (max 8°, perspective 1000px), icon draw-ins, nav shrink on scroll.
- `prefers-reduced-motion`: all of it collapses to fades. Mobile (<768px): R3F scene is
  replaced by an animated CSS gradient mesh — no WebGL on phones.

## The storyboard (build in this order, one checkpoint each)
1. **S1 Hero (full viewport)** — R3F scene: slow-orbiting cluster of glassy/chromatic
   shards (MeshTransmissionMaterial or metalness 1 / roughness 0.1) lit electric blue
   #4F7CFF against near-black #05070B, subtle mouse parallax (≤8px), floating dust
   particles. Headline "Learn AI by building." — words stagger in with springs; sub-line,
   two magnetic CTAs (Register ₹1,999 → payment link · Explore programs). Slim glass nav
   that blurs+shrinks after 80px scroll. Scroll cue pulsing at the bottom.
2. **S2 Pinned narrative** — a sticky full-height section: as the user scrolls, three
   panels crossfade/slide in sequence: "Learn live" → "Build real things" → "Get certified"
   (each: giant numeral, one sentence, one visual — use the certificate PNG mock for #3).
3. **S3 Programs duo** — two large cards (Generalist / Engineer), 3D tilt on hover,
   animated gradient border (--grad-accent), price + EMI line + Python-required badge on
   Engineer, buy buttons untouched underneath.
4. **S4 Curriculum flow** — the workshop's 2 days + each accelerator's modules as a
   vertical timeline that draws its connector line as you scroll; module cards spring in
   alternating from left/right.
5. **S5 Included-free bento** — 6 tiles (recordings · Drive notes+tools · setup guides ·
   prompt library · verified certificate · reminder concierge), varied sizes, hover lift
   with glow, tiny looping icon animations.
6. **S6 Reviews + FAQ + footer** — restyle existing ReviewsMarquee (keep caption + sample
   data), FAQ accordion with spring open, footer as-is but visually matched.
7. **S7 Global polish pass** — spacing rhythm, type scale (clamp()-based, hero ≥ 4.5rem
   desktop), consistent section transitions, focus states, 390px sweep of every page.

## Loop after every storyboard item
build green → `node qa/snap.mjs` (1440px + 390px) → Lighthouse on / (Perf must stay ≥80;
if it drops, optimize before continuing — lazy-load R3F with next/dynamic, ssr:false) →
self-judge /10 with 3 named defects → fix → checkpoint (BUILD-LOG + commit to design-v3 +
push). STOP rules: ≥8.5 twice · plateau 2 iterations · 12 iterations · founder interrupt.
Total added JS ≤ 350KB gzip. R3F loads only on desktop hero.

## Done =
Preview URL walk-through reads like a product film: every scroll reveals something with
weight and intent, nothing generic, all facts correct, payments/chat/analytics untouched
and verified working in the preview.
