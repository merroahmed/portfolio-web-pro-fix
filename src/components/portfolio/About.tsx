import { useState, useEffect } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { FUN_FACTS, QUOTES, PROFILE } from "@/lib/portfolio-data";
import { Lightbulb, Quote, RefreshCw, FileText } from "lucide-react";

export function About() {
  const { t, lang } = useSettings();
  const [factIdx, setFactIdx] = useState(0);
  const [quoteIdx] = useState(() => Math.floor(Date.now() / 86400000) % QUOTES.length);

  useEffect(() => {
    setFactIdx(Math.floor(Math.random() * FUN_FACTS.length));
  }, []);

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 glass rounded-3xl p-8 md:p-10 flex flex-col justify-between">
          <div>
            <SectionLabel>{t("About me", "نبذة عني")}</SectionLabel>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold">
              {t("Designing & coding ", "أصمّم وأبرمج ")}
              <span className="text-gradient">{t("with love.", "بشغف.")}</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {t(
                `I'm ${PROFILE.name}, a young Front-End Developer and Creative Designer. I've been learning programming and design for over two years, mixing clean code with thoughtful visuals. I love turning ideas into interfaces, brands and stories that feel alive.`,
                `أنا ${PROFILE.nameAr}، مطوّرة واجهات أمامية ومصمّمة مبدعة. أتعلّم البرمجة والتصميم منذ أكثر من سنتين، وأمزج بين الكود النظيف والبصريات المدروسة. أحبّ تحويل الأفكار إلى واجهات وهويّات وقصص حيّة.`
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(lang === "ar"
                ? ["تطوير ويب", "HTML", "CSS", "JavaScript", "TypeScript", "React", "UI/UX", "تصميم شعارات", "تصميم بوسترات", "تصميم عروض", "تسويق رقمي"]
                : ["Web Dev", "HTML", "CSS", "JavaScript", "TypeScript", "React", "UI/UX", "Logo Design", "Poster Design", "Presentation Design", "Digital Marketing"]
              ).map((s) => (
                <span key={s} className="rounded-full glass px-3 py-1 text-xs">{s}</span>
              ))}
            </div>
          </div>

          {/* ⬇️ زرار الـ CV المرتبط بلينك كانفا الخاص بكِ ⬇️ */}
          <div className="mt-8 pt-4 border-t border-white/5">
            <a 
              href="https://canva.link/wyx8lgwdpvtskag" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-medium text-white transition-all hover:opacity-90 shadow-lg shadow-[var(--brand)]/20 active:scale-95"
            >
              <FileText className="h-4 w-4" />
              {t("Download CV", "تحميل السيرة الذاتية")}
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-3xl p-6 hover-lift">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Quote className="h-4 w-4 text-[var(--brand)]" />
              {t("Quote of the day", "اقتباس اليوم")}
            </div>
            <p className="mt-3 text-lg italic">"{QUOTES[quoteIdx].q}"</p>
            <p className="mt-2 text-sm text-muted-foreground">— {QUOTES[quoteIdx].a}</p>
          </div>

          <div className="glass rounded-3xl p-6 hover-lift">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-[var(--brand)]" />
                {t("Random fact about me", "حقيقة عشوائية عنّي")}
              </span>
              <button 
                onClick={() => setFactIdx((i) => (i + 1) % FUN_FACTS.length)} 
                className="p-1 rounded hover:bg-muted"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3">{FUN_FACTS[factIdx]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
      {children}
    </div>
  );
}
