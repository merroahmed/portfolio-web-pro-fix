import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { toast, Toaster } from "sonner";
import { useState, useEffect, createContext, useContext, useRef, useMemo } from "react";
import { Settings, X, Languages, Moon, Sun, Sparkles, Type, ArrowRight, Mail, Download, Award, Image, Presentation, Rocket, FileText, Quote, Lightbulb, RefreshCw, Search, Star, ExternalLink, Palette, GraduationCap, Globe, Eye, MessageCircle, Phone, Send, Copy, Heart } from "lucide-react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
const SettingsCtx = createContext(null);
const STORAGE_KEY = "mariam_portfolio_settings_v1";
const defaults = {
  lang: "en",
  theme: "dark",
  hue: 280,
  fontSize: 16,
  animations: true
};
function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaults);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...defaults, ...JSON.parse(raw) });
    } catch {
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
    }
    const root = document.documentElement;
    root.classList.toggle("light", settings.theme === "light");
    root.classList.toggle("dark", settings.theme === "dark");
    root.classList.toggle("no-anim", !settings.animations);
    root.setAttribute("lang", settings.lang);
    root.setAttribute("dir", settings.lang === "ar" ? "rtl" : "ltr");
    root.style.setProperty("--brand-h", String(settings.hue));
    root.style.setProperty("--app-font-size", `${settings.fontSize}px`);
  }, [settings]);
  const value = {
    ...settings,
    setLang: (lang) => setSettings((s) => ({ ...s, lang })),
    setTheme: (theme) => setSettings((s) => ({ ...s, theme })),
    setHue: (hue) => setSettings((s) => ({ ...s, hue })),
    setFontSize: (fontSize) => setSettings((s) => ({ ...s, fontSize })),
    setAnimations: (animations) => setSettings((s) => ({ ...s, animations })),
    t: (en, ar) => settings.lang === "ar" ? ar : en
  };
  return /* @__PURE__ */ jsx(SettingsCtx.Provider, { value, children });
}
function useSettings() {
  const ctx = useContext(SettingsCtx);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
function ParticlesBackground() {
  const ref = useRef(null);
  const { animations, hue } = useSettings();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(80, Math.floor(canvas.width * canvas.height / 24e3));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.6
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.78 0.2 ${hue} / 0.6)`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `oklch(0.78 0.2 ${hue} / ${0.18 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      if (animations) raf = requestAnimationFrame(tick);
    };
    if (animations) raf = requestAnimationFrame(tick);
    else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [animations, hue]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref,
      className: "pointer-events-none fixed inset-0 -z-10 opacity-60",
      "aria-hidden": true
    }
  );
}
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => {
      const t = e.target;
      setActive(!!t.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `custom-cursor ${active ? "active" : ""}`,
      style: { transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)` },
      "aria-hidden": true
    }
  );
}
const HUES = [280, 320, 0, 30, 60, 140, 190, 230];
function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const s = useSettings();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        className: "fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow hover:scale-105 transition",
        "aria-label": s.t("Open settings", "إعدادات"),
        children: /* @__PURE__ */ jsx(Settings, { className: "h-6 w-6" })
      }
    ),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm",
        onClick: () => setOpen(false)
      }
    ),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `fixed top-0 right-0 z-50 h-full w-[340px] max-w-[92vw] glass-strong p-6 overflow-y-auto transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`,
        dir: "ltr",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: s.t("Settings", "الإعدادات") }),
            /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), "aria-label": "Close", className: "rounded-full p-2 hover:bg-muted", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(Languages, { className: "h-4 w-4" }), label: s.t("Language", "اللغة"), children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["en", "ar"].map((l) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => s.setLang(l),
                className: `flex-1 rounded-lg py-2 text-sm font-medium border transition ${s.lang === l ? "bg-gradient-brand text-primary-foreground border-transparent" : "border-border hover:bg-muted"}`,
                children: l === "en" ? "English" : "العربية"
              },
              l
            )) }) }),
            /* @__PURE__ */ jsx(Row, { icon: s.theme === "dark" ? /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }), label: s.t("Theme", "السمة"), children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["dark", "light"].map((t) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => s.setTheme(t),
                className: `flex-1 rounded-lg py-2 text-sm font-medium border transition ${s.theme === t ? "bg-gradient-brand text-primary-foreground border-transparent" : "border-border hover:bg-muted"}`,
                children: t === "dark" ? s.t("Dark", "داكن") : s.t("Light", "فاتح")
              },
              t
            )) }) }),
            /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }), label: s.t("Theme color", "لون السمة"), children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: HUES.map((h) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => s.setHue(h),
                className: `h-9 w-9 rounded-full border-2 transition ${s.hue === h ? "ring-2 ring-offset-2 ring-offset-card scale-110" : ""}`,
                style: { background: `oklch(0.72 0.2 ${h})`, borderColor: s.hue === h ? `oklch(0.72 0.2 ${h})` : "transparent" },
                "aria-label": `Hue ${h}`
              },
              h
            )) }) }),
            /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(Type, { className: "h-4 w-4" }), label: `${s.t("Font size", "حجم الخط")}: ${s.fontSize}px`, children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "range",
                min: 13,
                max: 20,
                step: 1,
                value: s.fontSize,
                onChange: (e) => s.setFontSize(Number(e.target.value)),
                className: "w-full accent-[var(--brand)]"
              }
            ) }),
            /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }), label: s.t("Animations", "الحركة"), children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => s.setAnimations(!s.animations),
                className: `w-full rounded-lg py-2 text-sm font-medium border transition ${s.animations ? "bg-gradient-brand text-primary-foreground border-transparent" : "border-border hover:bg-muted"}`,
                children: s.animations ? s.t("On", "مفعّل") : s.t("Off", "متوقّف")
              }
            ) })
          ] })
        ]
      }
    )
  ] });
}
function Row({ icon, label, children }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center gap-2 text-sm text-muted-foreground", children: [
      icon,
      /* @__PURE__ */ jsx("span", { children: label })
    ] }),
    children
  ] });
}
const SECTIONS = [
  { id: "home", en: "Home", ar: "الرئيسية" },
  { id: "about", en: "About", ar: "نبذة" },
  { id: "tech", en: "Tech", ar: "مهارات" },
  { id: "journey", en: "Journey", ar: "رحلتي" },
  { id: "projects", en: "Projects", ar: "مشاريع" },
  { id: "certificates", en: "Certificates", ar: "شهادات" },
  { id: "gallery", en: "Gallery", ar: "أعمال" },
  { id: "contact", en: "Contact", ar: "تواصل" }
];
function Nav() {
  const { t } = useSettings();
  return /* @__PURE__ */ jsx("nav", { className: "fixed top-4 left-1/2 -translate-x-1/2 z-40 glass rounded-full px-2 py-2 hidden md:flex items-center gap-1 text-sm", children: SECTIONS.map((s) => /* @__PURE__ */ jsx(
    "a",
    {
      href: `#${s.id}`,
      className: "px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition",
      children: t(s.en, s.ar)
    },
    s.id
  )) });
}
const PROFILE = {
  name: "Mariam Adel",
  nameAr: "مريم عادل",
  email: "merro.adel@gmail.com",
  discord: "mariam_adel2010",
  phone: "01024258281"
};
const STATS = [
  { key: "projects", label: "Projects Completed", labelAr: "مشاريع منجزة", value: 9, icon: "Rocket" },
  { key: "presentations", label: "Presentations Created", labelAr: "عروض تقديمية", value: 6, icon: "Presentation" },
  { key: "logos", label: "Logos Designed", labelAr: "شعارات", value: 6, icon: "Sparkles" },
  { key: "posters", label: "Posters Designed", labelAr: "بوسترات", value: 7, icon: "Image" },
  { key: "certificates", label: "Certificates Earned", labelAr: "شهادات", value: 8, icon: "Award" }
];
const PROJECTS = [
  { title: "Featured Portfolio Preview", url: "https://id-preview--aefc9898-5fd8-4522-826e-f6d0c5b4d253.lovable.app/", description: "A polished featured project showcasing creative front-end work.", tags: ["React", "Featured"], featured: true },
  { title: "Moon Website", url: "https://merroahmed.github.io/moon-website2/", description: "An atmospheric landing experience exploring the moon.", tags: ["HTML", "CSS", "JS"] },
  { title: "Food Web", url: "https://merroahmed.github.io/food-web-2/", description: "A vibrant food-themed responsive website.", tags: ["HTML", "CSS"] },
  { title: "Personal Portfolio v1", url: "https://merroahmed.github.io/portofolio-web", description: "First iteration of my personal portfolio.", tags: ["HTML", "CSS"] },
  { title: "Learning Website", url: "https://merroahmed.github.io/learning-website.com", description: "An online learning landing page.", tags: ["HTML", "CSS"] },
  { title: "Marketing Site", url: "https://merroahmed.github.io/marketing/", description: "Digital marketing focused landing page.", tags: ["Marketing"] },
  { title: "Shop Website", url: "https://merroahmed.github.io/shop-website/", description: "E-commerce styled site with product cards.", tags: ["HTML", "CSS", "JS"] },
  { title: "Shopping Web", url: "https://merroahmed.github.io/shoping-web/", description: "Another shopping experience exploration.", tags: ["HTML", "CSS"] },
  { title: "Learning Web", url: "https://merroahmed.github.io/learning-web/", description: "Educational website with course layout.", tags: ["HTML", "CSS"] }
];
const PRESENTATIONS = [
  "https://canva.link/ds8c8cy6mkblupn",
  "https://canva.link/3r02da0mkvhtix0",
  "https://canva.link/l7a6gupdm3zusgy",
  "https://canva.link/3uba5ww9n61b843",
  "https://canva.link/fqyv092wr2brpi7",
  "https://canva.link/s3692wpzmvfsn9s"
].map((url, i) => ({ url, title: `Presentation ${i + 1}` }));
const LOGOS = [
  "https://canva.link/jyder83idcjm66g",
  "https://canva.link/voeig5h9bf8tqm1",
  "https://canva.link/d9f1t59vw6lt6wb",
  "https://canva.link/c5khljhdosofyta",
  "https://canva.link/h9p9ax0y5f4d1q1",
  "https://canva.link/u2i6urjs4r26zcz"
].map((url, i) => ({ url, title: `Logo ${i + 1}` }));
const POSTERS = [
  "https://canva.link/eilvm4g3o2jbfmo",
  "https://drive.google.com/file/d/1ccoWb6PeS-h7SWRGb5abxjNTF5O5O8tp/view",
  "https://drive.google.com/file/d/1T-uXwwCsBmdWET-g2FJMkA1jF1cdENK1/view",
  "https://drive.google.com/file/d/10cd4UXpk41tnkRcup005T4FiKFjS3vg7/view",
  "https://drive.google.com/file/d/1eH772dJnBLoBVrkafpfypvAMOyx5J8Qk/view",
  "https://drive.google.com/file/d/1TfIqZcy0FUGZMROALpQpa70L0rdKXDTK/view",
  "https://drive.google.com/file/d/1YXyumH1yVmUrbEm4pi598epRI8EcRMD4/view"
].map((url, i) => ({ url, title: `Poster ${i + 1}` }));
function drivePreview(url) {
  const m = url.match(/\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  return url;
}
function driveThumb(url) {
  const m = url.match(/\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;
  return null;
}
const CERTIFICATES = [
  { url: "https://drive.google.com/file/d/13t01wS--_Ypq0o7BdR4ID6FxN0NBdCDa/view", name: "Web Development", org: "Online Course", date: "2024", category: "Development" },
  { url: "https://drive.google.com/file/d/1o_kJvfXZ3ncG0JjBeLMvcyT1jTLFIDTV/view", name: "HTML & CSS Mastery", org: "Online Course", date: "2024", category: "Development" },
  { url: "https://drive.google.com/file/d/1vbdiD9KzIf785BMxk06Z13oyq_3oaXrU/view", name: "JavaScript Essentials", org: "Online Course", date: "2025", category: "Development" },
  { url: "https://drive.google.com/file/d/15vtjHmVCpm3utali-KJcTedZf-u6DUog/view", name: "React Basics", org: "Online Course", date: "2025", category: "Development" },
  { url: "https://drive.google.com/file/d/1w1RHImFbft0UKZbhQolnAL1woE0zxPY5/view", name: "UI/UX Foundations", org: "Online Course", date: "2025", category: "Design" },
  { url: "https://drive.google.com/file/d/1R4rgopTXS9gK_N6wnth2SchZ6qyc0Qdw/view", name: "Logo Design", org: "Canva Academy", date: "2025", category: "Design" },
  { url: "https://drive.google.com/file/d/1z0xzdHMUYu92onFIUO9LYz5S_rIzyGY-/view", name: "Digital Marketing", org: "Online Course", date: "2025", category: "Marketing" },
  { url: "https://drive.google.com/file/d/1Fd8lc9_EdCPOHXtcJBmm7i6Rq9BJ3a5D/view", name: "Social Media Marketing", org: "Online Course", date: "2026", category: "Marketing" }
];
const TIMELINE = [
  {
    year: "2024",
    title: "The Beginning",
    titleAr: "البداية",
    items: [
      "Started learning programming",
      "Learned HTML and CSS basics",
      "Created my first simple websites"
    ],
    itemsAr: ["بدأت تعلّم البرمجة", "تعلّمت أساسيات HTML و CSS", "أنشأت أول مواقع بسيطة"]
  },
  {
    year: "2025",
    title: "Growing & Designing",
    titleAr: "النمو والتصميم",
    items: [
      "Learned JavaScript",
      "Built complete responsive websites",
      "Learned design principles",
      "Started presentations, logos and posters"
    ],
    itemsAr: [
      "تعلّمت JavaScript",
      "بنيت مواقع متجاوبة كاملة",
      "تعلّمت أساسيات التصميم",
      "بدأت تصميم العروض والشعارات والبوسترات"
    ]
  },
  {
    year: "2026",
    title: "Going Pro",
    titleAr: "الاحتراف",
    items: [
      "Built multiple real-world projects",
      "Improved front-end skills",
      "Learned TypeScript and React basics",
      "Expanded knowledge in digital marketing",
      "Built a professional portfolio"
    ],
    itemsAr: [
      "أنجزت مشاريع حقيقية متعددة",
      "طوّرت مهاراتي في الواجهات الأمامية",
      "تعلّمت أساسيات TypeScript و React",
      "وسّعت معرفتي في التسويق الرقمي",
      "أنشأت بورتفوليو احترافي"
    ]
  }
];
const TECH_STACK = [
  {
    group: "Front-End Development",
    groupAr: "تطوير الواجهات",
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 65 },
      { name: "React", level: 70 },
      { name: "Responsive Design", level: 90 }
    ]
  },
  {
    group: "Tools",
    groupAr: "الأدوات",
    items: [
      { name: "VS Code", level: 95 },
      { name: "Git", level: 75 },
      { name: "GitHub", level: 80 },
      { name: "Canva", level: 95 },
      { name: "Figma", level: 70 }
    ]
  },
  {
    group: "Design Skills",
    groupAr: "مهارات التصميم",
    items: [
      { name: "Logo Design", level: 88 },
      { name: "Poster Design", level: 90 },
      { name: "Presentation Design", level: 92 },
      { name: "Social Media Design", level: 85 }
    ]
  },
  {
    group: "Marketing Skills",
    groupAr: "مهارات التسويق",
    items: [
      { name: "Content Creation", level: 80 },
      { name: "Social Media Marketing", level: 78 },
      { name: "Digital Marketing Basics", level: 75 }
    ]
  }
];
const ACHIEVEMENTS = [
  { title: "Built Multiple Websites", icon: "Globe" },
  { title: "Completed Programming Courses", icon: "GraduationCap" },
  { title: "Designed Logos & Posters", icon: "Palette" },
  { title: "Created Professional Presentations", icon: "Presentation" },
  { title: "Built My Own Portfolio", icon: "Star" }
];
const FUN_FACTS = [
  "I drank way too much coffee writing my first JavaScript loop.",
  "My favourite keyboard shortcut is Ctrl+Z (lifesaver).",
  "I sketch logo ideas on paper before opening Canva.",
  "I once spent 3 hours debugging a missing semicolon.",
  "Dark mode > light mode. Always.",
  "I love clean typography more than I should."
];
const QUOTES = [
  { q: "Design is intelligence made visible.", a: "Alina Wheeler" },
  { q: "First, solve the problem. Then, write the code.", a: "John Johnson" },
  { q: "Creativity is intelligence having fun.", a: "Albert Einstein" },
  { q: "Simplicity is the ultimate sophistication.", a: "Leonardo da Vinci" },
  { q: "Make it work, make it right, make it fast.", a: "Kent Beck" }
];
function Hero() {
  const { t, lang } = useSettings();
  const roles = lang === "ar" ? ["مطوّرة واجهات أمامية", "مصمّمة شعارات", "مصمّمة عروض", "مبدعة رقمية"] : ["Front-End Developer", "Logo Designer", "Presentation Designer", "Creative Mind"];
  const text = useTyping(roles, 90, 1500);
  return /* @__PURE__ */ jsxs("section", { id: "home", className: "relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-[var(--brand)] opacity-30 blur-3xl animate-blob" }),
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute bottom-0 -right-20 h-[420px] w-[420px] rounded-full bg-[var(--brand-2)] opacity-25 blur-3xl animate-blob", style: { animationDelay: "-6s" } }),
    /* @__PURE__ */ jsxs("div", { className: "relative max-w-5xl text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground animate-fade-up", children: [
        /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
        t("Available for new projects", "متاحة لمشاريع جديدة")
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] animate-fade-up", style: { animationDelay: "0.1s" }, children: [
        t("Hi, I'm ", "مرحبًا، أنا "),
        /* @__PURE__ */ jsx("span", { className: "text-gradient", children: lang === "ar" ? PROFILE.nameAr : PROFILE.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 h-10 text-xl md:text-2xl text-muted-foreground animate-fade-up", style: { animationDelay: "0.2s" }, children: [
        /* @__PURE__ */ jsx("span", { children: text }),
        /* @__PURE__ */ jsx("span", { className: "ml-1 inline-block w-[2px] h-6 bg-[var(--brand)] align-middle animate-pulse" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl mx-auto text-muted-foreground animate-fade-up", style: { animationDelay: "0.3s" }, children: t(
        "I craft beautiful, useful digital experiences — from clean front-end code to expressive logos, posters and presentations.",
        "أصمّم وأطوّر تجارب رقمية جميلة ومفيدة — من أكواد واجهات نظيفة إلى شعارات وبوسترات وعروض تقديمية مميزة."
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap justify-center gap-3 animate-fade-up", style: { animationDelay: "0.4s" }, children: [
        /* @__PURE__ */ jsxs("a", { href: "#projects", className: "group inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-6 py-3 font-medium shadow-glow hover:scale-105 transition", children: [
          t("See my work", "شاهد أعمالي"),
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition" })
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#contact", className: "inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:bg-muted transition", children: [
          /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }),
          " ",
          t("Contact me", "تواصل معي")
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "#cv", className: "inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:bg-muted transition", children: [
          /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
          " ",
          t("Download CV", "تحميل السيرة")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("a", { href: "#about", className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground animate-float", children: [
      t("Scroll", "مرّر"),
      " ↓"
    ] })
  ] });
}
function useTyping(words, speed = 90, pause = 1400) {
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
const ICONS$1 = {
  Rocket,
  Presentation,
  Sparkles,
  Image,
  Award
};
function Stats() {
  const { t } = useSettings();
  return /* @__PURE__ */ jsx("section", { className: "px-6 py-20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-5 gap-4", children: STATS.map((s) => {
    const Icon = ICONS$1[s.icon] ?? Sparkles;
    return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 text-center hover-lift", children: [
      /* @__PURE__ */ jsx(Icon, { className: "mx-auto h-7 w-7 text-[var(--brand)]" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 text-4xl font-bold text-gradient", children: [
        /* @__PURE__ */ jsx(Counter, { to: s.value }),
        "+"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: t(s.label, s.labelAr) })
    ] }, s.key);
  }) }) });
}
function Counter({ to, duration = 1500 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
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
  return /* @__PURE__ */ jsx("span", { ref, children: n });
}
function About() {
  const { t, lang } = useSettings();
  const [factIdx, setFactIdx] = useState(0);
  const [quoteIdx] = useState(() => Math.floor(Date.now() / 864e5) % QUOTES.length);
  useEffect(() => {
    setFactIdx(Math.floor(Math.random() * FUN_FACTS.length));
  }, []);
  return /* @__PURE__ */ jsx("section", { id: "about", className: "px-6 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl grid lg:grid-cols-5 gap-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3 glass rounded-3xl p-8 md:p-10 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: t("About me", "نبذة عني") }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-3 text-3xl md:text-5xl font-bold", children: [
          t("Designing & coding ", "أصمّم وأبرمج "),
          /* @__PURE__ */ jsx("span", { className: "text-gradient", children: t("with love.", "بشغف.") })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-muted-foreground leading-relaxed", children: t(
          `I'm ${PROFILE.name}, a young Front-End Developer and Creative Designer. I've been learning programming and design for over two years, mixing clean code with thoughtful visuals. I love turning ideas into interfaces, brands and stories that feel alive.`,
          `أنا ${PROFILE.nameAr}، مطوّرة واجهات أمامية ومصمّمة مبدعة. أتعلّم البرمجة والتصميم منذ أكثر من سنتين، وأمزج بين الكود النظيف والبصريات المدروسة. أحبّ تحويل الأفكار إلى واجهات وهويّات وقصص حيّة.`
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: (lang === "ar" ? ["تطوير ويب", "HTML", "CSS", "JavaScript", "TypeScript", "React", "UI/UX", "تصميم شعارات", "تصميم بوسترات", "تصميم عروض", "تسويق رقمي"] : ["Web Dev", "HTML", "CSS", "JavaScript", "TypeScript", "React", "UI/UX", "Logo Design", "Poster Design", "Presentation Design", "Digital Marketing"]).map((s) => /* @__PURE__ */ jsx("span", { className: "rounded-full glass px-3 py-1 text-xs", children: s }, s)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 pt-4 border-t border-white/5", children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: "https://canva.link/wyx8lgwdpvtskag",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-medium text-white transition-all hover:opacity-90 shadow-lg shadow-[var(--brand)]/20 active:scale-95",
          children: [
            /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
            t("Download CV", "تحميل السيرة الذاتية")
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-6 hover-lift", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Quote, { className: "h-4 w-4 text-[var(--brand)]" }),
          t("Quote of the day", "اقتباس اليوم")
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 text-lg italic", children: [
          '"',
          QUOTES[quoteIdx].q,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "— ",
          QUOTES[quoteIdx].a
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-6 hover-lift", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Lightbulb, { className: "h-4 w-4 text-[var(--brand)]" }),
            t("Random fact about me", "حقيقة عشوائية عنّي")
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setFactIdx((i) => (i + 1) % FUN_FACTS.length),
              className: "p-1 rounded hover:bg-muted",
              children: /* @__PURE__ */ jsx(RefreshCw, { className: "h-4 w-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3", children: FUN_FACTS[factIdx] })
      ] })
    ] })
  ] }) });
}
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground", children: [
    /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[var(--brand)]" }),
    children
  ] });
}
function TechStack() {
  const { t } = useSettings();
  return /* @__PURE__ */ jsx("section", { id: "tech", className: "px-6 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: t("Tech stack", "المهارات") }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-bold", children: t("Skills & tools I use", "مهاراتي وأدواتي") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-5", children: TECH_STACK.map((g) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-6 hover-lift", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4 text-gradient", children: t(g.group, g.groupAr) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: g.items.map((it) => /* @__PURE__ */ jsx(Bar, { name: it.name, level: it.level }, it.name)) })
    ] }, g.group)) })
  ] }) });
}
function Bar({ name, level }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) setW(level);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [level]);
  return /* @__PURE__ */ jsxs("div", { ref, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mb-1.5", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: name }),
      /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
        level,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-full bg-gradient-brand transition-[width] duration-1000 ease-out",
        style: { width: `${w}%` }
      }
    ) })
  ] });
}
function Timeline() {
  const { t, lang } = useSettings();
  return /* @__PURE__ */ jsx("section", { id: "journey", className: "px-6 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: t("My journey", "رحلتي") }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-bold", children: t("Growth, year by year", "النمو سنة بعد سنة") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--brand)] via-[var(--brand-2)] to-transparent" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-10", children: TIMELINE.map((m, i) => /* @__PURE__ */ jsxs("div", { className: `relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-4 md:left-1/2 -translate-x-1/2 grid place-items-center h-8 w-8 rounded-full bg-gradient-brand shadow-glow", children: /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { className: i % 2 ? "md:text-left md:pl-10" : "md:text-right md:pr-10", children: [
          /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold text-gradient", children: m.year }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 text-xl font-semibold", children: t(m.title, m.titleAr) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: i % 2 ? "md:pr-10 md:text-right" : "md:pl-10", children: /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl p-5 hover-lift", children: /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: (lang === "ar" ? m.itemsAr : m.items).map((it) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[var(--brand)]", children: "▸" }),
          /* @__PURE__ */ jsx("span", { children: it })
        ] }, it)) }) }) })
      ] }, m.year)) })
    ] })
  ] }) });
}
function Projects() {
  const { t } = useSettings();
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const tags = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.tags)))], []);
  const list = useMemo(() => PROJECTS.filter((p) => {
    const matchTag = tag === "All" || p.tags.includes(tag);
    const matchQ = !q || (p.title + p.description).toLowerCase().includes(q.toLowerCase());
    return matchTag && matchQ;
  }), [q, tag]);
  return /* @__PURE__ */ jsx("section", { id: "projects", className: "px-6 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: t("Projects", "المشاريع") }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-bold", children: t("Things I've built", "أعمالي التي بنيتها") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-sm w-full", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: q,
            onChange: (e) => setQ(e.target.value),
            placeholder: t("Search projects…", "ابحث في المشاريع…"),
            className: "w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tg) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setTag(tg),
          className: `rounded-full px-3 py-1.5 text-xs font-medium border transition ${tag === tg ? "bg-gradient-brand text-primary-foreground border-transparent" : "glass border-glass-border hover:bg-muted"}`,
          children: tg
        },
        tg
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: list.map((p) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: p.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: `group relative glass rounded-3xl p-6 hover-lift overflow-hidden ${p.featured ? "md:col-span-2 lg:col-span-2" : ""}`,
        children: [
          p.featured && /* @__PURE__ */ jsxs("div", { className: "absolute top-4 right-4 flex items-center gap-1 rounded-full bg-gradient-brand text-primary-foreground text-[10px] uppercase tracking-wider px-2 py-1", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-3 w-3" }),
            " Featured"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition", style: { background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.78 0.2 var(--brand-h)/0.18), transparent 60%)" } }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: p.tags.join(" · ") }),
            /* @__PURE__ */ jsx("h3", { className: "mt-2 text-xl md:text-2xl font-semibold", children: p.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: p.description }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 inline-flex items-center gap-1 text-sm text-[var(--brand)]", children: [
              t("Visit", "زيارة"),
              " ",
              /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" })
            ] })
          ] })
        ]
      },
      p.url
    )) }),
    list.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground mt-10", children: t("No projects match your search.", "لا توجد نتائج.") })
  ] }) });
}
function Certificates() {
  const { t } = useSettings();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(null);
  const cats = useMemo(() => ["All", ...Array.from(new Set(CERTIFICATES.map((c) => c.category)))], []);
  const list = useMemo(() => CERTIFICATES.filter((c) => {
    return (cat === "All" || c.category === cat) && (!q || (c.name + c.org).toLowerCase().includes(q.toLowerCase()));
  }), [q, cat]);
  return /* @__PURE__ */ jsx("section", { id: "certificates", className: "px-6 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: t("Certificates", "الشهادات") }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-bold", children: t("Earned & celebrated", "مكتسبة ومحتفى بها") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col md:flex-row gap-3 md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-sm w-full", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: q,
            onChange: (e) => setQ(e.target.value),
            placeholder: t("Search certificates…", "ابحث…"),
            className: "w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: cats.map((c) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCat(c),
          className: `rounded-full px-3 py-1.5 text-xs font-medium border transition ${cat === c ? "bg-gradient-brand text-primary-foreground border-transparent" : "glass border-glass-border hover:bg-muted"}`,
          children: c
        },
        c
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: list.map((c, i) => {
      const thumb = driveThumb(c.url);
      return /* @__PURE__ */ jsxs("div", { className: "group glass rounded-3xl overflow-hidden hover-lift", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setOpen(i),
            className: "block w-full aspect-video bg-muted relative overflow-hidden",
            children: [
              thumb ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: thumb,
                  alt: c.name,
                  loading: "lazy",
                  referrerPolicy: "no-referrer",
                  className: "h-full w-full object-cover transition duration-500 group-hover:scale-110"
                }
              ) : /* @__PURE__ */ jsx("div", { className: "h-full w-full grid place-items-center text-muted-foreground", children: /* @__PURE__ */ jsx(Award, { className: "h-12 w-12" }) }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition grid place-items-center", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white", children: t("View fullscreen", "عرض كامل") }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-widest text-[var(--brand)]", children: c.category }),
          /* @__PURE__ */ jsx("h3", { className: "mt-1 font-semibold", children: c.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            c.org,
            " · ",
            c.date
          ] })
        ] })
      ] }, c.url);
    }) }),
    open !== null && /* @__PURE__ */ jsx(
      Lightbox,
      {
        cert: list[open],
        onClose: () => setOpen(null)
      }
    )
  ] }) });
}
function Lightbox({ cert, onClose }) {
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[60] bg-black/80 backdrop-blur-md p-4 grid place-items-center", onClick: onClose, children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-5xl aspect-video glass-strong rounded-2xl overflow-hidden", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsx(
      "iframe",
      {
        src: drivePreview(cert.url),
        className: "absolute inset-0 h-full w-full",
        allow: "autoplay",
        title: cert.name
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "absolute top-3 right-3 flex gap-2", children: [
      /* @__PURE__ */ jsx("a", { href: cert.url, target: "_blank", rel: "noopener noreferrer", className: "grid place-items-center h-10 w-10 rounded-full glass-strong hover:bg-muted", "aria-label": "Open", children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("a", { href: cert.url.replace("/view", "/edit"), target: "_blank", rel: "noopener noreferrer", className: "grid place-items-center h-10 w-10 rounded-full glass-strong hover:bg-muted", "aria-label": "Download", children: /* @__PURE__ */ jsx(Download, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "grid place-items-center h-10 w-10 rounded-full glass-strong hover:bg-muted", "aria-label": "Close", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
    ] })
  ] }) });
}
function Gallery() {
  const { t } = useSettings();
  const [tab, setTab] = useState("presentations");
  const tabs = [
    { id: "presentations", en: "Presentations", ar: "العروض", Icon: Presentation },
    { id: "logos", en: "Logos", ar: "الشعارات", Icon: Sparkles },
    { id: "posters", en: "Posters", ar: "البوسترات", Icon: Image }
  ];
  const data = tab === "presentations" ? PRESENTATIONS : tab === "logos" ? LOGOS : POSTERS;
  return /* @__PURE__ */ jsx("section", { id: "gallery", className: "px-6 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: t("Creative gallery", "معرض الأعمال") }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-bold", children: t("Designs from my desk", "تصاميم من إبداعي") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsx("div", { className: "glass rounded-full p-1.5 flex gap-1", children: tabs.map(({ id, en, ar, Icon }) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setTab(id),
        className: `rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 transition ${tab === id ? "bg-gradient-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
        children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
          " ",
          t(en, ar)
        ]
      },
      id
    )) }) }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: data.map((item, i) => {
      const thumb = driveThumb(item.url);
      return /* @__PURE__ */ jsxs(
        "a",
        {
          href: item.url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "group glass rounded-3xl overflow-hidden hover-lift block",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "aspect-video bg-muted relative overflow-hidden", children: [
              thumb ? /* @__PURE__ */ jsx("img", { src: thumb, alt: item.title, loading: "lazy", referrerPolicy: "no-referrer", className: "h-full w-full object-cover transition duration-500 group-hover:scale-110" }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-brand opacity-20 group-hover:opacity-40 transition" }),
              !thumb && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-gradient", children: item.title }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: item.title }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-[var(--brand)]", children: [
                t("Open", "فتح"),
                " ",
                /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" })
              ] })
            ] })
          ]
        },
        item.url + i
      );
    }) })
  ] }) });
}
const ICONS = {
  Globe,
  GraduationCap,
  Palette,
  Presentation,
  Star
};
function Achievements() {
  const { t } = useSettings();
  return /* @__PURE__ */ jsx("section", { className: "px-6 py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: t("Featured achievements", "أبرز الإنجازات") }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-bold", children: t("Badges I'm proud of", "شارات أفخر بها") })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: ACHIEVEMENTS.map((a) => {
      const Icon = ICONS[a.icon] ?? Star;
      return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 text-center hover-lift", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto h-14 w-14 rounded-full bg-gradient-brand grid place-items-center shadow-glow", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6 text-primary-foreground" }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm font-medium", children: a.title })
      ] }, a.title);
    }) })
  ] }) });
}
function CV() {
  const { t } = useSettings();
  return /* @__PURE__ */ jsx("section", { id: "cv", className: "px-6 py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl glass-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[var(--brand)] opacity-20 blur-3xl" }),
    /* @__PURE__ */ jsx("div", { className: "absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[var(--brand-2)] opacity-20 blur-3xl" }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto h-16 w-16 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow", children: /* @__PURE__ */ jsx(FileText, { className: "h-8 w-8 text-primary-foreground" }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-center", children: /* @__PURE__ */ jsx(SectionLabel, { children: t("Resume", "السيرة الذاتية") }) }),
      /* @__PURE__ */ jsx("h2", { className: "mt-4 text-3xl md:text-4xl font-bold", children: t("Want the full story?", "تريد القصة كاملة؟") }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground max-w-xl mx-auto", children: t(
        "Grab my CV for a deeper look at my experience, projects and skills.",
        "حمّل سيرتي الذاتية لنظرة أعمق على خبرتي ومشاريعي ومهاراتي."
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-3", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://canva.link/wyx8lgwdpvtskag",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 rounded-full bg-gradient-brand text-primary-foreground px-6 py-3 font-medium shadow-glow hover:scale-105 transition",
            children: [
              /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
              " ",
              t("Download CV", "تحميل السيرة")
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "https://canva.link/wyx8lgwdpvtskag",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium hover:bg-muted transition hover:scale-105",
            children: [
              /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }),
              " ",
              t("Preview", "معاينة")
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
const Schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Too short").max(2e3)
});
function Contact() {
  const { t } = useSettings();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const parsed = Schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSending(true);
    const templateParams = {
      from_name: form.name,
      reply_to: form.email,
      message: form.message
    };
    emailjs.send(
      "merro.3adel@gmail.com",
      // ⚠️ إذا لم يعمل، تأكدي من تغييره لـ Service ID المكتوب في حسابك (مثل service_xxx)
      "template_8gum8c2",
      // الـ Template ID الخاص بكِ
      templateParams,
      "n4FnIr1cmuZEORr_I"
      // الـ Public Key الخاص بكِ
    ).then(() => {
      toast.success(t("Message sent successfully! 🎉", "تم إرسال رسالتك بنجاح! 🎉"));
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }).catch((error) => {
      console.error("EmailJS Error:", error);
      toast.error(t("Failed to send, try again.", "للأسف فشل الإرسال، يرجى المحاولة مرة أخرى."));
      setSending(false);
    });
  };
  const copy = (txt) => {
    navigator.clipboard.writeText(txt);
    toast.success(t("Copied!", "تم النسخ!"));
  };
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "px-6 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsx(SectionLabel, { children: t("Contact", "تواصل") }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-3xl md:text-5xl font-bold", children: t("Let's create something", "لنصنع شيئًا معًا") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-5 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-3", children: [
        /* @__PURE__ */ jsx(ContactCard, { icon: /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5" }), label: t("Email", "البريد"), value: PROFILE.email, onCopy: () => copy(PROFILE.email), href: `mailto:${PROFILE.email}` }),
        /* @__PURE__ */ jsx(ContactCard, { icon: /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }), label: "Discord", value: PROFILE.discord, onCopy: () => copy(PROFILE.discord) }),
        /* @__PURE__ */ jsx(ContactCard, { icon: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }), label: t("Phone", "الهاتف"), value: PROFILE.phone, onCopy: () => copy(PROFILE.phone), href: `tel:${PROFILE.phone}` })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "lg:col-span-3 glass-strong rounded-3xl p-6 md:p-8 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: t("Name", "الاسم") }),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              maxLength: 100,
              className: "mt-1 w-full bg-transparent border-b border-border focus:border-[var(--brand)] outline-none py-2",
              placeholder: t("Your name", "اسمك")
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: t("Email", "البريد") }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: form.email,
              onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
              maxLength: 255,
              className: "mt-1 w-full bg-transparent border-b border-border focus:border-[var(--brand)] outline-none py-2",
              placeholder: "you@example.com"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: t("Message", "الرسالة") }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 5,
              value: form.message,
              onChange: (e) => setForm((f) => ({ ...f, message: e.target.value })),
              maxLength: 2e3,
              className: "mt-1 w-full bg-transparent border-b border-border focus:border-[var(--brand)] outline-none py-2 resize-none",
              placeholder: t("Tell me about your idea…", "أخبرني عن فكرتك…")
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            disabled: sending,
            className: "w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand text-primary-foreground py-3 font-medium shadow-glow hover:scale-[1.02] transition disabled:opacity-60",
            children: [
              /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
              " ",
              sending ? t("Sending…", "جارٍ الإرسال…") : t("Send message", "إرسال")
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function ContactCard({ icon, label, value, onCopy, href }) {
  const Inner = /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 flex items-center gap-4 hover-lift", children: [
    /* @__PURE__ */ jsx("div", { className: "grid place-items-center h-12 w-12 rounded-xl bg-gradient-brand text-primary-foreground", children: icon }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: label }),
      /* @__PURE__ */ jsx("div", { className: "truncate font-medium", children: value })
    ] }),
    /* @__PURE__ */ jsx("button", { type: "button", onClick: (e) => {
      e.preventDefault();
      onCopy();
    }, className: "p-2 rounded-lg hover:bg-muted", "aria-label": "Copy", children: /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }) })
  ] });
  return href ? /* @__PURE__ */ jsx("a", { href, children: Inner }) : Inner;
}
function Footer() {
  const { t } = useSettings();
  const [visits, setVisits] = useState(0);
  useEffect(() => {
    const KEY = "mariam_visit_count";
    const n = Number(localStorage.getItem(KEY) || "0") + 1;
    localStorage.setItem(KEY, String(n));
    setVisits(n + 1240);
  }, []);
  return /* @__PURE__ */ jsx("footer", { className: "px-6 py-12 border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      t(PROFILE.name, PROFILE.nameAr),
      " ·",
      " ",
      t("Built with", "صُمّم بـ"),
      " ",
      /* @__PURE__ */ jsx(Heart, { className: "inline h-3.5 w-3.5 text-[var(--brand)]" }),
      " ",
      t("and code", "والكود")
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Eye, { className: "h-3.5 w-3.5 text-[var(--brand)]" }),
      /* @__PURE__ */ jsxs("span", { children: [
        t("Visitors", "الزوار"),
        ": ",
        /* @__PURE__ */ jsx("span", { className: "text-foreground font-semibold", children: visits.toLocaleString() })
      ] })
    ] })
  ] }) });
}
function AchievementSystem() {
  const { t } = useSettings();
  const [unlocked, setUnlocked] = useState(/* @__PURE__ */ new Set());
  useEffect(() => {
    const KEY = "mariam_achievements";
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUnlocked(new Set(JSON.parse(raw)));
    } catch {
    }
    const save = (s) => {
      try {
        localStorage.setItem(KEY, JSON.stringify(Array.from(s)));
      } catch {
      }
    };
    const unlock = (id, name, ar) => {
      setUnlocked((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        save(next);
        toast.success(`🏆 ${t("Achievement unlocked", "إنجاز جديد")}: ${t(name, ar)}`);
        return next;
      });
    };
    const onScroll = () => {
      if (window.scrollY > 600) unlock("explorer", "Explorer", "مستكشف");
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40) {
        unlock("completionist", "Completionist", "مُكمِل");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    let mCount = 0;
    let mTimer;
    const onKey = (e) => {
      if (e.key.toLowerCase() === "m") {
        mCount++;
        window.clearTimeout(mTimer);
        mTimer = window.setTimeout(() => mCount = 0, 800);
        if (mCount >= 3) {
          mCount = 0;
          unlock("easter", "Easter egg hunter", "صائد المفاجآت");
          document.documentElement.animate(
            [{ filter: "hue-rotate(0)" }, { filter: "hue-rotate(360deg)" }],
            { duration: 1500 }
          );
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [t]);
  return null;
}
function Index() {
  return /* @__PURE__ */ jsx(SettingsProvider, { children: /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 -z-20", style: {
      background: "var(--gradient-radial)"
    } }),
    /* @__PURE__ */ jsx(ParticlesBackground, {}),
    /* @__PURE__ */ jsx(CustomCursor, {}),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(Stats, {}),
      /* @__PURE__ */ jsx(About, {}),
      /* @__PURE__ */ jsx(TechStack, {}),
      /* @__PURE__ */ jsx(Timeline, {}),
      /* @__PURE__ */ jsx(Projects, {}),
      /* @__PURE__ */ jsx(Certificates, {}),
      /* @__PURE__ */ jsx(Gallery, {}),
      /* @__PURE__ */ jsx(Achievements, {}),
      /* @__PURE__ */ jsx(CV, {}),
      /* @__PURE__ */ jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(SettingsPanel, {}),
    /* @__PURE__ */ jsx(AchievementSystem, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-center", theme: "dark", richColors: true })
  ] }) });
}
export {
  Index as component
};
