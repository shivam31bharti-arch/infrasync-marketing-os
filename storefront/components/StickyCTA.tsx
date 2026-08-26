"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type StickyCTAProps = {
  amount: string;
  label: string;
  href: string;
  cta: string;
  external?: boolean;
  showAfter?: number;
};

// GrowthSchool-style persistent bottom bar: price + one CTA.
// Slides in after the visitor scrolls past the hero.
export default function StickyCTA({
  amount,
  label,
  href,
  cta,
  external = false,
  showAfter = 560,
}: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <div className="sticky-cta" data-visible={visible} aria-hidden={!visible}>
      <div className="sticky-cta__inner">
        <div className="sticky-cta__price">
          <span className="sticky-cta__amount">{amount}</span>
          <span className="sticky-cta__label">{label}</span>
        </div>
        {external ? (
          <a
            href={href}
            className="button button--primary"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
          >
            {cta}
          </a>
        ) : (
          <Link
            href={href}
            className="button button--primary"
            tabIndex={visible ? 0 : -1}
          >
            {cta}
          </Link>
        )}
      </div>
    </div>
  );
}
