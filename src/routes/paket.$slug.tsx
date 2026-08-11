import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BedDouble,
  CalendarDays,
  Check,
  Clock,
  FileText,
  MessageCircle,
  Plane,
  ShieldCheck,
  Star,
  Users,
  X,
} from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/hooks/use-site";
import { formatRupiah, formatTanggal, hargaMulai, waLink } from "@/lib/format";
import { itineraryQuery, packageBySlugQuery, packageImagesQuery } from "@/lib/site-data";
import { StorageImage } from "@/components/site/storage-image";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, SITE_CITY } from "@/lib/seo";
import { RegistrationForm } from "@/components/site/registration-form";
import heroMakkah from "@/assets/detail-makkah.jpg";
import fotoMadinah from "@/assets/detail-madinah.jpg";
import fotoJamaah from "@/assets/detail-jamaah.jpg";

const fotoCadangan = [
  { src: heroMakkah, caption: "Masjidil Haram, Makkah" },
  { src: fotoMadinah, caption: "Masjid Nabawi, Madinah" },
  { src: fotoJamaah, caption: "Dokumentasi jamaah kami" },
];

export const Route = createFileRoute("/paket/$slug")({
  loader: async ({ context, params }) => {
    const [paket, site] = await Promise.all([
      context.queryClient.ensureQueryData(packageBySlugQuery(params.slug)),
      loadSiteInfo(context.queryClient),
    ]);
    return { paket, site };
  },
  head: ({ params, loaderData }) => {
    const paket = loaderData?.paket ?? null;
    const info = siteInfoFrom(loaderData?.site);
    const nama = paket?.name ?? params.slug.replace(/-/g, " ");
    const harga = paket ? hargaMulai(paket) : null;
    const title = `${nama}${harga ? ` — Mulai ${formatRupiah(harga)}` : ""} | ${info.siteName}`;
    const potongan = [
      paket?.duration_days ? `${paket.duration_days} hari` : null,
      paket?.departure_date ? `berangkat ${formatTanggal(paket.departure_date)}` : null,
      paket?.airline ? `maskapai ${paket.airline}` : null,
      paket?.hotel_makkah ? `hotel ${paket.hotel_makkah}` : null,
      harga ? `mulai ${formatRupiah(harga)}` : null,
    ].filter(Boolean);
    const description = potongan.length
      ? `Paket umroh ${nama} dari ${info.siteName} ${SITE_CITY}: ${potongan.join(", ")}. Lihat itinerary harian dan daftar sekarang.`
      : `Rincian paket umroh ${nama} dari ${info.siteName}: harga, jadwal keberangkatan, hotel, maskapai, dan itinerary harian.`;
    const gambar = paket?.flyer_url && /^https?:\/\//i.test(paket.flyer_url) ? paket.flyer_url : null;
    const path = `/paket/${params.slug}`;

    const base = pageMeta({
      title,
      description,
      path,
      type: "product",
      image: gambar,
      noindex: !paket,
    });

    const tujuan = [
      paket?.hotel_makkah ? "Makkah" : "Makkah",
      paket?.hotel_madinah ? "Madinah" : "Madinah",
    ];

    return {
      ...base,
      scripts: paket
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: paket.name,
                description: paket.description ?? description,
                category: "Paket Perjalanan Umroh",
                ...(gambar ? { image: [gambar] } : {}),
                brand: { "@type": "Brand", name: info.siteName },
                ...(harga
                  ? {
                      offers: {
                        "@type": "Offer",
                        price: harga,
                        priceCurrency: "IDR",
                        availability: "https://schema.org/InStock",
                        url: path,
                        seller: { "@id": "/#organization" },
                        ...(paket.departure_date ? { priceValidUntil: paket.departure_date } : {}),
                      },
                    }
                  : {}),
                additionalProperty: [
                  paket.duration_days
                    ? { "@type": "PropertyValue", name: "Durasi", value: `${paket.duration_days} hari` }
                    : null,
                  paket.airline ? { "@type": "PropertyValue", name: "Maskapai", value: paket.airline } : null,
                  paket.hotel_makkah
                    ? { "@type": "PropertyValue", name: "Hotel Makkah", value: paket.hotel_makkah }
                    : null,
                  paket.hotel_madinah
                    ? { "@type": "PropertyValue", name: "Hotel Madinah", value: paket.hotel_madinah }
                    : null,
                ].filter(Boolean),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "TouristTrip",
                name: paket.name,
                description: paket.description ?? description,
                touristType: "Jamaah umroh",
                provider: { "@id": "/#organization" },
                itinerary: tujuan.map((kota) => ({ "@type": "City", name: kota, address: { "@type": "PostalAddress", addressCountry: "SA" } })),
                ...(paket.departure_date ? { startDate: paket.departure_date } : {}),
                ...(paket.duration_days ? { subjectOf: { "@type": "CreativeWork", name: `Itinerary ${paket.duration_days} hari` } } : {}),
                ...(harga
                  ? { offers: { "@type": "Offer", price: harga, priceCurrency: "IDR", url: path } }
                  : {}),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify(
                breadcrumbLd([
                  { name: "Beranda", path: "/" },
                  { name: "Paket Umroh", path: "/paket" },
                  { name: paket.name, path },
                ]),
              ),
            },
          ]
        : [],
    };
  },
  component: DetailPaket,
});


