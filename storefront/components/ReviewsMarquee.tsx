"use client";

import { motion } from "motion/react";
import React from "react";

// SAMPLE testimonials — replace with real, consented student reviews after cohort 1.
// Never present these as real (claims policy, agent/offers.md). The visible
// "Illustrative reviews" caption below must stay until real quotes replace them.
const reviews = [
  { text: "The vibe coding day was a revelation. Actually shipped something.", author: "Priya K." },
  { text: "Finally, an AI course that isn't just theory slides.", author: "Rajesh M." },
  { text: "The AI Engineer capstone broke my brain in the best way.", author: "Alex T." },
  { text: "The prompt library and session notes alone kept me busy for weeks.", author: "Sarah J." },
];

export default function ReviewsMarquee() {
  // Duplicate array for seamless looping
  const scrollItems = [...reviews, ...reviews];

  return (
    <section className="section" style={{ overflow: "hidden", background: "var(--color-bg)" }}>
      <div className="container" style={{ marginBottom: "var(--space-2xl)", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem" }}>What our students say</h2>
        <p style={{ marginTop: "var(--space-sm)", color: "var(--color-muted, #8A8F98)", fontSize: "0.875rem" }}>
          Illustrative reviews — real student stories publish after our first cohorts.
        </p>
      </div>
      
      <div style={{ position: "relative", width: "100vw", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw", overflow: "hidden" }}>
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20
          }}
          style={{ display: "flex", gap: "var(--space-lg)", width: "max-content", paddingLeft: "var(--space-lg)" }}
        >
          {scrollItems.map((review, i) => (
            <div 
              key={i} 
              className="card" 
              style={{ 
                width: "320px", 
                flexShrink: 0, 
                padding: "var(--space-lg)", 
                background: "var(--color-surface)",
                borderColor: "rgba(138, 143, 152, 0.15)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
              }}
            >
              <p style={{ fontSize: "1.125rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: "var(--space-md)" }}>
                "{review.text}"
              </p>
              <div style={{ fontWeight: 600, color: "var(--color-electric)", fontSize: "0.9375rem" }}>
                — {review.author}
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradients to fade edges */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "15%", background: "linear-gradient(to right, var(--color-bg), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "15%", background: "linear-gradient(to left, var(--color-bg), transparent)", pointerEvents: "none" }} />
      </div>
    </section>
  );
}
