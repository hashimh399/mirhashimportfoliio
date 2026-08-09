"use client";

import { SiCisco, SiSap, SiSplunk } from "react-icons/si";
import { enterpriseLogos } from "@/lib/site.config";

type LogoKey = (typeof enterpriseLogos)[number]["key"];

function LogoMark({ logoKey }: { logoKey: LogoKey }) {
  const iconClass = "h-[18px] w-[18px] shrink-0";

  switch (logoKey) {
    case "splunk":
      return <SiSplunk className={iconClass} aria-hidden />;
    case "sap":
      return <SiSap className={iconClass} aria-hidden />;
    case "cisco":
      return <SiCisco className={iconClass} aria-hidden />;
    case "aws":
      return (
        <span
          className="inline-flex h-[18px] min-w-[18px] items-center justify-center text-[10px] font-bold tracking-tight"
          aria-hidden
        >
          aws
        </span>
      );
    case "salesforce":
      return (
        <span
          className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-current text-[8px] font-bold"
          aria-hidden
        >
          SF
        </span>
      );
    case "dynamics":
      return (
        <span
          className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border border-current text-[8px] font-bold"
          aria-hidden
        >
          DY
        </span>
      );
    case "genesys":
      return (
        <span
          className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border border-current text-[9px] font-bold"
          aria-hidden
        >
          G
        </span>
      );
    default:
      return null;
  }
}

function LogoItem({
  name,
  logoKey,
}: {
  name: string;
  logoKey: LogoKey;
}) {
  return (
    <div className="inline-flex items-center gap-2.5 px-5 text-muted-fg">
      <LogoMark logoKey={logoKey} />
      <span className="text-xs font-medium tracking-wide whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function LogoTicker() {
  const sequence = [...enterpriseLogos, ...enterpriseLogos];

  return (
    <div className="w-full">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-fg">
        Enterprise ecosystems
      </p>

      <div className="relative hidden overflow-hidden rounded-lg border border-border bg-surface sm:block">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10"
          style={{
            background:
              "linear-gradient(to right, var(--surface), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10"
          style={{
            background:
              "linear-gradient(to left, var(--surface), transparent)",
          }}
        />
        <div className="flex w-max animate-logo-marquee py-4">
          {sequence.map((logo, i) => (
            <LogoItem
              key={`${logo.key}-${i}`}
              name={logo.name}
              logoKey={logo.key}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:hidden">
        {enterpriseLogos.map((logo) => (
          <div
            key={logo.key}
            className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3 py-2.5 text-muted-fg"
          >
            <LogoMark logoKey={logo.key} />
            <span className="text-xs font-medium tracking-wide">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
