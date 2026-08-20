import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  HeartHandshake,
  MessageCircle,
  Plane,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard } from "@/components/site/package-card";
import { useSettings } from "@/hooks/use-site";
import {
  DEFAULT_HERO_SUBTITLE,
  DEFAULT_HERO_TITLE,
  galleryQuery,
  packagesQuery,
} from "@/lib/site-data";
import { waLink } from "@/lib/format";
import { StorageImage } from "@/components/site/storage-image";
import { loadSiteInfo, siteInfoFrom, pageMeta, SITE_CITY } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    return {
      ...pageMeta({
        title: `${info.siteName} — Travel Umroh ${SITE_CITY}`,
        description: `${info.siteName}, travel umroh ${SITE_CITY}: paket umroh terjadwal dengan harga transparan, hotel dekat Masjidil Haram, maskapai resmi, dan bimbingan ibadah. Konsultasi gratis via WhatsApp.`,
        path: "/",
        siteName: info.siteName,
      }),
      links: [
        {
          rel: "preload",
          as: "image",
          href: "/images/hero-kabah.webp",
          type: "image/webp",
          fetchPriority: "high",
        },
      ],
    };
  },

  component: Beranda,
});

const keunggulan = [
  {
    icon: BadgeCheck,
    title: "Berizin Resmi",
    text: "Travel berizin PPIU Kemenag dengan legalitas lengkap dan transparan.",
  },
  {
    icon: BookOpenText,
    title: "Bimbingan Ibadah",
    text: "Didampingi ustadz pembimbing dan muthawif berpengalaman selama perjalanan.",
  },
  {
    icon: Plane,
    title: "Maskapai & Hotel Pilihan",
    text: "Penerbangan resmi dan hotel dekat Masjidil Haram serta Masjid Nabawi.",
  },
  {
    icon: HeartHandshake,
    title: "Pelayanan Penuh Amanah",
    text: "Pendampingan sejak pendaftaran, manasik, hingga kembali ke tanah air.",
  },
];

const testimoni = [
  {
    name: "Ibu Siti Rahmawati",
    origin: "Bekasi",
    text: "Alhamdulillah pelayanannya sangat baik, hotel dekat sekali dengan Masjidil Haram dan pembimbingnya sabar.",
  },
  {
    name: "Bapak Ahmad Fauzi",
    origin: "Surabaya",
    text: "Semua urusan dokumen dibantu sampai tuntas. Jadwal keberangkatan tepat waktu dan tidak ada biaya tersembunyi.",
  },
  {
    name: "Keluarga Hidayat",
    origin: "Bandung",
    text: "Berangkat sekeluarga bertujuh, semuanya terkoordinasi rapi. Insya Allah tahun depan berangkat lagi.",
  },
];

