/**
 * qa/snap.mjs — Design-loop screenshot + console-error capture
 * Usage: node qa/snap.mjs <iteration-number>
 *
 * Captures full-page screenshots of key routes at 1440×900 (desktop) and
 * 390×844 (mobile emulation), plus dumps any console errors to a text file.
 * Output: qa/shots/iter-<N>/
 */

import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const ITER = process.argv[2] || "0";
const PORT = process.env.PORT || "3000";
const BASE = `http://localhost:${PORT}`;
const OUT_DIR = join(import.meta.dirname, "shots", `iter-${ITER}`);

const ROUTES = [
  { path: "/", name: "home" },
  { path: "/workshop", name: "workshop" },
  { path: "/programs/ai-generalist", name: "ai-generalist" },
  { path: "/programs/ai-engineer", name: "ai-engineer" },
  { path: "/quiz", name: "quiz" },
];

const VIEWPORTS = [
  { width: 1440, height: 900, suffix: "desktop" },
  { width: 390, height: 844, suffix: "mobile", isMobile: true },
];

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const allErrors = [];

  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile || false,
        deviceScaleFactor: vp.isMobile ? 2 : 1,
      });
      const page = await context.newPage();

      const pageErrors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          pageErrors.push(`[${route.path}][${vp.suffix}] ${msg.text()}`);
        }
      });
      page.on("pageerror", (err) => {
        pageErrors.push(`[${route.path}][${vp.suffix}] PAGE_ERROR: ${err.message}`);
      });
      page.on("response", (resp) => {
        if (resp.status() >= 400) {
          pageErrors.push(`[${route.path}][${vp.suffix}] HTTP_${resp.status()}: ${resp.url()}`);
        }
      });

      const url = `${BASE}${route.path}`;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
        // Wait a bit for any animations
        await page.waitForTimeout(500);
      } catch (e) {
        pageErrors.push(`[${route.path}][${vp.suffix}] NAVIGATION_ERROR: ${e.message}`);
      }

      const filename = `${route.name}-${vp.suffix}.png`;
      await page.screenshot({
        path: join(OUT_DIR, filename),
        fullPage: true,
      });

      allErrors.push(...pageErrors);
      await context.close();
      console.log(`  ✓ ${filename}`);
    }
  }

  // Write console errors
  const errFile = join(OUT_DIR, "console.txt");
  if (allErrors.length > 0) {
    writeFileSync(errFile, allErrors.join("\n") + "\n");
    console.log(`\n⚠ ${allErrors.length} console error(s) — see ${errFile}`);
  } else {
    writeFileSync(errFile, "No console errors.\n");
    console.log("\n✓ Zero console errors.");
  }

  await browser.close();
  console.log(`\nScreenshots saved to: ${OUT_DIR}`);
}

main().catch((e) => {
  console.error("snap.mjs failed:", e);
  process.exit(1);
});
