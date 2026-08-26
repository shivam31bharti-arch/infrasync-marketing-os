import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import PostHogInit from "@/components/PostHogInit";
import SubscriberPopup from "@/components/SubscriberPopup";
import SubscribeForm from "@/components/SubscribeForm";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: {
    default: "InfraSync — Learn to Build with AI",
    template: "%s · InfraSync",
  },
  description:
    "AI education for builders. A hands-on workshop ($20 international · ₹1,999 India), then choose your path: AI Generalist (non-tech) or AI Engineer (Python required). Live, cohort-based programs by SkillSync.",
  openGraph: { siteName: "InfraSync" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <PostHogInit />
        <header className="site-nav" role="banner">
          <div className="nav-container">
            <Link href="/" className="brand" aria-label="InfraSync — Home">
              <span className="brand-mark" aria-hidden="true">
                O
              </span>
              <span className="brand-name">InfraSync</span>
            </Link>
            <nav className="nav-primary" aria-label="Primary navigation">
              <Link href="/workshop" className="nav-link">
                Workshop
              </Link>
              <Link href="/#ai-generalist" className="nav-link">
                AI Generalist
              </Link>
              <Link href="/#ai-engineer" className="nav-link">
                AI Engineer
              </Link>
              <Link href="/quiz" className="nav-link">
                Find Your Track
              </Link>
            </nav>
            <div className="nav-actions">
              <Link
                href="/workshop"
                className="button button--primary nav-cta"
              >
                Join Workshop — $20
              </Link>
            </div>
          </div>
        </header>
        <main id="main-content" role="main">
          {children}
        </main>
        <footer className="site-footer" role="contentinfo">
          <div className="footer-container">
            <div className="footer-brand">
              <Link
                href="/"
                className="footer-brand-link"
                aria-label="InfraSync — Home"
              >
                <span className="brand-mark" aria-hidden="true">
                  O
                </span>
                <span className="brand-name" style={{ color: "#F4F2EC" }}>
                  InfraSync
                </span>
              </Link>
              <p className="footer-tagline">
                AI education for builders. Live, cohort-based programs by
                SkillSync.
              </p>
            </div>
            <nav className="footer-nav" aria-label="Footer navigation">
              <div className="footer-column">
                <h4 className="footer-heading">Programs</h4>
                <ul>
                  <li>
                    <Link href="/workshop">2-Day AI Workshop</Link>
                  </li>
                  <li>
                    <Link href="/programs/ai-generalist">
                      AI Generalist Accelerator
                    </Link>
                  </li>
                  <li>
                    <Link href="/programs/ai-engineer">
                      AI Engineer Accelerator
                    </Link>
                  </li>
                  <li>
                    <Link href="/quiz">Find Your Track</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Support</h4>
                <ul>
                  <li>
                    <Link href="/policies/refund">Refund Policy</Link>
                  </li>
                  <li>
                    <Link href="/policies/privacy">Privacy</Link>
                  </li>
                  <li>
                    <Link href="/policies/terms">Terms</Link>
                  </li>
                  <li>
                    <Link href="/policies/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4 className="footer-heading">Company</h4>
                <ul>
                  <li>
                    <Link href="/">About SkillSync</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="footer-newsletter">
              <h4 className="footer-heading">Stay Updated</h4>
              <p className="footer-newsletter-text">
                Workshop dates, curriculum updates, and early-access offers.
                No spam.
              </p>
              <SubscribeForm source="footer" compact />
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">
              © {new Date().getFullYear()} SkillSync. All rights reserved.
            </p>
          </div>
        </footer>
        <ChatWidget />
        <SubscriberPopup />
      </body>
    </html>
  );
}