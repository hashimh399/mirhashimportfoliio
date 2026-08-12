import EnterpriseLogoGrid from "@/components/EnterpriseLogoGrid";
import {
  consiliumProducts,
  coreCapabilities,
  workPrinciples,
} from "@/lib/site.config";

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
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Production integrations I&apos;ve designed and shipped — primarily
          through Consilium Software&apos;s Webex App Hub product suite.
        </p>
      </header>

      <div className="mb-10">
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-fg">
          Consilium products (Webex App Hub)
        </h3>
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
          {consiliumProducts.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

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

      <div className="mt-10 mb-10">
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-fg">
          How I work
        </h3>
        <ul className="space-y-3 list-none p-0 m-0 max-w-2xl">
          {workPrinciples.map((item) => (
            <li
              key={item}
              className="text-sm text-muted leading-relaxed pl-4 border-l-2 border-border"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
