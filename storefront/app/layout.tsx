import type { Metadata } from "next";
import "./globals.css";
import "./v4.css";
import PostHogInit from "@/components/PostHogInit";
import SubscriberPopup from "@/components/SubscriberPopup";
import ChatWidget from "@/components/ChatWidget";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv(); // root .env (NEXT_PUBLIC_* not auto-loaded outside storefront/)

export const metadata: Metadata = {
  title: {
    default: "SkillSync — Learn to Build with AI",
    template: "%s · SkillSync",
  },
  description:
    "Live, hands-on AI education. Start with the 2-Day AI Workshop (₹1,999 India · $20 international), then accelerate into the AI Generalist or AI Engineer track. Cohort-based, no fluff.",
  openGraph: { siteName: "SkillSync" },
};

// v4 (design-v4, 2026-08-26): single-page site — the homepage owns its own
// header/footer/sticky-bar; utility routes get the dark chrome from
// app/(utility)/layout.tsx. Root layout stays minimal.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <PostHogInit />
        <main id="main-content" role="main">
          {children}
        </main>
        <ChatWidget
          whatsappLink={serverEnv("NEXT_PUBLIC_WHATSAPP_COMMUNITY_LINK") || null}
        />
        <SubscriberPopup
          whatsappLink={serverEnv("NEXT_PUBLIC_WHATSAPP_COMMUNITY_LINK") || null}
        />
      </body>
    </html>
  );
}
