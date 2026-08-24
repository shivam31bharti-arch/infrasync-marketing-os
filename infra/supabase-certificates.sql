-- Certificates (issuer: Outskill). Run in the Supabase SQL editor after supabase-schema.sql.
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  cert_no text unique not null,            -- human code e.g. OSK-2026-0001
  subscriber_id uuid references subscribers(id),
  student_name text not null,
  program text not null,                   -- workshop | ai_generalist | ai_engineer
  cohort text,
  issued_at date not null default current_date,
  emailed_at timestamptz,
  revoked boolean default false,
  meta jsonb default '{}'
);

-- Public verification: anon may read a single cert by cert_no (verify page), nothing else.
alter table certificates enable row level security;
create policy certificates_public_verify on certificates
  for select using (true);
-- (inserts/updates happen server-side with the service role only)
