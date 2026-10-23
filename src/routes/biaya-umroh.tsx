import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { packagesQuery } from "@/lib/site-data";
import { formatRupiah, formatTanggal, hargaMulai } from "@/lib/format";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, faqLd, SITE_CITY } from "@/lib/seo";
import { PageBreadcrumb } from "@/components/site/page-breadcrumb";

const FAQ = [
  {
    q: "Apa saja komponen yang membentuk biaya umroh?",
    a: "Biaya umroh umumnya terdiri dari tiket pesawat pulang-pergi, visa umroh, akomodasi hotel di Makkah dan Madinah, konsumsi, transportasi darat (bus), muthawif/pembimbing ibadah, serta perlengkapan jamaah.",
  },
  {
    q: "Mengapa harga paket umroh berbeda-beda?",
    a: "Perbedaan harga paling dipengaruhi oleh jarak hotel ke Masjidil Haram dan Masjid Nabawi, bintang hotel, jenis maskapai (langsung atau transit), lama perjalanan, jumlah jamaah per kamar, serta musim keberangkatan.",
  },
  {
    q: "Apakah harga paket sudah termasuk semua biaya?",
    a: "Setiap paket mencantumkan daftar termasuk dan tidak termasuk. Umumnya biaya pembuatan paspor, vaksin meningitis, kelebihan bagasi, dan pengeluaran pribadi berada di luar harga paket.",
  },
  {
    q: "Berapa uang muka untuk mendaftar umroh?",
    a: "Besaran uang muka dan jadwal pelunasan mengikuti ketentuan tiap paket. Silakan hubungi tim kami untuk rincian pembayaran paket yang Anda pilih.",
  },
];

export const Route = createFileRoute("/biaya-umroh")({
  loader: async ({ context }) => {
    const [info] = await Promise.all([
      loadSiteInfo(context.queryClient),
      context.queryClient.ensureQueryData(packagesQuery()).catch(() => []),
    ]);
    return info;
  },
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `Biaya Umroh & Harga Paket — ${info.siteName}`,
      description: `Rincian biaya umroh dan harga paket ${info.siteName} di ${SITE_CITY}, termasuk fasilitas, estimasi biaya, dan jadwal keberangkatan.`,
      path: "/biaya-umroh",
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
              { name: "Biaya Umroh", path: "/biaya-umroh" },
            ]),
          ),
        },
      ],
    };
  },
  component: BiayaUmroh,
});

const KOMPONEN = [
  {
    nama: "Tiket pesawat PP",
    detail: "Penerbangan Jakarta menuju Jeddah atau Madinah, langsung maupun transit.",
  },
  {
    nama: "Visa umroh",
    detail: "Pengurusan visa resmi beserta asuransi perjalanan sesuai ketentuan Arab Saudi.",
  },
  {
    nama: "Hotel Makkah & Madinah",
    detail: "Menginap dengan pembagian kamar quad, triple, atau double.",
  },
  { nama: "Konsumsi", detail: "Makan tiga kali sehari selama program berjalan sesuai paket." },
  { nama: "Transportasi darat", detail: "Bus antar kota dan pergerakan menuju lokasi ziarah." },
  {
    nama: "Pembimbing ibadah",
    detail: "Muthawif yang mendampingi jamaah selama pelaksanaan ibadah.",
  },
  {
    nama: "Perlengkapan jamaah",
    detail: "Koper, kain ihram atau mukena, tas paspor, dan buku panduan manasik.",
  },
];

const DI_LUAR = [
  "Pembuatan atau perpanjangan paspor",
  "Vaksinasi meningitis",
  "Kelebihan bagasi di luar ketentuan maskapai",
  "Pengeluaran pribadi, laundry, dan oleh-oleh",
  "Biaya dokumen tambahan bagi jamaah dengan kebutuhan khusus",
];

function BiayaUmroh() {
  const { data: pakets = [] } = useQuery(packagesQuery());
  const daftar = pakets
    .map((p) => ({ p, harga: hargaMulai(p) }))
    .filter((x) => x.harga)
    .sort((a, b) => (a.harga ?? 0) - (b.harga ?? 0));
  const termurah = daftar[0]?.harga ?? null;

  return (
    <main className="container-page py-10 sm:py-14">
      <PageBreadcrumb items={[{ label: "Beranda", to: "/" }, { label: "Biaya Umroh" }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Panduan Biaya</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          Biaya Umroh dan Rincian Harga Paket
        </h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Halaman ini menjelaskan komponen yang membentuk biaya umroh serta daftar harga paket yang
          sedang kami buka.
          {termurah
            ? ` Saat ini paket kami dimulai dari ${formatRupiah(termurah)} per jamaah.`
            : ""}
        </p>
      </header>

      {daftar.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Daftar harga paket terbaru</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Paket</th>
                  <th className="px-4 py-3">Durasi</th>
                  <th className="px-4 py-3">Keberangkatan</th>
                  <th className="px-4 py-3">Harga mulai</th>
                </tr>
              </thead>
              <tbody>
                {daftar.map(({ p, harga }) => (
                  <tr key={p.id} className="border-t border-border/60">
                    <td className="px-4 py-3">
                      <Link to="/paket/$slug" params={{ slug: p.slug }} className="hover:text-gold">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.duration_days ? `${p.duration_days} hari` : "-"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.departure_date ? formatTanggal(p.departure_date) : "Fleksibel"}
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatRupiah(harga as number)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Harga dapat berubah mengikuti ketersediaan tiket dan kamar hotel. Konfirmasi terakhir
            dilakukan saat pendaftaran.
          </p>
        </section>
      )}

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Komponen biaya umroh</h2>
          <ul className="mt-4 space-y-3 text-sm/6 text-muted-foreground">
            {KOMPONEN.map((k) => (
              <li key={k.nama}>
                <span className="font-medium text-foreground">{k.nama}</span> — {k.detail}
              </li>
            ))}
          </ul>
        </div>
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Umumnya di luar harga paket</h2>
          <ul className="mt-4 space-y-3 text-sm/6 text-muted-foreground">
            {DI_LUAR.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Rincian pasti selalu tercantum pada masing-masing halaman paket.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl">Pertanyaan seputar biaya umroh</h2>
        <div className="mt-4 space-y-4">
          {FAQ.map((f) => (
            <div key={f.q} className="bento-card p-6">
              <h3 className="font-medium">{f.q}</h3>
              <p className="mt-2 text-sm/6 text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bento-card surface-emerald mt-14 p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl">Butuh perhitungan untuk rombongan?</h2>
        <p className="mt-3 text-sm/7 opacity-90">
          Kami dapat menyusun estimasi biaya sesuai jumlah jamaah, pilihan hotel, dan tanggal
          keberangkatan.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/paket" className="btn-gold">
            Lihat semua paket
          </Link>
          <Link to="/kontak" className="btn-ghost">
            Konsultasi biaya
          </Link>
        </div>
      </section>
    </main>
  );
}
