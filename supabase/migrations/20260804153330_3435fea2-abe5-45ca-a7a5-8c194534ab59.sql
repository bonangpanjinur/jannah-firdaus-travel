
CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  flyer_url text,
  description text,
  price_quad bigint,
  price_triple bigint,
  price_double bigint,
  departure_date date,
  duration_days integer,
  quota integer,
  airline text,
  hotel_makkah text,
  hotel_makkah_stars integer,
  hotel_madinah text,
  hotel_madinah_stars integer,
  includes text[] NOT NULL DEFAULT '{}',
  excludes text[] NOT NULL DEFAULT '{}',
  requirements text[] NOT NULL DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.packages TO authenticated;
GRANT ALL ON public.packages TO service_role;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published packages" ON public.packages FOR SELECT TO anon USING (is_published);
CREATE POLICY "auth read packages" ON public.packages FOR SELECT TO authenticated USING (is_published OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin manage packages" ON public.packages FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER packages_updated BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.package_itinerary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  title text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.package_itinerary TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.package_itinerary TO authenticated;
GRANT ALL ON public.package_itinerary TO service_role;
ALTER TABLE public.package_itinerary ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read itinerary" ON public.package_itinerary FOR SELECT TO anon USING (true);
CREATE POLICY "auth read itinerary" ON public.package_itinerary FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin manage itinerary" ON public.package_itinerary FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.package_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.package_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.package_images TO authenticated;
GRANT ALL ON public.package_images TO service_role;
ALTER TABLE public.package_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read package images" ON public.package_images FOR SELECT TO anon USING (true);
CREATE POLICY "auth read package images" ON public.package_images FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin manage package images" ON public.package_images FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery TO authenticated;
GRANT ALL ON public.gallery TO service_role;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read gallery" ON public.gallery FOR SELECT TO anon USING (true);
CREATE POLICY "auth read gallery" ON public.gallery FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin manage gallery" ON public.gallery FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.site_settings (
  id integer PRIMARY KEY DEFAULT 1,
  agency_name text NOT NULL DEFAULT 'Barokah Umroh',
  tagline text,
  logo_url text,
  whatsapp_number text NOT NULL DEFAULT '628123456789',
  whatsapp_template text NOT NULL DEFAULT 'Assalamu''alaikum, saya ingin bertanya tentang paket {paket}.',
  address text,
  email text,
  instagram text,
  facebook text,
  youtube text,
  license_text text,
  hero_title text,
  hero_subtitle text,
  about_text text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read settings" ON public.site_settings FOR SELECT TO anon USING (true);
CREATE POLICY "auth read settings" ON public.site_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "admin manage settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can send message" ON public.contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "auth can send message" ON public.contact_messages FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "admin read messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete messages" ON public.contact_messages FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "admin upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(),'admin'));

INSERT INTO public.site_settings (id, agency_name, tagline, whatsapp_number, address, email, instagram, license_text, hero_title, hero_subtitle, about_text)
VALUES (1, 'Barokah Umroh', 'Sahabat Perjalanan Suci Anda', '628123456789',
 'Jl. Melati No. 12, Jakarta Selatan', 'info@barokahumroh.id', 'barokahumroh',
 'Berizin resmi PPIU Kemenag RI No. 123/2024',
 'Wujudkan Perjalanan Umroh Impian Bersama Kami',
 'Bimbingan ustadz berpengalaman, hotel dekat Masjidil Haram, dan pelayanan penuh amanah sejak keberangkatan hingga kepulangan.',
 'Barokah Umroh adalah biro perjalanan umroh berizin resmi yang telah memberangkatkan ribuan jamaah dengan pelayanan amanah, transparan, dan penuh perhatian.');

INSERT INTO public.packages (slug, name, description, price_quad, price_triple, price_double, departure_date, duration_days, quota, airline, hotel_makkah, hotel_makkah_stars, hotel_madinah, hotel_madinah_stars, includes, excludes, requirements, is_featured, sort_order) VALUES
('umroh-hemat-9-hari','Umroh Hemat 9 Hari','Paket umroh ekonomis dengan fasilitas nyaman, cocok untuk keluarga yang ingin beribadah dengan biaya terjangkau.',27500000,29500000,32500000,'2026-10-12',9,45,'Saudia Airlines','Grand Al Massa',4,'Al Eiman Royal',4,
 ARRAY['Tiket pesawat PP','Visa umroh','Hotel bintang 4','Makan 3x sehari','Bus AC full trip','Muthawif berpengalaman','Perlengkapan umroh','City tour Makkah & Madinah'],
 ARRAY['Paspor','Pembuatan dokumen pribadi','Kelebihan bagasi','Pengeluaran pribadi'],
 ARRAY['Paspor berlaku minimal 8 bulan','Kartu vaksin meningitis','Pas foto berwarna 4x6','Kartu keluarga & KTP'],true,1),
('umroh-plus-turki-12-hari','Umroh Plus Turki 12 Hari','Ibadah umroh dilengkapi wisata sejarah Islam di Istanbul dan Bursa.',39500000,42000000,45500000,'2026-11-20',12,30,'Turkish Airlines','Swissotel Al Maqam',5,'Frontel Al Harithia',5,
 ARRAY['Tiket pesawat PP','Visa umroh & Turki','Hotel bintang 5','Makan 3x sehari','Tour Istanbul & Bursa','Muthawif & tour leader','Perlengkapan umroh'],
 ARRAY['Paspor','Kelebihan bagasi','Pengeluaran pribadi','Tips guide lokal'],
 ARRAY['Paspor berlaku minimal 8 bulan','Kartu vaksin meningitis','Pas foto berwarna 4x6'],true,2),
('umroh-ramadhan-15-hari','Umroh Ramadhan 15 Hari','Rasakan kekhusyukan ibadah di bulan suci Ramadhan dengan itikaf 10 malam terakhir.',44500000,47000000,51000000,'2027-03-05',15,25,'Garuda Indonesia','Pullman Zamzam',5,'Dar Al Taqwa',5,
 ARRAY['Tiket pesawat PP','Visa umroh','Hotel bintang 5 depan Masjidil Haram','Makan 3x sehari + sahur','Bus AC full trip','Pembimbing ibadah','Perlengkapan umroh'],
 ARRAY['Paspor','Kelebihan bagasi','Pengeluaran pribadi'],
 ARRAY['Paspor berlaku minimal 8 bulan','Kartu vaksin meningitis','Pas foto berwarna 4x6'],true,3);

INSERT INTO public.package_itinerary (package_id, day_number, title, description)
SELECT p.id, d.day_number, d.title, d.description FROM public.packages p
CROSS JOIN (VALUES
 (1,'Keberangkatan dari Jakarta','Berkumpul di bandara, manasik singkat, dan penerbangan menuju Jeddah.'),
 (2,'Tiba di Madinah','Proses imigrasi, perjalanan ke Madinah, check-in hotel dan istirahat.'),
 (3,'Ibadah di Masjid Nabawi','Shalat arbain, ziarah Raudhah, dan makam Rasulullah SAW.'),
 (4,'Ziarah Kota Madinah','Masjid Quba, Jabal Uhud, Kebun Kurma, dan Masjid Qiblatain.'),
 (5,'Menuju Makkah','Miqat di Bir Ali, perjalanan ke Makkah, umroh pertama.'),
 (6,'Ibadah di Masjidil Haram','Memperbanyak thawaf sunnah dan ibadah di Masjidil Haram.'),
 (7,'City Tour Makkah','Jabal Rahmah, Arafah, Mina, Muzdalifah, dan Jabal Tsur.'),
 (8,'Umroh Kedua & Belanja','Umroh kedua dari Jironah lalu belanja oleh-oleh.'),
 (9,'Kepulangan ke Tanah Air','Thawaf wada dan penerbangan kembali ke Jakarta.')
) AS d(day_number,title,description)
WHERE p.slug = 'umroh-hemat-9-hari';
