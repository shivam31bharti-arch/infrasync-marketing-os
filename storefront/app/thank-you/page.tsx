import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your registration is confirmed.",
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  const titles: Record<string, string> = {
    workshop: "2-Day AI Workshop",
    "ai-generalist": "AI Generalist Accelerator",
    "ai-engineer": "AI Engineer Accelerator",
  };

  const title = product ? titles[product] || product : "your program";

  return (
    <section
      className="section"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div className="container container--narrow">
        <p
          className="label"
          style={{ marginBottom: "var(--space-lg)", color: "var(--color-success)" }}
        >
          Confirmed ✓
        </p>
        <h1 style={{ marginBottom: "var(--space-xl)" }}>
          You&apos;re in.
        </h1>
        <p
          className="muted"
          style={{
            fontSize: "1.25rem",
            marginBottom: "var(--space-2xl)",
            lineHeight: 1.7,
          }}
        >
          Thank you for registering for <strong>{title}</strong>.
          We&apos;ll send a confirmation email with everything you need to
          get started.
        </p>
        <div
          style={{
            display: "flex",
            gap: "var(--space-md)",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="button button--primary">
            Back to Home
          </Link>
          <Link href="/quiz" className="button button--secondary">
            Take the Track-Fit Quiz
          </Link>
        </div>
      </div>
    </section>
  );
}
