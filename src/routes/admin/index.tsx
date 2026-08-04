import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { galleryQuery, messagesQuery, packagesQuery } from "@/lib/site-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { data: packages = [] } = useQuery(packagesQuery({ includeDrafts: true }));
  const { data: gallery = [] } = useQuery(galleryQuery);
  const { data: messages = [] } = useQuery(messagesQuery);

  const stats = [
    { label: "Total paket", value: packages.length, to: "/admin/paket" },
    { label: "Paket tayang", value: packages.filter((p) => p.is_published).length, to: "/admin/paket" },
    { label: "Foto galeri", value: gallery.length, to: "/admin/galeri" },
    { label: "Pesan belum dibaca", value: messages.filter((m) => !m.is_read).length, to: "/admin/pesan" },
  ] as const;

  return (
    <main className="p-6 md:p-10">
      <h1 className="font-display text-3xl">Dashboard</h1>
      <p className="mt-2 text-sm text-muted-foreground">Ringkasan konten website Anda.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-lift"
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 font-display text-3xl text-primary">{item.value}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}