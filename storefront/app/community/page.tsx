import type { Metadata } from "next";
import CommunityForm from "@/components/v3/CommunityForm";
import CommunityScene from "@/components/v3/CommunityScene";

export const metadata: Metadata = {
  title: "Free AI Community on WhatsApp",
  description:
    "Skip the noise, get the signal — AI updates, tools, and live session invites from SkillSync, straight to WhatsApp. Free.",
};


const PERKS = [
  { title: "AI updates", sub: "What actually matters, filtered." },
  { title: "Curated resources", sub: "Handpicked tools, guides, prompts." },
  { title: "Session invites", sub: "Weekend masterclasses, first." },
  { title: "Free tools", sub: "Templates and setups from our packs." },
];

export default function CommunityPage() {
  return (
    <main className="community-page">
      <div className="community-scene" aria-hidden="true">
        <CommunityScene />
      </div>
      <div className="community-glow" aria-hidden="true" />

      <section className="section community-grid">
        <div className="community-intro">
          <p className="label" style={{ color: "var(--color-electric)", marginBottom: "var(--space-md)" }}>
            Free · WhatsApp community
          </p>
          <h1 style={{ marginBottom: "var(--space-md)" }}>
            Staying ahead,
            <br />
            <span className="fluid-text">together.</span>
          </h1>
          <p className="muted" style={{ fontSize: "1.125rem", lineHeight: 1.5, maxWidth: "38ch", marginBottom: "var(--space-2xl)" }}>
            Skip the noise. Get the signal. AI updates, tools, and live session
            invites — straight to WhatsApp, from SkillSync.
          </p>
          <div className="community-perks">
            {PERKS.map((p) => (
              <div key={p.title} className="community-perk">
                <span className="community-perk__dot" aria-hidden="true" />
                <div>
                  <strong>{p.title}</strong>
                  <p className="muted" style={{ fontSize: "0.875rem" }}>{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <CommunityForm />
        </div>
      </section>
    </main>
  );
}
