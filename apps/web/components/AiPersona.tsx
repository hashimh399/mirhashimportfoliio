"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Loader2, MessageSquare, Send, X } from "lucide-react";
import { chatSuggestions } from "@/lib/site.config";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

interface AiPersonaProps {
  onClose: () => void;
  pendingPrompt?: string | null;
  onPendingPromptConsumed?: () => void;
}

const WELCOME =
  "Hey — ask me anything about Hashim's resume, experience, or projects.";

export default function AiPersona({
  onClose,
  pendingPrompt,
  onPendingPromptConsumed,
}: AiPersonaProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sendMessage = async (raw: string) => {
    const text = raw.trim();
    if (!text || sendingRef.current) return;

    sendingRef.current = true;
    setError(null);
    setInput("");
    setIsLoading(true);

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    const historyForApi = nextMessages.filter(
      (m, i) =>
        !(i === 0 && m.role === "assistant" && m.content === WELCOME)
    );

    setMessages(nextMessages);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyForApi }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Chat API failed");
      }

      const reply =
        data.reply?.trim() || "I couldn't generate a reply. Try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const detail =
        err instanceof Error ? err.message : "Could not reach the AI.";
      setError(detail);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
      sendingRef.current = false;
    }
  };

  useEffect(() => {
    if (!pendingPrompt?.trim()) return;
    const prompt = pendingPrompt.trim();
    onPendingPromptConsumed?.();
    void sendMessage(prompt);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per pendingPrompt
  }, [pendingPrompt]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <div
      className="flex h-full min-h-0 w-full flex-col bg-background text-left"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-chat-title"
    >
      <header className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
            <MessageSquare className="h-4 w-4 text-foreground" />
          </div>
          <div className="min-w-0">
            <h2
              id="ai-chat-title"
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              Ask about Hashim
            </h2>
            <p className="mt-0.5 text-xs text-muted-fg">
              Resume, experience, and projects
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-fg transition-colors hover:bg-surface hover:text-foreground"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div
        ref={listRef}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 space-y-3"
      >
        {messages.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[92%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-foreground text-background"
                  : "bg-surface text-muted border border-border"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 px-1 text-xs text-muted-fg">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Thinking…
          </div>
        )}
      </div>

      {messages.length <= 1 && !isLoading && (
        <div className="shrink-0 px-4 pb-3 sm:px-5 flex flex-wrap gap-2">
          {chatSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              disabled={isLoading}
              onClick={() => void sendMessage(s)}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="shrink-0 px-4 pb-2 text-xs text-red-500 sm:px-5">{error}</p>
      )}

      <form
        onSubmit={onSubmit}
        className="shrink-0 border-t border-border bg-surface/80 p-3 sm:p-4"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about experience, projects, stack…"
            disabled={isLoading}
            className="min-w-0 flex-1 rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-fg focus:outline-none focus:ring-1 focus:ring-foreground/20 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md disabled:opacity-40 transition-opacity hover:opacity-90"
            style={{ background: "var(--cta-bg)", color: "var(--cta-fg)" }}
            aria-label="Send"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
