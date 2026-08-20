import type { QueryClient } from "@tanstack/react-query";
import { settingsQuery, type SiteSettings } from "@/lib/site-data";
import { absoluteMediaUrl } from "@/lib/storage";

export const SITE_NAME_FALLBACK = "Jannah Firdaus Travel";
export const SEO_BRAND = "Jannah Firdaus Tour Travel";
export const SITE_TAGLINE_FALLBACK = "Melayani Sepenuh Hati";
export const SITE_CITY = "Jakarta Selatan";
export const SITE_REGION = "DKI Jakarta";
export const SITE_DESCRIPTION_FALLBACK =
  "Jannah Firdaus Travel melayani umroh dari Jakarta Selatan dengan paket terjadwal, pendampingan ibadah, hotel nyaman, dan konsultasi transparan.";
export const DEFAULT_OG_IMAGE = "/images/hero-kabah.jpg";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const SITE_DOMAIN = "https://www.jannahfirdaustravel.co.id";

export interface SiteInfo {
  siteName: string;
  tagline: string;
  about: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  license: string | null;
  logo: string | null;
  openingHours: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
}

const FALLBACK: SiteInfo = {
  siteName: SITE_NAME_FALLBACK,
  tagline: SITE_TAGLINE_FALLBACK,
  about: SITE_DESCRIPTION_FALLBACK,
  address:
    "Jl. KH Abdullah Syafei No.21D, RT.1/RW.3, Kb. Baru, Kec. Tebet, Kota Jakarta Selatan, DKI Jakarta 12830",
  phone: null,
  email: "info@jannahfirdaustravel.com",
  license: null,
  logo: null,
  openingHours: null,
  instagram: "umrohjannahfirdaustravel",
  facebook: null,
  youtube: null,
};

export function fromSettings(settings: SiteSettings | null): SiteInfo {
  if (!settings) return FALLBACK;
  return {
    siteName: settings.agency_name?.trim() || FALLBACK.siteName,
    tagline: settings.tagline?.trim() || FALLBACK.tagline,
    about: settings.about_text?.trim().slice(0, 300) || FALLBACK.about,
    address: settings.address?.trim() || FALLBACK.address,
    phone: settings.whatsapp_number?.trim() || null,
    email: settings.email?.trim() || FALLBACK.email,
    license: settings.license_text?.trim() || null,
    logo: settings.logo_url?.trim() || null,
    openingHours: settings.operating_hours?.trim() || null,
    instagram: settings.instagram?.trim() || FALLBACK.instagram,
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

export function openingHoursLd(
  value: string | null,
):
  | { "@type": "OpeningHoursSpecification"; dayOfWeek: string[]; opens: string; closes: string }[]
  | undefined {
  if (!value) return undefined;
  const match = value.match(/(\d{1,2})[.:](\d{2})\s*(?:-|–|—|sampai)\s*(\d{1,2})[.:](\d{2})/i);
  if (!match) return undefined;
  const [, openHour = "00", openMinute = "00", closeHour = "00", closeMinute = "00"] = match;
  const opens = `${openHour.padStart(2, "0")}:${openMinute}`;
  const closes = `${closeHour.padStart(2, "0")}:${closeMinute}`;
  const dayOfWeek =
    /senin/i.test(value) && /sabtu/i.test(value)
      ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      : /senin/i.test(value) && /jumat/i.test(value)
        ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return [{ "@type": "OpeningHoursSpecification", dayOfWeek, opens, closes }];
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
  if (info.facebook)
    list.push(
      info.facebook.startsWith("http") ? info.facebook : `https://facebook.com/${info.facebook}`,
    );
  if (info.youtube) list.push(info.youtube);
  return list;
}

/** Schema bisnis lokal untuk halaman area layanan kota. */
export function localBusinessKotaLd(
  info: SiteInfo,
  kota: { nama: string; provinsi: string },
  path: string,
) {
  const businessId = absoluteUrl(`${path}#bisnis`);
  const sameAs = socialLinks(info);
  const hours = openingHoursLd(info.openingHours);
  const image = absoluteImage(info.logo);
  const contactPoint = info.phone || info.email
    ? {
        "@type": "ContactPoint",
        ...(info.phone ? { telephone: info.phone } : {}),
        ...(info.email ? { email: info.email } : {}),
        contactType: "customer service",
        availableLanguage: ["id"],
      }
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": businessId,
    name: SEO_BRAND,
    alternateName: info.siteName,
    url: absoluteUrl(path),
    image,
    logo: image,
    ...(info.about ? { description: info.about } : {}),
    ...(info.phone ? { telephone: info.phone } : {}),
    ...(info.email ? { email: info.email } : {}),
    ...(info.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: info.address,
            addressLocality: SITE_CITY,
            addressRegion: SITE_REGION,
            addressCountry: "ID",
          },
        }
      : {}),
    areaServed: {
      "@type": "City",
      name: kota.nama,
      address: {
        "@type": "PostalAddress",
        addressLocality: kota.nama,
        addressRegion: kota.provinsi,
        addressCountry: "ID",
      },
    },
    serviceType: ["Perjalanan umroh", "Konsultasi umroh", "Manasik umroh"],
    ...(contactPoint ? { contactPoint } : {}),
    ...(hours ? { openingHoursSpecification: hours } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    priceRange: "$$",
  };
}

