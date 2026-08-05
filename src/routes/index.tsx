import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, BookOpenText, HeartHandshake, MessageCircle, Plane, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard } from "@/components/site/package-card";
import { useSettings } from "@/hooks/use-site";
import { galleryQuery, packagesQuery } from "@/lib/site-data";
import { waLink } from "@/lib/format";
import { StorageImage } from "@/components/site/storage-image";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barokah Umroh — Paket Umroh Amanah & Terjadwal" },
      {
        name: "description",
        content:
          "Pilih paket umroh dengan hotel dekat Masjidil Haram, maskapai resmi, dan bimbingan ustadz berpengalaman. Konsultasi gratis via WhatsApp.",
      },
      { property: "og:title", content: "Barokah Umroh — Paket Umroh Amanah & Terjadwal" },
      {
        property: "og:description",
        content: "Paket umroh terjadwal dengan pelayanan amanah dari keberangkatan hingga kepulangan.",
      },
    ],
  }),
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
        <img
          src="/images/hero-kabah.jpg"
          alt="Suasana thawaf di Masjidil Haram saat senja"
          width={1920}
          height={1088}
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[oklch(0.22_0.05_160/0.92)] via-[oklch(0.22_0.05_160/0.72)] to-transparent" />
        <div className="container-page py-28 md:py-36">
          <div className="max-w-2xl text-[oklch(0.98_0.01_95)]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-xs font-medium tracking-wide uppercase">
              {settings?.license_text ?? "Travel umroh berizin resmi"}
            </p>
            <h1 className="font-display text-4xl leading-tight md:text-6xl">
              {settings?.hero_title ?? "Wujudkan Perjalanan Umroh Impian Bersama Kami"}
            </h1>
            <p className="mt-5 max-w-xl text-base/7 opacity-90">
              {settings?.hero_subtitle ??
                "Bimbingan ustadz berpengalaman, hotel dekat Masjidil Haram, dan pelayanan penuh amanah."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/paket">Lihat Paket Umroh</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={waLink(settings)} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" />
                  Konsultasi Gratis
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page -mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keunggulan.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <item.icon className="size-7 text-primary" strokeWidth={1.6} />
            <h3 className="mt-4 font-display text-lg">{item.title}</h3>
            <p className="mt-2 text-sm/6 text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="container-page mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">Paket Pilihan</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Jadwal Keberangkatan Terdekat</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/paket">Semua paket</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tampil.map((paket) => (
            <PackageCard key={paket.id} paket={paket} />
          ))}
        </div>
      </section>

      <section className="container-page mt-24">
        <h2 className="font-display text-3xl md:text-4xl">Kata Jamaah Kami</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimoni.map((item) => (
            <figure key={item.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm/7 text-muted-foreground">“{item.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">
                {item.name}
                <span className="block text-xs font-normal text-muted-foreground">{item.origin}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {gallery.length ? (
        <section className="container-page mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl md:text-4xl">Dokumentasi Keberangkatan</h2>
            <Button asChild variant="outline">
              <Link to="/galeri">Lihat galeri</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.slice(0, 6).map((item) => (
              <StorageImage
                key={item.id}
                src={item.image_url}
                alt={item.caption ?? "Dokumentasi jamaah umroh"}
                loading="lazy"
                className="aspect-4/3 w-full rounded-2xl object-cover shadow-soft"
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="container-page mt-24">
        <div className="rounded-3xl surface-emerald px-8 py-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Siap Berangkat ke Tanah Suci?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm/7 opacity-85">
            Konsultasikan rencana keberangkatan Anda dengan tim kami. Kami bantu pilih paket yang paling sesuai.
          </p>
          <Button asChild size="lg" className="mt-8 bg-gold text-gold-foreground hover:bg-gold/90">
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
