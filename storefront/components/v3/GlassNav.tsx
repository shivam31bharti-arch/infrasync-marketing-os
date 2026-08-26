"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * GlassNav — slim nav that blurs and shrinks after 80px of scroll.
 * Links/CTA mirror the previous header exactly (anchors unchanged);
 * only presentation moved into this client component.
 */
export default function GlassNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`glass-nav ${scrolled ? "glass-nav--scrolled" : ""}`}
      role="banner"
    >
      <div className="glass-nav__inner">
        <Link href="/" className="brand" aria-label="SkillSync — Home">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span className="brand-name">SkillSync</span>
        </Link>
        <nav
          className={`nav-primary ${open ? "open" : ""}`}
          aria-label="Primary navigation"
        >
          <Link href="/workshop" className="nav-link" onClick={() => setOpen(false)}>
            Workshop
          </Link>
          <Link href="/programs/ai-generalist" className="nav-link" onClick={() => setOpen(false)}>
            AI Generalist
          </Link>
          <Link href="/programs/ai-engineer" className="nav-link" onClick={() => setOpen(false)}>
            AI Engineer
          </Link>
          <Link href="/quiz" className="nav-link" onClick={() => setOpen(false)}>
            Find Your Track
          </Link>
        </nav>
        <div className="nav-actions">
          <Link href="/workshop" className="button button--primary nav-cta">
            Join Workshop — $20
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