/** Mengubah path relatif menjadi URL absolut memakai domain final. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_DOMAIN}${clean}`;
}

function absoluteImage(image: string | null | undefined): string {
  if (!image) return absoluteUrl(DEFAULT_OG_IMAGE);
  if (isAbsolute(image)) return image;
  return absoluteMediaUrl(image) ?? absoluteUrl(DEFAULT_OG_IMAGE);
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string | null;
  imageAlt?: string;
  noindex?: boolean;
  siteName?: string;
}

export function pageMeta({
  title,
  description,
  path,
  type = "website",
  image,
  imageAlt,
  noindex,
  siteName,
}: PageMetaInput) {
  const img = absoluteImage(image);
  const url = absoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:image", content: img },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { property: "og:image:type", content: "image/jpeg" },
      ...(imageAlt ? [{ property: "og:image:alt", content: imageAlt }] : []),
      ...(siteName ? [{ property: "og:site_name", content: siteName }] : []),
      { property: "og:locale", content: "id_ID" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:url", content: url },
      { name: "twitter:image", content: img },
      ...(imageAlt ? [{ name: "twitter:image:alt", content: imageAlt }] : []),
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function breadcrumbLd(
  items: { name: string; path: string }[] | null | undefined,
  pagePath?: string,
) {
  const list = Array.isArray(items) ? items : [];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(pagePath ? { "@id": `${absoluteUrl(pagePath)}#breadcrumb` } : {}),
    itemListElement: list.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqUmrohUmum(siteName: string, kota: string) {
  return [
    {
      q: `Apa saja syarat umum daftar umroh dari ${kota}?`,
      a: `Syarat pendaftaran umroh umumnya meliputi dokumen identitas yang masih berlaku dan dokumen perjalanan sesuai ketentuan. ${siteName} akan membantu memeriksa kelengkapan dokumen sebelum pendaftaran diproses.`,
    },
    {
      q: `Berapa lama proses persiapan umroh dari ${kota}?`,
      a: `Waktu persiapan bergantung pada jadwal paket dan kelengkapan dokumen jamaah. ${siteName} membantu jamaah memilih jadwal, menyiapkan dokumen, dan mengikuti manasik sebelum keberangkatan.`,
    },
    {
      q: `Apakah tersedia konsultasi dan manasik umroh?`,
      a: `Ya. ${siteName} menyediakan konsultasi paket serta manasik sebelum keberangkatan agar jamaah memahami rangkaian ibadah dan persiapan perjalanan.`,
    },
    {
      q: `Bagaimana cara memilih paket umroh yang sesuai?`,
      a: `Pertimbangkan jadwal keberangkatan, durasi perjalanan, fasilitas hotel, maskapai, dan anggaran. Tim ${siteName} dapat membantu membandingkan pilihan paket sesuai kebutuhan jamaah.`,
    },
  ];
}

export function faqLd(items: { q: string; a: string }[] | null | undefined, pagePath?: string) {
  const list = Array.isArray(items) ? items : [];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pagePath ? { "@id": `${absoluteUrl(pagePath)}#faq` } : {}),
    mainEntity: list.map((item) => ({
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
export function availabilityOf(paket: {
  quota?: number | null | undefined;
  departure_date?: string | null | undefined;
}) {
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

function paketImageUrl(paket: TripLike): string | null {
  const resolved = absoluteMediaUrl(paket.flyer_url);
  if (resolved && isAbsolute(resolved)) return resolved;
  return null;
}

/** Offer schema.org untuk satu paket — dipakai bersama TouristTrip dan Product. */
function offerLd(paket: TripLike, harga: number | null, kota: string, provinsi: string) {
  const availability = availabilityOf(paket);
  if (!harga) return undefined;
  return {
    "@type": "Offer",
    price: harga,
    priceCurrency: "IDR",
    availability,
    ...(typeof paket.quota === "number"
      ? { inventoryLevel: { "@type": "QuantitativeValue", value: paket.quota, unitText: "jamaah" } }
      : {}),
    url: absoluteUrl(`/paket/${paket.slug}`),

    ...(kota
      ? {
          eligibleRegion: {
            "@type": "City",
            name: kota,
            address: {
              "@type": "PostalAddress",
              addressLocality: kota,
              addressRegion: provinsi,
              addressCountry: "ID",
            },
          },
        }
      : {}),
  };
}

