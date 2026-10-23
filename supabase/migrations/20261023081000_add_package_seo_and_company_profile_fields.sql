-- SEO fields for package-specific title, description and social sharing image.
alter table public.packages
  add column if not exists seo_title text,
  add column if not exists seo_description text,
  add column if not exists og_image_url text;

-- Editable company facts; intentionally nullable/empty until verified details are entered by an admin.
alter table public.site_settings
  add column if not exists legal_name text,
  add column if not exists ppiu_license_number text,
  add column if not exists founded_year integer,
  add column if not exists jamaah_count integer,
  add column if not exists services text[] not null default '{}',
  add column if not exists service_areas text[] not null default '{}';

-- Testimonials remain private drafts until an admin confirms permission to publish.
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  city text,
  quote text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  consent_to_publish boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.testimonials to anon;
grant select, insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "public read consented testimonials"
  on public.testimonials for select to anon
  using (is_published and consent_to_publish);
create policy "admin manage testimonials"
  on public.testimonials for all to authenticated
  using (private.has_role(auth.uid(), 'admin'::public.app_role))
  with check (private.has_role(auth.uid(), 'admin'::public.app_role));
create trigger testimonials_updated
  before update on public.testimonials
  for each row execute function public.set_updated_at();

-- Use the official public brand confirmed by the site owner, without overwriting custom names.
update public.site_settings
set agency_name = 'Jannah Firdaus Tour Travel'
where id = 1
  and agency_name = 'Jannah Firdaus Travel';

-- Remove only known placeholder/legacy seed values that have not been confirmed by the owner.
update public.site_settings
set
  address = case
    when address = 'Jl. KH Abdullah Syafei No.21D, RT.1/RW.3, Kb. Baru, Kec. Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12830' then null
    else address
  end,
  email = case when email = 'info@jannahfirdaustravel.com' then null else email end,
  instagram = case when instagram = 'umrohjannahfirdaustravel' then null else instagram end,
  whatsapp_number = case when whatsapp_number = '628123456789' then null else whatsapp_number end,
  license_text = case
    when license_text = 'Berizin resmi PPIU Kemenag RI No. 123/2024' then null
    else license_text
  end
where id = 1;
