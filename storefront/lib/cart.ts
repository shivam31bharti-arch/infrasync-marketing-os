"use client";

// Minimal localStorage cart for the scaffold. Medusa carts replace this when
// checkout wiring lands (Stage 1 checkout task).
export type CartItem = {
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  quantity: number;
};

const KEY = "infrasync_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as CartItem[];
  } catch {
    return [];
  }
}

export function addToCart(item: CartItem): void {
  const cart = getCart();
  const existing = cart.find((i) => i.variantId === item.variantId);
  if (existing) existing.quantity += item.quantity;
  else cart.push(item);
  localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart:changed"));
}

export function clearCart(): void {
  localStorage.setItem(KEY, "[]");
  window.dispatchEvent(new Event("cart:changed"));
}
