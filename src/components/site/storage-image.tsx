import { useQuery } from "@tanstack/react-query";
import { isStoragePath, mediaUrlQuery } from "@/lib/storage";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | null | undefined;
  alt: string;
  fallback?: React.ReactNode;
};

/** Menampilkan gambar dari URL biasa maupun path Supabase Storage (bucket privat). */
export function StorageImage({ src, alt, fallback = null, ...rest }: Props) {
  const { data: signed } = useQuery(mediaUrlQuery(src));
  const url = isStoragePath(src) ? signed : (src ?? undefined);

  if (!url) return <>{fallback}</>;
  return <img src={url} alt={alt} {...rest} />;
}