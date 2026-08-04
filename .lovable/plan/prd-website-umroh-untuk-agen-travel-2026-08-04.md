# PRD — Website Umroh untuk Agen Travel

## Tujuan
Website publik untuk menampilkan paket umroh (flyer, harga, jadwal, hotel, maskapai, itinerary, galeri) plus panel admin untuk mengelola semua konten tanpa perlu ngoding. Semua tombol kontak mengarah ke WhatsApp nomor utama.

## Pengguna
- **Calon jamaah** — melihat paket, detail, itinerary, galeri, lalu chat via WhatsApp.
- **Admin agen** — login, tambah/edit/hapus paket, upload flyer & foto galeri, atur nomor WA dan profil agen.

## Halaman Frontend
1. **Beranda** — hero, paket unggulan, keunggulan agen, testimoni, CTA WhatsApp.
2. **Daftar Paket** — grid kartu flyer + nama paket, tanggal berangkat, harga mulai; filter bulan keberangkatan & jenis paket.
3. **Detail Paket** — flyer besar, harga, tanggal keberangkatan & durasi, maskapai, hotel Makkah/Madinah (nama + bintang + jarak), fasilitas termasuk/tidak termasuk, syarat dokumen, tab Itinerary hari per hari, galeri foto paket, tombol "Chat WhatsApp" yang otomatis mengisi pesan berisi nama paket.
4. **Galeri** — dokumentasi keberangkatan, foto & video (embed).
5. **Tentang Kami** — profil, legalitas (izin PPIU), alamat kantor, peta.
6. **Kontak** — form pertanyaan + tombol WA + info kantor.
7. **Tombol WhatsApp mengambang** di semua halaman.

## Panel Admin (/admin, wajib login)
- **Dashboard** — ringkasan jumlah paket, paket terdekat berangkat.
- **Kelola Paket** — form: nama, slug, upload foto flyer, deskripsi, harga (quad/triple/double), tanggal keberangkatan, durasi hari, kuota, maskapai, hotel Makkah, hotel Madinah, fasilitas, status (aktif/draft/unggulan).
- **Itinerary per paket** — daftar hari (hari ke-, judul, deskripsi), bisa tambah/urutkan/hapus.
- **Galeri per paket & galeri umum** — upload banyak foto, hapus, atur urutan.
- **Pengaturan** — nomor WA utama, template pesan WA, nama & logo agen, alamat, sosial media, teks hero beranda.
- **Pesan masuk** — daftar submit form kontak.

## Data & Backend (Lovable Cloud)
Tabel: `packages`, `package_itinerary`, `package_images`, `gallery`, `site_settings`, `contact_messages`, `user_roles` (role admin terpisah dari profil).
Storage: bucket publik untuk flyer & foto galeri.
Keamanan: RLS — publik hanya bisa baca data berstatus aktif; tulis/ubah hanya untuk user ber-role `admin`. Login admin via email + password.

## Desain
Nuansa islami modern: hijau zamrud + emas lembut, latar krem, tipografi elegan (heading serif, body sans), kartu paket dengan bayangan halus, animasi masuk lembut. Responsif mobile-first karena mayoritas pengunjung dari HP.

## Rencana Pengerjaan Bertahap
1. Desain sistem + beranda + daftar paket (data contoh) — versi bisa dilihat.
2. Aktifkan Lovable Cloud: tabel, storage, RLS, login admin.
3. Panel admin: CRUD paket + upload flyer.
4. Halaman detail paket + itinerary + galeri terhubung database.
5. Pengaturan WA, form kontak, SEO (title/description tiap halaman, schema produk), lalu publish.

## Catatan Teknis
- Frontend TanStack Start (React 19) + Tailwind v4, semua warna lewat design token.
- Upload gambar ke storage Cloud, URL disimpan di tabel.
- Link WA memakai format `https://wa.me/<nomor>?text=<pesan>` yang diambil dari `site_settings`.
