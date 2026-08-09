import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, Plane, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRupiah, formatTanggal, hargaMulai } from "@/lib/format";
import type { Paket } from "@/lib/site-data";
import { StorageImage } from "@/components/site/storage-image";

export function PackageCard({ paket }: { paket: Paket }) {
  const remaining = paket.quota;
  const quotaLabel = remaining === null ? null : remaining <= 5 ? "Kuota terbatas" : `${remaining} kuota tersedia`;

  return (
    <article className="bento-card group flex flex-col">
      <Link to="/paket/$slug" params={{ slug: paket.slug }} className="block">
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          <StorageImage src={paket.flyer_url} alt={`Flyer paket ${paket.name}`} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" fallback={<div className="flex size-full items-center justify-center surface-emerald font-display text-lg">{paket.name}</div>} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-card to-transparent" />
          {paket.is_featured ? <Badge className="absolute left-3 top-3 bg-gold text-gold-foreground hover:bg-gold">Unggulan</Badge> : null}
          {remaining !== null && remaining <= 5 ? <Badge variant="destructive" className="absolute right-3 top-3">{quotaLabel}</Badge> : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col space-y-3 p-5">
        <h3 className="font-display text-lg leading-snug text-foreground"><Link to="/paket/$slug" params={{ slug: paket.slug }}>{paket.name}</Link></h3>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" />{formatTanggal(paket.departure_date)}</li>
          <li className="flex items-center gap-2"><Clock className="size-4 text-primary" />{paket.duration_days ? `${paket.duration_days} hari` : "Durasi menyusul"}</li>
          {paket.airline ? <li className="flex items-center gap-2"><Plane className="size-4 text-primary" />{paket.airline}</li> : null}
          {quotaLabel && remaining !== null && remaining > 5 ? <li className="flex items-center gap-2"><Users className="size-4 text-primary" />{quotaLabel}</li> : null}
        </ul>
        <div className="mt-auto space-y-3 border-t border-border pt-4">
          <div><p className="text-xs text-muted-foreground">Mulai dari</p><p className="font-display text-xl text-gold">{formatRupiah(hargaMulai(paket))}</p></div>
          <div className="grid grid-cols-2 gap-2">
            <Button asChild size="sm" variant="outline"><Link to="/paket/$slug" params={{ slug: paket.slug }}>Detail</Link></Button>
            <Button asChild size="sm"><Link to="/paket/$slug" params={{ slug: paket.slug }} hash="daftar">Daftar</Link></Button>
          </div>
        </div>
      </div>
    </article>
  );
}
