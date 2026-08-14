import { supabase } from "@/integrations/supabase/client";

export const MEDIA_BUCKET = "media";

/** Nilai yang bukan URL absolut/relatif dianggap path di Supabase Storage. */
export function isStoragePath(value: string | null | undefined): value is string {
  if (!value) return false;
  return !/^(https?:|data:|blob:|\/)/i.test(value);
}

/** URL publik untuk path di Supabase Storage (bucket sekarang publik). */
export function publicMediaUrl(path: string): string {
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function signedMediaUrl(path: string, expiresIn = 60 * 60 * 24) {
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

/**
 * Mengembalikan URL publik untuk path storage, atau URL asli jika sudah absolut.
 * Dipakai untuk og:image dan data terstruktur yang butuh URL stabil tanpa query.
 */
export function absoluteMediaUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (!isStoragePath(value)) return value;
  return publicMediaUrl(value);
}

export const mediaUrlQuery = (value: string | null | undefined) => ({
  queryKey: ["media-url", value] as const,
  enabled: isStoragePath(value),
  staleTime: 1000 * 60 * 60,
  queryFn: async (): Promise<string> => {
    if (!isStoragePath(value)) return value;
    return publicMediaUrl(value);
  },
});

function safeName(name: string) {
  const dot = name.lastIndexOf(".");
  const ext = dot > -1 ? name.slice(dot + 1).toLowerCase() : "jpg";
  const base =
    (dot > -1 ? name.slice(0, dot) : name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "file";
  return `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
}

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export async function uploadMedia(file: File, folder = "uploads") {
  if (!file.type.startsWith("image/")) throw new Error("File harus berupa gambar.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Ukuran gambar maksimal 5 MB.");
  const path = `${folder}/${safeName(file.name)}`;
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (error) throw error;
  return path;
}

export async function deleteMedia(path: string) {
  if (!isStoragePath(path)) return;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) throw error;
}

export interface MediaFile {
  path: string;
  name: string;
  size: number | null;
  created_at: string | null;
}

const MEDIA_FOLDERS = ["flyers", "galeri", "uploads"] as const;

export const mediaListQuery = {
  queryKey: ["media-files"] as const,
  queryFn: async (): Promise<MediaFile[]> => {
    const results = await Promise.all(
      MEDIA_FOLDERS.map(async (folder) => {
        const { data, error } = await supabase.storage
          .from(MEDIA_BUCKET)
          .list(folder, { limit: 200, sortBy: { column: "created_at", order: "desc" } });
        if (error) throw error;
        return (data ?? [])
          .filter((item) => item.id)
          .map((item) => ({
            path: `${folder}/${item.name}`,
            name: item.name,
            size: (item.metadata?.["size"] as number | undefined) ?? null,
            created_at: item.created_at ?? null,
          }));
      }),
    );
    return results.flat();
  },
};
