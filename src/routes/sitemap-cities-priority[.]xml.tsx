import { createFileRoute } from "@tanstack/react-router";
import { priorityCityRows, urlEntry, urlset, xmlResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-cities-priority.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = priorityCityRows().map((city) => urlEntry(`/umroh/${city.slug}`));
        return xmlResponse(urlset(entries));
      },
    },
  },
});
