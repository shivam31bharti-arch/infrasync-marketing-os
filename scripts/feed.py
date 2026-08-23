"""feed.py — export a Google Merchant Center / Meta catalog CSV from Medusa. STUB (Stage 4).
Reads MEDUSA_BACKEND_URL + MEDUSA_PUBLISHABLE_KEY from .env, lists published products/variants,
writes feeds/google.csv and feeds/meta.csv. Excludes the innerwear collection (brand rule).
TODO (agent, Stage 4): implement against Medusa v2 Store API /store/products with fields
id, title, description, link, image_link, availability, price, brand, google_product_category,
item_group_id, color, size, condition=new.
"""
raise SystemExit("stub — implement in Stage 4")
