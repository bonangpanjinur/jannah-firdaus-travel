import { useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownUp, CalendarDays, Filter } from "lucide-react";
import { PackageCard } from "@/components/site/package-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bulanTahun, hargaMulai } from "@/lib/format";
import { packagesQuery, type Paket } from "@/lib/site-data";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd } from "@/lib/seo";

export interface PaketSearch {
  bulan: string;
  maskapai: string;
  hotel: string;
  harga: string;
  urut: string;
}

const HARGA_RANGES: { value: string; label: string; min: number; max: number }[] = [
  { value: "di-bawah-30-juta", label: "Di bawah Rp 30 juta", min: 0, max: 30_000_000 },
  { value: "30-40-juta", label: "Rp 30 – 40 juta", min: 30_000_000, max: 40_000_000 },
  { value: "40-50-juta", label: "Rp 40 – 50 juta", min: 40_000_000, max: 50_000_000 },
  { value: "di-atas-50-juta", label: "Di atas Rp 50 juta", min: 50_000_000, max: Number.MAX_SAFE_INTEGER },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function unslug(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function str(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 60) : "";
}

function activeFilters(search: PaketSearch) {
  return [search.bulan, search.maskapai, search.hotel, search.harga].filter(Boolean);
}

function canonicalPath(search: PaketSearch) {
  const parts: string[] = [];
  if (search.bulan) parts.push(`bulan=${search.bulan}`);
  if (search.maskapai) parts.push(`maskapai=${search.maskapai}`);
  if (search.hotel) parts.push(`hotel=${search.hotel}`);
  if (search.harga) parts.push(`harga=${search.harga}`);
  return parts.length ? `/paket?${parts.join("&")}` : "/paket";
}

function headline(search: PaketSearch) {
  const bits: string[] = [];
  if (search.bulan) bits.push(`Keberangkatan ${unslug(search.bulan)}`);
  if (search.maskapai) bits.push(`Maskapai ${unslug(search.maskapai)}`);
  if (search.hotel) bits.push(`Hotel ${unslug(search.hotel)}`);
  if (search.harga) bits.push(HARGA_RANGES.find((r) => r.value === search.harga)?.label ?? unslug(search.harga));
  return bits;
}

export const Route = createFileRoute("/paket/")({
  validateSearch: (raw: Record<string, unknown>): PaketSearch => ({
    bulan: str(raw.bulan),
    maskapai: str(raw.maskapai),
    hotel: str(raw.hotel),
    harga: HARGA_RANGES.some((r) => r.value === raw.harga) ? (raw.harga as string) : "",
    urut: ["harga", "durasi"].includes(str(raw.urut)) ? str(raw.urut) : "",
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => ({ info: await loadSiteInfo(context.queryClient), search: deps }),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData?.info);
    const search: PaketSearch = loaderData?.search ?? { bulan: "", maskapai: "", hotel: "", harga: "", urut: "" };
    const bits = headline(search);
    const filters = activeFilters(search);
    // Satu filter = halaman kategori yang layak diindeks. Kombinasi banyak filter
    // atau pengurutan hanya variasi tampilan, jadi ditandai noindex.
    const indexable = filters.length <= 1 && !search.urut;

    const title = bits.length
      ? `Paket Umroh ${bits.join(" · ")} — ${info.siteName}`
      : `Paket Umroh & Jadwal Keberangkatan — ${info.siteName}`;
    const description = bits.length
      ? `Daftar paket umroh ${info.siteName} dengan filter ${bits.join(", ").toLowerCase()}. Lengkap dengan harga per tipe kamar, maskapai, dan hotel di Makkah serta Madinah.`
      : `Daftar paket umroh ${info.siteName} lengkap dengan harga per tipe kamar, tanggal keberangkatan, maskapai, serta hotel di Makkah dan Madinah.`;

    const base = pageMeta({
      title,
      description,
      path: indexable ? canonicalPath(search) : "/paket",
      noindex: !indexable,
    });

    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Beranda", path: "/" },
              { name: "Paket Umroh", path: "/paket" },
              ...(bits.length && indexable ? [{ name: bits[0], path: canonicalPath(search) }] : []),
            ]),
          ),
        },
      ],
    };
  },
  component: DaftarPaket,
});

