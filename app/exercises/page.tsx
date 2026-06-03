"use client";

import Link from "next/link";
import AppShell from "../components/AppShell";
import { LLMSelector } from "../components/ExerciseComponents";

const acts = [
  {
    title: "Ato I — Entenda o poder dos Agentes",
    description: "Exercícios rápidos que produzem resultados reais. Sem código, sem setup complexo. Só você, o agente de IA e um terminal.",
    totalTime: "~1h45",
    exercises: [
      { n: "1.1", title: "Seu primeiro produto digital", href: "/exercises/1-1", duration: "10 min", description: "Crie uma aplicação web completa com um único prompt." },
      { n: "1.2", title: "Com contexto da sua empresa", href: "/exercises/1-2", duration: "20 min", description: "Ensine o agente quem você é e o que sua empresa faz." },
      { n: "2.1", title: "Análise de concorrentes ao vivo", href: "/exercises/2-1", duration: "15 min", description: "Research competitivo estruturado, em minutos." },
      { n: "2.2", title: "Email com tom da empresa", href: "/exercises/2-2", duration: "20 min", description: "Um comando que gera emails no estilo exato da sua empresa." },
      { n: "2.3", title: "Dashboard executivo", href: "/exercises/2-3", duration: "20 min", description: "De CSV bagunçado a dashboard interativo, sem BI." },
      { n: "2.4", title: "Briefing semanal automatizado", href: "/exercises/2-4", duration: "20 min", description: "Seu ritual de segunda-feira, em segundos." },
    ],
  },
  {
    title: "Ato II — Construa Seu Primeiro Agente",
    description: "Você para de executar e começa a arquitetar. O agente trabalha de forma autônoma; você revisa e decide.",
    totalTime: "~1h50",
    exercises: [
      { n: "3", title: "Agente de monitoramento de mercado", href: "/exercises/3", duration: "30 min", description: "Um analista de inteligência competitiva que nunca tira férias." },
      { n: "4", title: "Pipeline com revisão humana", href: "/exercises/4", duration: "35 min", description: "Conteúdo de qualidade com você no controle editorial." },
      { n: "5", title: "Research loop para due diligence", href: "/exercises/5", duration: "45 min", description: "Due diligence completa conduzida por um agente autônomo." },
    ],
  },
  {
    title: "Ato III — Conecte ao Mundo Real",
    description: "O agente vai buscar os dados onde eles estão. Sem copiar, sem colar — acessa a web, documentos e Slack por conta própria.",
    totalTime: "~1h25",
    exercises: [
      { n: "6", title: "Busca em tempo real", href: "/exercises/6", duration: "20 min", description: "Conecte o agente à internet para pesquisas com dados de hoje." },
      { n: "7", title: "Agente com seus documentos", href: "/exercises/7", duration: "30 min", description: "Acesse documentos, contratos e apresentações direto pelo agente." },
      { n: "8", title: "Agente no Slack", href: "/exercises/8", duration: "35 min", description: "Entregue resultados direto no canal da sua equipe." },
    ],
  },
];

