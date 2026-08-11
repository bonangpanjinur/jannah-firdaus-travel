# Rencana Perbaikan: SEO, Input Paket Sederhana, dan 2 Pilihan Tema

## 1. Analisis kekurangan SEO (hasil pemeriksaan kode saat ini)

Yang sudah baik: setiap halaman publik punya `head()` sendiri (beranda, paket, detail paket, galeri, tentang, kontak), robots.txt mengizinkan semua crawler, halaman admin sudah `noindex`.

Yang kurang:
- **Judul & deskripsi detail paket masih generik.** Semua paket memakai judul "Detail Paket Umroh — Barokah Umroh", tidak memakai nama paket asli, karena data paket belum diambil di loader. Ini membuat semua halaman paket terlihat duplikat di Google.
- **Tidak ada canonical URL** di halaman mana pun.
- **Tidak ada `og:image` / `twitter:image`** — link yang dibagikan di WhatsApp/Facebook tampil polos tanpa gambar.
- **Tidak ada sitemap.xml**, jadi Google harus menebak halaman mana yang ada.
- **Tidak ada data terstruktur (JSON-LD)**: belum ada TravelAgency/LocalBusiness di root, belum ada Product/Offer di halaman paket, belum ada FAQ.
- **`<html lang="en">`** padahal seluruh isi situs berbahasa Indonesia.
- **`og:url` belum ada** di halaman mana pun.

Perbaikan yang akan dikerjakan:
- Detail paket memuat data paket lewat loader, lalu judul/deskripsi/og memakai nama paket, harga, hotel, dan tanggal keberangkatan asli; flyer paket dipakai sebagai `og:image`/`twitter:image`.
- Tambah `canonical` + `og:url` di semua halaman publik (path relatif).
- Ubah `lang` menjadi `id`.
- Tambah `public/sitemap.xml` untuk halaman statis dan route `/sitemap.xml` dinamis yang ikut memuat semua paket tayang.
- JSON-LD: TravelAgency di root (nama, telepon, alamat, WhatsApp dari pengaturan), Product + Offer di detail paket, BreadcrumbList di detail paket.
- Alt text gambar dilengkapi dengan nama paket.

## 2. Input paket yang lebih sederhana untuk agen umroh

Masalah sekarang: form paket adalah satu form panjang 20+ isian yang muncul sekaligus, itinerary & galeri ada di halaman terpisah, dan tidak ada panduan mana yang wajib.

Perbaikan:
- Form paket dipecah menjadi **langkah/seksi terkelompok** dalam satu halaman: **(1) Info dasar** (nama, flyer, deskripsi) → **(2) Penerbangan & jadwal** (maskapai, tanggal, durasi) → **(3) Hotel** (Makkah/Madinah + bintang) → **(4) Harga & kuota** → **(5) Termasuk / tidak termasuk / syarat** → **(6) Status tayang**.
- Hanya **nama paket** yang wajib. Slug dibuat otomatis dari nama (bisa dibuka untuk diedit lewat tombol "ubah URL"), sehingga agen tidak perlu paham slug.
- Setiap isian diberi contoh (placeholder) khas umroh, mis. maskapai "Saudia SV", hotel "Pullman Zamzam (100 m dari Masjidil Haram)".
- Tombol **"Isi cepat termasuk/tidak termasuk"** memuat daftar standar umroh (tiket PP, visa, hotel, makan 3x, muthawwif, manasik / paspor, suntik meningitis, pengeluaran pribadi) yang tinggal dicoret sesuai kebutuhan.
- **Duplikat paket**: tombol salin paket untuk membuat keberangkatan bulan berikutnya tanpa isi ulang.
- Preview mini kartu paket di samping form supaya agen tahu tampilan hasilnya.
- Itinerary & galeri tetap di halaman detail paket, tetapi diberi tautan yang jelas dan tombol "Tambah hari berikutnya" yang otomatis menaikkan nomor hari.

## 3. Dua pilihan tema tampilan depan

- Tema A (yang sekarang): **Noir & Emas** — gelap, mewah.
- Tema B (baru): **Putih Zamrud** — terang, bersih, hijau zamrud + emas lembut, cocok untuk agen yang ingin kesan ramah/formal.
- Pemilihan tema disimpan di pengaturan situs (kolom baru `theme` pada `site_settings`) dan dipilih dari **Admin → Pengaturan** dengan pratinjau warna, jadi berlaku untuk semua pengunjung.
- Selain warna, tema B juga mengubah gaya tampilan depan (hero terang dengan foto besar, kartu paket bergaya bersih dengan border tipis, bukan sekadar tukar warna).

## Catatan teknis

- Warna tema B ditambahkan di `src/styles.css` sebagai blok `[data-theme="putih-zamrud"]` yang menimpa variabel token yang sama; komponen tetap memakai token semantik.
- Atribut `data-theme` dipasang di elemen root dari nilai pengaturan, dengan fallback tema Noir supaya tidak berkedip saat halaman dimuat.
- Migrasi database: `alter table site_settings add column theme text not null default 'noir-emas'`.
- Detail paket memakai `loader` + `ensureQueryData` agar `head()` bisa memakai data paket (route publik, tanpa autentikasi).
- `og:image` hanya dipasang di route daun, memakai URL absolut hasil public URL storage flyer.

## Urutan pengerjaan

1. Perbaikan SEO (head per halaman, canonical, lang, sitemap, JSON-LD).
2. Penyederhanaan form paket + isi cepat + duplikat paket.
3. Tema kedua + pemilih tema di pengaturan.
