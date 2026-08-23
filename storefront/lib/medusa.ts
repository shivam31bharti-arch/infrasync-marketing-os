// Thin Medusa Store API client (server-side fetches from Next.js).
// Dev default: local Medusa on http://localhost:9000 (Task: night-shift Stage 1).
// TODO(launch): point MEDUSA_BACKEND_URL at https://api.infra-sync.online and set
// MEDUSA_PUBLISHABLE_KEY (created by the Medusa seed) in hosting env vars.
import { serverEnv } from "./server-env";

export type MedusaProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  thumbnail?: string | null;
  images?: { url: string }[];
  options?: { id: string; title: string; values: { id: string; value: string }[] }[];
  variants?: {
    id: string;
    title: string;
    prices?: { amount: number; currency_code: string }[];
    options?: { id: string; value: string }[] | Record<string, string>;
  }[];
};

const FALLBACK_PRODUCTS: MedusaProduct[] = [
  {
    id: "sample-tee",
    title: "Sample Tee — DO NOT PUBLISH",
    handle: "sample-tee",
    description: "[[PRODUCT_DESCRIPTION]] — placeholder until agent/offers.md is filled.",
    thumbnail: null,
    variants: [{ id: "v1", title: "[[SIZE]] / [[COLOUR]]", prices: [{ amount: 0, currency_code: "inr" }] }],
  },
  {
    id: "sample-sneaker",
    title: "Sample Sneaker — DO NOT PUBLISH",
    handle: "sample-sneaker",
    description: "[[PRODUCT_DESCRIPTION]] — placeholder.",
    thumbnail: null,
    variants: [{ id: "v1", title: "[[SIZE]]", prices: [{ amount: 0, currency_code: "inr" }] }],
  },
  {
    id: "sample-backpack",
    title: "Sample Backpack — DO NOT PUBLISH",
    handle: "sample-backpack",
    description: "[[PRODUCT_DESCRIPTION]] — placeholder.",
    thumbnail: null,
    variants: [{ id: "v1", title: "[[COLOUR]]", prices: [{ amount: 0, currency_code: "inr" }] }],
  },
];

function backendUrl(): string {
  return (
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
    serverEnv("MEDUSA_BACKEND_URL") ||
    "http://localhost:9000"
  );
}

function publishableKey(): string {
  return (
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
    serverEnv("MEDUSA_PUBLISHABLE_KEY") ||
    ""
  );
}

async function medusaFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${backendUrl()}${path}`, {
      headers: { "x-publishable-api-key": publishableKey() },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null; // backend down (common in dev before Medusa is up) -> graceful degradation
  }
}

export async function listProducts(): Promise<{ products: MedusaProduct[]; fromFallback: boolean }> {
  const data = await medusaFetch<{ products: MedusaProduct[] }>("/store/products?limit=50");
  if (data && data.products?.length) return { products: data.products, fromFallback: false };
  return { products: FALLBACK_PRODUCTS, fromFallback: true };
}

export async function getProduct(handle: string): Promise<MedusaProduct | null> {
  const data = await medusaFetch<{ products: MedusaProduct[] }>(
    `/store/products?handle=${encodeURIComponent(handle)}&limit=1`
  );
  if (data?.products?.[0]) return data.products[0];
  return FALLBACK_PRODUCTS.find((p) => p.handle === handle) ?? null;
}

export const COLLECTIONS = [
  { slug: "clothing", label: "Clothing", handles: ["sample-tee"] },
  { slug: "footwear", label: "Footwear", handles: ["sample-sneaker"] },
  { slug: "bags-accessories", label: "Bags & Accessories", handles: ["sample-backpack"] },
] as const;
