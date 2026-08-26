import type { Metadata } from "next";
import Link from "next/link";
import CurriculumModule from "@/components/CurriculumModule";
import Reveal from "@/components/Reveal";
import StickyCTA from "@/components/StickyCTA";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv(); // root .env (NEXT_PUBLIC_* not auto-loaded outside storefront/)

export const metadata: Metadata = {
  title: "AI Engineer Accelerator — Python Required — $1,200 / ₹95,000",
  description:
    "For developers with Python experience. AI-augmented engineering, performance, productivity, and time management. $1,200 international / ₹95,000 India.",
};

export default function AIEngineerPage() {
  const paymentLink = serverEnv("NEXT_PUBLIC_RAZORPAY_ENGINEER_LINK") || null;

  return (
    <>
      {/* Hero */}
      <section className="hero-v3 section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <Reveal>
                <span
                  className="prereq-badge"
                  style={{ marginBottom: "var(--space-lg)", display: "inline-flex" }}
                >
                  ⚡ PYTHON REQUIRED
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 style={{ marginBottom: "var(--space-lg)" }}>
                  AI Engineer Accelerator
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p
                  className="muted"
                  style={{
                    fontSize: "1.2rem",
                    maxWidth: "540px",
                    lineHeight: 1.7,
                    marginBottom: "var(--space-lg)",
                  }}
                >
                  For developers with basic-to-intermediate Python. AI-augmented
                  engineering, performance, productivity, and time management —
                  level up how you build.
                </p>
                <p
                  className="muted"
                  style={{
                    fontSize: "0.9375rem",
                    maxWidth: "540px",
                    lineHeight: 1.7,
                    marginBottom: "var(--space-xl)",
                  }}
                >
                  <strong>Prerequisite:</strong> Basic-to-intermediate Python —
                  you should be able to read and write Python without guidance.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-2xl)",
                    flexWrap: "wrap",
                    marginBottom: "var(--space-lg)",
                  }}
                >
                  <div>
                    <div className="price-display">₹95,000</div>
                    <p className="price-note">India · no-cost EMI 3 / 6 / 10 months</p>
                  </div>
                  <div>
                    <div className="price-display">$1,200</div>
                    <p className="price-note">International</p>
                  </div>
                </div>
                <div className="chip-row" style={{ marginBottom: "var(--space-xl)" }}>
                  <span className="chip chip--green">Next cohort: Sep 15, 2026</span>
                  <span className="chip">Live · 7:30–10:30 PM IST</span>
                  <span className="chip">+ weekend office hours</span>
                  <span className="chip">4-week money-back</span>
                </div>
              </Reveal>
              <Reveal delay={0.26}>
                <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
                  {paymentLink ? (
                    <a
                      href={paymentLink}
                      className="button button--primary button--large"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enroll — ₹95,000 / $1,200
                    </a>
                  ) : (
                    <span className="tbd">Enrollment opens soon</span>
                  )}
                  <Link href="/workshop" className="button button--ghost button--large">
                    Start with the ₹1,999 Workshop →
                  </Link>
                </div>
                <p
                  className="muted"
                  style={{
                    marginTop: "var(--space-lg)",
                    fontSize: "0.9375rem",
                    maxWidth: "560px",
                    lineHeight: 1.7,
                  }}
                >
                  Full refund if you cancel within 4 weeks of cohort start ·{" "}
                  <span className="tbd">program duration announced soon</span>
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15} y={44}>
              <div className="media-frame media-frame--tall">
                {/* Decorative mood imagery only — never presented as students (claims policy) */}
                <img src="/images/engineer-code.webp" alt="" width={1600} height={1067} />
                <span className="media-caption">AI-augmented engineering</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What you learn */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <p className="label" style={{ marginBottom: "var(--space-md)" }}>
              Curriculum
            </p>
            <h2 style={{ marginBottom: "var(--space-3xl)" }}>What you&apos;ll learn</h2>
          </Reveal>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-md)",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
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
      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
              Prerequisites
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
            <Reveal>
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
            </Reveal>
            <Reveal delay={0.08}>
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
            </Reveal>
            <Reveal delay={0.16}>
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
            </Reveal>
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
      <section className="section section--dark" style={{ textAlign: "center" }}>
        <div className="container container--narrow">
          <Reveal>
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
              Next cohort: <strong>Sep 15, 2026</strong> · live sessions
              7:30–10:30 PM IST + weekend office hours
            </p>
            <p className="tbd" style={{ marginBottom: "var(--space-2xl)" }}>
              Program duration announced soon
            </p>
            <div
              style={{
                display: "flex",
                gap: "var(--space-md)",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/workshop" className="button button--primary button--large">
                Start with the Workshop — ₹1,999
              </Link>
              <Link href="/quiz" className="button button--secondary button--large">
                Take the Quiz →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {paymentLink ? (
        <StickyCTA
          amount="₹95,000 / $1,200"
          label="AI Engineer · Python required · cohort Sep 15"
          href={paymentLink}
          cta="Enroll"
          external
        />
      ) : null}
    </>
  );
}
