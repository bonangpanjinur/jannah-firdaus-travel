import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSettings } from "@/hooks/use-site";
import { waLink } from "@/lib/format";
import { db } from "@/lib/site-data";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: "Hubungi Kami & Konsultasi Umroh — Barokah Umroh" },
      {
        name: "description",
        content: "Hubungi tim kami via WhatsApp, telepon, atau kirim pertanyaan melalui formulir kontak.",
      },
      { property: "og:title", content: "Hubungi Kami & Konsultasi Umroh — Barokah Umroh" },
      { property: "og:description", content: "Konsultasi paket umroh langsung dengan tim kami." },
    ],
  }),
  component: Kontak,
});

function Kontak() {
  const { data: settings } = useSettings();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSending(true);
    const { error } = await db().from("contact_messages").insert({
      name: form.name,
      phone: form.phone,
      message: form.message,
    });
    setSending(false);
    if (error) {
      toast.error("Pesan gagal dikirim. Coba lagi ya.");
      return;
    }
    toast.success("Terima kasih! Pesan Anda sudah kami terima.");
    setForm({ name: "", phone: "", message: "" });
  }

  return (
    <main className="container-page py-14">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-gold">Kontak</p>
        <h1 className="mt-2 font-display text-4xl">Kami Siap Membantu Anda</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Tanyakan apa saja seputar paket, jadwal, dan persyaratan keberangkatan.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <form onSubmit={submit} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="space-y-2">
            <Label htmlFor="name">Nama lengkap</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Nama Anda"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Nomor WhatsApp</Label>
            <Input
              id="phone"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Pertanyaan</Label>
            <Textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tulis pertanyaan Anda di sini"
            />
          </div>
          <Button type="submit" disabled={sending}>
            {sending ? "Mengirim…" : "Kirim pertanyaan"}
          </Button>
        </form>

        <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg">Informasi kantor</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {settings?.address ? (
              <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" />{settings.address}</li>
            ) : null}
            <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-primary" />{settings?.whatsapp_number}</li>
            {settings?.email ? (
              <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-primary" />{settings.email}</li>
            ) : null}
          </ul>
          <Button asChild className="w-full">
            <a href={waLink(settings)} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" />
              Chat WhatsApp
            </a>
          </Button>
        </aside>
      </div>
    </main>
  );
}