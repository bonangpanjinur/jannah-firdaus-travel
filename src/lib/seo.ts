import type { QueryClient } from "@tanstack/react-query";
import { settingsQuery, type SiteSettings } from "@/lib/site-data";

export const SITE_NAME_FALLBACK = "Jannah Firdaus Tour Travel";
export const SITE_TAGLINE_FALLBACK = "Travel Umroh Jakarta Selatan";
export const SITE_CITY = "Jakarta Selatan";
export const SITE_REGION = "DKI Jakarta";
export const SITE_DESCRIPTION_FALLBACK =
  "Travel umroh Jakarta Selatan dengan paket terjadwal, hotel dekat Masjidil Haram, maskapai resmi, dan bimbingan ibadah hingga kepulangan.";
export const DEFAULT_OG_IMAGE = "/images/hero-kabah.jpg";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

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
  siteName?: string;
}

export function pageMeta({ title, description, path, type = "website", image, noindex, siteName }: PageMetaInput) {
  const img = image || DEFAULT_OG_IMAGE;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: path },
      { property: "og:image", content: img },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: img },
      ...(siteName ? [{ property: "og:site_name", content: siteName }] : []),
      { property: "og:locale", content: "id_ID" },
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
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

interface TripLike {
  slug: string;
  name: string;
  description?: string | null;
  flyer_url?: string | null;
  departure_date?: string | null;
  duration_days?: number | null;
  quota?: number | null;
  airline?: string | null;
  hotel_makkah?: string | null;
  hotel_madinah?: string | null;
}

function isAbsolute(url: string | null | undefined): url is string {
  return typeof url === "string" && /^https?:\/\//i.test(url);
}

/** Status ketersediaan schema.org berdasarkan kuota & tanggal keberangkatan. */
export function availabilityOf(paket: { quota?: number | null; departure_date?: string | null }) {
  const kuota = paket.quota ?? null;
  if (kuota !== null && kuota <= 0) return "https://schema.org/SoldOut";
  if (paket.departure_date) {
    const berangkat = new Date(`${paket.departure_date}T00:00:00`);
    if (!Number.isNaN(berangkat.getTime()) && berangkat.getTime() < Date.now()) {
      return "https://schema.org/Discontinued";
    }
  }
  return "https://schema.org/InStock";
}

function tanggalAkhir(start: string | null | undefined, durasi: number | null | undefined) {
  if (!start || !durasi) return null;
  const d = new Date(`${start}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  d.setDate(d.getDate() + Math.max(0, durasi - 1));
  return d.toISOString().slice(0, 10);
}

/** TouristTrip + Offer untuk satu paket umroh. */
export function tripLd(
  paket: TripLike,
  harga: number | null,
  info: SiteInfo,
  opts?: { departureCity?: string },
) {
  const kota = opts?.departureCity ?? SITE_CITY;
  const hariHabis = paket.departure_date ?? undefined;
  const availability = availabilityOf(paket);
  const endDate = tanggalAkhir(paket.departure_date, paket.duration_days);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `/paket/${paket.slug}#trip`,
    name: paket.name,
    url: `/paket/${paket.slug}`,
    ...(paket.description ? { description: paket.description.slice(0, 300) } : {}),
    ...(isAbsolute(paket.flyer_url) ? { image: paket.flyer_url } : {}),
    ...(paket.departure_date ? { startDate: paket.departure_date } : {}),
    ...(endDate ? { endDate } : {}),
    ...(paket.duration_days ? { subjectOf: { "@type": "CreativeWork", name: `${paket.duration_days} hari` } } : {}),
    touristType: "Jamaah umroh",
    departureLocation: { "@type": "Place", name: `${kota}, ${SITE_REGION}`, address: { "@type": "PostalAddress", addressLocality: kota, addressRegion: SITE_REGION, addressCountry: "ID" } },
    arrivalLocation: { "@type": "Place", name: "Makkah & Madinah, Arab Saudi", address: { "@type": "PostalAddress", addressCountry: "SA" } },
    itinerary: [
      { "@type": "City", name: "Makkah", address: { "@type": "PostalAddress", addressCountry: "SA" } },
      { "@type": "City", name: "Madinah", address: { "@type": "PostalAddress", addressCountry: "SA" } },
    ],
    provider: { "@type": "TravelAgency", name: info.siteName, ...(info.address ? { address: info.address } : {}) },
    ...(harga
      ? {
          offers: {
            "@type": "Offer",
            price: harga,
            priceCurrency: "IDR",
            availability,
            ...(paket.departure_date ? { availabilityStarts: new Date().toISOString().slice(0, 10), availabilityEnds: paket.departure_date, validThrough: paket.departure_date } : {}),
            ...(typeof paket.quota === "number" ? { inventoryLevel: { "@type": "QuantitativeValue", value: paket.quota, unitText: "jamaah" } } : {}),
            url: `/paket/${paket.slug}`,
            ...(hariHabis ? { priceValidUntil: hariHabis } : {}),
            ...(kota
              ? { eligibleRegion: { "@type": "City", name: kota, address: { "@type": "PostalAddress", addressLocality: kota, addressRegion: SITE_REGION, addressCountry: "ID" } } }
              : {}),
          },
        }
      : {}),
  };
}


