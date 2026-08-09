"use client";

import { explore } from "@/lib/site.config";

export default function ExploreSection() {
  return (
    <div className="max-w-3xl flex flex-col gap-8 pb-6 md:pb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Approach
        </h2>
        <p className="mt-4 text-sm md:text-[15px] text-muted leading-relaxed">
          {explore.intro}
        </p>
      </div>

      <ol className="space-y-5">
        {explore.principles.map((principle, index) => (
          <li
            key={principle.title}
            className="rounded-lg border border-border bg-surface p-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg mb-2">
              Principle {index + 1}
            </p>
            <h3 className="text-base font-semibold text-foreground tracking-tight">
              {principle.title}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {principle.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="text-sm md:text-[15px] text-muted leading-relaxed border-l-2 border-border pl-4">
        {explore.outro}
      </p>
    </div>
  );
}
