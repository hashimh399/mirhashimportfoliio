"use client";

import { siteConfig, projects } from "@/lib/site.config";

type ProjectsSectionProps = {
  onAskAbout?: (prompt: string) => void;
};

export default function ProjectsSection({ onAskAbout }: ProjectsSectionProps) {
  return (
    <div className="max-w-3xl flex flex-col gap-8 pb-6 md:pb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Projects
        </h2>
      </div>

      <div className="space-y-5">
        {projects.map((project) => {
          if (project.note) {
            return (
              <article
                key={project.id}
                className="rounded-lg border border-dashed border-border bg-surface p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-foreground tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {project.note}
                    </p>
                  </div>
                  {onAskAbout && (
                    <button
                      type="button"
                      onClick={() => onAskAbout(project.askPrompt)}
                      className="shrink-0 self-start rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-2 transition-colors"
                    >
                      Ask AI
                    </button>
                  )}
                </div>
              </article>
            );
          }

          return (
            <article
              key={project.id}
              className="rounded-lg border border-border bg-surface p-5 md:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-5">
                <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight">
                  {project.title}
                </h3>
                {onAskAbout && (
                  <button
                    type="button"
                    onClick={() => onAskAbout(project.askPrompt)}
                    className="shrink-0 self-start rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-2 transition-colors"
                  >
                    Ask AI
                  </button>
                )}
              </div>

              <dl className="space-y-4">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg mb-1.5">
                    The Problem
                  </dt>
                  <dd className="text-sm text-muted leading-relaxed">
                    {project.problem}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg mb-1.5">
                    The Solution & Tech Stack
                  </dt>
                  <dd className="text-sm text-muted leading-relaxed">
                    {project.solution}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg mb-1.5">
                    The Impact
                  </dt>
                  <dd className="text-sm text-muted leading-relaxed">
                    {project.impact}
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
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
