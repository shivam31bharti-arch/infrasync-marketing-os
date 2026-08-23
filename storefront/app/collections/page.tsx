import Link from "next/link";
import { COLLECTIONS } from "@/lib/medusa";

export const metadata = { title: "Collections" };

export default function CollectionsPage() {
  return (
    <>
      <h1>Collections</h1>
      <div className="product-grid">
        {COLLECTIONS.map((c) => (
          <Link key={c.slug} className="card" href={`/collections/${c.slug}`}>
            <div className="img"><span>[[COLLECTION_TILE]]</span></div>
            <strong>{c.label}</strong>
          </Link>
        ))}
      </div>
    </>
  );
}
