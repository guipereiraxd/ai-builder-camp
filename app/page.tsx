import Link from "next/link";
import AppShell from "./components/AppShell";

const exercises = [
  {
    act: "Ato I",
    label: "Ato I — Sinta o Que É Possível",
    items: [
      { n: "1.1", title: "Seu primeiro produto digital", href: "/exercises/1-1", duration: "15 min" },
      { n: "1.2", title: "Com contexto da sua empresa", href: "/exercises/1-2", duration: "20 min" },
      { n: "2.1", title: "Análise de concorrentes ao vivo", href: "/exercises/2-1", duration: "25 min" },
      { n: "2.2", title: "Email com tom da empresa", href: "/exercises/2-2", duration: "20 min" },
      { n: "2.3", title: "Dashboard executivo", href: "/exercises/2-3", duration: "30 min" },
      { n: "2.4", title: "Briefing semanal automatizado", href: "/exercises/2-4", duration: "25 min" },
    ],
  },
  {
    act: "Ato II",
    label: "Ato II — Construa Seu Primeiro Agente",
    items: [
      { n: "3", title: "Agente de monitoramento de mercado", href: "/exercises/3", duration: "45 min" },
      { n: "4", title: "Pipeline de conteúdo com revisão humana", href: "/exercises/4", duration: "45 min" },
      { n: "5", title: "Research loop para due diligence", href: "/exercises/5", duration: "60 min" },
    ],
  },
];

export default function Home() {
  return (
    <AppShell>
      {/* Hero */}
      <div className="mb-12">
        <div
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full mb-6"
          style={{ color: "#4b6afc", background: "rgba(75,106,252,0.1)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#4b6afc" }}
          />
          Curso prático · 9 exercícios · ~5 horas
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
          IA na prática,<br />
          <span style={{ color: "#33363e" }}>para quem quer transformar ideia em entrega.</span>
        </h1>

        <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: "#cfd2d8" }}>
          Este curso é para quem quer experimentar IA com a mão na massa e sair com algo construído.
          Você vai criar soluções reais, testar possibilidades, automatizar tarefas e transformar
          problemas do dia a dia em entregas aplicáveis para a operação.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/setup"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90"
            style={{ background: "#4b6afc", color: "#ffffff" }}
          >
            Começar agora →
          </Link>
          <Link
            href="/exercises"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-colors hover:text-white"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #33363e", color: "#cfd2d8" }}
          >
            Ver exercícios
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-2 md:gap-4 mb-10 md:mb-12 p-4 md:p-5 rounded-xl"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #33363e" }}
      >
        {[
          { value: "9", label: "exercícios" },
          { value: "2", label: "atos" },
          { value: "~5h", label: "de conteúdo" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-sm mt-0.5" style={{ color: "#3d3d3d" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Exercise list */}
      {exercises.map((group) => (
        <div key={group.act} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2
              className="text-xs font-semibold uppercase tracking-widest shrink-0"
              style={{ color: "#3d3d3d" }}
            >
              {group.label}
            </h2>
            <div className="flex-1 h-px" style={{ background: "#33363e" }} />
          </div>
          <div className="space-y-2">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="exercise-card flex items-center justify-between p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono w-6" style={{ color: "#33363e" }}>{item.n}</span>
                  <span className="exercise-card-title text-sm font-medium" style={{ color: "#cfd2d8" }}>
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: "#3d3d3d" }}>{item.duration}</span>
                  <span className="exercise-card-arrow" style={{ color: "#33363e" }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Pre-requisites */}
      <div
        className="mt-12 p-5 rounded-xl"
        style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}
      >
        <h3 className="text-sm font-semibold text-white mb-2">O que você vai precisar</h3>
        <ul className="text-sm space-y-1.5" style={{ color: "#3d3d3d" }}>
          <li>· Node.js instalado na máquina</li>
          <li>· Uma conta na Anthropic (claude.ai)</li>
          <li>· Claude Code CLI configurado</li>
          <li>· Terminal aberto e vontade de experimentar</li>
        </ul>
        <Link
          href="/setup"
          className="inline-flex mt-4 text-sm transition-colors"
          style={{ color: "#4b6afc" }}
        >
          Ver guia de instalação →
        </Link>
      </div>
    </AppShell>
  );
}
