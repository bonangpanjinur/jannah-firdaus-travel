export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <title>Halaman sedang bermasalah (500)</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <style>
      body { font: 15px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; background: #12110f; color: #f5f1e8; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 34rem; width: 100%; text-align: center; padding: 2rem; border: 1px solid #2c2823; border-radius: 1rem; background: #1a1815; }
      .code { font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; color: #c9a227; margin: 0 0 0.5rem; }
      h1 { font-size: 1.4rem; margin: 0 0 0.5rem; }
      p { color: #b9b1a3; margin: 0 0 1.25rem; }
      ol { text-align: left; color: #b9b1a3; margin: 0 0 1.5rem; padding-left: 1.2rem; }
      li { margin-bottom: 0.4rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.55rem 1.1rem; border-radius: 0.5rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #c9a227; color: #12110f; font-weight: 600; }
      .secondary { background: transparent; color: #f5f1e8; border-color: #3a352e; }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="code">Error 500</p>
      <h1>Maaf, halaman ini sedang bermasalah</h1>
      <p>Terjadi gangguan di sisi server kami. Data Anda aman dan tim kami sedang menanganinya.</p>
      <ol>
        <li>Muat ulang halaman &mdash; gangguan biasanya hanya sementara.</li>
        <li>Periksa koneksi internet Anda, lalu coba lagi.</li>
        <li>Kembali ke beranda dan buka halaman dari menu utama.</li>
        <li>Masih bermasalah? Hubungi kami lewat halaman Kontak.</li>
      </ol>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Coba lagi</button>
        <a class="secondary" href="/">Ke beranda</a>
        <a class="secondary" href="/kontak">Hubungi kami</a>
      </div>
    </div>
  </body>
</html>`;
}
