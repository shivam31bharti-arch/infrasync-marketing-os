import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import PostHogInit from "@/components/PostHogInit";
import SubscriberPopup from "@/components/SubscriberPopup";
import SubscribeForm from "@/components/SubscribeForm";
import ChatWidget from "@/components/ChatWidget";
import GlassNav from "@/components/v3/GlassNav";

export const metadata: Metadata = {
  title: {
    default: "SkillSync — Learn AI by Building",
    template: "%s · SkillSync",
  },
  description:
    "Live, cohort-based AI education. Start with the 2-Day AI Workshop ($20 international · ₹1,999 India), then choose your path: AI Generalist (non-tech) or AI Engineer (Python required).",
  openGraph: { siteName: "SkillSync" },
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
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <PostHogInit />
        <GlassNav />
        <main id="main-content" role="main">
          {children}
        </main>
        <footer className="site-footer" role="contentinfo">
          <div className="footer-container">
            <div className="footer-brand">
              <Link
                href="/"
                className="footer-brand-link"
                aria-label="SkillSync — Home"
              >
                <span className="brand-mark" aria-hidden="true">
                  S
                </span>
                <span className="brand-name" style={{ color: "#F4F2EC" }}>
                  SkillSync
                </span>
              </Link>
              <p className="footer-tagline">
                AI education for builders. Live, cohort-based programs that
                teach you to work with AI — for real.
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
                    <a href="mailto:team@infra-sync.online">
                      team@infra-sync.online
                    </a>
                  </li>
                  <li>
                    <Link href="/verify/SSC-2026-0001">Verify a certificate</Link>
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
            <p>
              <a href="mailto:team@infra-sync.online" className="muted">
                team@infra-sync.online
              </a>
            </p>
          </div>
        </footer>
        <ChatWidget />
        <SubscriberPopup />
      </body>
    </html>
  );
}
