import { MessageCircle } from "lucide-react";
import { useSettings } from "@/hooks/use-site";
import { waLink } from "@/lib/format";

export function WhatsAppFloat() {
  const { data: settings } = useSettings();

  return (
    <a
      href={waLink(settings)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}