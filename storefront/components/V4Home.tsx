"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

// v4 single-page site — Antigravity "Auxia warm luxury" design ported 1:1.
// All copy swapped to founder-confirmed facts (agent/offers.md): the workshop
// is PAID ₹1,999/$20 (no fake FREE), no invented learner counts or ratings,
// reviews stay labeled illustrative, mentors "announced soon".

type V4HomeProps = {
  workshopLink: string | null;
  generalistLink: string | null;
  engineerLink: string | null;
};

// Upcoming workshop Saturdays, 10:00 IST (04:30 UTC)
const WORKSHOP_DATES = [
  { label: "Aug 29–30", start: "2026-08-29T04:30:00Z" },
  { label: "Sep 5–6", start: "2026-09-05T04:30:00Z" },
  { label: "Sep 12–13", start: "2026-09-12T04:30:00Z" },
];

function nextWorkshop(now: number) {
  return (
    WORKSHOP_DATES.find((d) => new Date(d.start).getTime() > now) ??
    WORKSHOP_DATES[WORKSHOP_DATES.length - 1]
  );
}

const TOOL_MARQUEE = [
  { name: "ChatGPT", color: "#10a37f", icon: "🤖" },
  { name: "Claude", color: "#d97706", icon: "✳️" },
  { name: "Perplexity", color: "#0284c7", icon: "🔍" },
  { name: "NotebookLM", color: "#4f46e5", icon: "📓" },
  { name: "Make", color: "#7c3aed", icon: "⚙️" },
  { name: "Cursor", color: "#0f172a", icon: "⌨️" },
  { name: "v0 by Vercel", color: "#059669", icon: "▲" },
];

const REVIEWS = [
  {
    quote:
      "The vibe coding day was a revelation. Actually shipped something.",
    author: "Priya K.",
    tag: "Generalist track",
    color: "#4f46e5",
  },
  {
    quote: "Finally, an AI course that isn't just theory slides.",
    author: "Rajesh M.",
    tag: "2-Day Workshop",
    color: "#059669",
  },
  {
    quote: "The AI Engineer capstone broke my brain in the best way.",
    author: "Alex T.",
    tag: "Engineer track",
    color: "#0284c7",
  },
];

const FAQS = [
  {
    q: "How much does the workshop cost?",
    a: "₹1,999 for India, $20 international — one-time payment via Razorpay hosted checkout, no hidden fees. It's two full days: Saturday + Sunday, 10:00 AM–6:00 PM IST, live online.",
  },
  {
    q: "Do I need coding or technical knowledge?",
    a: "No. The 2-Day AI Workshop is built for everyone — day 1 covers hands-on AI fundamentals, and day 2 lets you try sample projects from both accelerator tracks before you choose. The AI Engineer accelerator is the only program that requires Python (basic to intermediate).",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. Workshop attendees receive a verifiable participation certificate with a unique SSC code and a public verification page. Completing an accelerator earns a separate SkillSync certificate of completion.",
  },
  {
    q: "What's the refund policy?",
    a: "The workshop is non-refundable — we state this clearly before you pay. Accelerators include a 4-week money-back window: full refund if you cancel within 4 weeks of your cohort start. Full details on the refund policy page.",
  },
  {
    q: "Is EMI available for the accelerators?",
    a: "Yes — India enrollments can use no-cost EMI over 3, 6, or 10 months via Razorpay (subject to bank approval). The accelerators are ₹95,000 India / $1,200 international; the next cohort starts Sep 15, 2026 with live sessions 7:30–10:30 PM IST plus weekend office hours.",
  },
];

