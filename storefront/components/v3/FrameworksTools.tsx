/**
 * FrameworksTools — GrowthSchool-style twin detail lists + skill-stack strip.
 * All items derive from agent/offers.md curricula. No outcome claims.
 */
const FRAMEWORKS = [
  "The 4-step prompt formula",
  "Vibe coding with AI builders",
  "Automations without code",
  "AI for content & marketing",
  "Data analysis, demystified",
  "Agents & tool use",
  "RAG fundamentals",
  "Testing & shipping with AI",
  "Engineering time management",
];

const TOOL_SKILLS = [
  "Draft replies to your email",
  "Summarize anything on the web",
  "Turn docs into insights",
  "Create decks in minutes",
  "Build a custom GPT bot",
  "Automate weekly reports",
  "Ship a site with AI builders",
  "Research at 10x depth",
  "Your own prompt library",
];

const STACK = [
  "ChatGPT", "Claude", "Perplexity", "NotebookLM", "Gemini", "Make",
  "Cursor", "Grok", "Google AI Studio", "Suno", "Runway",
];

export default function FrameworksTools() {
  return (
    <section className="section section--cream-alt" aria-label="What you will learn">
      <div className="container">
        <p className="label" style={{ color: "var(--color-electric)", marginBottom: "var(--space-md)", textAlign: "center" }}>
          What you&apos;ll learn
        </p>
        <h2 style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}>
          Frameworks in one hand.
          <br />
          Tools in the other.
        </h2>

        <div className="grid grid--2" style={{ gap: "var(--space-2xl)", alignItems: "start" }}>
          <div className="ft-card">
            <p className="label" style={{ marginBottom: "var(--space-lg)" }}>Frameworks</p>
            <ul className="ft-list">
              {FRAMEWORKS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="ft-card">
            <p className="label" style={{ marginBottom: "var(--space-lg)" }}>With AI you&apos;ll</p>
            <ul className="ft-list">
              {TOOL_SKILLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="stack-strip" aria-label="Tools covered">
          {STACK.map((s) => (
            <span key={s} className="stack-chip mono">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
