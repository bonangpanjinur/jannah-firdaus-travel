import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Globe, MapPin, ShieldCheck } from "lucide-react";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, SITE_DOMAIN } from "@/lib/seo";
import { PageBreadcrumb } from "@/components/site/page-breadcrumb";

export const Route = createFileRoute("/kanal-resmi")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    return {
      ...pageMeta({
        title: `Website dan Kanal Resmi — ${info.siteName}`,
        description: `Daftar website, kantor, dan kanal komunikasi resmi ${info.siteName}. Gunakan informasi ini untuk memastikan Anda menghubungi layanan yang benar.`,
        path: "/kanal-resmi",
        siteName: info.siteName,
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Beranda", path: "/" },
              { name: "Website dan Kanal Resmi", path: "/kanal-resmi" },
            ]),
          ),
        },
      ],
    };
  },
  component: KanalResmi,
});

function KanalResmi() {
  const info = siteInfoFrom(Route.useLoaderData());
  const links = [
    info.instagram
      ? {
          label: "Instagram",
          href: info.instagram.startsWith("http")
            ? info.instagram
            : `https://instagram.com/${info.instagram.replace(/^@/, "")}`,
        }
      : null,
    info.facebook
      ? {
          label: "Facebook",
          href: info.facebook.startsWith("http")
            ? info.facebook
            : `https://facebook.com/${info.facebook}`,
        }
      : null,
    info.youtube ? { label: "YouTube", href: info.youtube } : null,
    info.tiktok
      ? {
          label: "TikTok",
          href: info.tiktok.startsWith("http")
            ? info.tiktok
            : `https://tiktok.com/@${info.tiktok.replace(/^@/, "")}`,
        }
      : null,
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <main className="container-page py-10 sm:py-14">
      <PageBreadcrumb
        items={[{ label: "Beranda", to: "/" }, { label: "Website dan Kanal Resmi" }]}
      />
      <header className="mt-6 max-w-3xl">
        <p className="eyebrow">Identitas Resmi</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Website dan Kanal Resmi</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Gunakan daftar ini untuk memastikan informasi, nomor kontak, dan akun yang Anda hubungi
          benar-benar terkait dengan {info.siteName}. Kami tidak menampilkan kanal yang belum
          diverifikasi oleh pengelola.
        </p>
      </header>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <section className="bento-card p-6 sm:p-8">
          <Globe className="size-7 text-gold" />
          <h2 className="mt-4 font-display text-2xl">Domain utama</h2>
          <p className="mt-3 text-sm/7 text-muted-foreground">
            Website kanonik perusahaan adalah alamat berikut. Informasi paket dan pendaftaran yang
            resmi dipublikasikan melalui domain ini.
          </p>
          <a
            href={SITE_DOMAIN}
            className="mt-5 inline-flex items-center gap-2 font-semibold text-gold hover:underline"
          >
            {SITE_DOMAIN.replace("https://", "")}
            <ExternalLink className="size-4" />
          </a>
        </section>

        <section className="bento-card p-6 sm:p-8">
          <ShieldCheck className="size-7 text-gold" />
          <h2 className="mt-4 font-display text-2xl">Badan usaha dan legalitas</h2>
          <div className="mt-3 space-y-2 text-sm/7 text-muted-foreground">
            {info.legalName ? <p>{info.legalName}</p> : <p>Nama badan usaha belum diisi.</p>}
            {info.ppiuLicenseNumber ? <p>Nomor izin PPIU: {info.ppiuLicenseNumber}</p> : null}
            {info.license ? <p>{info.license}</p> : null}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Lengkapi hanya dengan data yang dapat diverifikasi melalui dokumen atau sumber resmi.
          </p>
        </section>

        <section className="bento-card p-6 sm:p-8">
          <MapPin className="size-7 text-gold" />
          <h2 className="mt-4 font-display text-2xl">Kantor dan kontak</h2>
          <div className="mt-3 space-y-2 text-sm/7 text-muted-foreground">
            {info.address ? <p>{info.address}</p> : <p>Alamat kantor belum diisi.</p>}
            {info.postalCode ? <p>Kode pos: {info.postalCode}</p> : null}
            {info.openingHours ? <p>Jam layanan: {info.openingHours}</p> : null}
            {info.phone ? <p>WhatsApp: {info.phone}</p> : null}
            {info.email ? <p>Email: {info.email}</p> : null}
          </div>
          {info.googleMapsUrl ? (
            <a
              href={info.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
            >
              Buka lokasi di Google Maps <ExternalLink className="size-4" />
            </a>
          ) : null}
        </section>

        <section className="bento-card p-6 sm:p-8">
          <h2 className="font-display text-2xl">Kanal sosial resmi</h2>
          {links.length ? (
            <ul className="mt-4 space-y-3 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-gold hover:underline"
                  >
                    {link.label} <ExternalLink className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm/7 text-muted-foreground">Kanal sosial resmi belum diisi.</p>
          )}
        </section>
      </div>
    </main>
  );
}
