import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const DEFAULT_NAME = "Jannah Firdaus Tour Travel";

export const Route = createFileRoute("/manifest.json")({
  server: {
    handlers: {
      GET: async () => {
        let name = DEFAULT_NAME;

        try {
          const { data, error } = await supabase
            .from("site_settings")
            .select("agency_name")
            .eq("id", 1)
            .maybeSingle();
          if (error) throw error;
          name = data?.agency_name?.trim() || DEFAULT_NAME;
        } catch {
          // Keep the public fallback manifest available if settings cannot be read.
        }

        const manifest = {
          name,
          short_name: name.length > 20 ? `${name.slice(0, 17).trimEnd()}…` : name,
          description: `Informasi paket perjalanan umroh ${name}.`,
          lang: "id-ID",
          dir: "ltr",
          start_url: "/",
          scope: "/",
          display: "standalone",
          background_color: "#102b25",
          theme_color: "#102b25",
          icons: [
            { src: "/favicon-192.png?v=20261023", sizes: "192x192", type: "image/png" },
            { src: "/favicon-512.png?v=20261023", sizes: "512x512", type: "image/png" },
            { src: "/apple-touch-icon.png?v=20261023", sizes: "180x180", type: "image/png" },
          ],
        };

        return new Response(JSON.stringify(manifest), {
          headers: {
            "Content-Type": "application/manifest+json; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      },
    },
  },
});
