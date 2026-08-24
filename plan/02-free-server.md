# Stage 2 — The ₹0 server (Week 2)

**Objective:** a free, always-on server running the email campaign manager and the social
scheduler behind HTTPS subdomains. (Medusa was retired in pivot #3 — no commerce backend;
payments are Stripe/Razorpay hosted links.)

**Definition of done:** `news.infra-sync.online` (Listmonk) and `social.infra-sync.online`
(Postiz) load over HTTPS · a test email from Listmonk lands in a Gmail **inbox** · one post
scheduled from Postiz actually publishes.

## 1. Get the Oracle Always-Free VM (the only fiddly step)
- Shape: **VM.Standard.A1.Flex — 4 OCPU, 24 GB RAM, 200 GB** · Ubuntu 24.04 (ARM)
- **Home region is permanent.** Indian regions are often out of ARM capacity — retry daily,
  or pick Singapore (~35–60ms from India, fine for these tools)
- Card is identity-verification only; stay on Always-Free resources
- [ ] VCN ingress: TCP 80 + 443 (+22 SSH) · [ ] cron heartbeat (Oracle reclaims idle VMs)

## 2. Docker + reverse proxy
- [ ] `sudo apt install docker.io docker-compose-v2` · Caddy for auto-HTTPS
- [ ] Cloudflare DNS: `A` records `news`, `social` (+ `n8n` if used) → VPS IP, proxy ON
- [ ] Deploy `infra/Caddyfile` + `infra/docker-compose.yml` with `../.env` values

## 3. Configure
- [ ] **Listmonk**: SMTP = Brevo creds (already in .env); sender `hello@mail.infra-sync.online`;
  verify SPF/DKIM pass via Gmail "Show original"
- [ ] **Postiz**: connect Instagram, YouTube, LinkedIn, X, Facebook; test one post
- [ ] (Optional) n8n container — flows come in Stage 4–5

## 4. Backups (non-negotiable)
- [ ] Nightly `pg_dump` (listmonk + postiz DBs) → encrypt → private GitHub repo or Supabase
  Storage · test one restore before ticking this stage

**Next →** [03-ugc-factory.md](03-ugc-factory.md)
