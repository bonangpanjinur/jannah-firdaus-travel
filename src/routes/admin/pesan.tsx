import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { db, messagesQuery } from "@/lib/site-data";

export const Route = createFileRoute("/admin/pesan")({
  component: AdminPesan,
});

function AdminPesan() {
  const qc = useQueryClient();
  const { data: messages = [], isLoading } = useQuery(messagesQuery);

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db().from("contact_messages").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: messagesQuery.queryKey }),
  });

  return (
    <main className="p-6 md:p-10">
      <h1 className="font-display text-3xl">Pesan Masuk</h1>
      {isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Memuat…</p>
      ) : messages.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Belum ada pesan masuk.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {messages.map((m) => (
            <li key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.phone}</p>
                </div>
                {m.is_read ? (
                  <span className="text-xs text-muted-foreground">Sudah dibaca</span>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => markRead.mutate(m.id)}>
                    Tandai dibaca
                  </Button>
                )}
              </div>
              <p className="mt-3 text-sm/6 text-muted-foreground">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}