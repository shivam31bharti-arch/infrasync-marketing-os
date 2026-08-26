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
            background: "var(--color-electric)",
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );
}

type PanelView = "chat" | "callback";

export default function ChatWidget() {
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

  const panelBg = "#06170A";
  const lineColor = "rgba(255, 250, 241, 0.09)";

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
              bottom: 24,
              right: 24,
              zIndex: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "var(--space-sm)",
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
                    background: panelBg,
                    border: `1px solid ${lineColor}`,
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-sm)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-xs)",
                    boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
                    minWidth: 230,
                  }}
                >
                  <button
                    className="button button--ghost"
                    style={{
                      width: "100%",
                      justifyContent: "flex-start",
                      gap: 10,
                      padding: "var(--space-sm) var(--space-md)",
                    }}
                    onClick={() => openPanel("chat")}
                  >
                    <BotIcon /> Chat with AI
                  </button>
                  <button
                    className="button button--ghost"
                    style={{
                      width: "100%",
                      justifyContent: "flex-start",
                      gap: 10,
                      padding: "var(--space-sm) var(--space-md)",
                    }}
                    onClick={() => openPanel("callback")}
                  >
                    <PhoneIcon /> Request a Callback
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "var(--color-electric)",
                color: "var(--color-ink)",
                border: "none",
                borderRadius: "99px",
                padding: "0.8rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.9375rem",
                boxShadow: "0 8px 30px rgba(51, 195, 117, 0.4)",
                fontFamily: "var(--font-body)",
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
              bottom: 24,
              right: 24,
              width: 390,
              maxWidth: "calc(100vw - 48px)",
              height: 540,
              maxHeight: "calc(100vh - 100px)",
              background: panelBg,
              color: "var(--color-paper)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.65)",
              border: `1px solid ${lineColor}`,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 150,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 18px",
                background: "rgba(51, 195, 117, 0.08)",
                borderBottom: `1px solid ${lineColor}`,
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
                  background: "var(--color-electric)",
                  color: "var(--color-ink)",
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
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {view === "chat" ? "SkillSync Assistant" : "Request a Callback"}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-electric)" }}>
                  {view === "chat"
                    ? "● Online — programs, pricing, prerequisites"
                    : "Our AI counselor calls your number"}
                </div>
              </div>
              <button
                onClick={() =>
                  setView(view === "chat" ? "callback" : "chat")
                }
                title={view === "chat" ? "Request a callback" : "Back to chat"}
                style={{
                  background: "none",
                  border: `1px solid ${lineColor}`,
                  borderRadius: 10,
                  color: "var(--color-paper)",
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
                  color: "var(--color-gray)",
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
                          color: "var(--color-gray)",
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                          marginBottom: 16,
                        }}
                      >
                        Hi! Ask me anything about our programs, pricing, or
                        prerequisites — or tap a question to start.
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 8,
                        }}
                      >
                        {QUICK_QUESTIONS.map((q) => (
                          <button
                            key={q}
                            onClick={() => sendText(q)}
                            style={{
                              background: "rgba(255, 250, 241, 0.05)",
                              border: `1px solid ${lineColor}`,
                              borderRadius: 12,
                              color: "var(--color-paper)",
                              padding: "10px 14px",
                              fontSize: "0.85rem",
                              cursor: "pointer",
                              fontFamily: "var(--font-body)",
                              transition: "border-color 0.15s ease",
                            }}
                          >
                            {q}
                          </button>
                        ))}
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
                        background:
                          msg.role === "user"
                            ? "var(--color-electric)"
                            : "rgba(255, 250, 241, 0.06)",
                        color:
                          msg.role === "user"
                            ? "var(--color-ink)"
                            : "var(--color-paper)",
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
                        background: "rgba(255, 250, 241, 0.06)",
                      }}
                    >
                      <TypingDots />
                    </div>
                  )}
                </div>

                {/* Input */}
                <form
                  onSubmit={sendMessage}
                  style={{
                    display: "flex",
                    gap: "8px",
                    padding: "12px 14px",
                    borderTop: `1px solid ${lineColor}`,
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
                    className="input"
                    style={{ flex: 1, fontSize: "0.875rem", padding: "10px 14px" }}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="button button--primary"
                    style={{
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
                        background: "var(--color-electric-dim)",
                        color: "var(--color-electric)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 18px",
                      }}
                    >
                      <PhoneIcon size={28} />
                    </div>
                    <h3 style={{ marginBottom: 10, fontSize: "1.2rem" }}>
                      {cbState === "dispatched"
                        ? "Your phone should ring shortly"
                        : "Request received"}
                    </h3>
                    <p
                      style={{
                        color: "var(--color-gray)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {cbState === "dispatched"
                        ? "Our AI course counselor is calling you now. Answer to talk about programs, pricing, and your track."
                        : "Our counselor will call you back soon on the number you shared."}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={requestCallback}>
                    <p
                      style={{
                        color: "var(--color-gray)",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        marginBottom: 18,
                      }}
                    >
                      Enter your number and our AI course counselor will call you
                      right away — programs, pricing, EMI, track fit.
                    </p>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--color-gray)",
                        marginBottom: 6,
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
                      className="input"
                      style={{ marginBottom: 14 }}
                    />
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--color-gray)",
                        marginBottom: 6,
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
                      className="input"
                      style={{ marginBottom: 16 }}
                    />
                    {cbState === "error" && (
                      <p
                        style={{
                          color: "var(--color-danger)",
                          fontSize: "0.8rem",
                          marginBottom: 12,
                        }}
                      >
                        {cbError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={cbState === "sending"}
                      className="button button--primary"
                      style={{ width: "100%", opacity: cbState === "sending" ? 0.7 : 1 }}
                    >
                      {cbState === "sending" ? "Connecting…" : "Call me now"}
                    </button>
                    <p
                      style={{
                        marginTop: 14,
                        fontSize: "0.72rem",
                        color: "var(--color-gray)",
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
