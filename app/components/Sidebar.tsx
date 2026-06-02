"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LLM_KEY, LLM_CONFIG, type LLMChoice } from "./ExerciseComponents";

const nav = [
  { label: "Início", href: "/" },
  { label: "Setup", href: "/setup" },
  { label: "Exercícios", href: "/exercises" },
  { type: "divider", label: "Ato I — Sinta o Poder" },
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
  { label: "7 Claude no Google Drive", href: "/exercises/7", duration: "30 min" },
  { label: "8 Claude no Slack", href: "/exercises/8", duration: "35 min" },
];

function LLMBadge() {
  const [llm, setLlm] = useState<LLMChoice>("claude");
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
  const cfg = LLM_CONFIG[llm];
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: cfg.bg }}>
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: cfg.color }} />
      <span className="text-xs font-medium" style={{ color: cfg.color }}>{cfg.vendor}</span>
      <code className="text-[10px] ml-auto" style={{ color: cfg.color, opacity: 0.7 }}>{cfg.command}</code>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 shrink-0 h-screen sticky top-0 overflow-y-auto flex flex-col"
      style={{ background: "#0f0f0f", borderRight: "1px solid #33363e" }}
    >
      {/* Logo */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #33363e" }}>
        <Link href="/" className="flex flex-col gap-2 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ai-builder-camp/logo-alun-white.svg"
            alt="Alun Business"
            width={110}
            height={13}
            style={{ opacity: 0.9 }}
          />
          <span
            className="text-[10px] font-medium tracking-[0.18em] uppercase"
            style={{ color: "#d1a476" }}
          >
            AI Builder Camp
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map((item, i) => {
          if (item.type === "divider") {
            return (
              <div key={i} className="pt-5 pb-1.5 px-2">
                <p
                  className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: "#64687a" }}
                >
                  {item.label}
                </p>
              </div>
            );
          }

          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href!}
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all"
              style={
                active
                  ? { background: "rgba(75,106,252,0.12)", color: "#4b6afc" }
                  : { color: "#cfd2d8" }
              }
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color = "#e8e8eb";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#cfd2d8";
                }
              }}
            >
              <span>{item.label}</span>
              {item.duration && (
                <span className="text-[11px] ml-2 shrink-0" style={{ color: "#64687a" }}>
                  {item.duration}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* LLM indicator */}
      <div className="px-3 pb-2">
        <p className="text-[10px] uppercase tracking-widest mb-1.5 px-1" style={{ color: "#33363e" }}>Ferramenta</p>
        <LLMBadge />
      </div>

      {/* Footer */}
      <div className="p-4" style={{ borderTop: "1px solid #33363e" }}>
        <p className="text-[11px] leading-relaxed" style={{ color: "#64687a" }}>
          Use apenas em ambientes sandbox. Não faça upload de dados confidenciais.
        </p>
      </div>
    </aside>
  );
}
