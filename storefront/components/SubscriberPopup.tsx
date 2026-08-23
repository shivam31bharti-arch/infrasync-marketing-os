"use client";

import { useEffect, useState } from "react";
import SubscribeForm from "./SubscribeForm";

const DISMISS_KEY = "infrasync_popup_dismissed";

export default function SubscriberPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;
    const t = setTimeout(() => setOpen(true), 8000); // show after 8s, not instantly
    return () => clearTimeout(t);
  }, []);

  if (!open) return null;

  return (
    <div className="popup-backdrop" role="dialog" aria-modal="true" aria-label="Subscribe">
      <div className="popup">
        <h3>[[WELCOME_OFFER_HEADLINE]]</h3>
        <p className="muted">[[POPUP_COPY]] — placeholder until offers are confirmed in agent/offers.md.</p>
        <SubscribeForm source="popup" />
        <p style={{ marginTop: "1rem" }}>
          <button
            className="ghost"
            onClick={() => {
              localStorage.setItem(DISMISS_KEY, "1");
              setOpen(false);
            }}
          >
            No thanks
          </button>
        </p>
      </div>
    </div>
  );
}
