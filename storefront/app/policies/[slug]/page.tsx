import { notFound } from "next/navigation";

// Mandatory pages before payments go live (agent/offers.md claims policy).
// Placeholders are intentionally obvious — real content required before launch.
const POLICIES: Record<
  string,
  { title: string; sections: { h: string; body: string }[] }
> = {
  refund: {
    title: "Refund Policy",
    sections: [
      {
        h: "Workshop refunds",
        body: "[[REFUND_POLICY — to be confirmed in agent/offers.md before payments go live]]",
      },
      {
        h: "Accelerator refunds",
        body: "[[REFUND_POLICY — to be confirmed in agent/offers.md before payments go live]]",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        h: "Data we collect",
        body: "We collect information you provide when registering for programs: name, email, quiz responses, and payment details (processed by Stripe/Razorpay — we do not store card numbers). We also collect usage data to improve our programs.",
      },
      {
        h: "Analytics & error monitoring",
        body: "We use PostHog (product analytics) and Sentry (error monitoring) to understand how our site is used and to fix issues quickly. No personal data is shared with third parties for advertising.",
      },
      {
        h: "Your rights",
        body: "[[PRIVACY_DETAILED_RIGHTS — draft with counsel before launch]]",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        h: "Service provider",
        body: "Programs are provided by Outskill. Domain: infra-sync.online.",
      },
      {
        h: "Program terms",
        body: "Certificates of completion are issued by Outskill upon program completion. They state completion only — no accreditation claims are made. Program content and schedules may be updated between cohorts.",
      },
      {
        h: "Payment",
        body: "International payments are processed via Stripe in USD. India payments are processed via Razorpay in INR. All prices are as stated on the program pages.",
      },
      {
        h: "Legal details",
        body: "[[SELLER_LEGAL_NAME]], [[SELLER_ADDRESS]], [[GSTIN if applicable]]",
      },
    ],
  },
  contact: {
    title: "Contact & Support",
    sections: [
      {
        h: "Get in touch",
        body: "For program inquiries, registration help, or general questions — reach out and we'll respond within 24 hours.",
      },
      {
        h: "Email",
        body: "[[SUPPORT_EMAIL — to be confirmed]]",
      },
      {
        h: "WhatsApp",
        body: "[[WHATSAPP_SUPPORT_LINK — available after Meta verification]]",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) notFound();
  return (
    <section className="section">
      <div className="container container--narrow">
        <h1 style={{ marginBottom: "var(--space-xl)" }}>{policy.title}</h1>
        <p style={{ marginBottom: "var(--space-3xl)" }}>
          <span className="tbd">
            Some details below are placeholders — they will be finalized
            before payments go live.
          </span>
        </p>
        {policy.sections.map((s) => (
          <div key={s.h} style={{ marginBottom: "var(--space-2xl)" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                marginBottom: "var(--space-md)",
              }}
            >
              {s.h}
            </h2>
            <p
              className="muted"
              style={{ lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{
                __html: s.body.includes("[[")
                  ? `<span class="tbd">${s.body}</span>`
                  : s.body,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
