import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Engineer Accelerator — Python Required — $1,200 / ₹95,000",
  description:
    "For developers with Python experience. AI-augmented engineering, performance, productivity, and time management. $1,200 international / ₹95,000 India.",
};

export default function AIEngineerPage() {
  const paymentLinkIntl =
    process.env.NEXT_PUBLIC_STRIPE_ENGINEER_LINK || null;
  const paymentLinkIndia =
    process.env.NEXT_PUBLIC_RAZORPAY_ENGINEER_LINK || null;

  return (
    <>
      {/* Hero */}
      <section
        className="section section--dark"
        style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}
      >
        <div className="container">
          <span
            className="prereq-badge"
            style={{ marginBottom: "var(--space-lg)", display: "inline-flex" }}
          >
            ⚡ PYTHON REQUIRED
          </span>
          <h1 style={{ maxWidth: "700px", marginBottom: "var(--space-xl)" }}>
            AI Engineer Accelerator
          </h1>
          <p
            className="muted"
            style={{
              fontSize: "1.25rem",
              maxWidth: "560px",
              lineHeight: 1.7,
              marginBottom: "var(--space-lg)",
            }}
          >
            For developers with basic-to-intermediate Python. AI-augmented
            engineering, performance, productivity, and time management —
            level up how you build.
          </p>
          <p
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              borderRadius: "var(--radius-md)",
              padding: "var(--space-md) var(--space-lg)",
              marginBottom: "var(--space-2xl)",
              maxWidth: "560px",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
            }}
          >
            <strong>Prerequisite:</strong> Basic-to-intermediate Python
            programming. You should be comfortable writing functions, working
            with data structures, and using the command line. If you&apos;re not
            sure, the{" "}
            <Link href="/programs/ai-generalist" style={{ color: "var(--color-electric)", textDecoration: "underline" }}>
              AI Generalist track
            </Link>{" "}
            may be a better fit.
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
      <section className="section">
        <div className="container">
          <p className="label" style={{ marginBottom: "var(--space-md)" }}>
            Curriculum
          </p>
          <h2 style={{ marginBottom: "var(--space-3xl)" }}>
            What you&apos;ll learn
          </h2>
          <div className="grid grid--2">
            <div className="card">
              <div className="card-body">
                <h3 style={{ marginBottom: "var(--space-md)" }}>
                  AI-Augmented Engineering
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Integrate AI into your development workflow — code generation,
                  review, debugging, and testing with real engineering rigor.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3 style={{ marginBottom: "var(--space-md)" }}>
                  Performance &amp; Productivity
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Ship faster without sacrificing quality. Learn the workflows
                  and tools that multiply engineering output.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3 style={{ marginBottom: "var(--space-md)" }}>
                  Time Management for Engineers
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Manage complexity, prioritize ruthlessly, and stay productive
                  on large projects with AI assistance.
                </p>
              </div>
            </div>
            <div className="card">
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

      {/* Prerequisites detail */}
      <section className="section section--dark">
        <div className="container container--narrow">
          <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
            Prerequisites
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
            <div className="step">
              <div className="step-number">✓</div>
              <div className="step-content">
                <h3>Python (basic to intermediate)</h3>
                <p>
                  Comfortable with functions, loops, data structures, file I/O.
                  You don&apos;t need to be an expert — but you should be able to
                  read and write Python without guidance.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">✓</div>
              <div className="step-content">
                <h3>Command line basics</h3>
                <p>
                  Navigating directories, running scripts, using git. If you
                  use a terminal daily, you&apos;re fine.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">✓</div>
              <div className="step-content">
                <h3>Curiosity about AI</h3>
                <p>
                  No prior ML/AI experience required. We teach that. You bring
                  the engineering foundations.
                </p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "var(--space-3xl)", textAlign: "center" }}>
            <p className="muted" style={{ marginBottom: "var(--space-lg)" }}>
              Not sure you&apos;re ready? The quiz will help.
            </p>
            <Link href="/quiz" className="button button--secondary button--large">
              Take the Track-Fit Quiz →
            </Link>
          </div>
        </div>
      </section>

      {/* Certificate + CTA */}
      <section className="section" style={{ textAlign: "center" }}>
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
          </div>
        </div>
      </section>
    </>
  );
}
