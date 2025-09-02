-- Exemple: table profiles (user_id UUID = auth.uid())
alter table profiles enable row level security;

create policy "read own profile"
on profiles for select
using ( user_id = auth.uid() );

create policy "update own profile"
on profiles for update
using ( user_id = auth.uid() );

-- profiles(id uuid PK = auth.uid())
alter table profiles enable row level security;

create policy "read own profile" on profiles
for select using (auth.uid() = id);

create policy "update own profile" on profiles
for update using (auth.uid() = id);

-- merchants(owner_id uuid)
alter table merchants enable row level security;

create policy "merchant owner can read" on merchants
for select using (owner_id = auth.uid());

create policy "merchant owner can update" on merchants
for update using (owner_id = auth.uid());
