"use client";

import { motion } from "motion/react";
import React from "react";

// SAMPLE testimonials — replace with real, consented student reviews after cohort 1.
// Never present these as real (claims policy, agent/offers.md). The visible
// "Illustrative reviews" caption below must stay until real quotes replace them.
// Avatar images are AI-generated illustrative portraits (files in /public/reviews/);
// when a file is missing the card falls back to an initials disc automatically.
const reviews = [
  { text: "The vibe coding day was a revelation. I actually shipped something.", author: "Priya K.", country: "India", img: "/reviews/r1.jpg" },
  { text: "Finally, an AI course that isn't just theory slides.", author: "Rajesh M.", country: "India", img: "/reviews/r2.jpg" },
  { text: "The AI Engineer capstone broke my brain in the best way.", author: "Alex T.", country: "United States", img: "/reviews/r3.jpg" },
  { text: "The prompt library and session notes alone kept me busy for weeks.", author: "Sarah J.", country: "United Kingdom", img: "/reviews/r4.jpg" },
  { text: "Two days, and I automated half my Monday reporting.", author: "Chidi O.", country: "Nigeria", img: "/reviews/r5.jpg" },
  { text: "Clear, hands-on, and the certificate verifies publicly — loved that.", author: "Yuki S.", country: "Japan", img: "/reviews/r6.jpg" },
  { text: "I came for the tools, stayed for the way of thinking.", author: "Marina L.", country: "Brazil", img: "/reviews/r7.jpg" },
];

function Avatar({ img, author }: { img: string; author: string }) {
  const [failed, setFailed] = React.useState(false);
  const initials = author
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  if (failed) {
    return (
      <span
        className="review-avatar"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-ink)" }}
        aria-hidden="true"
      >
        {initials}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="review-avatar" src={img} alt="" loading="lazy" onError={() => setFailed(true)} />
  );
}

export default function ReviewsMarquee() {
  const scrollItems = [...reviews, ...reviews];

  return (
    <section className="section" style={{ overflow: "hidden", background: "var(--color-cream)" }}>
      <div className="container" style={{ marginBottom: "var(--space-2xl)", textAlign: "center" }}>
        <p className="label" style={{ color: "var(--color-electric)", marginBottom: "var(--space-md)" }}>
          Voices from the cohorts
        </p>
        <h2 style={{ fontSize: "2rem" }}>What our students say</h2>
        <p style={{ marginTop: "var(--space-sm)", color: "var(--color-gray)", fontSize: "0.875rem" }}>
          Illustrative reviews — real student stories publish after our first cohorts.
        </p>
      </div>

      <div style={{ position: "relative", width: "100vw", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw", overflow: "hidden" }}>
        <motion.div
          animate={{ x: [0, -1750] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 34 }}
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
                background: "var(--color-cream-bright)",
                border: "1px solid rgba(35, 35, 35, 0.12)",
                borderRadius: "var(--radius-xl)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <p style={{ fontSize: "1.0625rem", lineHeight: 1.55, marginBottom: "var(--space-md)" }}>
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="review-head">
                <Avatar img={review.img} author={review.author} />
                <div className="review-meta">
                  <span style={{ fontWeight: 500, fontSize: "0.9375rem" }}>{review.author}</span>
                  <span className="review-country">{review.country}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "12%", background: "linear-gradient(to right, var(--color-cream), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "12%", background: "linear-gradient(to left, var(--color-cream), transparent)", pointerEvents: "none" }} />
      </div>
    </section>
  );
}
