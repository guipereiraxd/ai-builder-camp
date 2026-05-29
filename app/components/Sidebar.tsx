"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { label: "Início", href: "/" },
  { label: "Setup", href: "/setup" },
  { label: "Exercícios", href: "/exercises" },
  { type: "divider", label: "Ato I — Sinta o Poder" },
  { label: "1.1 Seu primeiro produto", href: "/exercises/1-1", duration: "15 min" },
  { label: "1.2 Com contexto da empresa", href: "/exercises/1-2", duration: "20 min" },
  { label: "2.1 Análise de concorrentes", href: "/exercises/2-1", duration: "25 min" },
  { label: "2.2 Email com tom da empresa", href: "/exercises/2-2", duration: "20 min" },
  { label: "2.3 Dashboard executivo", href: "/exercises/2-3", duration: "30 min" },
  { label: "2.4 Briefing semanal", href: "/exercises/2-4", duration: "25 min" },
  { type: "divider", label: "Ato II — Construa o Agente" },
  { label: "3 Agente de monitoramento", href: "/exercises/3", duration: "45 min" },
  { label: "4 Pipeline com revisão humana", href: "/exercises/4", duration: "45 min" },
  { label: "5 Research loop executivo", href: "/exercises/5", duration: "60 min" },
];

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
                  style={{ color: "#3d3d3d" }}
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
                <span className="text-[11px] ml-2 shrink-0" style={{ color: "#3d3d3d" }}>
                  {item.duration}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4" style={{ borderTop: "1px solid #33363e" }}>
        <p className="text-[11px] leading-relaxed" style={{ color: "#3d3d3d" }}>
          Use apenas em ambientes sandbox. Não faça upload de dados confidenciais.
        </p>
      </div>
    </aside>
  );
}
