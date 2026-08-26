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

---

## ADDENDUM v3.1 — Auxia reference (auxia.io), measured values. This OVERRIDES earlier
## look-and-feel where they conflict. Refactor existing v3 scenes — do not restart.

### Palette flip: LIGHT-FIRST (Auxia-style, matches our original paper/ink tokens)
- Body: cream `#F0EFE3` · alt sections `#E2E1D3` and `#FEFDF5` · ink text `#232323`
- Accent: hyper-blue `#0B4FFF` (update --color-electric to this) — buttons, links, key words
- Dark `#0A0E14` reserved for exactly TWO contrast sections (workshop block + certificate/
  reviews block). Everything else lives on cream.

### Typography (the core of "premium" — Auxia measured: 104px H1, weight 500, -3% tracking)
- Display + body font: **Instrument Sans** via next/font/google (closest free stand-in for
  PP Neue Montreal; do NOT use the paid PP font). Keep JetBrains Mono for eyebrows/code.
- H1: clamp(3.2rem, 7.5vw, 6.5rem) · weight 500 (NOT bold) · letter-spacing -0.03em ·
  line-height 0.95. H2: clamp(2.2rem, 4.5vw, 4rem) · -0.03em · lh 0.95.
- Eyebrow labels above every section: JetBrains Mono, 11px, uppercase, +0.12em tracking,
  blue or 50% ink (Auxia: "AGENT WORKFLOW", ours: "THE DELIVERY PIPELINE" etc.)
- Body: 16-18px, lh 1.4, weight 450-500. Max width 34ch for intro paragraphs.

### Signature interactions to replicate (all measured on auxia.io)
1. **Per-word scroll reveal**: hero sub-paragraph + every section intro renders word-by-
   word; each word animates opacity 0.15→1 (and 4px rise) driven by scroll progress
   (useScroll + per-word useTransform). This is THE Auxia move — implement it as a
   reusable <WordReveal> component.
2. **"Watch the machine work" demo panel** (replaces/augments S2): an animated workflow
   card like Auxia's ASK AGENT panel — chips animate in sequence: STUDENT PAYS ₹1,999 →
   CERTIFICATE ISSUED → DRIVE ACCESS GRANTED → CRM UPDATED → PACK EMAILED BY 8 PM, each
   chip lighting up with a spring, looping. This demos our REAL pipeline — pure marketing
   gold and 100% true.
3. **Sticky 3-layer section**: "One path, three stages" (Workshop → Your Track →
   Accelerator) as sticky-pinned cards that stack/swap on scroll (Auxia's THREE LAYERS).
4. **Big-statement interludes** on cream: two-line ink statements with per-word reveal,
   e.g. "Courses didn't get harder. They got boring." / "Learn by shipping, not by
   watching." (no outcome/job claims — claims policy.)
5. **R3F hero restyle**: shards become glass/chrome on CREAM background with blue rim
   light — bright, gallery-like (Auxia canvases sit on cream, not black). Mobile keeps
   the CSS gradient fallback, now cream/blue.
6. Buttons: pill radius, primary = blue #0B4FFF with white text, secondary = 1px ink
   outline on cream; magnetic hover stays; arrows slide on hover.

### Checkpoint discipline (repeat offense = shift ends)
Commit + push design-v3 after EVERY scene. No exceptions.