export default function V4Home({
  workshopLink,
  generalistLink,
  engineerLink,
}: V4HomeProps) {
  const [countdown, setCountdown] = useState({ d: "--", h: "--", m: "--", s: "--" });
  const [dateLabel, setDateLabel] = useState(WORKSHOP_DATES[0].label);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const target = nextWorkshop(now);
      setDateLabel(target.label);
      const diff = Math.max(0, new Date(target.start).getTime() - now);
      const pad = (n: number) => String(n).padStart(2, "0");
      setCountdown({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const registerHref = workshopLink ?? "#register";
  const marqueeSet = [...TOOL_MARQUEE, ...TOOL_MARQUEE];

  return (
    <>
      <canvas id="silk-canvas" />
      <div className="bg-mesh-overlay" aria-hidden="true" />

      <div className="page-wrapper">
        {/* 1. Header */}
        <header className="header-nav">
          <a href="#" className="brand-logo">
            <div className="brand-symbol">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="brand-name">SkillSync</span>
          </a>

          <ul className="nav-links">
            <li><a href="#learners">Included</a></li>
            <li><a href="#curriculum">Curriculum</a></li>
            <li><a href="#mentor">Mentors</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#faq">FAQs</a></li>
          </ul>

          <a href="#register" className="btn-header-cta">
            Register — ₹1,999 →
          </a>
        </header>

        {/* 2. Hero */}
        <section className="hero-section container">
          <div className="hero-pill-badge">
            <span className="hero-pill-dot"></span>
            2-DAY LIVE WORKSHOP · {dateLabel.toUpperCase()} · 10 AM–6 PM IST
          </div>

          <h1 className="hero-h1">
            Stop watching AI happen. <br />
            <span className="gradient-ai">Start building with it.</span>
          </h1>

          <p className="hero-sub">
            Live, hands-on AI education by SkillSync. Two days of building —
            then accelerate into the Generalist or Engineer track. Cohort-based,
            no fluff, no recycled theory slides.
          </p>

          <div className="hero-action-box">
            <a href="#register" className="btn-main-hero">
              Register — ₹1,999 India / $20 International →
            </a>

            <div className="hero-rating-proof">
              <div className="rating-item">
                <span>🗓️</span>
                <span>
                  <strong>Next dates:</strong> Aug 29–30 · Sep 5–6 · Sep 12–13
                </span>
              </div>
              <div className="rating-item">
                <span>🎓</span>
                <span>
                  <strong>Verifiable certificates</strong> with public lookup
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Included marquee (tools, not fake learners — claims policy) */}
        <section className="learners-marquee-section container" id="learners">
          <div className="learners-wrapper-card tilt-card" data-tilt="4">
            <div className="specular-sheen"></div>

            <div className="learners-content">
              <h2>Hands-on from hour one</h2>
              <p>
                Every seat includes session recordings by 7 PM, notes &amp; tool
                setup guides, our prompt library, and reminder concierge — you
                build with the real tool stack:
              </p>

              <div className="marquee-container">
                <div className="marquee-track">
                  {marqueeSet.map((tool, i) => (
                    <div className="learner-card learner-card--tool" key={i}>
                      <span aria-hidden="true">{tool.icon}</span>
                      <span
                        className="learner-logo-badge"
                        style={{ color: tool.color }}
                      >
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rating-deck-card tilt-card" data-tilt="6">
              <div className="specular-sheen"></div>
              <div className="deck-top-layer"></div>
              <div className="deck-mid-layer"></div>

              <div className="deck-content">
                <div className="google-badge-row">
                  <div className="google-icon-circle">S</div>
                  <div className="google-review-text">
                    <h4>Verifiable Certificates</h4>
                    <p>Unique SSC codes · public verify page</p>
                  </div>
                </div>
                <div
                  className="hero-pill-badge"
                  style={{ margin: "0.5rem 0 0 0", padding: "0.3rem 0.8rem", fontSize: "0.72rem" }}
                >
                  <span>💳 No-cost EMI on accelerators — 3 / 6 / 10 months</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Workshop registration stage */}
        <div className="hero-preview-stage container tilt-card" data-tilt="3" id="register">
          <div className="specular-sheen"></div>

          <div className="stage-left">
            <div>
              <span className="stage-badge">⚡ 2-DAY HANDS-ON WORKSHOP</span>
              <h2 className="stage-title">
                Zero fluff. Build real AI systems in one weekend.
              </h2>
              <ul className="stage-perks">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Day 1: hands-on AI fundamentals — you build something real before the day ends</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Day 2: sample projects from both accelerator tracks — find where you fit</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Recordings by 7 PM same day, plus notes, tool setup guides &amp; prompt library</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span>Verifiable participation certificate with public SSC lookup</span>
                </li>
              </ul>
            </div>

            <div className="stage-mentor-badge">
              <div className="mentor-silhouette mentor-silhouette--small" aria-hidden="true" />
              <div className="mentor-text">
                <h4>SkillSync Mentor Team</h4>
                <p>Live instructors · profiles announced soon</p>
              </div>
            </div>
          </div>

          <div className="stage-right">
            <div className="timer-title">NEXT WORKSHOP ({dateLabel.toUpperCase()}) BEGINS IN</div>
            <div className="countdown-grid">
              <div className="time-card">
                <div className="time-num">{countdown.d}</div>
                <div className="time-lbl">Days</div>
              </div>
              <div className="time-card">
                <div className="time-num">{countdown.h}</div>
                <div className="time-lbl">Hours</div>
              </div>
              <div className="time-card">
                <div className="time-num">{countdown.m}</div>
                <div className="time-lbl">Mins</div>
              </div>
              <div className="time-card">
                <div className="time-num">{countdown.s}</div>
                <div className="time-lbl">Secs</div>
              </div>
            </div>

            <div className="price-honest-row">
              <span className="price-honest-main">₹1,999</span>
              <span className="price-honest-sub">$20 international · one-time</span>
            </div>

            {workshopLink ? (
              <a
                href={workshopLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-main-hero"
                style={{ width: "100%", justifyContent: "center", fontSize: "1.1rem", padding: "1.1rem 1.5rem" }}
              >
                Register Now →
              </a>
            ) : (
              <button
                className="btn-main-hero"
                style={{ width: "100%", justifyContent: "center", fontSize: "1.1rem", padding: "1.1rem 1.5rem", opacity: 0.7 }}
                disabled
              >
                Registration opens soon
              </button>
            )}
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.75rem", lineHeight: 1.5 }}>
              Workshop bookings are <strong>non-refundable</strong>. By
              registering you agree to receive session reminders by call, email
              &amp; WhatsApp.
            </p>
          </div>
        </div>

        {/* 5. Curriculum */}
        <section className="curriculum-section container" id="curriculum">
          <span className="section-label" style={{ textAlign: "center" }}>HANDS-ON CURRICULUM</span>
          <h2 className="section-h2" style={{ textAlign: "center" }}>
            From First Prompt to Shipped Project
          </h2>
          <p className="section-desc" style={{ textAlign: "center" }}>
            Live, interactive building sessions — the workshop is your entry
            point, then pick your accelerator track.
          </p>

          <div className="tools-grid">
            <div className="tool-card tilt-card" data-tilt="5">
              <div className="specular-sheen"></div>
              <div>
                <div className="tool-icon-wrap">🧠</div>
                <div className="tool-tag">WORKSHOP · DAY 1</div>
                <h3 className="tool-title">AI Fundamentals, Hands-on</h3>
                <p className="tool-desc">How modern AI actually works, where it helps, where it fails — and how to prompt it for reliable output. You build before dinner.</p>
              </div>
              <div className="tool-pill-list">
                <span className="tool-pill">ChatGPT</span>
                <span className="tool-pill">Claude</span>
                <span className="tool-pill">Perplexity</span>
              </div>
            </div>

            <div className="tool-card tilt-card" data-tilt="5">
              <div className="specular-sheen"></div>
              <div>
                <div className="tool-icon-wrap">🧭</div>
                <div className="tool-tag">WORKSHOP · DAY 2</div>
                <h3 className="tool-title">Choose Your Path</h3>
                <p className="tool-desc">Work through sample projects from both accelerator tracks and leave with a clear recommendation for where you fit.</p>
              </div>
              <div className="tool-pill-list">
                <span className="tool-pill">Generalist</span>
                <span className="tool-pill">Engineer</span>
                <span className="tool-pill">Track-fit quiz</span>
              </div>
            </div>

            <div className="tool-card tilt-card" data-tilt="5">
              <div className="specular-sheen"></div>
              <div>
                <div className="tool-icon-wrap">💻</div>
                <div className="tool-tag">GENERALIST TRACK</div>
                <h3 className="tool-title">Vibe Coding with AI Builders</h3>
                <p className="tool-desc">Build functional software with AI assistants — no traditional coding skills required. Describe, iterate, ship.</p>
              </div>
              <div className="tool-pill-list">
                <span className="tool-pill">v0</span>
                <span className="tool-pill">Bolt.new</span>
                <span className="tool-pill">Cursor</span>
              </div>
            </div>

            <div className="tool-card tilt-card" data-tilt="5">
              <div className="specular-sheen"></div>
              <div>
                <div className="tool-icon-wrap">⚙️</div>
                <div className="tool-tag">GENERALIST TRACK</div>
                <h3 className="tool-title">Automations &amp; AI for Work</h3>
                <p className="tool-desc">Automations without code, plus AI for content, marketing, and data — the highest-leverage skills for non-tech roles.</p>
              </div>
              <div className="tool-pill-list">
                <span className="tool-pill">Make</span>
                <span className="tool-pill">NotebookLM</span>
                <span className="tool-pill">AI workflows</span>
              </div>
            </div>

            <div className="tool-card tilt-card" data-tilt="5">
              <div className="specular-sheen"></div>
              <div>
                <div className="tool-icon-wrap">🤖</div>
                <div className="tool-tag">ENGINEER TRACK · PYTHON REQUIRED</div>
                <h3 className="tool-title">Agents, Tool Use &amp; RAG</h3>
                <p className="tool-desc">AI-assisted dev workflows, agents that plan and call tools, RAG fundamentals, and testing &amp; shipping AI code safely.</p>
              </div>
              <div className="tool-pill-list">
                <span className="tool-pill">Agents</span>
                <span className="tool-pill">RAG</span>
                <span className="tool-pill">Shipping</span>
              </div>
            </div>

            <div className="tool-card tilt-card" data-tilt="5">
              <div className="specular-sheen"></div>
              <div>
                <div className="tool-icon-wrap">🚀</div>
                <div className="tool-tag">BOTH TRACKS</div>
                <h3 className="tool-title">Capstone: Ship Something Real</h3>
                <p className="tool-desc">Every accelerator ends with a project you design and build yourself — a real thing you made, not a certificate of attendance.</p>
              </div>
              <div className="tool-pill-list">
                <span className="tool-pill">Build</span>
                <span className="tool-pill">Demo</span>
                <span className="tool-pill">Certify</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2.5rem" }}>
            {generalistLink ? (
              <a href={generalistLink} target="_blank" rel="noopener noreferrer" className="btn-main-hero" style={{ fontSize: "0.95rem" }}>
                Enroll Generalist — ₹95,000 →
              </a>
            ) : null}
            {engineerLink ? (
              <a href={engineerLink} target="_blank" rel="noopener noreferrer" className="btn-header-cta" style={{ fontSize: "0.95rem" }}>
                Enroll Engineer (Python) — ₹95,000 →
              </a>
            ) : null}
          </div>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "0.9rem" }}>
            $1,200 international · next cohort Sep 15, 2026 · live 7:30–10:30 PM
            IST + weekend office hours · no-cost EMI 3/6/10 months · full refund
            within 4 weeks of cohort start
          </p>
        </section>

        {/* 6. Reviews (illustrative — claims policy) */}
        <section className="reviews-section container" id="reviews">
          <span className="section-label" style={{ textAlign: "center" }}>STUDENT VOICES</span>
          <h2 className="section-h2" style={{ textAlign: "center" }}>
            What our students say
          </h2>
          <p className="compliance-caption">
            Illustrative reviews — real student stories publish after our first
            cohorts.
          </p>

          <div className="reviews-grid">
            {REVIEWS.map((r) => (
              <div className="review-card tilt-card" data-tilt="5" key={r.author}>
                <div className="specular-sheen"></div>
                <div>
                  <div className="review-top-row">
                    <div className="review-stars">★★★★★</div>
                    <span className="hike-badge">{r.tag}</span>
                  </div>
                  <p className="review-quote">&ldquo;{r.quote}&rdquo;</p>
                </div>
                <div className="review-user">
                  <div className="avatar-initials" style={{ background: r.color }}>
                    {r.author.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <div className="user-meta">
                    <h4>{r.author}</h4>
                    <p>{r.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Mentors */}
        <section className="mentor-section container" id="mentor">
          <div className="mentor-profile-card tilt-card" data-tilt="3">
            <div className="specular-sheen"></div>

            <div className="mentor-visual-box">
              <div className="mentor-silhouette" aria-hidden="true" />
              <div className="stage-badge">👥 LIVE INSTRUCTORS</div>
            </div>

            <div className="mentor-details">
              <h3>SkillSync Mentor Team</h3>
              <div className="mentor-role">Instructor profiles announced soon</div>
              <p>
                Every session is taught live by practitioners who build with AI
                daily. No pre-recorded lectures — real screens, real projects,
                real questions answered in the room.
              </p>

              <div className="mentor-stats-row">
                <div className="m-stat">
                  <h4>2 days</h4>
                  <p>Hands-on workshop</p>
                </div>
                <div className="m-stat">
                  <h4>₹1,999</h4>
                  <p>Entry price · $20 intl</p>
                </div>
                <div className="m-stat">
                  <h4>Sep 15</h4>
                  <p>Next cohort starts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="faq-section container" id="faq">
          <span className="section-label" style={{ textAlign: "center" }}>GOT QUESTIONS?</span>
          <h2 className="section-h2" style={{ textAlign: "center" }}>
            Frequently Asked Questions
          </h2>

          <div className="faq-accordion">
            {FAQS.map((f, i) => (
              <div className={`faq-item${openFaq === i ? " active" : ""}`} key={f.q}>
                <div
                  className="faq-header"
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenFaq(openFaq === i ? -1 : i);
                    }
                  }}
                >
                  <span>{f.q}</span>
                  <span className="faq-toggle-icon">+</span>
                </div>
                <div className="faq-content">{f.a}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            More questions? Use the chat bubble — or request a callback and our
            counselor phones you right away.
          </p>
        </section>

        {/* 9. Footer */}
        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <h3>SkillSync</h3>
                <p>
                  Live, cohort-based AI education. Learn by building — from a
                  weekend workshop to accelerator tracks with verifiable
                  certificates.
                </p>
              </div>

              <div className="footer-col">
                <h4>Programs</h4>
                <ul className="footer-links">
                  <li><a href="#register">2-Day AI Workshop</a></li>
                  <li><a href="#curriculum">AI Generalist Accelerator</a></li>
                  <li><a href="#curriculum">AI Engineer Accelerator</a></li>
                  <li><Link href="/quiz">Track-fit Quiz</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Company</h4>
                <ul className="footer-links">
                  <li><Link href="/policies/refund">Refund Policy</Link></li>
                  <li><Link href="/policies/privacy">Privacy Policy</Link></li>
                  <li><Link href="/policies/terms">Terms of Service</Link></li>
                  <li><Link href="/policies/contact">Contact Support</Link></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2026 SkillSync. All rights reserved.</p>
              <p>Live, cohort-based AI education · facts, not hype</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Sticky conversion bar */}
      <div className={`sticky-bar${stickyVisible ? " visible" : ""}`} id="sticky-bar">
        <div className="sticky-info">
          <span className="stage-badge" style={{ margin: 0 }}>⚡ LIVE {dateLabel.toUpperCase()}</span>
          <span className="sticky-title">2-Day AI Workshop — hands-on, live online</span>
          <span className="sticky-price">₹1,999 / $20</span>
        </div>

        <a
          href={registerHref}
          {...(workshopLink
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="btn-main-hero"
          style={{ padding: "0.75rem 1.85rem", fontSize: "0.95rem" }}
        >
          Register Now →
        </a>
      </div>

      <Script src="/v4-silk.js" strategy="afterInteractive" />
    </>
  );
}
