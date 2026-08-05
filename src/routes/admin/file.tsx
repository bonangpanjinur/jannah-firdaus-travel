import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StorageImage } from "@/components/site/storage-image";
import { deleteMedia, mediaListQuery, uploadMedia } from "@/lib/storage";

export const Route = createFileRoute("/admin/file")({
  component: AdminFile,
});

function formatSize(bytes: number | null) {
  if (!bytes) return "-";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function AdminFile() {
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const { data: files = [], isLoading } = useQuery(mediaListQuery);

  const remove = useMutation({
    mutationFn: (path: string) => deleteMedia(path),
    onSuccess: () => {
      toast.success("File dihapus");
      qc.invalidateQueries({ queryKey: mediaListQuery.queryKey });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function handleFiles(list: FileList | null) {
    if (!list?.length) return;
    setBusy(true);
    try {
      for (const file of Array.from(list)) await uploadMedia(file, "uploads");
      toast.success("Unggahan selesai");
      qc.invalidateQueries({ queryKey: mediaListQuery.queryKey });
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Manajemen File</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Semua foto flyer dan galeri tersimpan di penyimpanan aman website Anda.
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Button disabled={busy} onClick={() => inputRef.current?.click()}>
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          {busy ? "Mengunggah…" : "Unggah file"}
        </Button>
      </div>

      {isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Memuat file…</p>
      ) : files.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Belum ada file.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {files.map((file) => (
            <figure key={file.path} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <StorageImage src={file.path} alt={file.name} className="aspect-4/3 w-full object-cover" />
              <figcaption className="space-y-2 p-3">
                <p className="truncate text-xs font-medium" title={file.path}>{file.path}</p>
                <p className="text-[11px] text-muted-foreground">{formatSize(file.size)}</p>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      await navigator.clipboard.writeText(file.path);
                      toast.success("Path disalin");
                    }}
                  >
                    <Copy className="size-3.5" /> Salin
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => remove.mutate(file.path)}>
                    <Trash2 className="size-3.5" /> Hapus
                  </Button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </main>
  );
}