const base = (process.env.SITE_URL ?? "https://www.jannahfirdaustravel.co.id").replace(/\/$/, "");
const paths = [
  "/",
  "/umroh",
  "/paket",
  "/paket/umroh-reguler-9-hari",
  "/umroh/provinsi/jawa-barat",
];
const timeoutMs = Number(process.env.AUDIT_TIMEOUT_MS ?? 20000);
const requiredHeaders = [
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "permissions-policy",
];

async function fetchTimed(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = performance.now();
  try {
    const response = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: { "user-agent": "jannah-firdaus-production-audit/1.0" },
    });
    const body = await response.text();
    return { response, body, elapsedMs: Math.round(performance.now() - start) };
  } finally {
    clearTimeout(timer);
  }
}
function canonical(html) {
  const link = html.match(/<link\b[^>]*\brel=["'][^"']*\bcanonical\b[^"']*["'][^>]*>/i)?.[0] ?? "";
  return link.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? null;
}
function hasType(html, type) {
  return new RegExp(`"@type"\\s*:\\s*(?:"${type}"|\\[[^\\]]*"${type}"[^\\]]*\\])`, "i").test(html);
}
function hasEarlyThemeGuard(html) {
  return /data-theme|color-scheme|theme/i.test(html.slice(0, 12000));
}
function hasHomepageBrandSignals(html, path) {
  if (path !== "/") return true;
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? "";
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, " ") ?? "";
  return /Jannah Firdaus/i.test(title) && /Jannah Firdaus/i.test(h1);
}
function hasWebsiteSchema(html, path) {
  return path !== "/" || hasType(html, "WebSite");
}

let failures = 0;
for (const path of paths) {
  const url = `${base}${path}`;
  try {
    const { response, body, elapsedMs } = await fetchTimed(url);
    const checks = {
      http: response.status === 200,
      ttfb_proxy_ms: elapsedMs,
      canonical: canonical(body),
      homepageBrand: hasHomepageBrandSignals(body, path),
      websiteSchema: hasWebsiteSchema(body, path),
      travelAgency: hasType(body, "TravelAgency"),
      faqPage: hasType(body, "FAQPage"),
      breadcrumb: hasType(body, "BreadcrumbList"),
      themeGuard: hasEarlyThemeGuard(body),
      securityHeaders: Object.fromEntries(
        requiredHeaders.map((key) => [key, response.headers.get(key)]),
      ),
    };
    const missingHeaders = requiredHeaders.filter((key) => !response.headers.get(key));
    const expectedCanonical = new URL(path || "/", base).href;
    const canonicalFailure = checks.canonical !== expectedCanonical;
    const isCityPage = path.startsWith("/umroh/") && !path.startsWith("/umroh/provinsi/");
    const requiredSchemaFailure = isCityPage
      ? !checks.travelAgency || !checks.faqPage || !checks.breadcrumb
      : !checks.travelAgency;
    if (
      !checks.http ||
      missingHeaders.length ||
      canonicalFailure ||
      requiredSchemaFailure ||
      !checks.homepageBrand ||
      !checks.websiteSchema
    )
      failures++;
    console.log(
      JSON.stringify(
        {
          path,
          status: response.status,
          expectedCanonical,
          ...checks,
          canonicalFailure,
          missingHeaders,
        },
        null,
        2,
      ),
    );
  } catch (error) {
    failures++;
    console.error(
      JSON.stringify(
        { path, error: error instanceof Error ? error.message : String(error) },
        null,
        2,
      ),
    );
  }
}
if (failures) process.exit(1);
console.log("Production audit passed for all priority routes.");
