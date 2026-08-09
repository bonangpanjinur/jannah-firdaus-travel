import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownUp, CalendarDays, Filter } from "lucide-react";
import { PackageCard } from "@/components/site/package-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bulanTahun, hargaMulai } from "@/lib/format";
import { packagesQuery } from "@/lib/site-data";

export const Route = createFileRoute("/paket/")({
  head: () => ({
    meta: [
      { title: "Paket Umroh & Jadwal Keberangkatan — Barokah Umroh" },
      { name: "description", content: "Daftar paket umroh lengkap dengan harga, tanggal keberangkatan, maskapai, dan hotel di Makkah serta Madinah." },
      { property: "og:title", content: "Paket Umroh & Jadwal Keberangkatan — Barokah Umroh" },
      { property: "og:description", content: "Bandingkan paket umroh berdasarkan harga, jadwal, maskapai, dan hotel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DaftarPaket,
});

function DaftarPaket() {
  const { data: packages = [], isLoading } = useQuery(packagesQuery());
  const [bulan, setBulan] = useState("semua");
  const [sort, setSort] = useState("tanggal");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [duration, setDuration] = useState("semua");

  const bulanTersedia = useMemo(() => {
    const values = new Set(packages.map((paket) => bulanTahun(paket.departure_date)));
    return Array.from(values);
  }, [packages]);

  const hasil = useMemo(() => {
    const filtered = packages.filter((paket) => {
      const price = hargaMulai(paket);
      const matchesMonth = bulan === "semua" || bulanTahun(paket.departure_date) === bulan;
      const matchesMin = !minPrice || (price !== null && price >= Number(minPrice));
      const matchesMax = !maxPrice || (price !== null && price <= Number(maxPrice));
      const matchesDuration = duration === "semua" || (duration === "singkat" ? (paket.duration_days ?? 0) <= 10 : (paket.duration_days ?? 0) > 10);
      return matchesMonth && matchesMin && matchesMax && matchesDuration;
    });

    return filtered.sort((a, b) => {
      if (sort === "harga") return (hargaMulai(a) ?? Number.MAX_SAFE_INTEGER) - (hargaMulai(b) ?? Number.MAX_SAFE_INTEGER);
      if (sort === "durasi") return (a.duration_days ?? Number.MAX_SAFE_INTEGER) - (b.duration_days ?? Number.MAX_SAFE_INTEGER);
      return (a.departure_date ?? "9999-12-31").localeCompare(b.departure_date ?? "9999-12-31");
    });
  }, [bulan, duration, maxPrice, minPrice, packages, sort]);

  function resetFilters() {
    setBulan("semua");
    setSort("tanggal");
    setMinPrice("");
    setMaxPrice("");
    setDuration("semua");
  }

  return (
    <main className="container-page py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Paket Umroh</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Pilih Jadwal Keberangkatan Anda</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">Bandingkan jadwal, fasilitas, hotel, dan kisaran harga yang paling sesuai untuk keluarga Anda.</p>
      </header>

      <section aria-label="Filter paket" className="bento-card mt-8 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Filter className="size-4 text-gold" /><h2 className="font-semibold">Cari paket</h2></div><Button type="button" size="sm" variant="ghost" onClick={resetFilters}>Reset filter</Button></div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-2 lg:col-span-2"><Label>Bulan keberangkatan</Label><div className="flex flex-wrap gap-2"><Button type="button" size="sm" variant={bulan === "semua" ? "default" : "outline"} onClick={() => setBulan("semua")}>Semua</Button>{bulanTersedia.map((item) => <Button type="button" key={item} size="sm" variant={bulan === item ? "default" : "outline"} onClick={() => setBulan(item)}>{item}</Button>)}</div></div>
          <div className="space-y-2"><Label htmlFor="min-price">Harga mulai dari</Label><Input id="min-price" type="number" min="0" placeholder="Rp minimal" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} /></div>
          <div className="space-y-2"><Label htmlFor="max-price">Harga maksimal</Label><Input id="max-price" type="number" min="0" placeholder="Rp maksimal" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} /></div>
          <div className="space-y-2"><Label>Durasi</Label><Select value={duration} onValueChange={setDuration}><SelectTrigger><SelectValue placeholder="Semua durasi" /></SelectTrigger><SelectContent><SelectItem value="semua">Semua durasi</SelectItem><SelectItem value="singkat">Maksimal 10 hari</SelectItem><SelectItem value="panjang">Lebih dari 10 hari</SelectItem></SelectContent></Select></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4"><ArrowDownUp className="size-4 text-gold" /><Label htmlFor="sort" className="shrink-0">Urutkan</Label><Select value={sort} onValueChange={setSort}><SelectTrigger id="sort" className="w-full sm:max-w-xs"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tanggal">Keberangkatan terdekat</SelectItem><SelectItem value="harga">Harga terendah</SelectItem><SelectItem value="durasi">Durasi terpendek</SelectItem></SelectContent></Select></div>
      </section>

      <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" />{isLoading ? "Memuat paket…" : `${hasil.length} paket tersedia`}</div>
      {isLoading ? <p className="mt-6 text-sm text-muted-foreground">Memuat paket…</p> : hasil.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center"><p className="text-sm text-muted-foreground">Belum ada paket yang sesuai filter.</p><Button type="button" variant="outline" className="mt-4" onClick={resetFilters}>Tampilkan semua paket</Button></div> : <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">{hasil.map((paket) => <PackageCard key={paket.id} paket={paket} />)}</div>}
    </main>
  );
}
