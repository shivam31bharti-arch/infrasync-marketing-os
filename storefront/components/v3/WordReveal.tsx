"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/**
 * WordReveal — the Auxia signature move. Renders text word-by-word; each word
 * fades 0.15 → 1 (with a 4px rise) driven by scroll progress through the
 * element. Pure transforms/opacity, no layout animation.
 */
function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);
  return (
    <motion.span style={{ opacity, y, display: "inline-block", willChange: "opacity, transform" }}>
      {word}&nbsp;
    </motion.span>
  );
}

export default function WordReveal({
  text,
  as: Tag = "p",
  className,
  style,
}: {
  text: string;
  as?: "p" | "h2" | "h3" | "div";
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });
  const words = text.split(" ");
  return (
    <Tag ref={ref as never} className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          word={w}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
        />
      ))}
    </Tag>
  );
}
