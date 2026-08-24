import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Certificate",
  description: "Verify a SkillSync certificate of completion.",
};

async function getCertificate(code: string) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/certificates?cert_no=eq.${encodeURIComponent(code)}&select=*`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;
    const rows = await res.json();
    return rows?.[0] || null;
  } catch {
    return null;
  }
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const cert = await getCertificate(code);

  if (!cert) {
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
            style={{ marginBottom: "var(--space-lg)", color: "var(--color-danger)" }}
          >
            Not Found
          </p>
          <h1 style={{ marginBottom: "var(--space-xl)" }}>
            Certificate not found
          </h1>
          <p
            className="muted"
            style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
          >
            The certificate code <code className="mono">{code}</code> does not
            match any record in our system. Please check the code and try again.
          </p>
        </div>
      </section>
    );
  }

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
          Verified ✓
        </p>
        <h1 style={{ marginBottom: "var(--space-xl)" }}>
          Certificate of Completion
        </h1>
        <div
          style={{
            background: "var(--color-white)",
            border: "1px solid rgba(138, 143, 152, 0.15)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-3xl)",
            marginBottom: "var(--space-2xl)",
          }}
        >
          <p
            className="label"
            style={{ marginBottom: "var(--space-xl)", color: "var(--color-electric)" }}
          >
            SkillSync
          </p>
          <h2 style={{ marginBottom: "var(--space-md)" }}>{cert.student_name}</h2>
          <p
            className="muted"
            style={{ fontSize: "1.125rem", marginBottom: "var(--space-lg)" }}
          >
            has successfully completed
          </p>
          <h3 style={{ marginBottom: "var(--space-lg)", color: "var(--color-electric)" }}>
            {cert.program}
          </h3>
          <hr className="rule" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "var(--space-md)",
            }}
          >
            <div>
              <p className="label">Certificate Code</p>
              <p className="mono" style={{ fontSize: "0.9375rem" }}>
                {cert.cert_no}
              </p>
            </div>
            <div>
              <p className="label">Date Issued</p>
              <p style={{ fontSize: "0.9375rem" }}>
                {new Date(cert.issued_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
        <p
          className="muted"
          style={{ fontSize: "0.8125rem" }}
        >
          This certificate states completion of the program only. It does not
          constitute an accreditation or professional qualification.
        </p>
      </div>
    </section>
  );
}
