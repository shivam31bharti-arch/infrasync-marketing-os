// "Meet your mentors" shell — offers.md keeps instructor names as an open
// item; the site says "SkillSync mentor team" until real names are confirmed.
export default function MentorSoon() {
  return (
    <div className="mentor-card">
      <div className="mentor-card__avatar" aria-hidden="true" />
      <div>
        <p className="label" style={{ marginBottom: "var(--space-sm)" }}>
          Meet your mentors
        </p>
        <h3 style={{ marginBottom: "var(--space-sm)" }}>SkillSync mentor team</h3>
        <p className="muted" style={{ marginBottom: "var(--space-md)", lineHeight: 1.7 }}>
          Every session is taught live by the SkillSync mentor team —
          practitioners who build with AI daily and teach hands-on, not from
          slides.
        </p>
        <span className="tbd">Instructor profiles announced soon</span>
      </div>
    </div>
  );
}
