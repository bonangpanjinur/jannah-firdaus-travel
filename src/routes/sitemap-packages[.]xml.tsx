import { createFileRoute } from "@tanstack/react-router";
import { packageEntry, publishedPackageRows, urlset, xmlResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-packages.xml")({
  server: {
    handlers: {
      GET: async () => {
        const rows = await publishedPackageRows();
        return xmlResponse(urlset(rows.map(packageEntry), true));
      },
    },
  },
});
