"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const DISMISS_KEY = "infrasync_popup_dismissed";

const DATE_CHOICES = [
  { id: "aug29", label: "Aug 29–30" },
  { id: "sep5", label: "Sep 5–6" },
  { id: "sep12", label: "Sep 12–13" },
  { id: "updates", label: "Just updates" },
];

type PopupProps = {
  whatsappLink?: string | null;
};

// v4 interactive popup — Auxia light card, two steps:
// 1) pick the weekend you're eyeing  2) email → success (+ WhatsApp CTA)
export default function SubscriberPopup({ whatsappLink = null }: PopupProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [choice, setChoice] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

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

  function pick(id: string) {
    setChoice(id);
    setStep(2);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: `popup:${choice ?? "none"}` }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        setError(d?.error === "invalid email" ? "That email doesn't look right." : "Couldn't save — try again.");
        setSending(false);
        return;
      }
      track({ name: "subscribed", props: { source: "popup" } });
      localStorage.setItem(DISMISS_KEY, "1");
      setStep(3);
    } catch {
      setError("Network hiccup — try again.");
    } finally {
      setSending(false);
    }
  }

  const chosenLabel = DATE_CHOICES.find((d) => d.id === choice)?.label;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Stay updated"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#ffffff",
          border: "1px solid #eae6df",
          borderRadius: "1.5rem",
          padding: "2.2rem 2.2rem 1.8rem",
          maxWidth: 460,
          width: "100%",
          color: "#0f172a",
          boxShadow: "0 40px 100px rgba(15, 23, 42, 0.25)",
          fontFamily: "var(--font-body)",
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 16,
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            color: "#94a3b8",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {step === 1 && (
          <>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                color: "#059669",
                fontWeight: 600,
              }}
            >
              2-DAY AI WORKSHOP · LIVE ONLINE
            </span>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.55rem",
                fontWeight: 800,
                margin: "0.5rem 0 0.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              Which weekend works for you?
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.2rem", lineHeight: 1.55 }}>
              Tap a date and we&apos;ll keep you posted — dates, curriculum
              drops, early-access offers. No spam.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
              {DATE_CHOICES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => pick(d.id)}
                  style={{
                    padding: "0.85rem 0.6rem",
                    borderRadius: "0.85rem",
                    border: "1px solid #ddd8ce",
                    background: "#fcfbf9",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#0f172a",
                    cursor: "pointer",
                    transition: "transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#059669";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(5,150,105,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ddd8ce";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              <button
                onClick={dismiss}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                No thanks
              </button>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                color: "#059669",
                fontWeight: 600,
              }}
            >
              {chosenLabel ? `LOCKED ON ${chosenLabel.toUpperCase()}` : "STAY IN THE LOOP"}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.55rem",
                fontWeight: 800,
                margin: "0.5rem 0 0.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              Where should we send the details?
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.1rem", lineHeight: 1.55 }}>
              One email with everything for{" "}
              {chosenLabel && chosenLabel !== "Just updates" ? chosenLabel : "upcoming workshops"} —
              schedule, prep, and the registration link.
            </p>
            <form onSubmit={submit} style={{ display: "flex", gap: "0.6rem" }}>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  flex: 1,
                  padding: "0.9rem 1rem",
                  borderRadius: "0.85rem",
                  border: "1px solid #ddd8ce",
                  background: "#fcfbf9",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-body)",
                  color: "#0f172a",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={sending}
                style={{
                  padding: "0.9rem 1.4rem",
                  borderRadius: "0.85rem",
                  border: "none",
                  background: "#059669",
                  color: "#ffffff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  opacity: sending ? 0.7 : 1,
                  whiteSpace: "nowrap",
                }}
              >
                {sending ? "Saving…" : "Notify Me"}
              </button>
            </form>
            {error && (
              <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.6rem" }}>{error}</p>
            )}
            <p style={{ textAlign: "center", marginTop: "0.9rem" }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                ← Back
              </button>
            </p>
          </>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
            <div
              style={{
                width: 62,
                height: 62,
                borderRadius: "50%",
                background: "rgba(5, 150, 105, 0.1)",
                border: "1px solid rgba(5, 150, 105, 0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "1.6rem",
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.4rem",
                fontWeight: 800,
                marginBottom: "0.4rem",
              }}
            >
              You&apos;re on the list
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.55, marginBottom: "1.1rem" }}>
              Watch your inbox{chosenLabel && chosenLabel !== "Just updates" ? ` — see you ${chosenLabel}` : ""}.
            </p>
            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track({ name: "whatsapp_join_click", props: { source: "popup_success" } })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#06240f",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: 999,
                  textDecoration: "none",
                }}
              >
                Join the free WhatsApp community →
              </a>
            ) : (
              <button
                onClick={dismiss}
                style={{
                  padding: "0.75rem 1.6rem",
                  borderRadius: 999,
                  border: "none",
                  background: "#0f172a",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Done
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
