"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import { PROGRESS_KEY } from "../components/ExerciseComponents";

// Order matters: nextExercise walks this array to find the first incomplete item,
// so the sequence here defines the suggested curriculum path shown on the dashboard.
const ALL_EXERCISES = [
  { href: "/exercises/1-1", title: "Seu primeiro produto digital",       act: "Ato I",    duration: "10 min" },
  { href: "/exercises/1-2", title: "Com contexto da empresa",            act: "Ato I",    duration: "20 min" },
  { href: "/exercises/2-1", title: "Análise de concorrentes ao vivo",    act: "Ato I",    duration: "15 min" },
  { href: "/exercises/2-2", title: "Email com tom da empresa",           act: "Ato I",    duration: "20 min" },
  { href: "/exercises/2-3", title: "Dashboard executivo",                act: "Ato I",    duration: "20 min" },
  { href: "/exercises/2-4", title: "Briefing semanal automatizado",      act: "Ato I",    duration: "20 min" },
  { href: "/exercises/3",   title: "Agente de monitoramento de mercado", act: "Ato II",   duration: "30 min" },
  { href: "/exercises/4",   title: "Pipeline com revisão humana",        act: "Ato II",   duration: "35 min" },
  { href: "/exercises/5",   title: "Research loop para due diligence",   act: "Ato II",   duration: "45 min" },
  { href: "/exercises/6",   title: "Busca em tempo real",                act: "Ato III",  duration: "20 min" },
  { href: "/exercises/7",   title: "Agente com seus documentos",         act: "Ato III",  duration: "30 min" },
  { href: "/exercises/8",   title: "Agente no Slack",                    act: "Ato III",  duration: "35 min" },
  { href: "/exercises/m1",  title: "Automatize uma reunião",             act: "Missões",  duration: "15 min" },
  { href: "/exercises/m2",  title: "Gerador de propostas comerciais",    act: "Missões",  duration: "25 min" },
  { href: "/exercises/m3",  title: "Analise um contrato em minutos",     act: "Missões",  duration: "20 min" },
  { href: "/exercises/m4",  title: "RAG Simples",                         act: "Missões",  duration: "25 min" },
  { href: "/exercises/m5",  title: "RAG Avançado",                        act: "Missões",  duration: "35 min" },
  { href: "/exercises/m6",  title: "Do zero ao SaaS",                     act: "Missões",  duration: "45 min" },
  { href: "/exercises/m7",  title: "AutoResearch Simples",                act: "Missões",  duration: "25 min" },
  { href: "/exercises/m8",  title: "AutoResearch Karpathy",               act: "Missões",  duration: "40 min" },
];

// total must match the number of exercises with that act key in ALL_EXERCISES above.
const ACTS = [
  { label: "Ato I — Entenda o poder dos Agentes", key: "Ato I",   color: "#4b6afc", total: 6 },
  { label: "Ato II — Construa o Agente",          key: "Ato II",  color: "#4b6afc", total: 3 },
  { label: "Ato III — Conecte ao Mundo Real",     key: "Ato III", color: "#4b6afc", total: 3 },
  { label: "Ato IV — Missões",                    key: "Missões", color: "#d1a476", total: 8 },
];

