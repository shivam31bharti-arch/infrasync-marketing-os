"use client";

import { motion } from "motion/react";

/**
 * PipelineDemo — student-language, four steps, gradient panel.
 * Chips light up in sequence with a soft blue gradient wash, looping.
 * Everything shown is our real, running fulfilment system.
 */
const STEPS = [
  { label: "JOIN A PROGRAM", sub: "one-click checkout" },
  { label: "GET CERTIFIED", sub: "publicly verifiable" },
  { label: "CONTENT UNLOCKED", sub: "recordings · notes · tools" },
  { label: "IN YOUR INBOX BY 8 PM", sub: "same day, every day" },
];

const CYCLE = 6.4;

export default function PipelineDemo() {
  return (
    <section className="section" aria-label="What happens after you join">
      <div className="container--narrow" style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
        <p className="label" style={{ color: "var(--color-electric)", marginBottom: "var(--space-md)" }}>
          After you join
        </p>
        <h2>Join once. The rest is automatic.</h2>
      </div>

      <div className="container" style={{ maxWidth: 860 }}>
        <div
          className="pipeline-panel"
          style={{ background: "linear-gradient(165deg, #FEFDF5 0%, #EEF3FF 70%, #E3EBFF 100%)" }}
          role="img"
          aria-label="Animated diagram: joining triggers your certificate, content access, and the evening delivery email"
        >
          {STEPS.map((step, i) => (
            <div key={step.label} className="pipeline-row">
              <motion.div
                className="pipeline-chip"
                style={{ position: "relative", overflow: "hidden" }}
                animate={{
                  borderColor: ["rgba(35,35,35,0.12)", "rgba(11,79,255,0.9)", "rgba(35,35,35,0.12)"],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: CYCLE,
                  times: [i / STEPS.length, (i + 0.5) / STEPS.length, (i + 1) / STEPS.length],
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, rgba(11,79,255,0.12) 0%, rgba(79,124,255,0.05) 100%)",
                    pointerEvents: "none",
                  }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: CYCLE,
                    times: [i / STEPS.length, (i + 0.5) / STEPS.length, (i + 1) / STEPS.length],
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.span
                  className="pipeline-dot"
                  animate={{
                    backgroundColor: ["rgba(35,35,35,0.2)", "rgba(11,79,255,1)", "rgba(35,35,35,0.2)"],
                    boxShadow: [
                      "0 0 0 rgba(11,79,255,0)",
                      "0 0 14px rgba(11,79,255,0.7)",
                      "0 0 0 rgba(11,79,255,0)",
                    ],
                  }}
                  transition={{
                    duration: CYCLE,
                    times: [i / STEPS.length, (i + 0.5) / STEPS.length, (i + 1) / STEPS.length],
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />
                <span className="pipeline-chip__label mono">{step.label}</span>
                <span className="pipeline-chip__sub">{step.sub}</span>
              </motion.div>
              {i < STEPS.length - 1 && <div className="pipeline-connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
