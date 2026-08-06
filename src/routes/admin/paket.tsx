import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { db, packagesQuery, type Paket } from "@/lib/site-data";
import { ImageUpload } from "@/components/admin/image-upload";
import { deleteMedia, isStoragePath } from "@/lib/storage";

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
  hotel_makkah_stars: null,
  hotel_madinah: "",
  hotel_madinah_stars: null,
  includes: [],
  excludes: [],
  requirements: [],
  is_published: true,
  is_featured: false,
  sort_order: 0,
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function validateDraft(value: Draft) {
  if (!value.name?.trim()) return "Nama paket wajib diisi.";
  if (!value.slug?.trim()) return "Slug paket wajib diisi.";
  if (value.duration_days !== null && value.duration_days !== undefined && (!Number.isInteger(value.duration_days) || value.duration_days < 1)) return "Durasi harus berupa angka minimal 1 hari.";
  if (value.quota !== null && value.quota !== undefined && (!Number.isInteger(value.quota) || value.quota < 0)) return "Kuota tidak boleh negatif.";
  if ([value.price_quad, value.price_triple, value.price_double].some((price) => price !== null && price !== undefined && price < 0)) return "Harga tidak boleh negatif.";
  return null;
}

function AdminPaket() {
  const qc = useQueryClient();
  const query = packagesQuery({ includeDrafts: true });
  const { data: packages = [], isLoading } = useQuery(query);
  const [draft, setDraft] = useState<Draft | null>(null);

  const save = useMutation({
    mutationFn: async (value: Draft) => {
      const validationError = validateDraft(value);
      if (validationError) throw new Error(validationError);
      const payload = {
        ...value,
        name: value.name?.trim(),
        slug: value.slug?.trim() || slugify(value.name ?? ""),
        flyer_url: value.flyer_url || null,
        description: value.description?.trim() || null,
      };
      const { id, ...rest } = payload;
      const response = id ? await db().from("packages").update(rest).eq("id", id) : await db().from("packages").insert(rest);
      if (response.error) throw response.error;
    },
    onSuccess: () => {
      toast.success("Paket tersimpan");
      setDraft(null);
      qc.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (paket: Paket) => {
      const { data: images, error: imageError } = await db().from("package_images").select("image_url").eq("package_id", paket.id);
      if (imageError) throw imageError;
      const { error } = await db().from("packages").delete().eq("id", paket.id);
      if (error) throw error;
      const paths = [paket.flyer_url, ...(images ?? []).map((image: { image_url: string }) => image.image_url)].filter(isStoragePath);
      await Promise.all(paths.map((path) => deleteMedia(path).catch(() => undefined)));
    },
    onSuccess: () => {
      toast.success("Paket dihapus");
      qc.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function field(key: keyof Paket, value: unknown) {
    setDraft((previous) => ({ ...(previous ?? {}), [key]: value }));
  }

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-gold">Konten utama</p><h1 className="mt-1 font-display text-3xl">Kelola Paket</h1></div><Button onClick={() => setDraft({ ...empty })}>Tambah paket</Button></div>
      {draft ? <form onSubmit={(event) => { event.preventDefault(); save.mutate(draft); }} className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-2">
        <Text label="Nama paket" value={draft.name ?? ""} onChange={(value) => field("name", value)} required />
        <Text label="Slug (URL)" value={draft.slug ?? ""} onChange={(value) => field("slug", slugify(value))} required />
        <Text label="Maskapai" value={draft.airline ?? ""} onChange={(value) => field("airline", value)} />
        <Text label="Urutan tampil" type="number" value={String(draft.sort_order ?? 0)} onChange={(value) => field("sort_order", value ? Number(value) : 0)} />
        <div className="md:col-span-2"><ImageUpload label="Foto flyer paket" folder="flyers" value={draft.flyer_url} onChange={(value) => field("flyer_url", value)} /></div>
        <Text label="Tanggal keberangkatan" type="date" value={draft.departure_date ?? ""} onChange={(value) => field("departure_date", value || null)} />
        <Text label="Durasi (hari)" type="number" value={String(draft.duration_days ?? "")} onChange={(value) => field("duration_days", value ? Number(value) : null)} />
        <Text label="Hotel Makkah" value={draft.hotel_makkah ?? ""} onChange={(value) => field("hotel_makkah", value)} />
        <Text label="Bintang Makkah" type="number" value={String(draft.hotel_makkah_stars ?? "")} onChange={(value) => field("hotel_makkah_stars", value ? Number(value) : null)} />
        <Text label="Hotel Madinah" value={draft.hotel_madinah ?? ""} onChange={(value) => field("hotel_madinah", value)} />
        <Text label="Bintang Madinah" type="number" value={String(draft.hotel_madinah_stars ?? "")} onChange={(value) => field("hotel_madinah_stars", value ? Number(value) : null)} />
        <Text label="Harga quad" type="number" value={String(draft.price_quad ?? "")} onChange={(value) => field("price_quad", value ? Number(value) : null)} />
        <Text label="Harga triple" type="number" value={String(draft.price_triple ?? "")} onChange={(value) => field("price_triple", value ? Number(value) : null)} />
        <Text label="Harga double" type="number" value={String(draft.price_double ?? "")} onChange={(value) => field("price_double", value ? Number(value) : null)} />
        <Text label="Kuota" type="number" value={String(draft.quota ?? "")} onChange={(value) => field("quota", value ? Number(value) : null)} />
        <div className="space-y-2 md:col-span-2"><Label>Deskripsi</Label><Textarea rows={3} value={draft.description ?? ""} onChange={(event) => field("description", event.target.value)} /></div>
        <ListField label="Termasuk" value={draft.includes ?? []} onChange={(value) => field("includes", value)} /><ListField label="Tidak termasuk" value={draft.excludes ?? []} onChange={(value) => field("excludes", value)} /><ListField label="Persyaratan" value={draft.requirements ?? []} onChange={(value) => field("requirements", value)} />
        <div className="flex items-center gap-6 md:col-span-2"><label className="flex items-center gap-2 text-sm"><Switch checked={draft.is_published ?? true} onCheckedChange={(value) => field("is_published", value)} />Tayangkan</label><label className="flex items-center gap-2 text-sm"><Switch checked={draft.is_featured ?? false} onCheckedChange={(value) => field("is_featured", value)} />Unggulan</label></div>
        <div className="flex gap-2 md:col-span-2"><Button type="submit" disabled={save.isPending}>{save.isPending ? "Menyimpan…" : "Simpan paket"}</Button><Button type="button" variant="outline" onClick={() => setDraft(null)}>Batal</Button></div>
      </form> : null}
      {isLoading ? <p className="mt-8 text-sm text-muted-foreground">Memuat…</p> : <ul className="mt-8 space-y-3">{packages.map((paket) => <li key={paket.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"><div><p className="font-semibold">{paket.name}</p><p className="text-xs text-muted-foreground">{formatTanggal(paket.departure_date)} • {paket.airline ?? "-"} • {formatRupiah(paket.price_quad)}{paket.is_published ? "" : " • draf"}</p></div><div className="flex flex-wrap gap-2"><Button asChild size="sm" variant="secondary"><Link to="/admin/paket/$id" params={{ id: paket.id }}>Itinerary & galeri</Link></Button><Button size="sm" variant="outline" onClick={() => setDraft(paket)}>Edit</Button><Button size="sm" variant="destructive" onClick={() => { if (window.confirm(`Hapus paket ${paket.name}? Data itinerary, galeri, dan file terkait juga akan dibersihkan.`)) remove.mutate(paket); }}>Hapus</Button></div></li>)}</ul>}
    </main>
  );
}

function Text({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <div className="space-y-2"><Label>{label}</Label><Input type={type} min={type === "number" ? "0" : undefined} value={value} required={required} onChange={(event) => onChange(event.target.value)} /></div>;
}

function ListField({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
  return <div className="space-y-2"><Label>{label} (satu baris satu item)</Label><Textarea rows={4} value={value.join("\n")} onChange={(event) => onChange(event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} /></div>;
}
