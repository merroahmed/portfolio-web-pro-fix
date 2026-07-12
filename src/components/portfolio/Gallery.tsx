import { useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { PRESENTATIONS, LOGOS, POSTERS, drivePreview, driveThumb } from "@/lib/portfolio-data";
import { SectionLabel } from "./About";
import { ExternalLink, Presentation, Sparkles, Image as ImageIcon } from "lucide-react";

type Tab = "presentations" | "logos" | "posters";

export function Gallery() {
  const { t } = useSettings();
  const [tab, setTab] = useState<Tab>("presentations");

  const tabs: { id: Tab; en: string; ar: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "presentations", en: "Presentations", ar: "العروض", Icon: Presentation },
    { id: "logos", en: "Logos", ar: "الشعارات", Icon: Sparkles },
    { id: "posters", en: "Posters", ar: "البوسترات", Icon: ImageIcon },
  ];

  const data = tab === "presentations" ? PRESENTATIONS : tab === "logos" ? LOGOS : POSTERS;

  return (
    <section id="gallery" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <SectionLabel>{t("Creative gallery", "معرض الأعمال")}</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t("Designs from my desk", "تصاميم من إبداعي")}</h2>
        </div>

        <div className="flex justify-center mb-8">
          <div className="glass rounded-full p-1.5 flex gap-1">
            {tabs.map(({ id, en, ar, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 transition ${
                  tab === id ? "bg-gradient-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" /> {t(en, ar)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((item, i) => {
            const thumb = driveThumb(item.url);
            return (
              <a
                key={item.url + i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass rounded-3xl overflow-hidden hover-lift block"
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {thumb ? (
                    <img src={thumb} alt={item.title} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-brand opacity-20 group-hover:opacity-40 transition" />
                  )}
                  {!thumb && (
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="text-2xl font-bold text-gradient">{item.title}</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="font-medium">{item.title}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--brand)]">
                    {t("Open", "فتح")} <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
