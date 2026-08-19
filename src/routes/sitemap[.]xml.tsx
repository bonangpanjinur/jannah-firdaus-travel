import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { KOTA_LAYANAN } from "@/lib/kota";
import { SITE_DOMAIN } from "@/lib/seo";
import { absoluteMediaUrl } from "@/lib/storage";

const STATIC_PATHS = [
  "/",
  "/paket",
  "/umroh",
  "/umroh-jakarta-selatan",
  ...KOTA_LAYANAN.map((kota) => `/umroh/${kota.slug}`),
  "/biaya-umroh",
  "/syarat-umroh",
  "/umroh-plus",
  "/faq",
  "/galeri",
  "/tentang",
  "/kontak",
];

function escapeXml(value: string) {
  return value.replace(
    /[<>&'"]/g,
    (character) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] ??
      character,
  );
}

function urlEntry(origin: string, path: string, lastmod?: string | null, image?: string | null) {
  return [
    "  <url>",
    `    <loc>${escapeXml(`${origin}${path}`)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${path === "/" ? "daily" : "weekly"}</changefreq>`,
    `    <priority>${path === "/" ? "1.0" : path.startsWith("/paket/") ? "0.9" : "0.8"}</priority>`,
    image
      ? [
          "    <image:image>",
          `      <image:loc>${escapeXml(image)}</image:loc>`,
          "    </image:image>",
        ].join("\n")
      : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const origin = SITE_DOMAIN;

        let paketRows: { slug: string; updated_at: string | null; flyer_url: string | null }[] = [];
        try {
          const { data } = await supabase
            .from("packages" as never)
            .select("slug, updated_at, flyer_url" as never)
            .eq("is_published" as never, true as never);
          paketRows = (data ?? []) as {
            slug: string;
            updated_at: string | null;
            flyer_url: string | null;
          }[];
        } catch {
          paketRows = [];
        }

        const paketEntries = paketRows.map((row) => {
          const imgUrl = row.flyer_url ? absoluteMediaUrl(row.flyer_url) : null;
          return urlEntry(origin, `/paket/${row.slug}`, row.updated_at, imgUrl);
        });

        const body = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
          ...STATIC_PATHS.map((path) => urlEntry(origin, path)),
          ...paketEntries,
          "</urlset>",
        ].join("\n");

        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