function Beranda() {
  const { data: settings } = useSettings();
  const { data: packages = [] } = useQuery(packagesQuery());
  const { data: gallery = [] } = useQuery(galleryQuery);
  const unggulan = packages.filter((p) => p.is_featured).slice(0, 3);
  const tampil = unggulan.length ? unggulan : packages.slice(0, 3);

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <picture className="absolute inset-0 -z-10 block size-full">
          <source srcSet="/images/hero-kabah.webp" type="image/webp" />
          <img
            src="/images/hero-kabah.jpg"
            alt="Suasana thawaf di Masjidil Haram saat senja"
            width={1920}
            height={1088}
            sizes="100vw"
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[oklch(0.10_0_0/0.96)] via-[oklch(0.10_0_0/0.78)] to-[oklch(0.10_0_0/0.35)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-background to-transparent" />
        <div className="container-page py-16 sm:py-24 md:py-36">
          <div className="on-dark-media max-w-2xl text-foreground">
            <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1.5 text-[11px] sm:px-4 sm:text-xs">
              {settings?.license_text ?? "Travel umroh berizin resmi"}
            </p>
            <h1 className="font-display text-[2rem] leading-[1.1] sm:text-4xl md:text-6xl">
              {settings?.hero_title?.trim() || DEFAULT_HERO_TITLE}
            </h1>
            <p className="mt-4 max-w-xl text-sm/7 text-muted-foreground sm:mt-5 sm:text-base/7">
              {settings?.hero_subtitle?.trim() || DEFAULT_HERO_SUBTITLE}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/paket">
                  Lihat Paket Umroh <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={waLink(settings)} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  Konsultasi Gratis
                </a>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3 border-t border-border pt-6 sm:gap-4">
              {[
                { k: "10+", v: "Tahun pengalaman" },
                { k: "5.000+", v: "Jamaah terlayani" },
                { k: "4.9/5", v: "Kepuasan jamaah" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-xl text-gold sm:text-2xl">{s.k}</dt>
                  <dd className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-label="Keunggulan layanan"
        className="container-page mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-4 md:grid-rows-2"
      >
        <div className="bento-card surface-emerald flex flex-col justify-between gap-6 p-6 sm:col-span-2 sm:p-7 md:row-span-2">
          <p className="eyebrow">Mengapa kami</p>
          <div>
            <h2 className="font-display text-2xl leading-tight sm:text-3xl md:text-4xl">
              Amanah dari niat hingga{" "}
              <span className="text-gradient-gold">kembali ke tanah air</span>
            </h2>
            <p className="mt-4 text-sm/7 text-muted-foreground">
              Setiap detail perjalanan kami siapkan agar Anda cukup fokus pada ibadah.
            </p>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link to="/tentang">
              Kenali kami <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        {keunggulan.map((item) => (
          <div key={item.title} className="bento-card p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-gold/12 text-gold">
              <item.icon className="size-5" strokeWidth={1.6} />
            </span>
            <h3 className="mt-4 font-display text-lg">{item.title}</h3>
            <p className="mt-2 text-sm/6 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="container-page mt-16 sm:mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Paket Pilihan</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl">
              Jadwal Keberangkatan Terdekat
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/paket">
              Semua paket <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {tampil.map((paket) => (
            <PackageCard key={paket.id} paket={paket} />
          ))}
        </div>
      </section>

      <section className="container-page mt-16 sm:mt-24">
        <p className="eyebrow">Testimoni</p>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl">Kata Jamaah Kami</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {testimoni.map((item, i) => (
            <figure
              key={item.name}
              className={`bento-card p-6 ${i === 0 ? "md:row-span-2 md:flex md:flex-col md:justify-center" : ""}`}
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote
                className={`mt-4 text-muted-foreground ${i === 0 ? "font-display text-xl/8 text-foreground" : "text-sm/7"}`}
              >
                “{item.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold">
                {item.name}
                <span className="block text-xs font-normal text-muted-foreground">
                  {item.origin}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {gallery.length ? (
        <section className="container-page mt-16 sm:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Galeri</p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl">
                Dokumentasi Keberangkatan
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/galeri">
                Lihat galeri <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:gap-4 md:grid-cols-4">
            {gallery.slice(0, 6).map((item, i) => (
              <figure
                key={item.id}
                className={`bento-card ${i === 0 ? "col-span-2 row-span-2" : ""} ${i === 3 ? "md:col-span-2" : ""}`}
              >
                <StorageImage
                  src={item.image_url}
                  alt={item.caption ?? "Dokumentasi jamaah umroh"}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-page mt-16 sm:mt-24">
        <div className="bento-card surface-emerald px-5 py-10 text-center sm:px-8 sm:py-14">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl">
            Siap Berangkat ke Tanah Suci?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm/7 text-muted-foreground">
            Konsultasikan rencana keberangkatan Anda dengan tim kami. Kami bantu pilih paket yang
            paling sesuai.
          </p>
          <Button asChild size="lg" className="mt-7 w-full sm:w-auto">
            <a href={waLink(settings)} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              Chat WhatsApp Sekarang
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
