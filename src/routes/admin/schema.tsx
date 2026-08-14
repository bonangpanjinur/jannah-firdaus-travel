import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { packagesQuery, settingsQuery, type Paket } from "@/lib/site-data";
import { hargaMulai } from "@/lib/format";
import { KOTA_LAYANAN } from "@/lib/kota";
import {
  fromSettings,
  tripLd,
  faqLd,
  breadcrumbLd,
  itemListLd,
  layananKotaLd,
  SITE_CITY,
} from "@/lib/seo";

export const Route = createFileRoute("/admin/schema")({
  component: SchemaPreview,
});

type Blok = { judul: string; data: object };

function SchemaPreview() {
  const { data: settings } = useQuery(settingsQuery);
  const { data: pakets = [] } = useQuery(packagesQuery({ includeDrafts: true }));
  const [mode, setMode] = useState<"paket" | "kota">("paket");
  const [paketId, setPaketId] = useState<string>("");
  const [kotaSlug, setKotaSlug] = useState<string>(KOTA_LAYANAN[0]?.slug ?? "");

  const info = useMemo(() => fromSettings(settings ?? null), [settings]);
  const paketTerpilih: Paket | undefined = pakets.find((p) => p.id === paketId) ?? pakets[0];
  const kota = KOTA_LAYANAN.find((k) => k.slug === kotaSlug) ?? KOTA_LAYANAN[0];

  const blok: Blok[] = useMemo(() => {
    if (mode === "paket") {
      if (!paketTerpilih) return [];
      const path = `/paket/${paketTerpilih.slug}`;
      return [
        { judul: "TouristTrip + Offer", data: tripLd(paketTerpilih, hargaMulai(paketTerpilih), info) },
        {
          judul: "FAQPage",
          data: faqLd([
            {
              q: `Berapa harga paket umroh ${paketTerpilih.name}?`,
              a: `Informasi harga terbaru paket ${paketTerpilih.name} tersedia di halaman paket.`,
            },
            {
              q: `Kapan keberangkatan paket ${paketTerpilih.name}?`,
              a: paketTerpilih.departure_date
                ? `Keberangkatan dijadwalkan pada ${paketTerpilih.departure_date}.`
                : "Jadwal keberangkatan akan diperbarui.",
            },
          ]),
        },
        {
          judul: "BreadcrumbList",
          data: breadcrumbLd([
            { name: "Beranda", path: "/" },
            { name: "Paket Umroh", path: "/paket" },
            { name: paketTerpilih.name, path },
          ]),
        },
      ];
    }
    if (!kota) return [];
    const path = `/umroh/${kota.slug}`;
    const tayang = pakets.filter((p) => p.is_published).slice(0, 12);
    const trips = tayang.map((p) =>
      tripLd(p, hargaMulai(p), info, { departureCity: kota.nama, departureRegion: kota.provinsi }),
    );
    const katalog = tayang.map((p) => ({
      name: p.name,
      url: `/paket/${p.slug}`,
      price: hargaMulai(p),
      departureDate: p.departure_date,
      quota: p.quota,
      durationDays: p.duration_days,
    }));
    return [
      { judul: "Service (area layanan)", data: layananKotaLd(info, kota, path, katalog) },
      ...(trips.length
        ? [{ judul: "ItemList paket", data: itemListLd(`Paket umroh untuk jamaah ${kota.nama}`, path, trips) }]
        : []),
      {
        judul: "FAQPage",
        data: faqLd([
          {
            q: `Apakah ${info.siteName} melayani jamaah umroh dari ${kota.nama}?`,
            a: `Ya. Konsultasi dapat dilakukan daring maupun di kantor kami di ${SITE_CITY}.`,
          },
        ]),
      },
      {
        judul: "BreadcrumbList",
        data: breadcrumbLd([
          { name: "Beranda", path: "/" },
          { name: "Area Layanan", path: "/umroh" },
          { name: `Umroh ${kota.nama}`, path },
        ]),
      },
    ];
  }, [mode, paketTerpilih, kota, pakets, info]);

  const semua = useMemo(() => JSON.stringify(blok.map((b) => b.data), null, 2), [blok]);

  async function salin(teks: string) {
    try {
      await navigator.clipboard.writeText(teks);
      toast.success("Disalin ke clipboard");
    } catch {
      toast.error("Gagal menyalin");
    }
  }

  const urlPreview =
    mode === "paket"
      ? paketTerpilih
        ? `/paket/${paketTerpilih.slug}`
        : null
      : kota
        ? `/umroh/${kota.slug}`
        : null;

  return (
    <main className="p-6 md:p-10">
      <h1 className="font-display text-3xl">Preview JSON-LD</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Lihat structured data yang dibaca Google untuk halaman paket dan halaman kota sebelum dipublikasikan.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-border p-1">
          {(["paket", "kota"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-lg px-4 py-2 text-sm capitalize transition-colors ${
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Halaman {m}
            </button>
          ))}
        </div>

        {mode === "paket" ? (
          <select
            value={paketTerpilih?.id ?? ""}
            onChange={(e) => setPaketId(e.target.value)}
            className="rounded-xl border border-border bg-card px-3 py-2 text-sm"
          >
            {pakets.length === 0 ? <option value="">Belum ada paket</option> : null}
            {pakets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.is_published ? "" : "(draft)"}
              </option>
            ))}
          </select>
        ) : (
          <select
            value={kotaSlug}
            onChange={(e) => setKotaSlug(e.target.value)}
            className="rounded-xl border border-border bg-card px-3 py-2 text-sm"
          >
            {KOTA_LAYANAN.map((k) => (
              <option key={k.slug} value={k.slug}>
                {k.nama}
              </option>
            ))}
          </select>
        )}

        {urlPreview ? (
          <a href={urlPreview} target="_blank" rel="noreferrer" className="btn-ghost text-sm">
            Buka halaman
          </a>
        ) : null}
        {blok.length ? (
          <>
            <button type="button" onClick={() => salin(semua)} className="btn-ghost text-sm">
              Salin semua
            </button>
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost text-sm"
            >
              Uji di Rich Results
            </a>
          </>
        ) : null}
      </div>

      {blok.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground">
          Belum ada data untuk dipreview. Tambahkan paket terlebih dahulu di menu Paket.
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {blok.map((b) => {
            const teks = JSON.stringify(b.data, null, 2);
            return (
              <section key={b.judul} className="rounded-2xl border border-border bg-card shadow-soft">
                <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-3">
                  <h2 className="font-medium">{b.judul}</h2>
                  <button type="button" onClick={() => salin(teks)} className="text-xs text-muted-foreground hover:text-foreground">
                    Salin
                  </button>
                </header>
                <pre className="max-h-96 overflow-auto px-5 py-4 text-xs leading-relaxed text-muted-foreground">
                  {teks}
                </pre>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
