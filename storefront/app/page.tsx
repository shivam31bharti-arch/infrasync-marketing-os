import Link from "next/link";
import { listProducts, COLLECTIONS } from "@/lib/medusa";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const { products, fromFallback } = await listProducts();
  return (
    <>
      <h1>[[HERO_HEADLINE]]</h1>
      <p className="muted">
        [[HERO_SUBCOPY]] — placeholder marketing copy; real copy comes from agent/offers.md once the
        user fills it in. Nothing here is final.
      </p>
      {fromFallback && (
        <p>
          <span className="badge">Dev mode: Medusa backend unreachable — showing clearly-fake sample products</span>
        </p>
      )}
      <h2>Shop by category</h2>
      <p>
        {COLLECTIONS.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} style={{ marginRight: "1rem" }}>
            <button className="ghost">{c.label}</button>
          </Link>
        ))}
      </p>
      <h2>New in</h2>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
