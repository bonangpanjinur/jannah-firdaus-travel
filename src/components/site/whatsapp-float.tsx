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
      className={`fixed right-4 z-30 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#19b96f] via-[#20c978] to-[#34d399] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(16,185,107,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:from-[#11995b] hover:via-[#16ae65] hover:to-[#25c486] hover:shadow-[0_14px_30px_rgba(16,185,107,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34d399] focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 sm:right-5 ${isPackageDetail ? "bottom-[calc(10.5rem+env(safe-area-inset-bottom))] lg:bottom-5" : "bottom-[calc(5.75rem+env(safe-area-inset-bottom))] sm:bottom-5"}`}
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}
