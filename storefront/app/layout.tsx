import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import PostHogInit from "@/components/PostHogInit";
import SubscriberPopup from "@/components/SubscriberPopup";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: { default: "[[BRAND_NAME]] — Apparel & Footwear", template: "%s · [[BRAND_NAME]]" },
  description: "[[BRAND_DESCRIPTION]] — placeholder copy until agent/offers.md is filled. Do not publish.",
  openGraph: { siteName: "[[BRAND_NAME]]" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PostHogInit />
        <header className="site-nav">
          <Link href="/" className="brand">[[BRAND_NAME]]</Link>
          <nav>
            <Link href="/collections/clothing">Clothing</Link>
            <Link href="/collections/footwear">Footwear</Link>
            <Link href="/collections/bags-accessories">Bags &amp; Accessories</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <div>
            <p className="muted" style={{ maxWidth: 320 }}>
              [[FOOTER_BLURB]] — placeholder. Sign up for drops and offers.
            </p>
            <SubscribeForm source="footer" compact />
          </div>
          <nav>
            <Link href="/policies/shipping">Shipping</Link>
            <Link href="/policies/returns">Returns &amp; Exchanges</Link>
            <Link href="/policies/privacy">Privacy</Link>
            <Link href="/policies/terms">Terms &amp; Seller Details</Link>
          </nav>
        </footer>
        <SubscriberPopup />
      </body>
    </html>
  );
}
