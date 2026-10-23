import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, ExternalLink, MapPin, Users } from "lucide-react";
import { useSettings } from "@/hooks/use-site";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, SITE_CITY } from "@/lib/seo";
import { DEFAULT_ABOUT_TEXT } from "@/lib/site-data";
import { PageBreadcrumb } from "@/components/site/page-breadcrumb";

export const Route = createFileRoute("/tentang")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `Tentang ${info.siteName} — Travel Umroh ${SITE_CITY}`,
      description: `Kenali ${info.siteName}, travel umroh di ${SITE_CITY} dengan layanan paket, manasik, pendampingan dokumen, dan konsultasi keberangkatan jamaah.`,
      path: "/tentang",
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
              { name: "Tentang Kami", path: "/tentang" },
            ]),
          ),
        },
      ],
    };
  },

  component: Tentang,
});

function Tentang() {
  const { data: settings } = useSettings();
  const serviceAreas = settings?.service_areas ?? [];
  const services = settings?.services ?? [];

  return (
    <main className="container-page py-10 sm:py-14">
      <PageBreadcrumb items={[{ label: "Beranda", to: "/" }, { label: "Tentang Kami" }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Tentang Kami</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          {settings?.agency_name ?? "Jannah Firdaus Tour Travel"}
        </h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          {settings?.about_text?.trim() || DEFAULT_ABOUT_TEXT}
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {settings?.legal_name || settings?.ppiu_license_number || settings?.license_text ? (
          <div className="bento-card p-6">
            <BadgeCheck className="size-6 text-gold" />
            <h2 className="mt-3 font-display text-lg">Legalitas perusahaan</h2>
            <div className="mt-2 space-y-1 text-sm/6 text-muted-foreground">
              {settings.legal_name ? <p>{settings.legal_name}</p> : null}
              {settings.ppiu_license_number ? (
                <p>Nomor izin PPIU: {settings.ppiu_license_number}</p>
              ) : null}
              {settings.license_text ? <p>{settings.license_text}</p> : null}
            </div>
          </div>
        ) : null}
        {settings?.address ? (
          <div className="bento-card p-6">
            <MapPin className="size-6 text-gold" />
            <h2 className="mt-3 font-display text-lg">Alamat kantor</h2>
            <p className="mt-2 text-sm/6 text-muted-foreground">{settings.address}</p>
          </div>
        ) : null}
        {settings?.founded_year ? (
          <div className="bento-card p-6">
            <BadgeCheck className="size-6 text-gold" />
            <h2 className="mt-3 font-display text-lg">Tahun berdiri</h2>
            <p className="mt-2 text-sm/6 text-muted-foreground">{settings.founded_year}</p>
          </div>
        ) : null}
        {settings?.jamaah_count != null ? (
          <div className="bento-card p-6">
            <Users className="size-6 text-gold" />
            <h2 className="mt-3 font-display text-lg">Jamaah terlayani</h2>
            <p className="mt-2 text-sm/6 text-muted-foreground">
              {new Intl.NumberFormat("id-ID").format(settings.jamaah_count)} jamaah
            </p>
          </div>
        ) : null}
        {settings?.whatsapp_number || settings?.email ? (
          <div className="bento-card p-6">
            <Users className="size-6 text-gold" />
            <h2 className="mt-3 font-display text-lg">Kontak resmi</h2>
            <div className="mt-2 space-y-1 text-sm/6 text-muted-foreground">
              {settings.whatsapp_number ? <p>WhatsApp: {settings.whatsapp_number}</p> : null}
              {settings.email ? <p>Email: {settings.email}</p> : null}
            </div>
          </div>
        ) : null}
      </div>

      {services.length ? (
        <section className="bento-card mt-10 p-8 md:p-10">
          <h2 className="font-display text-2xl">Layanan</h2>
          <ul className="mt-5 grid gap-3 text-sm/7 text-muted-foreground sm:grid-cols-2">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="bento-card surface-emerald mt-4 p-8 md:p-10">
        <h2 className="font-display text-2xl">Verifikasi informasi resmi</h2>
        <p className="mt-3 text-sm/7 text-muted-foreground">
          Informasi legalitas, alamat, dan kanal komunikasi hanya boleh diisi dengan data yang dapat
          diverifikasi. Lihat daftar domain dan kanal yang kami nyatakan resmi.
        </p>
        <a
          href="/kanal-resmi"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
        >
          Website dan Kanal Resmi <ExternalLink className="size-4" />
        </a>
      </section>
      {serviceAreas.length ? (
        <section className="bento-card surface-emerald mt-4 p-8 md:p-10">
          <h2 className="font-display text-2xl">Wilayah layanan</h2>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm">
            {serviceAreas.map((area) => (
              <li key={area} className="rounded-full border border-border px-3 py-1.5">
                {area}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
