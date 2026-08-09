import {
  contact,
  siteConfig,
  linkHref,
  isPlaceholderLink,
} from "@/lib/site.config";

export default function ContactSection() {
  return (
    <div className="pb-6 md:pb-8">
      <div className="max-w-2xl rounded-xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {contact.headline}
        </h2>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={linkHref(siteConfig.calendlyUrl)}
            target={
              isPlaceholderLink(siteConfig.calendlyUrl) ? undefined : "_blank"
            }
            rel="noopener noreferrer"
            title={
              isPlaceholderLink(siteConfig.calendlyUrl)
                ? siteConfig.calendlyUrl
                : undefined
            }
            className="inline-flex justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--cta-bg)", color: "var(--cta-fg)" }}
          >
            Book a 30-min Architecture Call
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex justify-center rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
          >
            Send me a message
          </a>
          <a
            href={linkHref(siteConfig.linkedinUrl)}
            target={
              isPlaceholderLink(siteConfig.linkedinUrl) ? undefined : "_blank"
            }
            rel="noopener noreferrer"
            title={
              isPlaceholderLink(siteConfig.linkedinUrl)
                ? siteConfig.linkedinUrl
                : undefined
            }
            className="inline-flex justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground hover:bg-surface-2"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
