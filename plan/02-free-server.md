# Stage 2 — The ₹0 server (Week 2)

**Objective:** a free, always-on server running the commerce backend, the email campaign
manager, and the social scheduler behind HTTPS subdomains.

**Definition of done:** `admin.infra-sync.online` (Medusa Admin), `api.infra-sync.online`
(Medusa API), `news.infra-sync.online` (Listmonk), `social.infra-sync.online` (Postiz) all
load over HTTPS · the storefront fetches products from the API · a test email from Listmonk
lands in a Gmail **inbox** (not spam) · one post scheduled from Postiz actually publishes.

## 1. Get the Oracle Always-Free VM (the only fiddly step)

- Shape: **VM.Standard.A1.Flex — 4 OCPU, 24 GB RAM, 200 GB storage** (the full free allotment in one VM)
- OS: Ubuntu 24.04 (aarch64/ARM)
- **Home region is permanent.** Indian regions (Mumbai/Hyderabad) are often out of ARM
  capacity — "Out of capacity" is normal, not an account problem. Options:
  - Retry daily (capacity frees up), or
  - Pick Singapore as home region for easier capacity (~35–60ms from India — fine for these tools)
- Card is required for identity verification; Always-Free resources are never charged.
  Stay on the "Always Free" resources only — don't upgrade to PAYG unless you accept the risk.
- [ ] VCN ingress rules: open TCP 80 + 443 (and keep 22 for SSH)
- [ ] Keep the instance busy (a cron heartbeat is enough) — Oracle reclaims *idle* free instances

## 2. Docker + reverse proxy

- [ ] `sudo apt install docker.io docker-compose-v2` · add user to `docker` group
- [ ] Caddy as reverse proxy (automatic HTTPS, zero config pain)
- [ ] Cloudflare DNS: `A` records for `admin`, `api`, `news`, `social` (+ `n8n` if used) → VPS IP, proxy ON

`infra/Caddyfile`:
```
api.infra-sync.online    { reverse_proxy medusa:9000 }
admin.infra-sync.online  { reverse_proxy medusa:9000 }
news.infra-sync.online   { reverse_proxy listmonk:9000 }
social.infra-sync.online { reverse_proxy postiz:5000 }
```

`infra/docker-compose.yml` (sketch — pin versions when deploying):
```yaml
services:
  caddy:
    image: caddy:2
    ports: ["80:80", "443:443"]
    volumes: ["./Caddyfile:/etc/caddy/Caddyfile", "caddy_data:/data"]

  db:                       # one Postgres for all apps, separate databases
    image: postgres:16
    environment: { POSTGRES_PASSWORD: "${PG_PASS}" }
    volumes: ["pg_data:/var/lib/postgresql/data"]

  redis:
    image: redis:7

  medusa:                   # Medusa v2 backend + Admin (build from the medusa/ app folder)
    build: ../medusa
    environment:
      DATABASE_URL: "postgres://postgres:${PG_PASS}@db/medusa"
      REDIS_URL: "redis://redis"
      STORE_CORS: "https://infra-sync.online"
      ADMIN_CORS: "https://admin.infra-sync.online"
      JWT_SECRET: "${JWT_SECRET}"
      COOKIE_SECRET: "${COOKIE_SECRET}"
    volumes: ["medusa_uploads:/app/uploads"]

  listmonk:
    image: listmonk/listmonk:latest
    environment: { LISTMONK_db__host: db, LISTMONK_db__password: "${PG_PASS}" }

  postiz:
    image: ghcr.io/gitroomhq/postiz-app:latest
    environment: { DATABASE_URL: "postgres://postgres:${PG_PASS}@db/postiz", REDIS_URL: "redis://redis" }

volumes: { caddy_data: {}, pg_data: {}, medusa_uploads: {} }
```
(Product images: Medusa's local upload volume to start; move to Cloudflare R2 free tier
(10 GB) when the catalog grows.)

## 3. Configure the apps

- [ ] **Medusa**: create admin user; regions (INR/USD), shipping options, tax; payment plugin in
  test mode (Razorpay / Stripe); publishable API key for the storefront
- [ ] **Listmonk**: SMTP = Brevo credentials; sender = `hello@mail.infra-sync.online`; verify
  SPF/DKIM pass (Gmail "Show original"); import zero contacts yet
- [ ] **Postiz**: connect Instagram, Facebook, Pinterest, YouTube (+ X/LinkedIn if used); test one post
- [ ] (Optional) **n8n** container now, flows come in Stage 4–5

## 4. Backups (non-negotiable)

- [ ] Nightly cron: `pg_dump` all databases + Medusa uploads → encrypt → push to a **private**
  GitHub repo or Supabase Storage (free). Test one restore before calling Stage 2 done.

**Next →** [03-ugc-factory.md](03-ugc-factory.md)
