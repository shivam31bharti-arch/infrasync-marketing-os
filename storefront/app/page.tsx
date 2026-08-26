import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import IncludedFreeSection from "@/components/IncludedFreeSection";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import Reveal from "@/components/Reveal";
import MentorSoon from "@/components/MentorSoon";
import StickyCTA from "@/components/StickyCTA";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-v3 section">
        <div className="container">
          <div className="hero-grid">
            <div>
              <Reveal>
                <p className="label" style={{ marginBottom: "var(--space-lg)" }}>
                  AI Education by SkillSync
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="display-xl" style={{ marginBottom: "var(--space-xl)" }}>
                  Learn to build with AI.{" "}
                  <span className="text-electric">For real.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p
                  className="muted"
                  style={{
                    fontSize: "1.2rem",
                    maxWidth: "540px",
                    marginBottom: "var(--space-xl)",
                    lineHeight: 1.7,
                  }}
                >
                  Start with a hands-on weekend workshop, then accelerate into
                  the track that fits you: Generalist or Engineer. Live,
                  cohort-based, no fluff.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="chip-row" style={{ marginBottom: "var(--space-xl)" }}>
                  <span className="chip chip--green">Live online</span>
                  <span className="chip">Sat + Sun</span>
                  <span className="chip">10 AM–6 PM IST</span>
                  <span className="chip">₹1,999 / $20 entry</span>
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
            <Reveal delay={0.15} y={44}>
              <div className="media-frame media-frame--tall">
                {/* Decorative mood imagery only — never presented as students (claims policy) */}
                <img src="/images/hero-focus.webp" alt="" width={1600} height={900} />
                <span className="media-caption">Hands-on · live · weekends</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Fact strip */}
      <section className="section" style={{ paddingTop: "var(--space-2xl)", paddingBottom: "var(--space-2xl)" }}>
        <div className="container">
          <Reveal>
            <div className="chip-row" style={{ justifyContent: "center" }}>
              <span className="chip">2 days, hands-on</span>
              <span className="chip">Next: Aug 29–30 · Sep 5–6 · Sep 12–13</span>
              <span className="chip">No-cost EMI on accelerators — 3 / 6 / 10 months</span>
              <span className="chip">Verifiable certificates</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <p className="label" style={{ marginBottom: "var(--space-md)", textAlign: "center" }}>
              How it works
            </p>
            <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
              From curious to capable in three steps
            </h2>
          </Reveal>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3xl)",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            <Reveal>
              <div className="step">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h3>Start with the Workshop</h3>
                  <p>
                    Two days, $20 international · ₹1,999 India. Hands-on AI
                    fundamentals — a taste of both accelerator tracks. No
                    commitment, real skills.
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
                    Take our track-fit quiz. Based on your background, goals, and
                    available time, we&apos;ll recommend the right accelerator for you.
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
                    Join your cohort, build real projects, and earn your SkillSync
                    certificate of completion.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Programs duo */}
      <section className="section">
        <div className="container">
          <Reveal>
            <p className="label" style={{ marginBottom: "var(--space-md)", textAlign: "center" }}>
              Choose your path
            </p>
            <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
              Two accelerators. One goal.
            </h2>
          </Reveal>
          <div className="grid grid--2">
            <Reveal>
              <div className="track-card track-card--generalist">
                <div
                  className="media-frame media-frame--wide"
                  style={{ marginBottom: "var(--space-xl)" }}
                >
                  <img src="/images/generalist-build.webp" alt="" width={1600} height={1067} />
                </div>
                <span className="track-badge">NON-TECH FRIENDLY</span>
                <h3 style={{ marginBottom: "var(--space-md)" }}>
                  AI Generalist Accelerator
                </h3>
                <p className="muted" style={{ marginBottom: "var(--space-xl)", lineHeight: 1.7 }}>
                  For professionals without a coding background. Learn vibe coding,
                  the modern AI tool stack, and how to build real things — no
                  engineering degree needed.
                </p>
                <div className="price-display">$1,200</div>
                <p className="price-note">₹95,000 in India · no-cost EMI 3 / 6 / 10 months</p>
                <div style={{ marginTop: "var(--space-xl)" }}>
                  <Link href="/programs/ai-generalist" className="button button--secondary">
                    Learn More →
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="track-card track-card--engineer">
                <div
                  className="media-frame media-frame--wide"
                  style={{ marginBottom: "var(--space-xl)" }}
                >
                  <img src="/images/engineer-code.webp" alt="" width={1600} height={1067} />
                </div>
                <span className="prereq-badge">⚡ PYTHON REQUIRED</span>
                <h3 style={{ margin: "var(--space-lg) 0 var(--space-md)" }}>
                  AI Engineer Accelerator
                </h3>
                <p className="muted" style={{ marginBottom: "var(--space-xl)", lineHeight: 1.7 }}>
                  For developers with basic-to-intermediate Python. AI-augmented
                  engineering, performance, productivity, and time management — level
                  up how you build.
                </p>
                <div className="price-display">$1,200</div>
                <p className="price-note">₹95,000 in India · no-cost EMI 3 / 6 / 10 months</p>
                <div style={{ marginTop: "var(--space-xl)" }}>
                  <Link href="/programs/ai-engineer" className="button button--secondary">
                    Learn More →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Curriculum peek */}
      <section className="section section--dark">
        <div className="container">
          <Reveal>
            <p className="label" style={{ marginBottom: "var(--space-md)", textAlign: "center" }}>
              What you&apos;ll learn
            </p>
            <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
              Curriculum, not theory slides
            </h2>
          </Reveal>
          <div className="grid grid--2" style={{ maxWidth: "980px", margin: "0 auto" }}>
            <Reveal>
              <div className="card card--dark" style={{ padding: "var(--space-xl)" }}>
                <span className="track-badge">AI GENERALIST</span>
                <ul className="check-list" style={{ marginTop: "var(--space-md)" }}>
                  <li>AI fundamentals &amp; prompting</li>
                  <li>Vibe coding with AI builders</li>
                  <li>Automations without code</li>
                  <li>AI for content, marketing &amp; data</li>
                  <li>Build-your-own capstone</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card card--dark" style={{ padding: "var(--space-xl)" }}>
                <span className="prereq-badge">AI ENGINEER · PYTHON REQUIRED</span>
                <ul className="check-list" style={{ marginTop: "var(--space-md)" }}>
                  <li>AI-assisted dev workflows</li>
                  <li>Agents &amp; tool use</li>
                  <li>RAG fundamentals</li>
                  <li>Testing &amp; shipping with AI</li>
                  <li>Engineering performance + time-management systems · capstone</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Included Free */}
      <IncludedFreeSection />

      {/* Mentors */}
      <section className="section">
        <div className="container">
          <Reveal>
            <MentorSoon />
          </Reveal>
        </div>
      </section>

      {/* Who is this for */}
      <section className="section section--dark">
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

      {/* Workshop CTA band */}
      <section className="img-band">
        <div className="img-band__bg" aria-hidden="true">
          {/* Decorative mood imagery only — never presented as students (claims policy) */}
          <img src="/images/community-cohort.webp" alt="" width={1600} height={900} />
        </div>
        <div className="img-band__content">
          <div className="container" style={{ textAlign: "center" }}>
            <Reveal>
              <h2 style={{ marginBottom: "var(--space-md)" }}>The 2-Day AI Workshop</h2>
              <p
                className="muted"
                style={{
                  fontSize: "1.125rem",
                  maxWidth: "520px",
                  margin: "0 auto var(--space-lg)",
                }}
              >
                Your entry point into the SkillSync ecosystem. Two days of
                hands-on AI. Just $20 international · ₹1,999 India to get started.
              </p>
              <p style={{ marginBottom: "var(--space-sm)", fontSize: "1.0625rem" }}>
                <strong>Live online · Saturday + Sunday, 10:00 AM–6:00 PM IST</strong>
              </p>
              <div
                className="chip-row"
                style={{ justifyContent: "center", marginBottom: "var(--space-xl)" }}
              >
                <span className="chip">Aug 29–30</span>
                <span className="chip">Sep 5–6</span>
                <span className="chip">Sep 12–13, 2026</span>
              </div>
              <Link href="/workshop" className="button button--primary button--large">
                Learn More &amp; Register
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reviews (illustrative — caption required by claims policy) */}
      <ReviewsMarquee />

      {/* FAQ */}
      <section className="section section--dark">
        <div className="container container--narrow">
          <Reveal>
            <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
              Frequently Asked Questions
            </h2>
          </Reveal>
          <FaqAccordion
            items={[
              {
                question: "What is InfraSync?",
                answer: (
                  <p>
                    InfraSync is an AI education platform by SkillSync. We run
                    live, cohort-based programs that teach people how to work
                    with AI — whether you&apos;re a non-tech professional or a
                    developer with Python experience.
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
                    Yes. Upon completing your accelerator program, you receive
                    a verifiable SkillSync certificate of completion with a
                    unique code and public verification page.
                  </p>
                ),
              },
              {
                question: "Is EMI available for the accelerators?",
                answer: (
                  <p>
                    Yes — India enrollments can use <strong>no-cost EMI</strong> over{" "}
                    3, 6, or 10 months via Razorpay (subject to bank approval).
                  </p>
                ),
              },
              {
                question: "What's your refund policy?",
                answer: (
                  <p>
                    The $20 workshop is non-refundable — stated clearly before you
                    pay. Accelerators include a{" "}
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

      <StickyCTA
        amount="₹1,999 / $20"
        label="2-Day AI Workshop · Sat + Sun, live online"
        href="/workshop"
        cta="Register"
      />
    </>
  );
}
