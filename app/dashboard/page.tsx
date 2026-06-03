"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import { PROGRESS_KEY } from "../components/ExerciseComponents";

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
];

const ACTS = [
  { label: "Ato I — Entenda o poder dos Agentes", key: "Ato I",   color: "#4b6afc", total: 6 },
  { label: "Ato II — Construa o Agente",          key: "Ato II",  color: "#4b6afc", total: 3 },
  { label: "Ato III — Conecte ao Mundo Real",     key: "Ato III", color: "#4b6afc", total: 3 },
  { label: "Ato IV — Missões",                    key: "Missões", color: "#d1a476", total: 3 },
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
      {/* Welcome */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--text-5)" }}>Início</p>
        <h1 className="text-2xl md:text-3xl font-bold mb-1" style={{ color: "var(--text-1)" }}>
          {name ? `Olá, ${name.split(" ")[0]} 👋` : "Bem-vindo de volta 👋"}
        </h1>
        <p className="text-base" style={{ color: "var(--text-4)" }}>
          {totalDone === 0
            ? "Você ainda não completou exercícios. Que tal começar agora?"
            : totalDone === totalExercises
            ? "Você completou todos os exercícios. Impressionante!"
            : `Você concluiu ${totalDone} de ${totalExercises} exercícios. Continue assim.`}
        </p>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-xl"
        style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}
      >
        {[
          { value: `${totalDone}/${totalExercises}`, label: "concluídos" },
          { value: `${pct}%`, label: "do curso" },
          { value: `${ACTS.filter(a => completedByAct(a.key) === a.total).length}/4`, label: "atos completos" },
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="text-xl font-bold" style={{ color: "var(--text-1)" }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Next exercise */}
      {nextExercise && (
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-5)" }}>
            Continue de onde parou
          </p>
          <Link
            href={nextExercise.href}
            className="flex items-center justify-between p-4 rounded-xl transition-all group"
            style={{ background: "rgba(75,106,252,0.08)", border: "1px solid rgba(75,106,252,0.2)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(75,106,252,0.14)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(75,106,252,0.08)"; }}
          >
            <div>
              <p className="text-xs mb-1" style={{ color: "rgba(75,106,252,0.7)" }}>{nextExercise.act} · {nextExercise.duration}</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{nextExercise.title}</p>
            </div>
            <span className="text-xl" style={{ color: "#4b6afc" }}>→</span>
          </Link>
        </div>
      )}

      {totalDone === totalExercises && (
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

      {/* Quick links */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-5)" }}>
          Atalhos rápidos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/canvas",      icon: "📐", label: "Canvas de Agente", desc: "12 decisões antes de construir", color: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)", text: "#a78bfa" },
            { href: "/secret-zone", icon: "🔒", label: "Secret Zone",      desc: "Segurança e boas práticas",      color: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.2)",  text: "#f87171" },
            { href: "/exercises",   icon: "◈",  label: "Exercícios",        desc: "Ver todos os exercícios",        color: "rgba(75,106,252,0.08)", border: "rgba(75,106,252,0.2)", text: "#4b6afc" },
            { href: "/setup",       icon: "⬡",  label: "Setup",             desc: "Guia de instalação",             color: "var(--tint-3)",         border: "var(--border)",         text: "var(--text-3)" },
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
