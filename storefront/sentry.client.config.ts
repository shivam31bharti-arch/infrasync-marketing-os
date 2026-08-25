import * as Sentry from "@sentry/nextjs";

// Public DSN (ships to every browser by design) — literal fallback because Cloudflare's
// build env does not inject NEXT_PUBLIC vars; env override still wins.
const DSN =
  process.env.NEXT_PUBLIC_SENTRY_DSN ||
  "https://fe14373a7127cf471d0dbb77872fe143@o4511961520930816.ingest.us.sentry.io/4511961596428288";

Sentry.init({
  dsn: DSN,
  tracesSampleRate: 0.1,
  enabled: Boolean(DSN),
});
