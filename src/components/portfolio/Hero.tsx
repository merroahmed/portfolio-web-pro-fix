import { useEffect, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { PROFILE } from "@/lib/portfolio-data";
import { ArrowRight, Mail, Download } from "lucide-react";

export function Hero() {
  const { t, lang } = useSettings();
  const roles = lang === "ar"
    ? ["مطوّرة واجهات أمامية", "مصمّمة شعارات", "مصمّمة عروض", "مبدعة رقمية"]
    : ["Front-End Developer", "Logo Designer", "Presentation Designer", "Creative Mind"];
  const text = useTyping(roles, 90, 1500);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* gradient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-[var(--brand)] opacity-30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute bottom-0 -right-20 h-[420px] w-[420px] rounded-full bg-[var(--brand-2)] opacity-25 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />

      <div className="relative max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground animate-fade-up">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          {t("Available for new projects", "متاحة لمشاريع جديدة")}
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {t("Hi, I'm ", "مرحبًا، أنا ")}
          <span className="text-gradient">{lang === "ar" ? PROFILE.nameAr : PROFILE.name}</span>
        </h1>

        <div className="mt-6 h-10 text-xl md:text-2xl text-muted-foreground animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <span>{text}</span>
          <span className="ml-1 inline-block w-[2px] h-6 bg-[var(--brand)] align-middle animate-pulse" />
        </div>

        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground animate-fade-up" style={{ animationDelay: "0.3s" }}>
          {t(
            "I craft beautiful, useful digital experiences — from clean front-end code to expressive logos, posters and presentations.",
            "أصمّم وأطوّر تجارب رقمية جميلة ومفيدة — من أكواد واجهات نظيفة إلى شعارات وبوسترات وعروض تقديمية مميزة."
          )}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-6 py-3 font-medium shadow-glow hover:scale-105 transition">
            {t("See my work", "شاهد أعمالي")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:bg-muted transition">
            <Mail className="h-4 w-4" /> {t("Contact me", "تواصل معي")}
          </a>
          <a href="#cv" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:bg-muted transition">
            <Download className="h-4 w-4" /> {t("Download CV", "تحميل السيرة")}
          </a>
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground animate-float">
        {t("Scroll", "مرّر")} ↓
      </a>
    </section>
  );
}

function useTyping(words: string[], speed = 90, pause = 1400) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setSub(word.slice(0, sub.length + 1));
        if (sub.length + 1 === word.length) setTimeout(() => setDel(true), pause);
      } else {
        setSub(word.slice(0, sub.length - 1));
        if (sub.length - 1 === 0) {
          setDel(false);
          setIdx((i) => i + 1);
        }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [sub, del, idx, words, speed, pause]);
  return sub;
}
