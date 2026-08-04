import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Users } from "lucide-react";
import { useSettings } from "@/hooks/use-site";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Kami & Legalitas — Barokah Umroh" },
      {
        name: "description",
        content:
          "Profil biro perjalanan umroh berizin resmi PPIU, legalitas, alamat kantor, dan komitmen pelayanan kami.",
      },
      { property: "og:title", content: "Tentang Kami & Legalitas — Barokah Umroh" },
      { property: "og:description", content: "Profil, legalitas, dan komitmen pelayanan travel umroh kami." },
    ],
  }),
  component: Tentang,
});

function Tentang() {
  const { data: settings } = useSettings();

  return (
    <main className="container-page py-14">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-gold">Tentang Kami</p>
        <h1 className="mt-2 font-display text-4xl">{settings?.agency_name ?? "Barokah Umroh"}</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">{settings?.about_text}</p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <BadgeCheck className="size-6 text-primary" />
          <h2 className="mt-3 font-display text-lg">Legalitas</h2>
          <p className="mt-2 text-sm/6 text-muted-foreground">{settings?.license_text ?? "-"}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <MapPin className="size-6 text-primary" />
          <h2 className="mt-3 font-display text-lg">Kantor</h2>
          <p className="mt-2 text-sm/6 text-muted-foreground">{settings?.address ?? "-"}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <Users className="size-6 text-primary" />
          <h2 className="mt-3 font-display text-lg">Pelayanan</h2>
          <p className="mt-2 text-sm/6 text-muted-foreground">
            Pendampingan penuh mulai dari pendaftaran, manasik, keberangkatan, hingga kepulangan jamaah.
          </p>
        </div>
      </div>

      <section className="mt-14 rounded-3xl surface-emerald p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl">Komitmen Kami</h2>
        <ul className="mt-6 grid gap-4 text-sm/7 opacity-90 md:grid-cols-2">
          <li>Harga transparan tanpa biaya tersembunyi.</li>
          <li>Hotel dan maskapai sesuai yang dijanjikan pada brosur paket.</li>
          <li>Pembimbing ibadah bersertifikat untuk setiap rombongan.</li>
          <li>Manasik umroh sebelum keberangkatan untuk seluruh jamaah.</li>
        </ul>
      </section>
    </main>
  );
}