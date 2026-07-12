import { useEffect, useState, useRef } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { STATS } from "@/lib/portfolio-data";
import { Rocket, Presentation, Sparkles, Image as ImageIcon, Award } from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket, Presentation, Sparkles, Image: ImageIcon, Award,
};

export function Stats() {
  const { t } = useSettings();
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-5 gap-4">
        {STATS.map((s) => {
          const Icon = ICONS[s.icon] ?? Sparkles;
          return (
            <div key={s.key} className="glass rounded-2xl p-5 text-center hover-lift">
              <Icon className="mx-auto h-7 w-7 text-[var(--brand)]" />
              <div className="mt-3 text-4xl font-bold text-gradient">
                <Counter to={s.value} />+
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{t(s.label, s.labelAr)}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Counter({ to, duration = 1500 }: { to: number; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{n}</span>;
}
