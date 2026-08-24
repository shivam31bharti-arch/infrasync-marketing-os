import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import PostHogInit from "@/components/PostHogInit";
import SubscriberPopup from "@/components/SubscriberPopup";
import SubscribeForm from "@/components/SubscribeForm";
import { DEMO_BRAND } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: { default: `${DEMO_BRAND.name} — ${DEMO_BRAND.tagline}`, template: `%s · ${DEMO_BRAND.name}` },
  description: DEMO_BRAND.story,
  openGraph: { siteName: DEMO_BRAND.name },
  other: {
    "font-display": "swap",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500&family=Cormorant+Garamond:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <PostHogInit />
        <header className="site-nav" role="banner">
          <div className="nav-container">
            <Link href="/" className="brand" aria-label={`${DEMO_BRAND.name} — Home`}>
              <span className="brand-monogram" aria-hidden="true">{DEMO_BRAND.monogram}</span>
              <span className="brand-name">{DEMO_BRAND.name}</span>
            </Link>
            <nav className="nav-primary" aria-label="Primary navigation">
              <Link href="/collections/clothing" className="nav-link">Clothing</Link>
              <Link href="/collections/footwear" className="nav-link">Footwear</Link>
              <Link href="/collections/bags-accessories" className="nav-link">Bags & Accessories</Link>
            </nav>
            <div className="nav-actions">
              <Link href="/try-on" className="button button--secondary nav-cta">
                Try-On Studio
              </Link>
              <Link href="/cart" className="nav-cart" aria-label="Shopping cart">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="cart-count" aria-live="polite" aria-atomic="true">0</span>
              </Link>
            </div>
          </div>
        </header>
        <main id="main-content" role="main">{children}</main>
        <footer className="site-footer" role="contentinfo">
          <div className="footer-container">
            <div className="footer-brand">
              <Link href="/" className="footer-brand-link" aria-label={`${DEMO_BRAND.name} — Home`}>
                <span className="brand-monogram" aria-hidden="true">{DEMO_BRAND.monogram}</span>
                <span className="brand-name">{DEMO_BRAND.name}</span>
              </Link>
              <p className="footer-tagline">{DEMO_BRAND.tagline}</p>
            </div>
            <nav className="footer-nav" aria-label="Footer navigation">
              <div className="footer-column">
                <h4 className="footer-heading">Shop</h4>
                <ul>
                  <li><Link href="/collections/clothing">Clothing</Link></li>
                  <li><Link href="/collections/footwear">Footwear</Link></li>
                  <li><Link href="/collections/bags-accessories">Bags & Accessories</Link></li>
                  <li><Link href="/try-on">Try-On Studio</Link></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Support</h4>
                <ul>
                  <li><Link href="/policies/shipping">Shipping</Link></li>
                  <li><Link href="/policies/returns">Returns & Exchanges</Link></li>
                  <li><Link href="/policies/privacy">Privacy</Link></li>
                  <li><Link href="/policies/terms">Terms & Seller Details</Link></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Company</h4>
                <ul>
                  <li><Link href="/about">Our Story</Link></li>
                  <li><Link href="/journal">Journal</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
            </nav>
            <div className="footer-newsletter">
              <h4 className="footer-heading">Stay Informed</h4>
              <p className="footer-newsletter-text">Early access to new collections, private sales, and studio notes.</p>
              <SubscribeForm source="footer" compact />
              <p className="demo-label" aria-hidden="true">Demo content — no real emails collected</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© {new Date().getFullYear()} {DEMO_BRAND.name}. All rights reserved.</p>
            <p className="demo-badge">Demo Store — Not for Production Use</p>
          </div>
        </footer>
        <SubscriberPopup />
      </body>
    </html>
  );
}