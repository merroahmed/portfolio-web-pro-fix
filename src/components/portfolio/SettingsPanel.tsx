import { useState } from "react";
import { Settings as SettingsIcon, X, Sun, Moon, Languages, Sparkles, Type } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

const HUES = [280, 320, 0, 30, 60, 140, 190, 230];

export function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const s = useSettings();

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow hover:scale-105 transition"
        aria-label={s.t("Open settings", "إعدادات")}
      >
        <SettingsIcon className="h-6 w-6" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[340px] max-w-[92vw] glass-strong p-6 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        dir="ltr"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">{s.t("Settings", "الإعدادات")}</h3>
          <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <Row icon={<Languages className="h-4 w-4" />} label={s.t("Language", "اللغة")}>
            <div className="flex gap-2">
              {(["en", "ar"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => s.setLang(l)}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium border transition ${
                    s.lang === l ? "bg-gradient-brand text-primary-foreground border-transparent" : "border-border hover:bg-muted"
                  }`}
                >
                  {l === "en" ? "English" : "العربية"}
                </button>
              ))}
            </div>
          </Row>

          <Row icon={s.theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} label={s.t("Theme", "السمة")}>
            <div className="flex gap-2">
              {(["dark", "light"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => s.setTheme(t)}
                  className={`flex-1 rounded-lg py-2 text-sm font-medium border transition ${
                    s.theme === t ? "bg-gradient-brand text-primary-foreground border-transparent" : "border-border hover:bg-muted"
                  }`}
                >
                  {t === "dark" ? s.t("Dark", "داكن") : s.t("Light", "فاتح")}
                </button>
              ))}
            </div>
          </Row>

          <Row icon={<Sparkles className="h-4 w-4" />} label={s.t("Theme color", "لون السمة")}>
            <div className="flex flex-wrap gap-2">
              {HUES.map((h) => (
                <button
                  key={h}
                  onClick={() => s.setHue(h)}
                  className={`h-9 w-9 rounded-full border-2 transition ${s.hue === h ? "ring-2 ring-offset-2 ring-offset-card scale-110" : ""}`}
                  style={{ background: `oklch(0.72 0.2 ${h})`, borderColor: s.hue === h ? `oklch(0.72 0.2 ${h})` : "transparent" }}
                  aria-label={`Hue ${h}`}
                />
              ))}
            </div>
          </Row>

          <Row icon={<Type className="h-4 w-4" />} label={`${s.t("Font size", "حجم الخط")}: ${s.fontSize}px`}>
            <input
              type="range" min={13} max={20} step={1}
              value={s.fontSize}
              onChange={(e) => s.setFontSize(Number(e.target.value))}
              className="w-full accent-[var(--brand)]"
            />
          </Row>

          <Row icon={<Sparkles className="h-4 w-4" />} label={s.t("Animations", "الحركة")}>
            <button
              onClick={() => s.setAnimations(!s.animations)}
              className={`w-full rounded-lg py-2 text-sm font-medium border transition ${
                s.animations ? "bg-gradient-brand text-primary-foreground border-transparent" : "border-border hover:bg-muted"
              }`}
            >
              {s.animations ? s.t("On", "مفعّل") : s.t("Off", "متوقّف")}
            </button>
          </Row>
        </div>
      </aside>
    </>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}
