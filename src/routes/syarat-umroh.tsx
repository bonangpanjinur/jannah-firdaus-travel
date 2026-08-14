import { createFileRoute, Link } from "@tanstack/react-router";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, faqLd } from "@/lib/seo";
import { PageBreadcrumb } from "@/components/site/page-breadcrumb";

const FAQ = [
  {
    q: "Berapa lama masa berlaku paspor untuk umroh?",
    a: "Paspor sebaiknya masih berlaku minimal enam bulan pada tanggal keberangkatan. Nama pada paspor dianjurkan terdiri dari tiga suku kata.",
  },
  {
    q: "Apakah vaksin meningitis wajib untuk umroh?",
    a: "Vaksinasi meningitis merupakan syarat kesehatan yang diminta otoritas Arab Saudi. Sertifikat vaksin diurus sebelum keberangkatan dan biayanya biasanya di luar harga paket.",
  },
  {
    q: "Apakah perempuan harus berangkat dengan mahram?",
    a: "Ketentuan mahram bagi jamaah perempuan mengikuti aturan terbaru Kerajaan Arab Saudi. Tim kami akan menginformasikan ketentuan yang berlaku pada periode keberangkatan Anda.",
  },
  {
    q: "Dokumen apa yang harus saya serahkan saat mendaftar?",
    a: "Umumnya paspor asli, pas foto berlatar putih, fotokopi KTP dan kartu keluarga, buku nikah atau akta lahir bila diperlukan, serta bukti vaksinasi.",
  },
];

export const Route = createFileRoute("/syarat-umroh")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `Syarat dan Dokumen Umroh Terbaru — ${info.siteName}`,
      description: `Daftar syarat umroh: paspor, vaksin meningitis, dokumen pendaftaran, dan persiapan keberangkatan bersama ${info.siteName}.`,
      path: "/syarat-umroh",
      siteName: info.siteName,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqLd(FAQ)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Beranda", path: "/" },
              { name: "Syarat Umroh", path: "/syarat-umroh" },
            ]),
          ),
        },
      ],
    };
  },
  component: SyaratUmroh,
});

const DOKUMEN = [
  "Paspor asli dengan masa berlaku minimal 6 bulan saat keberangkatan",
  "Pas foto berlatar putih dengan tampak wajah 80 persen",
  "Fotokopi KTP dan kartu keluarga",
  "Buku nikah bagi pasangan suami istri, akta lahir bagi anak",
  "Kartu atau sertifikat vaksinasi meningitis",
];

const LANGKAH = [
  { judul: "Pilih paket", isi: "Tentukan tanggal keberangkatan, tipe kamar, dan hotel yang sesuai kebutuhan." },
  { judul: "Daftar dan uang muka", isi: "Isi formulir pendaftaran, lalu lakukan pembayaran awal sesuai ketentuan paket." },
  { judul: "Lengkapi dokumen", isi: "Serahkan paspor dan berkas pendukung untuk proses visa." },
  { judul: "Manasik", isi: "Ikuti bimbingan manasik agar pelaksanaan ibadah berjalan tertib." },
  { judul: "Pelunasan & keberangkatan", isi: "Selesaikan pelunasan sebelum tenggat, lalu berangkat bersama rombongan." },
];

function SyaratUmroh() {
  return (
    <main className="container-page py-10 sm:py-14">
      <PageBreadcrumb items={[{ label: "Beranda", to: "/" }, { label: "Syarat Umroh" }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Persiapan Jamaah</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Syarat dan Dokumen Umroh</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Ringkasan persyaratan administrasi dan kesehatan yang perlu disiapkan sebelum berangkat umroh, beserta alur
          pendaftaran bersama kami.
        </p>
      </header>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Dokumen yang disiapkan</h2>
          <ul className="mt-4 space-y-3 text-sm/6 text-muted-foreground">
            {DOKUMEN.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Syarat kesehatan</h2>
          <p className="mt-4 text-sm/6 text-muted-foreground">
            Jamaah diminta dalam kondisi sehat untuk melakukan perjalanan jauh dan telah menerima vaksinasi meningitis.
            Jamaah dengan riwayat penyakit tertentu, lansia, atau sedang hamil sebaiknya membawa surat keterangan dokter
            dan menginformasikannya kepada tim kami sejak awal.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl">Alur pendaftaran</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-5">
          {LANGKAH.map((l, i) => (
            <li key={l.judul} className="bento-card p-5">
              <span className="text-gold font-display text-2xl">{i + 1}</span>
              <h3 className="mt-2 font-medium">{l.judul}</h3>
              <p className="mt-1 text-sm/6 text-muted-foreground">{l.isi}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl">Pertanyaan seputar syarat umroh</h2>
        <div className="mt-4 space-y-4">
          {FAQ.map((f) => (
            <div key={f.q} className="bento-card p-6">
              <h3 className="font-medium">{f.q}</h3>
              <p className="mt-2 text-sm/6 text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Ketentuan visa dan kesehatan dapat berubah sewaktu-waktu mengikuti kebijakan Kerajaan Arab Saudi dan Kementerian
          Agama RI. Hubungi kami untuk konfirmasi aturan terkini.
        </p>
      </section>

      <section className="bento-card surface-emerald mt-14 p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl">Siap mendaftar?</h2>
        <p className="mt-3 text-sm/7 opacity-90">Tim kami membantu pengecekan dokumen Anda sebelum proses visa.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/paket" className="btn-gold">
            Pilih paket umroh
          </Link>
          <Link to="/kontak" className="btn-ghost">
            Tanya persyaratan
          </Link>
        </div>
      </section>
    </main>
  );
}
