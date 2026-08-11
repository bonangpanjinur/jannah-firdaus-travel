import type { QueryClient } from "@tanstack/react-query";
import { settingsQuery } from "@/lib/site-data";

export const SITE_NAME_FALLBACK = "Barokah Umroh";
export const SITE_TAGLINE_FALLBACK = "Paket Umroh Amanah & Terjadwal";
export const SITE_DESCRIPTION_FALLBACK =
  "Paket umroh terjadwal dengan hotel dekat Masjidil Haram, maskapai resmi, dan bimbingan ustadz berpengalaman.";

export interface SiteInfo {
  siteName: string;
  tagline: string;
  about: string;
}

export async function loadSiteInfo(queryClient: QueryClient): Promise<SiteInfo> {
  try {
    const settings = await queryClient.ensureQueryData(settingsQuery);
    return {
      siteName: settings?.agency_name?.trim() || SITE_NAME_FALLBACK,
      tagline: settings?.tagline?.trim() || SITE_TAGLINE_FALLBACK,
      about: settings?.about_text?.trim().slice(0, 155) || SITE_DESCRIPTION_FALLBACK,
    };
  } catch {
    return {
      siteName: SITE_NAME_FALLBACK,
      tagline: SITE_TAGLINE_FALLBACK,
      about: SITE_DESCRIPTION_FALLBACK,
    };
  }
}

export function siteInfoFrom(loaderData: Partial<SiteInfo> | undefined): SiteInfo {
  return {
    siteName: loaderData?.siteName ?? SITE_NAME_FALLBACK,
    tagline: loaderData?.tagline ?? SITE_TAGLINE_FALLBACK,
    about: loaderData?.about ?? SITE_DESCRIPTION_FALLBACK,
  };
}
