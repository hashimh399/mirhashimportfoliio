"use client";

import { MessageSquare } from "lucide-react";
import {
  openPortfolioChat,
  navigatePortfolio,
} from "@/components/PortfolioShell";

export function AskAiButton({
  label = "Ask AI",
  prompt,
  className = "",
  showIcon = false,
}: {
  label?: string;
  prompt?: string;
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => openPortfolioChat(prompt)}
      className={className}
    >
      {showIcon && <MessageSquare className="h-4 w-4" />}
      {label}
    </button>
  );
}

export function NavigateButton({
  label,
  sectionId,
  className = "",
}: {
  label: string;
  sectionId: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => navigatePortfolio({ id: sectionId })}
      className={className}
    >
      {label}
    </button>
  );
}
