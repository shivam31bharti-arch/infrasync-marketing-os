import type { Metadata } from "next";
import Link from "next/link";
import CurriculumModule from "@/components/CurriculumModule";
import Reveal from "@/components/Reveal";
import StickyCTA from "@/components/StickyCTA";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv(); // root .env (NEXT_PUBLIC_* not auto-loaded outside storefront/)

export const metadata: Metadata = {
  title: "AI Generalist Accelerator — $1,200 / ₹95,000",
  description:
    "For non-tech professionals. Learn vibe coding, the modern AI tool stack, and build real things — no engineering background needed.",
};

export default function AIGeneralistPage() {
  const paymentLink = serverEnv("NEXT_PUBLIC_RAZORPAY_GENERALIST_LINK") || null;

  return (
    <>
      {/* Hero */}
      <section className="hero-v3 section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <Reveal>
                <span
                  className="track-badge"
                  style={{ marginBottom: "var(--space-lg)", display: "inline-flex" }}
                >
                  NON-TECH FRIENDLY
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 style={{ marginBottom: "var(--space-lg)" }}>
                  AI Generalist Accelerator
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p
                  className="muted"
                  style={{
                    fontSize: "1.2rem",
                    maxWidth: "540px",
                    lineHeight: 1.7,
                    marginBottom: "var(--space-xl)",
                  }}
                >
                  For professionals without a coding background. Learn vibe coding,
                  the modern AI tool stack, and how to build real things — no
                  engineering degree needed.
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
                <img src="/images/generalist-build.webp" alt="" width={1600} height={1067} />
                <span className="media-caption">Build without a coding background</span>
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
          <Reveal>
            <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
              Is this track right for you?
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
            <Reveal>
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
            </Reveal>
            <Reveal delay={0.08}>
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
            </Reveal>
            <Reveal delay={0.16}>
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
            </Reveal>
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
          label="AI Generalist · cohort starts Sep 15 · no-cost EMI"
          href={paymentLink}
          cta="Enroll"
          external
        />
      ) : null}
    </>
  );
}
