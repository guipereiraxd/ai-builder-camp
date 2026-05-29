import Link from "next/link";
import AppShell from "../components/AppShell";

const acts = [
  {
    title: "Ato I — Sinta o Que É Possível",
    description: "Exercícios rápidos que produzem resultados reais. Sem código, sem setup complexo. Só você, o Claude Code e um terminal.",
    totalTime: "~2h",
    exercises: [
      { n: "1.1", title: "Seu primeiro produto digital", href: "/exercises/1-1", duration: "15 min", description: "Crie uma aplicação web completa com um único prompt." },
      { n: "1.2", title: "Com contexto da sua empresa", href: "/exercises/1-2", duration: "20 min", description: "Ensine o agente quem você é e o que sua empresa faz." },
      { n: "2.1", title: "Análise de concorrentes ao vivo", href: "/exercises/2-1", duration: "25 min", description: "Research competitivo estruturado, em minutos." },
      { n: "2.2", title: "Email com tom da empresa", href: "/exercises/2-2", duration: "20 min", description: "Um comando que gera emails no estilo exato da sua empresa." },
      { n: "2.3", title: "Dashboard executivo", href: "/exercises/2-3", duration: "30 min", description: "De CSV bagunçado a dashboard interativo, sem BI." },
      { n: "2.4", title: "Briefing semanal automatizado", href: "/exercises/2-4", duration: "25 min", description: "Seu ritual de segunda-feira, em segundos." },
    ],
  },
  {
    title: "Ato II — Construa Seu Primeiro Agente",
    description: "Você para de executar e começa a arquitetar. O agente trabalha de forma autônoma; você revisa e decide.",
    totalTime: "~2h30",
    exercises: [
      { n: "3", title: "Agente de monitoramento de mercado", href: "/exercises/3", duration: "45 min", description: "Um analista de inteligência competitiva que nunca tira férias." },
      { n: "4", title: "Pipeline com revisão humana", href: "/exercises/4", duration: "45 min", description: "Conteúdo de qualidade com você no controle editorial." },
      { n: "5", title: "Research loop para due diligence", href: "/exercises/5", duration: "60 min", description: "Due diligence completa conduzida por um agente autônomo." },
    ],
  },
];

export default function ExercisesPage() {
  return (
    <AppShell>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Exercícios</h1>
        <p className="text-white/50 text-base">
          9 exercícios. 2 atos. Do primeiro prompt ao primeiro agente autônomo.
        </p>
        <div className="mt-6 border-t border-white/10" />
      </div>

      {acts.map((act) => (
        <div key={act.title} className="mb-12">
          <div className="mb-5">
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-sm font-semibold text-white">{act.title}</h2>
              <span className="text-xs text-white/30">{act.totalTime}</span>
            </div>
            <p className="text-sm text-white/40">{act.description}</p>
          </div>

          <div className="space-y-2">
            {act.exercises.map((ex) => (
              <Link
                key={ex.href}
                href={ex.href}
                className="flex items-start gap-5 p-4 rounded-lg border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 transition-all group"
              >
                <span className="text-sm font-mono text-white/20 pt-0.5 w-6 shrink-0">{ex.n}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {ex.title}
                  </p>
                  <p className="text-xs text-white/35 mt-0.5">{ex.description}</p>
                </div>
                <div className="flex items-center gap-3 pt-0.5 shrink-0">
                  <span className="text-xs text-white/25">{ex.duration}</span>
                  <span className="text-white/20 group-hover:text-white/50 transition-colors text-sm">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 p-4 rounded-lg border border-white/8 bg-white/2">
        <p className="text-xs text-white/30 leading-relaxed">
          Use apenas em ambientes sandbox. Não faça upload de dados confidenciais, de clientes ou não aprovados.
          O conteúdo é educacional — fluxos exploratórios podem não representar implementações finais.
        </p>
      </div>
    </AppShell>
  );
}
