"use client";

import { motion } from "motion/react";

/**
 * PipelineDemo — the Auxia-style "watch the machine work" panel, except ours
 * demos a real, running system: the SkillSync delivery pipeline. Chips light
 * up in sequence with springs, looping forever. 100% true claims only.
 */
const STEPS = [
  { label: "STUDENT PAYS ₹1,999", sub: "Razorpay checkout" },
  { label: "CERTIFICATE ISSUED", sub: "SSC-#### · publicly verifiable" },
  { label: "DRIVE ACCESS GRANTED", sub: "notes + tools · registered email only" },
  { label: "CRM UPDATED", sub: "contact created automatically" },
  { label: "PACK EMAILED BY 8 PM", sub: "recordings · notes · certificate" },
];

const CYCLE = 7.5; // seconds for a full loop

export default function PipelineDemo() {
  return (
    <section className="section" aria-label="The delivery pipeline">
      <div className="container--narrow" style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
        <p className="label" style={{ color: "var(--color-electric)", marginBottom: "var(--space-md)" }}>
          The delivery pipeline · runs itself, daily
        </p>
        <h2>Pay once. The machine does the rest.</h2>
        <p className="muted" style={{ marginTop: "var(--space-md)", maxWidth: "34ch", marginInline: "auto", lineHeight: 1.5 }}>
          This isn&apos;t a mockup — it&apos;s our live fulfilment system, animated.
        </p>
      </div>

      <div className="container" style={{ maxWidth: 900 }}>
        <div className="pipeline-panel" role="img" aria-label="Animated diagram: payment triggers certificate, drive access, CRM update, and the evening delivery email">
          {STEPS.map((step, i) => (
            <div key={step.label} className="pipeline-row">
              <motion.div
                className="pipeline-chip"
                animate={{
                  borderColor: ["rgba(35,35,35,0.14)", "rgba(11,79,255,1)", "rgba(35,35,35,0.14)"],
                  backgroundColor: ["rgba(254,253,245,1)", "rgba(11,79,255,0.07)", "rgba(254,253,245,1)"],
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
                  className="pipeline-dot"
                  animate={{
                    backgroundColor: ["rgba(35,35,35,0.25)", "rgba(11,79,255,1)", "rgba(35,35,35,0.25)"],
                    boxShadow: [
                      "0 0 0 rgba(11,79,255,0)",
                      "0 0 12px rgba(11,79,255,0.65)",
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
