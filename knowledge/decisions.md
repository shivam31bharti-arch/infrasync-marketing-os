# Decision log (newest first). Format: date · decision · why · rejected alternatives.

- **2026-08-25 · BRAND RENAME: Outskill → SkillSync.** Outskill is a real existing company —
  legal risk. Swept repo-wide (site, offers, plans, prompts, voice-agent config, certificate
  issuer); certificate code prefix OSK-→SSC-. History in BUILD-LOG.md and this file (below)
  intentionally left as-is.
- **2026-08-25 · Payments: Razorpay-only.** Stripe dropped — Stripe has no India onboarding
  for this business. Founder created 3 Razorpay TEST payment pages (workshop, generalist,
  engineer), wired via `NEXT_PUBLIC_RAZORPAY_*_LINK` in root .env; Stripe vars removed from
  code. Swap test→live links after Razorpay KYC completes.
- **2026-08-25 · Workshop price locked: $20 international · ₹1,999 India** (founder-locked).
  Accelerators unchanged: $1,200 intl / ₹95,000 India with no-cost EMI 3/6/10.

- **2026-08-25 · UI sources: Aceternity UI + 21st.dev (+ Magic MCP) + Motion (framer-motion)
  + R3F, all free, re-skinned to our tokens.** Rejected: Framer the platform — paid custom
  domain, replaces the stack, cannot host our Supabase/quiz/chat/certificate code.

- **2026-08-24 · PIVOT #3: business = AI education again (final).** $20 2-Day AI Workshop →
  AI Generalist Accelerator (non-tech; vibe coding + AI tools) and AI Engineer Accelerator
  (Python required; AI-augmented engineering, performance, time management), both $1,200 intl /
  ₹95,000 India. Why: founder decision; real pricing now exists. Consequences: Medusa +
  commerce retired (payments = Stripe Payment Links / Razorpay Payment Pages); storefront/
  repurposed to a program site (plan/01, design-sprint); ads/design/compliance re-aimed at
  edtech (no fake students, no outcome claims without data, Python prereq stated); all
  apparel-era docs rewritten. medusa/ folder + local pg:5433/redis:6380 containers safe to delete.

- **2026-08-24 (night shift) · Local dev Medusa runs natively** (npx medusa develop on Windows) with
  Postgres/Redis in Docker containers on ports 5433/6380 — NOT infra/docker-compose.yml (VPS-only).
  Gotchas recorded: exact-pinned @mikro-orm/* (must match framework's), ts-node + transpileOnly.
- **2026-08-24 · LLM router default models:** Groq `openai/gpt-oss-120b`, Gemini `gemini-3.5-flash`,
  NIM `meta/llama-3.1-8b-instruct` (retired ids replaced). Router needs a custom User-Agent or
  Groq's edge 403s urllib.
- **2026-08-24 · ffmpeg caption styling uses ASS units, not pixels** (PlayResY≈288 scaling) —
  MarginV=40 ≈ 267px safe zone on 1080×1920. Faster-whisper pinned to CPU int8 by default (no
  cuBLAS on this box); WHISPER_DEVICE=cuda opts back in after CUDA redist install.
- **2026-08-24 · Drafts dashboard is env-gated (`DRAFTS_DASHBOARD=1`)** until real auth exists;
  approval flips a row only — never sends.


- **2026-08-23 · Knowledge base = markdown pack + optional Graphify.** Survives model churn; any
  agent reads it first. Rejected for now: Graphiti/Zep (needs a graph DB + LLM pipeline), Potpie
  (overkill until the codebase is large) — revisit when `storefront/` + `medusa/` exist.
- **2026-08-23 · Agent tooling: Antigravity (Opus 4.6 / Gemini 3.5 Flash) on the owned Google AI Pro for
  daytime; DeepSeek V4 Flash or Kimi on NVIDIA NIM via Kilo Code as the free backup; Claude for
  plan changes/review only.** Why: cost + speed; DeepSeek V4 *Pro* is gated on NIM; GLM 5.2 hit EOL 2026-08-21.
- **2026-08-22 · Business = D2C apparel & footwear** (not AI courses). Why: easier to sell and to make ads for.
- **2026-08-22 · Commerce backend = Medusa v2 on the Oracle VPS + Next.js storefront on Cloudflare Pages.**
  Why: ₹0, MIT, headless, fits the existing stack. Alternative kept: WooCommerce (classic admin, PHP upkeep).
- **2026-08-22 · Ads = Google Flow (Veo 3.1) on the owned AI Pro; local ComfyUI/Wan pipeline dropped.**
  Why: no new cost, higher quality, no GPU babysitting. Known limits: 8-s segments, 3 refs/clip, no API, Pro-tier watermark.
- **2026-08-22 · Budget rule clarified: ₹0–100 is overhead; per-order costs are COGS.** Why: an e-commerce business can't exist otherwise.
- **2026-08-22 · Compliance stance:** product on screen must be real; no fake reviews/urgency; AI people are models/hosts; innerwear never advertised. Why: ASCI/CCPA (India), FTC (US), platform policies.
- **2026-08-21 · Domain `infra-sync.online` kept; auto-renew OFF on purpose; decide renewal vs fashion-brand `.in` by Mar 2027.**
- **2026-08-21 · Cloudflare Pages over Vercel Hobby** (commercial use allowed on free tier). **Supabase pgvector over Pinecone** (one less vendor).
- **2026-08-21 · WhatsApp: official Cloud API only; unofficial clients (Evolution/WAHA/Baileys) banned from the company number.**
