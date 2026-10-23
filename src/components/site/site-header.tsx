import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, MessageCircle, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSettings } from "@/hooks/use-site";
import { waLink } from "@/lib/format";
import { StorageImage } from "@/components/site/storage-image";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/paket", label: "Paket Umroh" },
  { to: "/biaya-umroh", label: "Biaya Umroh" },
  { to: "/syarat-umroh", label: "Syarat Umroh" },
  { to: "/umroh-plus", label: "Umroh Plus" },
  { to: "/galeri", label: "Galeri" },
  { to: "/tentang", label: "Tentang Kami" },
  { to: "/kanal-resmi", label: "Kanal Resmi" },
  { to: "/kontak", label: "Kontak" },
] as const;

export function SiteHeader() {
  const { data: settings } = useSettings();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          {settings?.logo_url ? (
            <StorageImage
              src={settings.logo_url}
              alt={`Logo ${settings.agency_name}`}
              className="size-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full surface-emerald text-gold">
              <Moon className="size-5" strokeWidth={1.6} />
            </span>
          )}
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg font-semibold text-foreground">
              {settings?.agency_name ?? "Jannah Firdaus Tour Travel"}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {settings?.tagline ?? "Sahabat Perjalanan Suci Anda"}
            </span>
          </span>
        </Link>
        <nav aria-label="Navigasi utama desktop" className="hidden items-center gap-1 xl:flex">
          {links.map((link) => {
            const active =
              pathname === link.to || (link.to !== "/" && pathname.startsWith(`${link.to}/`));
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-2 py-2 text-xs font-medium transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "bg-gold/12 text-gold" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden xl:inline-flex">
            <a href={waLink(settings)} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              Konsultasi
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label="Buka menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-10 flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <a href={waLink(settings)} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" />
                    Konsultasi WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
