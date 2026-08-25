-- SkillSync registrations — one row per Razorpay payment (masterclass/accelerator).
-- Run once in the Supabase SQL editor (project infrasync). Idempotent.
-- Delivery pipeline stamps each stage: cert -> drive -> hubspot -> email.

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  payment_id text unique not null,          -- Razorpay payment id (pay_...)
  email text not null,
  student_name text,
  phone text,
  program text not null default 'workshop', -- workshop | ai_generalist | ai_engineer | accelerator
  amount_inr numeric,                       -- amount in rupees
  paid_at timestamptz,
  session_date date,                        -- which masterclass day this belongs to
  cert_no text,                             -- participation cert (SSC-...)
  drive_granted_at timestamptz,
  hubspot_synced_at timestamptz,
  emailed_at timestamptz,                   -- the 8 PM pack email
  created_at timestamptz not null default now()
);

create index if not exists registrations_email_idx on registrations (email);
create index if not exists registrations_pending_idx on registrations (emailed_at) where emailed_at is null;

alter table registrations enable row level security;
-- service-role key bypasses RLS; no public policies on purpose.
