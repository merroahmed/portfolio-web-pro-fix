import { useMemo, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { PROJECTS } from "@/lib/portfolio-data";
import { SectionLabel } from "./About";
import { ExternalLink, Search, Star } from "lucide-react";

export function Projects() {
  const { t } = useSettings();
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string>("All");

  const tags = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))], []);

  const list = useMemo(() => PROJECTS.filter((p) => {
    const matchTag = tag === "All" || p.tags.includes(tag);
    const matchQ = !q || (p.title + p.description).toLowerCase().includes(q.toLowerCase());
    return matchTag && matchQ;
  }), [q, tag]);

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <SectionLabel>{t("Projects", "المشاريع")}</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t("Things I've built", "أعمالي التي بنيتها")}</h2>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("Search projects…", "ابحث في المشاريع…")}
              className="w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tg) => (
              <button
                key={tg}
                onClick={() => setTag(tg)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition ${
                  tag === tg ? "bg-gradient-brand text-primary-foreground border-transparent" : "glass border-glass-border hover:bg-muted"
                }`}
              >
                {tg}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative glass rounded-3xl p-6 hover-lift overflow-hidden ${p.featured ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              {p.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-gradient-brand text-primary-foreground text-[10px] uppercase tracking-wider px-2 py-1">
                  <Star className="h-3 w-3" /> Featured
                </div>
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition" style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.78 0.2 var(--brand-h)/0.18), transparent 60%)" }} />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{p.tags.join(" · ")}</div>
                <h3 className="mt-2 text-xl md:text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm text-[var(--brand)]">
                  {t("Visit", "زيارة")} <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">{t("No projects match your search.", "لا توجد نتائج.")}</p>
        )}
      </div>
    </section>
  );
}
