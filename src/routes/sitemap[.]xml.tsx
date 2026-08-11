import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const STATIC_PATHS = ["/", "/paket", "/galeri", "/tentang", "/kontak"];

function urlEntry(origin: string, path: string, lastmod?: string | null) {
  return [
    "  <url>",
    `    <loc>${origin}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>weekly</changefreq>`,
    `    <priority>${path === "/" ? "1.0" : "0.8"}</priority>`,
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

        let paketPaths: string[] = [];
        try {
          const { data } = await supabase
            .from("packages" as never)
            .select("slug")
            .eq("is_published" as never, true as never);
          paketPaths = ((data ?? []) as { slug: string }[]).map((row) => `/paket/${row.slug}`);
        } catch {
          paketPaths = [];
        }

        const body = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...[...STATIC_PATHS, ...paketPaths].map((path) => urlEntry(origin, path)),
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
