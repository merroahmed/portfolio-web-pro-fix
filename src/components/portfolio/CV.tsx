import { useSettings } from "@/contexts/SettingsContext";
import { SectionLabel } from "./About";
import { Download, Eye, FileText } from "lucide-react";

export function CV() {
  const { t } = useSettings();
  return (
    <section id="cv" className="px-6 py-20">
      <div className="mx-auto max-w-4xl glass-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[var(--brand)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[var(--brand-2)] opacity-20 blur-3xl" />
        
        <div className="relative">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow">
            <FileText className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <div className="mt-4 flex justify-center">
            <SectionLabel>{t("Resume", "السيرة الذاتية")}</SectionLabel>
          </div>
          
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">{t("Want the full story?", "تريد القصة كاملة؟")}</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            {t(
              "Grab my CV for a deeper look at my experience, projects and skills.",
              "حمّل سيرتي الذاتية لنظرة أعمق على خبرتي ومشاريعي ومهاراتي."
            )}
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {/* زرار تحميل السيرة الذاتية - مربوط بلينك كانفا الخاص بكِ */}
            <a
              href="https://canva.link/wyx8lgwdpvtskag"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-6 py-3 font-medium shadow-glow hover:scale-105 transition"
            >
              <Download className="h-4 w-4" /> {t("Download CV", "تحميل السيرة")}
            </a>
            
            {/* زرار معاينة السيرة الذاتية - مربوط بلينك كانفا الخاص بكِ */}
            <a
              href="https://canva.link/wyx8lgwdpvtskag"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:bg-muted transition hover:scale-105"
            >
              <Eye className="h-4 w-4" /> {t("Preview", "معاينة")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}