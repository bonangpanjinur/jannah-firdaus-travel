# Audit Indexability Batch 1 dan Rencana Off-Page SEO

Tanggal audit: 21 Agustus 2026

## Ringkasan

Audit production terhadap 10 halaman kota Batch 1 menunjukkan seluruh URL dapat di-crawl dan dirender dengan benar pada saat pengujian. Seluruh halaman mengembalikan HTTP 200, memiliki canonical yang sesuai dengan URL sendiri, tercantum pada sitemap, tidak memiliki `noindex`, dan mengeluarkan title, H1, `TravelAgency`, `BreadcrumbList`, serta `FAQPage`.

> Lulusnya crawlability dan kelengkapan metadata tidak membuktikan bahwa URL sudah masuk indeks Google. Status indeks aktual harus dikonfirmasi melalui Google Search Console URL Inspection atau laporan Pages/Indexing.

## Hasil per URL

| Halaman | HTTP | Sitemap | Canonical | Noindex | Schema | TTFB proxy |
|---|---:|---:|---:|---:|---:|---:|
| Jakarta Selatan | 200 | Ya | Lulus | Tidak | Lengkap | 1.255 ms |
| Bekasi | 200 | Ya | Lulus | Tidak | Lengkap | 1.827 ms |
| Depok | 200 | Ya | Lulus | Tidak | Lengkap | 1.235 ms |
| Bogor | 200 | Ya | Lulus | Tidak | Lengkap | 1.707 ms |
| Tangerang | 200 | Ya | Lulus | Tidak | Lengkap | 1.210 ms |
| Tangerang Selatan | 200 | Ya | Lulus | Tidak | Lengkap | 1.757 ms |
| Bandung | 200 | Ya | Lulus | Tidak | Lengkap | 1.760 ms |
| Surabaya | 200 | Ya | Lulus | Tidak | Lengkap | 1.392 ms |
| Medan | 200 | Ya | Lulus | Tidak | Lengkap | 1.028 ms |
| Makassar | 200 | Ya | Lulus | Tidak | Lengkap | 1.380 ms |

Median TTFB proxy pengujian ini sekitar 1,39 detik. Nilai ini merupakan request-level proxy dan bukan pengganti field data Core Web Vitals.

## Prioritas indeksasi

1. Periksa URL Jakarta Selatan, Bekasi, Depok, Bogor, dan Bandung melalui Search Console URL Inspection.
2. Periksa URL Tangerang, Tangerang Selatan, Surabaya, Medan, dan Makassar setelahnya.
3. Jika statusnya `Discovered - currently not indexed` atau `Crawled - currently not indexed`, jangan langsung membuat halaman tambahan. Perkaya konten yang benar-benar unik, tambahkan bukti layanan, dan perkuat internal link dari `/umroh`, halaman provinsi, dan halaman paket.
4. Kirim ulang sitemap hanya setelah perubahan struktural penting. Jangan melakukan request indexing massal berulang-ulang.

## Strategi off-page 90 hari

### Hari 1–14: konsolidasi entitas

Pastikan nama bisnis, domain kanonis, alamat, telepon, email, logo, jam operasional, dan URL sosial konsisten pada Google Business Profile, website, dan direktori yang benar-benar dimiliki. Tambahkan URL halaman Jakarta Selatan sebagai halaman layanan yang relevan hanya jika profil bisnis memang melayani lokasi tersebut.

### Hari 15–45: citation dan kemitraan nyata

Prioritaskan profil dan tautan dari organisasi yang memiliki hubungan nyata: asosiasi perjalanan resmi, mitra masjid atau komunitas pengajian yang bersedia mempublikasikan kegiatan, vendor dokumentasi atau transportasi, mitra hotel, serta publikasi kegiatan sosial. Setiap tautan harus mengarah ke halaman yang paling relevan, tidak selalu homepage.

### Hari 46–75: aset konten lokal

Publikasikan satu atau dua aset yang layak dirujuk, misalnya checklist persiapan umroh untuk jamaah Jakarta Selatan, panduan dokumen yang diperbarui, atau laporan kegiatan manasik yang benar-benar berlangsung. Promosikan kepada komunitas dan media lokal tanpa meminta anchor text yang dipaksakan.

### Hari 76–90: digital PR dan evaluasi

Tawarkan cerita berbasis fakta kepada media lokal: kegiatan edukasi, keberangkatan jamaah dengan izin publikasi, program sosial, atau kolaborasi komunitas. Tandai tautan sponsorship dengan `rel="sponsored"`. Evaluasi referral traffic, impression brand, referring domains yang relevan, dan perubahan query di Search Console.

## Aturan keamanan backlink

Hindari paket backlink massal, PBN, komentar forum otomatis, direktori berisi ribuan situs, anchor text exact-match berulang, testimonial palsu, dan pertukaran tautan yang tidak memiliki nilai bagi pengguna. Jangan membayar pihak lain untuk menyisipkan tautan dofollow tanpa penandaan yang sesuai.

## KPI yang digunakan

| KPI | Target 90 hari |
|---|---:|
| Halaman Batch 1 dengan status indexed di GSC | 10/10, jika konten dan layanan telah diverifikasi |
| Citation bisnis konsisten | 5–10 sumber relevan |
| Referring domains lokal/industri yang relevan | 3–8 domain berkualitas |
| Tautan dari media/organisasi nyata | 1–3 tautan |
| Query brand yang menampilkan domain kanonis | Tren naik di GSC |
| Referral traffic berkualitas | Diukur dengan UTM dan GA4 |

## Catatan akses

Audit production tidak dapat membaca status indeks aktual Google. Diperlukan akses Google Search Console milik properti domain untuk memverifikasi `Page indexing`, `URL Inspection`, impressions, clicks, CTR, dan query per kota.

## Artefak teknis

Skrip audit otomatis: `scripts/audit-batch1-indexability.mjs`.

Laporan ini membedakan antara **siap di-crawl** dan **sudah diindeks** agar keputusan SEO tidak dibuat berdasarkan asumsi.
