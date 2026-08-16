import { AlertTriangle, Home, MessageCircle, RefreshCw } from "lucide-react";
import { Link } from "@tanstack/react-router";

type ErrorStateProps = {
  /** Kode status yang ditampilkan, default 500. */
  code?: number | string;
  title?: string;
  description?: string;
  onRetry?: () => void;
};

const LANGKAH_PEMULIHAN = [
  "Muat ulang halaman — sebagian besar gangguan hanya sementara.",
  "Periksa koneksi internet Anda, lalu coba lagi.",
  "Kembali ke beranda dan buka halaman dari menu utama.",
  "Masih bermasalah? Hubungi kami lewat WhatsApp, tim kami siap membantu.",
];

export function ErrorState({
  code = 500,
  title = "Maaf, halaman ini sedang bermasalah",
  description = "Terjadi gangguan di sisi server kami saat memuat halaman. Data Anda aman dan kami sedang menanganinya.",
  onRetry,
}: ErrorStateProps) {
  const retry = onRetry ?? (() => window.location.reload());

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        </div>

        <p className="mt-5 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Error {code}
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="mt-7 rounded-xl border border-border bg-background/60 p-5 text-left">
          <h2 className="text-sm font-semibold text-foreground">Langkah pemulihan</h2>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            {LANGKAH_PEMULIHAN.map((langkah, i) => (
              <li key={langkah} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                  {i + 1}
                </span>
                <span>{langkah}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Coba lagi
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Ke beranda
          </Link>
          <Link
            to="/kontak"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Hubungi kami
          </Link>
        </div>
      </div>
    </main>
  );
}
