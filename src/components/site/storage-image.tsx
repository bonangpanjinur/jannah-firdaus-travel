import { absoluteMediaUrl } from "@/lib/storage";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | null | undefined;
  alt: string;
  fallback?: React.ReactNode;
};

/**
 * Menampilkan gambar dari URL biasa maupun path Supabase Storage (bucket publik).
 * URL dihitung sinkron agar hasil render server dan browser identik (tanpa hydration mismatch).
 */
export function StorageImage({ src, alt, fallback = null, ...rest }: Props) {
  const url = absoluteMediaUrl(src);

  if (!url) return <>{fallback}</>;
  return <img src={url} alt={alt} {...rest} />;
}
