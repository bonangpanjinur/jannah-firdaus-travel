import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, MessageCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { db, messagesQuery } from "@/lib/site-data";

export const Route = createFileRoute("/admin/pesan")({
  component: AdminPesan,
});

function contactWaLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const number = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${number}?text=${encodeURIComponent(`Assalamu'alaikum ${message}`)}`;
}

function AdminPesan() {
  const qc = useQueryClient();
  const { data: messages = [], isLoading } = useQuery(messagesQuery);

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db().from("contact_messages").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: messagesQuery.queryKey }),
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db().from("contact_messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pesan dihapus");
      qc.invalidateQueries({ queryKey: messagesQuery.queryKey });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <main className="p-6 md:p-10">
      <div className="flex items-end justify-between gap-3"><div><p className="text-sm font-semibold uppercase tracking-wider text-gold">Inbox</p><h1 className="mt-1 font-display text-3xl">Pesan Masuk</h1></div><span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{messages.filter((message) => !message.is_read).length} belum dibaca</span></div>
      {isLoading ? <p className="mt-6 text-sm text-muted-foreground">Memuat…</p> : messages.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center"><Mail className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 text-sm text-muted-foreground">Belum ada pesan masuk.</p></div> : <ul className="mt-8 space-y-4">{messages.map((message) => <li key={message.id} className={`rounded-2xl border border-border bg-card p-5 shadow-soft ${message.is_read ? "" : "border-primary/40"}`}><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-semibold">{message.name}</p><p className="mt-1 text-xs text-muted-foreground">{message.phone} • {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(new Date(message.created_at))}</p></div><div className="flex flex-wrap gap-2"><Button asChild size="sm"><a href={contactWaLink(message.phone, message.message)} target="_blank" rel="noreferrer"><MessageCircle className="size-4" />Balas WhatsApp</a></Button>{message.is_read ? <span className="self-center text-xs text-muted-foreground">Sudah dibaca</span> : <Button size="sm" variant="outline" onClick={() => markRead.mutate(message.id)}>Tandai dibaca</Button>}<Button size="icon" variant="ghost" aria-label={`Hapus pesan dari ${message.name}`} onClick={() => { if (window.confirm("Hapus pesan ini?")) remove.mutate(message.id); }}><Trash2 className="size-4 text-destructive" /></Button></div></div><p className="mt-4 whitespace-pre-wrap text-sm/6 text-muted-foreground">{message.message}</p></li>)}</ul>}
    </main>
  );
}
