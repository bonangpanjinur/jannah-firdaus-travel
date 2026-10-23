alter table public.site_settings
  drop constraint if exists site_settings_theme_check;

alter table public.site_settings
  add constraint site_settings_theme_check
  check (theme in ('noir-emas', 'putih-zamrud', 'maroon-klasik', 'safi-biru', 'toska-modern'));
