"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db, REGISTERED_KEY } from "../lib/firebase";
import { ThemeToggle } from "./components/ThemeToggle";

const deliverables = [
  { label: "Produto digital funcional", detail: "Criado com um único prompt, sem escrever uma linha de código" },
  { label: "Agente de inteligência competitiva", detail: "Monitora concorrentes e entrega relatório toda semana" },
  { label: "Pipeline de conteúdo com revisão humana", detail: "Gera, revisa e publica — você só aprova" },
  { label: "Agente conectado ao Drive, Slack e à internet", detail: "Busca dados onde estão, sem você copiar nada" },
];

const personas = [
  { icon: "◎", label: "CEOs e fundadores" },
  { icon: "◎", label: "Gestores e heads" },
  { icon: "◎", label: "Analistas e consultores" },
  { icon: "◎", label: "Empreendedores" },
];

const acts = [
  { n: "Ato I", title: "Entenda o poder dos Agentes", description: "Do zero a resultados reais em exercícios rápidos.", time: "~1h45" },
  { n: "Ato II", title: "Construa Seu Primeiro Agente", description: "O agente trabalha sozinho. Você revisa e decide.", time: "~1h50" },
  { n: "Ato III", title: "Conecte ao Mundo Real", description: "O agente acessa a web, documentos e Slack por conta própria.", time: "~1h25" },
  { n: "Ato IV", title: "Continue Praticando", description: "Missões complementares adicionadas periodicamente.", time: "missões", gold: true },
];

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(REGISTERED_KEY) === "true") {
      router.push("/exercises");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      await addDoc(collection(db, "registrations"), {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        company: form.company.trim(),
        registeredAt: new Date().toISOString(),
      });
      localStorage.setItem(REGISTERED_KEY, "true");
      localStorage.setItem("user_name", form.name.trim());
      setStatus("success");
      setTimeout(() => router.push("/exercises"), 1200);
    } catch (err) {
      console.error(err);
      setErrorMsg("Algo deu errado. Tente novamente.");
      setStatus("error");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-2)" }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/ai-builder-camp/logo-alun-white.svg" alt="Alun" className="h-6 w-auto" />
          <span className="text-sm font-semibold" style={{ color: "#d1a476" }}>AI Builder Camp</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="hidden sm:inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ color: "#4b6afc", background: "rgba(75,106,252,0.1)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4b6afc" }} />
            Acesso gratuito · 12 exercícios
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Hero + Form */}

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-8 grid md:grid-cols-2 gap-14 items-start">

        {/* Left — copy */}
        <div>
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            IA na prática,<br />
            <span style={{ color: "#d1a476" }}>para gerar resultado e entrega direto ao ponto.</span>
          </h1>

          <p className="text-base leading-relaxed mb-6" style={{ color: "var(--text-3)" }}>
            Um curso prático. Faça primeiro, aprenda no caminho. Você cria produtos,
            automatiza tarefas e constrói agentes autônomos — tudo sem escrever código.
            Funciona com <strong className="text-white/70">Claude, OpenAI ou Gemini</strong>. Em até 5 horas.
          </p>

          {/* Social proof bar */}
          <div
            className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 pb-8"
            style={{ borderBottom: "1px solid #1e2026" }}
          >
            {[
              { value: "12", label: "exercícios práticos" },
              { value: "3", label: "atos progressivos" },
              { value: "≤5h", label: "do zero ao agente" },
              { value: "3", label: "ferramentas compatíveis" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-white">{value}</span>
                <span className="text-xs" style={{ color: "var(--text-4)" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Who it's for */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--border)" }}>Para quem é</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {personas.map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style={{ background: "var(--tint-4)", border: "1px solid #2a2d35", color: "var(--text-2)" }}
              >
                <span style={{ color: "#4b6afc" }}>{icon}</span>
                {label}
              </span>
            ))}
          </div>

          {/* What you'll build */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--border)" }}>O que você vai entregar</p>
          <div className="space-y-3 mb-8">
            {deliverables.map(({ label, detail }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>✓</span>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Acts */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--border)" }}>Estrutura do curso</p>
          <div className="space-y-2">
            {acts.map((act) => (
              <div
                key={act.n}
                className="flex items-start gap-4 p-3 rounded-lg"
                style={{ border: "1px solid #1e2026", background: "rgba(255,255,255,0.015)" }}
              >
                <span className="text-xs font-mono pt-0.5 shrink-0 w-14 whitespace-nowrap" style={{ color: (act as { gold?: boolean }).gold ? "rgba(209,164,118,0.4)" : "var(--border)" }}>{act.n}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{act.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{act.description}</p>
                </div>
                <span className="text-xs shrink-0 pt-0.5" style={{ color: (act as { gold?: boolean }).gold ? "rgba(209,164,118,0.4)" : "var(--border)" }}>{act.time}</span>
              </div>
            ))}
          </div>

          {/* Bottom reassurance */}
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              "Sem pré-requisitos técnicos",
              "Claude, OpenAI ou Gemini — você escolhe",
              "Mac e Windows · Acesso gratuito",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-4)" }}>
                <span style={{ color: "#4b6afc" }}>✓</span> {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right — form (sticky) */}
        <div className="md:sticky md:top-10">
          <div
            className="p-6 rounded-2xl"
            style={{ border: "1px solid #2a2d35", background: "var(--tint-3)" }}
          >
            {status === "success" ? (
              <div className="py-10 text-center">
                <div className="text-4xl mb-4" style={{ color: "#4b6afc" }}>✓</div>
                <p className="text-white font-semibold mb-1">Acesso liberado!</p>
                <p className="text-sm" style={{ color: "var(--text-4)" }}>Redirecionando para os exercícios…</p>
              </div>
            ) : (
              <>
                <p className="text-base font-semibold text-white mb-0.5">Comece agora, é gratuito</p>
                <p className="text-sm mb-5" style={{ color: "var(--text-4)" }}>
                  Preencha seus dados e acesse os 12 exercícios na hora.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Nome completo", type: "text", placeholder: "Seu nome" },
                    { key: "email", label: "E-mail profissional", type: "email", placeholder: "voce@empresa.com" },
                    { key: "company", label: "Empresa / Organização", type: "text", placeholder: "Nome da empresa" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-3)" }}>{label}</label>
                      <input
                        type={type}
                        required
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/20 outline-none"
                        style={{ background: "var(--tint-4)", border: "1px solid var(--border)" }}
                        onFocus={(e) => (e.target.style.borderColor = "#4b6afc")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      />
                    </div>
                  ))}

                  {errorMsg && <p className="text-xs" style={{ color: "#f87171" }}>{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ background: "#4b6afc", color: "#ffffff" }}
                  >
                    {status === "loading" ? "Enviando…" : "Acessar o curso gratuitamente →"}
                  </button>
                </form>

                {/* Mini trust signals below button */}
                <div className="mt-5 pt-5 space-y-2" style={{ borderTop: "1px solid #1e2026" }}>
                  {[
                    "Acesso imediato após o cadastro",
                    "Sem cartão de crédito",
                    "Sem compromisso — avance no seu ritmo",
                  ].map((item) => (
                    <p key={item} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-4)" }}>
                      <span style={{ color: "#4b6afc" }}>✓</span> {item}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="max-w-5xl mx-auto px-6 pb-8 flex justify-end">
        <a href="/ai-builder-camp/privacy" className="text-xs transition-colors hover:text-white/30" style={{ color: "var(--border-sub)" }}>
          Política de Privacidade
        </a>
      </div>

    </div>
  );
}
