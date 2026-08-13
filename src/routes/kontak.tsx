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
import { loadSiteInfo, siteInfoFrom, pageMeta, breadcrumbLd, SITE_CITY } from "@/lib/seo";

export const Route = createFileRoute("/kontak")({
  loader: ({ context }) => loadSiteInfo(context.queryClient),
  head: ({ loaderData }) => {
    const info = siteInfoFrom(loaderData);
    const base = pageMeta({
      title: `Hubungi & Konsultasi Umroh — ${info.siteName}`,
      description: `Hubungi ${info.siteName} di ${SITE_CITY} via WhatsApp, telepon, atau formulir kontak untuk konsultasi paket umroh dan jadwal keberangkatan.`,
      path: "/kontak",
      siteName: info.siteName,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Kontak ${info.siteName}`,
            mainEntity: {
              "@type": "Organization",
              "@id": "/#organization",
              name: info.siteName,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["id"],
                areaServed: "ID",
                ...(info.phone ? { telephone: `+${info.phone.replace(/\D/g, "")}` } : {}),
                ...(info.email ? { email: info.email } : {}),
              },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Beranda", path: "/" },
              { name: "Kontak", path: "/kontak" },
            ]),
          ),
        },
      ],
    };
  },

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
    <main className="container-page py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Kontak</p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Kami Siap Membantu Anda</h1>
        <p className="mt-4 text-sm/7 text-muted-foreground">
          Tanyakan apa saja seputar paket, jadwal, dan persyaratan keberangkatan.
        </p>
      </header>

      <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
        <form onSubmit={submit} className="bento-card space-y-5 p-5 sm:p-6">
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
          <Button type="submit" disabled={sending} className="w-full sm:w-auto">
            {sending ? "Mengirim…" : "Kirim pertanyaan"}
          </Button>
        </form>

        <aside className="bento-card h-fit space-y-4 p-5 sm:p-6">
          <h2 className="font-display text-lg">Informasi kantor</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {settings?.address ? (
              <li className="flex gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" />{settings.address}</li>
            ) : null}
            <li className="flex gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-gold" />{settings?.whatsapp_number}</li>
            {settings?.email ? (
              <li className="flex gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-gold" />{settings.email}</li>
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