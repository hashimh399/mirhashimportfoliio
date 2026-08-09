"use client";

import { skillGroups } from "@/lib/site.config";

export default function SkillsSection() {
  return (
    <div className="max-w-3xl flex flex-col gap-8 pb-6 md:pb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Skills
        </h2>
      </div>

      <div className="space-y-6">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
