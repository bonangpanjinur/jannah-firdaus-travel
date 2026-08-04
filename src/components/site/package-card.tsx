import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRupiah, formatTanggal, hargaMulai } from "@/lib/format";
import type { Paket } from "@/lib/site-data";

export function PackageCard({ paket }: { paket: Paket }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <Link to="/paket/$slug" params={{ slug: paket.slug }} className="block">
        <div className="relative aspect-3/4 overflow-hidden bg-muted">
          {paket.flyer_url ? (
            <img
              src={paket.flyer_url}
              alt={`Flyer paket ${paket.name}`}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center surface-emerald font-display text-lg">
              {paket.name}
            </div>
          )}
          {paket.is_featured ? (
            <Badge className="absolute left-3 top-3 bg-gold text-gold-foreground hover:bg-gold">
              Unggulan
            </Badge>
          ) : null}
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <h3 className="font-display text-lg leading-snug text-foreground">
          <Link to="/paket/$slug" params={{ slug: paket.slug }}>{paket.name}</Link>
        </h3>

        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />
            {formatTanggal(paket.departure_date)}
          </li>
          <li className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            {paket.duration_days ? `${paket.duration_days} hari` : "Durasi menyusul"}
          </li>
          {paket.airline ? (
            <li className="flex items-center gap-2">
              <Plane className="size-4 text-primary" />
              {paket.airline}
            </li>
          ) : null}
        </ul>

        <div className="flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="text-xs text-muted-foreground">Mulai dari</p>
            <p className="font-display text-xl text-primary">{formatRupiah(hargaMulai(paket))}</p>
          </div>
          <Button asChild size="sm" variant="secondary">
            <Link to="/paket/$slug" params={{ slug: paket.slug }}>Detail</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}