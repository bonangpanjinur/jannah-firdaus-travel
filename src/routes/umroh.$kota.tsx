import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useSettings } from "@/hooks/use-site";
import { packagesQuery, type Paket } from "@/lib/site-data";
import { formatRupiah, hargaMulai } from "@/lib/format";
import { PackageCard } from "@/components/site/package-card";
import { kotaBySlug, KOTA_LAYANAN, type KotaLayanan } from "@/lib/kota";
import {
  loadSiteInfo,
  siteInfoFrom,
  pageMeta,
  breadcrumbLd,
  faqLd,
  faqUmrohUmum,
  tripLd,
  itemListLd,
  layananKotaLd,
  localBusinessKotaLd,
  SITE_CITY,
  SEO_BRAND,
} from "@/lib/seo";

function faqKota(kota: KotaLayanan, siteName: string) {
  return [
    {
      q: `Apakah ${siteName} melayani jamaah umroh dari ${kota.nama}?`,
      a: `Ya. ${siteName} melayani pendaftaran jamaah umroh asal ${kota.nama}, ${kota.provinsi}. Konsultasi dapat dilakukan secara daring maupun langsung di kantor kami di ${SITE_CITY}.`,
    },
    {
      q: `Dari bandara mana jamaah ${kota.nama} berangkat?`,
      a: `Keberangkatan dilakukan dari ${kota.bandara}. Titik kumpul dan jam berkumpul diinformasikan beberapa hari sebelum hari keberangkatan.`,
    },
    {
      q: `Apakah manasik tersedia untuk jamaah ${kota.nama}?`,
      a: `Manasik umroh diadakan sebelum keberangkatan untuk seluruh jamaah dalam satu rombongan, termasuk jamaah dari ${kota.nama}.`,
    },
    {
      q: `Bagaimana cara mendaftar umroh dari ${kota.nama}?`,
      a: `Pilih paket yang sesuai, hubungi kami melalui WhatsApp, lalu kirim dokumen pendaftaran. Seluruh proses dapat diselesaikan tanpa harus datang berkali-kali ke kantor.`,
    },
    ...faqUmrohUmum(siteName, kota.nama),
  ];
}

export const Route = createFileRoute("/umroh/$kota")({
  loader: async ({ context, params }) => {
    const kota = kotaBySlug(params.kota);
    if (!kota) throw notFound();
    const [info, pakets] = await Promise.all([
      loadSiteInfo(context.queryClient),
      context.queryClient.ensureQueryData(packagesQuery({ limit: 3 })).catch((): Paket[] => []),
    ]);
    return { info, kota, pakets: pakets.slice(0, 3) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Halaman tidak ditemukan" }, { name: "robots", content: "noindex" }],
      };
    }
    const info = siteInfoFrom(loaderData.info);
    const kota = loaderData.kota;
    const path = `/umroh/${kota.slug}`;
    const base = pageMeta({
      title: `${SEO_BRAND} ${kota.nama} — Paket & Jadwal Umroh`,
      description: `${SEO_BRAND} melayani jamaah umroh dari ${kota.nama}, ${kota.provinsi}. Lihat paket, jadwal, hotel, manasik, dan pendampingan ibadah.`,
      path,
      siteName: info.siteName,
      imageAlt: `${SEO_BRAND} ${kota.nama} — layanan perjalanan umroh`,
    });
    const pakets = loaderData.pakets ?? [];
    const trips = pakets.map((paket) =>
      tripLd(paket, hargaMulai(paket), info, {
        departureCity: kota.nama,
        departureRegion: kota.provinsi,
      }),
    );
    const katalog = pakets.map((paket) => ({
      name: paket.name,
      url: `/paket/${paket.slug}`,
      price: hargaMulai(paket),
      departureDate: paket.departure_date,
      quota: paket.quota,
      durationDays: paket.duration_days,
    }));

    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(localBusinessKotaLd(info, kota, path)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqLd(faqKota(kota, info.siteName), path)),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(layananKotaLd(info, kota, path, katalog)),
        },
        ...(trips.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify(
                  itemListLd(`Paket umroh untuk jamaah ${kota.nama}`, path, trips),
                ),
              },
            ]
          : []),
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd(
              [
                { name: "Beranda", path: "/" },
                { name: "Area Layanan", path: "/umroh" },
                { name: `${SEO_BRAND} ${kota.nama}`, path },
              ],
              path,
            ),
          ),
        },
      ],
    };
  },
  notFoundComponent: KotaNotFound,
  component: HalamanKota,
});

