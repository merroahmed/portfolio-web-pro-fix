export const PROFILE = {
  name: "Mariam Adel",
  nameAr: "مريم عادل",
  role: "Front-End Developer & Creative Designer",
  roleAr: "مطوّرة واجهات أمامية ومصمّمة مبدعة",
  email: "merro.adel@gmail.com",
  discord: "mariam_adel2010",
  phone: "01024258281",
};

export const STATS = [
  { key: "projects", label: "Projects Completed", labelAr: "مشاريع منجزة", value: 9, icon: "Rocket" },
  { key: "presentations", label: "Presentations Created", labelAr: "عروض تقديمية", value: 6, icon: "Presentation" },
  { key: "logos", label: "Logos Designed", labelAr: "شعارات", value: 6, icon: "Sparkles" },
  { key: "posters", label: "Posters Designed", labelAr: "بوسترات", value: 7, icon: "Image" },
  { key: "certificates", label: "Certificates Earned", labelAr: "شهادات", value: 8, icon: "Award" },
];

export interface Project {
  title: string;
  url: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  { title: "Featured Portfolio Preview", url: "https://id-preview--aefc9898-5fd8-4522-826e-f6d0c5b4d253.lovable.app/", description: "A polished featured project showcasing creative front-end work.", tags: ["React", "Featured"], featured: true },
  { title: "Moon Website", url: "https://merroahmed.github.io/moon-website2/", description: "An atmospheric landing experience exploring the moon.", tags: ["HTML", "CSS", "JS"] },
  { title: "Food Web", url: "https://merroahmed.github.io/food-web-2/", description: "A vibrant food-themed responsive website.", tags: ["HTML", "CSS"] },
  { title: "Personal Portfolio v1", url: "https://merroahmed.github.io/portofolio-web", description: "First iteration of my personal portfolio.", tags: ["HTML", "CSS"] },
  { title: "Learning Website", url: "https://merroahmed.github.io/learning-website.com", description: "An online learning landing page.", tags: ["HTML", "CSS"] },
  { title: "Marketing Site", url: "https://merroahmed.github.io/marketing/", description: "Digital marketing focused landing page.", tags: ["Marketing"] },
  { title: "Shop Website", url: "https://merroahmed.github.io/shop-website/", description: "E-commerce styled site with product cards.", tags: ["HTML", "CSS", "JS"] },
  { title: "Shopping Web", url: "https://merroahmed.github.io/shoping-web/", description: "Another shopping experience exploration.", tags: ["HTML", "CSS"] },
  { title: "Learning Web", url: "https://merroahmed.github.io/learning-web/", description: "Educational website with course layout.", tags: ["HTML", "CSS"] },
];

export const PRESENTATIONS = [
  "https://canva.link/ds8c8cy6mkblupn",
  "https://canva.link/3r02da0mkvhtix0",
  "https://canva.link/l7a6gupdm3zusgy",
  "https://canva.link/3uba5ww9n61b843",
  "https://canva.link/fqyv092wr2brpi7",
  "https://canva.link/s3692wpzmvfsn9s",
].map((url, i) => ({ url, title: `Presentation ${i + 1}` }));

export const LOGOS = [
  "https://canva.link/jyder83idcjm66g",
  "https://canva.link/voeig5h9bf8tqm1",
  "https://canva.link/d9f1t59vw6lt6wb",
  "https://canva.link/c5khljhdosofyta",
  "https://canva.link/h9p9ax0y5f4d1q1",
  "https://canva.link/u2i6urjs4r26zcz",
].map((url, i) => ({ url, title: `Logo ${i + 1}` }));

export const POSTERS = [
  "https://canva.link/eilvm4g3o2jbfmo",
  "https://drive.google.com/file/d/1ccoWb6PeS-h7SWRGb5abxjNTF5O5O8tp/view",
  "https://drive.google.com/file/d/1T-uXwwCsBmdWET-g2FJMkA1jF1cdENK1/view",
  "https://drive.google.com/file/d/10cd4UXpk41tnkRcup005T4FiKFjS3vg7/view",
  "https://drive.google.com/file/d/1eH772dJnBLoBVrkafpfypvAMOyx5J8Qk/view",
  "https://drive.google.com/file/d/1TfIqZcy0FUGZMROALpQpa70L0rdKXDTK/view",
  "https://drive.google.com/file/d/1YXyumH1yVmUrbEm4pi598epRI8EcRMD4/view",
].map((url, i) => ({ url, title: `Poster ${i + 1}` }));

