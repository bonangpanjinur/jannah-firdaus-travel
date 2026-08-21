import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StorageImage } from "@/components/site/storage-image";
import { absoluteMediaUrl, deleteMedia, isStoragePath, uploadMedia } from "@/lib/storage";

export function ImageUpload({
  label,
  value,
  folder,
  onChange,
  aspect = "aspect-3/4",
}: {
  label: string;
  value: string | null | undefined;
  folder: string;
  onChange: (value: string | null) => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const previous = value;
      const path = await uploadMedia(file, folder);
      onChange(path);
      if (isStoragePath(previous)) await deleteMedia(previous).catch(() => undefined);
      toast.success("Foto berhasil diunggah");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid items-start gap-5 sm:grid-cols-[220px_minmax(0,1fr)]">
        <div>
          <div
            className={`${aspect} w-full max-w-[220px] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm`}
          >
            {value ? (
              <button
                type="button"
                className="group relative block size-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                onClick={() => setPreviewOpen(true)}
                aria-label={`Preview ${label}`}
              >
                <StorageImage
                  src={value}
                  alt={label}
                  className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <span className="absolute inset-x-2 bottom-2 rounded-lg bg-black/65 px-2 py-1.5 text-center text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  Klik untuk preview besar
                </span>
              </button>
            ) : (
              <div className="flex size-full items-center justify-center px-3 text-center text-xs text-muted-foreground">
                Belum ada foto
              </div>
            )}
          </div>
          {value ? (
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Klik gambar untuk memperbesar
            </p>
          ) : null}
        </div>
        <div className="min-w-0 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              {busy ? "Mengunggah…" : "Unggah foto"}
            </Button>
            {value ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={busy}
                onClick={async () => {
                  if (isStoragePath(value)) await deleteMedia(value).catch(() => undefined);
                  onChange(null);
                }}
              >
                <X className="size-4" /> Hapus
              </Button>
            ) : null}
          </div>
          <Input
            value={value ?? ""}
            placeholder="atau tempel URL / path gambar"
            onChange={(e) => onChange(e.target.value || null)}
          />
          <p className="text-[11px] text-muted-foreground">Format gambar, maksimal 5 MB.</p>
        </div>
      </div>
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl overflow-hidden p-2 sm:p-3">
          {value ? (
            <img
              src={absoluteMediaUrl(value) ?? value}
              alt={`Preview besar ${label}`}
              className="max-h-[82vh] w-full rounded-xl object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
