import { supabase } from "@/integrations/supabase/client";
import { INDEXABLE_KOTA, KOTA_LAYANAN } from "@/lib/kota";
import { SITE_DOMAIN } from "@/lib/seo";
import { absoluteMediaUrl } from "@/lib/storage";

export const STATIC_SITEMAP_PATHS = [
  "/",
  "/paket",
  "/umroh",
  "/biaya-umroh",
  "/syarat-umroh",
  "/umroh-plus",
  "/faq",
  "/galeri",
  "/tentang",
  "/kontak",
] as const;

const SITEMAP_PACKAGE_LOG_INTERVAL_MS = 15 * 60 * 1000;
const SITEMAP_PACKAGE_CACHE_TTL_MS = 5 * 60 * 1000;
let lastSitemapPackageLogAt = 0;
let cachedPackageRows: PackageSitemapRow[] | null = null;
let cachedPackageRowsAt = 0;

type PackageSitemapRow = {
  slug: string;
  updated_at: string | null;
  flyer_url: string | null;
  departure_date: string | null;
};

export function escapeXml(value: string) {
  return value.replace(
    /[<>&'"]/g,
    (character) =>
      ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] ??
      character,
  );
}

export function provinceSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function urlEntry(
  path: string,
  options: { lastmod?: string | null; image?: string | null } = {},
) {
  const { lastmod, image } = options;
  return [
    "  <url>",
    `    <loc>${escapeXml(`${SITE_DOMAIN}${path}`)}</loc>`,
    lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : null,
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

export function urlset(entries: string[], includeImages = false) {
  const imageNamespace = includeImages
    ? ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
    : "";
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${imageNamespace}>`,
    ...entries,
    "</urlset>",
  ].join("\n");
}

export function sitemapIndex(paths: string[]) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((path) =>
      ["  <sitemap>", `    <loc>${escapeXml(`${SITE_DOMAIN}${path}`)}</loc>`, "  </sitemap>"].join(
        "\n",
      ),
    ),
    "</sitemapindex>",
  ].join("\n");
}

export function xmlResponse(body: string) {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

export function cityRows() {
  return Array.isArray(KOTA_LAYANAN) ? KOTA_LAYANAN : [];
}

export function priorityCityRows() {
  return cityRows().filter((city) => INDEXABLE_KOTA.has(city.slug));
}

export async function publishedPackageRows() {
  const now = Date.now();
  if (cachedPackageRows && now - cachedPackageRowsAt < SITEMAP_PACKAGE_CACHE_TTL_MS) {
    return cachedPackageRows;
  }

  try {
    const { data, error } = await supabase
      .from("packages" as never)
      .select("slug, updated_at, flyer_url, departure_date" as never)
      .eq("is_published" as never, true as never);
    if (error) {
      console.error("[sitemap] failed to load published packages", {
        code: error.code,
        message: error.message,
      });
      return cachedPackageRows ?? [];
    }

    const published = (data ?? []) as PackageSitemapRow[];
    const expired = published.filter((row) => isPackageExpired(row.departure_date));
    const active = published.filter((row) => !isPackageExpired(row.departure_date));
    cachedPackageRows = active;
    cachedPackageRowsAt = now;
    logSitemapPackageSummary(published.length, active.length, expired);
    return active;
  } catch (error) {
    console.error("[sitemap] unexpected published package query failure", {
      message: error instanceof Error ? error.message : String(error),
    });
    return cachedPackageRows ?? [];
  }
}

function logSitemapPackageSummary(
  publishedCount: number,
  includedCount: number,
  expired: { slug: string; departure_date: string | null }[],
) {
  const now = Date.now();
  if (now - lastSitemapPackageLogAt < SITEMAP_PACKAGE_LOG_INTERVAL_MS) return;
  lastSitemapPackageLogAt = now;
  console.info("[sitemap] package URL summary", {
    publishedCount,
    includedCount,
    expiredExcludedCount: expired.length,
    expiredExcludedSlugs: expired.slice(0, 20).map((row) => row.slug),
  });
}

/** Paket tanpa tanggal tetap dianggap aktif; tanggal lampau dikeluarkan dari sitemap. */
export function isPackageExpired(departureDate: string | null | undefined, today = todayJakarta()) {
  return Boolean(departureDate && departureDate < today);
}

function todayJakarta() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/\//g, "-");
}

export function packageEntry(row: {
  slug: string;
  updated_at: string | null;
  flyer_url: string | null;
}) {
  return urlEntry(`/paket/${row.slug}`, {
    lastmod: row.updated_at,
    image: row.flyer_url ? absoluteMediaUrl(row.flyer_url) : null,
  });
}
