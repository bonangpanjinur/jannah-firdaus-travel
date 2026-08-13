import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { KOTA_LAYANAN } from "@/lib/kota";

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

function urlEntry(origin: string, path: string, lastmod?: string | null, image?: string | null) {
  return [
    "  <url>",
    `    <loc>${origin}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${path === "/" ? "daily" : "weekly"}</changefreq>`,
    `    <priority>${path === "/" ? "1.0" : path.startsWith("/paket/") ? "0.9" : "0.8"}</priority>`,
    image
      ? [
          "    <image:image>",
          `      <image:loc>${image}</image:loc>`,
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
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const origin = `${request.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "")}://${request.headers.get("host") ?? url.host}`;

        let paketRows: { slug: string; updated_at: string | null; flyer_url: string | null }[] = [];
        try {
          const { data } = await supabase
            .from("packages" as never)
            .select("slug, updated_at, flyer_url" as never)
            .eq("is_published" as never, true as never);
          paketRows = (data ?? []) as { slug: string; updated_at: string | null; flyer_url: string | null }[];
        } catch {
          paketRows = [];
        }

        const paketEntries = paketRows.map((row) => {
          const imgUrl = row.flyer_url && /^https?:\/\//i.test(row.flyer_url) ? row.flyer_url : null;
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
