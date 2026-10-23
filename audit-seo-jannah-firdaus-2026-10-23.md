# Audit SEO dan Visibilitas Jannah Firdaus

**Tanggal audit:** 23 Oktober 2026  
**Website yang diaudit:** https://www.jannahfirdaustravel.co.id/  
**Fokus:** Mengapa pencarian “Jannah Firdaus”, “Jannah Firdaus Tour”, dan “Jannah Firdaus Travel” belum secara konsisten menampilkan domain `.co.id` sebagai hasil utama.

## Diagnosis utama

Website `.co.id` sebenarnya sudah memiliki fondasi SEO yang cukup baik: halaman dapat dirayapi, konten utama muncul di HTML, ada canonical, sitemap, schema Organization/WebSite, halaman paket, halaman kota, FAQ, dan CTA WhatsApp. Jadi masalah utamanya bukan sekadar “belum ada meta tag”.

Masalah terbesar adalah **Google belum mendapatkan sinyal yang cukup kuat bahwa domain `.co.id` adalah satu-satunya rumah resmi dan entitas utama untuk nama Jannah Firdaus**. Di hasil pencarian untuk “Jannah Firdaus travel”, Google menampilkan knowledge panel dan Google Business Profile untuk PT Jannah Firdaus Tour & Travel yang terhubung ke `jannahfirdaus.com`, dengan sekitar 1.291 ulasan dan rating 4,6 pada saat audit. Hasil pencarian juga memuat `jannahfirdaus.id`, `jannahfirdaustravel.id`, akun sosial, TripAdvisor, dan domain lain yang menggunakan nama serupa. [1]

Artinya, ketika pengguna mencari nama brand, domain `.co.id` harus bersaing bukan hanya dengan travel umroh lain, tetapi dengan **beberapa aset yang memakai nama brand yang sama atau sangat mirip**. Jika hubungan antara domain-domain tersebut tidak dijelaskan secara konsisten, otoritas, klik, ulasan, dan penyebutan brand dapat terpecah. Hubungan kepemilikan atau afiliasi domain-domain tersebut belum dapat saya pastikan dari audit ini, sehingga jangan melakukan redirect atau klaim afiliasi sebelum diverifikasi.

## Temuan pada website `.co.id`

### Yang sudah bagus

- Homepage memiliki H1 yang jelas: “Jannah Firdaus Tour Travel: Wujudkan Perjalanan Umroh Impian Bersama Kami”.
- Konten homepage sudah crawlable dan memuat layanan, paket, tanggal, durasi, harga mulai, serta tautan internal ke halaman paket.
- Terdapat halaman khusus untuk paket umroh, biaya umroh, syarat umroh, umroh plus, galeri, tentang, kontak, FAQ, dan area layanan.
- Canonical homepage mengarah ke `https://www.jannahfirdaustravel.co.id/`.
- Homepage mengeluarkan schema `TravelAgency` dan `WebSite`, termasuk nama, logo, telepon, email, dan satu tautan sosial.
- Domain menggunakan HTTPS dan halaman publik dapat dibuka dengan normal.
- CTA WhatsApp jelas dan mudah ditemukan.

Halaman live yang diperiksa menampilkan tiga paket dengan harga, tanggal keberangkatan, durasi, serta tautan detail. Ini jauh lebih baik daripada website yang hanya menampilkan gambar flyer tanpa teks HTML. [2]

### Kekurangan teknis yang perlu diperbaiki

1. **Title homepage terlalu panjang.** Title saat audit berjumlah sekitar 66 karakter: `Jannah Firdaus Tour Travel | Paket & Layanan Umroh Jakarta Selatan`. Target yang lebih aman sekitar 50–60 karakter. Versi yang lebih fokus misalnya: `Jannah Firdaus Tour Travel | Umroh Jakarta Selatan`.

2. **Meta description terlalu panjang.** Description saat audit berjumlah sekitar 184 karakter. Ini berisiko terpotong di hasil pencarian. Gunakan sekitar 140–160 karakter dan masukkan pembeda yang nyata, misalnya izin, lokasi, paket, atau layanan konsultasi.

3. **Entity/schema belum cukup kuat untuk local SEO.** Schema saat ini membantu, tetapi perlu dilengkapi dan dinormalisasi dengan `Organization` atau `TravelAgency` yang memiliki satu `@id` stabil, alamat kantor, area layanan, jam buka, telepon, email, logo, dan `sameAs` untuk seluruh profil resmi. Jangan menambahkan rating atau jumlah ulasan jika tidak berasal dari sumber yang benar-benar dapat diverifikasi.

4. **Google Business Profile belum terlihat dominan.** Dalam pencarian yang diaudit, yang muncul kuat justru profil untuk entitas `.com`. Tidak terlihat profil Google Business yang secara jelas menguatkan domain `.co.id`. Ini kemungkinan adalah kekurangan terbesar untuk pencarian brand dan “travel umroh Jakarta Selatan”.

