type AnalyticsParams = Record<string, string | number | boolean | undefined>;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const measurementId = import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined;

export function isAnalyticsEnabled() {
  return Boolean(measurementId && typeof window !== "undefined");
}

export function initAnalytics() {
  if (!isAnalyticsEnabled() || window.gtag) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId!)}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false, anonymize_ip: true });
}

export function trackPageView(path: string) {
  if (!isAnalyticsEnabled()) return;
  initAnalytics();
  window.gtag?.("event", "page_view", { page_path: path });
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!isAnalyticsEnabled()) return;
  initAnalytics();
  window.gtag?.("event", name, params);
}

export function analyticsMeasurementId() {
  return measurementId;
}
