-- Table flash_offers
create table if not exists public.flash_offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  price numeric not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id) on delete cascade
);

-- Index utiles
create index if not exists idx_flash_offers_created_by on public.flash_offers(created_by);
create index if not exists idx_flash_offers_ends_at on public.flash_offers(ends_at);
create index if not exists idx_flash_offers_starts_at on public.flash_offers(starts_at);

-- Activer RLS
alter table public.flash_offers enable row level security;

-- Policies: l'utilisateur ne lit que ses lignes
create policy "select_own_flash_offers"
on public.flash_offers
for select
to authenticated
using (created_by = auth.uid());

-- Insert limité à l'utilisateur courant
create policy "insert_as_self"
on public.flash_offers
for insert
to authenticated
with check (created_by = auth.uid());

-- Update/Delete limité à l'auteur
create policy "update_own_flash_offers"
on public.flash_offers
for update
to authenticated
using (created_by = auth.uid())
with check (created_by = auth.uid());

create policy "delete_own_flash_offers"
on public.flash_offers
for delete
to authenticated
using (created_by = auth.uid());
