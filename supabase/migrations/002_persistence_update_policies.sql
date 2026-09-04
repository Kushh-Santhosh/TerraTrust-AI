do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'property_documents' and policyname = 'Owners can update property documents') then
    create policy "Owners can update property documents" on public.property_documents for update using (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'verification_results' and policyname = 'Owners can update verification results') then
    create policy "Owners can update verification results" on public.verification_results for update using (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'review_cases' and policyname = 'Owners can update review cases') then
    create policy "Owners can update review cases" on public.review_cases for update using (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid())) with check (exists (select 1 from public.properties p where p.id = property_id and p.owner_id = auth.uid()));
  end if;
end;
$$;