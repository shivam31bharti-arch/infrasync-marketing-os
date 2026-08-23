-- Supabase: marketing data only (orders/customers live in Medusa). Stage 1.
create extension if not exists vector;

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text,
  name text,
  source text,                 -- popup | checkout | whatsapp | instagram | giveaway
  whatsapp_optin boolean default false,
  consent boolean default false,
  segment text default 'new',  -- new|browsed|carted|bought_once|repeat|lapsed
  meta jsonb default '{}',
  embedding vector(768),
  created_at timestamptz default now()
);

create table if not exists touches (
  id uuid primary key default gen_random_uuid(),
  subscriber_id uuid references subscribers(id),
  channel text,                -- email|whatsapp|social
  direction text,              -- in|out
  subject text, body text,
  status text,                 -- draft|approved|sent|delivered|opened|replied
  created_at timestamptz default now()
);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  name text, channel text, angle text, hero_skus text[],
  started_at date, ended_at date,
  results jsonb default '{}'
);

create table if not exists brand_profiles (
  id uuid primary key default gen_random_uuid(),
  name text, tone text, colors jsonb, fonts jsonb,
  audience text, banned_words text[], style_prefix text,
  updated_at timestamptz default now()
);

create table if not exists drafts (
  id uuid primary key default gen_random_uuid(),
  kind text,                   -- ad_brief|email|whatsapp|product_copy|seo_page
  target_id uuid,
  content text, agent_reasoning text,
  approved boolean, reviewed_by text,
  created_at timestamptz default now()
);

-- row level security: enable and add policies before exposing anon keys (Stage 1 task)
