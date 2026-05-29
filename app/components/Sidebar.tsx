"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    label: "Início",
    href: "/",
  },
  {
    label: "Setup",
    href: "/setup",
  },
  {
    label: "Exercícios",
    href: "/exercises",
  },
  { type: "divider", label: "Ato I — Sinta o Poder" },
  {
    label: "1.1 Seu primeiro produto",
    href: "/exercises/1-1",
    duration: "15 min",
  },
  {
    label: "1.2 Com contexto da empresa",
    href: "/exercises/1-2",
    duration: "20 min",
  },
  {
    label: "2.1 Análise de concorrentes",
    href: "/exercises/2-1",
    duration: "25 min",
  },
  {
    label: "2.2 Email com tom da empresa",
    href: "/exercises/2-2",
    duration: "20 min",
  },
  {
    label: "2.3 Dashboard executivo",
    href: "/exercises/2-3",
    duration: "30 min",
  },
  {
    label: "2.4 Briefing semanal",
    href: "/exercises/2-4",
    duration: "25 min",
  },
  { type: "divider", label: "Ato II — Construa o Agente" },
  {
    label: "3 Agente de monitoramento",
    href: "/exercises/3",
    duration: "45 min",
  },
  {
    label: "4 Pipeline com revisão humana",
    href: "/exercises/4",
    duration: "45 min",
  },
  {
    label: "5 Research loop executivo",
    href: "/exercises/5",
    duration: "60 min",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-white/10 bg-[#0f0f0f] h-screen sticky top-0 overflow-y-auto flex flex-col">
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="font-semibold text-white text-sm">AI Builder Camp</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map((item, i) => {
          if (item.type === "divider") {
            return (
              <div key={i} className="pt-5 pb-1.5 px-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
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
              className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{item.label}</span>
              {item.duration && (
                <span className="text-[11px] text-white/30 ml-2 shrink-0">
                  {item.duration}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <p className="text-[11px] text-white/25 leading-relaxed">
          Use apenas em ambientes sandbox. Não faça upload de dados confidenciais.
        </p>
      </div>
    </aside>
  );
}
