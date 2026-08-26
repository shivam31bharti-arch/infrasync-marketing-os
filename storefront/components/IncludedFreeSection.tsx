import React from "react";

export default function IncludedFreeSection() {
  const items = [
    {
      title: "Session Recordings",
      description: "Full video recordings of every live session, available by 7 PM the same day.",
      icon: "🎥"
    },
    {
      title: "Notes & Tools Pack",
      description: "Direct Google Drive access granted securely to your registered email address.",
      icon: "📂"
    },
    {
      title: "AI Tool Setup Guides",
      description: "Step-by-step guides for ChatGPT, Claude, Perplexity, NotebookLM, Make, and more.",
      icon: "⚙️"
    },
    {
      title: "Prompt Library",
      description: "Our curated repository of tested prompts for daily engineering and general tasks.",
      icon: "📚"
    },
    {
      title: "Participation Certificate",
      description: "A unique, publicly verifiable certificate issued automatically upon completion.",
      icon: "📜"
    },
    {
      title: "Session Reminder Concierge",
      description: "Consent-based reminders via AI call, email, and WhatsApp so you never miss a class.",
      icon: "🤖"
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <p className="label" style={{ marginBottom: "var(--space-md)", textAlign: "center" }}>
          The Delivery Pipeline
        </p>
        <h2 style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
          Included free with your seat
        </h2>
        <p className="muted" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto var(--space-3xl)", fontSize: "1.125rem", lineHeight: 1.7 }}>
          No fake "worth ₹X" claims. Just the exact resources you need to succeed, delivered automatically to your inbox.
        </p>
        
        <div className="feature-grid">
          {items.map((item, idx) => (
            <div key={idx} className="card card--dark">
              <div className="card-body">
                <div style={{ fontSize: "2rem", marginBottom: "var(--space-md)" }}>{item.icon}</div>
                <h3 style={{ marginBottom: "var(--space-sm)", fontSize: "1.125rem" }}>{item.title}</h3>
                <p className="muted" style={{ lineHeight: 1.6, fontSize: "0.9375rem" }}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
