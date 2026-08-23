import { notFound } from "next/navigation";
import { COLLECTIONS, listProducts } from "@/lib/medusa";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();

  const { products, fromFallback } = await listProducts();
  // Fallback mode: match by the sample-handle mapping. When the real Medusa
  // catalog exists this becomes a proper collection/category query.
  const visible = fromFallback
    ? products.filter((p) => (collection.handles as readonly string[]).includes(p.handle))
    : products; // TODO(catalog): filter by Medusa collection once real categories exist

  return (
    <>
      <h1>{collection.label}</h1>
      {fromFallback && (
        <p><span className="badge">Dev mode: sample products — DO NOT PUBLISH</span></p>
      )}
      <div className="product-grid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
