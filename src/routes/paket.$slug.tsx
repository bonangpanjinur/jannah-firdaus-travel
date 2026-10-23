import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
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
import {
  itineraryQuery,
  packageBySlugQuery,
  packageImagesQuery,
  type Paket,
} from "@/lib/site-data";
import { StorageImage } from "@/components/site/storage-image";
import { absoluteMediaUrl } from "@/lib/storage";
import {
  loadSiteInfo,
  siteInfoFrom,
  pageMeta,
  breadcrumbLd,
  tripLd,
  productLd,
  faqLd,
  SITE_CITY,
} from "@/lib/seo";
import { RegistrationForm } from "@/components/site/registration-form";
import heroMakkah from "@/assets/detail-makkah.jpg";
import fotoMadinah from "@/assets/detail-madinah.jpg";
import fotoJamaah from "@/assets/detail-jamaah.jpg";

const fotoCadangan = [
  { src: heroMakkah, caption: "Masjidil Haram, Makkah" },
  { src: fotoMadinah, caption: "Masjid Nabawi, Madinah" },
  { src: fotoJamaah, caption: "Dokumentasi jamaah kami" },
];

function packageFaq(paket: Paket) {
  return [
    {
      q: `Berapa harga paket umroh ${paket.name}?`,
      a: paket.price_quad
        ? `Harga mulai ${formatRupiah(paket.price_quad)} per jamaah (kamar quad).${paket.price_triple ? ` Tersedia juga pilihan triple ${formatRupiah(paket.price_triple)}.` : ""}${paket.price_double ? ` Dan double ${formatRupiah(paket.price_double)}.` : ""}`
        : `Silakan hubungi kami untuk informasi harga terbaru paket ${paket.name}.`,
    },
    {
      q: `Kapan keberangkatan paket ${paket.name}?`,
      a: paket.departure_date
        ? `Keberangkatan dijadwalkan pada ${formatTanggal(paket.departure_date)}${paket.duration_days ? ` selama ${paket.duration_days} hari` : ""}.`
        : `Jadwal keberangkatan akan diperbarui segera. Silakan hubungi kami untuk info terkini.`,
    },
    {
      q: `Hotel apa yang digunakan untuk paket ${paket.name}?`,
      a: `Hotel di Makkah: ${paket.hotel_makkah ?? "menyusul"}. Hotel di Madinah: ${paket.hotel_madinah ?? "menyusul"}. Semua hotel berada dekat dengan masjid utama.`,
    },
  ];
}

