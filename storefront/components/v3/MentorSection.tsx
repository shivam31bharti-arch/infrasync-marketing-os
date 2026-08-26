/**
 * MentorSection — GrowthSchool-pattern mentor block, honest edition.
 * offers.md: instructor names are an open item → "SkillSync mentor team"
 * until real, named mentors exist. No invented bios, stats, or credentials.
 */
export default function MentorSection() {
  return (
    <section className="section section--dark" aria-label="Your mentors">
      <div className="container" style={{ maxWidth: 900 }}>
        <p className="label" style={{ color: "var(--color-electric)", marginBottom: "var(--space-md)", textAlign: "center" }}>
          Your mentors
        </p>
        <h2 style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
          Taught by people who build with AI daily
        </h2>
        <div className="mentor-card">
          <div className="mentor-avatar" aria-hidden="true">S</div>
          <div>
            <h3 style={{ marginBottom: "var(--space-sm)" }}>The SkillSync mentor team</h3>
            <p className="muted" style={{ lineHeight: 1.6, marginBottom: "var(--space-md)" }}>
              Practitioners, not presenters. Every session is taught live by
              people who ship with these tools every day — the same stack, the
              same prompts, the same workflows you&apos;ll take home.
            </p>
            <p className="muted" style={{ lineHeight: 1.6, fontSize: "0.9375rem" }}>
              Live cohorts, small groups, real questions answered in real time.
              Named mentor profiles publish with our first cohorts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
