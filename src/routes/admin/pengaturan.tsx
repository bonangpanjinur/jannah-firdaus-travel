import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSettings } from "@/hooks/use-site";
import { db, settingsQuery, type SiteSettings } from "@/lib/site-data";

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
      const { id, ...rest } = form;
      void id;
      const { error } = await db().from("site_settings").update(rest).eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pengaturan tersimpan");
      qc.invalidateQueries({ queryKey: settingsQuery.queryKey });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function field(key: keyof SiteSettings, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <main className="p-6 md:p-10">
      <h1 className="font-display text-3xl">Pengaturan Website</h1>
      <form
        onSubmit={(e) => { e.preventDefault(); save.mutate(); }}
        className="mt-6 grid max-w-4xl gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-2"
      >
        <Field label="Nama agen" value={form.agency_name ?? ""} onChange={(v) => field("agency_name", v)} />
        <Field label="Tagline" value={form.tagline ?? ""} onChange={(v) => field("tagline", v)} />
        <Field
          label="Nomor WhatsApp utama"
          value={form.whatsapp_number ?? ""}
          onChange={(v) => field("whatsapp_number", v)}
        />
        <Field label="Email" value={form.email ?? ""} onChange={(v) => field("email", v)} />
        <Field label="Instagram" value={form.instagram ?? ""} onChange={(v) => field("instagram", v)} />
        <Field label="Facebook" value={form.facebook ?? ""} onChange={(v) => field("facebook", v)} />
        <Field label="Legalitas" value={form.license_text ?? ""} onChange={(v) => field("license_text", v)} />
        <Field label="Alamat" value={form.address ?? ""} onChange={(v) => field("address", v)} />
        <div className="space-y-2 md:col-span-2">
          <Label>Template pesan WhatsApp (gunakan {"{paket}"})</Label>
          <Textarea
            rows={2}
            value={form.whatsapp_template ?? ""}
            onChange={(e) => field("whatsapp_template", e.target.value)}
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Tentang kami</Label>
          <Textarea rows={4} value={form.about_text ?? ""} onChange={(e) => field("about_text", e.target.value)} />
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}