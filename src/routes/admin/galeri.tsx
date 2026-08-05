import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, galleryQuery } from "@/lib/site-data";
import { ImageUpload } from "@/components/admin/image-upload";
import { StorageImage } from "@/components/site/storage-image";
import { deleteMedia } from "@/lib/storage";

export const Route = createFileRoute("/admin/galeri")({
  component: AdminGaleri,
});

function AdminGaleri() {
  const qc = useQueryClient();
  const { data: gallery = [] } = useQuery(galleryQuery);
  const [url, setUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  const add = useMutation({
    mutationFn: async () => {
      if (!url) throw new Error("Unggah foto terlebih dahulu.");
      const { error } = await db().from("gallery").insert({ image_url: url, caption: caption || null });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Foto ditambahkan");
      setUrl(null);
      setCaption("");
      qc.invalidateQueries({ queryKey: galleryQuery.queryKey });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async ({ id, path }: { id: string; path: string }) => {
      const { error } = await db().from("gallery").delete().eq("id", id);
      if (error) throw error;
      await deleteMedia(path).catch(() => undefined);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: galleryQuery.queryKey }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <main className="p-6 md:p-10">
      <h1 className="font-display text-3xl">Kelola Galeri</h1>

      <form
        onSubmit={(e) => { e.preventDefault(); add.mutate(); }}
        className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
      >
        <ImageUpload label="Foto galeri" folder="galeri" value={url} onChange={setUrl} aspect="aspect-4/3" />
        <div className="space-y-2">
          <Label>Keterangan</Label>
          <Input value={caption} onChange={(e) => setCaption(e.target.value)} />
        </div>
        <Button type="submit" className="justify-self-start" disabled={add.isPending || !url}>
          {add.isPending ? "Menyimpan…" : "Tambah ke galeri"}
        </Button>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {gallery.map((item) => (
          <figure key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <StorageImage
              src={item.image_url}
              alt={item.caption ?? "Foto galeri"}
              className="aspect-4/3 w-full object-cover"
            />
            <figcaption className="flex items-center justify-between gap-2 p-3 text-xs text-muted-foreground">
              <span className="truncate">{item.caption ?? "Tanpa keterangan"}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => remove.mutate({ id: item.id, path: item.image_url })}
              >
                Hapus
              </Button>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}