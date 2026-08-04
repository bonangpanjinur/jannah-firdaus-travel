import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { db, packagesQuery, type Paket } from "@/lib/site-data";

export const Route = createFileRoute("/admin/paket")({
  component: AdminPaket,
});

type Draft = Partial<Paket>;

const empty: Draft = {
  name: "",
  slug: "",
  description: "",
  flyer_url: "",
  airline: "",
  hotel_makkah: "",
  hotel_madinah: "",
  includes: [],
  excludes: [],
  requirements: [],
  is_published: true,
  is_featured: false,
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function AdminPaket() {
  const qc = useQueryClient();
  const query = packagesQuery({ includeDrafts: true });
  const { data: packages = [], isLoading } = useQuery(query);
  const [draft, setDraft] = useState<Draft | null>(null);

  const save = useMutation({
    mutationFn: async (value: Draft) => {
      const payload = {
        ...value,
        slug: value.slug || slugify(value.name ?? ""),
        flyer_url: value.flyer_url || null,
      };
      const { id, ...rest } = payload;
      const res = id
        ? await db().from("packages").update(rest).eq("id", id)
        : await db().from("packages").insert(rest);
      if (res.error) throw res.error;
    },
    onSuccess: () => {
      toast.success("Paket tersimpan");
      setDraft(null);
      qc.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db().from("packages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Paket dihapus");
      qc.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function field(key: keyof Paket, value: unknown) {
    setDraft((prev) => ({ ...(prev ?? {}), [key]: value }));
  }

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl">Kelola Paket</h1>
        <Button onClick={() => setDraft({ ...empty })}>Tambah paket</Button>
      </div>

      {draft ? (
        <form
          onSubmit={(e) => { e.preventDefault(); save.mutate(draft); }}
          className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-2"
        >
          <Text label="Nama paket" value={draft.name ?? ""} onChange={(v) => field("name", v)} required />
          <Text label="Slug (URL)" value={draft.slug ?? ""} onChange={(v) => field("slug", slugify(v))} />
          <Text label="URL flyer" value={draft.flyer_url ?? ""} onChange={(v) => field("flyer_url", v)} />
          <Text label="Maskapai" value={draft.airline ?? ""} onChange={(v) => field("airline", v)} />
          <Text
            label="Tanggal keberangkatan"
            type="date"
            value={draft.departure_date ?? ""}
            onChange={(v) => field("departure_date", v || null)}
          />
          <Text
            label="Durasi (hari)"
            type="number"
            value={String(draft.duration_days ?? "")}
            onChange={(v) => field("duration_days", v ? Number(v) : null)}
          />
          <Text label="Hotel Makkah" value={draft.hotel_makkah ?? ""} onChange={(v) => field("hotel_makkah", v)} />
          <Text label="Hotel Madinah" value={draft.hotel_madinah ?? ""} onChange={(v) => field("hotel_madinah", v)} />
          <Text
            label="Harga quad"
            type="number"
            value={String(draft.price_quad ?? "")}
            onChange={(v) => field("price_quad", v ? Number(v) : null)}
          />
          <Text
            label="Harga triple"
            type="number"
            value={String(draft.price_triple ?? "")}
            onChange={(v) => field("price_triple", v ? Number(v) : null)}
          />
          <Text
            label="Harga double"
            type="number"
            value={String(draft.price_double ?? "")}
            onChange={(v) => field("price_double", v ? Number(v) : null)}
          />
          <Text
            label="Kuota"
            type="number"
            value={String(draft.quota ?? "")}
            onChange={(v) => field("quota", v ? Number(v) : null)}
          />
          <div className="space-y-2 md:col-span-2">
            <Label>Deskripsi</Label>
            <Textarea
              rows={3}
              value={draft.description ?? ""}
              onChange={(e) => field("description", e.target.value)}
            />
          </div>
          <ListField label="Termasuk" value={draft.includes ?? []} onChange={(v) => field("includes", v)} />
          <ListField label="Tidak termasuk" value={draft.excludes ?? []} onChange={(v) => field("excludes", v)} />
          <ListField
            label="Persyaratan"
            value={draft.requirements ?? []}
            onChange={(v) => field("requirements", v)}
          />
          <div className="flex items-center gap-6 md:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={draft.is_published ?? true} onCheckedChange={(v) => field("is_published", v)} />
              Tayangkan
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={draft.is_featured ?? false} onCheckedChange={(v) => field("is_featured", v)} />
              Unggulan
            </label>
          </div>
          <div className="flex gap-2 md:col-span-2">
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Menyimpan…" : "Simpan paket"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setDraft(null)}>Batal</Button>
          </div>
        </form>
      ) : null}

      {isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Memuat…</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {packages.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatTanggal(p.departure_date)} • {p.airline ?? "-"} • {formatRupiah(p.price_quad)}
                  {p.is_published ? "" : " • draf"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setDraft(p)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => remove.mutate(p.id)}>Hapus</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function Text({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label} (satu baris satu item)</Label>
      <Textarea
        rows={4}
        value={value.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n").filter(Boolean))}
      />
    </div>
  );
}