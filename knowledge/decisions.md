# Decision log (newest first). Format: date · decision · why · rejected alternatives.

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
