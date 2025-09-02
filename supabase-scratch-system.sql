-- UUID util
create extension if not exists "pgcrypto";

-- 1) Tickets à gratter utilisateur
create table if not exists public.user_scratch_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null default 'quiz' check (source in ('quiz','admin','promo')),
  source_id uuid,
  campaign_id uuid, -- optionnel pour éviter les erreurs FK
  reward_type text not null check (reward_type in ('points','coupon')),
  reward_amount integer,
  reward_label text,
  status text not null default 'pending' check (status in ('pending','revealed','consumed')),
  created_at timestamptz not null default now(),
  revealed_at timestamptz
);
create index if not exists idx_user_scratch_tickets_user_status on public.user_scratch_tickets(user_id, status);

alter table public.user_scratch_tickets enable row level security;

-- Politiques RLS (créées si absentes)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_scratch_tickets' AND policyname = 'scratch_select_own'
  ) THEN
    create policy scratch_select_own on public.user_scratch_tickets for select using (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_scratch_tickets' AND policyname = 'scratch_insert_own'
  ) THEN
    create policy scratch_insert_own on public.user_scratch_tickets for insert with check (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'user_scratch_tickets' AND policyname = 'scratch_update_own'
  ) THEN
    create policy scratch_update_own on public.user_scratch_tickets for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
  END IF;
END$$;

-- 2) Ledger de points minimal
create table if not exists public.points_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('quiz','scratch','admin')),
  ref_id uuid,
  value integer not null,
  label text,
  created_at timestamptz not null default now()
);
create index if not exists idx_points_ledger_user on public.points_ledger(user_id);

alter table public.points_ledger enable row level security;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'points_ledger' AND policyname = 'points_select_own'
  ) THEN
    create policy points_select_own on public.points_ledger for select using (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'points_ledger' AND policyname = 'points_insert_own'
  ) THEN
    create policy points_insert_own on public.points_ledger for insert with check (auth.uid() = user_id);
  END IF;
END$$;

-- 3) Vue de total de points (lecture via RPC conseillé)
create or replace view public.user_points as
select u.id as user_id, coalesce(sum(p.value),0) as points
from auth.users u
left join public.points_ledger p on p.user_id = u.id
group by u.id;

-- 4) RPC : récupérer le ticket en attente
create or replace function public.get_pending_scratch()
returns public.user_scratch_tickets
language sql
security definer
set search_path = public
as $$
  select * from public.user_scratch_tickets
  where user_id = auth.uid() and status = 'pending'
  order by created_at desc
  limit 1;
$$;

-- 5) RPC : accorder un ticket après un quiz
create or replace function public.grant_scratch_after_quiz(
  p_quiz_id uuid,
  p_points int default 50,
  p_label text default '+50 points'
)
returns public.user_scratch_tickets
language plpgsql
security definer
set search_path = public
as $$
declare v_ticket public.user_scratch_tickets;
begin
  insert into public.user_scratch_tickets(user_id, source, source_id, reward_type, reward_amount, reward_label, status)
  values (auth.uid(), 'quiz', p_quiz_id, 'points', p_points, p_label, 'pending')
  returning * into v_ticket;
  return v_ticket;
end;$$;

-- 6) RPC : révéler un ticket (et créditer les points)
create or replace function public.reveal_scratch(p_ticket_id uuid)
returns public.user_scratch_tickets
language plpgsql
security definer
set search_path = public
as $$
declare v_ticket public.user_scratch_tickets;
begin
  update public.user_scratch_tickets
     set status = 'revealed', revealed_at = now()
   where id = p_ticket_id
     and user_id = auth.uid()
     and status = 'pending'
  returning * into v_ticket;

  if not found then
    raise exception 'No pending ticket to reveal';
  end if;

  if v_ticket.reward_type = 'points' and v_ticket.reward_amount is not null then
    insert into public.points_ledger(user_id, kind, ref_id, value, label)
    values (v_ticket.user_id, 'scratch', v_ticket.id, v_ticket.reward_amount, coalesce(v_ticket.reward_label, 'Scratch reward'));
  end if;

  return v_ticket;
end;$$;

-- 7) RPC : récupérer le total de points
create or replace function public.get_my_points()
returns int language sql security definer set search_path = public as $$
  select coalesce(sum(value),0)::int from public.points_ledger where user_id = auth.uid();
$$;

-- Droits d'exécution (authentifié)
grant execute on function public.get_pending_scratch() to authenticated;
grant execute on function public.grant_scratch_after_quiz(uuid, int, text) to authenticated;
grant execute on function public.reveal_scratch(uuid) to authenticated;
grant execute on function public.get_my_points() to authenticated;
