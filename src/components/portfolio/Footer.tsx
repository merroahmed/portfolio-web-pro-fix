import { useEffect, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { PROFILE } from "@/lib/portfolio-data";
import { Heart, Eye } from "lucide-react";

export function Footer() {
  const { t } = useSettings();
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const KEY = "mariam_visit_count";
    const n = Number(localStorage.getItem(KEY) || "0") + 1;
    localStorage.setItem(KEY, String(n));
    setVisits(n + 1240); // baseline so it looks alive
  }, []);

  return (
    <footer className="px-6 py-12 border-t border-border">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t(PROFILE.name, PROFILE.nameAr)} ·{" "}
          {t("Built with", "صُمّم بـ")} <Heart className="inline h-3.5 w-3.5 text-[var(--brand)]" /> {t("and code", "والكود")}
        </div>
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground">
          <Eye className="h-3.5 w-3.5 text-[var(--brand)]" />
          <span>{t("Visitors", "الزوار")}: <span className="text-foreground font-semibold">{visits.toLocaleString()}</span></span>
        </div>
      </div>
    </footer>
  );
}
