import { useSettings } from "@/hooks/use-site";
import { useRouterState } from "@tanstack/react-router";
import { waLink } from "@/lib/format";

export function WhatsAppFloat() {
  const { data: settings } = useSettings();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isPackageDetail = pathname.startsWith("/paket/");

  return (
    <a
      href={waLink(settings)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat WhatsApp"
      data-analytics-event="whatsapp_click"
      className={`fixed right-4 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-[#19b96f] via-[#20c978] to-[#34d399] text-white shadow-[0_10px_26px_rgba(16,185,107,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#11995b] hover:via-[#16ae65] hover:to-[#25c486] hover:shadow-[0_14px_30px_rgba(16,185,107,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 sm:right-5 ${isPackageDetail ? "bottom-[calc(11.5rem+env(safe-area-inset-bottom))] lg:bottom-5" : "bottom-[calc(5.75rem+env(safe-area-inset-bottom))] sm:bottom-5"}`}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-8 fill-current">
        <path d="M16 3.2A12.8 12.8 0 0 0 5 22.55L3.2 28.8l6.45-1.75A12.8 12.8 0 1 0 16 3.2Zm0 23.35a10.5 10.5 0 0 1-5.35-1.47l-.38-.23-3.83 1.04 1.02-3.72-.25-.4A10.5 10.5 0 1 1 16 26.55Zm5.76-7.86c-.31-.16-1.83-.9-2.11-1s-.49-.16-.7.16-.8 1-.98 1.2-.36.24-.67.08a8.55 8.55 0 0 1-2.48-1.53 9.3 9.3 0 0 1-1.72-2.14c-.18-.31 0-.48.14-.64.14-.14.31-.36.46-.54.15-.18.2-.31.3-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.61-.51-.53-.7-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62s1.13 3.04 1.29 3.25c.16.21 2.22 3.39 5.38 4.76.75.32 1.34.51 1.8.65.76.24 1.45.2 2 .12.61-.09 1.83-.75 2.09-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.37Z" />
      </svg>
      <span className="sr-only">Chat WhatsApp</span>
    </a>
  );
}
