# Design-sprint prompt — luxury 3D storefront MVP (client demo)

Paste into your agent (Antigravity/Opus recommended for design taste; Kimi works). Assumes
the night-shift storefront exists. This prompt deliberately relaxes the placeholder rule for
a CLIENT DEMO — bounded by the Demo-content policy below.

---

You are upgrading the existing storefront in D:\MArketing into a **luxury fashion MVP demo**
a client will see. First read: knowledge/context.md · AGENTS.md · storefront/README.md ·
the last 5 BUILD-LOG entries. **Extend `storefront/` — do NOT scaffold a new app.** Keep all
existing wiring intact: Medusa products, /api/subscribe → Supabase, PostHog events, Sentry,
the drafts dashboard. Commit + push after each verified phase.

## Demo-content policy (this overrides the placeholder rule, for the demo only)
- Invent a tasteful demo luxury brand (name, monogram, one-line story) — mark it once as
  `DEMO_BRAND` in `storefront/lib/demo-data.ts`. ALL demo products, prices (premium INR),
  copy, model characters, and imagery are defined in that ONE file so the real brand swaps in
  later by editing it alone.
- Demo products: 12–18 items across clothing / footwear / bags-accessories (no innerwear
  anywhere). Editorial names, materials, sizes; premium price points.
- NO fake customer reviews or testimonials, even in demo. A "featured in" or review section,
  if designed, ships with layout + "Demo content" microlabel.
- Deploy target when asked: Cloudflare Pages **preview** (`*.pages.dev`) ONLY. Never the real
  domain. If Pages isn't connected yet, run locally and stop — the user connects Pages.

## References (study them if your environment can open them; otherwise rely on the decoded aesthetic below)
- https://www.youtube.com/shorts/fxDkOQZ_-8M — "E-commerce Fashion Website Animation | Figma to
  Prototype": study the transition timing, hover states, and image-reveal animations.
- https://youtu.be/RGWXVbkrYKM — "Impressive 2025 Website Design Inspiration": study hero
  composition, scroll choreography, and section pacing of the sites shown.
- X post (3D landing page, x.com/Da7_Tech/status/2088297344672432602): not fetchable by tools —
  the user will paste screenshots into chat if that specific 3D treatment is wanted; ask once
  at the start of Phase A, then proceed without blocking.
- If video analysis isn't available in your environment, do NOT guess at the refs — the
  decoded aesthetic below is the authoritative spec.

## Aesthetic (decoded from the references; theme = luxury store)
- Palette: near-black `#0B0B0C` ground · ivory `#F5F1EA` · champagne `#C8A96A` accent (sparingly)
  · warm stone `#8E867B` for muted text. Light sections alternate with dark; never mid-gray.
- Type (Google Fonts): display **Cormorant Garamond** (500/600, tight leading, large editorial
  sizes) over body **Archivo** (400/500); uppercase Archivo 11–12px letterspaced for labels/nav.
- Layout: full-bleed imagery, generous whitespace, asymmetric editorial grids, thin hairline
  rules; oversized serif statements ("The Autumn Line") over imagery.
- Motion: slow + cinematic — 500–900ms eases, scroll-triggered reveals (fade+8px rise),
  images scale 1.03 on hover, page transitions fade. `prefers-reduced-motion` respected.

## Phase A — design system + 3D landing (verify: build passes, desktop+mobile screenshots)
1. Tokenize the palette/type into globals; restyle nav (transparent over hero → solid on
   scroll), footer, buttons, product cards to the luxury system.
2. **Hero**: one cinematic moment, not a theme park. React Three Fiber (three + @react-three/
   fiber + drei) scene: floating garment/fabric or rotating pedestal product with soft studio
   lighting and slow parallax on scroll — OR a full-bleed video hero if the user has supplied
   Flow clips in `assets/brand/hero/`. Lazy-load the 3D bundle (`next/dynamic`, no SSR);
   static poster image fallback on mobile/reduced-motion. 3D accents elsewhere: subtle tilt
   on product cards (transform, not WebGL), parallax section dividers.
3. Landing sections: hero → 3 collection showcases (full-bleed, serif overlays) → "New in"
   rail from Medusa → brand story block → try-on teaser banner → newsletter (existing form,
   restyled) → footer.
4. Collections + product pages restyled to match (product page: large gallery, sticky buy
   column, materials/size accordion, JSON-LD kept).
5. Imagery for demo: generate on-brand stills via Nano Banana/Gemini image API
   (GEMINI_API_KEY in .env) or use Pexels (keys may be empty — then Gemini only). Save to
   `storefront/public/demo/` and map them in demo-data.ts. Editorial, consistent lighting.
   Leave a `assets/brand/hero/SHOTLIST.md` for the user: 3 Flow prompts for 8s luxury hero
   films (slow dolly over fabric, model walk in shadow, product rotation) to replace stills.

## Phase B — the hero feature: Try-On Studio (verify: end-to-end run + screenshots)
Route `/try-on`, linked prominently from the hero.
1. Flow: user uploads a photo (or picks the demo model) → picks a garment from demo products
   → picks scene (3–5: studio ivory · golden-hour street · marble interior · night city ·
   runway spotlight) and lighting (soft / warm / dramatic) → "See the look".
2. Engine: server route calls **Gemini image editing (Nano Banana / gemini-image latest)**
   with the user photo + garment image + scene/lighting prompt; return the composite. Retry
   once on failure; on hard failure fall back to pre-generated demo-model composites
   (generate these at build time for every garment × 2 scenes so the demo NEVER dies live).
3. Rules: process uploads in memory only — never write user photos to disk/repo/Supabase;
   UI states this plainly. Watermark output corner with DEMO_BRAND monogram. Rate-limit by
   session (3 free tries in demo). Loading state = elegant (progress shimmer + rotating copy).
4. Track `tryon_started` / `tryon_completed` in PostHog.

## Phase C — polish + performance (verify: numbers in BUILD-LOG)
- Micro-interactions pass (nav, buttons, cart badge, form focus states).
- Lighthouse mobile ≥ 80 perf / ≥ 90 a11y on `/` and a product page (report actual numbers).
  Images: next/image, AVIF/WebP, correct sizes. 3D bundle code-split; total JS on `/` < 350KB gz.
- Cross-browser sanity (Chromium + one WebKit/Firefox check via screenshots).
- Update storefront/README + BUILD-LOG (per task: done/verified/next/open questions) +
  knowledge/context.md "Where we are".

## Do not
Touch the real domain · store user uploads · add paid services · invent reviews · break the
existing Medusa/Supabase/analytics wiring · exceed scope into checkout/payments (separate task).