export default function Dashboard() {
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("user_name") ?? "";
    setName(storedName);
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      try { setCompleted(new Set(JSON.parse(saved))); } catch {}
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalDone = completed.size;
  const totalExercises = ALL_EXERCISES.length;
  const pct = Math.round((totalDone / totalExercises) * 100);

  const nextExercise = ALL_EXERCISES.find(ex => !completed.has(ex.href)) ?? null;

  const completedByAct = (actKey: string) =>
    ALL_EXERCISES.filter(ex => ex.act === actKey && completed.has(ex.href)).length;

  return (
    <AppShell>
      {/* Hero block */}
      <div
        className="dashboard-hero mb-8 p-6 rounded-2xl"
        style={{ border: "1px solid var(--border-sub)" }}
      >
        {/* Decorative dots */}
        <div className="flex gap-1.5 mb-5">
          <span className="w-2 h-2 rounded-full" style={{ background: "#4b6afc" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "#8b5cf6" }} />
          <span className="w-2 h-2 rounded-full" style={{ background: "#d1a476" }} />
        </div>

        {/* Welcome */}
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-5)" }}>Início</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight" style={{ color: "var(--text-1)" }}>
          {name
            ? <><span style={{ color: "#d1a476" }}>Olá, {name.split(" ")[0]}</span> 👋</>
            : "Bem-vindo de volta 👋"}
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-4)" }}>
          {totalDone === 0
            ? "Você ainda não completou exercícios. Que tal começar agora?"
            : totalDone === totalExercises
            ? "Você completou todos os exercícios. Impressionante!"
            : `Você concluiu ${totalDone} de ${totalExercises} exercícios. Continue assim.`}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { value: `${totalDone}`, sub: `/${totalExercises}`, label: "concluídos" },
            { value: `${pct}%`, sub: "", label: "do curso" },
            { value: `${ACTS.filter(a => completedByAct(a.key) === a.total).length}`, sub: "/4", label: "atos completos" },
          ].map(({ value, sub, label }) => (
            <div
              key={label}
              className="rounded-xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-sub)" }}
            >
              <p className="text-2xl font-bold leading-none mb-1" style={{ color: "var(--text-1)" }}>
                {value}<span className="text-base font-normal" style={{ color: "var(--text-4)" }}>{sub}</span>
              </p>
              <p className="text-xs" style={{ color: "var(--text-4)" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Next exercise */}
        {nextExercise && (
          <Link
            href={nextExercise.href}
            className="flex items-center justify-between p-4 rounded-xl transition-all"
            style={{ background: "rgba(75,106,252,0.10)", border: "1px solid rgba(75,106,252,0.25)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(75,106,252,0.18)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(75,106,252,0.10)"; }}
          >
            <div>
              <p className="text-xs mb-1" style={{ color: "rgba(75,106,252,0.7)" }}>
                Continuar — {nextExercise.act} · {nextExercise.duration}
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{nextExercise.title}</p>
            </div>
            <span className="text-xl shrink-0 ml-4" style={{ color: "#4b6afc" }}>→</span>
          </Link>
        )}
      </div>

      {totalDone === totalExercises && nextExercise === null && (
        <div
          className="mb-8 p-4 rounded-xl"
          style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#4ade80" }}>✓ Curso completo!</p>
          <p className="text-sm mt-1" style={{ color: "var(--text-4)" }}>
            Você concluiu todos os exercícios e missões. Que tal explorar a Secret Zone?
          </p>
        </div>
      )}

      {/* Progress by act */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-5)" }}>
          Progresso por Ato
        </p>
        <div className="space-y-4">
          {ACTS.map((act) => {
            const done = completedByAct(act.key);
            const pctAct = Math.round((done / act.total) * 100);
            const isGold = act.key === "Missões";
            return (
              <div key={act.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-medium" style={{ color: "var(--text-3)" }}>{act.label}</p>
                  <p className="text-xs" style={{ color: "var(--text-4)" }}>
                    {done === act.total
                      ? <span style={{ color: isGold ? "#d1a476" : "#4ade80" }}>✓ completo</span>
                      : `${done}/${act.total}`}
                  </p>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pctAct}%`,
                      background: isGold ? "#d1a476" : "#4b6afc",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Self-help box */}
      <div
        className="mb-8 p-4 rounded-xl flex gap-3"
        style={{ background: "rgba(75,106,252,0.06)", border: "1px solid rgba(75,106,252,0.15)" }}
      >
        <span className="text-lg shrink-0">🤖</span>
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: "#8ba3ff" }}>Algo deu errado? O seu próprio agente resolve.</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
            Se um comando falhar, uma versão for diferente ou algo não funcionar como esperado —
            cole a mensagem de erro direto no seu agente de IA e peça ajuda. A IA conhece seu sistema operacional
            e sabe diagnosticar problemas de configuração. É sua primeira linha de suporte.
            Se tiver dúvidas dos exercícios, você pode também perguntar para ela!
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-5)" }}>
          Atalhos rápidos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/setup",         icon: "⬡",  label: "Setup",            desc: "Guia de instalação",                color: "var(--tint-3)",          border: "var(--border)",         text: "var(--text-3)" },
            { href: "/exercises",     icon: "◈",  label: "Exercícios",       desc: "Ver todos os exercícios",           color: "rgba(75,106,252,0.08)",  border: "rgba(75,106,252,0.2)", text: "#4b6afc" },
            { href: "/mindset",       icon: "🧠", label: "Product Thinking",    desc: "7 princípios para construir com IA",        color: "rgba(75,106,252,0.08)", border: "rgba(75,106,252,0.2)", text: "#4b6afc" },
            { href: "/oportunidades", icon: "🎯", label: "3 Oportunidades de IA", desc: "Diagnostique onde IA pode ajudar seu time", color: "rgba(75,106,252,0.08)", border: "rgba(75,106,252,0.2)", text: "#4b6afc" },
            { href: "/canvas",        icon: "📐", label: "Canvas de Agente", desc: "12 decisões antes de construir",    color: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)", text: "#a78bfa" },
            { href: "/secret-zone",   icon: "🔒", label: "Secret Zone",      desc: "Segurança e boas práticas",         color: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)",  text: "#f87171" },
            { href: "/auto-research", icon: "🔬", label: "AutoResearch",     desc: "Pesquisa autônoma com IA",           color: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.2)", text: "#fb923c" },
          ].map(({ href, icon, label, desc, color, border, text }) => (
            <Link
              key={href}
              href={href}
              className="flex items-start gap-3 p-4 rounded-xl transition-all"
              style={{ background: color, border: `1px solid ${border}` }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <span className="text-lg shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: text }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
