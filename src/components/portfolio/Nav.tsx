import { useSettings } from "@/contexts/SettingsContext";

const SECTIONS = [
  { id: "home", en: "Home", ar: "الرئيسية" },
  { id: "about", en: "About", ar: "نبذة" },
  { id: "tech", en: "Tech", ar: "مهارات" },
  { id: "journey", en: "Journey", ar: "رحلتي" },
  { id: "projects", en: "Projects", ar: "مشاريع" },
  { id: "certificates", en: "Certificates", ar: "شهادات" },
  { id: "gallery", en: "Gallery", ar: "أعمال" },
  { id: "contact", en: "Contact", ar: "تواصل" },
];

export function Nav() {
  const { t } = useSettings();
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 glass rounded-full px-2 py-2 hidden md:flex items-center gap-1 text-sm">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition"
        >
          {t(s.en, s.ar)}
        </a>
      ))}
    </nav>
  );
}
