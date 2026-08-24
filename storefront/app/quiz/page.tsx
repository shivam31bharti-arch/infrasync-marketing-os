"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";

// Deterministic scoring quiz — no LLM, no API at runtime.
// Facts from agent/offers.md: Generalist = non-tech (vibe coding + AI tools),
// Engineer = Python required (AI-augmented engineering, performance, time mgmt).

type Question = {
  id: string;
  text: string;
  options: { label: string; generalist: number; engineer: number }[];
};

const QUESTIONS: Question[] = [
  {
    id: "coding",
    text: "How would you describe your coding experience?",
    options: [
      { label: "I've never written code", generalist: 3, engineer: 0 },
      { label: "I've done a little (HTML, no-code tools, basic scripts)", generalist: 2, engineer: 1 },
      { label: "I can write Python or another language at a basic level", generalist: 1, engineer: 2 },
      { label: "I write code regularly and I'm comfortable with Python", generalist: 0, engineer: 3 },
    ],
  },
  {
    id: "goal",
    text: "What's your primary goal?",
    options: [
      { label: "Use AI tools effectively in my current (non-tech) role", generalist: 3, engineer: 0 },
      { label: "Build apps and automations without a traditional CS background", generalist: 3, engineer: 1 },
      { label: "Integrate AI into my existing development workflow", generalist: 0, engineer: 3 },
      { label: "Level up my engineering skills with AI-augmented techniques", generalist: 0, engineer: 3 },
    ],
  },
  {
    id: "background",
    text: "What best describes your professional background?",
    options: [
      { label: "Marketing, sales, operations, or management", generalist: 3, engineer: 0 },
      { label: "Design, content creation, or freelancing", generalist: 3, engineer: 0 },
      { label: "Student or career-changer exploring tech", generalist: 2, engineer: 1 },
      { label: "Software developer, data analyst, or engineer", generalist: 0, engineer: 3 },
    ],
  },
  {
    id: "comfort",
    text: "How comfortable are you with the command line (terminal)?",
    options: [
      { label: "I've never used it", generalist: 3, engineer: 0 },
      { label: "I've used it a few times but it's not natural", generalist: 2, engineer: 1 },
      { label: "I use it regularly", generalist: 0, engineer: 3 },
    ],
  },
  {
    id: "learning",
    text: "How do you prefer to learn?",
    options: [
      { label: "Guided step-by-step with visual tools", generalist: 2, engineer: 0 },
      { label: "Project-based — show me the outcome and let me build it", generalist: 1, engineer: 1 },
      { label: "Deep-dive docs, code reviews, and architectural thinking", generalist: 0, engineer: 2 },
    ],
  },
  {
    id: "time",
    text: "How many hours per week can you dedicate?",
    options: [
      { label: "5–8 hours", generalist: 1, engineer: 0 },
      { label: "8–15 hours", generalist: 1, engineer: 1 },
      { label: "15+ hours", generalist: 0, engineer: 1 },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [scores, setScores] = useState<{ generalist: number; engineer: number } | null>(null);

  function selectOption(qIndex: number, optIndex: number) {
    const q = QUESTIONS[qIndex];
    const opt = q.options[optIndex];
    const newAnswers = { ...answers, [q.id]: optIndex };
    setAnswers(newAnswers);

    if (qIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrent(qIndex + 1), 300);
    } else {
      // Calculate scores
      let g = 0;
      let e = 0;
      for (const q of QUESTIONS) {
        const idx = newAnswers[q.id];
        if (idx !== undefined) {
          g += q.options[idx].generalist;
          e += q.options[idx].engineer;
        }
      }
      setScores({ generalist: g, engineer: e });

      const recommended = g >= e ? "generalist" : "engineer";
      track({
        name: "quiz_completed",
        props: { recommended_track: recommended, score_generalist: g, score_engineer: e },
      });

      // Save to Supabase via API
      fetch("/api/quiz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers: newAnswers,
          score_generalist: g,
          score_engineer: e,
          recommended_track: recommended,
        }),
      }).catch(() => {
        // Non-blocking — analytics is best-effort
      });
    }
  }

  // Result screen
  if (scores) {
    const recommended = scores.generalist >= scores.engineer ? "generalist" : "engineer";
    const isGeneralist = recommended === "generalist";
    const total = scores.generalist + scores.engineer;
    const pctGeneralist = total > 0 ? Math.round((scores.generalist / total) * 100) : 50;
    const pctEngineer = 100 - pctGeneralist;

    return (
      <section className="section" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <p className="label" style={{ marginBottom: "var(--space-lg)", color: "var(--color-electric)" }}>
            Your result
          </p>
          <h1 style={{ marginBottom: "var(--space-xl)" }}>
            {isGeneralist ? "AI Generalist" : "AI Engineer"}
          </h1>
          <p className="muted" style={{ fontSize: "1.125rem", marginBottom: "var(--space-2xl)", lineHeight: 1.7 }}>
            {isGeneralist
              ? "Based on your background and goals, the AI Generalist Accelerator is the best fit for you. It's designed for professionals without a coding background — learn vibe coding and the modern AI tool stack."
              : "Based on your background and goals, the AI Engineer Accelerator is the best fit for you. It's built for developers with Python — AI-augmented engineering, performance, and productivity."}
          </p>

          {/* Score bar */}
          <div style={{
            display: "flex",
            borderRadius: "var(--radius-full)",
            overflow: "hidden",
            height: 8,
            marginBottom: "var(--space-lg)",
            background: "var(--color-gray-light)",
          }}>
            <div style={{
              width: `${pctGeneralist}%`,
              background: "var(--color-electric)",
              transition: "width 0.5s ease",
            }} />
            <div style={{
              width: `${pctEngineer}%`,
              background: "var(--color-ink)",
              transition: "width 0.5s ease",
            }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-3xl)", fontSize: "0.8125rem" }}>
            <span className="muted">Generalist {pctGeneralist}%</span>
            <span className="muted">Engineer {pctEngineer}%</span>
          </div>

          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="button button--primary button--large"
              onClick={() =>
                router.push(
                  isGeneralist
                    ? "/programs/ai-generalist"
                    : "/programs/ai-engineer"
                )
              }
            >
              Explore the {isGeneralist ? "Generalist" : "Engineer"} Track →
            </button>
            <button
              className="button button--secondary button--large"
              onClick={() => router.push("/workshop")}
            >
              Start with the Workshop — $20
            </button>
          </div>

          <p className="muted" style={{ marginTop: "var(--space-2xl)", fontSize: "0.8125rem" }}>
            Not sure?{" "}
            <button
              onClick={() => { setCurrent(0); setAnswers({}); setScores(null); }}
              style={{ background: "none", border: "none", color: "var(--color-electric)", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", textDecoration: "underline" }}
            >
              Retake the quiz
            </button>
          </p>
        </div>
      </section>
    );
  }

  // Quiz flow
  const q = QUESTIONS[current];
  const progress = ((current) / QUESTIONS.length) * 100;

  return (
    <section className="section" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container container--narrow">
        <p className="label" style={{ marginBottom: "var(--space-lg)" }}>
          Question {current + 1} of {QUESTIONS.length}
        </p>

        {/* Progress bar */}
        <div style={{
          height: 4,
          borderRadius: "var(--radius-full)",
          background: "var(--color-gray-light)",
          marginBottom: "var(--space-3xl)",
          overflow: "hidden",
        }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            background: "var(--color-electric)",
            transition: "width 0.3s ease",
            borderRadius: "var(--radius-full)",
          }} />
        </div>

        <h2 style={{ marginBottom: "var(--space-2xl)" }}>{q.text}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => selectOption(current, i)}
              className={`card ${answers[q.id] === i ? "" : ""}`}
              style={{
                padding: "var(--space-lg) var(--space-xl)",
                textAlign: "left",
                cursor: "pointer",
                border: answers[q.id] === i
                  ? "2px solid var(--color-electric)"
                  : "1px solid rgba(138, 143, 152, 0.2)",
                background: answers[q.id] === i
                  ? "var(--color-electric-dim)"
                  : "var(--color-white)",
                borderRadius: "var(--radius-lg)",
                fontSize: "1rem",
                fontFamily: "var(--font-body)",
                color: "var(--color-ink)",
                transition: "all 0.2s ease",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {current > 0 && (
          <button
            className="button button--ghost"
            onClick={() => setCurrent(current - 1)}
            style={{ marginTop: "var(--space-xl)" }}
          >
            ← Back
          </button>
        )}
      </div>
    </section>
  );
}
