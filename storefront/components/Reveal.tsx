"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
};

// Spring-based scroll reveal. Collapses to a plain fade when the user
// prefers reduced motion (design-rebuild-v3 motion doctrine).
export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  style,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}
