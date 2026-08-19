import { createFileRoute, Link } from "@tanstack/react-router";
import JSZip from "jszip";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, packagesQuery } from "@/lib/site-data";
import { deleteMedia, isStoragePath, uploadMedia } from "@/lib/storage";

export const Route = createFileRoute("/admin/paket/import")({
  component: AdminPaketImport,
});

type ZipEntry = {
  name: string;
  file: JSZip.JSZipObject;
};

type ImportItem = {
  line: number;
  slug: string;
  name: string;
  description: string | null;
  flyerFilename: string | null;
  price_quad: number | null;
  price_triple: number | null;
  price_double: number | null;
  departure_date: string | null;
  duration_days: number | null;
  quota: number | null;
  airline: string | null;
  hotel_makkah: string | null;
  hotel_makkah_stars: number | null;
  hotel_madinah: string | null;
  hotel_madinah_stars: number | null;
  includes: string[];
  excludes: string[];
  requirements: string[];
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  issues: string[];
};

type ImportResult = {
  line: number;
  slug: string;
  name: string;
  action: "created" | "updated" | "skipped" | "failed";
  flyer: string;
  message: string;
};

const IMAGE_EXTENSIONS = /\.(avif|gif|jpe?g|png|webp)$/i;
const CSV_TEMPLATE = `slug,name,description,price_quad,price_triple,price_double,departure_date,duration_days,quota,airline,hotel_makkah,hotel_madinah,flyer_filename,includes,excludes,requirements,is_published,is_featured,sort_order\numroh-hemat-9-hari,Umroh Hemat 9 Hari,Paket umroh ekonomis,27500000,29500000,32500000,2026-10-12,9,45,Saudia Airlines,Grand Al Massa,Al Eiman Royal,umroh-hemat-9-hari.jpg,Tiket pesawat PP|Visa umroh,Paspor|Pengeluaran pribadi,Paspor berlaku minimal 8 bulan|KTP,true,true,1\n`;

function normalizeKey(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function basename(value: string) {
  return value.split(/[\\/]/).pop() ?? value;
}

function splitList(value: string | undefined) {
  return (value ?? "")
    .split(/[|\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (!value?.trim()) return fallback;
  return ["true", "1", "ya", "yes", "publish", "published"].includes(value.trim().toLowerCase());
}

function parseNumber(value: string | undefined, label: string, issues: string[]) {
  if (!value?.trim()) return null;
  const parsed = Number(value.replace(/[.,](?=\d{3}(?:\D|$))/g, ""));
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    issues.push(`${label} harus berupa angka bulat.`);
    return null;
  }
  return parsed;
}

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    if (row.some((value) => value.trim())) rows.push(row);
  }

  if (rows.length < 2) throw new Error("CSV harus memiliki header dan minimal satu baris paket.");
  const headerRow = rows[0] ?? [];
  const headers = headerRow.map((header) => header.trim().toLowerCase().replace(/\s+/g, "_"));
  const required = ["slug", "name"];
  const missing = required.filter((header) => !headers.includes(header));
  if (missing.length) throw new Error(`Header wajib belum ada: ${missing.join(", ")}.`);

  return rows.slice(1).map((values, index) => {
    const record: Record<string, string> = {};
    headers.forEach((header, headerIndex) => {
      record[header] = (values[headerIndex] ?? "").trim();
    });
    return { line: index + 2, record };
  });
}

