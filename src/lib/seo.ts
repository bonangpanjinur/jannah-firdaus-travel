import type { QueryClient } from "@tanstack/react-query";
import { settingsQuery, type SiteSettings } from "@/lib/site-data";

export const SITE_NAME_FALLBACK = "Jannah Firdaus Tour Travel";
export const SITE_TAGLINE_FALLBACK = "Travel Umroh Jakarta Selatan";
export const SITE_CITY = "Jakarta Selatan";
export const SITE_REGION = "DKI Jakarta";
export const SITE_DESCRIPTION_FALLBACK =
  "Travel umroh Jakarta Selatan dengan paket terjadwal, hotel dekat Masjidil Haram, maskapai resmi, dan bimbingan ibadah hingga kepulangan.";

export interface SiteInfo {
  siteName: string;
  tagline: string;
  about: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  license: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
}

const FALLBACK: SiteInfo = {
  siteName: SITE_NAME_FALLBACK,
  tagline: SITE_TAGLINE_FALLBACK,
  about: SITE_DESCRIPTION_FALLBACK,
  address: `${SITE_CITY}, ${SITE_REGION}`,
  phone: null,
  email: null,
  license: null,
  instagram: null,
  facebook: null,
  youtube: null,
};

function fromSettings(settings: SiteSettings | null): SiteInfo {
  if (!settings) return FALLBACK;
  return {
    siteName: settings.agency_name?.trim() || FALLBACK.siteName,
    tagline: settings.tagline?.trim() || FALLBACK.tagline,
    about: settings.about_text?.trim().slice(0, 300) || FALLBACK.about,
    address: settings.address?.trim() || FALLBACK.address,
    phone: settings.whatsapp_number?.trim() || null,
    email: settings.email?.trim() || null,
    license: settings.license_text?.trim() || null,
    instagram: settings.instagram?.trim() || null,
    facebook: settings.facebook?.trim() || null,
    youtube: settings.youtube?.trim() || null,
  };
}

export async function loadSiteInfo(queryClient: QueryClient): Promise<SiteInfo> {
  try {
    return fromSettings(await queryClient.ensureQueryData(settingsQuery));
  } catch {
    return FALLBACK;
  }
}

export function siteInfoFrom(data: Partial<SiteInfo> | undefined | null): SiteInfo {
  return { ...FALLBACK, ...(data ?? {}) };
}

export function socialLinks(info: SiteInfo): string[] {
  const list: string[] = [];
  if (info.instagram) {
    list.push(
      info.instagram.startsWith("http")
        ? info.instagram
        : `https://instagram.com/${info.instagram.replace(/^@/, "")}`,
    );
  }
  if (info.facebook) list.push(info.facebook.startsWith("http") ? info.facebook : `https://facebook.com/${info.facebook}`);
  if (info.youtube) list.push(info.youtube);
  return list;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string | null;
  noindex?: boolean;
}

export function pageMeta({ title, description, path, type = "website", image, noindex }: PageMetaInput) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
      ...(image
        ? [
            { property: "og:image", content: image },
            { name: "twitter:image", content: image },
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: path }],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