/** Convert Drive view URL to preview/embed URL */
export function drivePreview(url: string): string {
  const m = url.match(/\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  return url;
}
export function driveThumb(url: string): string | null {
  const m = url.match(/\/file\/d\/([^/]+)/);
  if (m) return `https://drive.google.com/thumbnail?id=${m[1]}&sz=w1000`;
  return null;
}

export const CERTIFICATES = [
  { url: "https://drive.google.com/file/d/13t01wS--_Ypq0o7BdR4ID6FxN0NBdCDa/view", name: "Web Development", org: "Online Course", date: "2024", category: "Development" },
  { url: "https://drive.google.com/file/d/1o_kJvfXZ3ncG0JjBeLMvcyT1jTLFIDTV/view", name: "HTML & CSS Mastery", org: "Online Course", date: "2024", category: "Development" },
  { url: "https://drive.google.com/file/d/1vbdiD9KzIf785BMxk06Z13oyq_3oaXrU/view", name: "JavaScript Essentials", org: "Online Course", date: "2025", category: "Development" },
  { url: "https://drive.google.com/file/d/15vtjHmVCpm3utali-KJcTedZf-u6DUog/view", name: "React Basics", org: "Online Course", date: "2025", category: "Development" },
  { url: "https://drive.google.com/file/d/1w1RHImFbft0UKZbhQolnAL1woE0zxPY5/view", name: "UI/UX Foundations", org: "Online Course", date: "2025", category: "Design" },
  { url: "https://drive.google.com/file/d/1R4rgopTXS9gK_N6wnth2SchZ6qyc0Qdw/view", name: "Logo Design", org: "Canva Academy", date: "2025", category: "Design" },
  { url: "https://drive.google.com/file/d/1z0xzdHMUYu92onFIUO9LYz5S_rIzyGY-/view", name: "Digital Marketing", org: "Online Course", date: "2025", category: "Marketing" },
  { url: "https://drive.google.com/file/d/1Fd8lc9_EdCPOHXtcJBmm7i6Rq9BJ3a5D/view", name: "Social Media Marketing", org: "Online Course", date: "2026", category: "Marketing" },
];

export const TIMELINE = [
  {
    year: "2024",
    title: "The Beginning",
    titleAr: "البداية",
    items: [
      "Started learning programming",
      "Learned HTML and CSS basics",
      "Created my first simple websites",
    ],
    itemsAr: ["بدأت تعلّم البرمجة", "تعلّمت أساسيات HTML و CSS", "أنشأت أول مواقع بسيطة"],
  },
  {
    year: "2025",
    title: "Growing & Designing",
    titleAr: "النمو والتصميم",
    items: [
      "Learned JavaScript",
      "Built complete responsive websites",
      "Learned design principles",
      "Started presentations, logos and posters",
    ],
    itemsAr: [
      "تعلّمت JavaScript",
      "بنيت مواقع متجاوبة كاملة",
      "تعلّمت أساسيات التصميم",
      "بدأت تصميم العروض والشعارات والبوسترات",
    ],
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
      "Built a professional portfolio",
    ],
    itemsAr: [
      "أنجزت مشاريع حقيقية متعددة",
      "طوّرت مهاراتي في الواجهات الأمامية",
      "تعلّمت أساسيات TypeScript و React",
      "وسّعت معرفتي في التسويق الرقمي",
      "أنشأت بورتفوليو احترافي",
    ],
  },
];

export const TECH_STACK = [
  {
    group: "Front-End Development",
    groupAr: "تطوير الواجهات",
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 65 },
      { name: "React", level: 70 },
      { name: "Responsive Design", level: 90 },
    ],
  },
  {
    group: "Tools",
    groupAr: "الأدوات",
    items: [
      { name: "VS Code", level: 95 },
      { name: "Git", level: 75 },
      { name: "GitHub", level: 80 },
      { name: "Canva", level: 95 },
      { name: "Figma", level: 70 },
    ],
  },
  {
    group: "Design Skills",
    groupAr: "مهارات التصميم",
    items: [
      { name: "Logo Design", level: 88 },
      { name: "Poster Design", level: 90 },
      { name: "Presentation Design", level: 92 },
      { name: "Social Media Design", level: 85 },
    ],
  },
  {
    group: "Marketing Skills",
    groupAr: "مهارات التسويق",
    items: [
      { name: "Content Creation", level: 80 },
      { name: "Social Media Marketing", level: 78 },
      { name: "Digital Marketing Basics", level: 75 },
    ],
  },
];

export const ACHIEVEMENTS = [
  { title: "Built Multiple Websites", icon: "Globe" },
  { title: "Completed Programming Courses", icon: "GraduationCap" },
  { title: "Designed Logos & Posters", icon: "Palette" },
  { title: "Created Professional Presentations", icon: "Presentation" },
  { title: "Built My Own Portfolio", icon: "Star" },
];

export const FUN_FACTS = [
  "I drank way too much coffee writing my first JavaScript loop.",
  "My favourite keyboard shortcut is Ctrl+Z (lifesaver).",
  "I sketch logo ideas on paper before opening Canva.",
  "I once spent 3 hours debugging a missing semicolon.",
  "Dark mode > light mode. Always.",
  "I love clean typography more than I should.",
];

export const QUOTES = [
  { q: "Design is intelligence made visible.", a: "Alina Wheeler" },
  { q: "First, solve the problem. Then, write the code.", a: "John Johnson" },
  { q: "Creativity is intelligence having fun.", a: "Albert Einstein" },
  { q: "Simplicity is the ultimate sophistication.", a: "Leonardo da Vinci" },
  { q: "Make it work, make it right, make it fast.", a: "Kent Beck" },
];
