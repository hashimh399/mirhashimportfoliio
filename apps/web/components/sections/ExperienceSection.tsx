"use client";

import { siteConfig, experience } from "@/lib/site.config";

export default function ExperienceSection() {
  return (
    <div className="max-w-3xl flex flex-col gap-8 pb-6 md:pb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Experience
        </h2>
      </div>

      <div className="space-y-8">
        {experience.map((item) => (
          <article
            key={item.company}
            className="border-b border-border pb-8 last:border-b-0 last:pb-0"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground tracking-tight">
                  {item.company}
                </h3>
                <p className="text-sm text-muted mt-0.5">{item.role}</p>
              </div>
              <p className="text-xs font-medium text-muted-fg tabular-nums shrink-0">
                {item.period}
              </p>
            </div>
            <p className="text-sm md:text-[15px] text-muted leading-relaxed">
              {item.body}
            </p>
          </article>
        ))}
      </div>

      <div>
        <a
          href={siteConfig.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-5 py-2.5 text-sm font-medium rounded-md transition-opacity hover:opacity-90"
          style={{ background: "var(--cta-bg)", color: "var(--cta-fg)" }}
        >
          Book a call
        </a>
      </div>
    </div>
  );
}
