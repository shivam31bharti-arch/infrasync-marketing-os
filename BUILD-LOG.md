# Build log

Append-only record of what each build-loop iteration actually did. Newest entry at the
bottom. The loop (`/marketing-loop`) reads this before working so nothing is redone, and
writes one entry per iteration in this format:

```
## YYYY-MM-DD — Stage N
- Done: <what was completed>
- Verified: <how it was checked>
- Next: <next task + class (EXECUTE / USER / DECISION)>
- Open questions: <or "none">
```

---

## 2026-08-21 — Stage 0 (manual session with Claude, before the loop started)
- Done: project domain identified and recovered — `infra-sync.online` at Spaceship
  (registered ~17 Apr 2026, expires 17 Apr 2027, privacy ON, auto-renew OFF by choice —
  renewal decision logged in plan/06). Domain confirmed present in the user's Spaceship
  Domain Manager. Domain written into README, plan/02 Caddyfile, plan/06 triggers.
- Verified: WHOIS/registry lookups + user's Domain Manager screenshot.
- Next: user secures the Spaceship account (2FA, transfer lock, account email noted) and
  points nameservers to Cloudflare → then Stage 0 checklist items in plan/00-stack.md.
- Open questions: none.

## 2026-08-21 (late) — Stage 0 (manual session with Claude)
- Done: full domain lockdown + Cloudflare handover, step by step with the user:
  Spaceship account secured (passkey + TOTP 2FA active, account email captured by user);
  transfer lock verified ON at registry; auto-renew deliberately OFF (renewal decision
  Mar 2027, plan/06); Cloudflare free account created under the same email; zone
  `infra-sync.online` added (Free plan, AI-crawl defaults kept: search/agents allowed,
  training blocked); Spaceship's 3 email-forwarding records auto-imported into Cloudflare
  DNS; nameservers switched to jaziel/uma.ns.cloudflare.com.
- Verified: registry WHOIS shows both Cloudflare nameservers + clientTransferProhibited.
  Cloudflare zone still "pending" while global DNS propagates — flips to Active
  automatically.
- Next: remaining Stage 0 accounts — start Meta WhatsApp business verification and the
  Oracle Always-Free VPS hunt first (both slow), then Supabase, GitHub repo push, Brevo,
  PostHog, Sentry, NIM/Groq/Gemini keys, Pexels/Pixabay.
- Open questions: none.

## 2026-08-22 — Stage 0 (update)
- Done: Cloudflare zone `infra-sync.online` confirmed **Active** by the user (nameserver propagation complete).
- Next: remaining Stage 0 accounts (Meta WhatsApp verification + Oracle VPS first).

## 2026-08-22 — Plan pivot: ads via Google Flow + niche locked
- Done: local ComfyUI/Wan ad pipeline dropped. Ads now generated in Google Flow (Veo 3.1)
  on the user's existing Google AI Pro (₹0 extra). New competitor-research → brief → Flow
  → join → publish loop written to plan/03, workflows/ugc-ad-pipeline.md, plan/05 §6.
  Niche locked: AI-skills training ($199 workshop · $1,000 basics · $3,000 accelerator),
  CTA "Join our masterclass today" → agent/offers.md created as the single source of facts.
  SEO layer defined (₹0 stack; every-app/open-seo optional, needs paid DataForSEO key).
- Verified: Flow facts checked against 2026 sources (8s segments, 3 reference images,
  Extend, Pro = 1,000 credits, watermark on Pro, no API).
- Next: user confirms the compliance decision (AI people as hosts, not "students");
  confirms masterclass mechanics in agent/offers.md; then Stage 0 accounts continue.
- Open questions: masterclass free vs paid · platform for a 2-hour live session at ₹0
  (YouTube Live unlisted) · payment provider / currency display.

## 2026-08-22 — PIPELINES.md added
- Done: one-page map of the final pipelines (A ads via Flow · B masterclass funnel · C leads ·
  D SEO/content · E weekly rhythm · F build loop) + the 4 open decisions gating the funnel.

## 2026-08-22 — Plan pivot #2: the business is now D2C apparel & footwear
- Done: InfraSync redefined as a direct-to-consumer apparel and footwear brand (clothing,
  shoes, bags and accessories; innerwear sold but never advertised; no food/electronics).
  Propagated everywhere: README (constraints, stack, status, rules incl. innerwear rule and
  per-order-cost clarification), AGENTS.md (brand + compliance rules), PIPELINES.md (ads,
  shopping funnel, customer pipeline, SEO, rhythm, build), agent/offers.md (catalog table,
  open items, claims policy), plan/00 (Medusa commerce backend, Razorpay/Stripe, Merchant
  Center / Meta catalog / Pinterest, checklist), plan/01 (storefront: Next.js + Medusa,
  subscribers schema), plan/02 (Medusa on the VPS, Caddy routes), plan/03 (product ads from
  real product photos; product-accuracy rule), plan/04 (growth engine: capture, flows,
  WhatsApp order updates, free listings, real reviews), plan/05 (customer-touch loop +
  content agent + competitor agent), plan/06 (e-com funnel, COGS vs overhead, risks),
  workflows (ad pipeline, customer pipeline, weekly rhythm), prompts/kimi-kickoff.md.
- Verified: repo-wide grep shows no course/masterclass-era references outside this log; no
  encoding issues.
- Next: user fills the catalog table + open items in agent/offers.md (products source,
  photos, audience, currency/payments, shipping/returns, brand name decision, competitors,
  Medusa vs WooCommerce); then Stage 0 accounts continue (Razorpay/Stripe KYC, Meta
  verification, Oracle VPS first).
- Open questions: see agent/offers.md open items.

## 2026-08-22 — Research artifact re-synced
- Done: the published "Open Marketing Stack" page now reflects the apparel + Google Flow plan (TL;DR build, ad factory section, architecture, footer); catalog sections kept as the record of alternatives. Same URL.
