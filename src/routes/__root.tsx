import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { MobileBottomNav } from "@/components/site/mobile-bottom-nav";
import { BackToTop } from "@/components/site/back-to-top";
import { isTheme, ThemeApplier } from "@/components/site/theme-applier";
import { ErrorState } from "@/components/site/error-state";
import {
  loadSiteInfo,
  siteInfoFrom,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  travelAgencyLd,
  type SiteInfo,
} from "@/lib/seo";
import { absoluteMediaUrl } from "@/lib/storage";
import { settingsQuery, type SiteSettings } from "@/lib/site-data";
import { initAnalytics, trackEvent, trackPageView } from "@/lib/analytics";

import { Toaster } from "@/components/ui/sonner";
import { useRouterState } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Halaman tidak ditemukan</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Halaman yang Anda cari tidak tersedia atau alamatnya sudah berubah.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("Unhandled application error:", error);
  }, [error]);

  return (
    <ErrorState
      onRetry={() => {
        router.invalidate();
        reset();
      }}
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async ({ context }) => {
    const info = await loadSiteInfo(context.queryClient);
    // Sertakan raw settings agar tersedia saat hydration (mencegah mismatch logo/tema).
    const settings = context.queryClient.getQueryData(settingsQuery.queryKey) ?? null;
    return { info, settings };
  },
  head: ({ loaderData }) => {
    const rootData = loaderData as unknown as
      { info?: Partial<SiteInfo>; settings?: SiteSettings | null } | undefined;
    const info = siteInfoFrom(rootData?.info);

    const initialSettings = rootData?.settings;
    const initialTheme = isTheme(initialSettings?.theme) ? initialSettings.theme : "noir-emas";
    // Keep favicon independent from the configurable agency logo. Logos uploaded
    // through settings are often wide and may be cached or replaced independently.
    const iconVersion = "20261023";
    const iconLinks = [
      { rel: "icon", type: "image/svg+xml", href: `/favicon.svg?v=${iconVersion}` },
      { rel: "icon", type: "image/png", href: `/favicon-192.png?v=${iconVersion}`, sizes: "192x192" },
      { rel: "icon", href: `/favicon.ico?v=${iconVersion}`, sizes: "48x48" },
      { rel: "apple-touch-icon", href: `/apple-touch-icon.png?v=${iconVersion}`, sizes: "180x180" },
    ];
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: `${info.siteName} — ${info.tagline}` },
        { name: "description", content: info.about },
        { property: "og:site_name", content: info.siteName },
        { property: "og:locale", content: "id_ID" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: absoluteUrl(DEFAULT_OG_IMAGE) },
        { property: "og:image:alt", content: "Suasana thawaf di Masjidil Haram saat senja" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: absoluteUrl(DEFAULT_OG_IMAGE) },
        { name: "theme-color", content: "#1a1a18" },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
        },
        ...iconLinks,
        { rel: "manifest", href: "/manifest.json" },
      ],
      scripts: [
        {
          children: `document.documentElement.setAttribute("data-theme", "${initialTheme}");`,
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            ...travelAgencyLd(info),
            knowsLanguage: ["id"],
            makesOffer: {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Paket perjalanan ibadah umroh" },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: info.siteName,
            alternateName: `${info.siteName} Umroh`,
            url: absoluteUrl("/"),
            inLanguage: "id-ID",
            publisher: { "@id": absoluteUrl("/#organization") },
          }),
        },
      ],
    };
  },

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="id" data-theme="noir-emas" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const reloadKey = "jannah-firdaus:chunk-reload-at";
    const handlePreloadError = () => {
      const previousReload = Number(sessionStorage.getItem(reloadKey) ?? 0);
      const now = Date.now();
      if (now - previousReload > 10_000) {
        sessionStorage.setItem(reloadKey, String(now));
        window.location.reload();
      }
    };

    window.addEventListener("vite:preloadError", handlePreloadError);
    return () => window.removeEventListener("vite:preloadError", handlePreloadError);
  }, []);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isBackoffice = pathname.startsWith("/admin") || pathname.startsWith("/auth");

  useEffect(() => {
    if (isBackoffice) return;
    initAnalytics();
    trackPageView(pathname);
  }, [isBackoffice, pathname]);

  useEffect(() => {
    if (isBackoffice) return;
    const trackElementEvent = (target: HTMLElement) => {
      const eventName = target.dataset["analyticsEvent"];
      if (!eventName) return;
      trackEvent(eventName, {
        page_path: window.location.pathname,
        package_slug: target.dataset["analyticsPackage"],
      });
    };
    const handleTrackedClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-analytics-event]")
          : null;
      if (target) trackElementEvent(target);
    };
    const handleTrackedSubmit = (event: SubmitEvent) => {
      const target =
        event.target instanceof HTMLElement
          ? event.target.closest<HTMLElement>("[data-analytics-event]")
          : null;
      if (target) trackElementEvent(target);
    };

    document.addEventListener("click", handleTrackedClick);
    document.addEventListener("submit", handleTrackedSubmit);
    return () => {
      document.removeEventListener("click", handleTrackedClick);
      document.removeEventListener("submit", handleTrackedSubmit);
    };
  }, [isBackoffice]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeApplier />
      <div className="flex min-h-screen flex-col">
        {isBackoffice ? null : <SiteHeader />}
        <div className="flex-1 pb-20 md:pb-0">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </div>
        {isBackoffice ? null : <SiteFooter />}
      </div>
      {isBackoffice ? null : <MobileBottomNav />}
      {isBackoffice ? null : <WhatsAppFloat />}
      <BackToTop isBackoffice={isBackoffice} />
      <Toaster />
    </QueryClientProvider>
  );
}
