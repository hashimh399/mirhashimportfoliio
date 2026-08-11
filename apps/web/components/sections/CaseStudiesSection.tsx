"use client";

import { useState } from "react";
import { caseStudies } from "@/lib/site.config";
import { AskAiButton } from "@/components/SectionActions";

export default function CaseStudiesSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="pb-6 md:pb-8"
    >
      <header className="mb-8 max-w-2xl">
        <h2
          id="case-studies-heading"
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Case Studies
        </h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Selected delivery work at Consilium Software and enterprise clients —
          expand a card for challenge, solution, impact, and stack.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {caseStudies.map((cs) => {
          const open = openId === cs.id;
          return (
            <article
              key={cs.id}
              id={`case-study-${cs.id}`}
              className="flex flex-col rounded-lg border border-border bg-surface p-5 sm:p-6"
            >
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {cs.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-muted leading-relaxed">
                {cs.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`case-study-details-${cs.id}`}
                  onClick={() => setOpenId(open ? null : cs.id)}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-2 transition-colors"
                >
                  {open ? "Hide details" : "Read more"}
                </button>
                <AskAiButton
                  label="Ask AI"
                  prompt={cs.askPrompt}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-surface-2 transition-colors"
                />
              </div>

              {/* Always in DOM for crawlers; visually collapse when closed */}
              <dl
                id={`case-study-details-${cs.id}`}
                className={`mt-5 space-y-4 border-t border-border pt-5 ${
                  open ? "block" : "hidden"
                }`}
              >
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg">
                    Challenge
                  </dt>
                  <dd className="mt-1.5 text-sm text-muted leading-relaxed">
                    {cs.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg">
                    Solution
                  </dt>
                  <dd className="mt-1.5 text-sm text-muted leading-relaxed">
                    {cs.solution}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg">
                    Impact
                  </dt>
                  <dd className="mt-1.5 text-sm text-muted leading-relaxed">
                    {cs.impact}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg">
                    Tech
                  </dt>
                  <dd className="mt-1.5 text-sm text-muted leading-relaxed">
                    {cs.tech}
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
