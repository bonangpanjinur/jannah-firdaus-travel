import { createFileRoute, Link } from "@tanstack/react-router";
import { useSettings } from "@/hooks/use-site";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, faqLd, SITE_CITY } from "@/lib/seo";

const FAQ = [
  {
    q: "Bagaimana cara mendaftar paket umroh?",
    a: "Pilih paket pada halaman Paket Umroh, isi formulir pendaftaran di halaman paket tersebut, lalu tim kami menghubungi Anda untuk konfirmasi dokumen dan pembayaran.",
  },
  {
    q: "Apakah harga sudah termasuk perlengkapan jamaah?",
    a: "Perlengkapan jamaah seperti koper, kain ihram atau mukena, dan buku manasik umumnya termasuk. Rincian termasuk dan tidak termasuk tercantum pada setiap halaman paket.",
  },
  {
    q: "Bisakah memilih teman sekamar?",
    a: "Bisa. Sampaikan permintaan sekamar saat pendaftaran, dan kami sesuaikan dengan tipe kamar yang Anda ambil.",
  },
  {
    q: "Apakah bisa berangkat rombongan keluarga atau komunitas?",
    a: "Bisa. Kami melayani rombongan keluarga, pengajian, maupun perusahaan dengan penyesuaian jadwal dan pilihan hotel.",
  },
  {
    q: "Bagaimana jika saya batal berangkat?",
    a: "Ketentuan pembatalan mengikuti kebijakan tiap paket karena tiket dan hotel telah dipesan lebih awal. Tim kami akan menjelaskan konsekuensinya sebelum Anda melakukan pembayaran.",
  },
  {
    q: "Apakah ada bimbingan ibadah selama perjalanan?",
    a: "Setiap rombongan didampingi pembimbing ibadah, dan seluruh jamaah mengikuti manasik sebelum keberangkatan.",
  },
];

export const Route = createFileRoute("/faq")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `FAQ Umroh: Pertanyaan yang Sering Diajukan — ${info.siteName}`,
      description: `Jawaban atas pertanyaan umum seputar pendaftaran, pembayaran, kamar, dan bimbingan ibadah pada paket umroh ${info.siteName} ${SITE_CITY}.`,
      path: "/faq",
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
              { name: "FAQ", path: "/faq" },
            ]),
          ),
        },
      ],
    };
  },
  component: Faq,
});

function Faq() {
  const { data: settings } = useSettings();

  return (
    <main className="container-page py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Bantuan</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Pertanyaan yang Sering Diajukan</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Kumpulan jawaban seputar pendaftaran dan pelaksanaan umroh bersama {settings?.agency_name ?? "kami"}.
        </p>
      </header>

      <div className="mt-10 space-y-4">
        {FAQ.map((f) => (
          <section key={f.q} className="bento-card p-6">
            <h2 className="font-medium">{f.q}</h2>
            <p className="mt-2 text-sm/6 text-muted-foreground">{f.a}</p>
          </section>
        ))}
      </div>

      <section className="bento-card surface-emerald mt-14 p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl">Masih ada pertanyaan lain?</h2>
        <p className="mt-3 text-sm/7 opacity-90">Tim kami siap menjawab langsung melalui WhatsApp atau formulir kontak.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/kontak" className="btn-gold">
            Hubungi kami
          </Link>
          <Link to="/syarat-umroh" className="btn-ghost">
            Lihat syarat umroh
          </Link>
        </div>
      </section>
    </main>
  );
}
