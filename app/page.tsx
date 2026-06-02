"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db, REGISTERED_KEY } from "../lib/firebase";

const acts = [
  {
    n: "Ato I",
    title: "Sinta o Que É Possível",
    description: "Do zero a resultados reais — sem código, sem setup complexo.",
    time: "~1h45",
  },
  {
    n: "Ato II",
    title: "Construa Seu Primeiro Agente",
    description: "O agente trabalha de forma autônoma. Você revisa e decide.",
    time: "~1h50",
  },
  {
    n: "Ato III",
    title: "Conecte ao Mundo Real",
    description: "Claude acessa a web, o Drive e o Slack por conta própria.",
    time: "~1h25",
  },
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
    <div className="min-h-screen" style={{ background: "#0f0f0f", color: "#cfd2d8" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/ai-builder-camp/logo-alun-white.svg" alt="Alun" className="h-6 w-auto" />
          <span className="text-sm font-semibold" style={{ color: "#d1a476" }}>AI Builder Camp</span>
        </div>
        <div
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full"
          style={{ color: "#4b6afc", background: "rgba(75,106,252,0.1)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4b6afc" }} />
          12 exercícios · ~5 horas
        </div>
      </div>

      {/* Hero + Form */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24 grid md:grid-cols-2 gap-16 items-start">

        {/* Left — copy */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
            IA na prática,<br />
            <span style={{ color: "#d1a476" }}>para quem quer transformar ideia em entrega.</span>
          </h1>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#8b8f9a" }}>
            Curso prático com Claude Code. Você cria produtos, automatiza tarefas e
            constrói agentes autônomos — tudo sem escrever código. Em ~5 horas.
          </p>

          {/* Attributes */}
          <div className="space-y-3 mb-10">
            {[
              "12 exercícios com prompts prontos para usar",
              "3 atos progressivos — do básico ao agente com MCPs",
              "Comandos para Mac e Windows em cada passo",
              "Resultados reais no primeiro exercício",
            ].map((label) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-sm mt-0.5 shrink-0" style={{ color: "#4b6afc" }}>◈</span>
                <span className="text-sm" style={{ color: "#cfd2d8" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Acts preview */}
          <div className="space-y-2">
            {acts.map((act) => (
              <div
                key={act.n}
                className="flex items-start gap-4 p-3 rounded-lg"
                style={{ border: "1px solid #1e2026", background: "rgba(255,255,255,0.015)" }}
              >
                <span className="text-xs font-mono pt-0.5 shrink-0 w-12" style={{ color: "#33363e" }}>{act.n}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{act.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#64687a" }}>{act.description}</p>
                </div>
                <span className="text-xs shrink-0 pt-0.5" style={{ color: "#33363e" }}>{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="md:sticky md:top-10">
          <div
            className="p-6 rounded-2xl"
            style={{ border: "1px solid #2a2d35", background: "rgba(255,255,255,0.03)" }}
          >
            {status === "success" ? (
              <div className="py-10 text-center">
                <div className="text-4xl mb-4" style={{ color: "#4b6afc" }}>✓</div>
                <p className="text-white font-semibold mb-1">Acesso liberado!</p>
                <p className="text-sm" style={{ color: "#64687a" }}>Redirecionando para os exercícios…</p>
              </div>
            ) : (
              <>
                <p className="text-white font-semibold mb-1">Acesse o curso gratuitamente</p>
                <p className="text-sm mb-6" style={{ color: "#64687a" }}>
                  Preencha seus dados para começar agora.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8f9a" }}>
                      Nome completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/20 outline-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #33363e" }}
                      onFocus={(e) => (e.target.style.borderColor = "#4b6afc")}
                      onBlur={(e) => (e.target.style.borderColor = "#33363e")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8f9a" }}>
                      E-mail profissional
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="voce@empresa.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/20 outline-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #33363e" }}
                      onFocus={(e) => (e.target.style.borderColor = "#4b6afc")}
                      onBlur={(e) => (e.target.style.borderColor = "#33363e")}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#8b8f9a" }}>
                      Empresa / Organização
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome da empresa"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/20 outline-none"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid #33363e" }}
                      onFocus={(e) => (e.target.style.borderColor = "#4b6afc")}
                      onBlur={(e) => (e.target.style.borderColor = "#33363e")}
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs" style={{ color: "#f87171" }}>{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ background: "#4b6afc", color: "#ffffff" }}
                  >
                    {status === "loading" ? "Enviando…" : "Acessar o curso →"}
                  </button>
                </form>

                <p className="text-xs text-center mt-4" style={{ color: "#33363e" }}>
                  Gratuito. Sem spam.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
