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
import {
  db,
  settingsQuery,
  type SiteSettings,
  DEFAULT_ABOUT_TEXT,
  DEFAULT_HERO_SUBTITLE,
  DEFAULT_HERO_TITLE,
} from "@/lib/site-data";
import { THEMES } from "@/components/site/theme-applier";

export const Route = createFileRoute("/admin/pengaturan")({
  component: AdminPengaturan,
});

function AdminPengaturan() {
  const qc = useQueryClient();
  const { data } = useSettings();
  const [form, setForm] = useState<Partial<SiteSettings>>({});

  useEffect(() => {
    if (data) {
      setForm({
        ...data,
        hero_title: data.hero_title?.trim() || DEFAULT_HERO_TITLE,
        hero_subtitle: data.hero_subtitle?.trim() || DEFAULT_HERO_SUBTITLE,
        about_text: data.about_text?.trim() || DEFAULT_ABOUT_TEXT,
      });
    } else {
      setForm({
        hero_title: DEFAULT_HERO_TITLE,
        hero_subtitle: DEFAULT_HERO_SUBTITLE,
        about_text: DEFAULT_ABOUT_TEXT,
      });
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      if (!form.agency_name?.trim()) throw new Error("Nama website wajib diisi.");
      const currentYear = new Date().getFullYear();
      if (
        form.founded_year != null &&
        (!Number.isInteger(form.founded_year) ||
          form.founded_year < 1800 ||
          form.founded_year > currentYear)
      ) {
        throw new Error(`Tahun berdiri harus antara 1800 dan ${currentYear}.`);
      }
      if (
        form.jamaah_count != null &&
        (!Number.isInteger(form.jamaah_count) || form.jamaah_count < 0)
      ) {
        throw new Error("Jumlah jamaah harus berupa bilangan bulat tidak negatif.");
      }
      const theme = form.theme ?? "noir-emas";
      if (!THEMES.some((availableTheme) => availableTheme.value === theme)) {
        throw new Error("Tema tampilan tidak valid. Silakan pilih salah satu tema yang tersedia.");
      }
      const { id, ...rest } = form;
      void id;
      const { error } = await db()
        .from("site_settings")
        .update({
          ...rest,
          theme,
          agency_name: form.agency_name.trim(),
          legal_name: form.legal_name?.trim() || null,
          ppiu_license_number: form.ppiu_license_number?.trim() || null,
          license_text: form.license_text?.trim() || null,
          services: (form.services ?? []).map((item) => item.trim()).filter(Boolean),
          service_areas: (form.service_areas ?? []).map((item) => item.trim()).filter(Boolean),
          whatsapp_number: form.whatsapp_number?.trim() || null,
          whatsapp_template:
            form.whatsapp_template?.trim() ||
            "Assalamu'alaikum, saya ingin bertanya tentang paket {paket}.",
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
          Perubahan tampil di header, footer, favicon, schema situs, dan halaman informasi. Data
          yang belum terverifikasi dapat dikosongkan.
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
            label="Logo resmi perusahaan"
            folder="uploads"
            value={form.logo_url}
            onChange={(value) => field("logo_url", value)}
            aspect="aspect-square"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Logo ini otomatis digunakan di header, favicon, dan structured data situs.
          </p>
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
          label="TikTok"
          value={form.tiktok ?? ""}
          onChange={(value) => field("tiktok", value)}
          placeholder="username atau URL profil"
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
        <Field
          label="Nama badan usaha resmi"
          value={form.legal_name ?? ""}
          onChange={(value) => field("legal_name", value || null)}
          placeholder="Kosongkan sampai nama legal terverifikasi"
        />
        <Field
          label="Nomor izin PPIU/Kemenag"
          value={form.ppiu_license_number ?? ""}
          onChange={(value) => field("ppiu_license_number", value || null)}
          placeholder="Opsional; isi sesuai dokumen resmi"
        />
        <div className="space-y-2">
          <Label htmlFor="founded-year">Tahun berdiri</Label>
          <Input
            id="founded-year"
            type="number"
            min="1800"
            max={new Date().getFullYear()}
            step="1"
            value={form.founded_year ?? ""}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                founded_year: event.target.value ? Number(event.target.value) : null,
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jamaah-count">Jumlah jamaah terlayani (terverifikasi)</Label>
          <Input
            id="jamaah-count"
            type="number"
            min="0"
            step="1"
            value={form.jamaah_count ?? ""}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                jamaah_count: event.target.value ? Number(event.target.value) : null,
              }))
            }
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="services-list">Layanan (satu layanan per baris)</Label>
          <Textarea
            id="services-list"
            rows={3}
            value={(form.services ?? []).join("\n")}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                services: event.target.value
                  .split(/\r?\n/)
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="Isi hanya layanan yang benar-benar tersedia"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="service-areas-list">Wilayah layanan (satu wilayah per baris)</Label>
          <Textarea
            id="service-areas-list"
            rows={3}
            value={(form.service_areas ?? []).join("\n")}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                service_areas: event.target.value
                  .split(/\r?\n/)
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="Isi wilayah yang dapat dilayani dan diverifikasi"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Alamat kantor</Label>
          <Textarea
            rows={2}
            value={form.address ?? ""}
            onChange={(event) => field("address", event.target.value)}
          />
        </div>
        <Field
          label="Kode pos kantor"
          value={form.postal_code ?? ""}
          onChange={(value) => field("postal_code", value)}
          placeholder="Contoh: 12830"
        />
        <Field
          label="Google Maps URL"
          value={form.google_maps_url ?? ""}
          onChange={(value) => field("google_maps_url", value)}
          placeholder="https://maps.google.com/?q=..."
        />
        <Field
          label="Latitude kantor"
          value={form.latitude == null ? "" : String(form.latitude)}
          onChange={(value) =>
            setForm((previous) => ({ ...previous, latitude: value ? Number(value) : null }))
          }
          placeholder="Isi hanya jika terverifikasi"
        />
        <Field
          label="Longitude kantor"
          value={form.longitude == null ? "" : String(form.longitude)}
          onChange={(value) =>
            setForm((previous) => ({ ...previous, longitude: value ? Number(value) : null }))
          }
          placeholder="Isi hanya jika terverifikasi"
        />
        <div className="space-y-2 md:col-span-2">
          <Label>Judul hero beranda</Label>
          <Input
            value={form.hero_title ?? ""}
            onChange={(event) => field("hero_title", event.target.value)}
            placeholder={DEFAULT_HERO_TITLE}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Subjudul hero beranda</Label>
          <Textarea
            rows={3}
            value={form.hero_subtitle ?? ""}
            onChange={(event) => field("hero_subtitle", event.target.value)}
            placeholder={DEFAULT_HERO_SUBTITLE}
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
            placeholder={DEFAULT_ABOUT_TEXT}
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
