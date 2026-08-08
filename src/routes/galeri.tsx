import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { galleryQuery } from "@/lib/site-data";
import { StorageImage } from "@/components/site/storage-image";

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri Dokumentasi Jamaah — Barokah Umroh" },
      {
        name: "description",
        content: "Dokumentasi keberangkatan dan kegiatan ibadah jamaah umroh bersama Barokah Umroh.",
      },
      { property: "og:title", content: "Galeri Dokumentasi Jamaah — Barokah Umroh" },
      { property: "og:description", content: "Foto keberangkatan dan kegiatan ibadah jamaah kami." },
    ],
  }),
  component: Galeri,
});

function Galeri() {
  const { data: gallery = [], isLoading } = useQuery(galleryQuery);

  return (
    <main className="container-page py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Galeri</p>
        <h1 className="mt-2 font-display text-4xl">Dokumentasi Perjalanan Jamaah</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Momen kebersamaan jamaah kami selama beribadah di Makkah dan Madinah.
        </p>
      </header>

      {isLoading ? (
        <p className="mt-12 text-sm text-muted-foreground">Memuat galeri…</p>
      ) : gallery.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">Belum ada foto yang diunggah.</p>
      ) : (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((item) => (
            <figure key={item.id} className="bento-card mb-4 break-inside-avoid">
              <StorageImage
                src={item.image_url}
                alt={item.caption ?? "Dokumentasi jamaah umroh"}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {item.caption ? (
                <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      )}
    </main>
  );
}