function parseImportItems(text: string): ImportItem[] {
  const rows = parseCsv(text);
  const seen = new Set<string>();

  return rows.map(({ line, record }) => {
    const issues: string[] = [];
    const get = (key: string) => record[key] ?? "";
    const slug = get("slug").trim().toLowerCase();
    const name = get("name").trim();
    if (!slug) issues.push("Slug wajib diisi.");
    if (!name) issues.push("Nama paket wajib diisi.");
    if (slug && seen.has(slug)) issues.push("Slug duplikat di dalam CSV.");
    if (slug) seen.add(slug);

    const price_quad = parseNumber(get("price_quad"), "Harga quad", issues);
    const price_triple = parseNumber(get("price_triple"), "Harga triple", issues);
    const price_double = parseNumber(get("price_double"), "Harga double", issues);
    const duration_days = parseNumber(get("duration_days"), "Durasi", issues);
    const quota = parseNumber(get("quota"), "Kuota", issues);
    const hotel_makkah_stars = parseNumber(
      get("hotel_makkah_stars"),
      "Bintang hotel Makkah",
      issues,
    );
    const hotel_madinah_stars = parseNumber(
      get("hotel_madinah_stars"),
      "Bintang hotel Madinah",
      issues,
    );

    if (duration_days !== null && duration_days < 1) issues.push("Durasi minimal 1 hari.");
    if (quota !== null && quota < 0) issues.push("Kuota tidak boleh negatif.");
    if ([price_quad, price_triple, price_double].some((price) => price !== null && price < 0))
      issues.push("Harga tidak boleh negatif.");
    if (
      [hotel_makkah_stars, hotel_madinah_stars].some(
        (stars) => stars !== null && (stars < 1 || stars > 5),
      )
    )
      issues.push("Bintang hotel harus 1 sampai 5.");

    return {
      line,
      slug,
      name,
      description: get("description") || null,
      flyerFilename: get("flyer_filename") || get("flyer") || null,
      price_quad,
      price_triple,
      price_double,
      departure_date: get("departure_date") || null,
      duration_days,
      quota,
      airline: get("airline") || null,
      hotel_makkah: get("hotel_makkah") || null,
      hotel_makkah_stars,
      hotel_madinah: get("hotel_madinah") || null,
      hotel_madinah_stars,
      includes: splitList(get("includes")),
      excludes: splitList(get("excludes")),
      requirements: splitList(get("requirements")),
      is_published: parseBoolean(get("is_published"), true),
      is_featured: parseBoolean(get("is_featured"), false),
      sort_order: parseNumber(get("sort_order"), "Urutan", issues) ?? line,
      issues,
    };
  });
}

function findFlyer(item: ImportItem, entries: ZipEntry[]) {
  if (!entries.length) return null;
  if (item.flyerFilename) {
    const wantedName = basename(item.flyerFilename).toLowerCase();
    const exact = entries.find((entry) => basename(entry.name).toLowerCase() === wantedName);
    if (exact) return exact;
  }
  const wantedKey = normalizeKey(item.slug);
  return entries.find((entry) => normalizeKey(basename(entry.name)) === wantedKey) ?? null;
}

function mimeFromFilename(name: string) {
  const extension = name.toLowerCase().split(".").pop();
  return (
    (
      {
        avif: "image/avif",
        gif: "image/gif",
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
      } as Record<string, string>
    )[extension ?? ""] ?? "application/octet-stream"
  );
}

