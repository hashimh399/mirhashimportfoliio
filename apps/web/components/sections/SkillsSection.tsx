import EnterpriseLogoGrid from "@/components/EnterpriseLogoGrid";
import { AskAiButton } from "@/components/SectionActions";
import { coreCapabilities } from "@/lib/site.config";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="pb-6 md:pb-8"
    >
      <header className="mb-8 max-w-2xl">
        <h2
          id="skills-heading"
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
        >
          Skills & Expertise
        </h2>
      </header>

      <div className="mb-10">
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-fg">
          Core capabilities
        </h3>
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
          {coreCapabilities.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <EnterpriseLogoGrid />

      <div className="mt-10">
        <AskAiButton
          label="Ask AI about my experience"
          showIcon
          className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
        />
      </div>
    </section>
  );
}
