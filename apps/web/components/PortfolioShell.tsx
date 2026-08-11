"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MessageSquare } from "lucide-react";
import LineSidebar from "@/components/ui/LineSidebar";
import AiPersona from "@/components/AiPersona";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import {
  siteConfig,
  linkHref,
  isPlaceholderLink,
} from "@/lib/site.config";

export type PortfolioPanel = {
  id: string;
  label: string;
  content: ReactNode;
};

type PortfolioShellProps = {
  panels: PortfolioPanel[];
};

/**
 * Client shell for sidebar navigation + chat.
 * All panel content is always mounted so SSR / crawlers see full text;
 * inactive panels are visually hidden via CSS only (not unmounted).
 */
export default function PortfolioShell({ panels }: PortfolioShellProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const labels = panels.map((p) => p.label);

  const openChat = (prompt?: string) => {
    if (prompt) setPendingPrompt(prompt);
    setIsChatOpen(true);
  };

  const closeChat = () => setIsChatOpen(false);

  useEffect(() => {
    if (!isChatOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isChatOpen]);

  // Expose chat opener for section CTAs via custom event (keeps section SSR clean)
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ prompt?: string }>).detail;
      openChat(detail?.prompt);
    };
    const onNavigate = (e: Event) => {
      const detail = (e as CustomEvent<{ index?: number; id?: string }>).detail;
      if (typeof detail?.index === "number") {
        setActiveIndex(detail.index);
        return;
      }
      if (detail?.id) {
        const idx = panels.findIndex((p) => p.id === detail.id);
        if (idx >= 0) setActiveIndex(idx);
      }
    };
    window.addEventListener("portfolio:open-chat", onOpen);
    window.addEventListener("portfolio:navigate", onNavigate);
    return () => {
      window.removeEventListener("portfolio:open-chat", onOpen);
      window.removeEventListener("portfolio:navigate", onNavigate);
    };
  }, [panels]);

  const sidebarAccent = isDark ? "#E5E5E5" : "#171717";
  const sidebarText = isDark ? "#A3A3A3" : "#737373";
  const sidebarMarker = isDark ? "#404040" : "#D4D4D4";

  return (
    <div className="relative flex flex-col md:flex-row h-full w-full bg-background">
      <div className="site-backdrop" aria-hidden />

      <aside
        className="relative z-10 w-full md:w-72 lg:w-80 h-auto md:h-full border-b md:border-b-0 md:border-r border-border flex-none flex flex-col md:min-h-0"
        style={{ background: "var(--panel)" }}
      >
        <div className="pt-4 md:pt-10 px-4 md:px-7 pb-3 md:pb-0">
          <div className="flex items-start justify-between gap-3 mb-4 md:mb-10">
            <div className="min-w-0">
              <p className="font-semibold text-xl md:text-2xl text-foreground tracking-tight">
                {siteConfig.name}
                <span className="text-muted-fg">.</span>
              </p>
              <p className="text-[10px] md:text-[11px] text-muted-fg mt-1.5 tracking-[0.08em] uppercase font-medium leading-snug">
                Consilium Software · Webex Integrations
              </p>
            </div>
            <ThemeToggle className="shrink-0" />
          </div>

          <nav
            aria-label="Sections"
            className="md:hidden -mx-1 px-1 flex gap-2 overflow-x-auto pb-1 snap-x [&::-webkit-scrollbar]:hidden"
          >
            {labels.map((sec, i) => {
              const active = activeIndex === i;
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`snap-start shrink-0 rounded-md px-3 py-1.5 text-xs font-medium border transition-colors ${
                    active
                      ? "bg-foreground text-background border-transparent"
                      : "bg-surface text-muted border-border hover:text-foreground"
                  }`}
                >
                  {sec}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="hidden md:flex flex-col flex-1 h-full min-h-0 px-7">
          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            <LineSidebar
              items={labels}
              accentColor={sidebarAccent}
              textColor={sidebarText}
              markerColor={sidebarMarker}
              defaultActive={0}
              active={activeIndex}
              onItemClick={(index: number) => setActiveIndex(index)}
            />
          </div>

          <div className="mt-auto pb-5 pt-4 space-y-3 shrink-0 border-t border-border">
            <button
              type="button"
              onClick={() => openChat()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium rounded-md border border-border bg-surface text-foreground hover:bg-surface-2 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Ask AI
            </button>
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
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-medium rounded-md transition-opacity hover:opacity-90"
              style={{ background: "var(--cta-bg)", color: "var(--cta-fg)" }}
            >
              Book a call
            </a>
            <div className="flex justify-center gap-3 text-[10px] text-muted-fg">
              <a
                href={linkHref(siteConfig.linkedinUrl)}
                target={
                  isPlaceholderLink(siteConfig.linkedinUrl)
                    ? undefined
                    : "_blank"
                }
                rel="noopener noreferrer"
                title={
                  isPlaceholderLink(siteConfig.linkedinUrl)
                    ? siteConfig.linkedinUrl
                    : undefined
                }
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <span aria-hidden>·</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </aside>

      <div className="relative z-10 flex-1 h-full min-h-0 px-4 py-5 sm:px-6 md:px-12 md:py-12 overflow-y-auto pb-24 md:pb-12">
        <div className="max-w-3xl mx-auto w-full relative">
          {panels.map((panel, i) => {
            const active = activeIndex === i;
            return (
              <div
                key={panel.id}
                id={`panel-${panel.id}`}
                role="tabpanel"
                aria-labelledby={panel.id}
                aria-hidden={!active}
                // All panels stay mounted for SSR/crawlers; inactive are CSS-hidden only
                className={active ? "animate-fade-in" : "hidden"}
              >
                {panel.content}
              </div>
            );
          })}
        </div>
      </div>

      {!isChatOpen && (
        <button
          type="button"
          onClick={() => openChat()}
          className="md:hidden fixed bottom-5 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium shadow-md transition-opacity hover:opacity-90"
          style={{ background: "var(--cta-bg)", color: "var(--cta-fg)" }}
          aria-label="Open AI chat"
        >
          <MessageSquare className="h-4 w-4" />
          Ask AI
        </button>
      )}

      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            aria-label="Close chat overlay"
            onClick={closeChat}
          />
          <div
            className="
              relative z-10 flex w-full flex-col border-border bg-background shadow-2xl
              max-md:mt-auto max-md:h-[min(88vh,720px)] max-md:rounded-t-2xl max-md:border-t
              md:h-full md:w-[min(440px,100vw)] md:border-l
              animate-fade-in
            "
          >
            <div className="md:hidden flex justify-center pt-2 pb-0" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <div className="min-h-0 flex-1">
              <AiPersona
                onClose={closeChat}
                pendingPrompt={pendingPrompt}
                onPendingPromptConsumed={() => setPendingPrompt(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function openPortfolioChat(prompt?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("portfolio:open-chat", { detail: { prompt } })
  );
}

export function navigatePortfolio(target: { index?: number; id?: string }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("portfolio:navigate", { detail: target })
  );
}
