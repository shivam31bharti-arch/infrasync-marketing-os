"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, clearCart, type CartItem } from "@/lib/cart";
import { track } from "@/lib/analytics";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  if (!items.length) {
    return (
      <>
        <h1>Cart</h1>
        <p className="muted">Your cart is empty.</p>
        <Link href="/">Shop now</Link>
      </>
    );
  }

  return (
    <>
      <h1>Cart</h1>
      <table className="cart">
        <thead>
          <tr><th>Product</th><th>Variant</th><th>Qty</th></tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.variantId}>
              <td>{i.title}</td>
              <td>{i.variantTitle}</td>
              <td>{i.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: "1.5rem" }}>
        <button
          onClick={() => {
            track({ name: "checkout_started", props: { cart_size: items.reduce((n, i) => n + i.quantity, 0) } });
            // TODO(checkout): create a Medusa cart + redirect to checkout (Razorpay/Stripe
            // test mode) once payment KYC is complete. Real money is NOT possible yet.
            alert("Checkout is a placeholder — payments are not wired yet (test mode pending KYC).");
          }}
        >
          Checkout
        </button>{" "}
        <button className="ghost" onClick={() => { clearCart(); setItems([]); }}>Clear</button>
      </p>
    </>
  );
}
