import { notFound } from "next/navigation";

// Mandatory e-commerce disclosures (India): these pages MUST carry real content
// before payments go live. Placeholders are intentionally obvious.
const POLICIES: Record<string, { title: string; sections: { h: string; placeholder: string }[] }> = {
  shipping: {
    title: "Shipping Policy",
    sections: [
      { h: "Delivery zones & timelines", placeholder: "[[SHIPPING_ZONES_AND_DELIVERY_PROMISE]]" },
      { h: "Charges / free-shipping threshold", placeholder: "[[FREE_SHIPPING_THRESHOLD — confirm in agent/offers.md]]" },
      { h: "COD", placeholder: "[[COD_YES_NO — confirm]]" },
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    sections: [
      { h: "Return/exchange window", placeholder: "[[RETURN_WINDOW_DAYS — confirm]]" },
      { h: "Condition & process", placeholder: "[[RETURN_PROCESS]]" },
      { h: "Non-returnable items", placeholder: "Innerwear is non-returnable for hygiene reasons (confirm)." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      { h: "Data we collect", placeholder: "[[PRIVACY_POLICY_TEXT — draft with counsel before launch]]" },
      { h: "Analytics & cookies", placeholder: "We use PostHog (product analytics) and Sentry (error monitoring)." },
    ],
  },
  terms: {
    title: "Terms, Seller Details & Disclosures",
    sections: [
      { h: "Seller legal name & address", placeholder: "[[SELLER_LEGAL_NAME]], [[SELLER_ADDRESS]], [[GSTIN]]" },
      { h: "Country of origin", placeholder: "[[COUNTRY_OF_ORIGIN per product — mandatory disclosure]]" },
      { h: "MRP", placeholder: "All prices displayed are inclusive of taxes and shown against MRP where applicable. [[CONFIRM]]" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) notFound();
  return (
    <>
      <h1>{policy.title}</h1>
      <p><span className="badge">PLACEHOLDER — must be replaced with real content before payments go live</span></p>
      {policy.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          <p className="muted">{s.placeholder}</p>
        </section>
      ))}
    </>
  );
}
