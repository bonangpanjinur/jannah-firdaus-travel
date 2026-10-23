-- SEO metadata audit & safe fill for Jannah Firdaus Tour Travel
-- Jalankan di Supabase SQL Editor setelah backup/snapshot database.
-- Script ini TIDAK menimpa seo_title, seo_description, atau og_image_url yang sudah diisi.

begin;

-- 1) Audit: temukan paket publik yang belum mempunyai metadata SEO.
select
  id,
  slug,
  name,
  departure_date,
  is_published,
  length(nullif(trim(seo_title), '')) as seo_title_length,
  length(nullif(trim(seo_description), '')) as seo_description_length,
  (nullif(trim(seo_title), '') is null) as seo_title_missing,
  (nullif(trim(seo_description), '') is null) as seo_description_missing,
  (nullif(trim(og_image_url), '') is null) as og_image_missing
from public.packages
where is_published = true
order by departure_date nulls last, sort_order, name;

-- 2) Isi title SEO yang kosong.
-- Maksimal 60 karakter, memakai nama paket dan brand tanpa keyword stuffing.
update public.packages
set seo_title = left(
  concat_ws(' | ',
    concat('Paket Umroh ', nullif(trim(name), '')),
    'Jannah Firdaus'
  ),
  60
)
where is_published = true
  and nullif(trim(seo_title), '') is null
  and nullif(trim(name), '') is not null;

-- 3) Isi description SEO yang kosong.
-- Maksimal 160 karakter dan tidak memuat klaim legalitas, harga, atau fasilitas
-- yang belum tentu masih berlaku.
update public.packages
set seo_description = left(
  concat_ws('. ',
    concat(
      'Paket umroh ',
      nullif(trim(name), ''),
      ' dari Jakarta Selatan'
    ),
    nullif(concat_ws(', ',
      case when duration_days is not null then concat(duration_days, ' hari') end,
      case when departure_date is not null then concat('berangkat ', to_char(departure_date, 'DD FMMonth YYYY')) end,
      case when airline is not null and trim(airline) <> '' then concat('maskapai ', trim(airline)) end,
      case when hotel_makkah is not null and trim(hotel_makkah) <> '' then concat('hotel Makkah ', trim(hotel_makkah)) end,
      case when hotel_madinah is not null and trim(hotel_madinah) <> '' then concat('hotel Madinah ', trim(hotel_madinah)) end
    ), ''),
    'Lihat harga, itinerary, fasilitas, dan konsultasi keberangkatan.'
  ),
  160
)
where is_published = true
  and nullif(trim(seo_description), '') is null
  and nullif(trim(name), '') is not null;

-- 4) Gunakan flyer sebagai fallback Open Graph image jika tersedia.
-- URL flyer tetap dikelola dari data paket; tidak ada file baru yang dibuat.
update public.packages
set og_image_url = nullif(trim(flyer_url), '')
where is_published = true
  and nullif(trim(og_image_url), '') is null
  and nullif(trim(flyer_url), '') is not null;

-- 5) Audit ulang: pastikan title/meta tidak melewati batas form admin.
select
  slug,
  name,
  seo_title,
  length(seo_title) as seo_title_length,
  seo_description,
  length(seo_description) as seo_description_length,
  og_image_url
from public.packages
where is_published = true
order by departure_date nulls last, sort_order, name;

commit;

-- Catatan audit halaman statis:
-- - Homepage, daftar paket, biaya, syarat, FAQ, kontak, galeri, tentang,
--   umroh plus, kota, dan kanal resmi sudah memakai pageMeta().
-- - Metadata halaman statis dikendalikan oleh source code, bukan tabel SQL.
-- - Title/meta yang perlu dipantau saat data brand berubah adalah halaman yang
--   memakai nama site dinamis; jangan menyalin title statis ke database.
-- - Data alamat, nomor PPIU, telepon, koordinat, dan sosial harus diisi hanya
--   setelah diverifikasi; script ini sengaja tidak mengarang atau mengubahnya.
