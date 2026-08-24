import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "2-Day AI Workshop — $20",
  description:
    "Two days of hands-on AI fundamentals. A taste of both the Generalist and Engineer accelerators. Just $20.",
};

export default function WorkshopPage() {
  const paymentLink =
    process.env.NEXT_PUBLIC_STRIPE_WORKSHOP_LINK || null;

  return (
    <>
      {/* Hero */}
      <section
        className="section section--dark"
        style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}
      >
        <div className="container">
          <p className="label" style={{ marginBottom: "var(--space-md)" }}>
            The starting point
          </p>
          <h1 style={{ maxWidth: "700px", marginBottom: "var(--space-xl)" }}>
            2-Day AI Workshop
          </h1>
          <p
            className="muted"
            style={{
              fontSize: "1.25rem",
              maxWidth: "560px",
              lineHeight: 1.7,
              marginBottom: "var(--space-xl)",
            }}
          >
            Two days of hands-on AI fundamentals. No prior coding needed.
            A real taste of both accelerator tracks — before you commit.
          </p>
          <div className="price-display" style={{ marginBottom: "var(--space-md)" }}>
            $20
          </div>
          <p className="price-note" style={{ marginBottom: "var(--space-2xl)" }}>
            One-time payment. No hidden fees.
          </p>
          {paymentLink ? (
            <a
              href={paymentLink}
              className="button button--primary button--large"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now — $20
            </a>
          ) : (
            <span className="tbd">
              Registration opens soon — payment link being configured
            </span>
          )}
        </div>
      </section>

      {/* What you'll learn */}
      <section className="section">
        <div className="container">
          <p className="label" style={{ marginBottom: "var(--space-md)" }}>
            What&apos;s covered
          </p>
          <h2 style={{ marginBottom: "var(--space-3xl)" }}>
            Two days. Real skills. Zero fluff.
          </h2>
          <div className="grid grid--3">
            <div className="card">
              <div className="card-body">
                <span className="track-badge">DAY 1</span>
                <h3 style={{ marginBottom: "var(--space-md)", marginTop: "var(--space-md)" }}>
                  AI Fundamentals
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Understand how AI works today. Hands-on with the tools
                  that matter — not theory slides. You&apos;ll build something
                  real before the day is over.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <span className="track-badge">DAY 2</span>
                <h3 style={{ marginBottom: "var(--space-md)", marginTop: "var(--space-md)" }}>
                  Choose Your Path
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Explore both accelerator tracks — Generalist and
                  Engineer. Work through sample projects from each. Find
                  where you fit.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <span className="track-badge">OUTCOME</span>
                <h3 style={{ marginBottom: "var(--space-md)", marginTop: "var(--space-md)" }}>
                  Clear Next Steps
                </h3>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  Walk away with real skills, a clear recommendation for
                  your accelerator track, and the confidence to go deeper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="section section--dark">
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: "var(--space-xl)" }}>
            Upcoming Workshop Dates
          </h2>
          <p
            className="tbd"
            style={{ fontSize: "1.125rem", marginBottom: "var(--space-xl)" }}
          >
            Dates announced soon — subscribe to be the first to know
          </p>
          <p className="muted" style={{ marginBottom: "var(--space-2xl)", lineHeight: 1.7 }}>
            Workshops are live and cohort-based. Small groups for real
            interaction.{" "}
            <span className="tbd">
              Schedule details (times, timezone) announced soon
            </span>
          </p>
          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            {paymentLink ? (
              <a
                href={paymentLink}
                className="button button--primary button--large"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register — $20
              </a>
            ) : (
              <span className="tbd">Registration link coming soon</span>
            )}
            <Link href="/quiz" className="button button--secondary button--large">
              Find Your Track First →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container container--narrow">
          <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
            Workshop FAQ
          </h2>
          <div className="faq-item">
            <h3 className="faq-question">Do I need to know how to code?</h3>
            <p className="faq-answer">
              No. The workshop is designed for everyone — coders and non-coders
              alike. Day 2 helps you figure out which accelerator track fits
              your background.
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">Is it live or pre-recorded?</h3>
            <p className="faq-answer">
              Live. You&apos;ll be in a small cohort with real-time interaction
              and hands-on exercises.
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">What do I need?</h3>
            <p className="faq-answer">
              A computer with internet access and a browser. That&apos;s it.
              We&apos;ll guide you through everything else.
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">Can I get a refund?</h3>
            <p className="faq-answer">
              <span className="tbd">Refund policy details announced soon</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
