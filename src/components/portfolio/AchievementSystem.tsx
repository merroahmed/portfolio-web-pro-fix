import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSettings } from "@/contexts/SettingsContext";

// Mini achievement system: unlock badges via interactions
export function AchievementSystem() {
  const { t } = useSettings();
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const KEY = "mariam_achievements";
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUnlocked(new Set(JSON.parse(raw)));
    } catch {}

    const save = (s: Set<string>) => {
      try { localStorage.setItem(KEY, JSON.stringify(Array.from(s))); } catch {}
    };

    const unlock = (id: string, name: string, ar: string) => {
      setUnlocked((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev); next.add(id); save(next);
        toast.success(`🏆 ${t("Achievement unlocked", "إنجاز جديد")}: ${t(name, ar)}`);
        return next;
      });
    };

    // First explorer — scroll past hero
    const onScroll = () => {
      if (window.scrollY > 600) unlock("explorer", "Explorer", "مستكشف");
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40) {
        unlock("completionist", "Completionist", "مُكمِل");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Konami-ish: press "M" three times for an easter egg
    let mCount = 0;
    let mTimer: number | undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") {
        mCount++;
        window.clearTimeout(mTimer);
        mTimer = window.setTimeout(() => (mCount = 0), 800);
        if (mCount >= 3) {
          mCount = 0;
          unlock("easter", "Easter egg hunter", "صائد المفاجآت");
          document.documentElement.animate(
            [{ filter: "hue-rotate(0)" }, { filter: "hue-rotate(360deg)" }],
            { duration: 1500 }
          );
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [t]);

  return null;
}
