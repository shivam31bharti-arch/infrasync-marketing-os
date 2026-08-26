# storefront/ — Next.js 15 (App Router, TypeScript)

**Being repurposed (pivot #3, 2026-08-24): commerce shop → InfraSync program site.**
See `plan/01-foundation.md` + `prompts/design-sprint.md`. Keep: scaffold, `/api/subscribe` →
Supabase, PostHog + Sentry wiring, drafts dashboard. Remove: collections/products/cart pages
and the Medusa client (`lib/medusa.ts`) — Medusa is retired.

## Target pages (Stage 1)
`/` · `/workshop` ($20) · `/programs/ai-generalist` · `/programs/ai-engineer` (Python prereq
stated) · `/quiz` (track-fit) · `/policies/{terms,privacy,refund,contact}` · `/thank-you`

Facts only from `agent/offers.md`; open items render as styled "announced soon" states.

## Run
```
npm install
npm run dev        # http://localhost:3000 — root .env supplies server keys via lib/server-env.ts
npm run build      # must pass before any commit
```

<!-- deploy: v4 live trigger 2026-08-26 - WhatsApp build var bake -->
<!-- deploy trigger 2 -->
