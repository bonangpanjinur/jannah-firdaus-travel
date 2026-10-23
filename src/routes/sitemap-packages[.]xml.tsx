import { createFileRoute } from "@tanstack/react-router";
import {
  packageEntry,
  packageSitemapPage,
  publishedPackageRows,
  urlset,
  xmlResponse,
} from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap-packages.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const rows = await publishedPackageRows();
        const rawPage = new URL(request.url).searchParams.get("page");
        const page = rawPage ? Number.parseInt(rawPage, 10) : 1;
        const pageRows = packageSitemapPage(rows, Number.isNaN(page) ? 1 : page);
        return xmlResponse(urlset(pageRows.map(packageEntry), true));
      },
    },
  },
});
