"use client";

import {
  hero,
  siteConfig,
  linkHref,
  isPlaceholderLink,
} from "@/lib/site.config";

type IntroSectionProps = {
  onAskAi?: () => void;
  onViewCaseStudies?: () => void;
};

export default function IntroSection({
  onAskAi,
  onViewCaseStudies,
}: IntroSectionProps) {
  return (
    <div className="flex flex-col gap-8 pb-6 md:pb-8">
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
      </div>

      <div className="flex flex-wrap gap-2">
        {hero.stats.map((stat) => (
          <span
            key={stat}
            className="rounded-md border border-border bg-surface px-3 py-2 text-xs font-medium text-muted sm:text-[13px]"
          >
            {stat}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <a
          href={linkHref(siteConfig.calendlyUrl)}
          target={
            isPlaceholderLink(siteConfig.calendlyUrl) ? undefined : "_blank"
          }
          rel="noopener noreferrer"
          title={
            isPlaceholderLink(siteConfig.calendlyUrl)
              ? siteConfig.calendlyUrl
              : undefined
          }
          className="inline-flex justify-center px-5 py-2.5 text-sm font-medium rounded-md transition-opacity hover:opacity-90"
          style={{ background: "var(--cta-bg)", color: "var(--cta-fg)" }}
        >
          Book a Call
        </a>
        <button
          type="button"
          onClick={onViewCaseStudies}
          className="inline-flex justify-center px-5 py-2.5 border border-border bg-surface text-foreground text-sm font-medium rounded-md hover:bg-surface-2 transition-colors"
        >
          View Case Studies
        </button>
        <button
          type="button"
          onClick={onAskAi}
          className="inline-flex justify-center px-5 py-2.5 text-muted text-sm font-medium hover:text-foreground transition-colors"
        >
          Ask AI
        </button>
      </div>

      <div className="max-w-2xl border-t border-border pt-8">
        <p className="text-sm md:text-[15px] text-muted leading-relaxed">
          {hero.shortIntro}
        </p>
      </div>
    </div>
  );
}
