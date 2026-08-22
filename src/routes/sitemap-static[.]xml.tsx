import { createFileRoute } from "@tanstack/react-router";
import {
  STATIC_SITEMAP_PATHS,
  cityRows,
  provinceSlug,
  urlEntry,
  urlset,
  xmlResponse,
} from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-static.xml")({
  server: {
    handlers: {
      GET: async () => {
        const provincePaths = Array.from(
          new Set(cityRows().map((city) => provinceSlug(city.provinsi))),
        ).map((slug) => `/umroh/provinsi/${slug}`);
        const entries = [...STATIC_SITEMAP_PATHS, ...provincePaths].map((path) => urlEntry(path));
        return xmlResponse(urlset(entries));
      },
    },
  },
});