export const Route = createFileRoute("/paket/$slug")({
  loader: async ({ context, params }) => {
    const [paket, site] = await Promise.all([
      context.queryClient.ensureQueryData(packageBySlugQuery(params.slug)),
      loadSiteInfo(context.queryClient),
    ]);
    if (!paket) throw notFound();
    return { paket, site };
  },
  head: ({ params, loaderData }) => {
    const paket = loaderData?.paket ?? null;
    const info = siteInfoFrom(loaderData?.site);
    const nama = paket?.name ?? params.slug.replace(/-/g, " ");
    const harga = paket ? hargaMulai(paket) : null;
    const defaultTitle = `${nama}${harga ? ` — Mulai ${formatRupiah(harga)}` : ""} — ${info.siteName}`;
    const potongan = [
      paket?.duration_days ? `${paket.duration_days} hari` : null,
      paket?.departure_date ? `berangkat ${formatTanggal(paket.departure_date)}` : null,
      paket?.airline ? `maskapai ${paket.airline}` : null,
      paket?.hotel_makkah ? `hotel ${paket.hotel_makkah}` : null,
      harga ? `mulai ${formatRupiah(harga)}` : null,
    ].filter(Boolean);
    const defaultDescription = potongan.length
      ? `Paket umroh ${nama} dari ${info.siteName} ${SITE_CITY}: ${potongan.join(", ")}. Lihat itinerary harian dan daftar sekarang.`
      : `Rincian paket umroh ${nama} dari ${info.siteName}: harga, jadwal keberangkatan, hotel, maskapai, dan itinerary harian.`;
    const title = paket?.seo_title?.trim() || defaultTitle;
    const description = paket?.seo_description?.trim() || defaultDescription;
    const socialImage = paket?.og_image_url?.trim() || paket?.flyer_url;
    const gambar = socialImage ? absoluteMediaUrl(socialImage) : null;
    const path = `/paket/${params.slug}`;

    const base = pageMeta({
      title,
      description,
      path,
      type: "product",
      image: gambar,
      imageAlt: `Flyer paket umroh ${nama}`,
      noindex: !paket,
      siteName: info.siteName,
    });

    const faqItems = paket ? packageFaq(paket) : [];

    const tujuan = [
      paket?.hotel_makkah ? "Makkah" : "Makkah",
      paket?.hotel_madinah ? "Madinah" : "Madinah",
    ];
    void tujuan;

    return {
      ...base,
      scripts: paket
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(tripLd(paket, harga, info)),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify(productLd(paket, harga, info)),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify(faqLd(faqItems)),
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
  notFoundComponent: PaketNotFound,
  component: DetailPaket,
});

function PaketNotFound() {
  return (
    <main className="container-page py-20 text-center">
      <h1 className="font-display text-3xl">Paket umroh tidak ditemukan</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Paket ini tidak tersedia atau tidak lagi dipublikasikan.
      </p>
      <Link to="/paket" className="btn-gold mt-6 inline-flex">
        Lihat daftar paket
      </Link>
    </main>
  );
}

function DetailPaket() {
  const { slug } = Route.useParams();
  const { data: settings } = useSettings();
  const { data: paket, isLoading } = useQuery(packageBySlugQuery(slug));
  const { data: itinerary } = useQuery(itineraryQuery(paket?.id));
  const { data: images } = useQuery(packageImagesQuery(paket?.id));
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  function scrollToForm() {
    const el = document.getElementById("daftar");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(
      () => document.getElementById("reg-name")?.focus({ preventScroll: true }),
      600,
    );
  }

  if (isLoading) {
    return (
      <main className="container-page py-20 text-sm text-muted-foreground">Memuat paket…</main>
    );
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

  const itineraryItems = Array.isArray(itinerary) ? itinerary : [];
  const imageItems = Array.isArray(images) ? images : [];
  const includes = Array.isArray(paket.includes) ? paket.includes : [];
  const excludes = Array.isArray(paket.excludes) ? paket.excludes : [];
  const requirements = Array.isArray(paket.requirements) ? paket.requirements : [];
  const faqItems = packageFaq(paket);
  const harga = [
    { label: "Quad (sekamar 4)", value: paket.price_quad },
    { label: "Triple (sekamar 3)", value: paket.price_triple },
    { label: "Double (sekamar 2)", value: paket.price_double },
  ];

  const galeri =
    imageItems.length > 0
      ? imageItems.map((img) => ({
          id: img.id,
          src: img.image_url,
          caption: img.caption ?? `Foto paket ${paket.name}`,
          storage: true,
        }))
      : fotoCadangan.map((f) => ({ id: f.src, src: f.src, caption: f.caption, storage: false }));

  return (
    <main className="pb-16">
      <section className="relative isolate min-h-[520px] overflow-hidden sm:min-h-[580px]">
        <img
          src={heroMakkah}
          alt="Suasana Masjidil Haram saat jamaah melakukan tawaf"
          width={1600}
          height={912}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0_0/0.97)] via-[oklch(0.12_0_0/0.8)] to-[oklch(0.12_0_0/0.45)]" />
        <div className="container-page relative flex min-h-[520px] flex-col items-start justify-end py-10 sm:min-h-[580px] sm:py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70">
            <Link
              to="/"
              className="rounded-sm transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Beranda
            </Link>
            <span className="px-2">/</span>
            <Link
              to="/paket"
              className="rounded-sm transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Paket Umroh
            </Link>
            <span className="px-2">/</span>
            <span className="font-medium text-white/90">{paket.name}</span>
          </nav>
          <div className="mt-5 flex flex-wrap gap-2">
            {paket.is_featured ? (
              <Badge className="bg-gold text-gold-foreground hover:bg-gold">Paket Unggulan</Badge>
            ) : null}
            {paket.duration_days ? (
              <Badge variant="secondary">{paket.duration_days} hari</Badge>
            ) : null}
            {paket.quota ? <Badge variant="secondary">Kuota {paket.quota} jamaah</Badge> : null}
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-2xl leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-3xl md:text-5xl">
            {paket.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm/7 text-white/75">{paket.description}</p>
          <p className="mt-6 text-xs uppercase tracking-wider text-white/65">Mulai dari</p>
          <p className="font-display text-2xl text-gold sm:text-3xl">
            {formatRupiah(paket.price_quad ?? paket.price_triple ?? paket.price_double)}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="min-h-12 w-full sm:w-auto" onClick={scrollToForm}>
              <ClipboardList className="size-4" />
              Daftar sekarang
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 w-full border-white/30 bg-black/10 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
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
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Ringkasan paket
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl">
                Semua yang perlu Anda siapkan
              </h2>
            </div>
            <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:inline-flex">
              Siap dikonsultasikan
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <InfoRow
              icon={CalendarDays}
              label="Keberangkatan"
              value={formatTanggal(paket.departure_date)}
            />
            <InfoRow
              icon={Clock}
              label="Durasi"
              value={paket.duration_days ? `${paket.duration_days} hari` : "-"}
            />
            <InfoRow icon={Plane} label="Maskapai" value={paket.airline ?? "-"} />
            <InfoRow
              icon={Users}
              label="Kuota"
              value={paket.quota ? `${paket.quota} jamaah` : "-"}
            />
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
            <TabsList className="w-full justify-start gap-1 overflow-x-auto p-1">
              <TabsTrigger value="fasilitas">Fasilitas</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="syarat">Syarat</TabsTrigger>
              <TabsTrigger value="galeri">Galeri</TabsTrigger>
            </TabsList>

            <TabsContent value="fasilitas" className="mt-6 grid gap-4 sm:grid-cols-2">
              <FeatureCard
                title="Sudah termasuk"
                description="Layanan yang menjadi bagian dari paket ini."
                items={includes}
                icon={Check}
                tone="positive"
              />
              <FeatureCard
                title="Tidak termasuk"
                description="Biaya atau kebutuhan yang perlu dipersiapkan terpisah."
                items={excludes}
                icon={X}
                tone="negative"
              />
            </TabsContent>

            <TabsContent value="itinerary" className="mt-6">
              {itineraryItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">Itinerary akan segera diperbarui.</p>
              ) : (
                <ol className="space-y-4 border-l border-border pl-6">
                  {itineraryItems.map((item) => (
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
                {requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <FileText className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="galeri" className="mt-6">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl">Dokumentasi perjalanan</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Klik foto untuk melihat ukuran lebih besar.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {galeri.length} foto
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {galeri.map((img) => (
                  <figure key={img.id} className="group bento-card">
                    <button
                      type="button"
                      className="block w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                    <figcaption className="bg-card px-3 py-2 text-xs text-muted-foreground">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
              {imageItems.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground">
                  Foto dokumentasi umum digunakan sebagai preview. Foto khusus paket ini akan
                  ditambahkan setelah tersedia.
                </div>
              ) : null}
            </TabsContent>
          </Tabs>

          <section aria-labelledby="faq-paket" className="mt-10">
            <h2 id="faq-paket" className="font-display text-2xl">
              Pertanyaan tentang {paket.name}
            </h2>
            <div className="mt-4 space-y-4">
              {faqItems.map((item) => (
                <article key={item.q} className="bento-card p-5">
                  <h3 className="font-medium">{item.q}</h3>
                  <p className="mt-2 text-sm/6 text-muted-foreground">{item.a}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6 lg:sticky lg:top-24">
          <img
            src={fotoJamaah}
            alt="Jamaah umroh bersama tim kami"
            loading="lazy"
            className="mb-5 aspect-16/9 w-full rounded-xl object-cover"
          />
          <div className="rounded-2xl bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Pilihan harga
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Pilih tipe kamar yang paling sesuai untuk Anda.
            </p>
          </div>
          <ul className="mt-4 space-y-3">
            {harga.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-display text-base text-gold">{formatRupiah(item.value)}</span>
              </li>
            ))}
          </ul>
          <div id="daftar" className="mt-6 scroll-mt-24 border-t border-border pt-6">
            <div className="mb-4 rounded-2xl border border-gold/30 bg-gold/10 p-3 text-xs leading-5 text-muted-foreground">
              Konsultasi gratis untuk membantu memilih paket, kamar, dan kesiapan dokumen.
            </div>
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

      <div className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 border-t border-border bg-background/95 backdrop-blur-xl lg:bottom-0">
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
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full rounded-lg object-contain"
              />
              <figcaption className="px-2 py-3 text-center text-sm text-muted-foreground">
                {lightbox.caption}
              </figcaption>
            </figure>
          ) : null}
        </DialogContent>
      </Dialog>

      <section className="container-page mt-12 border-t border-border pt-10">
        <h2 className="font-display text-xl">Baca juga</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link
            to="/biaya-umroh"
            className="rounded-full border border-border px-4 py-2 text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground"
          >
            Rincian biaya umroh
          </Link>
          <Link
            to="/syarat-umroh"
            className="rounded-full border border-border px-4 py-2 text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground"
          >
            Syarat pendaftaran umroh
          </Link>
          <Link
            to="/faq"
            className="rounded-full border border-border px-4 py-2 text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground"
          >
            Pertanyaan umum
          </Link>
          <Link
            to="/paket"
            className="rounded-full border border-border px-4 py-2 text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground"
          >
            Lihat semua paket
          </Link>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  description,
  items,
  icon: Icon,
  tone,
}: {
  title: string;
  description: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
  tone: "positive" | "negative";
}) {
  const isPositive = tone === "positive";
  return (
    <section
      className={`rounded-2xl border p-5 ${
        isPositive
          ? "border-primary/20 bg-primary/[0.04]"
          : "border-destructive/15 bg-destructive/[0.03]"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
            isPositive ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
          }`}
        >
          <Icon className="size-4" />
        </span>
        <div>
          <h3 className="font-display text-lg">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
        </div>
      </div>
      {items.length > 0 ? (
        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 leading-5">
              <Icon
                className={`mt-0.5 size-4 shrink-0 ${isPositive ? "text-primary" : "text-destructive"}`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 rounded-xl border border-dashed border-border bg-background/50 p-3 text-sm text-muted-foreground">
          Belum ada informasi tambahan.
        </p>
      )}
    </section>
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
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-soft">
      <img
        src={image}
        alt={`Suasana kota ${kota}`}
        loading="lazy"
        className="aspect-16/9 w-full object-cover"
      />
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
    <div className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm transition-colors hover:border-primary/30 sm:p-4">
      <Icon className="size-5 shrink-0 text-gold" />
      <div>
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
