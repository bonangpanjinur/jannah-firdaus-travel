-- Grant the admin role to the existing Supabase Auth account used by the site owner.
-- This is intentionally scoped to one exact, verified email address.
do $$
declare
  target_user_id uuid;
begin
  select id
    into target_user_id
    from auth.users
   where lower(email) = lower('bpanjinur63@gmail.com')
   limit 1;

  if target_user_id is null then
    raise notice 'Admin account bpanjinur63@gmail.com is not present yet; create the Auth user and run the INSERT below manually.';
  else
    insert into public.user_roles (user_id, role)
    values (target_user_id, 'admin'::public.app_role)
    on conflict (user_id, role) do nothing;
  end if;
end
$$;
