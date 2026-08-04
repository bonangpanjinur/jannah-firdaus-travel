import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, galleryQuery } from "@/lib/site-data";

export const Route = createFileRoute("/admin/galeri")({
  component: AdminGaleri,
});

function AdminGaleri() {
  const qc = useQueryClient();
  const { data: gallery = [] } = useQuery(galleryQuery);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const add = useMutation({
    mutationFn: async () => {
      const { error } = await db().from("gallery").insert({ image_url: url, caption: caption || null });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Foto ditambahkan");
      setUrl("");
      setCaption("");
      qc.invalidateQueries({ queryKey: galleryQuery.queryKey });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db().from("gallery").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: galleryQuery.queryKey }),
  });

  return (
    <main className="p-6 md:p-10">
      <h1 className="font-display text-3xl">Kelola Galeri</h1>

      <form
        onSubmit={(e) => { e.preventDefault(); add.mutate(); }}
        className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-[1fr_1fr_auto]"
      >
        <div className="space-y-2">
          <Label>URL foto</Label>
          <Input required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" />
        </div>
        <div className="space-y-2">
          <Label>Keterangan</Label>
          <Input value={caption} onChange={(e) => setCaption(e.target.value)} />
        </div>
        <Button type="submit" className="self-end">Tambah</Button>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {gallery.map((item) => (
          <figure key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <img src={item.image_url} alt={item.caption ?? "Foto galeri"} className="aspect-4/3 w-full object-cover" />
            <figcaption className="flex items-center justify-between gap-2 p-3 text-xs text-muted-foreground">
              <span className="truncate">{item.caption ?? "Tanpa keterangan"}</span>
              <Button size="sm" variant="ghost" onClick={() => remove.mutate(item.id)}>Hapus</Button>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}