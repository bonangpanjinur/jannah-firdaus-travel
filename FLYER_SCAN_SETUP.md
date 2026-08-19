# Setup Scan Flyer Vision AI

Fitur scan flyer memakai endpoint server `/api/scan-flyer`. Browser hanya mengirim path file Storage dan access token admin; API key Vision AI tidak pernah dikirim ke client.

## Environment variables

Tambahkan variable berikut pada environment deployment, terutama **Production** dan **Preview** jika keduanya digunakan:

```env
FLYER_SCAN_API_KEY=your-server-side-vision-api-key
FLYER_SCAN_API_BASE=https://api.openai.com/v1
FLYER_SCAN_MODEL=gpt-5-mini
```

`FLYER_SCAN_API_BASE` bersifat opsional dan harus menunjuk ke endpoint yang kompatibel dengan OpenAI Chat Completions serta mendukung input gambar dan JSON Schema structured output. Jika tidak diisi, server akan memakai `OPENAI_API_BASE` atau endpoint OpenAI default. `FLYER_SCAN_MODEL` default ke `gpt-5-mini` pada endpoint OpenAI-compatible biasa dan `gemini-3-flash-preview` bila `BUILT_IN_FORGE_API_URL` tersedia; ganti dengan model vision yang tersedia pada provider Anda bila diperlukan.

## Alur penggunaan

1. Pastikan akun sudah memiliki role `admin` pada `public.user_roles`.
2. Buka `/admin/paket/import`.
3. Pilih satu flyer dengan format JPG, PNG, WebP, GIF, atau AVIF; ukuran maksimal 5 MB.
4. Klik **Scan flyer**.
5. Periksa hasil ekstraksi dan edit nama, slug, tanggal, maskapai, hotel, harga, atau kuota jika diperlukan.
6. Klik **Import sekarang** untuk menyimpan paket dan flyer.

Model hanya boleh mengembalikan nilai yang terbaca dari gambar. Field yang tidak terbaca dikembalikan kosong/null dan ditampilkan untuk pemeriksaan admin. Confidence dan warnings ditampilkan pada preview sebagai sinyal tambahan, bukan sebagai jaminan kebenaran data.

## Troubleshooting

Jika muncul pesan `Vision AI belum dikonfigurasi`, environment variable belum tersedia pada runtime server atau deployment belum di-redeploy setelah variable ditambahkan. Jika muncul `Sesi admin tidak valid`, lakukan sign out/sign in kembali. Jika provider mengembalikan error, pastikan model yang dipilih mendukung vision dan `response_format` JSON Schema.