function DetailPaket() {
  const { slug } = Route.useParams();
  const { data: settings } = useSettings();
  const { data: paket, isLoading } = useQuery(packageBySlugQuery(slug));
  const { data: itinerary = [] } = useQuery(itineraryQuery(paket?.id));
  const { data: images = [] } = useQuery(packageImagesQuery(paket?.id));
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  function scrollToForm() {
    const el = document.getElementById("daftar");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => document.getElementById("reg-name")?.focus({ preventScroll: true }), 600);
  }

  if (isLoading) {
    return <main className="container-page py-20 text-sm text-muted-foreground">Memuat paket…</main>;
  }

  if (!paket) {
    return (
      <main className="container-page py-20">
        <h1 className="font-display text-3xl">Paket tidak ditemukan</h1>
        <Button asChild className="mt-6">
          <Link to="/paket">Kembali ke daftar paket</Link>
        </Button>
      </main>
    );
  }

  const harga = [
    { label: "Quad (sekamar 4)", value: paket.price_quad },
    { label: "Triple (sekamar 3)", value: paket.price_triple },
    { label: "Double (sekamar 2)", value: paket.price_double },
  ];

  const galeri =
    images.length > 0
      ? images.map((img) => ({ id: img.id, src: img.image_url, caption: img.caption ?? `Foto paket ${paket.name}`, storage: true }))
      : fotoCadangan.map((f) => ({ id: f.src, src: f.src, caption: f.caption, storage: false }));

  return (
    <main className="pb-16">
      <section className="relative isolate overflow-hidden">
        <img
          src={heroMakkah}
          alt="Suasana Masjidil Haram saat jamaah melakukan tawaf"
          width={1600}
          height={912}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0_0/0.97)] via-[oklch(0.12_0_0/0.8)] to-[oklch(0.12_0_0/0.45)]" />
        <div className="container-page relative py-10 sm:py-14 md:py-20">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold">Beranda</Link>
            <span className="px-2">/</span>
            <Link to="/paket" className="hover:text-gold">Paket</Link>
          </nav>
          <div className="mt-5 flex flex-wrap gap-2">
            {paket.is_featured ? <Badge className="bg-gold text-gold-foreground hover:bg-gold">Paket Unggulan</Badge> : null}
            {paket.duration_days ? <Badge variant="secondary">{paket.duration_days} hari</Badge> : null}
            {paket.quota ? <Badge variant="secondary">Kuota {paket.quota} jamaah</Badge> : null}
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-2xl leading-tight text-foreground sm:text-3xl md:text-5xl">{paket.name}</h1>
          <p className="mt-4 max-w-2xl text-sm/7 text-muted-foreground">{paket.description}</p>
          <p className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">Mulai dari</p>
          <p className="font-display text-2xl text-gold sm:text-3xl">{formatRupiah(paket.price_quad ?? paket.price_triple ?? paket.price_double)}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" onClick={scrollToForm}>
              <ClipboardList className="size-4" />
              Daftar sekarang
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href={waLink(settings, paket.name)} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                Tanya via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-8 pb-28 pt-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 lg:pb-12">
        <div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <InfoRow icon={CalendarDays} label="Keberangkatan" value={formatTanggal(paket.departure_date)} />
            <InfoRow icon={Clock} label="Durasi" value={paket.duration_days ? `${paket.duration_days} hari` : "-"} />
            <InfoRow icon={Plane} label="Maskapai" value={paket.airline ?? "-"} />
            <InfoRow icon={Users} label="Kuota" value={paket.quota ? `${paket.quota} jamaah` : "-"} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <HotelCard
              image={heroMakkah}
              kota="Makkah"
              nama={paket.hotel_makkah}
              bintang={paket.hotel_makkah_stars}
            />
            <HotelCard
              image={fotoMadinah}
              kota="Madinah"
              nama={paket.hotel_madinah}
              bintang={paket.hotel_madinah_stars}
            />
          </div>

          {paket.flyer_url ? (
            <StorageImage
              src={paket.flyer_url}
              alt={`Flyer paket ${paket.name}`}
              loading="lazy"
              className="mt-8 w-full rounded-2xl object-cover shadow-soft"
            />
          ) : null}

          <Tabs defaultValue="fasilitas" className="mt-10">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="fasilitas">Fasilitas</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="syarat">Syarat</TabsTrigger>
              <TabsTrigger value="galeri">Galeri</TabsTrigger>
            </TabsList>

            <TabsContent value="fasilitas" className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg">Termasuk</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {paket.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg">Tidak termasuk</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {paket.excludes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="mt-6">
              {itinerary.length === 0 ? (
                <p className="text-sm text-muted-foreground">Itinerary akan segera diperbarui.</p>
              ) : (
                <ol className="space-y-4 border-l border-border pl-6">
                  {itinerary.map((item) => (
                    <li key={item.id} className="relative">
                      <span className="absolute -left-[31px] flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                        {item.day_number}
                      </span>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="mt-1 text-sm/6 text-muted-foreground">{item.description}</p>
                    </li>
                  ))}
                </ol>
              )}
            </TabsContent>

            <TabsContent value="syarat" className="mt-6">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {paket.requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <FileText className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="galeri" className="mt-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {galeri.map((img) => (
                  <figure key={img.id} className="group bento-card">
                    <button
                      type="button"
                      className="block w-full"
                      onClick={() => setLightbox({ src: img.src, caption: img.caption })}
                    >
                      {img.storage ? (
                        <StorageImage
                          src={img.src}
                          alt={img.caption}
                          loading="lazy"
                          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={img.src}
                          alt={img.caption}
                          loading="lazy"
                          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </button>
                    <figcaption className="bg-card px-3 py-2 text-xs text-muted-foreground">{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
              {images.length === 0 ? (
                <p className="mt-4 text-xs text-muted-foreground">
                  Foto dokumentasi umum. Foto khusus paket ini akan segera ditambahkan.
                </p>
              ) : null}
            </TabsContent>
          </Tabs>
        </div>

        <aside className="h-fit bento-card p-5 sm:p-6 lg:sticky lg:top-24">
          <img
            src={fotoJamaah}
            alt="Jamaah umroh bersama tim kami"
            loading="lazy"
            className="mb-5 aspect-16/9 w-full rounded-xl object-cover"
          />
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Pilihan harga</p>
          <ul className="mt-4 space-y-3">
            {harga.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-display text-base text-gold">{formatRupiah(item.value)}</span>
              </li>
            ))}
          </ul>
          <div id="daftar" className="mt-6 scroll-mt-24 border-t border-border pt-6">
            <h2 className="font-display text-lg">Formulir pendaftaran</h2>
            <p className="mb-4 mt-1 text-xs text-muted-foreground">
              Cukup 3 isian singkat — tim kami langsung menghubungi Anda via WhatsApp.
            </p>
            <RegistrationForm paket={paket} />
          </div>

          <Button asChild size="lg" variant="outline" className="mt-4 w-full">
            <a href={waLink(settings, paket.name)} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              Daftar via WhatsApp
            </a>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Tim kami membalas setiap hari pukul 08.00–20.00 WIB.
          </p>
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" /> Travel resmi & berizin
          </p>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
        <div className="container-page flex items-center gap-3 py-3 pr-16">
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground">Mulai dari</p>
            <p className="truncate font-display text-base text-gold">
              {formatRupiah(paket.price_quad ?? paket.price_triple ?? paket.price_double)}
            </p>
          </div>
          <Button className="ml-auto shrink-0" onClick={scrollToForm}>
            <ClipboardList className="size-4" />
            Daftar
          </Button>
        </div>
      </div>

      <Dialog open={Boolean(lightbox)} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="max-w-3xl p-2">
          {lightbox ? (
            <figure>
              <img src={lightbox.src} alt={lightbox.caption} className="w-full rounded-lg object-contain" />
              <figcaption className="px-2 py-3 text-center text-sm text-muted-foreground">{lightbox.caption}</figcaption>
            </figure>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function HotelCard({
  image,
  kota,
  nama,
  bintang,
}: {
  image: string;
  kota: string;
  nama: string | null;
  bintang: number | null;
}) {
  return (
    <div className="bento-card">
      <img src={image} alt={`Suasana kota ${kota}`} loading="lazy" className="aspect-16/9 w-full object-cover" />
      <div className="flex gap-3 p-4">
        <BedDouble className="size-5 shrink-0 text-gold" />
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Hotel {kota}</p>
          <p className="text-sm font-medium">{nama ?? "Menyusul"}</p>
          {bintang ? (
            <div className="mt-1 flex gap-0.5">
              {Array.from({ length: bintang }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-gold text-gold" />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 bento-card p-3 sm:p-4">
      <Icon className="size-5 shrink-0 text-gold" />
      <div>
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}