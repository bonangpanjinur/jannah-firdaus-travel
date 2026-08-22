import { createFileRoute } from "@tanstack/react-router";
import { cityRows, urlEntry, urlset, xmlResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-cities-national.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = cityRows().map((city) => urlEntry(`/umroh/${city.slug}`));
        return xmlResponse(urlset(entries));
      },
    },
  },
});
