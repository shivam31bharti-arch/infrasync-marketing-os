// Loads server-side keys for API routes / server components.
// Priority: process.env (set by host) -> repo root .env (local dev only).
// NEVER expose these values to the client. NEVER commit .env.
import path from "path";
import fs from "fs";

let loaded = false;

export function loadServerEnv(): void {
  if (loaded) return;
  loaded = true;
  try {
    const rootEnv = path.resolve(process.cwd(), "..", ".env");
    if (fs.existsSync(rootEnv)) {
      // dotenv is a runtime dep; require lazily so client bundles never include it
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("dotenv").config({ path: rootEnv, override: false });
    }
  } catch {
    // No filesystem on some runtimes (e.g. Cloudflare Workers) — env vars
    // come from the platform bindings / build env there. Degrade silently.
  }
}

// Public constants — payment-page URLs are public by definition (they ship in
// page HTML). A same-named env var overrides; hosts without build env still work.
const PUBLIC_DEFAULTS: Record<string, string> = {
  NEXT_PUBLIC_RAZORPAY_WORKSHOP_LINK: "https://rzp.io/rzp/YnzvRKMr",
  NEXT_PUBLIC_RAZORPAY_GENERALIST_LINK: "https://rzp.io/rzp/BZZDx5n",
  NEXT_PUBLIC_RAZORPAY_ENGINEER_LINK: "https://rzp.io/rzp/416AflD",
};

export function serverEnv(name: string): string | undefined {
  loadServerEnv();
  return process.env[name] ?? PUBLIC_DEFAULTS[name];
}
