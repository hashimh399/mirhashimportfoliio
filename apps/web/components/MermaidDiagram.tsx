"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

type MermaidDiagramProps = {
  chart: string;
  className?: string;
};

export default function MermaidDiagram({
  chart,
  className = "",
}: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          themeVariables: isDark
            ? {
                darkMode: true,
                background: "#141414",
                primaryColor: "#1a1a1a",
                primaryTextColor: "#fafafa",
                primaryBorderColor: "#262626",
                lineColor: "#a3a3a3",
                secondaryColor: "#1a1a1a",
                tertiaryColor: "#0a0a0a",
              }
            : {
                darkMode: false,
                background: "#ffffff",
                primaryColor: "#f5f5f5",
                primaryTextColor: "#111111",
                primaryBorderColor: "#e5e5e5",
                lineColor: "#737373",
                secondaryColor: "#fafafa",
                tertiaryColor: "#ffffff",
              },
        });

        const { svg } = await mermaid.render(`mermaid-${id}-${theme}`, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
        }
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, isDark, theme]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 text-xs text-muted">
        {chart}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`mermaid-wrap overflow-x-auto rounded-lg border border-border bg-surface p-4 ${className}`}
    />
  );
}
