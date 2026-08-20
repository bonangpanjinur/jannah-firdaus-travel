import { createFileRoute, Link } from "@tanstack/react-router";
import { KOTA_LAYANAN } from "@/lib/kota";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, SITE_CITY, SEO_BRAND } from "@/lib/seo";

export const Route = createFileRoute("/umroh/")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `${SEO_BRAND} Jabodetabek — Area Layanan Umroh`,
      description: `Daftar kota yang dilayani ${SEO_BRAND}: Jakarta, Depok, Bekasi, Bogor, Tangerang Selatan, dan sekitarnya.`,
      path: "/umroh",
      siteName: info.siteName,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Beranda", path: "/" },
              { name: "Area Layanan", path: "/umroh" },
            ]),
          ),
        },
      ],
    };
  },
  component: AreaLayanan,
});

function AreaLayanan() {
  return (
    <main className="container-page py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Area Layanan</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">{SEO_BRAND} Jabodetabek</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Kantor kami berada di {SITE_CITY} dan melayani jamaah dari berbagai kota di sekitarnya. Pilih kota Anda untuk
          melihat informasi layanan, wilayah jangkauan, dan jadwal keberangkatan.
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/umroh-jakarta-selatan" className="bento-card p-6 transition-colors hover:border-gold/40">
          <h2 className="font-display text-xl">{SEO_BRAND} Jakarta Selatan</h2>
          <p className="mt-2 text-sm/6 text-muted-foreground">Lokasi kantor utama kami — konsultasi langsung tersedia.</p>
        </Link>
        {KOTA_LAYANAN.map((kota) => (
          <Link
            key={kota.slug}
            to="/umroh/$kota"
            params={{ kota: kota.slug }}
            className="bento-card p-6 transition-colors hover:border-gold/40"
          >
            <h2 className="font-display text-xl">{SEO_BRAND} {kota.nama}</h2>
            <p className="mt-2 text-sm/6 text-muted-foreground">
              {kota.provinsi} — {kota.wilayah.slice(0, 3).join(", ")}, dan sekitarnya.
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
