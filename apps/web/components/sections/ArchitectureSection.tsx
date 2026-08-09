"use client";

import MermaidDiagram from "@/components/MermaidDiagram";
import { architectureDiagrams } from "@/lib/site.config";

export default function ArchitectureSection() {
  return (
    <div className="pb-6 md:pb-8">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Architecture
        </h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          High-level diagrams for core systems and a typical forward-deployed
          engagement.
        </p>
      </div>

      <div className="space-y-10">
        {architectureDiagrams.map((diagram) => (
          <article key={diagram.id} className="space-y-3">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {diagram.title}
            </h3>
            <MermaidDiagram chart={diagram.mermaid} />
            <p className="text-sm text-muted leading-relaxed">{diagram.caption}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
