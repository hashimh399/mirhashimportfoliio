"use client";

import { SiCisco, SiSap, SiSplunk } from "react-icons/si";
import { enterpriseLogos } from "@/lib/site.config";

type LogoKey = (typeof enterpriseLogos)[number]["key"];

function LogoMark({ logoKey }: { logoKey: LogoKey }) {
  const iconClass = "h-5 w-5 shrink-0";

  switch (logoKey) {
    case "splunk":
      return <SiSplunk className={iconClass} aria-hidden />;
    case "sap":
      return <SiSap className={iconClass} aria-hidden />;
    case "cisco":
      return <SiCisco className={iconClass} aria-hidden />;
    case "aws":
      return (
        <span className="text-[11px] font-bold tracking-tight" aria-hidden>
          aws
        </span>
      );
    case "salesforce":
      return (
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current text-[8px] font-bold"
          aria-hidden
        >
          SF
        </span>
      );
    case "dynamics":
      return (
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-[3px] border border-current text-[8px] font-bold"
          aria-hidden
        >
          DY
        </span>
      );
    case "genesys":
      return (
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-[3px] border border-current text-[9px] font-bold"
          aria-hidden
        >
          G
        </span>
      );
    default:
      return null;
  }
}

/** Static grid — each logo once. No carousel. */
export default function EnterpriseLogoGrid() {
  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-fg">
        Enterprise ecosystems
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {enterpriseLogos.map((logo) => (
          <div
            key={logo.key}
            className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3 py-3 text-muted"
          >
            <LogoMark logoKey={logo.key} />
            <span className="text-xs font-medium tracking-wide text-foreground">
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
