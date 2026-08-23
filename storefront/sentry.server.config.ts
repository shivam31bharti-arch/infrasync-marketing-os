import * as Sentry from "@sentry/nextjs";
import { loadServerEnv } from "./lib/server-env";

loadServerEnv();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: Boolean(process.env.SENTRY_DSN),
});
