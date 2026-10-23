import { hasSupabaseConfig, supabase } from "@/integrations/supabase/client";

export const DEFAULT_HERO_TITLE = "Wujudkan Perjalanan Umroh Impian Bersama Kami";
export const DEFAULT_HERO_SUBTITLE =
  "Bimbingan ustadz berpengalaman, hotel nyaman, dan pelayanan penuh amanah untuk perjalanan ibadah yang tenang.";
export const DEFAULT_ABOUT_TEXT =
  "Jannah Firdaus Travel membantu keluarga Indonesia mempersiapkan perjalanan umroh dengan pendampingan yang amanah, informasi yang jelas, dan pelayanan yang tulus sejak konsultasi hingga kembali ke tanah air.";

export interface SiteSettings {
  id: number;
  agency_name: string;
  tagline: string | null;
  logo_url: string | null;
  whatsapp_number: string | null;
  whatsapp_template: string | null;
  operating_hours: string | null;
  address: string | null;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  license_text: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  about_text: string | null;
  theme: string;
}

export interface Paket {
  id: string;
  slug: string;
  name: string;
  flyer_url: string | null;
  description: string | null;
  price_quad: number | null;
  price_triple: number | null;
  price_double: number | null;
  departure_date: string | null;
  duration_days: number | null;
  quota: number | null;
  airline: string | null;
  hotel_makkah: string | null;
  hotel_makkah_stars: number | null;
  hotel_madinah: string | null;
  hotel_madinah_stars: number | null;
  includes: string[];
  excludes: string[];
  requirements: string[];
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
}

export interface ItineraryItem {
  id: string;
  package_id: string;
  day_number: number;
  title: string;
  description: string | null;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
}

export interface PackageImage extends GalleryItem {
  package_id: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Registration {
  id: string;
  package_id: string | null;
  package_name: string | null;
  name: string;
  phone: string;
  preferred_date: string | null;
  notes: string | null;
  status: string;
  created_at: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = () => supabase as any;

/**
 * Rows from Supabase may contain null/undefined array fields when legacy or
 * partially imported package data is present. Keep the UI/SSR contract stable.
 */
const normalizePaket = (row: Paket): Paket => ({
  ...row,
  includes: Array.isArray(row.includes) ? row.includes : [],
  excludes: Array.isArray(row.excludes) ? row.excludes : [],
  requirements: Array.isArray(row.requirements) ? row.requirements : [],
});

export const settingsQuery = {
  queryKey: ["site-settings"] as const,
  staleTime: 60_000,
  gcTime: 5 * 60_000,
  queryFn: async (): Promise<SiteSettings | null> => {
    if (!hasSupabaseConfig()) return null;
    const { data, error } = await db().from("site_settings").select("*").eq("id", 1).maybeSingle();
    if (error) throw error;
    return (data as SiteSettings | null) ?? null;
  },
};

export const packagesQuery = (opts?: { includeDrafts?: boolean; limit?: number }) => ({
  queryKey: ["packages", opts?.includeDrafts ?? false, opts?.limit ?? null] as const,
  staleTime: 60_000,
  gcTime: 5 * 60_000,
  queryFn: async (): Promise<Paket[]> => {
    if (!hasSupabaseConfig()) return [];
    let q = db().from("packages").select("*");
    if (!opts?.includeDrafts) q = q.eq("is_published", true);
    q = q.order("sort_order", { ascending: true });
    if (opts?.limit) q = q.limit(opts.limit);
    const { data, error } = await q;
    if (error) throw error;
    return ((data ?? []) as Paket[]).map(normalizePaket);
  },
});

export interface AdminPackagesQueryResult {
  items: Paket[];
  total: number;
}

export const adminPackagesQuery = (opts?: {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: "all" | "published" | "draft";
  sort?: "order" | "name" | "departure" | "price";
}) => ({
  queryKey: [
    "admin-packages",
    opts?.page ?? 1,
    opts?.pageSize ?? 9,
    opts?.search ?? "",
    opts?.status ?? "all",
    opts?.sort ?? "order",
  ] as const,
  staleTime: 30_000,
  gcTime: 5 * 60_000,
  queryFn: async (): Promise<AdminPackagesQueryResult> => {
    if (!hasSupabaseConfig()) return { items: [], total: 0 };
    const page = Math.max(1, opts?.page ?? 1);
    const pageSize = Math.max(1, opts?.pageSize ?? 9);
    let q = db().from("packages").select("*", { count: "exact" });
    if (opts?.status === "published") q = q.eq("is_published", true);
    if (opts?.status === "draft") q = q.eq("is_published", false);
    const search = opts?.search?.trim().replace(/[%,()]/g, "");
    if (search) q = q.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);
    const order =
      opts?.sort === "name"
        ? { column: "name", ascending: true }
        : opts?.sort === "departure"
          ? { column: "departure_date", ascending: true, nullsFirst: false }
          : opts?.sort === "price"
            ? { column: "price_quad", ascending: true, nullsFirst: false }
            : { column: "sort_order", ascending: true };
    q = q.order(order.column, { ascending: order.ascending, nullsFirst: order.nullsFirst });
    q = q.range((page - 1) * pageSize, page * pageSize - 1);
    const { data, count, error } = await q;
    if (error) throw error;
    return {
      items: ((data ?? []) as Paket[]).map(normalizePaket),
      total: count ?? 0,
    };
  },
});

export const packageBySlugQuery = (slug: string) => ({
  queryKey: ["package", slug] as const,
  staleTime: 60_000,
  gcTime: 5 * 60_000,
  queryFn: async (): Promise<Paket | null> => {
    if (!hasSupabaseConfig()) return null;
    const { data, error } = await db()
      .from("packages")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) throw error;
    return data ? normalizePaket(data as Paket) : null;
  },
});

