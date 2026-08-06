# Prioritas Fitur yang Masih Belum Ada

## Ringkasan kondisi saat ini

Fitur dasar sudah tersedia: halaman beranda, daftar dan detail paket, filter bulan, galeri umum, profil, kontak, tombol WhatsApp, login admin, CRUD paket dasar, upload flyer, galeri umum, manajemen file, pesan masuk, dan pengaturan kontak/identitas dasar.

Kesenjangan terbesar saat ini adalah pengelolaan itinerary dan galeri per paket di admin, kelengkapan data paket, alur konversi jamaah yang masih bergantung sepenuhnya pada WhatsApp, serta beberapa kontrol operasional dan kepercayaan calon jamaah.

## Prioritas P0 — Wajib sebelum website dipakai serius

### 1. Admin itinerary per paket
- Tambah, edit, hapus, dan urutkan itinerary berdasarkan hari.
- Hubungkan itinerary ke paket tertentu.
- Validasi nomor hari dan tampilkan status kosong dengan jelas.
- Alasan: halaman detail jamaah sudah menampilkan itinerary, tetapi admin belum memiliki layar untuk mengelolanya.

### 2. Admin galeri foto per paket
- Tambah banyak foto ke paket tertentu.
- Caption, urutan, preview, dan hapus foto.
- Hapus file storage saat record dihapus, dengan penanganan kegagalan yang aman.
- Alasan: tabel dan tampilan publik sudah mendukung foto paket, tetapi belum ada workflow adminnya.

### 3. Lengkapi form paket agar sesuai kebutuhan operasional
- Kolom bintang hotel Makkah/Madinah.
- Urutan tampil paket.
- Status draft/tayang/unggulan yang lebih jelas.
- Validasi slug unik, harga, tanggal, durasi, kuota, dan field wajib.
- Konfirmasi sebelum menghapus paket serta pembersihan flyer/foto terkait.
- Alasan: field penting sudah tersedia di data, tetapi belum seluruhnya dapat diisi atau dikelola dari form admin.

### 4. Keamanan dan onboarding admin
- Pisahkan alur pendaftaran akun dari pemberian role admin.
- Sediakan cara aman bagi admin utama untuk memberi/mencabut role admin.
- Tambahkan reset password dan status verifikasi email yang jelas.
- Pastikan setiap aksi CRUD tetap divalidasi oleh backend, bukan hanya oleh guard di tampilan.
- Alasan: role sudah disimpan terpisah dan policy backend sudah digunakan, tetapi workflow pengelolaan admin belum tersedia.

### 5. Stabilkan alur kontak jamaah
- Validasi format nama, nomor WhatsApp, dan panjang pesan.
- State loading, error, sukses, dan pencegahan submit ganda yang konsisten.
- Tambahkan aksi admin untuk menghapus pesan dan membuka chat WhatsApp dari pesan masuk.
- Tampilkan waktu pesan dan jumlah pesan belum dibaca secara lebih jelas.
- Tambahkan proteksi spam/rate limit sebelum dipakai publik.

## Prioritas P1 — Meningkatkan konversi dan kepercayaan jamaah

### 6. Pencarian dan filter paket yang lebih berguna
- Filter bulan sudah ada; tambahkan rentang harga, durasi, unggulan, dan status ketersediaan kuota.
- Tambahkan sorting tanggal terdekat dan harga terendah.
- Tampilkan indikator kuota atau “segera penuh” bila kuota dikelola.
- Catatan: tipe paket belum memiliki field khusus, jadi filter “jenis paket” perlu diputuskan sebagai kategori baru atau tidak ditambahkan.

### 7. CTA dan inquiry yang lebih terukur
- Tombol WhatsApp dengan pesan otomatis sudah ada; tambahkan pilihan minat dari halaman detail paket.
- Simpan sumber inquiry/paket yang ditanyakan agar admin dapat mengukur paket yang paling diminati.
- Tambahkan tombol unduh/share detail paket bila materi promosi diperlukan.

### 8. Kelengkapan konten pengaturan website
- Admin belum mengelola seluruh field yang tersedia: logo, judul/subjudul hero, YouTube, dan beberapa tautan sosial.
- Tambahkan preview perubahan sebelum disimpan.
- Normalisasi nomor WhatsApp dan validasi URL sosial media.

