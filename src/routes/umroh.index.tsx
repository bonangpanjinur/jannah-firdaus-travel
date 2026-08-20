import { createFileRoute, Link } from "@tanstack/react-router";
import { KOTA_LAYANAN } from "@/lib/kota";
import {
  loadSiteInfo,
  siteInfoFrom,
  pageMeta,
  breadcrumbLd,
  SITE_CITY,
  SEO_BRAND,
} from "@/lib/seo";

export const Route = createFileRoute("/umroh/")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `${SEO_BRAND} Indonesia — Area Layanan Umroh`,
      description: `Daftar kota dan kabupaten di seluruh Indonesia yang dilayani ${SEO_BRAND}, dengan konsultasi paket, dokumen, manasik, dan pendampingan keberangkatan.`,
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
  const kotaPerProvinsi = KOTA_LAYANAN.reduce<Record<string, typeof KOTA_LAYANAN>>(
    (groups, kota) => {
      (groups[kota.provinsi] ??= []).push(kota);
      return groups;
    },
    {},
  );
  const provinsi = Object.keys(kotaPerProvinsi).sort((a, b) => a.localeCompare(b, "id"));

  return (
    <main className="container-page py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Area Layanan Nasional</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">{SEO_BRAND} Indonesia</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Kantor kami berada di {SITE_CITY} dan melayani jamaah dari berbagai kota dan kabupaten di
          seluruh Indonesia. Pilih wilayah Anda untuk melihat informasi layanan, konsultasi, dan
          jadwal keberangkatan.
        </p>
      </header>

      <section className="mt-10 space-y-10">
        <div>
          <h2 className="font-display text-2xl">Jakarta Selatan</h2>
          <Link
            to="/umroh-jakarta-selatan"
            className="bento-card mt-4 block p-6 transition-colors hover:border-gold/40"
          >
            <h3 className="font-display text-xl">{SEO_BRAND} Jakarta Selatan</h3>
            <p className="mt-2 text-sm/6 text-muted-foreground">
              Lokasi kantor utama kami — konsultasi langsung tersedia.
            </p>
          </Link>
        </div>

        {provinsi.map((namaProvinsi) => (
          <div
            key={namaProvinsi}
            className="[content-visibility:auto] [contain-intrinsic-size:600px]"
          >
            <h2 className="font-display text-2xl">Area layanan {namaProvinsi}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {kotaPerProvinsi[namaProvinsi]!.map((kota) => {
                const wilayah =
                  kota.wilayah.length > 0
                    ? kota.wilayah.slice(0, 3).join(", ")
                    : `wilayah ${kota.nama}`;
                return (
                  <Link
                    key={kota.slug}
                    to="/umroh/$kota"
                    params={{ kota: kota.slug }}
                    className="bento-card p-6 transition-colors hover:border-gold/40"
                  >
                    <h3 className="font-display text-xl">
                      {SEO_BRAND} {kota.nama}
                    </h3>
                    <p className="mt-2 text-sm/6 text-muted-foreground">
                      {namaProvinsi} — layanan konsultasi dan pendampingan untuk jamaah dari{" "}
                      {wilayah}.
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
