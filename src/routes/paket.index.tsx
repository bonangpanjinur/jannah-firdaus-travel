import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PackageCard } from "@/components/site/package-card";
import { Button } from "@/components/ui/button";
import { bulanTahun } from "@/lib/format";
import { packagesQuery } from "@/lib/site-data";

export const Route = createFileRoute("/paket")({
  head: () => ({
    meta: [
      { title: "Paket Umroh & Jadwal Keberangkatan — Barokah Umroh" },
      {
        name: "description",
        content:
          "Daftar paket umroh lengkap dengan harga, tanggal keberangkatan, maskapai, dan hotel di Makkah serta Madinah.",
      },
      { property: "og:title", content: "Paket Umroh & Jadwal Keberangkatan — Barokah Umroh" },
      {
        property: "og:description",
        content: "Bandingkan paket umroh berdasarkan harga, jadwal, maskapai, dan hotel.",
      },
    ],
  }),
  component: DaftarPaket,
});

function DaftarPaket() {
  const { data: packages = [], isLoading } = useQuery(packagesQuery());
  const [bulan, setBulan] = useState<string>("semua");

  const bulanTersedia = useMemo(() => {
    const set = new Set(packages.map((p) => bulanTahun(p.departure_date)));
    return Array.from(set);
  }, [packages]);

  const hasil = packages.filter((p) => bulan === "semua" || bulanTahun(p.departure_date) === bulan);

  return (
    <main className="container-page py-14">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-gold">Paket Umroh</p>
        <h1 className="mt-2 font-display text-4xl">Pilih Jadwal Keberangkatan Anda</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Semua paket sudah termasuk tiket pesawat, visa, akomodasi hotel, konsumsi, dan bimbingan ibadah.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={bulan === "semua" ? "default" : "outline"}
          onClick={() => setBulan("semua")}
        >
          Semua bulan
        </Button>
        {bulanTersedia.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={bulan === item ? "default" : "outline"}
            onClick={() => setBulan(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <p className="mt-12 text-sm text-muted-foreground">Memuat paket…</p>
      ) : hasil.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">Belum ada paket pada periode ini.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((paket) => (
            <PackageCard key={paket.id} paket={paket} />
          ))}
        </div>
      )}
    </main>
  );
}