import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Generalist Accelerator — $1,200 / ₹95,000",
  description:
    "For non-tech professionals. Learn vibe coding, the modern AI tool stack, and build real things — no engineering background needed.",
};

export default function AIGeneralistPage() {
  const paymentLinkIntl =
    process.env.NEXT_PUBLIC_STRIPE_GENERALIST_LINK || null;
  const paymentLinkIndia =
    process.env.NEXT_PUBLIC_RAZORPAY_GENERALIST_LINK || null;

  return (
    <>
      {/* Hero */}
      <section
        className="section"
        style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}
      >
        <div className="container">
          <span className="track-badge" style={{ marginBottom: "var(--space-lg)", display: "inline-flex" }}>
            NON-TECH FRIENDLY
          </span>
          <h1 style={{ maxWidth: "700px", marginBottom: "var(--space-xl)" }}>
            AI Generalist Accelerator
          </h1>
          <p
            className="muted"
            style={{
              fontSize: "1.25rem",
              maxWidth: "560px",
              lineHeight: 1.7,
              marginBottom: "var(--space-2xl)",
            }}
          >
            For professionals without a coding background. Learn vibe coding,
            the modern AI tool stack, and how to build real things — no
            engineering degree needed.
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-2xl)",
              flexWrap: "wrap",
              marginBottom: "var(--space-2xl)",
            }}
          >
            <div>
              <div className="price-display">$1,200</div>
              <p className="price-note">International</p>
            </div>
            <div>
              <div className="price-display">₹95,000</div>
              <p className="price-note">India</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "var(--space-md)",
              flexWrap: "wrap",
            }}
          >
            {paymentLinkIntl ? (
              <a
                href={paymentLinkIntl}
                className="button button--primary button--large"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enroll — $1,200
              </a>
            ) : (
              <span className="tbd">Enrollment opens soon</span>
            )}
            {paymentLinkIndia && (
              <a
                href={paymentLinkIndia}
                className="button button--secondary button--large"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enroll — ₹95,000
              </a>
            )}
            <Link
              href="/workshop"
              className="button button--ghost button--large"
            >
              Start with the $20 Workshop →
            </Link>
          </div>
        </div>
      </section>

      {/* What you learn */}
      <section className="section section--dark">
        <div className="container">
          <p className="label" style={{ marginBottom: "var(--space-md)" }}>
            Curriculum
          </p>
          <h2 style={{ marginBottom: "var(--space-3xl)" }}>
            What you&apos;ll learn
          </h2>
          <div className="grid grid--2">
            <div className="card card--dark">
              <div className="card-body">
                <h3 style={{ marginBottom: "var(--space-md)" }}>
                  Vibe Coding
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Build functional software using AI assistants — no traditional
                  coding skills required. Describe what you want, iterate with
                  AI, and ship.
                </p>
              </div>
            </div>
            <div className="card card--dark">
              <div className="card-body">
                <h3 style={{ marginBottom: "var(--space-md)" }}>
                  The Modern AI Tool Stack
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Master the tools that are changing every profession — from
                  document processing to content creation to workflow automation.
                </p>
              </div>
            </div>
            <div className="card card--dark">
              <div className="card-body">
                <h3 style={{ marginBottom: "var(--space-md)" }}>
                  Building Real Things
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Hands-on projects throughout — not theory. You&apos;ll leave
                  with a portfolio of things you actually built using AI.
                </p>
              </div>
            </div>
            <div className="card card--dark">
              <div className="card-body">
                <h3 style={{ marginBottom: "var(--space-md)" }}>
                  <span className="tbd">
                    Full curriculum modules announced soon
                  </span>
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Detailed module breakdown, session schedule, and project list
                  will be published before the first cohort opens for enrollment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section">
        <div className="container container--narrow">
          <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
            Is this track right for you?
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
            <div className="step">
              <div className="step-number">✓</div>
              <div className="step-content">
                <h3>You don&apos;t have a coding background</h3>
                <p>
                  Marketing, operations, design, management, freelancing — any
                  non-tech background works. No Python, no prior programming.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">✓</div>
              <div className="step-content">
                <h3>You want to build, not just prompt</h3>
                <p>
                  Beyond chatting with AI — you want to build automations,
                  tools, and workflows using the latest AI capabilities.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">✓</div>
              <div className="step-content">
                <h3>You learn by doing</h3>
                <p>
                  Every session is hands-on. You&apos;ll build projects, not
                  watch lectures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificate + CTA */}
      <section className="section section--dark" style={{ textAlign: "center" }}>
        <div className="container container--narrow">
          <h2 style={{ marginBottom: "var(--space-xl)" }}>
            Earn your Outskill certificate
          </h2>
          <p
            className="muted"
            style={{
              fontSize: "1.125rem",
              marginBottom: "var(--space-xl)",
              lineHeight: 1.7,
            }}
          >
            Complete the program and receive a verifiable Outskill certificate
            of completion with a unique code and public verification page.
          </p>
          <p className="tbd" style={{ marginBottom: "var(--space-2xl)" }}>
            Program duration and schedule announced soon
          </p>
          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/workshop"
              className="button button--primary button--large"
            >
              Start with the Workshop — $20
            </Link>
            <Link href="/quiz" className="button button--secondary button--large">
              Take the Quiz →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
