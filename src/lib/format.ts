import type { Paket, SiteSettings } from "./site-data";

export function formatRupiah(value: number | null | undefined): string {
  if (value === null || value === undefined) return "Hubungi kami";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTanggal(value: string | null | undefined): string {
  if (!value) return "Jadwal menyusul";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Jadwal menyusul";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function bulanTahun(value: string | null | undefined): string {
  if (!value) return "Lainnya";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Lainnya";
  return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(date);
}

export function hargaMulai(paket: Paket): number | null {
  const values = [paket.price_quad, paket.price_triple, paket.price_double].filter(
    (v): v is number => typeof v === "number",
  );
  return values.length ? Math.min(...values) : null;
}

function normalizeNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  return digits;
}

export function waLink(settings: SiteSettings | null | undefined, paketName?: string): string {
  const number = normalizeNumber(settings?.whatsapp_number ?? "628123456789");
  const template =
    settings?.whatsapp_template ??
    "Assalamu'alaikum, saya ingin bertanya tentang paket {paket}.";
  const text = template.replace("{paket}", paketName ?? "umroh yang tersedia");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}