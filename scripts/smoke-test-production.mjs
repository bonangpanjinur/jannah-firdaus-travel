const baseUrl = (process.env.SITE_URL ?? "https://www.jannahfirdaustravel.co.id").replace(
  /\/$/,
  "",
);
const concurrency = Number(process.env.SMOKE_CONCURRENCY ?? 12);
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS ?? 15000);

function absoluteUrl(value) {
  return new URL(value, baseUrl).href;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: { "user-agent": "jannah-firdaus-ci-smoke-test/1.0" },
    });
  } finally {
    clearTimeout(timeout);
  }
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function extractCanonical(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? null;
}

function hasJsonLdType(html, type) {
  return new RegExp(`"@type"\\s*:\\s*(?:"${type}"|\\[[^\\]]*"${type}"[^\\]]*\\])`, "i").test(html);
}

const sitemapUrl = `${baseUrl}/sitemap.xml`;
const sitemapResponse = await fetchWithTimeout(sitemapUrl);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned HTTP ${sitemapResponse.status}`);
const sitemapXml = await sitemapResponse.text();
const urls = extractSitemapUrls(sitemapXml);
if (!urls.length) throw new Error("Sitemap contains no URLs");

const cityUrls = urls.filter(
  (url) => new URL(url).pathname.startsWith("/umroh/") && new URL(url).pathname !== "/umroh/",
);
console.log(`Auditing ${cityUrls.length} city URLs from ${sitemapUrl}`);

const failures = [];
let cursor = 0;
async function worker() {
  while (cursor < cityUrls.length) {
    const index = cursor++;
    const url = cityUrls[index];
    try {
      const response = await fetchWithTimeout(url);
      const html = await response.text();
      const canonical = extractCanonical(html);
      const expected = absoluteUrl(new URL(url).pathname);
      const checks = [
        [response.status === 200, `HTTP ${response.status}`],
        [
          !canonical || canonical === url || canonical === expected,
          `canonical=${canonical ?? "missing"}`,
        ],
        [hasJsonLdType(html, "TravelAgency"), "TravelAgency missing"],
        [hasJsonLdType(html, "FAQPage"), "FAQPage missing"],
      ];
      for (const [passed, reason] of checks) if (!passed) failures.push(`${url}: ${reason}`);
    } catch (error) {
      failures.push(`${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
    if ((index + 1) % 50 === 0 || index + 1 === cityUrls.length)
      console.log(`Checked ${index + 1}/${cityUrls.length}`);
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, cityUrls.length) }, worker));
if (failures.length) {
  console.error(`Smoke test failed with ${failures.length} issue(s):`);
  console.error(failures.slice(0, 50).join("\n"));
  process.exit(1);
}
console.log("Production city URL smoke test passed.");
