import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { CurrentlyBuildingSection } from "@/components/CurrentlyBuildingSection";
import { AboutSection } from "@/components/AboutSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { EcosystemSection } from "@/components/ecosystem/EcosystemSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { EngineeringDecisionsSection } from "@/components/EngineeringDecisionsSection";
// In your page or App.tsx
import OpenSourceSection from '@/components/OpenSourceSection'
// In your page or App.tsx
import TestimonialsSection from '@/components/TestimonialsSection'


const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <HeroSection />
        <CurrentlyBuildingSection />
        <AboutSection />
        <ExpertiseSection />
        <SkillsSection />
        <EcosystemSection />
        <ProjectsSection />
        <EngineeringDecisionsSection />
        <TestimonialsSection />
        <OpenSourceSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
