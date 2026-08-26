import React from "react";

/* Clean 24px line icons — ink strokes, one blue accent each. No emojis. */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const B = { ...S, stroke: "var(--color-electric)" } as const;

const icons = {
  play: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" {...S} />
      <path d="M10 9.2v5.6L14.8 12z" {...B} fill="var(--color-electric)" strokeWidth="1" />
    </svg>
  ),
  folder: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 7.5v10a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5h-7l-2-2.5H5a1.5 1.5 0 0 0-1.5 1.5z" {...S} />
      <path d="M8.5 13.5l2.2 2.2 4.6-4.6" {...B} />
    </svg>
  ),
  sliders: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" {...S} />
      <circle cx="9" cy="7" r="2" {...B} fill="var(--color-cream-bright)" />
      <circle cx="15" cy="12" r="2" {...B} fill="var(--color-cream-bright)" />
      <circle cx="7" cy="17" r="2" {...B} fill="var(--color-cream-bright)" />
    </svg>
  ),
  layers: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3.5 20 8l-8 4.5L4 8z" {...B} />
      <path d="M4 12.5l8 4.5 8-4.5M4 16.5 12 21l8-4.5" {...S} />
    </svg>
  ),
  badge: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9.5" r="5.5" {...S} />
      <path d="M9.5 14.5 8 21l4-2 4 2-1.5-6.5" {...S} />
      <path d="M10 9.5l1.4 1.4 2.8-2.8" {...B} />
    </svg>
  ),
  bell: (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z" {...S} />
      <path d="M10.5 19a1.8 1.8 0 0 0 3 0" {...B} />
    </svg>
  ),
};

const items = [
  { title: "Session recordings", description: "Every session, recorded. Yours by 7 PM.", icon: icons.play },
  { title: "Notes & tools pack", description: "Google Drive access, locked to your email.", icon: icons.folder },
  { title: "Tool setup guides", description: "ChatGPT, Claude, Perplexity, Make & more.", icon: icons.sliders },
  { title: "Prompt library", description: "Tested prompts you'll actually reuse.", icon: icons.layers },
  { title: "Verified certificate", description: "With a public verification link.", icon: icons.badge },
  { title: "Reminder concierge", description: "Call, email & WhatsApp — never miss a class.", icon: icons.bell },
];

export default function IncludedFreeSection() {
  return (
    <section className="section">
      <div className="container">
        <p className="label" style={{ color: "var(--color-electric)", marginBottom: "var(--space-md)", textAlign: "center" }}>
          Included with every seat
        </p>
        <h2 style={{ textAlign: "center", marginBottom: "var(--space-lg)" }}>
          Everything you need, included
        </h2>
        <p className="muted" style={{ textAlign: "center", maxWidth: "480px", margin: "0 auto var(--space-3xl)", fontSize: "1.0625rem", lineHeight: 1.5 }}>
          No inflated &ldquo;worth ₹X&rdquo; bundles. Just the essentials, delivered automatically.
        </p>

        <div className="feature-grid">
          {items.map((item) => (
            <div
              key={item.title}
              className="card"
              style={{
                background: "var(--color-cream-bright)",
                border: "1px solid rgba(35, 35, 35, 0.12)",
                borderRadius: "var(--radius-xl)",
              }}
            >
              <div className="card-body" style={{ padding: "var(--space-xl)" }}>
                <div style={{ color: "var(--color-ink)", marginBottom: "var(--space-md)" }}>{item.icon}</div>
                <h3 style={{ marginBottom: "var(--space-xs)", fontSize: "1.0625rem", color: "var(--color-ink)" }}>
                  {item.title}
                </h3>
                <p className="muted" style={{ lineHeight: 1.5, fontSize: "0.9375rem" }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
