# Design Loop v2 — "complete website, not just a website" (Kimi K3 / any agent)

Read `prompts/START-HERE.md` first. Facts ONLY from `agent/offers.md`. Checkpoint after
every iteration: build green + screenshots + Lighthouse + BUILD-LOG entry + commit + push.

## North star
Premium like Google's own product pages: restraint, whitespace, typography — then ONE
memorable motion moment per screen. NOT a copy of any edtech site. Ink/paper/electric
tokens stay; gradients become a FIXED system (below). Site must feel finished: every
section real, no "coming soon" left visible except where policy requires.

## Phase 0 — load reference libraries (once)
1. `cd storefront && npm i motion @react-three/fiber @react-three/drei three`
2. Clone reference implementations to `D:\MArketing\.refs\` (gitignored, read-only
   inspiration — adapt patterns, never paste wholesale, keep our tokens):
   - `git clone --depth 1 https://github.com/magicuidesign/magicui .refs/magicui`
   - any other PUBLIC MIT repo you can verify exists; if a clone 404s, skip it — do NOT
     invent repos. 21st.dev / ui.aceternity.com component code may be re-typed by hand from
     their public pages when you already know the pattern; else build from motion primitives.
3. Log in BUILD-LOG which references you actually loaded.

## Fixed gradient system (use ONLY these — no ad-hoc gradients)
- `--grad-hero`: 135deg, #0A0E14 → #101828 with electric #4F7CFF at 15% glow accents
- `--grad-accent`: 90deg, #4F7CFF → #7C5CFF (buttons/highlights, sparingly)
- `--grad-paper`: 180deg, #FDFCF9 → #F4F2EC (light sections)
Define once in globals.css as CSS vars; every gradient references a var.

## Build tasks (in order, one iteration each max)
1. **Hero with depth**: R3F or pure-CSS 3D — floating geometric shapes / particle field
   reacting subtly to pointer (parallax ≤8px). 60fps; `prefers-reduced-motion` disables it.
   Headline stays legible above all motion.
2. **Course details, complete**: expand /workshop + both program pages with the full
   curriculum from offers.md as interactive modules (accordion or timeline with motion
   reveals). Add a "day in the life / schedule" strip (Sat+Sun 10 AM–6 PM · accelerators
   7:30–10:30 PM — from offers.md).
3. **"Included free with your seat" section** (home + /workshop) — honest framing, no fake
   "worth ₹X" claims: session recordings · notes & tools pack (Google Drive, access granted
   to your registered email) · AI tool setup guides (ChatGPT, Claude, Perplexity,
   NotebookLM, Make and more — the tools taught live) · prompt library · participation
   certificate with public verification · session reminder concierge (call + email +
   WhatsApp, consent-based). These are REAL — the delivery pipeline ships them.
4. **Talk-to-us launcher**: one floating pill bottom-right, expands to two actions:
   💬 Chat (opens existing ChatWidget) · 📞 Voice counselor — opens
   `process.env.NEXT_PUBLIC_VOICE_CALL_URL` in a new tab (founder supplies the OmniDimension
   web-call link; render the voice button ONLY if the env var exists).
5. **Reviews section** (home, above footer): 4–6 cards with human avatars from
   `https://i.pravatar.cc/…`-style neutral images or initials-avatars, realistic first-name
   quotes about the workshop experience. COMPLIANCE (non-negotiable, from offers.md claims
   policy): section subtitle must read "Illustrative reviews — real student stories publish
   after our first cohorts." Code comment: `// SAMPLE testimonials — replace with real,
   consented reviews. Never present as real.` No job/salary claims inside quotes.
6. **Micro-polish sweep**: consistent section rhythm (spacing scale), scroll-reveal
   (once, 300–500ms, stagger 60ms), button hover states, focus rings, footer with all
   links + team@infra-sync.online + policies.

## The loop (after each build task)
1. `npm run build` — must be green (0 errors).
2. `node qa/snap.mjs` — screenshot home, /workshop, both programs at 1440px + 390px.
3. Lighthouse (desktop) on / and /workshop — record Performance + Accessibility + CLS.
4. SELF-JUDGE as a design director, score 1–10 against: restraint · hierarchy · motion
   quality (no jank) · completeness · consistency with tokens. Write 3 concrete defects.
5. Fix the defects → next iteration.
STOP when: score ≥8.5 twice in a row · OR no score improvement 2 iterations · OR 6
iterations total · OR Lighthouse Performance drops below 80 (then optimize before more art).
NEVER: break the payment buttons/env fallbacks · touch scripts/ or infra/ · invent facts ·
add fake urgency/counters · exceed 300KB added JS.

## Definition of "complete website"
Home tells the whole story top to bottom: hero → what you learn → schedule → included-free
→ programs → reviews (illustrative) → FAQ → talk-to-us → footer. Every page reachable, no
dead link, dark-ink aesthetic consistent, motion feels expensive, facts match offers.md.
