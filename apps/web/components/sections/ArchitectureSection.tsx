import MermaidDiagram from "@/components/MermaidDiagram";
import { architectureDiagrams } from "@/lib/site.config";

export default function ArchitectureSection() {
  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="pb-6 md:pb-8"
    >
      <header className="mb-8 max-w-2xl">
        <h2
          id="architecture-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Architecture
        </h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          High-level diagrams for core systems and a typical forward-deployed
          engagement.
        </p>
      </header>

      <div className="space-y-10">
        {architectureDiagrams.map((diagram) => (
          <article
            key={diagram.id}
            id={`architecture-${diagram.id}`}
            className="space-y-3"
          >
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {diagram.title}
            </h3>
            {/* Static text always present for crawlers (Mermaid renders client-side) */}
            <p className="text-sm text-muted leading-relaxed">{diagram.caption}</p>
            <pre className="sr-only whitespace-pre-wrap">
              {diagram.title}. {diagram.caption}. Flow: {diagram.mermaid}
            </pre>
            <MermaidDiagram chart={diagram.mermaid} />
          </article>
        ))}
      </div>
    </section>
  );
}
