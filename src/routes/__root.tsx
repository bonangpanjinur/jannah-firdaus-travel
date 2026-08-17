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
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { ThemeApplier } from "@/components/site/theme-applier";
import { ErrorState } from "@/components/site/error-state";
import { loadSiteInfo, siteInfoFrom, socialLinks, SITE_CITY, SITE_REGION, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/seo";

import { Toaster } from "@/components/ui/sonner";
import { useRouterState } from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
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
    const info = siteInfoFrom(loaderData?.info);

    const sameAs = socialLinks(info);
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
        { property: "og:image:alt", content: `Logo ${info.siteName}` },
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
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "@id": absoluteUrl("/#organization"),
            name: info.siteName,
            alternateName: [`${info.siteName} Umroh`, "Jannah Firdaus Umroh"],
            description: info.about,
            slogan: info.tagline,
            url: absoluteUrl("/"),
            address: {
              "@type": "PostalAddress",
              streetAddress: info.address ?? undefined,
              addressLocality: SITE_CITY,
              addressRegion: SITE_REGION,
              addressCountry: "ID",
            },
            ...(info.address
              ? { geo: { "@type": "GeoCoordinates", latitude: -6.2889, longitude: 106.8293 } }
              : {}),
            logo: absoluteUrl(DEFAULT_OG_IMAGE),
            image: absoluteUrl(DEFAULT_OG_IMAGE),
            ...(info.phone ? { telephone: `+${info.phone.replace(/\D/g, "")}` } : {}),
            ...(info.email ? { email: info.email } : {}),
            ...(info.phone
              ? {
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    telephone: `+${info.phone.replace(/\D/g, "")}`,
                    areaServed: "ID",
                    availableLanguage: ["Indonesian"],
                  },
                }
              : {}),
            ...(sameAs.length ? { sameAs } : {}),
            areaServed: [SITE_CITY, "Jabodetabek", "Indonesia"],
            knowsLanguage: ["id"],
            priceRange: "IDR",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "20:00",
              },
            ],
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
            alternateName: "Jannah Firdaus Umroh",
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isBackoffice = pathname.startsWith("/admin") || pathname.startsWith("/auth");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeApplier />
      <div className="flex min-h-screen flex-col">
        {isBackoffice ? null : <SiteHeader />}
        <div className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </div>
        {isBackoffice ? null : <SiteFooter />}
      </div>
      {isBackoffice ? null : <WhatsAppFloat />}
      <Toaster />
    </QueryClientProvider>
  );

}
