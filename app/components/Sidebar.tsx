"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LLM_KEY, LLM_CONFIG, type LLMChoice } from "./ExerciseComponents";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { label: "Início", href: "/" },
  { label: "Setup", href: "/setup" },
  { label: "Exercícios", href: "/exercises" },
  { type: "divider", label: "Ato I — Entenda o poder dos Agentes" },
  { label: "1.1 Seu primeiro produto", href: "/exercises/1-1", duration: "10 min" },
  { label: "1.2 Com contexto da empresa", href: "/exercises/1-2", duration: "20 min" },
  { label: "2.1 Análise de concorrentes", href: "/exercises/2-1", duration: "15 min" },
  { label: "2.2 Email com tom da empresa", href: "/exercises/2-2", duration: "20 min" },
  { label: "2.3 Dashboard executivo", href: "/exercises/2-3", duration: "20 min" },
  { label: "2.4 Briefing semanal", href: "/exercises/2-4", duration: "20 min" },
  { type: "divider", label: "Ato II — Construa o Agente" },
  { label: "3 Agente de monitoramento", href: "/exercises/3", duration: "30 min" },
  { label: "4 Pipeline com revisão humana", href: "/exercises/4", duration: "35 min" },
  { label: "5 Research loop executivo", href: "/exercises/5", duration: "45 min" },
  { type: "divider", label: "Ato III — Conecte ao Mundo Real" },
  { label: "6 Busca em tempo real", href: "/exercises/6", duration: "20 min" },
  { label: "7 Agente com seus documentos", href: "/exercises/7", duration: "30 min" },
  { label: "8 Agente no Slack", href: "/exercises/8", duration: "35 min" },
  { type: "divider", label: "Ato IV — Continue Praticando", gold: true },
  { label: "M1 Automatize uma reunião", href: "/exercises/m1", duration: "15 min", mission: true },
  { label: "M2 Gerador de propostas", href: "/exercises/m2", duration: "25 min", mission: true },
];

