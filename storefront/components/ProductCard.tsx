"use client";

import Link from "next/link";
import Image from "next/image";
import type { DemoProduct } from "@/lib/demo-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

interface ProductCardProps {
  product: DemoProduct;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const primaryImage = product.images[0];

  return (
    <Link
      href={`/products/${product.handle}`}
      className="product-card"
      aria-label={`${product.title} — ${formatPrice(product.price)}`}
    >
      <div className="product-card-media">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="product-card-image"
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/AB//2Q=="
          />
        ) : (
          <div className="product-card-placeholder" aria-hidden="true" />
        )}
        {product.isNew && <span className="product-badge">New</span>}
        {product.featured && <span className="product-badge product-badge--featured">Featured</span>}
      </div>
      <div className="product-card-content">
        <p className="product-card-category label">{product.category.replace("-", " ")}</p>
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-price">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}