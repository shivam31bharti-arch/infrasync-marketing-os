import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import CurriculumModule from "@/components/CurriculumModule";
import IncludedFreeSection from "@/components/IncludedFreeSection";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import Reveal from "@/components/Reveal";
import StickyCTA from "@/components/StickyCTA";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv(); // root .env (NEXT_PUBLIC_* not auto-loaded outside storefront/)

export const metadata: Metadata = {
  title: "2-Day AI Workshop — $20 / ₹1,999 — InfraSync",
  description:
    "Two days of hands-on AI fundamentals. No prior coding needed. A real taste of both accelerator tracks — before you commit. $20 international / ₹1,999 India.",
};

export default function WorkshopPage() {
  const paymentLink = serverEnv("NEXT_PUBLIC_RAZORPAY_WORKSHOP_LINK") || null;

  return (
    <>
      {/* Hero */}
      <section className="hero-v3 section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <Reveal>
                <p className="label" style={{ marginBottom: "var(--space-md)" }}>
                  The starting point
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 style={{ marginBottom: "var(--space-lg)" }}>2-Day AI Workshop</h1>
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
                  Two days of hands-on AI fundamentals. No prior coding needed.
                  A real taste of both accelerator tracks — before you commit.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-2xl)",
                    flexWrap: "wrap",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  <div>
                    <div className="price-display">₹1,999</div>
                    <p className="price-note">India</p>
                  </div>
                  <div>
                    <div className="price-display">$20</div>
                    <p className="price-note">International</p>
                  </div>
                </div>
                <p className="price-note" style={{ marginBottom: "var(--space-lg)" }}>
                  One-time payment. No hidden fees.
                </p>
              </Reveal>
              <Reveal delay={0.26}>
                <div className="chip-row" style={{ marginBottom: "var(--space-xl)" }}>
                  <span className="chip chip--green">Live online</span>
                  <span className="chip">Sat + Sun · 10:00 AM–6:00 PM IST</span>
                  <span className="chip">Aug 29–30</span>
                  <span className="chip">Sep 5–6</span>
                  <span className="chip">Sep 12–13</span>
                </div>
              </Reveal>
              <Reveal delay={0.32}>
                {paymentLink ? (
                  <a
                    href={paymentLink}
                    className="button button--primary button--large"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now — ₹1,999 / $20
                  </a>
                ) : (
                  <span className="tbd">
                    Registration opens soon — payment link being configured
                  </span>
                )}
                <p
                  className="muted"
                  style={{
                    marginTop: "var(--space-lg)",
                    fontSize: "0.875rem",
                    maxWidth: "540px",
                    lineHeight: 1.7,
                  }}
                >
                  Please note: workshop bookings are <strong>non-refundable</strong>.
                  By registering, you agree to receive session reminders by call,
                  email, and WhatsApp.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15} y={44}>
              <div className="media-frame media-frame--tall">
                {/* Decorative mood imagery only — never presented as students (claims policy) */}
                <img src="/images/workshop-live.webp" alt="" width={1600} height={900} />
                <span className="media-caption">Live · weekend · hands-on</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <p className="label" style={{ marginBottom: "var(--space-md)" }}>
              What&apos;s covered
            </p>
            <h2 style={{ marginBottom: "var(--space-3xl)" }}>
              Two days. Real skills. Zero fluff.
            </h2>
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
              title="Day 1: AI Fundamentals"
              description="Understand how AI works today. Hands-on with the tools that matter — not theory slides. You'll build something real before the day is over."
            />
            <CurriculumModule
              index={1}
              title="Day 2: Choose Your Path"
              description="Explore both accelerator tracks — Generalist and Engineer. Work through sample projects from each. Find where you fit."
            />
            <CurriculumModule
              index={2}
              title="Outcome: Clear Next Steps"
              description="Walk away with real skills, a clear recommendation for your accelerator track, and the confidence to go deeper."
            />
          </div>
        </div>
      </section>

      {/* Included Free */}
      <IncludedFreeSection />

      {/* Schedule */}
      <section className="section section--dark">
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 style={{ marginBottom: "var(--space-xl)" }}>Upcoming Workshop Dates</h2>
            <p style={{ fontSize: "1.125rem", marginBottom: "var(--space-lg)" }}>
              Every weekend · <strong>Saturday + Sunday, 10:00 AM–6:00 PM IST</strong> · live online
            </p>
            <div
              className="chip-row"
              style={{ justifyContent: "center", marginBottom: "var(--space-xl)" }}
            >
              {["Aug 29–30, 2026", "Sep 5–6, 2026", "Sep 12–13, 2026"].map((d) => (
                <span key={d} className="chip chip--green" style={{ fontSize: "0.9375rem" }}>
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
            <div
              style={{
                display: "flex",
                gap: "var(--space-md)",
                justifyContent: "center",
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
                  Register — ₹1,999 / $20
                </a>
              ) : (
                <span className="tbd">Registration link coming soon</span>
              )}
              <Link href="/quiz" className="button button--secondary button--large">
                Find Your Track First →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews (illustrative — caption required by claims policy) */}
      <ReviewsMarquee />

      {/* FAQ */}
      <section className="section">
        <div className="container container--narrow">
          <Reveal>
            <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
              Workshop FAQ
            </h2>
          </Reveal>
          <FaqAccordion
            items={[
              {
                question: "Do I need to know how to code?",
                answer: (
                  <p>
                    No. The workshop is designed for everyone — coders and non-coders
                    alike. Day 2 helps you figure out which accelerator track fits
                    your background.
                  </p>
                ),
              },
              {
                question: "Is it live or pre-recorded?",
                answer: (
                  <p>
                    Live. You&apos;ll be in a small cohort with real-time interaction
                    and hands-on exercises.
                  </p>
                ),
              },
              {
                question: "What do I need?",
                answer: (
                  <p>
                    A computer with internet access and a browser. That&apos;s it.
                    We&apos;ll guide you through everything else.
                  </p>
                ),
              },
              {
                question: "Will I get a reminder before my sessions?",
                answer: (
                  <p>
                    Yes. Registered students receive automated reminders before
                    sessions — a call from SkillSync&apos;s AI counselor, plus email
                    and WhatsApp. You consent to these reminders when you register.
                  </p>
                ),
              },
              {
                question: "Can I get a refund?",
                answer: (
                  <p>
                    The workshop is <strong>non-refundable</strong> — and we state
                    that clearly before you pay. Accelerator programs are different:
                    they include a 4-week money-back window from cohort start. See
                    the{" "}
                    <Link
                      href="/policies/refund"
                      style={{ color: "var(--color-electric)", textDecoration: "underline" }}
                    >
                      Refund Policy
                    </Link>
                    .
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {paymentLink ? (
        <StickyCTA
          amount="₹1,999 / $20"
          label="2-Day AI Workshop · non-refundable · Sat + Sun live"
          href={paymentLink}
          cta="Register now"
          external
        />
      ) : null}
    </>
  );
}
