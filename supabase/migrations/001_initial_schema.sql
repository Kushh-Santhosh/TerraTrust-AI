create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'citizen' check (role in ('citizen', 'surveyor', 'government', 'community', 'bank', 'admin')),
  region text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  property_name text not null,
  passport_id text not null unique,
  location jsonb not null default '{}'::jsonb,
  area numeric not null default 0,
  status text not null default 'pending' check (status in ('verified', 'pending', 'disputed', 'draft')),
  trust_score integer not null default 0 check (trust_score between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.property_documents (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  name text not null,
  kind text not null,
  storage_path text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.verification_results (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  provider text not null default 'n8n',
  result jsonb not null,
  created_at timestamptz not null default now()
);

create table public.review_cases (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  status text not null default 'open' check (status in ('open', 'in_review', 'resolved')),
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role, region)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    case when new.raw_user_meta_data ->> 'role' in ('surveyor', 'government', 'community', 'bank', 'admin')
      then new.raw_user_meta_data ->> 'role' else 'citizen' end,
    new.raw_user_meta_data ->> 'region'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create index properties_owner_id_idx on public.properties(owner_id);
create index property_documents_property_id_idx on public.property_documents(property_id);
create index verification_results_property_id_idx on public.verification_results(property_id);

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_documents enable row level security;
alter table public.verification_results enable row level security;
alter table public.review_cases enable row level security;

create policy "Users can read their profile" on public.profiles for select using (id = auth.uid());
create policy "Users can insert their profile" on public.profiles for insert with check (id = auth.uid());
create policy "Users can update their profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "Owners can read their properties" on public.properties for select using (owner_id = auth.uid());
create policy "Owners can create properties" on public.properties for insert with check (owner_id = auth.uid());
create policy "Owners can update their properties" on public.properties for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "Owners can read property documents" on public.property_documents for select using (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
create policy "Owners can create property documents" on public.property_documents for insert with check (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
create policy "Owners can update property documents" on public.property_documents for update using (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));

create policy "Owners can read verification results" on public.verification_results for select using (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
create policy "Owners can create verification results" on public.verification_results for insert with check (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
create policy "Owners can update verification results" on public.verification_results for update using (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));

create policy "Owners can read review cases" on public.review_cases for select using (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
create policy "Owners can create review cases" on public.review_cases for insert with check (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
create policy "Owners can update review cases" on public.review_cases for update using (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
