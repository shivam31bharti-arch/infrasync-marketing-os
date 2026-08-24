# Design-sprint prompt — premium AI-education site (InfraSync)

Paste into your agent (Antigravity/Opus recommended for design taste). Supersedes the retired
luxury-apparel sprint (pivot #3, 2026-08-24). **Extend `storefront/` — do NOT scaffold a new
app**; keep Supabase capture, PostHog/Sentry, drafts dashboard. Remove commerce leftovers
(collections/products/cart/Medusa client) as part of Phase A. Facts ONLY from
`agent/offers.md`; open items render as elegant "Dates announced soon"-style states, never
invented. Commit + push after each verified phase.

## References (watch if your environment can; otherwise the decoded spec below is authoritative)
- https://www.youtube.com/shorts/fxDkOQZ_-8M — study transition timing, hover states, image reveals
- https://youtu.be/RGWXVbkrYKM — study hero composition, scroll choreography, section pacing
- User may paste screenshots of a 3D-landing X post — ask once at Phase A start, don't block.

## Aesthetic — premium tech education (not corporate LMS, not neon-hacker)
- Palette: deep ink `#0A0E14` ground · paper `#F4F2EC` light sections · electric accent
  `#4F7CFF` (sparingly) · warm gray `#8A8F98` muted. Alternate dark/light sections.
- Type (Google Fonts): display **Space Grotesk** (600, tight) · body **Inter** (400/500) ·
  uppercase 11–12px letterspaced labels. Code/tool snippets in **JetBrains Mono** (this brand
  teaches AI — real terminal/tool aesthetics are on-brand, fake ones are not).
- Layout: confident whitespace, asymmetric grids, oversized display statements
  ("Learn to build with AI. For real."), hairline rules; screens/tools shown in device frames.
- Motion: 400–700ms eases, scroll reveals, subtle parallax; one hero WebGL/R3F moment max
  (e.g. drifting particle field or neural-mesh gradient) — lazy-loaded, static fallback on
  mobile/reduced-motion. `prefers-reduced-motion` respected.

## Phase A — design system + landing (verify: build passes, desktop+mobile screenshots)
1. Tokenize palette/type; restyle nav/footer/buttons/cards. Strip commerce routes.
2. Home: hero (statement + the $20 workshop CTA + R3F accent) → "two tracks" split section
  (Generalist: non-tech, vibe coding + AI tools · Engineer: Python required, AI-augmented
  engineering) → how it works (workshop → quiz → accelerator) → curriculum teasers (from
  offers.md; TBD items styled, not faked) → FAQ → footer capture.
3. `/workshop`, `/programs/ai-generalist`, `/programs/ai-engineer` (Python prereq at top),
  `/policies/*` — same system, Course JSON-LD on program pages.
4. Imagery: Nano Banana/Gemini API stills (hosts, studios, screens — no fake students, no
  real-brand logos) → `storefront/public/demo/`. Leave `assets/brand/hero/SHOTLIST.md` with
  3 Flow prompts for the user's hero films.

## Phase B — hero feature: the Track-Fit Quiz (verify: end-to-end + screenshots)
`/quiz`, linked from hero and both program pages. 5–7 questions (coding background, goals,
hours/week, learning style) → scores → recommends Generalist or Engineer with a "why" →
routes to that program page → saves result to the Supabase lead row (`meta.program`) →
PostHog `quiz_completed`. Elegant progress UI; shareable result card (static PNG per track).
No LLM needed at runtime — deterministic scoring; facts from offers.md.

## Phase C — polish + performance (verify: numbers in BUILD-LOG)
Micro-interactions pass · Lighthouse mobile ≥ 85 perf / ≥ 90 a11y on `/` and `/workshop`
(report real numbers) · total JS on `/` < 300KB gz (R3F code-split) · cross-browser sanity ·
README/BUILD-LOG/knowledge updates.

## Do not
Deploy to the real domain (pages.dev preview only, and only when asked) · invent dates,
curriculum, instructors, or outcomes · fake students/testimonials · touch `.env` · break
Supabase capture or analytics · add paid services.
