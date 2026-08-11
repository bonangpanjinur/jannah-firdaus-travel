# Rencana SEO — Jannah Firdaus Tour Travel (Jakarta Selatan)

Tujuan: (1) nama brand "Jannah Firdaus Tour Travel" muncul di halaman pertama untuk pencarian nama, (2) halaman paket dikenali Google sebagai produk umroh yang bisa tampil dengan harga & tanggal, (3) halaman pendukung menangkap pencarian "umroh Jakarta Selatan", harga/jadwal, dan umroh plus.

## Temuan saat ini
- Tabel pengaturan website masih kosong, sehingga seluruh situs (header, footer, JSON-LD) memakai nama cadangan "Barokah Umroh". Ini yang paling merusak peluang brand: Google tidak menemukan nama asli di mana pun.
- Judul, deskripsi, dan JSON-LD di semua halaman masih ditulis manual dengan nama cadangan itu.
- JSON-LD paket hanya `Product` sederhana: tanpa gambar, tanpa masa berlaku harga, tanpa data perjalanan.
- Belum ada halaman pendukung (FAQ, syarat & biaya umroh, umroh plus), belum ada breadcrumb yang terlihat, dan sitemap belum memuat tanggal pembaruan.
- Belum ada penanda lokasi (Jakarta Selatan) di teks maupun data terstruktur.

## Tahap 1 — Identitas brand jadi satu sumber
- Isi data resmi: nama "Jannah Firdaus Tour Travel", tagline, alamat kantor Jakarta Selatan, nomor izin PPIU (SK Kemenag), email, WhatsApp, media sosial.
- Semua judul halaman, deskripsi, header, footer, dan data terstruktur mengambil nama dari pengaturan ini — tidak ada lagi nama tertulis manual di kode.
- Pola judul brand: `Jannah Firdaus Tour Travel — Travel Umroh Jakarta Selatan` di beranda; halaman lain `<Topik> | Jannah Firdaus Tour Travel`.
- Nama brand dipakai wajar di H1 beranda, paragraf pembuka, footer, dan halaman Tentang (bukan pengulangan berlebihan).

## Tahap 2 — Data terstruktur (agar Google paham brand & produk)
Sitewide:
- `TravelAgency` lengkap: nama resmi, alamat Jakarta Selatan, telepon/WhatsApp, email, jam operasional, `sameAs` ke Instagram/Facebook/YouTube, logo, `areaServed` Indonesia.
- `WebSite` dengan nama brand + alternate name (mis. "Jannah Firdaus Umroh") supaya Google mengenali variasi penulisan nama.

Halaman paket:
- `Product` diperkaya: gambar flyer (URL penuh), merek = nama website, `offers` dengan harga terendah, mata uang IDR, ketersediaan, dan masa berlaku harga (mengikuti tanggal keberangkatan).
- Tambahan `TouristTrip` ringkas: titik keberangkatan, tujuan Makkah & Madinah, durasi hari.
- `BreadcrumbList` Beranda → Paket → Nama paket, sekaligus breadcrumb yang terlihat di halaman.
- Bila ada itinerary, hari-per-hari diringkas ke deskripsi terstruktur.

Halaman pendukung: `FAQPage` di halaman FAQ, `ContactPoint` di halaman Kontak, `ImageGallery` di Galeri.

## Tahap 3 — Halaman pendukung baru
1. **Umroh Jakarta Selatan** (`/umroh-jakarta-selatan`) — halaman lokal: layanan, area jangkauan (Kebayoran, Cilandak, Pasar Minggu, dst.), alamat + peta, paket terdekat, CTA WhatsApp.
2. **Biaya & Jadwal Umroh** (`/biaya-umroh`) — tabel harga per tipe kamar dan jadwal keberangkatan yang ditarik dari paket aktif, plus penjelasan komponen biaya.
3. **Syarat & Persyaratan Umroh** (`/syarat-umroh`) — dokumen, vaksin, paspor, alur pendaftaran.
4. **Umroh Plus & Program Khusus** (`/umroh-plus`) — umroh plus Turki/Dubai/Aqsa, umroh Ramadhan, umroh keluarga; menautkan ke paket yang relevan.
5. **FAQ** (`/faq`) — 10–15 pertanyaan nyata calon jamaah, dengan data terstruktur FAQ.

Semua halaman: satu H1, struktur H2 rapi, judul + deskripsi khas, canonical, dan saling menaut ke daftar paket.

## Tahap 4 — Kualitas teknis on-page
- Canonical & `og:url` menyesuaikan halaman masing-masing; `og:image` memakai flyer paket (URL publik penuh) dengan gambar cadangan bila kosong.
- Breadcrumb terlihat pada halaman paket dan halaman pendukung.
- Teks alternatif gambar deskriptif ("Flyer paket umroh 9 hari — Jannah Firdaus Tour Travel").
- Sitemap ditambah halaman pendukung baru dan tanggal pembaruan asli tiap paket; robots.txt mencantumkan alamat sitemap setelah domain aktif.
- Penautan internal: beranda → halaman lokal & biaya; setiap detail paket → syarat, FAQ, dan paket lain.
- Halaman admin tetap `noindex`.

## Tahap 5 — Verifikasi
- Jalankan pemindaian SEO bawaan setelah perubahan, perbaiki temuan yang tersisa.
- Cek pratinjau: judul, deskripsi, dan data terstruktur muncul benar di setiap halaman.
- Setelah publish: daftarkan ke Google Search Console dan kirim sitemap (langkah ini perlu dilakukan Anda, saya siapkan panduannya).

## Catatan teknis
- Metadata diambil di loader tiap route lewat data pengaturan, dengan nilai cadangan aman bila database belum terisi, sehingga tidak ada halaman kosong saat render server.
- JSON-LD ditulis lewat opsi `head().scripts` per route (Product/TouristTrip di detail paket, FAQPage di FAQ, TravelAgency + WebSite di root).
- URL canonical memakai jalur relatif sampai domain final ditetapkan.
- Bucket penyimpanan gambar saat ini privat; agar flyer bisa dipakai sebagai gambar pratinjau sosial, bucket perlu diubah menjadi publik atau memakai URL bertanda tangan berumur panjang — saya akan mengonfirmasi sebelum mengubahnya.
- Data pengaturan (nama, alamat, izin) diisi lewat perubahan basis data agar langsung tampil, dan tetap bisa diedit di Admin → Pengaturan.

## Di luar cakupan
Backlink, iklan berbayar, dan pembuatan Google Business Profile tidak bisa dikerjakan dari sini — akan saya berikan sebagai daftar langkah lanjutan.
