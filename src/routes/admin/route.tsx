import { useEffect } from "react";
import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { ClipboardList, FolderOpen, Image, LayoutDashboard, LogOut, Mail, Package, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useIsAdmin, useSession } from "@/hooks/use-site";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Panel Admin — Barokah Umroh" },
      { name: "description", content: "Kelola paket, itinerary, galeri, dan pengaturan website." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/paket", label: "Paket", icon: Package },
  { to: "/admin/galeri", label: "Galeri", icon: Image },
  { to: "/admin/file", label: "File", icon: FolderOpen },
  { to: "/admin/pendaftaran", label: "Pendaftaran", icon: ClipboardList },
  { to: "/admin/pesan", label: "Pesan", icon: Mail },
  { to: "/admin/pengaturan", label: "Pengaturan", icon: Settings },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const { data: isAdmin, isLoading: checking } = useIsAdmin(session?.user.id);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  if (loading || !session || checking) {
    return <div className="p-10 text-sm text-muted-foreground">Memuat panel…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-2xl">Akses ditolak</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Akun {session.user.email} belum memiliki peran admin. Hubungi pengelola untuk mendapatkan akses.
        </p>
        <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}>
          Keluar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-sand">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card p-5 md:flex">
        <Link to="/" className="font-display text-lg text-primary">Barokah Umroh</Link>
        <p className="mt-1 text-xs text-muted-foreground">Panel Admin</p>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: "exact" in item ? item.exact : false }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
        >
          <LogOut className="size-4" /> Keluar
        </Button>
      </aside>

      <div className="flex-1">
        <div className="flex gap-1 overflow-x-auto border-b border-border bg-card px-4 py-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: "exact" in item ? item.exact : false }}
              activeProps={{ className: "bg-primary text-primary-foreground" }}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
}