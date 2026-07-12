import { useSettings } from "@/contexts/SettingsContext";
import { TIMELINE } from "@/lib/portfolio-data";
import { SectionLabel } from "./About";
import { Sparkles } from "lucide-react";

export function Timeline() {
  const { t, lang } = useSettings();
  return (
    <section id="journey" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <SectionLabel>{t("My journey", "رحلتي")}</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t("Growth, year by year", "النمو سنة بعد سنة")}</h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--brand)] via-[var(--brand-2)] to-transparent" />
          <div className="space-y-10">
            {TIMELINE.map((m, i) => (
              <div key={m.year} className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 grid place-items-center h-8 w-8 rounded-full bg-gradient-brand shadow-glow">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className={i % 2 ? "md:text-left md:pl-10" : "md:text-right md:pr-10"}>
                  <div className="text-5xl font-bold text-gradient">{m.year}</div>
                  <h3 className="mt-1 text-xl font-semibold">{t(m.title, m.titleAr)}</h3>
                </div>
                <div className={i % 2 ? "md:pr-10 md:text-right" : "md:pl-10"}>
                  <div className="glass rounded-2xl p-5 hover-lift">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {(lang === "ar" ? m.itemsAr : m.items).map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className="text-[var(--brand)]">▸</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
