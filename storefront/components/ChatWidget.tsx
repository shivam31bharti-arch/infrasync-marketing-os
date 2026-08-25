"use client";

import { useState, useRef, useEffect } from "react";
import { track } from "@/lib/analytics";
import { motion, AnimatePresence } from "motion/react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Hide when near payment buttons (e.g. elements with .button--primary or .price-display)
    const observer = new IntersectionObserver(
      (entries) => {
        const isNearCta = entries.some(entry => entry.isIntersecting);
        setIsVisible(!isNearCta);
      },
      { rootMargin: "0px 0px -100px 0px" }
    );

    const checkAndObserve = () => {
      const ctas = document.querySelectorAll(".button--primary, .price-display");
      ctas.forEach(cta => observer.observe(cta));
    };

    checkAndObserve();
    // Re-check periodically in case client navigation happens
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
  }, [messages, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  function handleOpen() {
    if (!open) {
      track({ name: "chat_opened", props: {} });
    }
    setOpen(!open);
    setMenuOpen(false);
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
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
      const reply = data.reply || "Sorry, I couldn't process that.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      track({ name: "chat_message", props: { role: "assistant", length: reply.length } });
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

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
              gap: "var(--space-sm)"
            }}
          >
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid rgba(138, 143, 152, 0.15)",
                    borderRadius: "var(--radius-lg)",
                    padding: "var(--space-sm)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-xs)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
                  }}
                >
                  <button 
                    className="button button--ghost" 
                    style={{ width: "100%", justifyContent: "flex-start", padding: "var(--space-sm) var(--space-md)" }}
                    onClick={handleOpen}
                  >
                    💬 Chat with AI Assistant
                  </button>
                  <a 
                    href="#" 
                    className="button button--ghost" 
                    style={{ width: "100%", justifyContent: "flex-start", padding: "var(--space-sm) var(--space-md)" }}
                    onClick={(e) => { e.preventDefault(); setMenuOpen(false); }}
                  >
                    📞 Request Callback
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "var(--color-electric)",
                color: "#fff",
                border: "none",
                borderRadius: "99px",
                padding: "var(--space-sm) var(--space-md)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-xs)",
                cursor: "pointer",
                fontWeight: 600,
                boxShadow: "0 4px 20px rgba(79, 124, 255, 0.4)",
                fontFamily: "var(--font-sans)"
              }}
            >
              {menuOpen ? "✕ Close" : "Talk to us"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: "fixed",
              bottom: 96,
              right: 24,
              width: 380,
              maxWidth: "calc(100vw - 48px)",
              height: 520,
              maxHeight: "calc(100vh - 120px)",
              background: "var(--color-paper)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 8px 32px rgba(10, 14, 20, 0.15)",
              border: "1px solid rgba(138, 143, 152, 0.15)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              zIndex: 150,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                background: "var(--color-ink)",
                color: "var(--color-paper)",
                flexShrink: 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: "0.9375rem", fontWeight: 600, fontFamily: "var(--font-display)" }}>
                  InfraSync Assistant
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-gray)", marginTop: 2 }}>
                  Ask about programs, pricing, or prerequisites
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "var(--color-gray)", cursor: "pointer", fontSize: "1.25rem" }}
              >
                ✕
              </button>
            </div>

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
                    textAlign: "center",
                    color: "var(--color-gray)",
                    fontSize: "0.875rem",
                    marginTop: "auto",
                    marginBottom: "auto",
                    lineHeight: 1.6,
                    padding: "0 16px",
                  }}
                >
                  👋 Hi! Ask me anything about our programs, pricing, or
                  prerequisites. I can also help you figure out which track is
                  right for you.
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    padding: "10px 14px",
                    borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background:
                      msg.role === "user"
                        ? "var(--color-electric)"
                        : "rgba(138, 143, 152, 0.1)",
                    color: msg.role === "user" ? "var(--color-white)" : "var(--color-ink)",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
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
                    padding: "10px 14px",
                    borderRadius: "14px 14px 14px 4px",
                    background: "rgba(138, 143, 152, 0.1)",
                    fontSize: "0.875rem",
                    color: "var(--color-gray)",
                  }}
                >
                  Thinking…
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={sendMessage}
              style={{
                display: "flex",
                gap: "8px",
                padding: "12px 16px",
                borderTop: "1px solid rgba(138, 143, 152, 0.15)",
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                maxLength={500}
                className="input"
                style={{ flex: 1, fontSize: "0.875rem", padding: "10px 14px" }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="button button--primary"
                style={{ padding: "10px 16px", fontSize: "0.875rem" }}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
