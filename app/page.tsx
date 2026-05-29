import Link from "next/link";
import AppShell from "./components/AppShell";

const exercises = [
  {
    act: "Ato I",
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
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Curso prático · 9 exercícios · ~5 horas
        </div>

        <h1 className="text-4xl font-bold text-white leading-tight mb-4">
          IA na prática,<br />
          <span className="text-white/40">para quem decide.</span>
        </h1>

        <p className="text-white/60 text-lg leading-relaxed max-w-2xl mb-8">
          Este curso é para líderes que querem sentir — não apenas ouvir — o que é
          possível com IA hoje. Você vai construir coisas reais, resolver problemas
          reais, e sair com uma visão clara do que dá para automatizar na sua operação.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/setup"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Começar agora →
          </Link>
          <Link
            href="/exercises"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium rounded-lg transition-colors border border-white/10"
          >
            Ver exercícios
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-12 p-5 bg-white/3 rounded-xl border border-white/8">
        <div>
          <p className="text-2xl font-bold text-white">9</p>
          <p className="text-sm text-white/40 mt-0.5">exercícios</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">2</p>
          <p className="text-sm text-white/40 mt-0.5">atos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">~5h</p>
          <p className="text-sm text-white/40 mt-0.5">de conteúdo</p>
        </div>
      </div>

      {exercises.map((group) => (
        <div key={group.act} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30">
              {group.act === "Ato I"
                ? "Ato I — Sinta o Que É Possível"
                : "Ato II — Construa Seu Primeiro Agente"}
            </h2>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          <div className="space-y-2">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between p-4 rounded-lg border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-white/25 w-6">{item.n}</span>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/30">{item.duration}</span>
                  <span className="text-white/20 group-hover:text-white/60 transition-colors">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 p-5 rounded-xl border border-white/8 bg-white/3">
        <h3 className="text-sm font-semibold text-white mb-2">O que você vai precisar</h3>
        <ul className="text-sm text-white/50 space-y-1.5">
          <li>· Node.js instalado na máquina</li>
          <li>· Uma conta na Anthropic (claude.ai)</li>
          <li>· Claude Code CLI configurado</li>
          <li>· Terminal aberto e vontade de experimentar</li>
        </ul>
        <Link
          href="/setup"
          className="inline-flex mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Ver guia de instalação →
        </Link>
      </div>
    </AppShell>
  );
}
