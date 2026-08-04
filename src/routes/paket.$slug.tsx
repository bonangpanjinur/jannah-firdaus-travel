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
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/hooks/use-site";
import { formatRupiah, formatTanggal, waLink } from "@/lib/format";
import { itineraryQuery, packageBySlugQuery, packageImagesQuery } from "@/lib/site-data";

export const Route = createFileRoute("/paket/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Detail Paket Umroh — Barokah Umroh` },
      {
        name: "description",
        content: `Rincian paket umroh ${params.slug.replace(/-/g, " ")}: harga, jadwal keberangkatan, hotel, maskapai, dan itinerary harian.`,
      },
      { property: "og:title", content: "Detail Paket Umroh — Barokah Umroh" },
      {
        property: "og:description",
        content: "Rincian harga, jadwal, hotel, maskapai, dan itinerary paket umroh.",
      },
    ],
  }),
  component: DetailPaket,
});

function DetailPaket() {
  const { slug } = Route.useParams();
  const { data: settings } = useSettings();
  const { data: paket, isLoading } = useQuery(packageBySlugQuery(slug));
  const { data: itinerary = [] } = useQuery(itineraryQuery(paket?.id));
  const { data: images = [] } = useQuery(packageImagesQuery(paket?.id));

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

  return (
    <main className="container-page py-12">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Beranda</Link>
        <span className="px-2">/</span>
        <Link to="/paket" className="hover:text-primary">Paket</Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <h1 className="font-display text-3xl md:text-4xl">{paket.name}</h1>
          <p className="mt-4 text-sm/7 text-muted-foreground">{paket.description}</p>

          {paket.flyer_url ? (
            <img
              src={paket.flyer_url}
              alt={`Flyer paket ${paket.name}`}
              loading="lazy"
              className="mt-8 w-full rounded-2xl object-cover shadow-soft"
            />
          ) : null}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoRow icon={CalendarDays} label="Keberangkatan" value={formatTanggal(paket.departure_date)} />
            <InfoRow icon={Clock} label="Durasi" value={paket.duration_days ? `${paket.duration_days} hari` : "-"} />
            <InfoRow icon={Plane} label="Maskapai" value={paket.airline ?? "-"} />
            <InfoRow icon={Users} label="Kuota" value={paket.quota ? `${paket.quota} jamaah` : "-"} />
            <InfoRow
              icon={BedDouble}
              label="Hotel Makkah"
              value={`${paket.hotel_makkah ?? "-"}${paket.hotel_makkah_stars ? ` • ${paket.hotel_makkah_stars} bintang` : ""}`}
            />
            <InfoRow
              icon={BedDouble}
              label="Hotel Madinah"
              value={`${paket.hotel_madinah ?? "-"}${paket.hotel_madinah_stars ? ` • ${paket.hotel_madinah_stars} bintang` : ""}`}
            />
          </div>

          <Tabs defaultValue="fasilitas" className="mt-10">
            <TabsList>
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
              {images.length === 0 ? (
                <p className="text-sm text-muted-foreground">Belum ada foto untuk paket ini.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-3">
                  {images.map((img) => (
                    <img
                      key={img.id}
                      src={img.image_url}
                      alt={img.caption ?? `Foto paket ${paket.name}`}
                      loading="lazy"
                      className="aspect-4/3 w-full rounded-xl object-cover shadow-soft"
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Pilihan harga</p>
          <ul className="mt-4 space-y-3">
            {harga.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-display text-base text-primary">{formatRupiah(item.value)}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-6 w-full">
            <a href={waLink(settings, paket.name)} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              Daftar via WhatsApp
            </a>
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Tim kami membalas setiap hari pukul 08.00–20.00 WIB.
          </p>
        </aside>
      </div>
    </main>
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
    <div className="flex gap-3 rounded-xl border border-border bg-card p-4">
      <Icon className="size-5 shrink-0 text-primary" />
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}