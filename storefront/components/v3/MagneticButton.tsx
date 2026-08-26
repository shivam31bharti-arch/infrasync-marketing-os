"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";

/**
 * MagneticButton — pill CTA that gently pulls toward the cursor (±6px)
 * and springs back on leave. Movement is GPU transforms only; motion is
 * spring-physics (stiffness 120, damping 18) per the v3 motion doctrine.
 * Collapses to a plain styled link under prefers-reduced-motion.
 */
export default function MagneticButton({
  href,
  external = false,
  className = "",
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [reduceMotion, setReduceMotion] = useState(true);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const max = 6; // ±6px magnetic pull
    x.set(Math.max(-max, Math.min(max, dx * 0.25)));
    y.set(Math.max(-max, Math.min(max, dy * 0.25)));
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const inner = external ? (
    <a href={href} className={className} {...linkProps}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block", x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {inner}
    </motion.span>
  );
}
