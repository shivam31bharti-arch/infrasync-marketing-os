import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import IncludedFreeSection from "@/components/IncludedFreeSection";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import Reveal from "@/components/Reveal";
import MentorSoon from "@/components/MentorSoon";
import StickyCTA from "@/components/StickyCTA";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv(); // root .env (NEXT_PUBLIC_* not auto-loaded outside storefront/)

export default function HomePage() {
  const workshopLink = serverEnv("NEXT_PUBLIC_RAZORPAY_WORKSHOP_LINK") || null;
  const generalistLink = serverEnv("NEXT_PUBLIC_RAZORPAY_GENERALIST_LINK") || null;
  const engineerLink = serverEnv("NEXT_PUBLIC_RAZORPAY_ENGINEER_LINK") || null;

  return (
    <>
      {/* ACT 1 — Full-bleed hero */}
      <section className="hero-mega">
        <div className="hero-mega__bg" aria-hidden="true">
          {/* Decorative mood imagery only — never presented as students (claims policy) */}
          <img src="/images/hero-focus.webp" alt="" width={1600} height={900} />
        </div>
        <div className="hero-mega__content">
          <div className="container">
            <Reveal>
              <p className="eyebrow-num" style={{ marginBottom: "var(--space-lg)" }}>
                AI Education by SkillSync
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                className="display-xl"
                style={{ maxWidth: "820px", marginBottom: "var(--space-xl)" }}
              >
                Stop watching AI happen.
                <br />
                <span className="grad-text">Start building with it.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p
                style={{
                  fontSize: "1.25rem",
                  maxWidth: "560px",
                  marginBottom: "var(--space-xl)",
                  lineHeight: 1.7,
                  color: "var(--color-gray-light)",
                }}
              >
                Live, hands-on AI programs. Start with a 2-day weekend workshop
                for ₹1,999 — then accelerate into the Generalist or Engineer
                track. No theory slides. No fluff.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="chip-row" style={{ marginBottom: "var(--space-xl)" }}>
                <span className="chip chip--green">● Live online</span>
                <span className="chip">Sat + Sun · 10 AM–6 PM IST</span>
                <span className="chip">Next: Aug 29–30</span>
              </div>
            </Reveal>
            <Reveal delay={0.28}>
              <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
                <Link href="/workshop" className="button button--primary button--large">
                  Join the Workshop — ₹1,999 / $20
                </Link>
                <Link href="/quiz" className="button button--secondary button--large">
                  Find Your Track →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Fact blocks — every number is from offers.md */}
      <section className="section" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
        <div className="container">
          <Reveal>
            <div className="stat-blocks">
              <div className="stat-block">
                <div className="stat-block__value">2 days</div>
                <div className="stat-block__label">hands-on weekend workshop</div>
              </div>
              <div className="stat-block">
                <div className="stat-block__value">₹1,999</div>
                <div className="stat-block__label">entry price · $20 international</div>
              </div>
              <div className="stat-block">
                <div className="stat-block__value">Sep 15</div>
                <div className="stat-block__label">next accelerator cohort starts</div>
              </div>
              <div className="stat-block">
                <div className="stat-block__value">3 / 6 / 10</div>
                <div className="stat-block__label">months no-cost EMI (India)</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACT 2 — How it works */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <p className="eyebrow-num" style={{ marginBottom: "var(--space-md)" }}>
              01 · How it works
            </p>
            <h2 style={{ marginBottom: "var(--space-3xl)", maxWidth: "620px" }}>
              From curious to capable in three steps
            </h2>
          </Reveal>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3xl)",
              maxWidth: "640px",
            }}
          >
            <Reveal>
              <div className="step">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h3>Start with the Workshop</h3>
                  <p>
                    Two days, ₹1,999 India · $20 international. Hands-on AI
                    fundamentals and a real taste of both accelerator tracks —
                    you build something before day one ends.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="step">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h3>Find Your Track</h3>
                  <p>
                    Take the track-fit quiz. Your background, goals, and time
                    decide the recommendation — not a sales script.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h3>Accelerate</h3>
                  <p>
                    Join your cohort, ship real projects, and earn a verifiable
                    SkillSync certificate of completion.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ACT 3 — The Workshop offer */}
      <section className="section" id="workshop">
        <div className="container">
          <Reveal>
            <p className="eyebrow-num" style={{ marginBottom: "var(--space-md)" }}>
              02 · The starting point
            </p>
            <h2 style={{ marginBottom: "var(--space-3xl)", maxWidth: "620px" }}>
              One weekend. Real skills.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="offer-card">
              <div className="offer-card__body">
                <span className="track-badge">2-DAY AI WORKSHOP</span>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-xl)",
                    flexWrap: "wrap",
                    margin: "var(--space-lg) 0",
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
                <p className="muted" style={{ lineHeight: 1.7, marginBottom: "var(--space-lg)" }}>
                  Live online, Saturday + Sunday, 10:00 AM–6:00 PM IST. Hands-on
                  AI fundamentals on day one; explore both accelerator tracks on
                  day two. Recordings, notes, tool guides, prompt library, and a
                  verifiable participation certificate included.
                </p>
                <div className="chip-row" style={{ marginBottom: "var(--space-xl)" }}>
                  <span className="chip chip--green">Aug 29–30</span>
                  <span className="chip chip--green">Sep 5–6</span>
                  <span className="chip chip--green">Sep 12–13, 2026</span>
                </div>
                <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
                  {workshopLink ? (
                    <a
                      href={workshopLink}
                      className="button button--primary button--large"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register Now
                    </a>
                  ) : (
                    <Link href="/workshop" className="button button--primary button--large">
                      Register Now
                    </Link>
                  )}
                  <Link href="/workshop" className="button button--secondary">
                    Full details →
                  </Link>
                </div>
                <p
                  className="muted"
                  style={{ marginTop: "var(--space-lg)", fontSize: "0.8125rem", lineHeight: 1.6 }}
                >
                  Workshop bookings are <strong>non-refundable</strong>. By
                  registering you agree to receive session reminders by call,
                  email, and WhatsApp.
                </p>
              </div>
              <div className="offer-card__media" aria-hidden="true">
                {/* Decorative mood imagery only — never presented as students (claims policy) */}
                <img src="/images/workshop-live.webp" alt="" width={1600} height={900} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="glow-divider" />

      {/* ACT 4 — Generalist deep-dive */}
      <section className="section section--dark" id="ai-generalist">
        <div className="container">
          <Reveal>
            <p className="eyebrow-num" style={{ marginBottom: "var(--space-3xl)" }}>
              03 · Choose your path
            </p>
          </Reveal>
          <div className="track-section">
            <Reveal className="track-section__media">
              <div className="media-frame media-frame--tall">
                {/* Decorative mood imagery only — never presented as students (claims policy) */}
                <img src="/images/generalist-build.webp" alt="" width={1600} height={1067} />
                <span className="media-caption">No coding background needed</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="track-badge">NON-TECH FRIENDLY</span>
                <h2 style={{ margin: "var(--space-md) 0" }}>AI Generalist Accelerator</h2>
                <p className="muted" style={{ lineHeight: 1.7, marginBottom: "var(--space-lg)" }}>
                  For marketers, operators, designers, founders, freelancers —
                  anyone without an engineering degree who wants to build, not
                  just prompt.
                </p>
                <ul className="check-list" style={{ marginBottom: "var(--space-xl)" }}>
                  <li>AI fundamentals &amp; prompting</li>
                  <li>Vibe coding with AI builders</li>
                  <li>Automations without code</li>
                  <li>AI for content, marketing &amp; data</li>
                  <li>Build-your-own capstone</li>
                </ul>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-xl)",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  <div className="price-display">₹95,000</div>
                  <span className="muted">$1,200 international</span>
                </div>
                <div className="chip-row" style={{ marginBottom: "var(--space-xl)" }}>
                  <span className="chip">Cohort starts Sep 15</span>
                  <span className="chip">7:30–10:30 PM IST + weekend office hours</span>
                  <span className="chip">No-cost EMI 3 / 6 / 10 mo</span>
                  <span className="chip chip--green">4-week money-back</span>
                </div>
                <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
                  {generalistLink ? (
                    <a
                      href={generalistLink}
                      className="button button--primary button--large"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enroll — ₹95,000
                    </a>
                  ) : (
                    <span className="tbd">Enrollment opens soon</span>
                  )}
                  <Link href="/quiz" className="button button--secondary">
                    Is this my track? →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ACT 5 — Engineer deep-dive */}
      <section className="section" id="ai-engineer">
        <div className="container">
          <div className="track-section track-section--flip">
            <Reveal className="track-section__media">
              <div className="media-frame media-frame--tall">
                {/* Decorative mood imagery only — never presented as students (claims policy) */}
                <img src="/images/engineer-code.webp" alt="" width={1600} height={1067} />
                <span className="media-caption">Python required</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <span className="prereq-badge">⚡ PYTHON REQUIRED</span>
                <h2 style={{ margin: "var(--space-md) 0" }}>AI Engineer Accelerator</h2>
                <p className="muted" style={{ lineHeight: 1.7, marginBottom: "var(--space-lg)" }}>
                  For developers with basic-to-intermediate Python. Learn to
                  engineer with AI — and to ship faster than you thought you
                  could.
                </p>
                <ul className="check-list" style={{ marginBottom: "var(--space-xl)" }}>
                  <li>AI-assisted dev workflows</li>
                  <li>Agents &amp; tool use</li>
                  <li>RAG fundamentals</li>
                  <li>Testing &amp; shipping with AI</li>
                  <li>Engineering performance + time-management systems · capstone</li>
                </ul>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-xl)",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    marginBottom: "var(--space-md)",
                  }}
                >
                  <div className="price-display">₹95,000</div>
                  <span className="muted">$1,200 international</span>
                </div>
                <div className="chip-row" style={{ marginBottom: "var(--space-xl)" }}>
                  <span className="chip">Cohort starts Sep 15</span>
                  <span className="chip">7:30–10:30 PM IST + weekend office hours</span>
                  <span className="chip">No-cost EMI 3 / 6 / 10 mo</span>
                  <span className="chip chip--green">4-week money-back</span>
                </div>
                <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
                  {engineerLink ? (
                    <a
                      href={engineerLink}
                      className="button button--primary button--large"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enroll — ₹95,000
                    </a>
                  ) : (
                    <span className="tbd">Enrollment opens soon</span>
                  )}
                  <Link href="/quiz" className="button button--secondary">
                    Am I ready? →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="glow-divider" />

      {/* ACT 6 — What's included */}
      <IncludedFreeSection />

      {/* Mentors */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <MentorSoon />
          </Reveal>
        </div>
      </section>

      {/* Who is this for */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 style={{ textAlign: "center", marginBottom: "var(--space-md)" }}>
              Who is this for?
            </h2>
            <p
              className="muted"
              style={{
                textAlign: "center",
                maxWidth: "560px",
                margin: "0 auto var(--space-2xl)",
                lineHeight: 1.7,
              }}
            >
              One entry point, two tracks — pick yours after the workshop.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="audience-grid">
              <span className="chip">Marketers &amp; content creators</span>
              <span className="chip">Founders &amp; entrepreneurs</span>
              <span className="chip">Working professionals</span>
              <span className="chip">Freelancers &amp; consultants</span>
              <span className="chip">Students &amp; career switchers</span>
              <span className="chip chip--amber">Developers → Engineer track (Python)</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reviews (illustrative — caption required by claims policy) */}
      <ReviewsMarquee />

      {/* FAQ */}
      <section className="section section--dark" id="faq">
        <div className="container container--narrow">
          <Reveal>
            <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
              Frequently Asked Questions
            </h2>
          </Reveal>
          <FaqAccordion
            items={[
              {
                question: "What is SkillSync?",
                answer: (
                  <p>
                    SkillSync is an AI education company. We run live,
                    cohort-based programs that teach people how to work with AI —
                    whether you&apos;re a non-tech professional or a developer
                    with Python experience.
                  </p>
                ),
              },
              {
                question: "Do I need coding experience for the workshop?",
                answer: (
                  <p>
                    No. The 2-Day AI Workshop is designed for everyone — it
                    covers fundamentals and gives you a taste of both the
                    Generalist and Engineer tracks before you choose.
                  </p>
                ),
              },
              {
                question: "What's the difference between the two accelerators?",
                answer: (
                  <p>
                    The <strong>AI Generalist</strong> track is for non-tech
                    professionals — learn vibe coding and AI tools without an
                    engineering background. The <strong>AI Engineer</strong>{" "}
                    track requires Python and teaches AI-augmented engineering,
                    performance, and productivity.
                  </p>
                ),
              },
              {
                question: "Do I get a certificate?",
                answer: (
                  <p>
                    Yes. Upon completing your accelerator program, you receive a
                    verifiable SkillSync certificate of completion with a unique
                    code and public verification page.
                  </p>
                ),
              },
              {
                question: "Is EMI available for the accelerators?",
                answer: (
                  <p>
                    Yes — India enrollments can use <strong>no-cost EMI</strong>{" "}
                    over 3, 6, or 10 months via Razorpay (subject to bank
                    approval).
                  </p>
                ),
              },
              {
                question: "What's your refund policy?",
                answer: (
                  <p>
                    The ₹1,999 workshop is non-refundable — stated clearly before
                    you pay. Accelerators include a{" "}
                    <strong>4-week money-back window</strong>: full refund if you
                    cancel within 4 weeks of your cohort start. See our{" "}
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

      {/* Final CTA band */}
      <section className="img-band">
        <div className="img-band__bg" aria-hidden="true">
          {/* Decorative mood imagery only — never presented as students (claims policy) */}
          <img src="/images/community-cohort.webp" alt="" width={1600} height={900} />
        </div>
        <div className="img-band__content">
          <div className="container" style={{ textAlign: "center" }}>
            <Reveal>
              <h2 style={{ marginBottom: "var(--space-md)" }}>
                Start this weekend.
              </h2>
              <p
                className="muted"
                style={{
                  fontSize: "1.125rem",
                  maxWidth: "480px",
                  margin: "0 auto var(--space-xl)",
                }}
              >
                Two days. ₹1,999. Everything you need to stop watching and start
                building.
              </p>
              <Link href="/workshop" className="button button--primary button--large">
                Join the 2-Day AI Workshop
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <StickyCTA
        amount="₹1,999 / $20"
        label="2-Day AI Workshop · Sat + Sun, live online"
        href="/workshop"
        cta="Register"
      />
    </>
  );
}
