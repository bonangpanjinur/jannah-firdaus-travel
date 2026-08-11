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
