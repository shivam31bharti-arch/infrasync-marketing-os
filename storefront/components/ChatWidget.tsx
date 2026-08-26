"use client";

import { useState, useRef, useEffect } from "react";
import { track } from "@/lib/analytics";
import { motion, AnimatePresence } from "motion/react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const QUICK_QUESTIONS = [
  "What does the workshop cost?",
  "Which track is right for me?",
  "Is EMI available?",
];

// v4 light Auxia theme
const T = {
  panel: "#ffffff",
  line: "rgba(15, 23, 42, 0.12)",
  ink: "#0f172a",
  muted: "#64748b",
  faint: "#94a3b8",
  field: "#fcfbf9",
  fieldBorder: "#ddd8ce",
  bubble: "#f1f3ef",
  accent: "#059669",
  accentSoft: "rgba(5, 150, 105, 0.08)",
  accentBorder: "rgba(5, 150, 105, 0.35)",
  waText: "#0a7d42",
  waSoft: "rgba(37, 211, 102, 0.1)",
  waBorder: "rgba(37, 211, 102, 0.4)",
  danger: "#dc2626",
};

function BotIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 7V4" />
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M9.5 16h5" />
    </svg>
  );
}

function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.18 }}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: T.accent,
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}

type PanelView = "chat" | "callback";

type ChatWidgetProps = {
  whatsappLink?: string | null;
};

