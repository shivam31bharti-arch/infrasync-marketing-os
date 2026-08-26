import type { Metadata } from "next";
import Link from "next/link";
import GradientMesh from "@/components/GradientMesh";
import CurriculumModule from "@/components/CurriculumModule";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv(); // root .env (NEXT_PUBLIC_* not auto-loaded outside storefront/)

export const metadata: Metadata = {
  title: "AI Engineer Accelerator — Python Required — $1,200 / ₹95,000",
  description:
    "For developers with Python experience. AI-augmented engineering, performance, productivity, and time management. $1,200 international / ₹95,000 India.",
};

export default function AIEngineerPage() {
  const paymentLink =
    serverEnv("NEXT_PUBLIC_RAZORPAY_ENGINEER_LINK") || null;

  return (
    <>
      {/* Hero */}
      <section
        className="section section--dark"
        style={{ minHeight: "50vh", display: "flex", alignItems: "center", position: "relative" }}
      >
        <GradientMesh />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
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
            {paymentLink ? (
              <a
                href={paymentLink}
                className="button button--primary button--large"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enroll — $1,200 / ₹95,000
              </a>
            ) : (
              <span className="tbd">Enrollment opens soon</span>
            )}
            <Link
              href="/workshop"
              className="button button--ghost button--large"
            >
              Start with the $20 Workshop →
            </Link>
          </div>
          <p className="muted" style={{ marginTop: "var(--space-xl)", fontSize: "0.9375rem", maxWidth: "640px", lineHeight: 1.7 }}>
            Next cohort starts <strong>Sep 15, 2026</strong> · live sessions Tue
            &amp; Thu, 7:30–10:30 PM IST + weekend office hours ·{" "}
            <span className="tbd">program duration announced soon</span>
          </p>
          <p className="muted" style={{ marginTop: "var(--space-sm)", fontSize: "0.9375rem", maxWidth: "640px", lineHeight: 1.7 }}>
            India: <strong>no-cost EMI</strong> — 3, 6, or 10 months via
            Razorpay (subject to bank approval) · Full refund within 4 weeks of
            cohort start.
          </p>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)", maxWidth: "800px", margin: "0 auto" }}>
            <CurriculumModule 
              index={0}
              title="AI-Assisted Dev Workflows"
              description="Code generation, review, and debugging with AI woven into your daily workflow — with real engineering rigor."
            />
            <CurriculumModule 
              index={1}
              title="Agents & Tool Use"
              description="Build agents that plan, call tools, and complete multi-step tasks reliably."
            />
            <CurriculumModule 
              index={2}
              title="RAG Fundamentals"
              description="Retrieval-augmented generation: embeddings, vector stores, and grounding AI answers in real data."
            />
            <CurriculumModule 
              index={3}
              title="Testing & Shipping with AI"
              description="Test AI-assisted code properly and ship it safely to production."
            />
            <CurriculumModule 
              index={4}
              title="Engineering Performance & Time Management"
              description="Systems for output, focus, and ruthless prioritization on large projects."
            />
            <CurriculumModule 
              index={5}
              title="Capstone"
              description="Ship a capstone project that demonstrates AI-augmented engineering end to end."
            />
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
            Earn your SkillSync certificate
          </h2>
          <p
            className="muted"
            style={{
              fontSize: "1.125rem",
              marginBottom: "var(--space-xl)",
              lineHeight: 1.7,
            }}
          >
            Complete the program and receive a verifiable SkillSync certificate
            of completion with a unique code and public verification page.
          </p>
          <p className="muted" style={{ marginBottom: "var(--space-sm)" }}>
            Next cohort: <strong>Sep 15, 2026</strong> · Tue &amp; Thu, 7:30–10:30 PM IST + weekend office hours
          </p>
          <p className="tbd" style={{ marginBottom: "var(--space-2xl)" }}>
            Program duration announced soon
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



