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
  const webpUrl =
    url.startsWith("/images/") && /\.jpe?g$/i.test(url) ? url.replace(/\.jpe?g$/i, ".webp") : null;
  return webpUrl ? (
    <picture className="block size-full">
      <source srcSet={webpUrl} type="image/webp" />
      <img src={url} alt={alt} {...rest} />
    </picture>
  ) : (
    <img src={url} alt={alt} {...rest} />
  );
}