function LLMSwitcher() {
  const [llm, setLlm] = useState<LLMChoice>("claude");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LLM_KEY);
    if (saved === "claude" || saved === "openai" || saved === "gemini") setLlm(saved);
    const handler = (e: StorageEvent) => {
      if (e.key === LLM_KEY && (e.newValue === "claude" || e.newValue === "openai" || e.newValue === "gemini"))
        setLlm(e.newValue);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const select = (val: LLMChoice) => {
    setLlm(val);
    setOpen(false);
    localStorage.setItem(LLM_KEY, val);
    window.dispatchEvent(new StorageEvent("storage", { key: LLM_KEY, newValue: val }));
  };

  const cfg = LLM_CONFIG[llm];

  return (
    <div className="relative">
      {/* Current selection — click to open */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-md transition-opacity hover:opacity-80"
        style={{ background: cfg.bg }}
      >
        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cfg.color }} />
        <span className="text-xs font-medium flex-1 text-left" style={{ color: cfg.color }}>{cfg.vendor}</span>
        <code className="text-[10px]" style={{ color: cfg.color, opacity: 0.7 }}>{cfg.command}</code>
        <span className="text-[10px] ml-1" style={{ color: cfg.color, opacity: 0.5 }}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute bottom-full left-0 right-0 mb-1 rounded-lg overflow-hidden z-50"
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
        >
          {(["claude", "openai", "gemini"] as LLMChoice[]).map((key) => {
            const c = LLM_CONFIG[key];
            const active = llm === key;
            return (
              <button
                key={key}
                onClick={() => select(key)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs transition-colors hover:bg-white/5"
                style={{ color: active ? c.color : "var(--text-3)" }}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: active ? c.color : "var(--border)" }} />
                <span className="font-medium">{c.vendor}</span>
                <code className="ml-auto text-[10px] opacity-60">{c.command}</code>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const COLLAPSED_KEY = "aibc-sidebar-collapsed";

// Annotate each nav item with the label of its parent divider group
const processedNav = nav.map((item, i) => {
  let group = "";
  for (let j = i - 1; j >= 0; j--) {
    if (nav[j].type === "divider") { group = nav[j].label!; break; }
  }
  return { ...item, group };
});

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  // Which group contains the currently active page
  const activeGroup = processedNav.find(
    (item) => !item.type && item.href === pathname
  )?.group ?? "";

  useEffect(() => {
    const saved = localStorage.getItem(COLLAPSED_KEY);
    if (saved) {
      try { setCollapsed(new Set(JSON.parse(saved))); } catch {}
    }
    setMounted(true);
  }, []);

  // Auto-expand the group that contains the active page
  useEffect(() => {
    if (activeGroup && collapsed.has(activeGroup)) {
      setCollapsed(prev => {
        const next = new Set(prev);
        next.delete(activeGroup);
        localStorage.setItem(COLLAPSED_KEY, JSON.stringify([...next]));
        return next;
      });
    }
  }, [activeGroup]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (label: string) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      localStorage.setItem(COLLAPSED_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const isOpen = (label: string) => !mounted || !collapsed.has(label);

  return (
    <aside
      className="w-64 shrink-0 h-screen sticky top-0 overflow-y-auto flex flex-col"
      style={{ background: "var(--bg)", borderRight: "1px solid var(--border)" }}
    >
      {/* Logo + theme toggle */}
      <div className="px-5 py-4 flex items-start justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
        <Link href="/" className="flex flex-col gap-2 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ai-builder-camp/logo-alun-white.svg" alt="Alun Business" width={110} height={13} style={{ opacity: 0.9 }} />
          <span className="text-[10px] font-medium tracking-[0.18em] uppercase" style={{ color: "#d1a476" }}>
            AI Builder Camp
          </span>
        </Link>
        <ThemeToggle />
      </div>

      {/* LLM Switcher */}
      <div className="px-3 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="text-[10px] uppercase tracking-widest mb-1.5 px-1" style={{ color: "var(--text-5)" }}>Ferramenta de IA</p>
        <LLMSwitcher />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {processedNav.map((item, i) => {
          if (item.type === "divider") {
            const open = isOpen(item.label!);
            return (
              <button
                key={i}
                onClick={() => toggle(item.label!)}
                className="w-full flex items-center justify-between pt-5 pb-1.5 px-2 group"
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: item.gold ? "rgba(209,164,118,0.6)" : "var(--text-4)" }}
                >
                  {item.label}
                </p>
                <svg
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  className="transition-transform duration-200 shrink-0"
                  style={{
                    transform: open ? "rotate(0deg)" : "rotate(-90deg)",
                    color: item.gold ? "rgba(209,164,118,0.4)" : "var(--text-5)",
                  }}
                >
                  <path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            );
          }

          if (!isOpen(item.group)) return null;

          const active = pathname === item.href;
          const isMission = item.mission;
          return (
            <Link
              key={item.href}
              href={item.href!}
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all"
              style={
                active
                  ? { background: isMission ? "rgba(209,164,118,0.12)" : "rgba(75,106,252,0.12)", color: isMission ? "#d1a476" : "#4b6afc" }
                  : { color: "var(--text-2)" }
              }
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "var(--tint-4)";
                  (e.currentTarget as HTMLElement).style.color = "var(--code-text)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
                }
              }}
            >
              <span className="flex items-center gap-1.5">
                {isMission && <span style={{ color: active ? "#d1a476" : "rgba(209,164,118,0.5)" }}>◈</span>}
                {item.label}
              </span>
              {item.duration && (
                <span className="text-[11px] ml-2 shrink-0" style={{ color: "var(--text-4)" }}>
                  {item.duration}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-4)" }}>
          Use apenas em ambientes sandbox. Não faça upload de dados confidenciais.
        </p>
      </div>
    </aside>
  );
}