export default function ExercisesPage() {
  return (
    <AppShell>
      {/* Intro */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-4">Bem-vindo ao AI Builder Camp</h1>
        <p className="text-base leading-relaxed mb-3" style={{ color: "var(--text-2)" }}>
          Este curso é sobre fazer. Cada exercício tem um objetivo claro, prompts prontos
          e um resultado concreto no final — algo que você pode usar na sua operação agora.
        </p>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-4)" }}>
          Você vai passar por 3 atos: primeiro sentir o que é possível com IA, depois
          construir seu primeiro agente autônomo, e por fim conectar o agente às ferramentas
          que sua equipe já usa no dia a dia.
        </p>
      </div>

      {/* LLM Selector */}
      <LLMSelector />

      {/* Setup CTA */}
      <div
        className="mb-10 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4"
        style={{ border: "1px solid #2a3a2a", background: "rgba(75,200,100,0.04)" }}
      >
        <div className="flex-1">
          <p className="text-sm font-semibold text-white mb-1">Antes de começar: configure sua máquina</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
            O curso usa uma ferramenta de IA de linha de comando — Claude Code (Anthropic), OpenAI Codex ou Gemini CLI.
            Se você ainda não instalou, o guia de setup leva menos de 15 minutos e cobre Mac e Windows.
          </p>
        </div>
        <Link
          href="/setup"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-80 shrink-0"
          style={{ background: "rgba(75,200,100,0.15)", color: "var(--green-btn)", border: "1px solid rgba(75,200,100,0.25)" }}
        >
          Guia de instalação →
        </Link>
      </div>

      <div className="mb-8 border-t" style={{ borderColor: "var(--border-sub)" }} />

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-5)" }}>
          12 exercícios · 3 atos · ~5 horas + missões complementares
        </p>
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

      {/* Act IV — Missions */}
      <div className="mb-12">
        <div className="mb-5">
          <div className="flex items-baseline justify-between mb-1">
            <h2 className="text-sm font-semibold" style={{ color: "#d1a476" }}>Ato IV — Continue Praticando</h2>
            <span className="text-xs" style={{ color: "rgba(209,164,118,0.75)" }}>Missões</span>
          </div>
          <p className="text-sm" style={{ color: "var(--text-4)" }}>
            Exercícios complementares sem ordem obrigatória. Cada missão resolve um problema real e concreto.
            Novas missões são adicionadas periodicamente.
          </p>
        </div>
        <div className="space-y-2">
          <Link
            href="/exercises/m1"
            className="flex items-start gap-5 p-4 rounded-lg group transition-all"
            style={{ border: "1px solid rgba(209,164,118,0.15)", background: "rgba(209,164,118,0.03)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(209,164,118,0.07)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(209,164,118,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(209,164,118,0.03)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(209,164,118,0.15)";
            }}
          >
            <span className="text-sm font-mono pt-0.5 w-6 shrink-0" style={{ color: "rgba(209,164,118,0.75)" }}>M1</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium transition-colors" style={{ color: "var(--text-1)" }}>
                Automatize uma reunião
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>
                Notas brutas → ata profissional + próximos passos + dono por tarefa.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-0.5 shrink-0">
              <span className="text-xs" style={{ color: "rgba(209,164,118,0.75)" }}>15 min</span>
              <span className="text-sm transition-colors" style={{ color: "rgba(209,164,118,0.6)" }}>→</span>
            </div>
          </Link>
          <Link
            href="/exercises/m2"
            className="flex items-start gap-5 p-4 rounded-lg group transition-all"
            style={{ border: "1px solid rgba(209,164,118,0.15)", background: "rgba(209,164,118,0.03)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(209,164,118,0.07)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(209,164,118,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(209,164,118,0.03)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(209,164,118,0.15)";
            }}
          >
            <span className="text-sm font-mono pt-0.5 w-6 shrink-0" style={{ color: "rgba(209,164,118,0.75)" }}>M2</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium transition-colors" style={{ color: "var(--text-1)" }}>
                Gerador de propostas comerciais
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>
                App personalizado com o tom e produtos da sua empresa. Build → iterate → deploy.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-0.5 shrink-0">
              <span className="text-xs" style={{ color: "rgba(209,164,118,0.75)" }}>25 min</span>
              <span className="text-sm transition-colors" style={{ color: "rgba(209,164,118,0.6)" }}>→</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-4 p-4 rounded-lg border border-white/8 bg-white/2">
        <p className="text-xs text-white/30 leading-relaxed">
          Use apenas em ambientes sandbox. Não faça upload de dados confidenciais, de clientes ou não aprovados.
          O conteúdo é educacional — fluxos exploratórios podem não representar implementações finais.
        </p>
      </div>
    </AppShell>
  );
}
