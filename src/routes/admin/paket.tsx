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

const PRESET_INCLUDES = [
  "Tiket pesawat PP",
  "Visa umroh",
  "Hotel Makkah & Madinah",
  "Makan 3x sehari",
  "Bus AC selama di Saudi",
  "Muthawwif berbahasa Indonesia",
  "Perlengkapan umroh",
  "Air zamzam 5 liter",
  "Manasik umroh",
];
const PRESET_EXCLUDES = [
  "Paspor",
  "Vaksin meningitis",
  "Suntik/tes kesehatan",
  "Kelebihan bagasi",
  "Pengeluaran pribadi",
  "Tour tambahan",
];
const PRESET_REQUIREMENTS = [
  "Paspor berlaku minimal 8 bulan",
  "Nama paspor minimal 3 suku kata",
  "Kartu keluarga & KTP",
  "Pas foto latar putih",
  "Buku vaksin meningitis",
  "Surat mahram (jika diperlukan)",
];

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function validateDraft(value: Draft) {
  if (!value.name?.trim()) return "Nama paket wajib diisi.";
  if (!value.slug?.trim()) return "Slug paket wajib diisi.";
  if (value.duration_days !== null && value.duration_days !== undefined && (!Number.isInteger(value.duration_days) || value.duration_days < 1)) return "Durasi harus berupa angka minimal 1 hari.";
  if (value.quota !== null && value.quota !== undefined && (!Number.isInteger(value.quota) || value.quota < 0)) return "Kuota tidak boleh negatif.";
  if ([value.price_quad, value.price_triple, value.price_double].some((price) => price !== null && price !== undefined && price < 0)) return "Harga tidak boleh negatif.";
  if ([value.hotel_makkah_stars, value.hotel_madinah_stars].some((stars) => stars !== null && stars !== undefined && (!Number.isInteger(stars) || stars < 1 || stars > 5))) return "Rating hotel harus antara 1 sampai 5 bintang.";
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

  /** Nama paket otomatis mengisi slug selama admin belum mengubah slug secara manual. */
  function changeName(value: string) {
    setDraft((previous) => {
      const current = previous ?? {};
      const autoSlug = !current.id && (!current.slug || current.slug === slugify(current.name ?? ""));
      return { ...current, name: value, slug: autoSlug ? slugify(value) : (current.slug ?? "") };
    });
  }

  function duplicate(paket: Paket) {
    const { id, created_at, updated_at, ...rest } = paket as Paket & { created_at?: string; updated_at?: string };
    void id; void created_at; void updated_at;
    setDraft({ ...rest, name: `${paket.name} (Salinan)`, slug: `${paket.slug}-salinan`, is_published: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info("Salinan paket dibuat. Ubah tanggal & harga lalu simpan.");
  }

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Konten utama</p>
          <h1 className="mt-1 font-display text-3xl">Kelola Paket</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Isi paket seperti mengisi produk: flyer, deskripsi, pesawat, hotel, harga. Kolom kosong otomatis disembunyikan di halaman publik.</p>
        </div>
        <Button onClick={() => setDraft({ ...empty })}>Tambah paket</Button>
      </div>

      {draft ? (
        <form
          onSubmit={(event) => { event.preventDefault(); save.mutate(draft); }}
          className="mt-8 space-y-6"
        >
          <Section title="1. Informasi dasar" hint="Nama paket dan flyer adalah yang pertama dilihat calon jamaah.">
            <Text label="Nama paket" placeholder="Umroh Reguler 12 Hari Februari" value={draft.name ?? ""} onChange={changeName} required />
            <Text label="Slug (URL)" placeholder="umroh-reguler-12-hari-februari" value={draft.slug ?? ""} onChange={(value) => field("slug", slugify(value))} required />
            <div className="md:col-span-2"><ImageUpload label="Foto flyer paket" folder="flyers" value={draft.flyer_url} onChange={(value) => field("flyer_url", value)} /></div>
            <div className="space-y-2 md:col-span-2">
              <Label>Deskripsi singkat</Label>
              <Textarea rows={3} placeholder="Umroh 12 hari bersama pembimbing berpengalaman, hotel dekat Masjidil Haram, dan city tour Thaif." value={draft.description ?? ""} onChange={(event) => field("description", event.target.value)} />
            </div>
          </Section>

          <Section title="2. Keberangkatan & pesawat" hint="Tanggal dan maskapai membantu jamaah membandingkan paket.">
            <Text label="Tanggal keberangkatan" type="date" value={draft.departure_date ?? ""} onChange={(value) => field("departure_date", value || null)} />
            <Text label="Durasi (hari)" type="number" placeholder="12" value={String(draft.duration_days ?? "")} onChange={(value) => field("duration_days", value ? Number(value) : null)} />
            <Text label="Maskapai" placeholder="Saudia Airlines" value={draft.airline ?? ""} onChange={(value) => field("airline", value)} />
            <Text label="Kuota jamaah" type="number" placeholder="45" value={String(draft.quota ?? "")} onChange={(value) => field("quota", value ? Number(value) : null)} />
          </Section>

          <Section title="3. Hotel" hint="Tulis nama hotel dan bintangnya (1-5).">
            <Text label="Hotel Makkah" placeholder="Hilton Suites Makkah" value={draft.hotel_makkah ?? ""} onChange={(value) => field("hotel_makkah", value)} />
            <Text label="Bintang Makkah" type="number" min="1" max="5" placeholder="5" value={String(draft.hotel_makkah_stars ?? "")} onChange={(value) => field("hotel_makkah_stars", value ? Number(value) : null)} />
            <Text label="Hotel Madinah" placeholder="Frontel Al Harithia" value={draft.hotel_madinah ?? ""} onChange={(value) => field("hotel_madinah", value)} />
            <Text label="Bintang Madinah" type="number" min="1" max="5" placeholder="4" value={String(draft.hotel_madinah_stars ?? "")} onChange={(value) => field("hotel_madinah_stars", value ? Number(value) : null)} />
          </Section>

          <Section title="4. Harga per jamaah" hint="Isi dalam rupiah tanpa titik, contoh: 32500000. Kosongkan bila tidak ditawarkan.">
            <Text label="Harga quad (sekamar 4)" type="number" placeholder="32500000" value={String(draft.price_quad ?? "")} onChange={(value) => field("price_quad", value ? Number(value) : null)} />
            <Text label="Harga triple (sekamar 3)" type="number" placeholder="34500000" value={String(draft.price_triple ?? "")} onChange={(value) => field("price_triple", value ? Number(value) : null)} />
            <Text label="Harga double (sekamar 2)" type="number" placeholder="37500000" value={String(draft.price_double ?? "")} onChange={(value) => field("price_double", value ? Number(value) : null)} />
          </Section>

          <Section title="5. Fasilitas & syarat" hint="Klik tombol isian cepat, lalu sunting sesuai paket Anda.">
            <ListField label="Termasuk" value={draft.includes ?? []} presets={PRESET_INCLUDES} onChange={(value) => field("includes", value)} />
            <ListField label="Tidak termasuk" value={draft.excludes ?? []} presets={PRESET_EXCLUDES} onChange={(value) => field("excludes", value)} />
            <ListField label="Persyaratan" value={draft.requirements ?? []} presets={PRESET_REQUIREMENTS} onChange={(value) => field("requirements", value)} />
          </Section>

          <Section title="6. Penayangan" hint="Simpan sebagai draf dulu bila data belum lengkap.">
            <div className="flex flex-wrap items-center gap-6 md:col-span-2">
              <label className="flex items-center gap-2 text-sm"><Switch checked={draft.is_published ?? true} onCheckedChange={(value) => field("is_published", value)} />Tayangkan di website</label>
              <label className="flex items-center gap-2 text-sm"><Switch checked={draft.is_featured ?? false} onCheckedChange={(value) => field("is_featured", value)} />Tampilkan sebagai unggulan</label>
            </div>
            <Text label="Urutan tampil" type="number" value={String(draft.sort_order ?? 0)} onChange={(value) => field("sort_order", value ? Number(value) : 0)} />
          </Section>

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={save.isPending}>{save.isPending ? "Menyimpan…" : "Simpan paket"}</Button>
            <Button type="button" variant="outline" onClick={() => setDraft(null)}>Batal</Button>
          </div>
        </form>
      ) : null}

      {isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Memuat…</p>
      ) : packages.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Belum ada paket. Klik “Tambah paket” untuk membuat paket umroh pertama Anda.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {packages.map((paket) => (
            <li key={paket.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div>
                <p className="font-semibold">{paket.name}</p>
                <p className="text-xs text-muted-foreground">{formatTanggal(paket.departure_date)} • {paket.airline ?? "-"} • {formatRupiah(paket.price_quad)}{paket.is_published ? "" : " • draf"}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="secondary"><Link to="/admin/paket/$id" params={{ id: paket.id }}>Itinerary & galeri</Link></Button>
                <Button size="sm" variant="outline" onClick={() => setDraft(paket)}>Edit</Button>
                <Button size="sm" variant="outline" onClick={() => duplicate(paket)}>Duplikat</Button>
                <Button size="sm" variant="destructive" onClick={() => { if (window.confirm(`Hapus paket ${paket.name}? Data itinerary, galeri, dan file terkait juga akan dibersihkan.`)) remove.mutate(paket); }}>Hapus</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="font-display text-lg">{title}</h2>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Text({ label, value, onChange, type = "text", required, min, max, placeholder }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; min?: string; max?: string; placeholder?: string }) {
  return <div className="space-y-2"><Label>{label}</Label><Input type={type} min={min ?? (type === "number" ? "0" : undefined)} max={max} value={value} required={required} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></div>;
}

function ListField({ label, value, presets = [], onChange }: { label: string; value: string[]; presets?: string[]; onChange: (value: string[]) => void }) {
  return (
    <div className="space-y-2 md:col-span-2">
      <Label>{label} (satu baris satu item)</Label>
      {presets.length ? (
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => {
            const active = value.includes(preset);
            return (
              <button
                key={preset}
                type="button"
                onClick={() => onChange(active ? value.filter((item) => item !== preset) : [...value, preset])}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${active ? "border-gold bg-accent/50 text-foreground" : "border-border text-muted-foreground hover:border-gold/50"}`}
              >
                {active ? "✓ " : "+ "}{preset}
              </button>
            );
          })}
        </div>
      ) : null}
      <Textarea rows={4} value={value.join("\n")} onChange={(event) => onChange(event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))} />
    </div>
  );
}

