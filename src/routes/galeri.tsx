import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { galleryQuery } from "@/lib/site-data";
import { StorageImage } from "@/components/site/storage-image";
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd } from "@/lib/seo";
import { PageBreadcrumb } from "@/components/site/page-breadcrumb";

export const Route = createFileRoute("/galeri")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `Galeri Dokumentasi Jamaah — ${info.siteName}`,
      description: `Dokumentasi keberangkatan, manasik, dan kegiatan ibadah jamaah umroh bersama ${info.siteName}.`,
      path: "/galeri",
      siteName: info.siteName,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Beranda", path: "/" },
              { name: "Galeri", path: "/galeri" },
            ]),
          ),
        },
      ],
    };
  },

  component: Galeri,
});

function Galeri() {
  const { data: gallery = [], isLoading } = useQuery(galleryQuery);

  return (
    <main className="container-page py-10 sm:py-14">
      <PageBreadcrumb items={[{ label: "Beranda", to: "/" }, { label: "Galeri" }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">Galeri</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Dokumentasi Perjalanan Jamaah</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Momen kebersamaan jamaah kami selama beribadah di Makkah dan Madinah.
        </p>
      </header>

      {isLoading ? (
        <p className="mt-12 text-sm text-muted-foreground">Memuat galeri…</p>
      ) : gallery.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">Belum ada foto yang diunggah.</p>
      ) : (
        <div className="mt-8 columns-1 gap-3 sm:mt-10 sm:columns-2 sm:gap-4 lg:columns-3">
          {gallery.map((item) => (
            <figure key={item.id} className="bento-card mb-3 break-inside-avoid sm:mb-4">
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