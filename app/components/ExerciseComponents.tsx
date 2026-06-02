"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Terminal, Lightbulb, AlertTriangle } from "lucide-react";

const BRAND = "#4b6afc";
const GOLD = "#d1a476";
const SURFACE = "var(--surface)";
const BORDER = "var(--border)";

export function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex flex-col items-center">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: BRAND }}
        >
          {n}
        </div>
        <div className="w-px flex-1 mt-2" style={{ background: BORDER }} />
      </div>
      <div className="flex-1 pb-8">
        <h3 className="font-semibold text-white mb-3 mt-0.5">{title}</h3>
        <div className="text-sm leading-relaxed space-y-3" style={{ color: "var(--text-2)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Prompt({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "var(--tint-3)", borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-4)" }}>
          <Terminal size={12} />
          <span>Prompt para o agente</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: copied ? "#4b6afc" : "var(--text-4)" }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre
        className="p-3 md:p-4 text-xs md:text-sm overflow-x-auto m-0 rounded-none border-0 font-mono leading-relaxed whitespace-pre-wrap"
        style={{ background: "var(--code-bg)", color: "var(--code-text)" }}
      >
        {children}
      </pre>
    </div>
  );
}

export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-lg my-4"
      style={{ background: "rgba(75,106,252,0.08)", border: `1px solid rgba(75,106,252,0.2)` }}
    >
      <Lightbulb size={16} className="shrink-0 mt-0.5" style={{ color: BRAND }} />
      <p className="text-sm leading-relaxed m-0" style={{ color: "#8fa8ff" }}>{children}</p>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 rounded-lg my-4"
      style={{ background: "rgba(209,164,118,0.08)", border: `1px solid rgba(209,164,118,0.2)` }}
    >
      <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: GOLD }} />
      <p className="text-sm leading-relaxed m-0" style={{ color: "#e8c99a" }}>{children}</p>
    </div>
  );
}

export function Command({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg my-3 group cursor-pointer"
      style={{ background: "var(--code-bg)", border: `1px solid ${BORDER}` }}
      onClick={copy}
    >
      <span className="font-mono text-sm shrink-0" style={{ color: "#4b6afc" }}>$</span>
      <code className="flex-1 text-sm font-mono" style={{ background: "transparent", padding: 0, color: "var(--code-text)" }}>
        {children}
      </code>
      <span className="transition-opacity opacity-0 group-hover:opacity-100" style={{ color: "var(--text-4)" }}>
        {copied ? <Check size={14} style={{ color: BRAND }} /> : <Copy size={14} />}
      </span>
    </div>
  );
}

export const OS_KEY = "preferred-os";

export function OSTabs({ mac, windows }: { mac: string; windows: string }) {
  const [os, setOs] = useState<"mac" | "windows">("mac");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(OS_KEY);
    if (saved === "windows") setOs("windows");
    setMounted(true);

    const handler = (e: StorageEvent) => {
      if (e.key === OS_KEY && (e.newValue === "mac" || e.newValue === "windows")) {
        setOs(e.newValue);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const select = (val: "mac" | "windows") => {
    setOs(val);
    localStorage.setItem(OS_KEY, val);
  };

  const active = {
    background: "rgba(75,106,252,0.12)",
    color: "#4b6afc",
    borderColor: "rgba(75,106,252,0.3)",
  };
  const inactive = {
    background: "transparent",
    color: "var(--text-4)",
    borderColor: "transparent",
  };

  return (
    <div className="my-3">
      {/* Tab bar */}
      <div
        className="inline-flex rounded-t-md overflow-hidden"
        style={{ border: `1px solid ${BORDER}`, borderBottom: "none" }}
      >
        {(["mac", "windows"] as const).map((val) => (
          <button
            key={val}
            onClick={() => select(val)}
            className="px-4 py-1.5 text-xs font-medium transition-all"
            style={os === val ? active : inactive}
          >
            {val === "mac" ? "Mac / Linux" : "Windows"}
          </button>
        ))}
      </div>
      {/* Command with copy */}
      {mounted && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-b-lg rounded-tr-lg group cursor-pointer"
          style={{ background: "var(--code-bg)", border: `1px solid ${BORDER}` }}
          onClick={() => {
            navigator.clipboard.writeText(os === "mac" ? mac : windows);
          }}
        >
          <span className="font-mono text-sm shrink-0" style={{ color: "#4b6afc" }}>$</span>
          <code
            className="flex-1 text-sm font-mono"
            style={{ background: "transparent", padding: 0, color: "var(--code-text)" }}
          >
            {os === "mac" ? mac : windows}
          </code>
          <span className="transition-opacity opacity-0 group-hover:opacity-100" style={{ color: "var(--text-4)" }}>
            <Copy size={14} />
          </span>
        </div>
      )}
    </div>
  );
}

export function ExerciseHeader({
  act,
  number,
  title,
  duration,
  description,
}: {
  act: string;
  number: string;
  title: string;
  duration: string;
  description: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ color: BRAND, background: "rgba(75,106,252,0.1)" }}
        >
          {act}
        </span>
        <span style={{ color: "var(--text-5)" }}>·</span>
        <span className="text-xs" style={{ color: "var(--text-4)" }}>{duration}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
        <span className="font-normal mr-2" style={{ color: "var(--text-5)" }}>{number}</span>
        {title}
      </h1>
      <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-2)" }}>{description}</p>
      <div className="mt-6" style={{ borderTop: `1px solid ${BORDER}` }} />
      <div className="mt-6">
        <LLMSelector />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LLM System
// ─────────────────────────────────────────────

