import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ParticlesBackground } from "@/components/portfolio/ParticlesBackground";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { SettingsPanel } from "@/components/portfolio/SettingsPanel";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Stats } from "@/components/portfolio/Stats";
import { About } from "@/components/portfolio/About";
import { TechStack } from "@/components/portfolio/TechStack";
import { Timeline } from "@/components/portfolio/Timeline";
import { Projects } from "@/components/portfolio/Projects";
import { Certificates } from "@/components/portfolio/Certificates";
import { Gallery } from "@/components/portfolio/Gallery";
import { Achievements } from "@/components/portfolio/Achievements";
import { CV } from "@/components/portfolio/CV";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { AchievementSystem } from "@/components/portfolio/AchievementSystem";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mariam Adel — Front-End Developer & Creative Designer" },
      { name: "description", content: "Portfolio of Mariam Adel — a young front-end developer and creative designer crafting beautiful, useful digital experiences." },
      { property: "og:title", content: "Mariam Adel — Front-End Developer & Creative Designer" },
      { property: "og:description", content: "Projects, certificates, presentations, logos and poster designs by Mariam Adel." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SettingsProvider>
      <div className="relative min-h-screen">
        <div className="pointer-events-none fixed inset-0 -z-20" style={{ background: "var(--gradient-radial)" }} />
        <ParticlesBackground />
        <CustomCursor />
        <Nav />
        <main>
          <Hero />
          <Stats />
          <About />
          <TechStack />
          <Timeline />
          <Projects />
          <Certificates />
          <Gallery />
          <Achievements />
          <CV />
          <Contact />
        </main>
        <Footer />
        <SettingsPanel />
        <AchievementSystem />
        <Toaster position="top-center" theme="dark" richColors />
      </div>
    </SettingsProvider>
  );
}
