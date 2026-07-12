import { useMemo, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { CERTIFICATES, drivePreview, driveThumb } from "@/lib/portfolio-data";
import { SectionLabel } from "./About";
import { Award, Search, X, Download, ExternalLink } from "lucide-react";

export function Certificates() {
  const { t } = useSettings();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const cats = useMemo(() => ["All", ...Array.from(new Set(CERTIFICATES.map((c) => c.category)))], []);
  const list = useMemo(() => CERTIFICATES.filter((c) => {
    return (cat === "All" || c.category === cat) &&
      (!q || (c.name + c.org).toLowerCase().includes(q.toLowerCase()));
  }), [q, cat]);

  return (
    <section id="certificates" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <SectionLabel>{t("Certificates", "الشهادات")}</SectionLabel>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold">{t("Earned & celebrated", "مكتسبة ومحتفى بها")}</h2>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("Search certificates…", "ابحث…")}
              className="w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium border transition ${
                  cat === c ? "bg-gradient-brand text-primary-foreground border-transparent" : "glass border-glass-border hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((c, i) => {
            const thumb = driveThumb(c.url);
            return (
              <div key={c.url} className="group glass rounded-3xl overflow-hidden hover-lift">
                <button
                  onClick={() => setOpen(i)}
                  className="block w-full aspect-video bg-muted relative overflow-hidden"
                >
                  {thumb ? (
                    <img
                      src={thumb}
                      alt={c.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-muted-foreground">
                      <Award className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition grid place-items-center">
                    <span className="text-sm font-medium text-white">{t("View fullscreen", "عرض كامل")}</span>
                  </div>
                </button>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--brand)]">{c.category}</div>
                  <h3 className="mt-1 font-semibold">{c.name}</h3>
                  <p className="text-sm text-muted-foreground">{c.org} · {c.date}</p>
                </div>
              </div>
            );
          })}
        </div>

        {open !== null && (
          <Lightbox
            cert={list[open]}
            onClose={() => setOpen(null)}
          />
        )}
      </div>
    </section>
  );
}

function Lightbox({ cert, onClose }: { cert: typeof CERTIFICATES[number]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md p-4 grid place-items-center" onClick={onClose}>
      <div className="relative w-full max-w-5xl aspect-video glass-strong rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={drivePreview(cert.url)}
          className="absolute inset-0 h-full w-full"
          allow="autoplay"
          title={cert.name}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <a href={cert.url} target="_blank" rel="noopener noreferrer" className="grid place-items-center h-10 w-10 rounded-full glass-strong hover:bg-muted" aria-label="Open">
            <ExternalLink className="h-5 w-5" />
          </a>
          <a href={cert.url.replace("/view", "/edit")} target="_blank" rel="noopener noreferrer" className="grid place-items-center h-10 w-10 rounded-full glass-strong hover:bg-muted" aria-label="Download">
            <Download className="h-5 w-5" />
          </a>
          <button onClick={onClose} className="grid place-items-center h-10 w-10 rounded-full glass-strong hover:bg-muted" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