5. **Bukti kepercayaan masih terlalu banyak berasal dari klaim internal.** Tulisan “PPIU Nomor 505 Tahun 2020 dan PIHK Nomor 241 Tahun 2021” sudah terlihat, tetapi halaman kepercayaan sebaiknya menyertakan dokumen atau tautan verifikasi eksternal, tanggal berlaku, nama badan hukum, alamat, dan penjelasan yang konsisten.

6. **Profil sosial masih tipis.** Schema homepage yang diamati hanya menghubungkan satu profil Facebook. Semua akun resmi yang benar-benar dimiliki perlu konsisten memakai nama, logo, nomor telepon, alamat, domain kanonik, dan tautan silang ke website.

7. **Paket perlu sinyal freshness yang lebih kuat.** Setiap halaman paket harus memiliki tanggal keberangkatan, harga berlaku sampai kapan, status tersedia/habis, maskapai, hotel, fasilitas, FAQ, serta CTA yang tetap aktif. Paket lama jangan dibiarkan menjadi URL aktif tanpa status yang jelas.

8. **Halaman kota harus berisi bukti lokal, bukan hanya nama kota.** Halaman seperti Jakarta Selatan perlu memiliki alamat kantor yang benar, peta, jam buka, nomor cabang, foto kantor, staf atau proses pelayanan, testimoni jamaah dari area tersebut, jadwal keberangkatan, serta FAQ lokal. Halaman kota yang hanya mengganti nama kota dapat dianggap tipis atau doorway page.

## Perbandingan dengan pesaing

### Jannah Firdaus `.com`, `.id`, dan `.travel.id`

Aset-aset dengan nama Jannah Firdaus yang lebih lama memiliki lebih banyak halaman terindeks, artikel, paket, halaman kantor, aplikasi, sosial, dan riwayat brand. Beberapa halaman mereka memuat cerita perusahaan sejak 2003, jumlah jamaah, cabang, paket dengan tanggal/harga, dokumen, FAQ, dan halaman kantor. `jannahfirdaus.com` juga memiliki jejak Google Business Profile dan ulasan yang sangat kuat pada pencarian brand. [1] [3] [4] [5]

Keunggulan mereka bukan berarti implementasi teknisnya sempurna. Audit pesaing juga menemukan metadata berulang, alamat/telepon yang tidak selalu konsisten, paket lama, dan beberapa schema yang kurang rapi. Ini adalah peluang Anda: **domain `.co.id` bisa menang dengan identitas yang lebih bersih, informasi lebih akurat, dan bukti lokal yang lebih mudah diverifikasi**.

### Tazkia Tours & Travel

Tazkia memiliki kombinasi yang kuat antara halaman paket aktif, FAQ yang dalam, dokumen izin/akreditasi, Google Maps dengan sekitar 4,7/5 dari 171 ulasan pada sumber yang diaudit, serta halaman tentang dan kontak. Di sisi lain, beberapa halaman mereka memiliki title dan description yang sama, tidak memiliki canonical/schema yang kuat, dan detail paket masih bergantung pada loading JavaScript. [6] [7] [8]

Pelajarannya: ulasan Google dan bukti izin yang bisa diperiksa dapat lebih kuat daripada sekadar desain website. Website Anda perlu memiliki bukti eksternal yang serupa.

### RabbaniTour

RabbaniTour unggul pada banyak halaman jadwal, paket, lokasi, kategori bulan, artikel, FAQ, dan CTA konsultasi. Mereka juga memiliki halaman cabang. Kekurangannya adalah domain dan CTA yang bercampur, halaman kontak yang bermasalah, serta beberapa klaim jumlah jamaah dan informasi kantor yang tidak sepenuhnya konsisten. [9] [10]

Pelajarannya: struktur halaman yang banyak memang membantu jangkauan keyword, tetapi harus diikuti kualitas unik tiap halaman dan satu domain utama yang konsisten.

## Prioritas perbaikan

### P0 — lakukan terlebih dahulu: konsolidasi identitas

1. Tentukan secara resmi apakah `jannahfirdaustravel.co.id` adalah domain korporat utama.
2. Buat halaman “Website dan Kanal Resmi” yang menjelaskan domain utama, nama badan usaha, kantor pusat, nomor telepon, WhatsApp, email, sosial, dan domain lain yang memang resmi jika ada.
3. Samakan persis nama badan hukum, alamat, kode pos, nomor telepon, email, nomor PPIU/PIHK, logo, dan deskripsi di website, Google Business Profile, Instagram, Facebook, YouTube, TikTok, WhatsApp, dan direktori pihak ketiga.
4. Klaim dan verifikasi Google Business Profile untuk kantor nyata. Pastikan nama, kategori, alamat, telepon, jam, foto, website, dan link rute konsisten.
5. Minta ulasan dari jamaah nyata dan arahkan ulasan ke profil kantor yang benar. Jangan membuat atau menampilkan rating agregat tanpa sumber yang valid.

