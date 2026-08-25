"use client";

/**
 * A CSS-only animated gradient mesh background for the hero section.
 * Provides visual depth without any JS bundle cost.
 * Respects prefers-reduced-motion.
 */
export default function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div
      className={`gradient-mesh ${className}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <div className="gradient-mesh__orb gradient-mesh__orb--1" />
      <div className="gradient-mesh__orb gradient-mesh__orb--2" />
      <div className="gradient-mesh__orb gradient-mesh__orb--3" />
    </div>
  );
}
