import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop({ isBackoffice = false }: { isBackoffice?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 420);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed z-40 flex size-11 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-[0_8px_24px_rgba(15,23,42,0.16)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 ${
        isBackoffice
          ? "bottom-5 right-4 sm:right-5"
          : "bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-20 sm:bottom-5 sm:right-5"
      } ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
      <span className="sr-only">Kembali ke atas</span>
    </button>
  );
}
