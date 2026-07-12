import { useEffect, useRef, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { TECH_STACK } from "@/lib/portfolio-data";
import { SectionLabel } from "./About";

export function TechStack() {
  const { t } = useSettings();
  return (
    <section id="tech" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <SectionLabel>{t("Tech stack", "المهارات")}</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t("Skills & tools I use", "مهاراتي وأدواتي")}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {TECH_STACK.map((g) => (
            <div key={g.group} className="glass rounded-3xl p-6 hover-lift">
              <h3 className="text-lg font-semibold mb-4 text-gradient">{t(g.group, g.groupAr)}</h3>
              <div className="space-y-3">
                {g.items.map((it) => (
                  <Bar key={it.name} name={it.name} level={it.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bar({ name, level }: { name: string; level: number }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) setW(level);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [level]);
  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-brand transition-[width] duration-1000 ease-out"
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  );
}