### P1 — perbaiki dalam sprint SEO berikutnya

1. Ringkas title dan meta description homepage serta semua halaman penting.
2. Tambahkan schema `TravelAgency`/`Organization` dan `LocalBusiness` hanya untuk lokasi nyata, dengan `@id`, NAP, jam buka, area layanan, logo, dan `sameAs` yang konsisten.
3. Perkuat halaman `/tentang` menjadi halaman trust: legalitas, sejarah, tim, proses pendaftaran, perlindungan jamaah, dokumen, verifikasi, dan tanggal pembaruan.
4. Perkuat `/umroh-jakarta-selatan` dengan alamat kantor dan bukti layanan lokal yang nyata.
5. Buat halaman kantor/cabang hanya jika benar-benar ada layanan atau representasi di lokasi tersebut.
6. Tambahkan `BreadcrumbList`, `Product`/`Offer`, FAQ, harga, tanggal, status, dan itinerary pada halaman paket apabila isinya benar-benar tersedia di halaman.
7. Pastikan sitemap hanya memasukkan URL canonical yang aktif dan bernilai. URL paket lama harus diperbarui, dialihkan ke pengganti yang relevan, atau diberi status yang jelas.

### P2 — bangun otoritas di luar website

1. Dapatkan penyebutan dari organisasi, media lokal, komunitas masjid, mitra resmi, dan direktori perjalanan yang benar-benar relevan.
2. Buat konten informatif yang menjawab pertanyaan calon jamaah: biaya umroh Jakarta Selatan, cara memilih travel resmi, dokumen, jarak hotel ke Masjidil Haram, maskapai, manasik, jadwal Ramadan, dan cara memeriksa izin.
3. Publikasikan pengalaman jamaah dengan izin, nama depan/inisial, kota, tanggal keberangkatan, foto, dan konteks paket.
4. Ukur Search Console per query: “jannah firdaus”, “jannah firdaus travel”, “travel umroh jakarta selatan”, “paket umroh jakarta”, dan variasi harga/jadwal. Tanpa data Search Console, jangan menganggap perubahan ranking hanya berdasarkan satu pencarian manual.

## Kesimpulan

Jika targetnya adalah muncul di halaman pertama untuk pencarian **nama brand**, prioritas pertama bukan menambah puluhan artikel. Prioritasnya adalah memenangkan identitas: Google Business Profile, ulasan, domain utama, NAP, legalitas, sosial resmi, dan tautan silang yang konsisten.

Jika targetnya adalah muncul untuk **keyword non-brand** seperti “travel umroh Jakarta Selatan”, website perlu bukti lokal dan konten komersial yang lebih spesifik: alamat kantor, peta, paket aktif, harga dan tanggal, FAQ, testimoni lokal, serta halaman yang benar-benar berbeda dari halaman kota lain.

Fondasi website Anda sudah cukup layak untuk dikembangkan. Namun, selama domain-domain bernama Jannah Firdaus yang lebih lama memiliki lebih banyak usia, ulasan, profil lokal, konten, dan penyebutan eksternal, domain `.co.id` akan sulit menjadi hasil utama walaupun desain dan meta tag-nya sudah baik.

## Referensi

[1]: https://www.google.com/search?q=%22Jannah+Firdaus%22+travel "Hasil pencarian Google untuk Jannah Firdaus travel"
[2]: https://www.jannahfirdaustravel.co.id/ "Homepage Jannah Firdaus Tour Travel"
[3]: https://jannahfirdaus.com/ "Jannah Firdaus Tour & Travel"
[4]: https://www.jannahfirdaus.id/ "Website Jannah Firdaus"
[5]: https://www.jannahfirdaustravel.id/ "Jannah Firdaus Travel"
[6]: https://tazkiatravel.com/ "Tazkia Tours & Travel"
[7]: https://www.tazkiatravel.com/faq "FAQ Tazkia Tours & Travel"
[8]: https://himpuh.or.id/daftar-anggota/detail/218/pt-tauba-zakka-atkia "Profil anggota HIMPUH PT Tauba Zakka Atkia"
[9]: https://rabbanitour.travel/ "RabbaniTour"
[10]: https://rabbanitour.travel/kantor/ "Kantor RabbaniTour"
[11]: https://himpuh.or.id/daftar-anggota/detail/235/pt-jannah-firdaus-tour-travel "Profil anggota HIMPUH PT Jannah Firdaus Tour & Travel"
[12]: https://www.tripadvisor.com/Attraction_Review-g297712-d23139483-Reviews-Jannah_Firdaus_Tour_Travel-Semarang_Central_Java_Java.html "Tripadvisor Jannah Firdaus Tour Travel"
