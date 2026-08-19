-- Refresh legacy seed data with the official public identity supplied for this site.
-- Existing admin-customized records are preserved unless they still match the legacy seed.
alter table public.site_settings
  add column if not exists operating_hours text;

alter table public.site_settings
  alter column whatsapp_number drop not null;

update public.site_settings
set
  agency_name = 'Jannah Firdaus Travel',
  tagline = 'Melayani Sepenuh Hati',
  email = 'info@jannahfirdaustravel.com',
  address = 'Jl. KH Abdullah Syafei No.21D, RT.1/RW.3, Kb. Baru, Kec. Tebet, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12830',
  instagram = 'umrohjannahfirdaustravel',
  whatsapp_number = null,
  whatsapp_template = 'Assalamu''alaikum, saya ingin bertanya tentang paket {paket}.',
  license_text = null,
  hero_title = null,
  hero_subtitle = null,
  about_text = null
where id = 1
  and (
    agency_name = 'Barokah Umroh'
    or email = 'info@barokahumroh.id'
    or whatsapp_number = '628123456789'
  );
