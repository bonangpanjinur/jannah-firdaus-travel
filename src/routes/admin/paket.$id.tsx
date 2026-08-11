import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowLeft, ArrowUp, ImagePlus, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StorageImage } from "@/components/site/storage-image";
import {
  db,
  itineraryQuery,
  packageByIdQuery,
  packageImagesQuery,
  type ItineraryItem,
  type PackageImage,
} from "@/lib/site-data";
import { deleteMedia, isStoragePath, uploadMedia } from "@/lib/storage";

export const Route = createFileRoute("/admin/paket/$id")({
  head: () => ({
    meta: [
      { title: "Isi Paket — Panel Admin Jannah Firdaus Tour Travel" },
      { name: "description", content: "Kelola itinerary dan galeri foto untuk satu paket umroh." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPaketDetail,
});

type ItineraryDraft = {
  day_number: string;
  title: string;
  description: string;
};

const blankItinerary: ItineraryDraft = { day_number: "1", title: "", description: "" };

function AdminPaketDetail() {
  const { id } = Route.useParams();
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: paket, isLoading: packageLoading } = useQuery(packageByIdQuery(id));
  const itineraryKey = itineraryQuery(id);
  const imagesKey = packageImagesQuery(id);
  const { data: itinerary = [], isLoading: itineraryLoading } = useQuery(itineraryKey);
  const { data: images = [], isLoading: imagesLoading } = useQuery(imagesKey);
  const [itineraryDraft, setItineraryDraft] = useState<ItineraryDraft>(blankItinerary);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const saveItinerary = useMutation({
    mutationFn: async (draft: ItineraryDraft) => {
      const dayNumber = Number(draft.day_number);
      const title = draft.title.trim();
      if (!Number.isInteger(dayNumber) || dayNumber < 1) throw new Error("Hari harus berupa angka minimal 1.");
      if (!title) throw new Error("Judul itinerary wajib diisi.");
      const payload = { package_id: id, day_number: dayNumber, title, description: draft.description.trim() || null };
      const response = editingId
        ? await db().from("package_itinerary").update(payload).eq("id", editingId)
        : await db().from("package_itinerary").insert(payload);
      if (response.error) throw response.error;
    },
    onSuccess: () => {
      toast.success(editingId ? "Itinerary diperbarui" : "Itinerary ditambahkan");
      setItineraryDraft(blankItinerary);
      setEditingId(null);
      qc.invalidateQueries({ queryKey: itineraryKey.queryKey });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const removeItinerary = useMutation({
    mutationFn: async (item: ItineraryItem) => {
      const { error } = await db().from("package_itinerary").delete().eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Itinerary dihapus");
      qc.invalidateQueries({ queryKey: itineraryKey.queryKey });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const reorderItinerary = useMutation({
    mutationFn: async ({ index, direction }: { index: number; direction: -1 | 1 }) => {
      const targetIndex = index + direction;
      const current = itinerary[index];
      const target = itinerary[targetIndex];
      if (!current || !target) return;
      const first = await db().from("package_itinerary").update({ day_number: target.day_number }).eq("id", current.id);
      if (first.error) throw first.error;
      const second = await db().from("package_itinerary").update({ day_number: current.day_number }).eq("id", target.id);
      if (second.error) throw second.error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: itineraryKey.queryKey }),
    onError: (error: Error) => toast.error(error.message),
  });

  const removeImage = useMutation({
    mutationFn: async (image: PackageImage) => {
      const { error } = await db().from("package_images").delete().eq("id", image.id);
      if (error) throw error;
      if (isStoragePath(image.image_url)) await deleteMedia(image.image_url).catch(() => undefined);
    },
    onSuccess: () => {
      toast.success("Foto paket dihapus");
      qc.invalidateQueries({ queryKey: imagesKey.queryKey });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  async function handleGalleryFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const uploadedPaths: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const path = await uploadMedia(file, `galeri/${id}`);
        uploadedPaths.push(path);
        const { error } = await db().from("package_images").insert({
          package_id: id,
          image_url: path,
          sort_order: images.length + uploadedPaths.length - 1,
        });
        if (error) throw error;
      }
      toast.success(`${uploadedPaths.length} foto paket ditambahkan`);
      qc.invalidateQueries({ queryKey: imagesKey.queryKey });
    } catch (error) {
      await Promise.all(uploadedPaths.map((path) => deleteMedia(path).catch(() => undefined)));
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function editItinerary(item: ItineraryItem) {
    setEditingId(item.id);
    setItineraryDraft({
      day_number: String(item.day_number),
      title: item.title,
      description: item.description ?? "",
    });
  }

  if (packageLoading) return <main className="p-6 text-sm text-muted-foreground md:p-10">Memuat paket…</main>;
  if (!paket) {
    return (
      <main className="p-6 md:p-10">
        <h1 className="font-display text-3xl">Paket tidak ditemukan</h1>
        <Button asChild variant="outline" className="mt-6"><Link to="/admin/paket">Kembali ke paket</Link></Button>
      </main>
    );
  }

  return (
    <main className="p-6 md:p-10">
      <Link to="/admin/paket" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="size-4" /> Kembali ke daftar paket
      </Link>
      <header className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Isi paket</p>
          <h1 className="mt-1 font-display text-3xl">{paket.name}</h1>
        </div>
        <span className="text-sm text-muted-foreground">/{paket.slug}</span>
      </header>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl">Itinerary harian</h2>
              <p className="mt-1 text-sm text-muted-foreground">Susun agenda perjalanan yang tampil pada halaman detail paket.</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{itinerary.length} hari</span>
          </div>

          <form
            onSubmit={(event) => { event.preventDefault(); saveItinerary.mutate(itineraryDraft); }}
            className="mt-6 space-y-4 border-b border-border pb-6"
          >
            <div className="grid gap-4 sm:grid-cols-[100px_minmax(0,1fr)]">
              <div className="space-y-2"><Label htmlFor="day-number">Hari</Label><Input id="day-number" type="number" min="1" value={itineraryDraft.day_number} onChange={(event) => setItineraryDraft({ ...itineraryDraft, day_number: event.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="day-title">Judul kegiatan</Label><Input id="day-title" required value={itineraryDraft.title} onChange={(event) => setItineraryDraft({ ...itineraryDraft, title: event.target.value })} placeholder="Contoh: Tiba di Madinah" /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="day-description">Deskripsi</Label><Textarea id="day-description" rows={3} value={itineraryDraft.description} onChange={(event) => setItineraryDraft({ ...itineraryDraft, description: event.target.value })} placeholder="Rincian agenda, hotel, atau catatan perjalanan" /></div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saveItinerary.isPending}><Save className="size-4" />{saveItinerary.isPending ? "Menyimpan…" : editingId ? "Simpan perubahan" : "Tambah hari"}</Button>
              {editingId ? <Button type="button" variant="outline" onClick={() => { setEditingId(null); setItineraryDraft(blankItinerary); }}>Batal edit</Button> : null}
            </div>
          </form>

          {itineraryLoading ? <p className="mt-6 text-sm text-muted-foreground">Memuat itinerary…</p> : itinerary.length === 0 ? <p className="mt-6 text-sm text-muted-foreground">Belum ada itinerary. Tambahkan hari pertama di atas.</p> : <ol className="mt-6 space-y-3">{itinerary.map((item, index) => <li key={item.id} className="flex gap-3 rounded-xl border border-border p-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{item.day_number}</span><div className="min-w-0 flex-1"><p className="font-semibold">{item.title}</p>{item.description ? <p className="mt-1 text-sm/6 text-muted-foreground">{item.description}</p> : null}</div><div className="flex shrink-0 items-start gap-1"><Button type="button" size="icon" variant="ghost" aria-label={`Naikkan hari ${item.day_number}`} disabled={index === 0 || reorderItinerary.isPending} onClick={() => reorderItinerary.mutate({ index, direction: -1 })}><ArrowUp className="size-4" /></Button><Button type="button" size="icon" variant="ghost" aria-label={`Turunkan hari ${item.day_number}`} disabled={index === itinerary.length - 1 || reorderItinerary.isPending} onClick={() => reorderItinerary.mutate({ index, direction: 1 })}><ArrowDown className="size-4" /></Button><Button type="button" size="sm" variant="outline" onClick={() => editItinerary(item)}>Edit</Button><Button type="button" size="icon" variant="ghost" aria-label={`Hapus hari ${item.day_number}`} onClick={() => { if (window.confirm(`Hapus itinerary hari ${item.day_number}?`)) removeItinerary.mutate(item); }}><Trash2 className="size-4 text-destructive" /></Button></div></li>)}</ol>}
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div><h2 className="font-display text-2xl">Galeri paket</h2><p className="mt-1 text-sm text-muted-foreground">Unggah foto yang relevan dengan keberangkatan dan fasilitas paket ini.</p></div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{images.length} foto</span>
          </div>
          <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={(event) => handleGalleryFiles(event.target.files)} />
          <Button type="button" className="mt-6" disabled={uploading} onClick={() => inputRef.current?.click()}><ImagePlus className="size-4" />{uploading ? <><Loader2 className="size-4 animate-spin" />Mengunggah…</> : "Unggah banyak foto"}</Button>
          <p className="mt-2 text-xs text-muted-foreground">Format gambar, maksimal 5 MB per file.</p>
          {imagesLoading ? <p className="mt-8 text-sm text-muted-foreground">Memuat galeri…</p> : images.length === 0 ? <p className="mt-8 text-sm text-muted-foreground">Belum ada foto khusus untuk paket ini.</p> : <div className="mt-8 grid gap-4 sm:grid-cols-2">{images.map((image, index) => <figure key={image.id} className="overflow-hidden rounded-xl border border-border"><StorageImage src={image.image_url} alt={image.caption ?? `Foto ${paket.name} ${index + 1}`} className="aspect-4/3 w-full object-cover" /><figcaption className="flex items-center justify-between gap-2 p-2"><span className="truncate text-xs text-muted-foreground">Foto {index + 1}</span><Button type="button" size="icon" variant="ghost" aria-label={`Hapus foto ${index + 1}`} onClick={() => { if (window.confirm("Hapus foto ini dari paket?")) removeImage.mutate(image); }}><Trash2 className="size-4 text-destructive" /></Button></figcaption></figure>)}</div>}
        </section>
      </div>
    </main>
  );
}
