import { supabase } from "@/integrations/supabase/client";

export interface SiteSettings {
  id: number;
  agency_name: string;
  tagline: string | null;
  logo_url: string | null;
  whatsapp_number: string;
  whatsapp_template: string;
  address: string | null;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  license_text: string | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  about_text: string | null;
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

export const settingsQuery = {
  queryKey: ["site-settings"] as const,
  queryFn: async (): Promise<SiteSettings | null> => {
    const { data, error } = await db().from("site_settings").select("*").eq("id", 1).maybeSingle();
    if (error) throw error;
    return (data as SiteSettings | null) ?? null;
  },
};

export const packagesQuery = (opts?: { includeDrafts?: boolean }) => ({
  queryKey: ["packages", opts?.includeDrafts ?? false] as const,
  queryFn: async (): Promise<Paket[]> => {
    let q = db().from("packages").select("*");
    if (!opts?.includeDrafts) q = q.eq("is_published", true);
    const { data, error } = await q.order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Paket[];
  },
});

export const packageBySlugQuery = (slug: string) => ({
  queryKey: ["package", slug] as const,
  queryFn: async (): Promise<Paket | null> => {
    const { data, error } = await db().from("packages").select("*").eq("slug", slug).maybeSingle();
    if (error) throw error;
    return (data as Paket | null) ?? null;
  },
});

export const packageByIdQuery = (id: string) => ({
  queryKey: ["package-id", id] as const,
  queryFn: async (): Promise<Paket | null> => {
    const { data, error } = await db().from("packages").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return (data as Paket | null) ?? null;
  },
});

export const itineraryQuery = (packageId: string | undefined) => ({
  queryKey: ["itinerary", packageId] as const,
  enabled: Boolean(packageId),
  queryFn: async (): Promise<ItineraryItem[]> => {
    if (!packageId) return [];
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
    if (!packageId) return [];
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
  queryFn: async (): Promise<GalleryItem[]> => {
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
    const { data, error } = await db()
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as Registration[];
  },
};