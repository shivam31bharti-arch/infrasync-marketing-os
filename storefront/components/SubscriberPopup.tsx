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

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
  }

  return (
    <div
      className="popup-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Stay updated"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(3, 13, 2, 0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
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
          position: "relative",
          background: "linear-gradient(150deg, #0A2A12 0%, #06170A 70%)",
          border: "1px solid rgba(51, 195, 117, 0.25)",
          borderRadius: "var(--radius-xl)",
          padding: "var(--space-2xl)",
          maxWidth: 440,
          width: "100%",
          color: "var(--color-paper)",
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.6)",
        }}
      >
        <p className="label" style={{ marginBottom: "var(--space-sm)" }}>
          Stay in the loop
        </p>
        <h3 style={{ marginBottom: "var(--space-md)" }}>
          Never miss a workshop date
        </h3>
        <p
          className="muted"
          style={{ marginBottom: "var(--space-xl)", lineHeight: 1.7 }}
        >
          Upcoming workshop dates, curriculum updates, and early-access offers —
          straight to your inbox. No spam.
        </p>
        <SubscribeForm source="popup" />
        <p style={{ marginTop: "var(--space-lg)", textAlign: "center" }}>
          <button
            className="button button--ghost"
            onClick={dismiss}
            style={{ fontSize: "0.8125rem" }}
          >
            No thanks
          </button>
        </p>
      </div>
    </div>
  );
}