export const packageByIdQuery = (id: string) => ({
  queryKey: ["package-id", id] as const,
  queryFn: async (): Promise<Paket | null> => {
    if (!hasSupabaseConfig()) return null;
    const { data, error } = await db().from("packages").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data ? normalizePaket(data as Paket) : null;
  },
});

export const itineraryQuery = (packageId: string | undefined) => ({
  queryKey: ["itinerary", packageId] as const,
  enabled: Boolean(packageId),
  queryFn: async (): Promise<ItineraryItem[]> => {
    if (!packageId || !hasSupabaseConfig()) return [];
    const { data, error } = await db()
      .from("package_itinerary")
      .select("*")
      .eq("package_id", packageId)
      .order("day_number", { ascending: true });
    if (error) throw error;
    return (data ?? []) as ItineraryItem[];
  },
});

export const packageImagesQuery = (packageId: string | undefined) => ({
  queryKey: ["package-images", packageId] as const,
  enabled: Boolean(packageId),
  queryFn: async (): Promise<PackageImage[]> => {
    if (!packageId || !hasSupabaseConfig()) return [];
    const { data, error } = await db()
      .from("package_images")
      .select("*")
      .eq("package_id", packageId)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as PackageImage[];
  },
});

export const galleryQuery = {
  queryKey: ["gallery"] as const,
  staleTime: 60_000,
  gcTime: 5 * 60_000,
  queryFn: async (): Promise<GalleryItem[]> => {
    if (!hasSupabaseConfig()) return [];
    const { data, error } = await db()
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as GalleryItem[];
  },
};

export const messagesQuery = {
  queryKey: ["contact-messages"] as const,
  queryFn: async (): Promise<ContactMessage[]> => {
    if (!hasSupabaseConfig()) return [];
    const { data, error } = await db()
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ContactMessage[];
  },
};

export const registrationsQuery = {
  queryKey: ["registrations"] as const,
  queryFn: async (): Promise<Registration[]> => {
    if (!hasSupabaseConfig()) return [];
    const { data, error } = await db()
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Registration[];
  },
};
