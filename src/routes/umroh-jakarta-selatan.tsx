import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useSettings } from "@/hooks/use-site";
import { packagesQuery } from "@/lib/site-data";
import { formatRupiah, hargaMulai } from "@/lib/format";
import {
  loadSiteInfo,
  siteInfoFrom,
  pageMeta,
  breadcrumbLd,
  faqLd,
  localBusinessKotaLd,
  SITE_CITY,
  SITE_REGION,
  SEO_BRAND,
} from "@/lib/seo";

const FAQ = [
  {
    q: `Di mana kantor ${SEO_BRAND} Jakarta Selatan?`,
    a: "Kantor kami berada di Jakarta Selatan. Alamat lengkap dan jam layanan tercantum pada halaman kontak, dan jamaah dapat membuat janji temu terlebih dahulu.",
  },
  {
    q: "Apakah melayani jamaah di luar Jakarta Selatan?",
    a: "Ya. Kami melayani jamaah dari seluruh Jabodetabek dan kota lain di Indonesia. Proses pendaftaran serta konsultasi dapat dilakukan secara daring.",
  },
  {
    q: "Dari bandara mana keberangkatan dilakukan?",
    a: "Keberangkatan umumnya dari Bandara Soekarno-Hatta, dengan titik kumpul yang diinformasikan sebelum hari H.",
  },
  {
    q: "Apakah tersedia manasik untuk jamaah Jakarta Selatan?",
    a: "Manasik diadakan sebelum keberangkatan bagi seluruh jamaah dalam satu rombongan, termasuk jamaah dari Jakarta Selatan dan sekitarnya.",
  },
];

export const Route = createFileRoute("/umroh-jakarta-selatan")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `${SEO_BRAND} Jakarta Selatan — Paket Umroh Resmi`,
      description: `${SEO_BRAND} melayani jamaah umroh di Jakarta Selatan dan sekitarnya. Lihat paket terjadwal, hotel, pendampingan ibadah, dan konsultasi.`,
      path: "/umroh-jakarta-selatan",
      siteName: info.siteName,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            localBusinessKotaLd(
              info,
              { nama: "Jakarta Selatan", provinsi: SITE_REGION },
              "/umroh-jakarta-selatan",
            ),
          ),
        },
        { type: "application/ld+json", children: JSON.stringify(faqLd(FAQ)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Beranda", path: "/" },
              { name: `${SEO_BRAND} Jakarta Selatan`, path: "/umroh-jakarta-selatan" },
            ]),
          ),
        },
      ],
    };
  },
  component: UmrohJakartaSelatan,
});

const WILAYAH = [
  "Kebayoran Baru",
  "Kebayoran Lama",
  "Pesanggrahan",
  "Cilandak",
  "Pasar Minggu",
  "Jagakarsa",
  "Mampang Prapatan",
  "Pancoran",
  "Tebet",
  "Setiabudi",
];

function UmrohJakartaSelatan() {
  const { data: settings } = useSettings();
  const { data: pakets = [] } = useQuery(packagesQuery());
  const nama = settings?.agency_name ?? "Kami";
  const termurah = pakets.map((p) => hargaMulai(p)).filter(Boolean).sort((a, b) => (a as number) - (b as number))[0];

  return (
    <main className="container-page py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Layanan Lokal</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">{SEO_BRAND} Jakarta Selatan</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          {SEO_BRAND} melayani jamaah umroh di Jakarta Selatan, {SITE_REGION}, dan sekitarnya. Konsultasi paket dapat dilakukan
          langsung di kantor kami maupun secara daring.
          {termurah ? ` Paket kami tersedia mulai ${formatRupiah(termurah as number)} per jamaah.` : ""}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/paket" className="btn-gold">
            Lihat jadwal keberangkatan
          </Link>
          <Link to="/kontak" className="btn-ghost">
            Kunjungi kantor kami
          </Link>
        </div>
      </header>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Kantor di Jakarta Selatan</h2>
          <p className="mt-3 text-sm/6 text-muted-foreground">{settings?.address ?? SITE_CITY}</p>
        </div>
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Legalitas</h2>
          <p className="mt-3 text-sm/6 text-muted-foreground">{settings?.license_text ?? "Tercantum pada halaman tentang kami."}</p>
        </div>
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Keberangkatan</h2>
          <p className="mt-3 text-sm/6 text-muted-foreground">
            Titik kumpul di Bandara Soekarno-Hatta dengan pendampingan tim sejak sebelum keberangkatan.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl">Wilayah yang kami layani</h2>
        <p className="mt-3 text-sm/7 text-muted-foreground">
          Jamaah dari kecamatan berikut dan sekitarnya rutin berangkat bersama kami:
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          {WILAYAH.map((w) => (
            <li key={w} className="rounded-full border border-border px-3 py-1 text-muted-foreground">
              {w}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl">Pertanyaan jamaah Jakarta Selatan</h2>
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
        <h2 className="font-display text-2xl md:text-3xl">Konsultasi tanpa biaya</h2>
        <p className="mt-3 text-sm/7 opacity-90">
          Ceritakan rencana keberangkatan Anda, kami bantu memilih paket yang paling sesuai.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/biaya-umroh" className="btn-gold">
            Cek rincian biaya
          </Link>
          <Link to="/syarat-umroh" className="btn-ghost">
            Baca syarat umroh
          </Link>
        </div>
      </section>
    </main>
  );
}
