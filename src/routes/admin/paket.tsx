import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { db, packagesQuery, type Paket } from "@/lib/site-data";
import { ImageUpload } from "@/components/admin/image-upload";
import { absoluteMediaUrl, deleteMedia, isStoragePath } from "@/lib/storage";
import { StorageImage } from "@/components/site/storage-image";

export const Route = createFileRoute("/admin/paket")({
  component: AdminPaket,
});

type Draft = Partial<Paket>;

const empty: Draft = {
  name: "",
  slug: "",
  description: "",
  flyer_url: "",
  airline: "",
  hotel_makkah: "",
  hotel_makkah_stars: null,
  hotel_madinah: "",
  hotel_madinah_stars: null,
  includes: [],
  excludes: [],
  requirements: [],
  is_published: true,
  is_featured: false,
  sort_order: 0,
};

const PRESET_INCLUDES = [
  "Tiket pesawat PP",
  "Visa umroh",
  "Hotel Makkah & Madinah",
  "Makan 3x sehari",
  "Bus AC selama di Saudi",
  "Muthawwif berbahasa Indonesia",
  "Perlengkapan umroh",
  "Air zamzam 5 liter",
  "Manasik umroh",
];
const PRESET_EXCLUDES = [
  "Paspor",
  "Vaksin meningitis",
  "Suntik/tes kesehatan",
  "Kelebihan bagasi",
  "Pengeluaran pribadi",
  "Tour tambahan",
];
const PRESET_REQUIREMENTS = [
  "Paspor berlaku minimal 8 bulan",
  "Nama paspor minimal 3 suku kata",
  "Kartu keluarga & KTP",
  "Pas foto latar putih",
  "Buku vaksin meningitis",
  "Surat mahram (jika diperlukan)",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type DraftErrors = Partial<Record<keyof Paket | "prices", string>>;

function validateDraft(value: Draft): DraftErrors {
  const errors: DraftErrors = {};

  if (
    value.duration_days !== null &&
    value.duration_days !== undefined &&
    (!Number.isInteger(value.duration_days) || value.duration_days < 1)
  ) {
    errors.duration_days = "Durasi harus berupa angka bulat minimal 1 hari.";
  }

  if (
    value.quota !== null &&
    value.quota !== undefined &&
    (!Number.isInteger(value.quota) || value.quota < 0)
  ) {
    errors.quota = "Kuota harus berupa angka bulat dan tidak boleh negatif.";
  }

  for (const [key, stars] of [
    ["hotel_makkah_stars", value.hotel_makkah_stars],
    ["hotel_madinah_stars", value.hotel_madinah_stars],
  ] as const) {
    if (
      stars !== null &&
      stars !== undefined &&
      (!Number.isInteger(stars) || stars < 1 || stars > 5)
    ) {
      errors[key] = "Rating hotel harus antara 1 sampai 5 bintang.";
    }
  }

  for (const [key, price] of [
    ["price_quad", value.price_quad],
    ["price_triple", value.price_triple],
    ["price_double", value.price_double],
  ] as const) {
    if (price !== null && price !== undefined && (!Number.isFinite(price) || price < 0)) {
      errors[key] = "Harga harus berupa angka dan tidak boleh negatif.";
    }
  }

  return errors;
}

function firstValidationError(errors: DraftErrors) {
  return Object.values(errors)[0] ?? null;
}

function AdminPaket() {
  const qc = useQueryClient();
  const query = packagesQuery({ includeDrafts: true });
  const { data: packages = [], isLoading } = useQuery(query);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const savedView = window.localStorage.getItem("admin-paket-view");
    if (savedView === "grid" || savedView === "list") setViewMode(savedView);
  }, []);

  function changeViewMode(mode: "list" | "grid") {
    setViewMode(mode);
    window.localStorage.setItem("admin-paket-view", mode);
  }

  const save = useMutation({
    mutationFn: async (value: Draft) => {
      const validationErrors = validateDraft(value);
      const validationError = firstValidationError(validationErrors);
      if (validationError) throw new Error(validationError);
      const payload = {
        ...value,
        name: value.name?.trim(),
        slug: value.slug?.trim() || slugify(value.name ?? ""),
        flyer_url: value.flyer_url || null,
        description: value.description?.trim() || null,
      };
      const { id, ...rest } = payload;
      const response = id
        ? await db().from("packages").update(rest).eq("id", id)
        : await db().from("packages").insert(rest);
      if (response.error) throw response.error;
    },
    onSuccess: () => {
      toast.success("Paket tersimpan");
      setDraft(null);
      qc.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (paket: Paket) => {
      const { data: images, error: imageError } = await db()
        .from("package_images")
        .select("image_url")
        .eq("package_id", paket.id);
      if (imageError) throw imageError;
      const { error } = await db().from("packages").delete().eq("id", paket.id);
      if (error) throw error;
      const paths = [
        paket.flyer_url,
        ...(images ?? []).map((image: { image_url: string }) => image.image_url),
      ].filter(isStoragePath);
      await Promise.all(paths.map((path) => deleteMedia(path).catch(() => undefined)));
    },
    onSuccess: () => {
      toast.success("Paket dihapus");
      qc.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function field(key: keyof Paket, value: unknown) {
    setDraft((previous) => ({ ...(previous ?? {}), [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function validateAndSave(value: Draft) {
    const nextErrors = validateDraft(value);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error(`${Object.keys(nextErrors).length} field perlu diperbaiki.`);
      return;
    }
    save.mutate(value);
  }

  /** Nama paket otomatis mengisi slug selama admin belum mengubah slug secara manual. */
  function changeName(value: string) {
    setDraft((previous) => {
      const current = previous ?? {};
      const autoSlug =
        !current.id && (!current.slug || current.slug === slugify(current.name ?? ""));
      return { ...current, name: value, slug: autoSlug ? slugify(value) : (current.slug ?? "") };
    });
  }

  function duplicate(paket: Paket) {
    const { id, created_at, updated_at, ...rest } = paket as Paket & {
      created_at?: string;
      updated_at?: string;
    };
    void id;
    void created_at;
    void updated_at;
    setErrors({});
    setDraft({
      ...rest,
      name: `${paket.name} (Salinan)`,
      slug: `${paket.slug}-salinan`,
      is_published: false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info("Salinan paket dibuat. Ubah tanggal & harga lalu simpan.");
  }

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Konten utama</p>
          <h1 className="mt-1 font-display text-3xl">
            {draft ? (draft.id ? "Edit Paket" : "Tambah Paket") : "Kelola Paket"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {draft
              ? "Lengkapi informasi paket secara bertahap. Anda dapat menyimpan sebagai draf sebelum data siap ditayangkan."
              : "Isi paket seperti mengisi produk: flyer, deskripsi, pesawat, hotel, harga. Kolom kosong otomatis disembunyikan di halaman publik."}
          </p>
        </div>
        {!draft ? (
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <a href="/admin/paket/import">Import CSV + ZIP</a>
            </Button>
            <Button
              onClick={() => {
                setErrors({});
                setDraft({ ...empty });
              }}
            >
              Tambah paket
            </Button>
          </div>
        ) : null}
      </div>

      {!draft ? (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{packages.length} paket tersedia</p>
          <div
            className="inline-flex rounded-xl border border-border bg-card p-1 shadow-sm"
            role="group"
            aria-label="Pilih tampilan paket"
          >
            <button
              type="button"
              aria-pressed={viewMode === "list"}
              onClick={() => changeViewMode("list")}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              List
            </button>
            <button
              type="button"
              aria-pressed={viewMode === "grid"}
              onClick={() => changeViewMode("grid")}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              Grid
            </button>
          </div>
        </div>
      ) : null}

      {draft ? (
        <>
          <div className="sticky top-3 z-20 mt-6 rounded-2xl border border-border bg-background/95 p-3 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button type="button" variant="ghost" onClick={() => setDraft(null)}>
                ← Kembali ke daftar
              </Button>
              <div className="flex flex-wrap gap-2">
                <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                  Batal
                </Button>
                <Button
                  type="button"
                  disabled={save.isPending}
                  onClick={() => validateAndSave(draft)}
                >
                  {save.isPending ? "Menyimpan…" : "Simpan paket"}
                </Button>
              </div>
            </div>
            <nav
              className="mt-3 -mx-1 flex gap-1 overflow-x-auto px-1 pb-1 text-xs"
              aria-label="Navigasi bagian formulir"
            >
              {[
                "Informasi dasar",
                "Keberangkatan",
                "Hotel",
                "Harga",
                "Fasilitas",
                "Penayangan",
              ].map((label, index) => (
                <a
                  key={label}
                  href={`#paket-section-${index + 1}`}
                  className="shrink-0 rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
                >
                  {index + 1}. {label}
                </a>
              ))}
            </nav>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              validateAndSave(draft);
            }}
            className="space-y-6"
          >
            {Object.keys(errors).length ? (
              <div
                role="alert"
                className="rounded-2xl border border-destructive/40 bg-destructive/5 p-4 text-sm"
              >
                <p className="font-semibold text-destructive">
                  Periksa format {Object.keys(errors).length} field sebelum menyimpan.
                </p>
                <ul className="mt-2 grid gap-1 text-muted-foreground sm:grid-cols-2">
                  {Object.entries(errors).map(([key, message]) => (
                    <li key={key}>
                      <a
                        className="underline decoration-destructive/40 underline-offset-2"
                        href={`#field-${key}`}
                      >
                        {message}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Section
              id="paket-section-1"
              title="1. Informasi dasar"
              hint="Nama paket dan flyer adalah yang pertama dilihat calon jamaah."
            >
              <Text
                id="field-name"
                label="Nama paket"
                error={errors.name}
                placeholder="Umroh Reguler 12 Hari Februari"
                value={draft.name ?? ""}
                onChange={changeName}
              />
              <Text
                id="field-slug"
                label="Slug (URL)"
                error={errors.slug}
                placeholder="umroh-reguler-12-hari-februari"
                value={draft.slug ?? ""}
                onChange={(value) => field("slug", slugify(value))}
              />
              <div id="field-flyer_url" className="md:col-span-2">
                <ImageUpload
                  label="Foto flyer paket"
                  folder="flyers"
                  value={draft.flyer_url}
                  onChange={(value) => field("flyer_url", value)}
                />
                <FieldError message={errors.flyer_url} />
              </div>
              <div id="field-description" className="space-y-2 md:col-span-2">
                <Label>Deskripsi singkat</Label>
                <Textarea
                  rows={3}
                  placeholder="Umroh 12 hari bersama pembimbing berpengalaman, hotel dekat Masjidil Haram, dan city tour Thaif."
                  value={draft.description ?? ""}
                  aria-invalid={Boolean(errors.description)}
                  onChange={(event) => field("description", event.target.value)}
                />
                <FieldError message={errors.description} />
              </div>
            </Section>

            <Section
              id="paket-section-2"
              title="2. Keberangkatan & pesawat"
              hint="Tanggal dan maskapai membantu jamaah membandingkan paket."
            >
              <Text
                id="field-departure_date"
                label="Tanggal keberangkatan"
                error={errors.departure_date}
                type="date"
                value={draft.departure_date ?? ""}
                onChange={(value) => field("departure_date", value || null)}
              />
              <Text
                id="field-duration_days"
                label="Durasi (hari)"
                error={errors.duration_days}
                type="number"
                placeholder="12"
                value={String(draft.duration_days ?? "")}
                onChange={(value) => field("duration_days", value ? Number(value) : null)}
              />
              <Text
                id="field-airline"
                label="Maskapai"
                error={errors.airline}
                placeholder="Saudia Airlines"
                value={draft.airline ?? ""}
                onChange={(value) => field("airline", value)}
              />
              <Text
                id="field-quota"
                label="Kuota jamaah"
                error={errors.quota}
                type="number"
                placeholder="45"
                value={String(draft.quota ?? "")}
                onChange={(value) => field("quota", value ? Number(value) : null)}
              />
            </Section>

            <Section
              id="paket-section-3"
              title="3. Hotel"
              hint="Tulis nama hotel dan bintangnya (1-5)."
            >
              <Text
                id="field-hotel_makkah"
                label="Hotel Makkah"
                error={errors.hotel_makkah}
                placeholder="Hilton Suites Makkah"
                value={draft.hotel_makkah ?? ""}
                onChange={(value) => field("hotel_makkah", value)}
              />
              <Text
                id="field-hotel_makkah_stars"
                label="Bintang Makkah"
                error={errors.hotel_makkah_stars}
                type="number"
                min="1"
                max="5"
                placeholder="5"
                value={String(draft.hotel_makkah_stars ?? "")}
                onChange={(value) => field("hotel_makkah_stars", value ? Number(value) : null)}
              />
              <Text
                id="field-hotel_madinah"
                label="Hotel Madinah"
                error={errors.hotel_madinah}
                placeholder="Frontel Al Harithia"
                value={draft.hotel_madinah ?? ""}
                onChange={(value) => field("hotel_madinah", value)}
              />
              <Text
                id="field-hotel_madinah_stars"
                label="Bintang Madinah"
                error={errors.hotel_madinah_stars}
                type="number"
                min="1"
                max="5"
                placeholder="4"
                value={String(draft.hotel_madinah_stars ?? "")}
                onChange={(value) => field("hotel_madinah_stars", value ? Number(value) : null)}
              />
            </Section>

            <Section
              id="paket-section-4"
              title="4. Harga per jamaah"
              hint="Isi dalam rupiah tanpa titik, contoh: 32500000. Kosongkan bila tidak ditawarkan."
            >
              <Text
                id="field-price_quad"
                label="Harga quad (sekamar 4)"
                error={errors["price_quad"] ?? errors.prices}
                type="number"
                placeholder="32500000"
                value={String(draft.price_quad ?? "")}
                onChange={(value) => field("price_quad", value ? Number(value) : null)}
              />
              <Text
                id="field-price_triple"
                label="Harga triple (sekamar 3)"
                error={errors["price_triple"] ?? errors.prices}
                type="number"
                placeholder="34500000"
                value={String(draft.price_triple ?? "")}
                onChange={(value) => field("price_triple", value ? Number(value) : null)}
              />
              <Text
                id="field-price_double"
                label="Harga double (sekamar 2)"
                error={errors["price_double"] ?? errors.prices}
                type="number"
                placeholder="37500000"
                value={String(draft.price_double ?? "")}
                onChange={(value) => field("price_double", value ? Number(value) : null)}
              />
            </Section>

            <Section
              id="paket-section-5"
              title="5. Fasilitas & syarat"
              hint="Klik tombol isian cepat, lalu sunting sesuai paket Anda."
            >
              <ListField
                id="field-includes"
                label="Termasuk"
                value={draft.includes ?? []}
                error={errors["includes"]}
                presets={PRESET_INCLUDES}
                onChange={(value) => field("includes", value)}
              />
              <ListField
                id="field-excludes"
                label="Tidak termasuk"
                value={draft.excludes ?? []}
                error={errors["excludes"]}
                presets={PRESET_EXCLUDES}
                onChange={(value) => field("excludes", value)}
              />
              <ListField
                id="field-requirements"
                label="Persyaratan"
                value={draft.requirements ?? []}
                error={errors["requirements"]}
                presets={PRESET_REQUIREMENTS}
                onChange={(value) => field("requirements", value)}
              />
            </Section>

            <Section
              id="paket-section-6"
              title="6. Penayangan"
              hint="Simpan sebagai draf dulu bila data belum lengkap."
            >
              <div className="flex flex-wrap items-center gap-6 md:col-span-2">
                <label className="flex items-center gap-2 text-sm">
                  <Switch
                    checked={draft.is_published ?? true}
                    onCheckedChange={(value) => field("is_published", value)}
                  />
                  Tayangkan di website
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Switch
                    checked={draft.is_featured ?? false}
                    onCheckedChange={(value) => field("is_featured", value)}
                  />
                  Tampilkan sebagai unggulan
                </label>
              </div>
              <Text
                label="Urutan tampil"
                type="number"
                value={String(draft.sort_order ?? 0)}
                onChange={(value) => field("sort_order", value ? Number(value) : 0)}
              />
            </Section>

            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={save.isPending}>
                {save.isPending ? "Menyimpan…" : "Simpan paket"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setDraft(null)}>
                Batal
              </Button>
            </div>
          </form>
        </>
      ) : null}

      {!draft && isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Memuat…</p>
      ) : !draft && packages.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Belum ada paket. Klik “Tambah paket” untuk membuat paket umroh pertama Anda.
        </p>
      ) : !draft ? (
        <ul
          className={
            viewMode === "grid" ? "mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" : "mt-8 space-y-3"
          }
        >
          {packages.map((paket) => (
            <li
              key={paket.id}
              className={
                viewMode === "grid"
                  ? "rounded-2xl border border-border bg-card p-4 shadow-soft"
                  : "flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5"
              }
            >
              <div className={viewMode === "grid" ? "min-w-0" : "flex min-w-0 items-center gap-4"}>
                <div
                  className={
                    viewMode === "grid"
                      ? "mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted"
                      : "size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:size-24"
                  }
                >
                  {paket.flyer_url && absoluteMediaUrl(paket.flyer_url) ? (
                    <button
                      type="button"
                      className="group relative block size-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                      onClick={() =>
                        setPreview({
                          src: absoluteMediaUrl(paket.flyer_url)!,
                          alt: `Preview foto paket ${paket.name}`,
                        })
                      }
                      aria-label={`Preview foto paket ${paket.name}`}
                    >
                      <StorageImage
                        src={paket.flyer_url}
                        alt={`Foto paket ${paket.name}`}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <span className="absolute inset-x-1 bottom-1 rounded-md bg-black/60 px-1.5 py-1 text-center text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        Klik untuk preview
                      </span>
                    </button>
                  ) : (
                    <div className="flex size-full items-center justify-center px-2 text-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      Foto belum tersedia
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{paket.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatTanggal(paket.departure_date)} • {paket.airline ?? "-"} •{" "}
                    {formatRupiah(paket.price_quad)}
                    {paket.is_published ? "" : " • draf"}
                  </p>
                </div>
              </div>
              <div
                className={
                  viewMode === "grid" ? "mt-4 flex flex-wrap gap-2" : "flex flex-wrap gap-2"
                }
              >
                <Button asChild size="sm" variant="secondary">
                  <Link to="/admin/paket/$id" params={{ id: paket.id }}>
                    Itinerary & galeri
                  </Link>
                </Button>
                <Button size="sm" variant="outline" onClick={() => setDraft(paket)}>
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => duplicate(paket)}>
                  Duplikat
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Hapus paket ${paket.name}? Data itinerary, galeri, dan file terkait juga akan dibersihkan.`,
                      )
                    )
                      remove.mutate(paket);
                  }}
                >
                  Hapus
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <Dialog open={Boolean(preview)} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-w-4xl overflow-hidden p-2 sm:p-3">
          {preview ? (
            <img
              src={preview.src}
              alt={preview.alt}
              className="max-h-[80vh] w-full rounded-xl object-contain"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Section({
  id,
  title,
  hint,
  children,
}: {
  id?: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-36 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6"
    >
      <h2 className="font-display text-lg">{title}</h2>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Text({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  min,
  max,
  placeholder,
  error,
}: {
  id?: string | undefined;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  min?: string;
  max?: string;
  placeholder?: string;
  error?: string | undefined;
}) {
  return (
    <div id={id} className="space-y-2">
      <Label>
        {label} {required ? <span className="text-destructive">*</span> : null}
      </Label>
      <Input
        type={type}
        min={min ?? (type === "number" ? "0" : undefined)}
        max={max}
        value={value}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? "border-destructive focus-visible:ring-destructive" : undefined}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldError id={error ? `${id}-error` : undefined} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id?: string | undefined; message?: string | undefined }) {
  return message ? (
    <p id={id} className="text-xs font-medium text-destructive">
      {message}
    </p>
  ) : null;
}

function ListField({
  id,
  label,
  value,
  presets = [],
  onChange,
  error,
}: {
  id?: string | undefined;
  label: string;
  value: string[];
  presets?: string[];
  onChange: (value: string[]) => void;
  error?: string | undefined;
}) {
  return (
    <div id={id} className="space-y-2 md:col-span-2">
      <Label>{label} (satu baris satu item)</Label>
      {presets.length ? (
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => {
            const active = value.includes(preset);
            return (
              <button
                key={preset}
                type="button"
                onClick={() =>
                  onChange(active ? value.filter((item) => item !== preset) : [...value, preset])
                }
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${active ? "border-gold bg-accent/50 text-foreground" : "border-border text-muted-foreground hover:border-gold/50"}`}
              >
                {active ? "✓ " : "+ "}
                {preset}
              </button>
            );
          })}
        </div>
      ) : null}
      <Textarea
        rows={4}
        value={value.join("\n")}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? "border-destructive focus-visible:ring-destructive" : undefined}
        onChange={(event) =>
          onChange(
            event.target.value
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          )
        }
      />
      <FieldError id={error ? `${id}-error` : undefined} message={error} />
    </div>
  );
}
