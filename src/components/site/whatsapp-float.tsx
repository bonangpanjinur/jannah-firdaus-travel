import { MessageCircle } from "lucide-react";
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
      className={`fixed right-4 z-30 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:right-5 ${isPackageDetail ? "bottom-[calc(10.5rem+env(safe-area-inset-bottom))] lg:bottom-5" : "bottom-[calc(5.75rem+env(safe-area-inset-bottom))] sm:bottom-5"}`}
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}
