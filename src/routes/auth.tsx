import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/hooks/use-site";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Masuk Panel Admin — Barokah Umroh" },
      { name: "description", content: "Halaman masuk pengelola website travel umroh." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Masuk Panel Admin — Barokah Umroh" },
      { property: "og:description", content: "Halaman masuk pengelola website travel umroh." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) navigate({ to: "/admin" });
  }, [session, navigate]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    const action =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    const { error } = await action;
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (mode === "signup") {
      toast.success("Akun dibuat. Silakan masuk.");
      setMode("login");
      return;
    }
    navigate({ to: "/admin" });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sand px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lift">
        <Link to="/" className="text-xs uppercase tracking-wider text-muted-foreground hover:text-primary">
          ← Kembali ke website
        </Link>
        <h1 className="mt-4 font-display text-2xl">
          {mode === "login" ? "Masuk Panel Admin" : "Daftar Akun Admin"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Halaman ini khusus untuk pengelola website.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Kata sandi</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Memproses…" : mode === "login" ? "Masuk" : "Daftar"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-5 w-full text-center text-sm text-muted-foreground hover:text-primary"
        >
          {mode === "login" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
        </button>
      </div>
    </main>
  );
}