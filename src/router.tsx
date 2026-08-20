import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";
import { ErrorState } from "@/components/site/error-state";
import { logRouteFailure } from "@/lib/route-logging";

function DefaultErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  logRouteFailure(error, { boundary: "router_default_error_component" });
  return <ErrorState onRetry={reset} />;
}

function DefaultNotFoundComponent() {
  return (
    <ErrorState
      code={404}
      title="Halaman tidak ditemukan"
      description="Alamat yang Anda buka tidak tersedia atau sudah dipindahkan."
    />
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Public content changes infrequently; avoid an immediate client refetch
        // after SSR hydration while still refreshing within one minute.
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        // Surface data-fetch failures in the dev server / browser console.
        throwOnError: false,
      },
    },
  });

  queryClient.getQueryCache().subscribe((event) => {
    if (event.type === "updated" && event.query.state.status === "error") {
      logRouteFailure(event.query.state.error, {
        boundary: "react_query",
        queryKey: JSON.stringify(event.query.queryKey),
      });
    }
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
    defaultNotFoundComponent: DefaultNotFoundComponent,
    defaultOnCatch: (error, errorInfo) => {
      logRouteFailure(error, {
        boundary: "router_default_on_catch",
        componentStack: errorInfo?.componentStack?.slice(0, 500),
      });
    },
  });

  // Kirim cache query hasil SSR ke browser agar HTML server dan client sama
  // (mencegah hydration mismatch pada header/logo dan data lain).
  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
};
