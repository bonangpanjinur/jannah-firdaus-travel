import { createFileRoute } from "@tanstack/react-router";

const MAX_SCAN_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const extractionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    slug: { type: "string" },
    description: { type: ["string", "null"] },
    price_quad: { type: ["integer", "null"] },
    price_triple: { type: ["integer", "null"] },
    price_double: { type: ["integer", "null"] },
    departure_date: { type: ["string", "null"] },
    duration_days: { type: ["integer", "null"] },
    quota: { type: ["integer", "null"] },
    airline: { type: ["string", "null"] },
    hotel_makkah: { type: ["string", "null"] },
    hotel_makkah_stars: { type: ["integer", "null"] },
    hotel_madinah: { type: ["string", "null"] },
    hotel_madinah_stars: { type: ["integer", "null"] },
    includes: { type: "array", items: { type: "string" } },
    excludes: { type: "array", items: { type: "string" } },
    requirements: { type: "array", items: { type: "string" } },
    confidence: { type: "number" },
    warnings: { type: "array", items: { type: "string" } },
  },
  required: [
    "name",
    "slug",
    "description",
    "price_quad",
    "price_triple",
    "price_double",
    "departure_date",
    "duration_days",
    "quota",
    "airline",
    "hotel_makkah",
    "hotel_makkah_stars",
    "hotel_madinah",
    "hotel_madinah_stars",
    "includes",
    "excludes",
    "requirements",
    "confidence",
    "warnings",
  ],
} as const;

type ScanRequest = {
  storagePath?: string;
};

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

function isSafeFlyerPath(value: string) {
  return value.startsWith("flyers/") && !value.includes("..") && !value.includes("\\");
}

function imageDataUrl(blob: Blob, mimeType: string) {
  return blob.arrayBuffer().then((buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    const chunkSize = 0x8000;
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(
        ...bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length)),
      );
    }
    return `data:${mimeType};base64,${btoa(binary)}`;
  });
}

function parseJsonContent(content: string) {
  const cleaned = content
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  const candidate =
    firstBrace >= 0 && lastBrace > firstBrace ? cleaned.slice(firstBrace, lastBrace + 1) : cleaned;
  return JSON.parse(candidate);
}

export const Route = createFileRoute("/api/scan-flyer")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as ScanRequest | null;
        const storagePath = body?.storagePath?.trim() ?? "";
        if (!isSafeFlyerPath(storagePath)) {
          return json({ error: "Path flyer tidak valid." }, 400);
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const authorization = request.headers.get("authorization") ?? "";
        const token = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
        if (!token) return json({ error: "Sesi admin tidak valid." }, 401);

        const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
        if (userError || !userData.user) return json({ error: "Sesi admin tidak valid." }, 401);
        const userId = userData.user.id;

        const { data: adminRole, error: roleError } = await supabaseAdmin
          .from("user_roles")
          .select("user_id")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();
        if (roleError || !adminRole)
          return json({ error: "Akun tidak memiliki akses admin." }, 403);

        const { data: flyer, error: downloadError } = await supabaseAdmin.storage
          .from("media")
          .download(storagePath);
        if (downloadError || !flyer)
          return json({ error: "Flyer tidak ditemukan di Storage." }, 404);
        if (flyer.size > MAX_SCAN_BYTES) return json({ error: "Ukuran flyer maksimal 5 MB." }, 413);

        const mimeType = flyer.type || "image/jpeg";
        if (!ALLOWED_IMAGE_TYPES.has(mimeType))
          return json({ error: "Format flyer tidak didukung." }, 415);

        const apiKey =
          process.env["FLYER_SCAN_API_KEY"] ||
          process.env["BUILT_IN_FORGE_API_KEY"] ||
          process.env["OPENAI_API_KEY"];
        const configuredBase = process.env["FLYER_SCAN_API_BASE"] || process.env["OPENAI_API_BASE"];
        const forgeBase = process.env["BUILT_IN_FORGE_API_URL"];
        const apiBase = (
          configuredBase ||
          (forgeBase ? `${forgeBase.replace(/\/$/, "")}/v1` : "https://api.openai.com/v1")
        ).replace(/\/$/, "");
        const model =
          process.env["FLYER_SCAN_MODEL"] || (forgeBase ? "gemini-3-flash-preview" : "gpt-5-mini");
        if (!apiKey) {
          return json(
            {
              error:
                "Vision AI belum dikonfigurasi. Tambahkan FLYER_SCAN_API_KEY, BUILT_IN_FORGE_API_KEY, atau OPENAI_API_KEY di environment deployment.",
            },
            503,
          );
        }

        const dataUrl = await imageDataUrl(flyer, mimeType);
        const tokenLimit = model.startsWith("gpt-")
          ? { max_completion_tokens: 1800 }
          : { max_tokens: 1800 };
        const systemMessage =
          "Anda adalah extractor data flyer travel umroh yang sangat teliti. Baca hanya informasi yang terlihat. Jangan mengarang nilai yang tidak ada. Gunakan null untuk angka atau teks yang tidak terbaca. Harga harus berupa angka rupiah tanpa simbol dan pemisah. departure_date harus berformat YYYY-MM-DD jika tanggal dapat dipastikan; jika hanya bulan/tahun atau ambigu, gunakan null dan masukkan penjelasan ke warnings. Slug harus berupa lowercase kebab-case dari nama paket. Kembalikan JSON sesuai schema.";
        const imageMessage = {
          role: "user",
          content: [
            {
              type: "text",
              text: "Ekstrak data paket dari flyer ini untuk dipreview admin sebelum disimpan.",
            },
            { type: "image_url", image_url: { url: dataUrl, detail: "high" } },
          ],
        };
        const requestBase = {
          model,
          ...tokenLimit,
          messages: [{ role: "system", content: systemMessage }, imageMessage],
        };
        let aiResponse = await fetch(`${apiBase}/chat/completions`, {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            ...requestBase,
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "umroh_flyer_extraction",
                strict: true,
                schema: extractionSchema,
              },
            },
          }),
        });

        if (!aiResponse.ok) {
          const detail = await aiResponse.text().catch(() => "");
          if (aiResponse.status === 400 && /format|schema|response_format/i.test(detail)) {
            aiResponse = await fetch(`${apiBase}/chat/completions`, {
              method: "POST",
              headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
              body: JSON.stringify({
                ...requestBase,
                messages: [
                  { role: "system", content: systemMessage },
                  {
                    ...imageMessage,
                    content: [
                      {
                        type: "text",
                        text: "Ekstrak data paket dari flyer ini. Kembalikan satu object JSON saja tanpa Markdown code fence dengan keys sesuai schema yang diminta.",
                      },
                      { type: "image_url", image_url: { url: dataUrl, detail: "high" } },
                    ],
                  },
                ],
              }),
            });
          }
        }

        if (!aiResponse.ok) {
          const detail = await aiResponse.text().catch(() => "");
          console.error("Flyer scan provider error", aiResponse.status, detail.slice(0, 500));
          return json(
            {
              error:
                "Vision AI gagal membaca flyer. Coba gambar yang lebih jelas atau ulangi beberapa saat lagi.",
            },
            502,
          );
        }

        const completion = (await aiResponse.json()) as {
          choices?: Array<{ message?: { content?: string | null } }>;
        };
        const content = completion.choices?.[0]?.message?.content;
        if (!content) return json({ error: "Vision AI tidak mengembalikan hasil ekstraksi." }, 502);

        try {
          const extracted = parseJsonContent(content);
          return json({ extracted, model });
        } catch {
          return json({ error: "Hasil Vision AI bukan JSON yang valid." }, 502);
        }
      },
    },
  },
});
