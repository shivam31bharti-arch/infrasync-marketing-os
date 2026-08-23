// Loads server-side keys for API routes / server components.
// Priority: process.env (set by host) -> repo root .env (local dev only).
// NEVER expose these values to the client. NEVER commit .env.
import path from "path";
import fs from "fs";

let loaded = false;

export function loadServerEnv(): void {
  if (loaded) return;
  loaded = true;
  const rootEnv = path.resolve(process.cwd(), "..", ".env");
  if (fs.existsSync(rootEnv)) {
    // dotenv is a runtime dep; require lazily so client bundles never include it
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("dotenv").config({ path: rootEnv, override: false });
  }
}

export function serverEnv(name: string): string | undefined {
  loadServerEnv();
  return process.env[name];
}
