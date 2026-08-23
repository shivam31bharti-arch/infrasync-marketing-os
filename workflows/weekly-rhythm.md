# Weekly operating rhythm

The fixed cadence that runs the store's marketing. Budgeted for one person at **~12–15 h/week**;
with more people, split by day, not by tool.

## Every day (20 min, morning)

- WhatsApp + Instagram inbox: sizing, delivery, returns — answer inside the 24h service window
  (replies are free; a lapsed window costs a paid template to reopen)
- Approve/reject pending agent drafts (emails, WhatsApp, product copy, ad briefs)
- Glance at Sentry + Medusa orders — errors in checkout are lost revenue

## Monday — Measure & aim (1.5 h)

- PostHog funnel review: sessions → product views → add-to-cart → checkout → purchase, per channel;
  Medusa: AOV, repeat rate, returns
- Kill/scale decisions on last week's ads (kill rule: below half of median at day 7)
- Pick **one** angle/hero SKU set for the week; write it in the `campaigns` table
- Agent's Monday competitor brief lands — read it, choose the angles
- First Monday of the month: 30-min stack review ([plan/06](../plan/06-operate-and-scale.md))

## Tuesday — Briefs, images, Flow (2–3 h)

- Approve the agent's ad briefs for the week (hero SKU, 4-beat script, 9 image prompts,
  4 clip prompts, CTA) — facts checked against `agent/offers.md`
- Gather the 3 real product photos per ad; scene/mood refs via Nano Banana Pro (Gemini app) / Pomelli
- Run Flow: 9:16, Fast, 3 refs per clip, clip 1 + Extend ×3 → download 4 × 8s per ad
  (~80 credits per ad; 1,000/month on AI Pro)
- Pomelli/Canva statics for the same drop/angle

## Wednesday — Assemble & schedule (2–3 h)

- Join each ad: FFmpeg concat + optional VO + captions + price/CTA end card
  ([ugc-ad-pipeline.md](ugc-ad-pipeline.md)); run the QC checklist (product accuracy first)
- Schedule the week in Postiz: 1 ad/day + 2 value posts (styling, behind-the-scenes), per
  platform — Instagram, Pinterest, YouTube Shorts, Facebook; AI-content disclosure ON
- Pin products to posts where the platform allows; UTM links on everything

## Thursday — Flows, campaign, catalog (2 h)

- Review flow performance (welcome, abandoned cart, post-purchase, win-back) in Listmonk;
  approve the agent's drafted updates ([lead-pipeline.md](lead-pipeline.md))
- Send the week's campaign email (drop / edit / offer) to the right segment
- Catalog hygiene: new SKUs photographed + described (agent drafts copy), feeds re-exported
  to Google Merchant Center / Meta catalog / Pinterest; fix disapprovals
- Review requests going out on schedule; publish approved real reviews

## Friday — Review & harden (1 h)

- Early read on the week's content (saves/shares + product-page clicks > likes)
- Log campaign results into `campaigns.results`
- Rejected-draft reasons → update agent prompts (the LEARN step)
- Confirm last night's backup ran; update the README build-status checklist

## Weekly quotas (floor, not ceiling)

| Output | Quota |
|---|---|
| Ads shipped | 1–2 Flow product ads (≈5–7/month on AI Pro credits) |
| Value posts | 2 per platform (styling, fabric/fit detail, behind-the-scenes) |
| Email | 1 campaign to the right segment + all flows running |
| Catalog | every new SKU live with photos, copy, feed within the week |
| Experiments | 1 (new hook style, new platform, new offer framing) |
