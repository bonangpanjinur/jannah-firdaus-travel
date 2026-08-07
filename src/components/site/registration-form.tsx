import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db, type Paket } from "@/lib/site-data";

const phoneRe = /^[0-9+][0-9\s-]{7,19}$/;

export function RegistrationForm({ paket }: { paket: Paket }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    preferred_date: paket.departure_date ?? "",
    notes: "",
  });
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    const name = form.name.trim();
    const phone = form.phone.trim();
    if (name.length < 3 || name.length > 100) {
      toast.error("Nama minimal 3 karakter.");
      return;
    }
    if (!phoneRe.test(phone)) {
      toast.error("Nomor WhatsApp tidak valid.");
      return;
    }
    if (form.notes.length > 500) {
      toast.error("Catatan maksimal 500 karakter.");
      return;
    }
    setSending(true);
    const { error } = await db().from("registrations").insert({
      package_id: paket.id,
      package_name: paket.name,
      name,
      phone,
      preferred_date: form.preferred_date || null,
      notes: form.notes.trim() || null,
    });
    setSending(false);
    if (error) {
      toast.error("Pendaftaran gagal dikirim. Coba lagi ya.");
      return;
    }
    toast.success("Pendaftaran terkirim! Tim kami akan menghubungi Anda via WhatsApp.");
    setForm({ name: "", phone: "", preferred_date: paket.departure_date ?? "", notes: "" });
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reg-name">Nama lengkap</Label>
        <Input
          id="reg-name"
          required
          maxLength={100}
          placeholder="Nama sesuai paspor"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-date">Tanggal keberangkatan pilihan</Label>
        <Input
          id="reg-date"
          type="date"
          value={form.preferred_date}
          onChange={(e) => setForm((f) => ({ ...f, preferred_date: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-phone">Nomor WhatsApp</Label>
        <Input
          id="reg-phone"
          required
          inputMode="tel"
          maxLength={20}
          placeholder="08xxxxxxxxxx"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reg-notes">Catatan (opsional)</Label>
        <Textarea
          id="reg-notes"
          rows={3}
          maxLength={500}
          placeholder="Jumlah jamaah, tipe kamar, atau pertanyaan lain"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
      </div>
      <Button type="submit" className="w-full" disabled={sending}>
        {sending ? "Mengirim…" : "Kirim pendaftaran"}
      </Button>
    </form>
  );
}