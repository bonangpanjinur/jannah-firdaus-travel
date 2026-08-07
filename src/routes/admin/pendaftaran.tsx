import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTanggal } from "@/lib/format";
import { db, registrationsQuery } from "@/lib/site-data";

export const Route = createFileRoute("/admin/pendaftaran")({
  component: AdminPendaftaran,
});

function AdminPendaftaran() {
  const qc = useQueryClient();
  const { data: rows = [], isLoading } = useQuery(registrationsQuery);

  async function setStatus(id: string, status: string) {
    const { error } = await db().from("registrations").update({ status }).eq("id", id);
    if (error) {
      toast.error("Gagal memperbarui status.");
      return;
    }
    qc.invalidateQueries({ queryKey: registrationsQuery.queryKey });
  }

  async function remove(id: string) {
    const { error } = await db().from("registrations").delete().eq("id", id);
    if (error) {
      toast.error("Gagal menghapus pendaftaran.");
      return;
    }
    toast.success("Pendaftaran dihapus.");
    qc.invalidateQueries({ queryKey: registrationsQuery.queryKey });
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl">Pendaftaran Jamaah</h1>
        <p className="text-sm text-muted-foreground">Data calon jamaah dari formulir pendaftaran di halaman paket.</p>
      </header>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Memuat data…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada pendaftaran masuk.</p>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <article key={r.id} className="rounded-xl border border-border bg-card p-4 shadow-soft">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold">{r.name}</h2>
                <Badge variant={r.status === "baru" ? "default" : "secondary"}>{r.status}</Badge>
                <span className="ml-auto text-xs text-muted-foreground">{formatTanggal(r.created_at)}</span>
              </div>
              <dl className="mt-2 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                <div>Paket: <span className="text-foreground">{r.package_name ?? "-"}</span></div>
                <div>Tanggal pilihan: <span className="text-foreground">{formatTanggal(r.preferred_date)}</span></div>
                <div>WhatsApp: <span className="text-foreground">{r.phone}</span></div>
              </dl>
              {r.notes ? <p className="mt-2 text-sm">{r.notes}</p> : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="secondary">
                  <a
                    href={`https://wa.me/${r.phone.replace(/\D/g, "").replace(/^0/, "62")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="size-4" /> Chat
                  </a>
                </Button>
                {r.status === "baru" ? (
                  <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "diproses")}>
                    Tandai diproses
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "baru")}>
                    Tandai baru
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>
                  <Trash2 className="size-4" /> Hapus
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}