/** TouristTrip + Offer untuk satu paket umroh. */
export function tripLd(
  paket: TripLike,
  harga: number | null,
  info: SiteInfo,
  opts?: { departureCity?: string; departureRegion?: string },
) {
  const kota = opts?.departureCity ?? SITE_CITY;
  const provinsi = opts?.departureRegion ?? SITE_REGION;
  const endDate = tanggalAkhir(paket.departure_date, paket.duration_days);
  const imageUrl = paketImageUrl(paket);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": absoluteUrl(`/paket/${paket.slug}#trip`),
    name: paket.name,
    url: absoluteUrl(`/paket/${paket.slug}`),
    ...(paket.description ? { description: paket.description.slice(0, 300) } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(paket.departure_date ? { startDate: paket.departure_date } : {}),
    ...(endDate ? { endDate } : {}),
    ...(paket.duration_days
      ? { subjectOf: { "@type": "CreativeWork", name: `${paket.duration_days} hari` } }
      : {}),
    touristType: "Jamaah umroh",
    departureLocation: {
      "@type": "Place",
      name: `${kota}, ${provinsi}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: kota,
        addressRegion: provinsi,
        addressCountry: "ID",
      },
    },
    arrivalLocation: {
      "@type": "Place",
      name: "Makkah & Madinah, Arab Saudi",
      address: { "@type": "PostalAddress", addressCountry: "SA" },
    },
    itinerary: [
      {
        "@type": "City",
        name: "Makkah",
        address: { "@type": "PostalAddress", addressCountry: "SA" },
      },
      {
        "@type": "City",
        name: "Madinah",
        address: { "@type": "PostalAddress", addressCountry: "SA" },
      },
    ],
    provider: {
      "@type": "TravelAgency",
      name: info.siteName,
      ...(info.address ? { address: info.address } : {}),
      ...(info.logo ? { logo: absoluteImage(info.logo) } : {}),
      ...(info.phone ? { telephone: info.phone } : {}),
    },
    ...(harga ? { offers: offerLd(paket, harga, kota, provinsi) } : {}),
  };
}

/** Product + Offer — membantu Google menampilkan harga sebagai rich snippet. */
export function productLd(
  paket: TripLike,
  harga: number | null,
  info: SiteInfo,
  opts?: { departureCity?: string; departureRegion?: string },
) {
  const kota = opts?.departureCity ?? SITE_CITY;
  const provinsi = opts?.departureRegion ?? SITE_REGION;
  const imageUrl = paketImageUrl(paket);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": absoluteUrl(`/paket/${paket.slug}#product`),
    name: paket.name,
    url: absoluteUrl(`/paket/${paket.slug}`),
    ...(paket.description ? { description: paket.description.slice(0, 300) } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    brand: { "@type": "Brand", name: info.siteName },
    ...(paket.airline
      ? { additionalProperty: { "@type": "PropertyValue", name: "Maskapai", value: paket.airline } }
      : {}),
    ...(paket.hotel_makkah
      ? {
          additionalProperty: {
            "@type": "PropertyValue",
            name: "Hotel Makkah",
            value: paket.hotel_makkah,
          },
        }
      : {}),
    ...(paket.hotel_madinah
      ? {
          additionalProperty: {
            "@type": "PropertyValue",
            name: "Hotel Madinah",
            value: paket.hotel_madinah,
          },
        }
      : {}),
    ...(harga ? { offers: offerLd(paket, harga, kota, provinsi) } : {}),
  };
}

/** Daftar berurut paket sebagai ItemList (dipakai halaman daftar & kota). */
export function itemListLd(name: string, path: string, trips: object[] | null | undefined) {
  const list = Array.isArray(trips) ? trips : [];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    numberOfItems: list.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: list.map((trip, i) => ({ "@type": "ListItem", position: i + 1, item: trip })),
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
  }[] | null | undefined,
) {
  const list = Array.isArray(katalog) ? katalog : [];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`${path}#layanan`),
    serviceType: "Paket perjalanan umroh",
    name: `${SEO_BRAND} ${kota.nama}`,
    url: absoluteUrl(path),
    provider: {
      "@type": "TravelAgency",
      name: info.siteName,
      ...(info.address ? { address: info.address } : {}),
      ...(info.phone ? { telephone: info.phone } : {}),
    },
    areaServed: {
      "@type": "City",
      name: kota.nama,
      address: {
        "@type": "PostalAddress",
        addressLocality: kota.nama,
        addressRegion: kota.provinsi,
        addressCountry: "ID",
      },
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl(path),
      servicePhone: info.phone ?? undefined,
      availableLanguage: { "@type": "Language", name: "Indonesian", alternateName: "id" },
    },
    ...(list.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Paket umroh untuk jamaah ${kota.nama}`,
            itemListElement: list.map((k, i) => {
              const availability = availabilityOf({
                quota: k.quota,
                departure_date: k.departureDate,
              });
              return {
                "@type": "Offer",
                position: i + 1,
                name: k.name,
                url: absoluteUrl(k.url),
                availability,
                ...(k.price ? { price: k.price, priceCurrency: "IDR" } : {}),

                ...(typeof k.quota === "number"
                  ? {
                      inventoryLevel: {
                        "@type": "QuantitativeValue",
                        value: k.quota,
                        unitText: "jamaah",
                      },
                    }
                  : {}),
                ...(k.departureDate
                  ? {
                      itemOffered: {
                        "@type": "TouristTrip",
                        name: k.name,
                        url: absoluteUrl(k.url),
                        startDate: k.departureDate,
                        ...(tanggalAkhir(k.departureDate, k.durationDays ?? null)
                          ? { endDate: tanggalAkhir(k.departureDate, k.durationDays ?? null) }
                          : {}),
                        departureLocation: {
                          "@type": "Place",
                          name: `${kota.nama}, ${kota.provinsi}`,
                        },
                      },
                    }
                  : {}),
                areaServed: { "@type": "City", name: kota.nama },
                eligibleRegion: {
                  "@type": "City",
                  name: kota.nama,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: kota.nama,
                    addressRegion: kota.provinsi,
                    addressCountry: "ID",
                  },
                },
              };
            }),
          },
        }
      : {}),
  };
}
