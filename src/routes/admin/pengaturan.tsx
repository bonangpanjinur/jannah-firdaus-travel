import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/image-upload";
import { useSettings } from "@/hooks/use-site";
import { db, settingsQuery, type SiteSettings } from "@/lib/site-data";
import { THEMES } from "@/components/site/theme-applier";

export const Route = createFileRoute("/admin/pengaturan")({
  component: AdminPengaturan,
});

function AdminPengaturan() {
  const qc = useQueryClient();
  const { data } = useSettings();
  const [form, setForm] = useState<Partial<SiteSettings>>({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      if (!form.agency_name?.trim()) throw new Error("Nama website wajib diisi.");
      const { id, ...rest } = form;
      void id;
      const { error } = await db()
        .from("site_settings")
        .update({
          ...rest,
          agency_name: form.agency_name.trim(),
          whatsapp_number: form.whatsapp_number?.trim() || null,
          whatsapp_template: form.whatsapp_template?.trim() || null,
          operating_hours: form.operating_hours?.trim() || null,
        })
        .eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pengaturan tersimpan");
      qc.invalidateQueries({ queryKey: settingsQuery.queryKey });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function field(key: keyof SiteSettings, value: string | null) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  return (
    <main className="p-6 md:p-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-gold">
          Identitas & konten
        </p>
        <h1 className="mt-1 font-display text-3xl">Pengaturan Website</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Perubahan di sini akan tampil di beranda, header, footer, dan halaman informasi.
        </p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          save.mutate();
        }}
        className="mt-6 grid max-w-5xl gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-2"
      >
        <Field
          label="Nama website"
          value={form.agency_name ?? ""}
          onChange={(value) => field("agency_name", value)}
          required
          placeholder="Nama yang tampil di header & footer"
        />
        <Field
          label="Tagline"
          value={form.tagline ?? ""}
          onChange={(value) => field("tagline", value)}
        />
        <div className="md:col-span-2">
          <ImageUpload
            label="Logo website"
            folder="uploads"
            value={form.logo_url}
            onChange={(value) => field("logo_url", value)}
            aspect="aspect-square"
          />
        </div>
        <div className="md:col-span-2 mt-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Kontak agen</p>
          <p className="text-xs text-muted-foreground">
            Data agen yang bisa dihubungi calon jamaah.
          </p>
        </div>
        <Field
          label="Nomor WhatsApp agen"
          value={form.whatsapp_number ?? ""}
          onChange={(value) => field("whatsapp_number", value)}
          placeholder="6281234567890 (opsional)"
        />
        <Field
          label="Email agen"
          type="email"
          value={form.email ?? ""}
          onChange={(value) => field("email", value)}
        />
        <Field
          label="Instagram"
          value={form.instagram ?? ""}
          onChange={(value) => field("instagram", value)}
          placeholder="username tanpa @"
        />
        <Field
          label="Facebook"
          value={form.facebook ?? ""}
          onChange={(value) => field("facebook", value)}
        />
        <Field
          label="YouTube"
          value={form.youtube ?? ""}
          onChange={(value) => field("youtube", value)}
          placeholder="URL channel atau video"
        />
        <Field
          label="Jam operasional"
          value={form.operating_hours ?? ""}
          onChange={(value) => field("operating_hours", value)}
          placeholder="Senin-Sabtu, 08.00-20.00 WIB"
        />
        <Field
          label="Legalitas"
          value={form.license_text ?? ""}
          onChange={(value) => field("license_text", value)}
        />
        <div className="space-y-2 md:col-span-2">
          <Label>Alamat kantor</Label>
          <Textarea
            rows={2}
            value={form.address ?? ""}
            onChange={(event) => field("address", event.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Judul hero beranda</Label>
          <Input
            value={form.hero_title ?? ""}
            onChange={(event) => field("hero_title", event.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Subjudul hero beranda</Label>
          <Textarea
            rows={3}
            value={form.hero_subtitle ?? ""}
            onChange={(event) => field("hero_subtitle", event.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Template pesan WhatsApp (gunakan {"{paket}"})</Label>
          <Textarea
            rows={2}
            value={form.whatsapp_template ?? ""}
            onChange={(event) => field("whatsapp_template", event.target.value)}
            placeholder="Assalamu'alaikum, saya ingin bertanya tentang paket {paket}."
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Tentang kami</Label>
          <Textarea
            rows={5}
            value={form.about_text ?? ""}
            onChange={(event) => field("about_text", event.target.value)}
          />
        </div>
        <div className="space-y-3 md:col-span-2">
          <div>
            <Label>Tema tampilan depan</Label>
            <p className="text-xs text-muted-foreground">
              Pilih gaya warna website yang dilihat pengunjung. Perubahan langsung berlaku setelah
              disimpan.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {THEMES.map((theme) => {
              const active = (form.theme ?? "noir-emas") === theme.value;
              return (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() => field("theme", theme.value)}
                  className={`rounded-2xl border p-4 text-left transition-colors ${active ? "border-gold bg-accent/40" : "border-border bg-background hover:border-gold/50"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{theme.label}</span>
                    {active ? (
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                        Aktif
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{theme.description}</p>
                  <div className="mt-3 flex gap-1.5">
                    {theme.swatches.map((color) => (
                      <span
                        key={color}
                        className="h-6 w-10 rounded-md border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="md:col-span-2">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending ? "Menyimpan…" : "Simpan pengaturan"}
          </Button>
        </div>
      </form>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
