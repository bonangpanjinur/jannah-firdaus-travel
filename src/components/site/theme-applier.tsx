import { useEffect } from "react";
import { useSettings } from "@/hooks/use-site";

export const THEMES = [
  {
    value: "noir-emas",
    label: "Noir & Emas",
    description: "Gelap, mewah, dan elegan. Cocok untuk kesan premium.",
    swatches: ["#1a1a18", "#2b2b28", "#d9b169", "#f2e6cc"],
  },
  {
    value: "putih-zamrud",
    label: "Putih Zamrud",
    description: "Terang, bersih, hijau zamrud dengan aksen emas lembut.",
    swatches: ["#f8fbf8", "#ffffff", "#12795f", "#c49a4d"],
  },
  {
    value: "maroon-klasik",
    label: "Maroon Klasik",
    description: "Hangat dan tradisional, merah maroon dengan aksen emas tua.",
    swatches: ["#f5f0ec", "#ffffff", "#8c2d2d", "#b8893b"],
  },
  {
    value: "safi-biru",
    label: "Safi Biru",
    description: "Terang dan bersih, biru elegan dengan sentuhan emas ringan.",
    swatches: ["#f7f9fc", "#ffffff", "#2b6cb0", "#d4b87a"],
  },
  {
    value: "toska-modern",
    label: "Toska Modern",
    description: "Kontemporer dan segar, toska dengan aksen emas cerah.",
    swatches: ["#f4fafa", "#ffffff", "#2b8a8a", "#cda85a"],
  },
] as const;

export type ThemeValue = (typeof THEMES)[number]["value"];

export function isTheme(value: unknown): value is ThemeValue {
  return THEMES.some((theme) => theme.value === value);
}

/** Menerapkan tema tampilan depan dari pengaturan situs ke elemen <html>. */
export function ThemeApplier() {
  const { data: settings } = useSettings();
  const theme = isTheme(settings?.theme) ? settings.theme : "noir-emas";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
}
