"use client";

import { useEffect, useMemo, useState } from "react";
import type { MedusaProduct } from "@/lib/medusa";
import { track } from "@/lib/analytics";
import { addToCart } from "@/lib/cart";

// Client-side product detail: variant selector + add to cart + analytics.
export default function ProductDetail({ product }: { product: MedusaProduct }) {
  const variants = useMemo(() => product.variants ?? [], [product]);
  const [variantId, setVariantId] = useState<string>(variants[0]?.id ?? "");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    track({ name: "product_viewed", props: { product_id: product.id, handle: product.handle, title: product.title } });
  }, [product]);

  const variant = variants.find((v) => v.id === variantId) ?? variants[0];
  const price = variant?.prices?.[0];

  return (
    <div>
      <h1>{product.title}</h1>
      <p className="muted">{product.description}</p>
      {product.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.thumbnail} alt={product.title} style={{ maxWidth: 420, borderRadius: 8 }} />
      ) : (
        <div className="img card" style={{ maxWidth: 420 }}>
          <span>[[PRODUCT_PHOTO]] — real product photos required before publish</span>
        </div>
      )}
      {variants.length > 1 && (
        <label style={{ display: "block", margin: "1rem 0" }}>
          Variant (size / colour):{" "}
          <select value={variantId} onChange={(e) => setVariantId(e.target.value)}>
            {variants.map((v) => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>
        </label>
      )}
      <p>
        <strong>
          {price && price.amount
            ? new Intl.NumberFormat("en-IN", { style: "currency", currency: price.currency_code.toUpperCase() }).format(price.amount / 100)
            : "[[PRICE]]"}
        </strong>
      </p>
      <button
        onClick={() => {
          if (!variant) return;
          addToCart({ productId: product.id, variantId: variant.id, title: product.title, variantTitle: variant.title, quantity: 1 });
          track({ name: "add_to_cart", props: { product_id: product.id, variant_id: variant.id, quantity: 1 } });
          setAdded(true);
          setTimeout(() => setAdded(false), 2000);
        }}
        disabled={!variant}
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>
    </div>
  );
}
