import Link from "next/link";

// Utility routes (quiz, policies, verify, thank-you, drafts) keep the dark v3
// chrome inside .u-dark so they stay legible over the light v4 base.
export default function UtilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="u-dark">
      <header className="site-nav" role="banner" style={{ position: "sticky" }}>
        <div className="nav-container">
          <Link href="/" className="brand" aria-label="SkillSync — Home">
            <span className="brand-mark" aria-hidden="true">
              S
            </span>
            <span className="brand-name">SkillSync</span>
          </Link>
          <nav className="nav-primary" aria-label="Primary navigation">
            <Link href="/#register" className="nav-link">
              Workshop
            </Link>
            <Link href="/#curriculum" className="nav-link">
              Programs
            </Link>
            <Link href="/quiz" className="nav-link">
              Find Your Track
            </Link>
          </nav>
          <div className="nav-actions">
            <Link href="/#register" className="button button--primary nav-cta">
              Register — ₹1,999
            </Link>
          </div>
        </div>
      </header>
      <div style={{ paddingTop: 0 }}>{children}</div>
      <footer
        className="site-footer"
        role="contentinfo"
        style={{ background: "transparent" }}
      >
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,250,241,0.1)", paddingTop: "1.5rem" }}>
          <p className="copyright">
            © {new Date().getFullYear()} SkillSync. All rights reserved.
          </p>
          <nav aria-label="Footer" style={{ display: "flex", gap: "1.25rem" }}>
            <Link href="/policies/refund">Refunds</Link>
            <Link href="/policies/privacy">Privacy</Link>
            <Link href="/policies/terms">Terms</Link>
            <Link href="/policies/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