export const LLM_KEY = "preferred-llm";
export type LLMChoice = "claude" | "openai" | "gemini";

export const LLM_CONFIG: Record<LLMChoice, {
  name: string; vendor: string; command: string;
  contextFile: string; apiKeyVar: string;
  installPkg: string; accountUrl: string; accountLabel: string;
  pricingNote: string; color: string; bg: string;
}> = {
  claude: {
    name: "Claude", vendor: "Anthropic", command: "claude",
    contextFile: "CLAUDE.md", apiKeyVar: "ANTHROPIC_API_KEY",
    installPkg: "@anthropic-ai/claude-code",
    accountUrl: "https://console.anthropic.com", accountLabel: "console.anthropic.com",
    pricingNote: "Pague pelo uso — o curso completo custa aproximadamente $5–10.",
    color: "#d1a476", bg: "rgba(209,164,118,0.1)",
  },
  openai: {
    name: "ChatGPT", vendor: "OpenAI", command: "codex",
    contextFile: "AGENTS.md", apiKeyVar: "OPENAI_API_KEY",
    installPkg: "@openai/codex",
    accountUrl: "https://platform.openai.com", accountLabel: "platform.openai.com",
    pricingNote: "Pague pelo uso — custo similar ao Claude para o curso completo.",
    color: "#10a37f", bg: "rgba(16,163,127,0.1)",
  },
  gemini: {
    name: "Gemini", vendor: "Google", command: "gemini",
    contextFile: "GEMINI.md", apiKeyVar: "GEMINI_API_KEY",
    installPkg: "@google/gemini-cli",
    accountUrl: "https://aistudio.google.com", accountLabel: "aistudio.google.com",
    pricingNote: "O Google AI Studio tem um plano gratuito generoso — suficiente para o curso inteiro.",
    color: "#8ab4f8", bg: "rgba(138,180,248,0.1)",
  },
};

function useLLMPreference(): [LLMChoice, (v: LLMChoice) => void, boolean] {
  const [llm, setLlm] = useState<LLMChoice>("claude");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LLM_KEY);
    if (saved === "claude" || saved === "openai" || saved === "gemini") setLlm(saved);
    setMounted(true);
    const handler = (e: StorageEvent) => {
      if (e.key === LLM_KEY && (e.newValue === "claude" || e.newValue === "openai" || e.newValue === "gemini"))
        setLlm(e.newValue);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const select = (val: LLMChoice) => {
    setLlm(val);
    localStorage.setItem(LLM_KEY, val);
    window.dispatchEvent(new StorageEvent("storage", { key: LLM_KEY, newValue: val }));
  };

  return [llm, select, mounted];
}

export function LLMSelector() {
  const [llm, select, mounted] = useLLMPreference();
  if (!mounted) return null;

  return (
    <div className="mb-8 p-5 rounded-xl" style={{ border: `1px solid ${BORDER}`, background: "var(--tint-2)" }}>
      <p className="text-sm font-semibold text-white mb-1">Qual ferramenta de IA você vai usar?</p>
      <p className="text-xs mb-4" style={{ color: "var(--text-4)" }}>
        Os comandos dos exercícios vão se adaptar à sua escolha.
      </p>
      <div className="flex gap-3 flex-wrap">
        {(["claude", "openai", "gemini"] as LLMChoice[]).map((key) => {
          const cfg = LLM_CONFIG[key];
          const active = llm === key;
          return (
            <button
              key={key}
              onClick={() => select(key)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={active
                ? { background: cfg.bg, border: `1px solid ${cfg.color}`, color: cfg.color }
                : { background: "transparent", border: `1px solid ${BORDER}`, color: "var(--text-4)" }
              }
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: active ? cfg.color : BORDER }} />
              {cfg.vendor}
            </button>
          );
        })}
      </div>
      <p className="text-xs mt-3" style={{ color: "var(--text-4)" }}>
        ✓ Usando <strong style={{ color: "var(--text-2)" }}>{LLM_CONFIG[llm].name}</strong> — comando:{" "}
        <code style={{ color: LLM_CONFIG[llm].color }}>{LLM_CONFIG[llm].command}</code>.
        Você pode mudar a qualquer momento.
      </p>
    </div>
  );
}

/** Renders the CLI command (claude / codex / gemini) based on preference */
export function AgentCommand() {
  const [llm, , mounted] = useLLMPreference();
  return <Command>{mounted ? LLM_CONFIG[llm].command : "claude"}</Command>;
}

/** Shows different content per selected LLM */
export function LLMTabs({
  claude, openai, gemini,
}: {
  claude: React.ReactNode; openai: React.ReactNode; gemini: React.ReactNode;
}) {
  const [llm, , mounted] = useLLMPreference();
  if (!mounted) return <>{claude}</>;
  return <>{llm === "claude" ? claude : llm === "openai" ? openai : gemini}</>;
}

/** Inline: renders the context file name (CLAUDE.md / AGENTS.md / GEMINI.md) */
export function ContextFileName() {
  const [llm, , mounted] = useLLMPreference();
  return <code>{mounted ? LLM_CONFIG[llm].contextFile : "CLAUDE.md"}</code>;
}

/** OSTabs command for copying the context file from ex-1-2 */
export function CopyContextFile({ from = "ex-1-2" }: { from?: string }) {
  const [llm, , mounted] = useLLMPreference();
  const file = mounted ? LLM_CONFIG[llm].contextFile : "CLAUDE.md";
  return (
    <OSTabs
      mac={`cp ~/ai-builder-camp/${from}/${file} .`}
      windows={`copy $HOME\\ai-builder-camp\\${from}\\${file} .`}
    />
  );
}
