import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { absoluteMediaUrl } from "@/lib/storage";

const DEFAULT_NAME = "Jannah Firdaus Tour Travel";

export const Route = createFileRoute("/manifest.json")({
  server: {
    handlers: {
      GET: async () => {
        let name = DEFAULT_NAME;
        let icon = "/favicon-512.png";

        try {
          const { data, error } = await supabase
            .from("site_settings")
            .select("agency_name, logo_url")
            .eq("id", 1)
            .maybeSingle();
          if (error) throw error;
          name = data?.agency_name?.trim() || DEFAULT_NAME;
          icon = absoluteMediaUrl(data?.logo_url) || icon;
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
          icons: [{ src: icon, sizes: "any" }],
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
