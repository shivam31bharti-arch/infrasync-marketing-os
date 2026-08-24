import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="section section--dark" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <div className="container">
          <p className="label" style={{ marginBottom: "var(--space-lg)" }}>
            AI Education by Outskill
          </p>
          <h1 className="display-xl" style={{ maxWidth: "800px", marginBottom: "var(--space-xl)" }}>
            Learn to build with AI.{" "}
            <span className="text-electric">For real.</span>
          </h1>
          <p className="muted" style={{ fontSize: "1.25rem", maxWidth: "560px", marginBottom: "var(--space-2xl)", lineHeight: 1.7 }}>
            Start with a hands-on $20 workshop, then accelerate into the track
            that fits you — Generalist or Engineer. Live, cohort-based, no fluff.
          </p>
          <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}>
            <Link href="/workshop" className="button button--primary button--large">
              Join the Workshop — $20
            </Link>
            <Link href="/quiz" className="button button--secondary button--large">
              Find Your Track →
            </Link>
          </div>
        </div>
      </section>

      {/* Two-Track Split */}
      <section className="section">
        <div className="container">
          <p className="label" style={{ marginBottom: "var(--space-md)", textAlign: "center" }}>
            Choose your path
          </p>
          <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
            Two accelerators. One goal.
          </h2>
          <div className="grid grid--2">
            {/* Generalist */}
            <div className="track-card track-card--generalist">
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
              <p className="price-note">₹95,000 in India</p>
              <div style={{ marginTop: "var(--space-xl)" }}>
                <Link href="/programs/ai-generalist" className="button button--secondary">
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Engineer */}
            <div className="track-card track-card--engineer">
              <span className="prereq-badge">⚡ PYTHON REQUIRED</span>
              <h3 style={{ marginBottom: "var(--space-md)" }}>
                AI Engineer Accelerator
              </h3>
              <p className="muted" style={{ marginBottom: "var(--space-xl)", lineHeight: 1.7 }}>
                For developers with basic-to-intermediate Python. AI-augmented
                engineering, performance, productivity, and time management — level
                up how you build.
              </p>
              <div className="price-display">$1,200</div>
              <p className="price-note">₹95,000 in India</p>
              <div style={{ marginTop: "var(--space-xl)" }}>
                <Link href="/programs/ai-engineer" className="button button--secondary">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section section--dark">
        <div className="container">
          <p className="label" style={{ marginBottom: "var(--space-md)", textAlign: "center" }}>
            How it works
          </p>
          <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
            From curious to capable in three steps
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3xl)", maxWidth: "640px", margin: "0 auto" }}>
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Start with the Workshop</h3>
                <p>
                  Two days, $20. Hands-on AI fundamentals — a taste of both
                  accelerator tracks. No commitment, real skills.
                </p>
              </div>
            </div>
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
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Accelerate</h3>
                <p>
                  Join your cohort, build real projects, and earn your Outskill
                  certificate of completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: "var(--space-md)" }}>
            The 2-Day AI Workshop
          </h2>
          <p className="muted" style={{ fontSize: "1.125rem", maxWidth: "520px", margin: "0 auto var(--space-lg)" }}>
            Your entry point into the InfraSync ecosystem. Two days of hands-on
            AI. Just $20 to get started.
          </p>
          <p className="tbd" style={{ marginBottom: "var(--space-xl)" }}>
            Next workshop dates announced soon
          </p>
          <Link href="/workshop" className="button button--primary button--large">
            Learn More & Register
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--dark">
        <div className="container container--narrow">
          <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
            Frequently Asked Questions
          </h2>
          <div>
            <div className="faq-item">
              <h3 className="faq-question">What is InfraSync?</h3>
              <p className="faq-answer">
                InfraSync is an AI education platform by Outskill. We run
                live, cohort-based programs that teach people how to work
                with AI — whether you&apos;re a non-tech professional or a
                developer with Python experience.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">
                Do I need coding experience for the workshop?
              </h3>
              <p className="faq-answer">
                No. The 2-Day AI Workshop is designed for everyone — it
                covers fundamentals and gives you a taste of both the
                Generalist and Engineer tracks before you choose.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">
                What&apos;s the difference between the two accelerators?
              </h3>
              <p className="faq-answer">
                The <strong>AI Generalist</strong> track is for non-tech
                professionals — learn vibe coding and AI tools without an
                engineering background. The <strong>AI Engineer</strong>{" "}
                track requires Python and teaches AI-augmented engineering,
                performance, and productivity.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Do I get a certificate?</h3>
              <p className="faq-answer">
                Yes. Upon completing your accelerator program, you receive
                a verifiable Outskill certificate of completion with a
                unique code and public verification page.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">
                What&apos;s your refund policy?
              </h3>
              <p className="faq-answer">
                <span className="tbd">
                  Refund policy details announced soon
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
