import { supabase } from "@/integrations/supabase/client";
import { KOTA_LAYANAN } from "@/lib/kota";
import { SITE_DOMAIN } from "@/lib/seo";
import { absoluteMediaUrl } from "@/lib/storage";

export const STATIC_SITEMAP_PATHS = [
  "/",
  "/paket",
  "/umroh",
  "/umroh-jakarta-selatan",
  "/biaya-umroh",
  "/syarat-umroh",
  "/umroh-plus",
  "/faq",
  "/galeri",
  "/tentang",
  "/kontak",
] as const;

export const PRIORITY_CITY_SLUGS = [
  "jakarta-selatan",
  "jakarta-pusat",
  "jakarta-timur",
  "jakarta-barat",
  "jakarta-utara",
  "depok",
  "bekasi",
  "tangerang-selatan",
  "bogor",
  "tangerang",
  "bandung",
  "cimahi",
  "karawang",
  "purwakarta",
  "cirebon",
  "semarang",
  "yogyakarta",
  "surabaya",
  "malang",
  "sidoarjo",
  "denpasar",
  "medan",
  "palembang",
  "pekanbaru",
  "padang",
  "bandar-lampung",
  "batam",
  "pontianak",
  "banjarmasin",
  "samarinda",
  "balikpapan",
  "makassar",
  "manado",
  "kendari",
  "palopo",
  "parepare",
  "ambon",
  "jayapura",
  "mataram",
  "solo",
  "sukabumi",
  "tasikmalaya",
  "garut",
  "subang",
  "serang",
  "tiga-raksa",
  "tuban",
  "jember",
  "kediri",
] as const;

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
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export function cityRows() {
  return Array.isArray(KOTA_LAYANAN) ? KOTA_LAYANAN : [];
}

export function priorityCityRows() {
  const priority = new Set<string>(PRIORITY_CITY_SLUGS);
  return cityRows().filter((city) => priority.has(city.slug));
}

export async function publishedPackageRows() {
  try {
    const { data } = await supabase
      .from("packages" as never)
      .select("slug, updated_at, flyer_url" as never)
      .eq("is_published" as never, true as never);
    return (data ?? []) as {
      slug: string;
      updated_at: string | null;
      flyer_url: string | null;
    }[];
  } catch {
    return [];
  }
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
