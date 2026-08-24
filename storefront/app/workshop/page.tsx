import type { Metadata } from "next";
import Link from "next/link";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv(); // root .env (NEXT_PUBLIC_* not auto-loaded outside storefront/)

export const metadata: Metadata = {
  title: "2-Day AI Workshop — $20 international · ₹1,999 India",
  description:
    "Two days of hands-on AI fundamentals. A taste of both the Generalist and Engineer accelerators. $20 international · ₹1,999 India.",
};

export default function WorkshopPage() {
  const paymentLink =
    serverEnv("NEXT_PUBLIC_RAZORPAY_WORKSHOP_LINK") || null;

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
          <div
            style={{
              display: "flex",
              gap: "var(--space-2xl)",
              flexWrap: "wrap",
              marginBottom: "var(--space-sm)",
            }}
          >
            <div>
              <div className="price-display">$20</div>
              <p className="price-note">International</p>
            </div>
            <div>
              <div className="price-display">₹1,999</div>
              <p className="price-note">India</p>
            </div>
          </div>
          <p className="price-note" style={{ marginBottom: "var(--space-lg)" }}>
            One-time payment — $20 international · ₹1,999 India. No hidden fees.
          </p>
          <p style={{ marginBottom: "var(--space-xs)", fontWeight: 600 }}>
            Live online · Saturday + Sunday, 2:00–8:00 PM IST (6 hrs/day)
          </p>
          <p className="muted" style={{ marginBottom: "var(--space-2xl)" }}>
            Upcoming: Aug 29–30 · Sep 5–6 · Sep 12–13, 2026
          </p>
          {paymentLink ? (
            <a
              href={paymentLink}
              className="button button--primary button--large"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now — $20 / ₹1,999
            </a>
          ) : (
            <span className="tbd">
              Registration opens soon — payment link being configured
            </span>
          )}
          <p
            className="muted"
            style={{ marginTop: "var(--space-lg)", fontSize: "0.875rem", maxWidth: "560px" }}
          >
            Please note: workshop bookings are <strong>non-refundable</strong>.
            By registering, you agree to receive session reminders by call,
            email, and WhatsApp.
          </p>
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
          <p style={{ fontSize: "1.125rem", marginBottom: "var(--space-lg)" }}>
            Every weekend · <strong>Saturday + Sunday, 2:00–8:00 PM IST</strong> · live online
          </p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-md)",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "var(--space-xl)",
            }}
          >
            {["Aug 29–30, 2026", "Sep 5–6, 2026", "Sep 12–13, 2026"].map((d) => (
              <span key={d} className="track-badge" style={{ fontSize: "0.9375rem" }}>
                {d}
              </span>
            ))}
          </div>
          <p className="muted" style={{ marginBottom: "var(--space-2xl)", lineHeight: 1.7 }}>
            Workshops are live and cohort-based. Small groups for real
            interaction. Registered students receive automated session
            reminders — by call from SkillSync&apos;s AI counselor, plus email
            and WhatsApp.
          </p>
          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            {paymentLink ? (
              <a
                href={paymentLink}
                className="button button--primary button--large"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register — $20 / ₹1,999
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
            <h3 className="faq-question">Will I get a reminder before my sessions?</h3>
            <p className="faq-answer">
              Yes. Registered students receive automated reminders before
              sessions — a call from SkillSync&apos;s AI counselor, plus email
              and WhatsApp. You consent to these reminders when you register.
            </p>
          </div>
          <div className="faq-item">
            <h3 className="faq-question">Can I get a refund?</h3>
            <p className="faq-answer">
              The workshop is <strong>non-refundable</strong> — and we state
              that clearly before you pay. Accelerator programs are different:
              they include a 4-week money-back window from cohort start. See
              the{" "}
              <Link href="/policies/refund" style={{ color: "var(--color-electric)", textDecoration: "underline" }}>
                Refund Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
