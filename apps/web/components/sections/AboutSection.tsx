import { about } from "@/lib/site.config";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="pb-6 md:pb-8 max-w-2xl"
    >
      <h2
        id="about-heading"
        className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
      >
        About
      </h2>
      <div className="mt-8 space-y-5 text-sm text-muted leading-relaxed sm:text-[15px]">
        <p className="text-foreground font-medium">{about.line1}</p>
        <p>{about.line2}</p>
        <p>{about.line3}</p>
      </div>
    </section>
  );
}