function KotaNotFound() {
  return (
    <main className="container-page py-20 text-center">
      <h1 className="font-display text-3xl">Area layanan tidak ditemukan</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Silakan pilih kota lain dari daftar area layanan kami.
      </p>
      <Link to="/umroh" className="btn-gold mt-6 inline-flex">
        Lihat area layanan
      </Link>
    </main>
  );
}

function HalamanKota() {
  const { kota, pakets: initialPakets } = Route.useLoaderData();
  const { data: settings } = useSettings();
  const { data: queryPakets } = useQuery(packagesQuery({ limit: 3 }));
  const pakets = (queryPakets?.length ? queryPakets : initialPakets).slice(0, 3);
  const nama = settings?.agency_name ?? "Kami";
  const termurah = pakets
    .map((p) => hargaMulai(p))
    .filter((v): v is number => typeof v === "number")
    .sort((a, b) => a - b)[0];
  const faq = faqKota(kota, nama);
  const lainnya = KOTA_LAYANAN.filter((k) => k.slug !== kota.slug).slice(0, 6);

  return (
    <main className="container-page py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:underline">
          Beranda
        </Link>
        <span className="px-2">/</span>
        <Link to="/umroh" className="hover:underline">
          Area Layanan
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">
          {SEO_BRAND} {kota.nama}
        </span>
      </nav>

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Area Layanan</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          {SEO_BRAND} {kota.nama}
        </h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          {SEO_BRAND} melayani jamaah umroh asal {kota.nama}, {kota.provinsi}. {kota.intro}
          {termurah ? ` Paket tersedia mulai ${formatRupiah(termurah)} per jamaah.` : ""}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/paket" className="btn-gold">
            Lihat jadwal keberangkatan
          </Link>
          <Link to="/kontak" className="btn-ghost">
            Hubungi kami
          </Link>
        </div>
      </header>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Kantor layanan</h2>
          <p className="mt-3 text-sm/6 text-muted-foreground">{settings?.address ?? SITE_CITY}</p>
        </div>
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Keberangkatan</h2>
          <p className="mt-3 text-sm/6 text-muted-foreground">
            Jamaah {kota.nama} berangkat dari {kota.bandara} dengan pendampingan tim sejak titik
            kumpul.
          </p>
        </div>
        <div className="bento-card p-6">
          <h2 className="font-display text-xl">Legalitas</h2>
          <p className="mt-3 text-sm/6 text-muted-foreground">
            {settings?.license_text ?? "Tercantum pada halaman tentang kami."}
          </p>
        </div>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="bento-card p-6">
          <h2 className="font-display text-2xl">Pendampingan untuk jamaah {kota.nama}</h2>
          <p className="mt-3 text-sm/7 text-muted-foreground">{kota.service_note}</p>
        </div>
        <div className="bento-card p-6">
          <h2 className="font-display text-2xl">Wilayah {kota.nama} yang kami layani</h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {kota.wilayah.map((w) => (
              <li
                key={w}
                className="rounded-full border border-border px-3 py-1 text-muted-foreground"
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {pakets.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-display text-2xl">Paket umroh untuk jamaah {kota.nama}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {pakets.map((paket) => (
              <PackageCard key={paket.id} paket={paket} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-14">
        <h2 className="font-display text-2xl">Pertanyaan jamaah {kota.nama}</h2>
        <div className="mt-4 space-y-4">
          {faq.map((f) => (
            <div key={f.q} className="bento-card p-6">
              <h3 className="font-medium">{f.q}</h3>
              <p className="mt-2 text-sm/6 text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl">Area layanan lainnya</h2>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          {lainnya.map((k) => (
            <li key={k.slug}>
              <Link
                to="/umroh/$kota"
                params={{ kota: k.slug }}
                className="rounded-full border border-border px-3 py-1 text-muted-foreground hover:text-foreground"
              >
                {SEO_BRAND} {k.nama}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