function AdminPaketImport() {
  const qc = useQueryClient();
  const [csvName, setCsvName] = useState("");
  const [zipName, setZipName] = useState("");
  const [items, setItems] = useState<ImportItem[]>([]);
  const [zipEntries, setZipEntries] = useState<ZipEntry[]>([]);
  const [csvError, setCsvError] = useState("");
  const [zipError, setZipError] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[]>([]);

  const preview = useMemo(
    () => items.map((item) => ({ item, flyer: findFlyer(item, zipEntries) })),
    [items, zipEntries],
  );
  const errorCount = preview.filter(
    ({ item, flyer }) => item.issues.length > 0 || (item.flyerFilename && !flyer),
  ).length;
  const warningCount = preview.filter(
    ({ item, flyer }) => item.issues.length === 0 && !item.flyerFilename && !flyer,
  ).length;

  async function onCsvChange(file: File | undefined) {
    if (!file) return;
    setCsvName(file.name);
    setResults([]);
    try {
      setItems(parseImportItems(await file.text()));
      setCsvError("");
    } catch (error) {
      setItems([]);
      setCsvError(error instanceof Error ? error.message : "CSV tidak dapat dibaca.");
    }
  }

  async function onZipChange(file: File | undefined) {
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      setZipError("Ukuran ZIP maksimal 50 MB.");
      return;
    }
    setZipName(file.name);
    setResults([]);
    try {
      const zip = await JSZip.loadAsync(file);
      const entries = Object.values(zip.files)
        .filter((entry) => !entry.dir && IMAGE_EXTENSIONS.test(entry.name))
        .map((entry) => ({ name: entry.name, file: entry }));
      setZipEntries(entries);
      setZipError(entries.length ? "" : "ZIP tidak berisi file gambar yang didukung.");
    } catch (error) {
      setZipEntries([]);
      setZipError(error instanceof Error ? error.message : "ZIP tidak dapat dibaca.");
    }
  }

  function downloadTemplate() {
    const url = URL.createObjectURL(new Blob([CSV_TEMPLATE], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "template-import-paket.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function runImport() {
    if (!items.length) {
      toast.error("Pilih CSV paket terlebih dahulu.");
      return;
    }
    if (errorCount > 0) {
      toast.error("Perbaiki error pada preview sebelum import.");
      return;
    }

    setIsImporting(true);
    setResults([]);
    const nextResults: ImportResult[] = [];

    for (const { item, flyer } of preview) {
      let uploadedPath: string | null = null;
      try {
        const { data: existing, error: lookupError } = await db()
          .from("packages")
          .select("id, flyer_url")
          .eq("slug", item.slug)
          .maybeSingle();
        if (lookupError) throw lookupError;

        if (flyer) {
          const blob = await flyer.file.async("blob");
          const uploadedFile = new File([blob], basename(flyer.name), {
            type: mimeFromFilename(flyer.name),
          });
          uploadedPath = await uploadMedia(uploadedFile, "flyers");
        }

        const payload = {
          slug: item.slug,
          name: item.name,
          description: item.description,
          flyer_url: uploadedPath ?? existing?.flyer_url ?? null,
          price_quad: item.price_quad,
          price_triple: item.price_triple,
          price_double: item.price_double,
          departure_date: item.departure_date,
          duration_days: item.duration_days,
          quota: item.quota,
          airline: item.airline,
          hotel_makkah: item.hotel_makkah,
          hotel_makkah_stars: item.hotel_makkah_stars,
          hotel_madinah: item.hotel_madinah,
          hotel_madinah_stars: item.hotel_madinah_stars,
          includes: item.includes,
          excludes: item.excludes,
          requirements: item.requirements,
          is_published: item.is_published,
          is_featured: item.is_featured,
          sort_order: item.sort_order,
        };
        const { error: saveError } = await db()
          .from("packages")
          .upsert(payload, { onConflict: "slug" });
        if (saveError) throw saveError;

        if (
          uploadedPath &&
          existing?.flyer_url &&
          existing.flyer_url !== uploadedPath &&
          isStoragePath(existing.flyer_url)
        ) {
          await deleteMedia(existing.flyer_url).catch(() => undefined);
        }
        nextResults.push({
          line: item.line,
          slug: item.slug,
          name: item.name,
          action: existing?.id ? "updated" : "created",
          flyer: flyer ? basename(flyer.name) : "dipertahankan/tidak ada",
          message: "Berhasil",
        });
      } catch (error) {
        if (uploadedPath) await deleteMedia(uploadedPath).catch(() => undefined);
        nextResults.push({
          line: item.line,
          slug: item.slug,
          name: item.name,
          action: "failed",
          flyer: flyer ? basename(flyer.name) : "-",
          message: error instanceof Error ? error.message : "Import gagal",
        });
      }
    }

    setResults(nextResults);
    setIsImporting(false);
    qc.invalidateQueries({ queryKey: packagesQuery({ includeDrafts: true }).queryKey });
    qc.invalidateQueries({ queryKey: ["packages"] });
    const failed = nextResults.filter((result) => result.action === "failed").length;
    if (failed) toast.error(`${failed} paket gagal diimport.`);
    else toast.success(`${nextResults.length} paket berhasil diimport.`);
  }

  return (
    <main className="p-6 md:p-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">Konten utama</p>
          <h1 className="mt-1 font-display text-3xl">Import Paket & Flyer</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Upload satu CSV dan satu ZIP flyer. Paket dicocokkan berdasarkan `slug`, lalu dibuat
            atau diperbarui secara otomatis.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/admin/paket">Kembali ke paket</Link>
        </Button>
      </div>

      <section className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">1. CSV paket</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Header wajib: `slug`, `name`. Kolom array seperti `includes` dipisahkan dengan tanda
            `|`.
          </p>
          <div className="mt-5 space-y-2">
            <Label htmlFor="csv-import">Pilih file CSV</Label>
            <div className="flex flex-wrap gap-2">
              <Input
                id="csv-import"
                type="file"
                accept=".csv,text/csv"
                onChange={(event) => void onCsvChange(event.target.files?.[0])}
              />
              <Button type="button" variant="outline" onClick={downloadTemplate}>
                Download template
              </Button>
            </div>
            {csvName ? <p className="text-xs text-muted-foreground">File: {csvName}</p> : null}
            {csvError ? <p className="text-sm text-destructive">{csvError}</p> : null}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">2. ZIP flyer</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Nama flyer idealnya sama dengan slug, misalnya `umroh-hemat-9-hari.jpg`. ZIP maksimal 50
            MB.
          </p>
          <div className="mt-5 space-y-2">
            <Label htmlFor="zip-import">Pilih file ZIP</Label>
            <Input
              id="zip-import"
              type="file"
              accept=".zip,application/zip"
              onChange={(event) => void onZipChange(event.target.files?.[0])}
            />
            {zipName ? (
              <p className="text-xs text-muted-foreground">
                File: {zipName} · {zipEntries.length} gambar ditemukan
              </p>
            ) : null}
            {zipError ? <p className="text-sm text-destructive">{zipError}</p> : null}
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              3. Preview & validasi
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Baris dengan error tidak dapat diimport. Flyer tanpa pasangan tetap boleh diimport dan
              tidak menghapus flyer lama.
            </p>
          </div>
          <Button
            onClick={() => void runImport()}
            disabled={!items.length || errorCount > 0 || isImporting}
          >
            {isImporting ? "Mengimport…" : "Import sekarang"}
          </Button>
        </div>

        {items.length ? (
          <>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-border px-3 py-1">
                {items.length} baris
              </span>
              <span
                className={`rounded-full border px-3 py-1 ${errorCount ? "border-destructive/50 text-destructive" : "border-emerald-500/40 text-emerald-600"}`}
              >
                {errorCount} error
              </span>
              <span className="rounded-full border border-gold/40 px-3 py-1 text-gold">
                {warningCount} tanpa flyer baru
              </span>
            </div>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Baris</th>
                    <th className="px-4 py-3">Paket</th>
                    <th className="px-4 py-3">Slug</th>
                    <th className="px-4 py-3">Flyer</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {preview.map(({ item, flyer }) => {
                    const errors = [
                      ...item.issues,
                      ...(item.flyerFilename && !flyer
                        ? [`Flyer ${item.flyerFilename} tidak ditemukan di ZIP.`]
                        : []),
                    ];
                    return (
                      <tr key={`${item.line}-${item.slug}`}>
                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                          {item.line}
                        </td>
                        <td className="px-4 py-3 font-medium">{item.name || "-"}</td>
                        <td className="px-4 py-3 font-mono text-xs">{item.slug || "-"}</td>
                        <td className="px-4 py-3 text-xs">
                          {flyer ? basename(flyer.name) : (item.flyerFilename ?? "Tidak ada")}
                        </td>
                        <td className="max-w-xs px-4 py-3 text-xs">
                          {errors.length ? (
                            <span className="text-destructive">{errors.join(" ")}</span>
                          ) : !flyer ? (
                            <span className="text-gold">Tanpa flyer baru</span>
                          ) : (
                            <span className="text-emerald-600">Siap diimport</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="mt-5 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Pilih CSV untuk melihat preview import.
          </p>
        )}
      </section>

      {results.length ? (
        <section className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            4. Hasil import
          </p>
          <div className="mt-4 space-y-2">
            {results.map((result) => (
              <div
                key={`${result.line}-${result.slug}`}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-3 text-sm"
              >
                <span>
                  <strong>{result.name}</strong>{" "}
                  <span className="text-xs text-muted-foreground">({result.slug})</span>
                </span>
                <span
                  className={result.action === "failed" ? "text-destructive" : "text-emerald-600"}
                >
                  {result.action} · {result.message}
                </span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-5 rounded-2xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Format CSV contoh</p>
        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-background p-4 text-xs leading-6">
          {CSV_TEMPLATE.trim()}
        </pre>
      </section>
    </main>
  );
}
