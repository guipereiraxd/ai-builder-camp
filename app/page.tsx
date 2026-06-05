"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, REGISTERED_KEY } from "../lib/firebase";
import { ThemeToggle } from "./components/ThemeToggle";

const deliverables = [
  { label: "Criar aplicações com vibe-coding", detail: "Descreva o que quer em linguagem natural — o agente escreve e entrega o app funcionando" },
  { label: "Criar ferramentas internas com uso de IA", detail: "De ideia a app funcionando em menos de 15 minutos" },
  { label: "Monitorar concorrentes e gerar inteligência de mercado", detail: "Um agente busca, analisa e entrega o resumo toda semana" },
  { label: "Criar conteúdo de qualidade", detail: "O agente gera, você revisa em minutos e aprova" },
  { label: "Nunca mais copiar e colar informações", detail: "Automatize fluxos de trabalho com agentes" },
  { label: "Criar sistemas com múltiplos agentes trabalhando em paralelo", detail: "Um agente pesquisa, outro analisa, outro entrega — como um time digital coordenado" },
];

const personas = [
  { icon: "◎", label: "Líderes de área" },
  { icon: "◎", label: "Executivos" },
  { icon: "◎", label: "Founders" },
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

  // Recovery mode
  const [mode, setMode] = useState<"register" | "recover">("register");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryStatus, setRecoveryStatus] = useState<"idle" | "loading" | "found" | "notfound" | "error">("idle");

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim() || !db) return;
    setRecoveryStatus("loading");
    try {
      const q = query(
        collection(db, "registrations"),
        where("email", "==", recoveryEmail.trim().toLowerCase())
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const data = snap.docs[0].data();
        localStorage.setItem(REGISTERED_KEY, "true");
        localStorage.setItem("user_name", data.name ?? "");
        setRecoveryStatus("found");
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        setRecoveryStatus("notfound");
      }
    } catch (err) {
      console.error(err);
      setRecoveryStatus("error");
    }
  };

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(REGISTERED_KEY) === "true") {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) return;

    // Grant access immediately — never block UX on Firebase availability
    localStorage.setItem(REGISTERED_KEY, "true");
    localStorage.setItem("user_name", form.name.trim());
    setStatus("success");
    setTimeout(() => router.push("/dashboard"), 1200);

    if (db) {
      const name    = form.name.trim();
      const email   = form.email.trim().toLowerCase();
      const company = form.company.trim();
      const firstName = name.split(" ")[0];

      // Save registration
      addDoc(collection(db, "registrations"), {
        name, email, company, registeredAt: new Date().toISOString(),
      }).catch(err => console.warn("[Firebase] Registration save failed:", err));

      // Trigger welcome email via Firebase Extension (fire-and-forget)
      const courseUrl = "https://ai-builder-camp.alura.com.br/dashboard";
      const setupUrl  = "https://ai-builder-camp.alura.com.br/setup";

      addDoc(collection(db, "mail"), {
        to: [email],
        message: {
          subject: `${firstName}, seu acesso ao AI Builder Camp está liberado 🚀`,
          html: `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

<tr><td style="background:#0f0f0f;border-radius:12px 12px 0 0;padding:32px 40px;">
  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#d1a476;">Alun Business</p>
  <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">AI Builder Camp</h1>
</td></tr>

<tr><td style="background:#ffffff;padding:40px;">
  <p style="margin:0 0 20px;font-size:16px;color:#334155;">Olá, <strong>${firstName}</strong> 👋</p>
  <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#334155;">
    Seu acesso ao AI Builder Camp está liberado. Você está prestes a aprender a usar IA como uma
    ferramenta real de trabalho — não como um chatbot, mas como um agente que trabalha dentro da sua empresa.
  </p>

  <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
    <tr><td style="background:#4b6afc;border-radius:8px;">
      <a href="${courseUrl}" style="display:block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
        Acessar o curso →
      </a>
    </td></tr>
  </table>

  <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">O que você vai aprender</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
    <tr><td style="padding:12px 0;border-top:1px solid #f1f5f9;">
      <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Ato I</p>
      <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#0f172a;">Entenda o poder dos Agentes</p>
      <p style="margin:0;font-size:13px;color:#64748b;">6 exercícios práticos — de um produto digital ao briefing semanal automatizado.</p>
    </td></tr>
    <tr><td style="padding:12px 0;border-top:1px solid #f1f5f9;">
      <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Ato II</p>
      <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#0f172a;">Construa seu primeiro Agente</p>
      <p style="margin:0;font-size:13px;color:#64748b;">Agentes autônomos que monitoram mercado, produzem conteúdo e fazem due diligence.</p>
    </td></tr>
    <tr><td style="padding:12px 0;border-top:1px solid #f1f5f9;">
      <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Ato III</p>
      <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#0f172a;">Conecte ao mundo real</p>
      <p style="margin:0;font-size:13px;color:#64748b;">Agente com busca web, documentos do Drive e Slack — tudo integrado.</p>
    </td></tr>
  </table>

  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:28px;">
    <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#0f172a;">Antes de começar</p>
    <p style="margin:0 0 12px;font-size:13px;color:#64748b;line-height:1.5;">
      O curso usa ferramentas de IA em linha de comando. O guia de instalação leva menos de 20 minutos e cobre Mac e Windows.
    </p>
    <a href="${setupUrl}" style="font-size:13px;color:#4b6afc;text-decoration:none;font-weight:600;">Ver guia de instalação →</a>
  </div>

  <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">
    Qualquer dúvida, responda este email.<br>
    Bom curso,<br>
    <strong style="color:#0f172a;">Equipe Alun Business</strong>
  </p>
</td></tr>

<tr><td style="background:#f8fafc;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #e2e8f0;">
  <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
    Você se cadastrou no AI Builder Camp, uma iniciativa da Alun Business.
    Guarde este email — ele tem o link de acesso ao curso.
  </p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`,
        },
      }).catch(err => console.warn("[Firebase] Email trigger failed:", err));

      // Admin notification
      const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
      addDoc(collection(db, "mail"), {
        to: ["gluizpereira@gmail.com"],
        message: {
          subject: `Novo cadastro — ${name}`,
          html: `<div style="font-family:sans-serif;max-width:480px;padding:24px;">
  <p style="margin:0 0 16px;font-size:14px;color:#64748b;">AI Builder Camp — Novo cadastro</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;width:100px;">Nome</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-weight:600;">${name}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${email}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;">Empresa</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${company || "—"}</td></tr>
    <tr><td style="padding:8px 0;color:#94a3b8;">Horário</td><td style="padding:8px 0;color:#0f172a;">${now}</td></tr>
  </table>
</div>`,
        },
      }).catch(err => console.warn("[Firebase] Admin notification failed:", err));
    }

  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text-2)" }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/logo-alun-white.svg" alt="Alun" className="h-6 w-auto" />
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

          <p className="text-base leading-relaxed mb-2" style={{ color: "var(--text-2)" }}>
            Para quem lidera uma empresa ou área e precisa de alavancagem real —
            não de mais teoria sobre IA. Você sai com ferramentas funcionando,
            não com slides sobre o futuro. E ainda fomenta na prática cultura de experimentação.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-4)" }}>
            Funciona com <strong style={{ color: "var(--text-3)" }}>Claude, OpenAI ou Gemini</strong>.
            Em até 5 horas, sem escrever código.
          </p>

          {/* Social proof bar */}
          <div
            className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 pb-8"
            style={{ borderBottom: "1px solid #1e2026" }}
          >
            {[
              { value: "12", label: "exercícios práticos" },
              { value: "4", label: "atos progressivos" },
              { value: "5h", label: "do zero à IA Agêntica" },
              { value: "3", label: "ferramentas compatíveis" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-white">{value}</span>
                <span className="text-xs" style={{ color: "var(--text-4)" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Who it's for */}
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-5)" }}>Para quem é</p>
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
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-5)" }}>O que você vai conseguir fazer</p>
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
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-5)" }}>Estrutura do curso</p>
          <div className="space-y-2">
            {acts.map((act) => (
              <div
                key={act.n}
                className="flex items-start gap-4 p-3 rounded-lg"
                style={{ border: "1px solid #1e2026", background: "rgba(255,255,255,0.015)" }}
              >
                <span className="text-xs font-mono pt-0.5 shrink-0 w-14 whitespace-nowrap" style={{ color: (act as { gold?: boolean }).gold ? "rgba(209,164,118,0.7)" : "var(--text-5)" }}>{act.n}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "var(--text-1)" }}>{act.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{act.description}</p>
                </div>
                <span className="text-xs shrink-0 pt-0.5" style={{ color: (act as { gold?: boolean }).gold ? "rgba(209,164,118,0.7)" : "var(--text-5)" }}>{act.time}</span>
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
            {/* Success states */}
            {(status === "success" || recoveryStatus === "found") ? (
              <div className="py-10 text-center">
                <div className="text-4xl mb-4" style={{ color: "#4b6afc" }}>✓</div>
                <p className="text-white font-semibold mb-1">
                  {recoveryStatus === "found" ? "Acesso restaurado!" : "Acesso liberado!"}
                </p>
                <p className="text-sm" style={{ color: "var(--text-4)" }}>Redirecionando…</p>
              </div>

            ) : mode === "recover" ? (
              /* ── Recovery mode ── */
              <>
                <button
                  onClick={() => { setMode("register"); setRecoveryStatus("idle"); setRecoveryEmail(""); }}
                  className="flex items-center gap-1.5 text-xs mb-4 transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-4)" }}
                >
                  ← Voltar ao cadastro
                </button>
                <p className="text-base font-semibold text-white mb-0.5">Recuperar acesso</p>
                <p className="text-sm mb-5" style={{ color: "var(--text-4)" }}>
                  Digite o e-mail que usou no cadastro e restauramos sua sessão.
                </p>
                <form onSubmit={handleRecover} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-3)" }}>E-mail do cadastro</label>
                    <input
                      type="email"
                      required
                      placeholder="voce@empresa.com"
                      value={recoveryEmail}
                      onChange={(e) => { setRecoveryEmail(e.target.value); setRecoveryStatus("idle"); }}
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-white/20 outline-none"
                      style={{ background: "var(--tint-4)", border: "1px solid var(--border)" }}
                      onFocus={(e) => (e.target.style.borderColor = "#4b6afc")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  {recoveryStatus === "notfound" && (
                    <p className="text-xs" style={{ color: "#f87171" }}>
                      E-mail não encontrado. Verifique ou faça um novo cadastro.
                    </p>
                  )}
                  {recoveryStatus === "error" && (
                    <p className="text-xs" style={{ color: "#f87171" }}>
                      Algo deu errado. Tente novamente.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={recoveryStatus === "loading"}
                    className="w-full py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ background: "#4b6afc", color: "#ffffff" }}
                  >
                    {recoveryStatus === "loading" ? "Buscando…" : "Restaurar acesso →"}
                  </button>
                </form>
              </>

            ) : (
              /* ── Register mode ── */
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

                {/* Trust signals + recovery link */}
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
                  <button
                    onClick={() => setMode("recover")}
                    className="text-xs pt-2 transition-opacity hover:opacity-70 text-left"
                    style={{ color: "var(--text-5)" }}
                  >
                    Já se cadastrou antes? Recupere seu acesso →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="max-w-5xl mx-auto px-6 pb-8 flex justify-end">
        <a href="/privacy" className="text-xs transition-colors hover:text-white/30" style={{ color: "var(--border-sub)" }}>
          Política de Privacidade
        </a>
      </div>

    </div>
  );
}
