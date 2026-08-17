import { describeError } from "./error-capture";

/**
 * Logs a route/loader/query failure with full detail so the cause of a 500
 * is visible in the dev-server output (SSR) and browser console (client).
 */
export function logRouteFailure(error: unknown, context: Record<string, unknown> = {}) {
  const where = typeof window === "undefined" ? "SSR" : "CLIENT";
  const path =
    typeof window === "undefined" ? (context["path"] ?? "-") : window.location.pathname;

  const details = Object.entries({ path, ...context })
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}=${String(v)}`)
    .join(" ");

  console.error(`[route-error][${where}] ${details}\n${describeError(error)}`);
}

/**
 * Wraps a route loader so any throw is logged with the route id before it
 * bubbles to the error boundary.
 */
export function withLoaderLogging<TArgs extends { route?: { id?: string } }, TResult>(
  routeId: string,
  loader: (args: TArgs) => Promise<TResult> | TResult,
) {
  return async (args: TArgs): Promise<TResult> => {
    try {
      return await loader(args);
    } catch (error) {
      // Redirects and notFound() are control flow, not failures.
      if (error != null && typeof error === "object" && ("isRedirect" in error || "isNotFound" in error)) {
        throw error;
      }
      logRouteFailure(error, { boundary: "route_loader", routeId });
      throw error;
    }
  };
}
