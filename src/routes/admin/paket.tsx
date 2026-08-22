import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Download, Printer, Search, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { adminPackagesQuery, db, type Paket } from "@/lib/site-data";
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

const PACKAGE_PAGE_SIZE = 9;
const PACKAGE_DRAFT_KEY = "admin-paket-draft";

function draftStorageKey(id?: string) {
  return id ? `${PACKAGE_DRAFT_KEY}-${id}` : `${PACKAGE_DRAFT_KEY}-new`;
}

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
  const [draft, setDraft] = useState<Draft | null>(null);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"order" | "name" | "departure" | "price">("order");
  const [page, setPage] = useState(1);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);
  const query = adminPackagesQuery({
    page,
    pageSize: PACKAGE_PAGE_SIZE,
    search,
    status: statusFilter,
    sort: sortBy,
  });
  const { data: packageResult = { items: [], total: 0 }, isLoading } = useQuery(query);
  const packages = packageResult.items;
  const totalPackages = packageResult.total;

  useEffect(() => {
    const savedView = window.localStorage.getItem("admin-paket-view");
    if (savedView === "grid" || savedView === "list") setViewMode(savedView);
  }, []);

  function changeViewMode(mode: "list" | "grid") {
    setViewMode(mode);
    window.localStorage.setItem("admin-paket-view", mode);
  }

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, sortBy]);

  useEffect(() => {
    if (!draft) return;
    window.localStorage.setItem(draftStorageKey(draft.id), JSON.stringify(draft));
    setLastSavedAt(Date.now());
  }, [draft]);

  const normalizedSearch = search.trim().toLowerCase();
  const pageCount = Math.max(1, Math.ceil(totalPackages / PACKAGE_PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visiblePackages = packages;

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
    onSuccess: (_data, variables) => {
      toast.success("Paket tersimpan");
      window.localStorage.removeItem(draftStorageKey(variables.id));
      setDraft(null);
      setLastSavedAt(null);
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
      qc.invalidateQueries({ queryKey: ["admin-packages"] });
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
                const saved = window.localStorage.getItem(draftStorageKey());
                if (saved) {
                  try {
                    setDraft(JSON.parse(saved) as Draft);
                    toast.info("Draft lokal dipulihkan");
                    return;
                  } catch {
                    window.localStorage.removeItem(draftStorageKey());
                  }
                }
                setDraft({ ...empty });
              }}
            >
              Tambah paket
            </Button>
          </div>
        ) : null}
      </div>

      {!draft ? (
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari nama atau slug paket…"
              aria-label="Cari paket berdasarkan nama atau slug"
              className="pl-9 pr-9"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Hapus pencarian"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="package-status-filter">
                Filter status paket
              </label>
              <select
                id="package-status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
                className="h-10 rounded-lg border border-border bg-card px-3 text-sm"
              >
                <option value="all">Semua status</option>
                <option value="published">Aktif</option>
                <option value="draft">Draf</option>
              </select>
              <label className="sr-only" htmlFor="package-sort">
                Urutkan paket
              </label>
              <select
                id="package-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
                className="h-10 rounded-lg border border-border bg-card px-3 text-sm"
              >
                <option value="order">Urutan tampil</option>
                <option value="name">Nama A–Z</option>
                <option value="departure">Keberangkatan terdekat</option>
                <option value="price">Harga terendah</option>
              </select>
            </div>
            <p className="text-sm text-muted-foreground">
              {normalizedSearch
                ? `${totalPackages} paket ditemukan`
                : `${totalPackages} paket tersedia`}
            </p>
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
        </div>
      ) : null}

      {draft ? (
        <>
          <div className="sticky top-3 z-20 mt-6 rounded-2xl border border-border bg-background/95 p-3 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  window.localStorage.removeItem(draftStorageKey(draft.id));
                  setLastSavedAt(null);
                  setDraft(null);
                }}
              >
                ← Kembali ke daftar
              </Button>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    window.localStorage.removeItem(draftStorageKey(draft.id));
                    setLastSavedAt(null);
                    setDraft(null);
                  }}
                >
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
            {draft ? <DraftProgress draft={draft} lastSavedAt={lastSavedAt} /> : null}
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
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  window.localStorage.removeItem(draftStorageKey(draft.id));
                  setLastSavedAt(null);
                  setDraft(null);
                }}
              >
                Batal
              </Button>
            </div>
          </form>
        </>
      ) : null}

      {!draft && isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Memuat…</p>
      ) : !draft && totalPackages === 0 && !normalizedSearch && statusFilter === "all" ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Belum ada paket. Klik “Tambah paket” untuk membuat paket umroh pertama Anda.
        </p>
      ) : !draft && totalPackages === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Tidak ada paket yang sesuai dengan pencarian atau filter saat ini.
        </p>
      ) : !draft ? (
        <ul
          className={
            viewMode === "grid" ? "mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" : "mt-8 space-y-3"
          }
        >
          {visiblePackages.map((paket) => (
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
                  variant="outline"
                  onClick={() => downloadPackageSummary(paket)}
                  aria-label={`Unduh ringkasan ${paket.name}`}
                >
                  <Download className="size-4" /> Unduh
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => printPackageSummary(paket)}
                  aria-label={`Cetak ringkasan ${paket.name}`}
                >
                  <Printer className="size-4" /> Cetak
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

      {!draft && totalPackages > PACKAGE_PAGE_SIZE ? (
        <nav
          className="mt-6 flex flex-wrap items-center justify-between gap-3"
          aria-label="Pagination paket"
        >
          <p className="text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * PACKAGE_PAGE_SIZE + 1}–
            {Math.min(currentPage * PACKAGE_PAGE_SIZE, totalPackages)} dari {totalPackages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="size-4" /> Sebelumnya
            </Button>
            <span className="min-w-20 text-center text-sm text-muted-foreground">
              Halaman {currentPage} / {pageCount}
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={currentPage === pageCount}
              onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
              aria-label="Halaman berikutnya"
            >
              Berikutnya <ChevronRight className="size-4" />
            </Button>
          </div>
        </nav>
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

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function summaryList(title: string, items: string[] | null | undefined) {
  const cleaned = (items ?? []).map((item) => item.trim()).filter(Boolean);
  if (!cleaned.length) return "";
  return `<section><h2>${escapeHtml(title)}</h2><ul>${cleaned.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`;
}

function packageSummaryHtml(paket: Paket) {
  const flyer = absoluteMediaUrl(paket.flyer_url);
  const prices = (
    [
      ["Quad", paket.price_quad],
      ["Triple", paket.price_triple],
      ["Double", paket.price_double],
    ] as Array<[string, number | null | undefined]>
  ).filter(([, price]) => price !== null && price !== undefined && price > 0);

  return `<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(paket.name || "Ringkasan Paket")}</title>
<style>
  :root { color-scheme: light; font-family: Arial, Helvetica, sans-serif; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f4f8f5; color: #17241f; }
  .page { max-width: 900px; margin: 0 auto; padding: 32px; }
  .header { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; border-bottom: 3px solid #0d8b61; padding-bottom: 20px; }
  .brand { color: #0d8b61; font-size: 14px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
  h1 { margin: 8px 0 0; font-size: 30px; line-height: 1.15; }
  .meta { margin-top: 10px; color: #5a6a63; font-size: 14px; line-height: 1.6; }
  .hero { display: grid; grid-template-columns: 220px 1fr; gap: 24px; margin-top: 24px; }
  .flyer { width: 220px; max-height: 300px; border-radius: 14px; object-fit: cover; border: 1px solid #d5e3dc; }
  .placeholder { display: grid; place-items: center; min-height: 180px; border: 1px dashed #a9bdb3; border-radius: 14px; color: #718178; text-align: center; padding: 16px; }
  .description { font-size: 16px; line-height: 1.7; white-space: pre-wrap; }
  .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 24px; }
  .fact, section { border: 1px solid #d5e3dc; border-radius: 12px; background: #fff; padding: 16px; }
  .fact strong { display: block; margin-bottom: 5px; color: #0d8b61; font-size: 12px; text-transform: uppercase; letter-spacing: .05em; }
  .fact span { font-size: 15px; }
  section { margin-top: 16px; }
  h2 { margin: 0 0 10px; font-size: 17px; }
  ul { margin: 0; padding-left: 20px; line-height: 1.7; }
  .price { display: flex; justify-content: space-between; gap: 16px; padding: 8px 0; border-bottom: 1px solid #edf2ef; }
  .price:last-child { border-bottom: 0; }
  .footer { margin-top: 28px; padding-top: 16px; border-top: 1px solid #d5e3dc; color: #718178; font-size: 12px; }
  @media (max-width: 600px) { .page { padding: 20px 16px; } .header, .hero { grid-template-columns: 1fr; display: grid; } .flyer { width: 100%; max-height: 420px; } .grid { grid-template-columns: 1fr; } }
  @media print { body { background: #fff; } .page { padding: 0; } }
</style>
</head>
<body>
<main class="page">
  <header class="header"><div><div class="brand">Jannah Firdaus Tour Travel</div><h1>${escapeHtml(paket.name || "Ringkasan Paket Wisata")}</h1><div class="meta">${paket.is_published ? "Paket aktif" : "Draft"}</div></div><div class="meta">${escapeHtml(paket.slug || "")}</div></header>
  <div class="hero">${flyer ? `<img class="flyer" src="${escapeHtml(flyer)}" alt="Flyer ${escapeHtml(paket.name)}" />` : `<div class="placeholder">Foto flyer belum tersedia</div>`}<div class="description">${escapeHtml(paket.description || "Belum ada deskripsi paket.")}</div></div>
  <div class="grid">
    <div class="fact"><strong>Keberangkatan</strong><span>${escapeHtml(formatTanggal(paket.departure_date))}</span></div>
    <div class="fact"><strong>Durasi</strong><span>${paket.duration_days ? `${escapeHtml(paket.duration_days)} hari` : "Belum diisi"}</span></div>
    <div class="fact"><strong>Maskapai</strong><span>${escapeHtml(paket.airline || "Belum diisi")}</span></div>
    <div class="fact"><strong>Kuota</strong><span>${paket.quota ? `${escapeHtml(paket.quota)} jamaah` : "Belum diisi"}</span></div>
    <div class="fact"><strong>Hotel Makkah</strong><span>${escapeHtml(paket.hotel_makkah || "Belum diisi")} ${paket.hotel_makkah_stars ? `· ${escapeHtml(paket.hotel_makkah_stars)} bintang` : ""}</span></div>
    <div class="fact"><strong>Hotel Madinah</strong><span>${escapeHtml(paket.hotel_madinah || "Belum diisi")} ${paket.hotel_madinah_stars ? `· ${escapeHtml(paket.hotel_madinah_stars)} bintang` : ""}</span></div>
  </div>
  ${prices.length ? `<section><h2>Harga paket</h2>${prices.map(([room, price]) => `<div class="price"><span>${escapeHtml(room)}</span><strong>${escapeHtml(formatRupiah(price as number))}</strong></div>`).join("")}</section>` : ""}
  ${summaryList("Termasuk", paket.includes)}
  ${summaryList("Tidak termasuk", paket.excludes)}
  ${summaryList("Persyaratan", paket.requirements)}
  <footer class="footer">Ringkasan ini dibuat dari data panel admin dan dapat diperbarui sewaktu-waktu. Hubungi Jannah Firdaus Tour Travel untuk konfirmasi ketersediaan dan harga terbaru.</footer>
</main>
</body>
</html>`;
}

function downloadPackageSummary(paket: Paket) {
  const blob = new Blob([packageSummaryHtml(paket)], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${paket.slug || "ringkasan-paket"}.html`;
  link.click();
  URL.revokeObjectURL(url);
  toast.success("Ringkasan paket berhasil diunduh");
}

function printPackageSummary(paket: Paket) {
  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) {
    toast.error("Popup diblokir browser. Izinkan popup untuk mencetak ringkasan.");
    return;
  }
  printWindow.document.write(packageSummaryHtml(paket));
  printWindow.document.close();
  printWindow.addEventListener("load", () => {
    printWindow.focus();
    printWindow.print();
  });
}

function DraftProgress({ draft, lastSavedAt }: { draft: Draft; lastSavedAt: number | null }) {
  const completed = [
    Boolean(draft.name || draft.slug || draft.flyer_url || draft.description),
    Boolean(draft.departure_date || draft.duration_days || draft.airline || draft.quota),
    Boolean(
      draft.hotel_makkah ||
      draft.hotel_madinah ||
      draft.hotel_makkah_stars ||
      draft.hotel_madinah_stars,
    ),
    Boolean(draft.price_quad || draft.price_triple || draft.price_double),
    Boolean(draft.includes?.length || draft.excludes?.length || draft.requirements?.length),
    draft.is_published !== undefined || draft.is_featured !== undefined,
  ].filter(Boolean).length;
  const percentage = Math.round((completed / 6) * 100);
  const savedLabel = lastSavedAt
    ? `Tersimpan otomatis ${new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(lastSavedAt)}`
    : "Autosave aktif";

  return (
    <div className="mt-3 rounded-xl border border-border/80 bg-muted/30 px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium">Progres pengisian: {percentage}%</span>
        <span className="text-muted-foreground">{savedLabel}</span>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-label="Progres pengisian paket"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
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
