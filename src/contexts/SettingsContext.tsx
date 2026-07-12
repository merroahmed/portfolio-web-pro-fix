import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";
export type Theme = "dark" | "light";

interface Settings {
  lang: Lang;
  theme: Theme;
  hue: number; // 0..360
  fontSize: number; // px
  animations: boolean;
}

interface Ctx extends Settings {
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
  setHue: (h: number) => void;
  setFontSize: (s: number) => void;
  setAnimations: (b: boolean) => void;
  t: (en: string, ar: string) => string;
}

const SettingsCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "mariam_portfolio_settings_v1";

const defaults: Settings = {
  lang: "en",
  theme: "dark",
  hue: 280,
  fontSize: 16,
  animations: true,
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...defaults, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
    const root = document.documentElement;
    root.classList.toggle("light", settings.theme === "light");
    root.classList.toggle("dark", settings.theme === "dark");
    root.classList.toggle("no-anim", !settings.animations);
    root.setAttribute("lang", settings.lang);
    root.setAttribute("dir", settings.lang === "ar" ? "rtl" : "ltr");
    root.style.setProperty("--brand-h", String(settings.hue));
    root.style.setProperty("--app-font-size", `${settings.fontSize}px`);
  }, [settings]);

  const value: Ctx = {
    ...settings,
    setLang: (lang) => setSettings((s) => ({ ...s, lang })),
    setTheme: (theme) => setSettings((s) => ({ ...s, theme })),
    setHue: (hue) => setSettings((s) => ({ ...s, hue })),
    setFontSize: (fontSize) => setSettings((s) => ({ ...s, fontSize })),
    setAnimations: (animations) => setSettings((s) => ({ ...s, animations })),
    t: (en, ar) => (settings.lang === "ar" ? ar : en),
  };

  return <SettingsCtx.Provider value={value}>{children}</SettingsCtx.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsCtx);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
