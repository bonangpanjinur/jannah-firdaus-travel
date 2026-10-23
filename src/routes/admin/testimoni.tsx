import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { adminTestimonialsQuery, db, type Testimonial } from "@/lib/site-data";

export const Route = createFileRoute("/admin/testimoni")({
  component: AdminTestimoni,
});

type Draft = Partial<Testimonial>;

const emptyDraft: Draft = {
  customer_name: "",
  city: "",
  quote: "",
  rating: 5,
  consent_to_publish: false,
  is_published: false,
  sort_order: 0,
};

function AdminTestimoni() {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<Draft | null>(null);
  const { data: testimonials = [], isLoading, error } = useQuery(adminTestimonialsQuery);

  const save = useMutation({
    mutationFn: async (value: Draft) => {
      const customerName = value.customer_name?.trim();
      const quote = value.quote?.trim();
      if (!customerName || !quote) throw new Error("Nama jamaah dan isi testimoni wajib diisi.");
      if (value.is_published && !value.consent_to_publish) {
        throw new Error("Konfirmasi izin publikasi sebelum menayangkan testimoni.");
      }
      if (!Number.isInteger(value.rating) || (value.rating ?? 0) < 1 || (value.rating ?? 0) > 5) {
        throw new Error("Rating harus antara 1 sampai 5.");
      }

      const payload = {
        customer_name: customerName,
        city: value.city?.trim() || null,
        quote,
        rating: value.rating ?? 5,
        consent_to_publish: value.consent_to_publish ?? false,
        is_published: value.is_published ?? false,
        sort_order: value.sort_order ?? 0,
      };
      const response = value.id
        ? await db().from("testimonials").update(payload).eq("id", value.id)
        : await db().from("testimonials").insert(payload);
      if (response.error) throw response.error;
    },
    onSuccess: () => {
      toast.success("Testimoni tersimpan");
      setDraft(null);
      queryClient.invalidateQueries({ queryKey: adminTestimonialsQuery.queryKey });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (saveError: Error) => toast.error(saveError.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error: deleteError } = await db().from("testimonials").delete().eq("id", id);
      if (deleteError) throw deleteError;
    },
    onSuccess: () => {
      toast.success("Testimoni dihapus");
      queryClient.invalidateQueries({ queryKey: adminTestimonialsQuery.queryKey });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
    onError: (deleteError: Error) => toast.error(deleteError.message),
  });

  return (
    <main className="p-6 md:p-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Bukti sosial</p>
          <h1 className="mt-1 font-display text-3xl">Testimoni Jamaah</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Testimoni hanya tampil di website jika izin publikasi sudah dikonfirmasi dan status
            tayang diaktifkan.
          </p>
        </div>
        {!draft ? (
          <Button onClick={() => setDraft({ ...emptyDraft })}>Tambah testimoni</Button>
        ) : null}
      </header>

      {draft ? (
        <form
          className="mt-6 grid max-w-4xl gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            save.mutate(draft);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="testimonial-name">Nama jamaah</Label>
            <Input
              id="testimonial-name"
              value={draft.customer_name ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, customer_name: event.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-city">Kota (opsional)</Label>
            <Input
              id="testimonial-city"
              value={draft.city ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, city: event.target.value }))
              }
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="testimonial-quote">Isi testimoni</Label>
            <Textarea
              id="testimonial-quote"
              rows={4}
              maxLength={1000}
              value={draft.quote ?? ""}
              onChange={(event) =>
                setDraft((current) => ({ ...current, quote: event.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-rating">Rating (1–5)</Label>
            <Input
              id="testimonial-rating"
              type="number"
              min="1"
              max="5"
              step="1"
              value={draft.rating ?? 5}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  rating: event.target.value ? Number(event.target.value) : 5,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-order">Urutan tampil</Label>
            <Input
              id="testimonial-order"
              type="number"
              step="1"
              value={draft.sort_order ?? 0}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  sort_order: event.target.value ? Number(event.target.value) : 0,
                }))
              }
            />
          </div>
          <div className="flex flex-wrap gap-6 md:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <Switch
                checked={draft.consent_to_publish ?? false}
                onCheckedChange={(value) =>
                  setDraft((current) => ({
                    ...current,
                    consent_to_publish: value,
                    is_published: value ? (current?.is_published ?? false) : false,
                  }))
                }
              />
              Izin publikasi sudah dikonfirmasi
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch
                checked={draft.is_published ?? false}
                disabled={!draft.consent_to_publish}
                onCheckedChange={(value) =>
                  setDraft((current) => ({ ...current, is_published: value }))
                }
              />
              Tampilkan di website
            </label>
          </div>
          <div className="flex gap-2 md:col-span-2">
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Menyimpan…" : "Simpan testimoni"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setDraft(null)}>
              Batal
            </Button>
          </div>
        </form>
      ) : null}

      {isLoading ? <p className="mt-8 text-sm text-muted-foreground">Memuat…</p> : null}
      {error ? <p className="mt-8 text-sm text-destructive">{error.message}</p> : null}
      {!isLoading && !error && !testimonials.length ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Belum ada testimoni. Tambahkan hanya testimoni nyata dengan izin publikasi yang telah
          dikonfirmasi.
        </p>
      ) : null}
      <ul className="mt-6 space-y-3">
        {testimonials.map((testimonial) => (
          <li key={testimonial.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {testimonial.customer_name}
                  {testimonial.city ? ` · ${testimonial.city}` : ""}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Rating {testimonial.rating}/5 ·{" "}
                  {testimonial.consent_to_publish ? "Izin dikonfirmasi" : "Belum ada izin"} ·{" "}
                  {testimonial.is_published ? "Tayang" : "Draf"}
                </p>
                <p className="mt-3 whitespace-pre-wrap text-sm/6 text-muted-foreground">
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setDraft(testimonial)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (window.confirm(`Hapus testimoni ${testimonial.customer_name}?`)) {
                      remove.mutate(testimonial.id);
                    }
                  }}
                >
                  Hapus
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
