import PortfolioShell from "@/components/PortfolioShell";
import IntroSection from "@/components/sections/IntroSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import ArchitectureSection from "@/components/sections/ArchitectureSection";
import SkillsSection from "@/components/sections/SkillsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

/**
 * Server Component page — all section content is composed here so the initial
 * HTML payload includes every section for crawlers / ATS, while PortfolioShell
 * only toggles CSS visibility for the tabbed UX.
 */
export default function HomePage() {
  return (
    <PortfolioShell
      panels={[
        {
          id: "introduction",
          label: "Introduction",
          content: <IntroSection />,
        },
        {
          id: "case-studies",
          label: "Case Studies",
          content: <CaseStudiesSection />,
        },
        {
          id: "architecture",
          label: "Architecture",
          content: <ArchitectureSection />,
        },
        {
          id: "skills",
          label: "Skills",
          content: <SkillsSection />,
        },
        {
          id: "about",
          label: "About",
          content: <AboutSection />,
        },
        {
          id: "contact",
          label: "Contact",
          content: <ContactSection />,
        },
      ]}
    />
  );
}
