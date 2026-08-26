"use client";

import { useState } from "react";
import { motion } from "motion/react";

/**
 * CommunityForm — Staying-Ahead-style registration for the SkillSync WhatsApp
 * community. Persists the lead via /api/subscribe (email + rich source tag),
 * then reveals the WhatsApp invite. Fluid blue→green gradient CTA.
 */
const WHATSAPP_LINK =
  process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_LINK || "http://links.stayingahead.com/AIOS";

const ROLES = ["Student", "Working professional", "Founder / self-employed", "Between roles"];
const EXP = ["0–2 years", "3–6 years", "7–12 years", "12+ years"];

export default function CommunityForm() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    coding: "",
    role: "",
    exp: "",
    masterclass: true,
    newsletter: true,
  });
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    try {
      const source = [
        "community",
        form.coding && `coding:${form.coding}`,
        form.role && `role:${form.role}`,
        form.exp && `exp:${form.exp}`,
        form.masterclass && "wants:masterclass",
        form.newsletter && "wants:newsletter",
        form.name && `name:${form.name.slice(0, 40)}`,
        form.phone && `phone:${form.phone.slice(0, 16)}`,
      ]
        .filter(Boolean)
        .join("|");
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, source }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 18 }}
        className="community-card"
        style={{ textAlign: "center" }}
      >
        <h3 style={{ marginBottom: "var(--space-md)" }}>You&apos;re in. 🎉</h3>
        <p className="muted" style={{ marginBottom: "var(--space-xl)", lineHeight: 1.5 }}>
          One tap left — join the WhatsApp community:
        </p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="button btn-fluid button--large">
          Open WhatsApp →
        </a>
        {form.masterclass && (
          <p className="muted" style={{ marginTop: "var(--space-lg)", fontSize: "0.875rem" }}>
            Your 2-Day AI Masterclass details arrive by email.
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="community-card" aria-label="Join the community">
      <div className="cfield">
        <label htmlFor="c-name">Your name</label>
        <input id="c-name" className="input" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" />
      </div>
      <div className="cfield">
        <label htmlFor="c-email">Email address</label>
        <input id="c-email" className="input" type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
      </div>
      <div className="cfield">
        <label htmlFor="c-phone">WhatsApp number</label>
        <input id="c-phone" className="input" required value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" />
      </div>
      <div className="cfield">
        <span className="cfield__label">Do you know coding?</span>
        <div className="chip-row" role="radiogroup" aria-label="Do you know coding">
          {["Yes", "No"].map((v) => (
            <button key={v} type="button" role="radio" aria-checked={form.coding === v} className={`chip ${form.coding === v ? "chip--on" : ""}`} onClick={() => set("coding", v)}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="cfield">
        <span className="cfield__label">What describes you best?</span>
        <div className="chip-row">
          {ROLES.map((v) => (
            <button key={v} type="button" className={`chip ${form.role === v ? "chip--on" : ""}`} onClick={() => set("role", v)}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="cfield">
        <span className="cfield__label">Years of experience</span>
        <div className="chip-row">
          {EXP.map((v) => (
            <button key={v} type="button" className={`chip ${form.exp === v ? "chip--on" : ""}`} onClick={() => set("exp", v)}>
              {v}
            </button>
          ))}
        </div>
      </div>
      <label className="ccheck">
        <input type="checkbox" checked={form.masterclass} onChange={(e) => set("masterclass", e.target.checked)} />
        <span>Also register me for the <strong>2-Day AI Masterclass</strong> by SkillSync</span>
      </label>
      <label className="ccheck">
        <input type="checkbox" checked={form.newsletter} onChange={(e) => set("newsletter", e.target.checked)} />
        <span>Subscribe me to the newsletter</span>
      </label>
      <button type="submit" className="button btn-fluid button--large" style={{ width: "100%", marginTop: "var(--space-lg)" }} disabled={state === "busy"}>
        {state === "busy" ? "Joining…" : "Get Instant Access →"}
      </button>
      {state === "error" && (
        <p style={{ color: "var(--color-danger)", marginTop: "var(--space-md)", fontSize: "0.875rem" }}>
          Something broke — try again, or email team@infra-sync.online
        </p>
      )}
      <p className="muted" style={{ marginTop: "var(--space-md)", fontSize: "0.8125rem", textAlign: "center" }}>
        Your data is safe. No spam, ever.
      </p>
    </form>
  );
}
