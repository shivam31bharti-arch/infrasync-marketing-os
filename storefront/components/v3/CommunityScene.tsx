"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Client wrapper: dark antigravity scene, desktop-only, reduced-motion-safe. */
export default function CommunityScene() {
  const [mount3D, setMount3D] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    setMount3D(!reduce && desktop);
  }, []);
  if (!mount3D) return null;
  return <HeroScene dark />;
}
