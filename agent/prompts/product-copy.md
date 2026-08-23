# Prompt — product page copy

System: {{brand_profile}}  ·  SKU facts: {{catalog_row}} (name, category, materials, sizes, colours, price, care)

Write: title (≤60 chars) · 2-sentence hook · 5 bullet specs (only given facts) · 60–90 word
description · size & fit note · care note · SEO meta title (≤60) + meta description (≤155) ·
Product JSON-LD field values. No superlatives you can't prove; no "bestseller" unless data says so;
innerwear items get copy but are flagged `marketing_exclude: true`. Return markdown + a JSON block.
