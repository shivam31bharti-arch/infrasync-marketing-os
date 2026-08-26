"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, type Variants } from "motion/react";
import MagneticButton from "./MagneticButton";

/**
 * S1 Hero — full-viewport cinematic opener.
 * R3F shard scene lazy-loads desktop-only (<768px and reduced-motion get the
 * CSS gradient fallback). Headline words stagger in with springs; two
 * magnetic CTAs; scroll cue. All facts verbatim from agent/offers.md.
 */

// R3F scene is code-split and never SSR'd — zero cost until mounted.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const SPRING = { type: "spring", stiffness: 100, damping: 20, mass: 0.6 } as const;

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 38, rotateX: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { ...SPRING, delay: 0.12 + i * 0.09 },
  }),
};

export default function HeroV3({ workshopHref }: { workshopHref: string }) {
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    setMount3D(!reduce && desktop);
  }, []);

  const titleWords = ["Learn", "AI", "by", "building."];

  return (
    <section className="v3-hero" aria-label="Introduction">
      {/* 3D scene (desktop) or CSS mesh (mobile/reduced-motion) */}
      <div className="v3-hero__canvas" aria-hidden="true">
        {mount3D ? <HeroScene /> : <div className="v3-hero__fallback" />}
      </div>
      <div className="v3-hero__vignette" aria-hidden="true" />

      <div className="v3-hero__content">
        <motion.p
          className="v3-hero__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.05 }}
        >
          <span className="v3-hero__eyebrow-dot" aria-hidden="true" />
          Live, cohort-based AI programs · SkillSync
        </motion.p>

        <h1 className="display-xl v3-hero__title">
          {titleWords.map((w, i) => (
            <motion.span
              key={w}
              className="v3-hero__word"
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="show"
              style={i === titleWords.length - 1 ? { color: "var(--color-electric)" } : undefined}
            >
              {w}
              {i < titleWords.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="v3-hero__sub"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.55 }}
        >
          Start with the 2-Day AI Workshop — $20 international · ₹1,999 India —
          then accelerate into the track that fits you: Generalist or Engineer.
          Saturday + Sunday, 10:00 AM–6:00 PM IST.
        </motion.p>

        <motion.div
          className="v3-hero__ctas"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.7 }}
        >
          <MagneticButton
            href={workshopHref}
            external={workshopHref.startsWith("http")}
            className="button button--primary button--large"
          >
            Register — ₹1,999
          </MagneticButton>
          <MagneticButton href="#programs" className="button button--secondary button--large" >
            Explore programs
          </MagneticButton>
        </motion.div>

        <motion.div
          className="v3-hero__meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          <span>
            Next workshops <strong>Aug 29–30 · Sep 5–6 · Sep 12–13</strong>
          </span>
          <span>
            Accelerators from <strong>Sep 15, 2026</strong> · 7:30–10:30 PM IST
          </span>
        </motion.div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="scroll-cue__line" />
      </div>
    </section>
  );
}
