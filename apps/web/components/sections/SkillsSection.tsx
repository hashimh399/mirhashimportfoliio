"use client";

import { MessageSquare } from "lucide-react";
import EnterpriseLogoGrid from "@/components/EnterpriseLogoGrid";
import { coreCapabilities } from "@/lib/site.config";

type SkillsSectionProps = {
  onAskAi?: () => void;
};

export default function SkillsSection({ onAskAi }: SkillsSectionProps) {
  return (
    <div className="pb-6 md:pb-8">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Skills & Expertise
        </h2>
      </div>

      <div className="mb-10">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-fg">
          Core capabilities
        </p>
        <div className="flex flex-wrap gap-2">
          {coreCapabilities.map((item) => (
            <span
              key={item}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <EnterpriseLogoGrid />

      {onAskAi && (
        <div className="mt-10">
          <button
            type="button"
            onClick={onAskAi}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            <MessageSquare className="h-4 w-4" />
            Ask AI about my experience
          </button>
        </div>
      )}
    </div>
  );
}
