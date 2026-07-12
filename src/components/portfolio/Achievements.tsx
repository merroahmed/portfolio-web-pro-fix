import { useSettings } from "@/contexts/SettingsContext";
import { ACHIEVEMENTS } from "@/lib/portfolio-data";
import { SectionLabel } from "./About";
import { Globe, GraduationCap, Palette, Presentation, Star } from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, GraduationCap, Palette, Presentation, Star,
};

export function Achievements() {
  const { t } = useSettings();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <SectionLabel>{t("Featured achievements", "أبرز الإنجازات")}</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t("Badges I'm proud of", "شارات أفخر بها")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {ACHIEVEMENTS.map((a) => {
            const Icon = ICONS[a.icon] ?? Star;
            return (
              <div key={a.title} className="glass rounded-2xl p-5 text-center hover-lift">
                <div className="mx-auto h-14 w-14 rounded-full bg-gradient-brand grid place-items-center shadow-glow">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="mt-3 text-sm font-medium">{a.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
