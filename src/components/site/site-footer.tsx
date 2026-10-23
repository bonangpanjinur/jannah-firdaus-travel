import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useSettings } from "@/hooks/use-site";

export function SiteFooter() {
  const { data: settings } = useSettings();

  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-xl text-gradient-gold">
            {settings?.agency_name ?? "Jannah Firdaus Tour Travel"}
          </h3>
          <p className="mt-3 max-w-sm text-sm/6 opacity-85">
            {settings?.tagline ?? "Sahabat Perjalanan Suci Anda"}
          </p>
          {settings?.license_text ? (
            <p className="mt-4 flex items-start gap-2 text-xs opacity-80">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" />
              {settings.license_text}
            </p>
          ) : null}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-80">Navigasi</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            <li>
              <Link
                to="/paket"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Paket Umroh
              </Link>
            </li>
            <li>
              <Link
                to="/galeri"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Galeri
              </Link>
            </li>
            <li>
              <Link
                to="/tentang"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                to="/kontak"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Kontak
              </Link>
            </li>
            <li>
              <Link
                to="/kanal-resmi"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Website & Kanal Resmi
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-80">
            Panduan Umroh
          </h4>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            <li>
              <Link
                to="/umroh-jakarta-selatan"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Umroh Jakarta Selatan
              </Link>
            </li>
            <li>
              <Link
                to="/umroh"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Area Layanan Seluruh Indonesia
              </Link>
            </li>
            <li>
              <Link
                to="/biaya-umroh"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Biaya Umroh
              </Link>
            </li>
            <li>
              <Link
                to="/syarat-umroh"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Syarat Umroh
              </Link>
            </li>
            <li>
              <Link
                to="/umroh-plus"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Umroh Plus
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/kontak"
                className="rounded-sm transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Konsultasi & Kontak
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-80">Kontak</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            {settings?.address ? (
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {settings.address}
              </li>
            ) : null}
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" />
              {settings?.whatsapp_number ?? "-"}
            </li>
            {settings?.email ? (
              <li className="flex gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" />
                {settings.email}
              </li>
            ) : null}
            {settings?.instagram ? (
              <li className="flex gap-2">
                <Instagram className="mt-0.5 size-4 shrink-0" />@{settings.instagram}
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="container-page py-5 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {settings?.agency_name ?? "Jannah Firdaus Tour Travel"}.
          Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
