-- Optional verified business identity fields used by LocalBusiness schema and the official channels page.
alter table public.site_settings
  add column if not exists postal_code text,
  add column if not exists latitude numeric,
  add column if not exists longitude numeric,
  add column if not exists google_maps_url text,
  add column if not exists tiktok text;

alter table public.site_settings
  drop constraint if exists site_settings_latitude_check;
alter table public.site_settings
  add constraint site_settings_latitude_check
  check (latitude is null or (latitude >= -90 and latitude <= 90));

alter table public.site_settings
  drop constraint if exists site_settings_longitude_check;
alter table public.site_settings
  add constraint site_settings_longitude_check
  check (longitude is null or (longitude >= -180 and longitude <= 180));