### 9. Halaman kepercayaan dan informasi kantor
- Tambahkan peta atau tautan Google Maps pada halaman Tentang/Kontak.
- Tampilkan legalitas dengan format yang dapat diverifikasi, bukan hanya teks.
- Tambahkan FAQ: visa, paspor, vaksin, pembayaran, pembatalan, dan perlengkapan.
- Pastikan testimoni tidak hanya berupa data hardcoded jika admin perlu mengelolanya.

### 10. Galeri yang lebih lengkap
- Dukungan video melalui URL/embed yang aman, sesuai PRD.
- Lightbox untuk melihat foto lebih besar.
- Filter atau grouping berdasarkan keberangkatan/periode.
- Alt text dan caption wajib/terarah untuk aksesibilitas.

## Prioritas P2 — Efisiensi dan pertumbuhan

### 11. Dashboard operasional admin
- Paket yang paling dekat tanggal berangkat.
- Ringkasan paket draft/tayang, kuota, dan pesan baru.
- Shortcut ke data yang perlu ditindaklanjuti.
- Status upload/file orphan dan cleanup yang lebih mudah.

### 12. Pengelolaan konten tanpa hardcode
- CRUD testimoni.
- CRUD keunggulan/komitmen agen.
- Pengaturan navigasi atau banner pengumuman bila dibutuhkan.

### 13. SEO dan distribusi
- Metadata unik lengkap untuk setiap halaman, termasuk `og:type` dan kartu Twitter pada halaman publik.
- Canonical URL, sitemap, schema.org untuk travel/package, dan gambar sosial dari aset yang benar.
- Optimasi gambar: ukuran responsif, kompresi, lazy loading, dan fallback yang konsisten.

### 14. Pelaporan dan audit
- Riwayat perubahan paket/pengaturan.
- Peran admin lebih rinci jika jumlah pengelola bertambah.
- Export pesan atau daftar paket bila dibutuhkan untuk operasional offline.

## Urutan pengerjaan yang disarankan

```text
P0.1 Itinerary admin
  -> P0.2 Galeri per paket
  -> P0.3 Kelengkapan & validasi paket
  -> P0.4 Onboarding/security admin
  -> P0.5 Alur pesan jamaah

P1.6 Filter paket & kuota
  -> P1.7 Tracking inquiry/CTA
  -> P1.8 Pengaturan konten lengkap
  -> P1.9 Peta, legalitas, FAQ
  -> P1.10 Galeri video/lightbox

P2.11 Dashboard operasional
  -> P2.12 Content management
  -> P2.13 SEO/distribusi
  -> P2.14 Audit/pelaporan
```

## Rekomendasi milestone

**Milestone 1 — Siap dikelola admin:** P0.1–P0.4. Admin dapat membuat paket lengkap, itinerary, flyer, dan galeri paket tanpa menyentuh kode.

**Milestone 2 — Siap menerima calon jamaah:** P0.5, P1.6, dan P1.7. Calon jamaah lebih mudah menemukan paket dan admin dapat menindaklanjuti inquiry dengan konteks yang jelas.

**Milestone 3 — Siap dipromosikan:** P1.8–P1.10 dan P2.13. Konten lebih lengkap, kepercayaan meningkat, dan halaman lebih siap dibagikan melalui mesin pencari/media sosial.

**Milestone 4 — Siap scale:** P2.11, P2.12, dan P2.14 untuk efisiensi tim dan kontrol operasional.

## Detail teknis

- Pertahankan TanStack Router, React Query, design token, dan penyimpanan Cloud yang sudah digunakan.
- Fitur admin baru harus mengikuti role admin dan policy backend yang sudah ada.
- Setiap tabel baru harus memiliki grant eksplisit, RLS, dan policy yang sesuai.
- Jangan menyimpan role pada tabel profil/user; tetap gunakan tabel role terpisah.
- Untuk upload, cegah file orphan saat penggantian atau penghapusan record, dan tampilkan error yang bisa ditindaklanjuti.
- Untuk pekerjaan implementasi, mulai dari P0.1 dan P0.2 karena keduanya menutup gap paling nyata antara data publik dan kemampuan admin.
