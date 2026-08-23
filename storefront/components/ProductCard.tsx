import Link from "next/link";
import type { MedusaProduct } from "@/lib/medusa";

function formatPrice(p: MedusaProduct): string {
  const price = p.variants?.[0]?.prices?.[0];
  if (!price || !price.amount) return "[[PRICE]]";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: price.currency_code.toUpperCase(),
  }).format(price.amount / 100);
}

export default function ProductCard({ product }: { product: MedusaProduct }) {
  return (
    <Link className="card" href={`/products/${product.handle}`}>
      <div className="img">
        {product.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.thumbnail} alt={product.title} />
        ) : (
          <span>[[PRODUCT_PHOTO]]</span>
        )}
      </div>
      <strong>{product.title}</strong>
      <div className="muted">{formatPrice(product)}</div>
    </Link>
  );
}
