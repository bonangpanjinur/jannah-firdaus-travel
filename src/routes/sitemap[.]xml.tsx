import { createFileRoute } from "@tanstack/react-router";
import { packageSitemapPaths, publishedPackageRows, sitemapIndex, xmlResponse } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const packages = await publishedPackageRows();
        return xmlResponse(
          sitemapIndex([
            "/sitemap-static.xml",
            ...packageSitemapPaths(packages.length),
            "/sitemap-cities-priority.xml",
          ]),
        );
      },
    },
  },
});
