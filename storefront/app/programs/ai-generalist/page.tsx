import type { Metadata } from "next";
import Link from "next/link";
import GradientMesh from "@/components/GradientMesh";
import CurriculumModule from "@/components/CurriculumModule";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv(); // root .env (NEXT_PUBLIC_* not auto-loaded outside storefront/)

export const metadata: Metadata = {
  title: "AI Generalist Accelerator — $1,200 / ₹95,000",
  description:
    "For non-tech professionals. Learn vibe coding, the modern AI tool stack, and build real things — no engineering background needed.",
};

export default function AIGeneralistPage() {
  const paymentLink =
    serverEnv("NEXT_PUBLIC_RAZORPAY_GENERALIST_LINK") || null;

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
      <section className="section section--dark">
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
              title="AI Fundamentals & Prompting"
              description="How modern AI actually works, where it helps, where it fails — and how to prompt it for reliable, useful output."
            />
            <CurriculumModule 
              index={1}
              title="Vibe Coding with AI Builders"
              description="Build functional software using AI assistants — no traditional coding skills required. Describe what you want, iterate with AI, and ship."
            />
            <CurriculumModule 
              index={2}
              title="Automations Without Code"
              description="Design automations for everyday work — connect tools, data, and AI steps without writing a line of code."
            />
            <CurriculumModule 
              index={3}
              title="AI for Content, Marketing & Data"
              description="Put AI to work on content, marketing, and data workflows — the highest-leverage applications for non-tech roles."
            />
            <CurriculumModule 
              index={4}
              title="Build-Your-Own Capstone"
              description="Finish with a project you design and build yourself — a real thing you made, not a certificate of attendance."
            />
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
            <Link href="/quiz" className="button button--secondary button--large">
              Take the Quiz →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}



