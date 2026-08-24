"use client";

import { useEffect, useState } from "react";
import SubscribeForm from "./SubscribeForm";

const DISMISS_KEY = "infrasync_popup_dismissed";

export default function SubscriberPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    const t = setTimeout(() => setOpen(true), 12000); // show after 12s
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div
      className="popup-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Stay updated"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 14, 20, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "var(--z-popup)" as string,
        padding: "var(--space-xl)",
      }}
    >
      <div
        className="popup"
        style={{
          background: "var(--color-paper)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-3xl)",
          maxWidth: 420,
          width: "100%",
        }}
      >
        <h3 style={{ marginBottom: "var(--space-md)" }}>
          Stay in the loop
        </h3>
        <p
          className="muted"
          style={{ marginBottom: "var(--space-xl)", lineHeight: 1.7 }}
        >
          Get notified about upcoming workshop dates, curriculum updates,
          and early-access offers. No spam.
        </p>
        <SubscribeForm source="popup" />
        <p style={{ marginTop: "var(--space-lg)", textAlign: "center" }}>
          <button
            className="button button--ghost"
            onClick={() => {
              localStorage.setItem(DISMISS_KEY, "1");
              setOpen(false);
            }}
            style={{ fontSize: "0.8125rem" }}
          >
            No thanks
          </button>
        </p>
      </div>
    </div>
  );
}
