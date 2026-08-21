const base = (process.env.SITE_URL ?? "https://www.jannahfirdaustravel.co.id").replace(/\/$/, "");
const paths = [
  "/umroh-jakarta-selatan",
  "/umroh/bekasi",
  "/umroh/depok",
  "/umroh/bogor",
  "/umroh/tangerang",
  "/umroh/tangerang-selatan",
  "/umroh/bandung",
  "/umroh/kota-surabaya",
  "/umroh/kota-medan",
  "/umroh/kota-makassar",
];
const timeoutMs = Number(process.env.AUDIT_TIMEOUT_MS ?? 20000);

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = performance.now();
  try {
    const response = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: { "user-agent": "jannah-firdaus-batch1-seo-audit/1.0" },
    });
    return {
      response,
      body: await response.text(),
      elapsedMs: Math.round(performance.now() - start),
    };
  } finally {
    clearTimeout(timer);
  }
}

function canonical(html) {
  const tag = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]).find((candidate) => /\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(candidate)) ?? "";
  return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] ?? null;
}

function title(html) {
  return html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? null;
}

function h1(html) {
  return html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? null;
}

function hasType(html, type) {
  return new RegExp(`"@type"\\s*:\\s*(?:"${type}"|\\[[^\\]]*"${type}"[^\\]]*\\])`, "i").test(html);
}

function noindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html) || /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(html);
}

function hasCityEvidence(html, path) {
  const city = path.includes("jakarta-selatan") ? "Jakarta Selatan" : path.split("/").pop().replaceAll("-", " ");
  return new RegExp(city.split(" ")[0], "i").test(html) && /konsultasi|jamaah|umroh/i.test(html);
}

const sitemapResponse = await fetch(`${base}/sitemap.xml`, { headers: { "user-agent": "jannah-firdaus-batch1-seo-audit/1.0" } });
const sitemap = await sitemapResponse.text();
const results = [];
for (const path of paths) {
  const url = `${base}${path}`;
  try {
    const { response, body, elapsedMs } = await fetchText(url);
    const expectedCanonical = new URL(path, base).href;
    const result = {
      path,
      status: response.status,
      ttfbProxyMs: elapsedMs,
      canonical: canonical(body),
      canonicalOk: canonical(body) === expectedCanonical,
      inSitemap: sitemap.includes(expectedCanonical),
      noindex: noindex(body),
      title: title(body),
      h1: h1(body),
      titleHasBrand: /Jannah Firdaus/i.test(title(body) ?? ""),
      h1HasBrand: /Jannah Firdaus/i.test(h1(body) ?? ""),
      hasTravelAgency: hasType(body, "TravelAgency"),
      hasBreadcrumb: hasType(body, "BreadcrumbList"),
      hasFaq: hasType(body, "FAQPage"),
      hasCityEvidence: hasCityEvidence(body, path),
      securityHeaders: {
        xContentTypeOptions: response.headers.get("x-content-type-options"),
        xFrameOptions: response.headers.get("x-frame-options"),
        referrerPolicy: response.headers.get("referrer-policy"),
      },
    };
    result.pass = response.status === 200 && result.canonicalOk && result.inSitemap && !result.noindex && result.titleHasBrand && result.h1HasBrand && result.hasTravelAgency && result.hasBreadcrumb && result.hasFaq && result.hasCityEvidence;
    results.push(result);
  } catch (error) {
    results.push({ path, error: error instanceof Error ? error.message : String(error), pass: false });
  }
}

console.log(JSON.stringify({ base, sitemapStatus: sitemapResponse.status, total: results.length, passed: results.filter((result) => result.pass).length, results }, null, 2));
if (results.some((result) => !result.pass)) process.exitCode = 1;
