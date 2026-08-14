import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Users } from "lucide-react";
import { useSettings } from "@/hooks/use-site";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, SITE_CITY } from "@/lib/seo";
import { PageBreadcrumb } from "@/components/site/page-breadcrumb";

export const Route = createFileRoute("/tentang")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `Tentang ${info.siteName} — Travel Umroh ${SITE_CITY}`,
      description: `Profil ${info.siteName}, biro perjalanan umroh di ${SITE_CITY}: legalitas, alamat kantor, dan komitmen pelayanan jamaah.`,
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

  return (
    <main className="container-page py-10 sm:py-14">
      <PageBreadcrumb items={[{ label: "Beranda", to: "/" }, { label: "Tentang Kami" }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Tentang Kami</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">{settings?.agency_name ?? "Jannah Firdaus Tour Travel"}</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">{settings?.about_text}</p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="bento-card p-6">
          <BadgeCheck className="size-6 text-gold" />
          <h2 className="mt-3 font-display text-lg">Legalitas</h2>
          <p className="mt-2 text-sm/6 text-muted-foreground">{settings?.license_text ?? "-"}</p>
        </div>
        <div className="bento-card p-6">
          <MapPin className="size-6 text-gold" />
          <h2 className="mt-3 font-display text-lg">Kantor</h2>
          <p className="mt-2 text-sm/6 text-muted-foreground">{settings?.address ?? "-"}</p>
        </div>
        <div className="bento-card p-6">
          <Users className="size-6 text-gold" />
          <h2 className="mt-3 font-display text-lg">Pelayanan</h2>
          <p className="mt-2 text-sm/6 text-muted-foreground">
            Pendampingan penuh mulai dari pendaftaran, manasik, keberangkatan, hingga kepulangan jamaah.
          </p>
        </div>
      </div>

      <section className="bento-card surface-emerald mt-14 p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl">Komitmen Kami</h2>
        <ul className="mt-6 grid gap-4 text-sm/7 opacity-90 md:grid-cols-2">
          <li>Harga transparan tanpa biaya tersembunyi.</li>
          <li>Hotel dan maskapai sesuai yang dijanjikan pada brosur paket.</li>
          <li>Pembimbing ibadah bersertifikat untuk setiap rombongan.</li>
          <li>Manasik umroh sebelum keberangkatan untuk seluruh jamaah.</li>
        </ul>
      </section>
    </main>
  );
}