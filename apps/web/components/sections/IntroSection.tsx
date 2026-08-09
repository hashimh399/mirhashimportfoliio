"use client";

import LogoTicker from "@/components/LogoTicker";
import { hero, siteConfig } from "@/lib/site.config";

type IntroSectionProps = {
  onAskAi?: () => void;
  onViewSkills?: () => void;
};

export default function IntroSection({
  onAskAi,
  onViewSkills,
}: IntroSectionProps) {
  return (
    <div className="flex flex-col gap-10 md:gap-12 pb-6 md:pb-8">
      <div className="max-w-3xl">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-fg">
          {siteConfig.title}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-semibold tracking-tight text-foreground leading-[1.15]">
          {hero.headline}
        </h2>
        <p className="mt-5 text-base md:text-lg text-muted leading-relaxed">
          {hero.subheadline}
        </p>
        <p className="mt-6 text-sm md:text-[15px] text-muted leading-relaxed">
          {hero.bio}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3">
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center px-5 py-2.5 text-sm font-medium rounded-md transition-opacity hover:opacity-90"
            style={{ background: "var(--cta-bg)", color: "var(--cta-fg)" }}
          >
            Book a call
          </a>
          <button
            type="button"
            onClick={onAskAi}
            className="inline-flex justify-center px-5 py-2.5 border border-border bg-surface text-foreground text-sm font-medium rounded-md hover:bg-surface-2 transition-colors"
          >
            Ask AI
          </button>
          <button
            type="button"
            onClick={onViewSkills}
            className="inline-flex justify-center px-5 py-2.5 text-muted text-sm font-medium hover:text-foreground transition-colors"
          >
            View skills
          </button>
        </div>
      </div>

      <LogoTicker />

      <div className="pt-2 border-t border-border max-w-xl">
        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-fg font-semibold mb-3">
          Contact
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors font-medium"
          >
            Calendly
          </a>
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-foreground transition-colors break-all"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
    </div>
  );
}
