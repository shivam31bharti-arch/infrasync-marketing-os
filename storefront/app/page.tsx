import V4Home from "@/components/V4Home";
import { loadServerEnv, serverEnv } from "@/lib/server-env";

loadServerEnv(); // root .env (NEXT_PUBLIC_* not auto-loaded outside storefront/)

export default function HomePage() {
  return (
    <V4Home
      workshopLink={serverEnv("NEXT_PUBLIC_RAZORPAY_WORKSHOP_LINK") || null}
      generalistLink={serverEnv("NEXT_PUBLIC_RAZORPAY_GENERALIST_LINK") || null}
      engineerLink={serverEnv("NEXT_PUBLIC_RAZORPAY_ENGINEER_LINK") || null}
      whatsappLink={serverEnv("NEXT_PUBLIC_WHATSAPP_COMMUNITY_LINK") || null}
    />
  );
}
