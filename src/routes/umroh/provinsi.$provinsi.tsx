import { createFileRoute, Link } from "@tanstack/react-router";
import { KOTA_LAYANAN } from "@/lib/kota";
import {
  absoluteUrl,
  breadcrumbLd,
  loadSiteInfo,
  pageMeta,
  SEO_BRAND,
  siteInfoFrom,
} from "@/lib/seo";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function provinceNameFromSlug(slug: string) {
  return KOTA_LAYANAN.find((city) => slugify(city.provinsi) === slug)?.provinsi ?? null;
}

export const Route = createFileRoute("/umroh/provinsi/$provinsi")({
  loader: async ({ context, params }) => {
    const [info] = await Promise.all([loadSiteInfo(context.queryClient)]);
    const name = provinceNameFromSlug(params.provinsi);
    return { info, name };
  },
  head: ({ params, loaderData }) => {
    const info = siteInfoFrom(loaderData?.info);
    const name = loaderData?.name ?? params.provinsi.replace(/-/g, " ");
    const path = `/umroh/provinsi/${params.provinsi}`;
    return {
      ...pageMeta({
        title: `${SEO_BRAND} ${name} — Layanan Umroh`,
        description: `Layanan ${SEO_BRAND} untuk jamaah di ${name}. Pilih kota Anda untuk melihat konsultasi, area pendampingan, persiapan dokumen, dan jadwal umroh.`,
        path,
        siteName: info.siteName,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd(
              [
                { name: "Beranda", path: "/" },
                { name: "Area Layanan", path: "/umroh" },
                { name, path },
              ],
              path,
            ),
          ),
        },
      ],
    };
  },
  component: ProvincePage,
});

function ProvincePage() {
  const { provinsi } = Route.useParams();
  const name = provinceNameFromSlug(provinsi);
  const cities = KOTA_LAYANAN.filter((city) => slugify(city.provinsi) === provinsi);

  if (!name || cities.length === 0) {
    return (
      <main className="container-page py-16">
        <h1 className="font-display text-3xl">Area provinsi tidak ditemukan</h1>
        <Link to="/umroh" className="mt-6 inline-flex text-sm text-gold hover:underline">
          Kembali ke area layanan
        </Link>
      </main>
    );
  }

  return (
    <main className="container-page py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="eyebrow">Area layanan provinsi</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          {SEO_BRAND} {name}
        </h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Kami membantu jamaah dari berbagai kota di {name} memilih paket, menyiapkan dokumen,
          mengikuti manasik, dan mengatur konsultasi sebelum keberangkatan. Pilih kota Anda untuk
          mendapatkan informasi layanan yang lebih relevan.
        </p>
      </header>
      <section className="mt-10" aria-labelledby="kota-provinsi">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Pilih kota</p>
            <h2 id="kota-provinsi" className="mt-2 font-display text-2xl sm:text-3xl">
              Kota layanan di {name}
            </h2>
          </div>
          <Link to="/umroh" className="text-sm text-gold hover:underline">
            Semua Indonesia
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to="/umroh/$kota"
              params={{ kota: city.slug }}
              className="bento-card p-6 transition-colors hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <h3 className="font-display text-xl">
                {SEO_BRAND} {city.nama}
              </h3>
              <p className="mt-2 text-sm/6 text-muted-foreground">{city.intro}</p>
              <p className="mt-3 text-xs/5 text-muted-foreground">
                Mencakup: {city.wilayah.slice(0, 4).join(", ")}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-12 rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
        <h2 className="font-display text-2xl">Konsultasi umroh dari {name}</h2>
        <p className="mt-3 max-w-2xl text-sm/7 text-muted-foreground">
          Tim {SEO_BRAND} siap membantu secara daring maupun melalui kantor utama. Konsultasikan
          jadwal, pilihan hotel, maskapai, tipe kamar, serta kebutuhan rombongan keluarga atau
          komunitas Anda.
        </p>
        <Link
          to="/kontak"
          className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground"
        >
          Konsultasi sekarang
        </Link>
      </section>
    </main>
  );
}