/** Daftar berurut paket sebagai ItemList (dipakai halaman daftar & kota). */
export function itemListLd(name: string, path: string, trips: object[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: path,
    numberOfItems: trips.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: trips.map((trip, i) => ({ "@type": "ListItem", position: i + 1, item: trip })),
  };
}

/** Layanan umroh yang tersedia untuk satu kota, lengkap dengan katalog paket. */
export function layananKotaLd(
  info: SiteInfo,
  kota: { nama: string; provinsi: string },
  path: string,
  katalog: {
    name: string;
    url: string;
    price: number | null;
    departureDate?: string | null;
    quota?: number | null;
    durationDays?: number | null;
  }[],

) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${path}#layanan`,
    serviceType: "Paket perjalanan umroh",
    name: `Travel Umroh ${kota.nama}`,
    url: path,
    provider: {
      "@type": "TravelAgency",
      name: info.siteName,
      ...(info.address ? { address: info.address } : {}),
      ...(info.phone ? { telephone: info.phone } : {}),
    },
    areaServed: {
      "@type": "City",
      name: kota.nama,
      address: { "@type": "PostalAddress", addressLocality: kota.nama, addressRegion: kota.provinsi, addressCountry: "ID" },
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: path,
      servicePhone: info.phone ?? undefined,
      availableLanguage: { "@type": "Language", name: "Indonesian", alternateName: "id" },
    },
    ...(katalog.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Paket umroh untuk jamaah ${kota.nama}`,
            itemListElement: katalog.map((k, i) => {
              const availability = availabilityOf({ quota: k.quota, departure_date: k.departureDate });
              return {
                "@type": "Offer",
                position: i + 1,
                name: k.name,
                url: k.url,
                availability,
                ...(k.price ? { price: k.price, priceCurrency: "IDR" } : {}),
                ...(k.departureDate
                  ? {
                      availabilityStarts: new Date().toISOString().slice(0, 10),
                      availabilityEnds: k.departureDate,
                      validThrough: k.departureDate,
                      priceValidUntil: k.departureDate,
                    }
                  : {}),
                ...(typeof k.quota === "number"
                  ? { inventoryLevel: { "@type": "QuantitativeValue", value: k.quota, unitText: "jamaah" } }
                  : {}),
                ...(k.departureDate
                  ? {
                      itemOffered: {
                        "@type": "TouristTrip",
                        name: k.name,
                        url: k.url,
                        startDate: k.departureDate,
                        ...(tanggalAkhir(k.departureDate, k.durationDays ?? null)
                          ? { endDate: tanggalAkhir(k.departureDate, k.durationDays ?? null) }
                          : {}),
                        departureLocation: { "@type": "Place", name: `${kota.nama}, ${kota.provinsi}` },
                      },
                    }
                  : {}),
                areaServed: { "@type": "City", name: kota.nama },
                eligibleRegion: {
                  "@type": "City",
                  name: kota.nama,
                  address: { "@type": "PostalAddress", addressLocality: kota.nama, addressRegion: kota.provinsi, addressCountry: "ID" },
                },
              };
            }),

          },
        }
      : {}),
  };
}