function DaftarPaket() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/paket" });
  const { data: packages = [], isLoading } = useQuery(packagesQuery());

  const setFilter = (patch: Partial<PaketSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const opsiBulan = useMemo(() => uniqueOptions(packages, (p) => bulanTahun(p.departure_date)), [packages]);
  const opsiMaskapai = useMemo(() => uniqueOptions(packages, (p) => p.airline), [packages]);
  const opsiHotel = useMemo(
    () => uniqueOptions(packages, (p) => p.hotel_makkah),
    [packages],
  );

  const hasil = useMemo(() => {
    const range = HARGA_RANGES.find((r) => r.value === search.harga);
    const filtered = packages.filter((paket) => {
      const price = hargaMulai(paket);
      const okBulan = !search.bulan || slugify(bulanTahun(paket.departure_date)) === search.bulan;
      const okMaskapai = !search.maskapai || slugify(paket.airline ?? "") === search.maskapai;
      const okHotel = !search.hotel || slugify(paket.hotel_makkah ?? "") === search.hotel;
      const okHarga = !range || (price !== null && price >= range.min && price <= range.max);
      return okBulan && okMaskapai && okHotel && okHarga;
    });

    return filtered.sort((a, b) => {
      if (search.urut === "harga") return (hargaMulai(a) ?? Number.MAX_SAFE_INTEGER) - (hargaMulai(b) ?? Number.MAX_SAFE_INTEGER);
      if (search.urut === "durasi") return (a.duration_days ?? Number.MAX_SAFE_INTEGER) - (b.duration_days ?? Number.MAX_SAFE_INTEGER);
      return (a.departure_date ?? "9999-12-31").localeCompare(b.departure_date ?? "9999-12-31");
    });
  }, [packages, search]);

  const bits = headline(search);
  const adaFilter = activeFilters(search).length > 0 || Boolean(search.urut);

  return (
    <main className="container-page py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:underline">Beranda</Link>
        <span className="px-2">/</span>
        {bits.length ? (
          <>
            <Link to="/paket" search={{ bulan: "", maskapai: "", hotel: "", harga: "", urut: "" }} className="hover:underline">
              Paket Umroh
            </Link>
            <span className="px-2">/</span>
            <span className="text-foreground">{bits[0]}</span>
          </>
        ) : (
          <span className="text-foreground">Paket Umroh</span>
        )}
      </nav>

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Paket Umroh</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          {bits.length ? `Paket Umroh ${bits.join(" · ")}` : "Pilih Jadwal Keberangkatan Anda"}
        </h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Bandingkan jadwal, maskapai, hotel, dan kisaran harga yang paling sesuai untuk keluarga Anda. Setiap pilihan
          filter memiliki alamat halaman sendiri sehingga mudah dibagikan.
        </p>
      </header>

      <section aria-label="Filter paket" className="bento-card mt-8 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-gold" />
            <h2 className="font-semibold">Cari paket</h2>
          </div>
          {adaFilter ? (
            <Button asChild size="sm" variant="ghost">
              <Link to="/paket" search={{ bulan: "", maskapai: "", hotel: "", harga: "", urut: "" }}>Reset filter</Link>
            </Button>
          ) : null}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect label="Tanggal keberangkatan" placeholder="Semua bulan" value={search.bulan} options={opsiBulan} onChange={(v) => setFilter({ bulan: v })} />
          <FilterSelect label="Maskapai" placeholder="Semua maskapai" value={search.maskapai} options={opsiMaskapai} onChange={(v) => setFilter({ maskapai: v })} />
          <FilterSelect label="Hotel Makkah" placeholder="Semua hotel" value={search.hotel} options={opsiHotel} onChange={(v) => setFilter({ hotel: v })} />
          <FilterSelect
            label="Kisaran harga"
            placeholder="Semua harga"
            value={search.harga}
            options={HARGA_RANGES.map((r) => ({ value: r.value, label: r.label }))}
            onChange={(v) => setFilter({ harga: v })}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
          <ArrowDownUp className="size-4 text-gold" />
          <Label htmlFor="urut" className="shrink-0">Urutkan</Label>
          <Select value={search.urut || "tanggal"} onValueChange={(v) => setFilter({ urut: v === "tanggal" ? "" : v })}>
            <SelectTrigger id="urut" className="w-full sm:max-w-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="tanggal">Keberangkatan terdekat</SelectItem>
              <SelectItem value="harga">Harga terendah</SelectItem>
              <SelectItem value="durasi">Durasi terpendek</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {opsiBulan.length ? (
        <nav aria-label="Jelajahi per bulan" className="mt-6 flex flex-wrap gap-2 text-sm">
          {opsiBulan.map((o) => (
            <Link
              key={o.value}
              to="/paket"
              search={{ bulan: o.value, maskapai: "", hotel: "", harga: "", urut: "" }}
              className={`rounded-full border px-3 py-1 transition-colors ${search.bulan === o.value ? "border-gold/50 text-gold" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              Umroh {o.label}
            </Link>
          ))}
        </nav>
      ) : null}

      <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="size-4" />
        {isLoading ? "Memuat paket…" : `${hasil.length} paket tersedia`}
      </div>

      {isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Memuat paket…</p>
      ) : hasil.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">Belum ada paket yang sesuai filter.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/paket" search={{ bulan: "", maskapai: "", hotel: "", harga: "", urut: "" }}>Tampilkan semua paket</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {hasil.map((paket) => (
            <PackageCard key={paket.id} paket={paket} />
          ))}
        </div>
      )}
    </main>
  );
}

function uniqueOptions(packages: Paket[], pick: (paket: Paket) => string | null) {
  const map = new Map<string, string>();
  for (const paket of packages) {
    const label = pick(paket)?.trim();
    if (!label || label === "Lainnya") continue;
    map.set(slugify(label), label);
  }
  return Array.from(map, ([value, label]) => ({ value, label }));
}

function FilterSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value || "semua"} onValueChange={(v) => onChange(v === "semua" ? "" : v)}>
        <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>
          <SelectItem value="semua">{placeholder}</SelectItem>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
