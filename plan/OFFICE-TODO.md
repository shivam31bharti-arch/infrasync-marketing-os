# Founder TODO — office session (2026-08-25) · repo at 6b4e058

Read this from GitHub at the office. Every task in §1–§3 is **browser-only** — no repo
clone, no secrets carried. Home-PC tasks are in §4. AI-model prompt in §5.

---

## 1. Cloudflare go-live (~15 min, the big one)

1. dash.cloudflare.com → log in → **Workers & Pages → Create → Import a repository**
2. Connect GitHub → pick `shivam31bharti-arch/infrasync-marketing-os`
3. Settings on the import screen:
   - Project name: `skillsync-site`
   - **Root directory: `storefront`**
   - Build command: `npx opennextjs-cloudflare build`
   - Deploy command: `npx opennextjs-cloudflare deploy`
4. Environment variables — add these PUBLIC ones verbatim (they ship to browsers anyway):
   - `NEXT_PUBLIC_RAZORPAY_WORKSHOP_LINK` = `https://rzp.io/rzp/YnzvRKMr`
   - `NEXT_PUBLIC_RAZORPAY_GENERALIST_LINK` = `https://rzp.io/rzp/BZZDx5n`
   - `NEXT_PUBLIC_RAZORPAY_ENGINEER_LINK` = `https://rzp.io/rzp/416AflD`
   - `NEXT_PUBLIC_POSTHOG_PROJECT_KEY` = `phc_kNMTjQATm79Vr3iNCNGAnVEyAMPL6T3Uc6QVzTMPcZXm`
   - `NEXT_PUBLIC_SENTRY_DSN` = `https://fe14373a7127cf471d0dbb77872fe143@o4511961520930816.ingest.us.sentry.io/4511961596428288`
   - `SITE_URL` = `https://infra-sync.online`
5. SECRET env vars — fetch each from its own dashboard (never from chat/files), mark as
   Secret in Cloudflare:
   - `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` → supabase.com → project `infrasync` →
     Settings → API
   - `GROQ_API_KEY` → console.groq.com → API Keys (create new if not visible)
   - `GEMINI_API_KEY` → aistudio.google.com → Get API key
   - `NVIDIA_API_KEY` → build.nvidia.com → your key
   (If a key can't be retrieved at office, deploy anyway — site works; only /api/chat
   degrades until keys land. Add them later, redeploy is automatic on save.)
6. **Deploy** → wait for green build (first build ~3–5 min)
7. Project → **Settings → Domains & Routes → Add custom domain** → `infra-sync.online`
   (zone already on Cloudflare — attaches instantly). Add `www.infra-sync.online` too.
8. Open https://infra-sync.online → check home, /workshop, a payment button, /quiz.
9. Tell the AI model (§5) "cloudflare is live" so it runs the production smoke tests.

## 2. OmniDimension KB upload (2 min)
- Download `agent/skillsync-kb.pdf` from the GitHub repo (Raw → save)
- omnidim.io (DEDICATED account) → your Course Counselor agent → **Knowledge Base tab** →
  upload the PDF → attach with instruction: "Use these documents to answer program,
  pricing, schedule, and prerequisite questions. If the answer is not in them, say the
  team will follow up."

## 3. Optional cloud tasks (if time at office)
- Razorpay: continue KYC in background (free — needs PAN + bank details)
- HubSpot: Deals board → create 2–3 demo deals by hand (e.g. "Karan Patel — Generalist
  ₹95,000", stage Enrolled) so the pipeline view looks alive
- Test payment record: pay any payment page with test card 4111 1111 1111 1111 (12/28,
  CVV 123) — NEVER a real card in test flows

## 4. At home tonight (needs the home-PC .env)
1. Brevo dashboard → profile menu → SMTP & API → **SMTP tab** → copy the **Login**
   (format `NNNNNNN@smtp-brevo.com`) + **Generate a new SMTP key** (starts `xsmtpsib-`)
2. `notepad D:\MArketing\.env` → set `BREVO_SMTP_USER=<that login>`,
   `BREVO_SMTP_PASS=<new key>`, add line `FOUNDER_EMAIL=<your gmail>` → Ctrl+S
3. Tell the AI model "brevo fixed" → it runs `node scripts/certificate.mjs --test` →
   expect `[3/3] emailed` + certificate lands in YOUR inbox → it proves /verify page.

## 5. Prompt for ANY AI model (Opus 4.6 / Kimi / other — paste as-is)

```
Read prompts/START-HERE.md, then execute prompts/day-shift-opus.md top to bottom.
Task 1 (certificate email) is blocked until the founder says "brevo fixed"; task 2
(production smoke tests) until the founder says "cloudflare is live". If a task is
blocked, skip forward (design loop = task 3) and return to it later. Checkpoint after
every task: evidence → BUILD-LOG entry with resume line → commit → push. Never claim
done without proof. Facts come only from agent/offers.md — if one is missing, ask.
```

---
Current truth lives in BUILD-LOG.md (tail) · business facts in agent/offers.md ·
machine state in knowledge/context.md. Nothing above needs the home PC except §4.
