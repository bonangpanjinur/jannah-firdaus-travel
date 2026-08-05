import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StorageImage } from "@/components/site/storage-image";
import { deleteMedia, isStoragePath, uploadMedia } from "@/lib/storage";

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
      <div className="flex items-start gap-4">
        <div className={`${aspect} w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-muted`}>
          <StorageImage
            src={value}
            alt={label}
            className="size-full object-cover"
            fallback={
              <div className="flex size-full items-center justify-center text-center text-[11px] text-muted-foreground">
                Belum ada foto
              </div>
            }
          />
        </div>
        <div className="flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="secondary" disabled={busy} onClick={() => inputRef.current?.click()}>
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
    </div>
  );
}