export default function ChatWidget({ whatsappLink = null }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<PanelView>("chat");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Callback form state
  const [cbName, setCbName] = useState("");
  const [cbPhone, setCbPhone] = useState("+91");
  const [cbState, setCbState] = useState<
    "idle" | "sending" | "dispatched" | "queued" | "error"
  >("idle");
  const [cbError, setCbError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isNearCta = entries.some((entry) => entry.isIntersecting);
        setIsVisible(!isNearCta);
      },
      { rootMargin: "0px 0px -100px 0px" }
    );

    const checkAndObserve = () => {
      const ctas = document.querySelectorAll(".button--primary, .price-display");
      ctas.forEach((cta) => observer.observe(cta));
    };

    checkAndObserve();
    const interval = setInterval(checkAndObserve, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open && view === "chat" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, view]);

  function openPanel(v: PanelView) {
    if (!open) track({ name: "chat_opened", props: {} });
    setView(v);
    setOpen(true);
    setMenuOpen(false);
  }

  async function sendText(text: string) {
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    track({ name: "chat_message", props: { role: "user", length: text.length } });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't process that. Try again?";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      track({ name: "chat_message", props: { role: "assistant", length: reply.length } });
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Something went wrong on my side. Please try again — or request a callback and our counselor will phone you.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    await sendText(input.trim());
  }

  async function requestCallback(e: React.FormEvent) {
    e.preventDefault();
    if (cbState === "sending") return;
    setCbError("");
    setCbState("sending");
    track({ name: "callback_requested", props: {} });
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: cbName.trim(), phone: cbPhone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCbState("error");
        setCbError(data?.error || "Could not submit. Check the number format.");
        return;
      }
      setCbState(data.call === "dispatched" ? "dispatched" : "queued");
    } catch {
      setCbState("error");
      setCbError("Network error — please try again.");
    }
  }

  const fieldStyle: React.CSSProperties = {
    background: T.field,
    border: `1px solid ${T.fieldBorder}`,
    borderRadius: 12,
    color: T.ink,
    fontFamily: "var(--font-body)",
    outline: "none",
    width: "100%",
  };

  const primaryBtn: React.CSSProperties = {
    background: T.accent,
    color: "#ffffff",
    border: "none",
    borderRadius: 999,
    fontFamily: "var(--font-heading)",
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: "fixed",
              bottom: 96, // clears the v4 sticky conversion bar
              right: 24,
              zIndex: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.5rem",
            }}
          >
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  style={{
                    background: T.panel,
                    border: `1px solid ${T.line}`,
                    borderRadius: 16,
                    padding: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    boxShadow: "0 18px 50px rgba(15, 23, 42, 0.18)",
                    minWidth: 240,
                  }}
                >
                  <button
                    onClick={() => openPanel("chat")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "0.65rem 0.9rem",
                      background: "none",
                      border: "none",
                      borderRadius: 10,
                      color: T.ink,
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ color: T.accent, display: "flex" }}>
                      <BotIcon />
                    </span>
                    Chat with AI
                  </button>
                  <button
                    onClick={() => openPanel("callback")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "0.65rem 0.9rem",
                      background: "none",
                      border: "none",
                      borderRadius: 10,
                      color: T.ink,
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ color: T.accent, display: "flex" }}>
                      <PhoneIcon />
                    </span>
                    Request a Callback
                  </button>
                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        track({ name: "whatsapp_join_click", props: { source: "launcher_menu" } });
                        setMenuOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "0.65rem 0.9rem",
                        borderRadius: 10,
                        color: T.waText,
                        fontFamily: "var(--font-body)",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        textDecoration: "none",
                      }}
                    >
                      <WhatsAppIcon /> Join Free WhatsApp Community
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: T.ink,
                color: "#ffffff",
                border: "none",
                borderRadius: 99,
                padding: "0.8rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.9375rem",
                boxShadow: "0 12px 34px rgba(15, 23, 42, 0.3)",
                fontFamily: "var(--font-heading)",
              }}
              aria-label={menuOpen ? "Close menu" : "Talk to us"}
            >
              {menuOpen ? "✕" : <BotIcon size={22} />}
              {menuOpen ? "Close" : "Talk to us"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            style={{
              position: "fixed",
              bottom: 96, // clears the v4 sticky conversion bar
              right: 24,
              width: 390,
              maxWidth: "calc(100vw - 48px)",
              height: 540,
              maxHeight: "calc(100vh - 130px)",
              background: T.panel,
              color: T.ink,
              borderRadius: 22,
              boxShadow: "0 30px 80px rgba(15, 23, 42, 0.28)",
              border: `1px solid ${T.line}`,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 150,
              fontFamily: "var(--font-body)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 18px",
                background: T.accentSoft,
                borderBottom: `1px solid ${T.line}`,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: T.accent,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <BotIcon size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {view === "chat" ? "SkillSync Assistant" : "Request a Callback"}
                </div>
                <div style={{ fontSize: "0.72rem", color: T.accent, fontWeight: 600 }}>
                  {view === "chat"
                    ? "● Online — programs, pricing, prerequisites"
                    : "Our AI counselor calls your number"}
                </div>
              </div>
              <button
                onClick={() => setView(view === "chat" ? "callback" : "chat")}
                title={view === "chat" ? "Request a callback" : "Back to chat"}
                style={{
                  background: T.panel,
                  border: `1px solid ${T.line}`,
                  borderRadius: 10,
                  color: T.ink,
                  cursor: "pointer",
                  padding: 8,
                  display: "flex",
                }}
              >
                {view === "chat" ? <PhoneIcon /> : <BotIcon size={18} />}
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  background: "none",
                  border: "none",
                  color: T.faint,
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  padding: 4,
                }}
              >
                ✕
              </button>
            </div>

            {view === "chat" ? (
              <>
                {/* Messages */}
                <div
                  ref={scrollRef}
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {messages.length === 0 && (
                    <div
                      style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        textAlign: "center",
                        padding: "0 8px",
                      }}
                    >
                      <p
                        style={{
                          color: T.muted,
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                          marginBottom: 16,
                        }}
                      >
                        Hi! Ask me anything about our programs, pricing, or
                        prerequisites — or tap a question to start.
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {QUICK_QUESTIONS.map((q) => (
                          <button
                            key={q}
                            onClick={() => sendText(q)}
                            style={{
                              background: T.field,
                              border: `1px solid ${T.fieldBorder}`,
                              borderRadius: 12,
                              color: T.ink,
                              padding: "10px 14px",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              fontFamily: "var(--font-body)",
                              transition: "border-color 0.15s ease",
                            }}
                          >
                            {q}
                          </button>
                        ))}
                        {whatsappLink && (
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              track({ name: "whatsapp_join_click", props: { source: "chat_empty_state" } })
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 8,
                              background: T.waSoft,
                              border: `1px solid ${T.waBorder}`,
                              borderRadius: 12,
                              color: T.waText,
                              padding: "10px 14px",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              textDecoration: "none",
                              fontFamily: "var(--font-body)",
                            }}
                          >
                            <WhatsAppIcon /> Join our free WhatsApp community
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                        maxWidth: "85%",
                        padding: "10px 14px",
                        borderRadius:
                          msg.role === "user"
                            ? "14px 14px 4px 14px"
                            : "14px 14px 14px 4px",
                        background: msg.role === "user" ? T.accent : T.bubble,
                        color: msg.role === "user" ? "#ffffff" : T.ink,
                        fontSize: "0.875rem",
                        lineHeight: 1.55,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.content}
                    </div>
                  ))}
                  {loading && (
                    <div
                      style={{
                        alignSelf: "flex-start",
                        padding: "12px 16px",
                        borderRadius: "14px 14px 14px 4px",
                        background: T.bubble,
                      }}
                    >
                      <TypingDots />
                    </div>
                  )}
                </div>

                {/* Persistent actions */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    padding: "8px 14px 0",
                    borderTop: `1px solid ${T.line}`,
                    flexShrink: 0,
                  }}
                >
                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track({ name: "whatsapp_join_click", props: { source: "chat_action_strip" } })
                      }
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: T.waText,
                        background: T.waSoft,
                        border: `1px solid ${T.waBorder}`,
                        borderRadius: 99,
                        padding: "7px 10px",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <WhatsAppIcon size={13} /> Free WhatsApp community
                    </a>
                  )}
                  <button
                    onClick={() => setView("callback")}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: T.ink,
                      background: T.field,
                      border: `1px solid ${T.fieldBorder}`,
                      borderRadius: 99,
                      padding: "7px 10px",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <PhoneIcon size={13} /> Talk to our team
                  </button>
                </div>

                {/* Input */}
                <form
                  onSubmit={sendMessage}
                  style={{
                    display: "flex",
                    gap: "8px",
                    padding: "10px 14px 12px",
                    flexShrink: 0,
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message…"
                    maxLength={500}
                    style={{
                      ...fieldStyle,
                      flex: 1,
                      fontSize: "0.875rem",
                      padding: "10px 14px",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    style={{
                      ...primaryBtn,
                      padding: "10px 18px",
                      fontSize: "0.875rem",
                      opacity: loading || !input.trim() ? 0.6 : 1,
                    }}
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              /* Callback view */
              <div style={{ flex: 1, padding: "20px 18px", overflowY: "auto" }}>
                {cbState === "dispatched" || cbState === "queued" ? (
                  <div style={{ textAlign: "center", marginTop: 60 }}>
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: T.accentSoft,
                        border: `1px solid ${T.accentBorder}`,
                        color: T.accent,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 18px",
                      }}
                    >
                      <PhoneIcon size={28} />
                    </div>
                    <h3
                      style={{
                        marginBottom: 10,
                        fontSize: "1.2rem",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                      }}
                    >
                      {cbState === "dispatched"
                        ? "Your phone should ring shortly"
                        : "Request received"}
                    </h3>
                    <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.6 }}>
                      {cbState === "dispatched"
                        ? "Our AI course counselor is calling you now. Answer to talk about programs, pricing, and your track."
                        : "Our counselor will call you back soon on the number you shared."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={requestCallback}>
                    <p
                      style={{
                        color: T.muted,
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        marginBottom: 18,
                      }}
                    >
                      Enter your number and our course counselor will call you
                      right away — programs, pricing, EMI, track fit. Your
                      details also reach our team for personal follow-up.
                    </p>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: T.muted,
                        marginBottom: 6,
                        fontWeight: 600,
                      }}
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      value={cbName}
                      onChange={(e) => setCbName(e.target.value)}
                      placeholder="Full name"
                      maxLength={80}
                      required
                      style={{ ...fieldStyle, padding: "12px 14px", fontSize: "0.9rem", marginBottom: 14 }}
                    />
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: T.muted,
                        marginBottom: 6,
                        fontWeight: 600,
                      }}
                    >
                      Phone (with country code)
                    </label>
                    <input
                      type="tel"
                      value={cbPhone}
                      onChange={(e) => setCbPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      style={{ ...fieldStyle, padding: "12px 14px", fontSize: "0.9rem", marginBottom: 16 }}
                    />
                    {cbState === "error" && (
                      <p style={{ color: T.danger, fontSize: "0.8rem", marginBottom: 12 }}>
                        {cbError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={cbState === "sending"}
                      style={{
                        ...primaryBtn,
                        width: "100%",
                        padding: "12px",
                        fontSize: "0.95rem",
                        opacity: cbState === "sending" ? 0.7 : 1,
                      }}
                    >
                      {cbState === "sending" ? "Connecting…" : "Call me now"}
                    </button>
                    <p
                      style={{
                        marginTop: 14,
                        fontSize: "0.72rem",
                        color: T.faint,
                        lineHeight: 1.55,
                      }}
                    >
                      By requesting a callback you agree to receive this call from
                      SkillSync&apos;s AI counselor. No spam, no repeat calls.
                    </p>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
