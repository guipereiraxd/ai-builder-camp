"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { REGISTERED_KEY, setSession } from "../../lib/session";

const SOURCE = "caldeira";

// Caldeira palette
const C = {
  offwhite: "#f7f8f1",
  black: "#000000",
  salmon: "#ff8e6c",
  line: "rgba(0,0,0,0.12)",
  muted: "#6b6b65",
  dark: "#0c0c0c",
  darkSurface: "#141414",
  darkBorder: "rgba(255,255,255,0.08)",
};

const deliverables = [
  { label: "Criar aplicações com vibe-coding", detail: "Descreva o que quer em linguagem natural — o agente escreve e entrega o app funcionando" },
  { label: "Automatizar fluxos de trabalho com agentes", detail: "Nunca mais copiar e colar informações entre ferramentas" },
  { label: "Monitorar concorrentes e gerar inteligência de mercado", detail: "Um agente busca, analisa e entrega o resumo toda semana" },
  { label: "Criar sistemas com múltiplos agentes em paralelo", detail: "Um agente pesquisa, outro analisa, outro entrega — como um time digital coordenado" },
];

const acts = [
  { n: "Ato I",   title: "Entenda o poder dos Agentes",  time: "~1h45" },
  { n: "Ato II",  title: "Construa Seu Primeiro Agente", time: "~1h50" },
  { n: "Ato III", title: "Conecte ao Mundo Real",        time: "~1h25" },
  { n: "Ato IV",  title: "Missões Complementares",       time: "missões", gold: true },
];

export default function CaldeiraCamp() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mode, setMode] = useState<"register" | "recover">("register");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryStatus, setRecoveryStatus] = useState<"idle" | "loading" | "found" | "notfound" | "error">("idle");

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail.trim() || !db) return;
    setRecoveryStatus("loading");
    try {
      const q = query(collection(db, "registrations"), where("email", "==", recoveryEmail.trim().toLowerCase()));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const data = snap.docs[0].data();
        setSession(data.name ?? "");
        setRecoveryStatus("found");
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        setRecoveryStatus("notfound");
      }
    } catch { setRecoveryStatus("error"); }
  };

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(REGISTERED_KEY) === "true") router.push("/dashboard");
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) return;
    setSession(form.name.trim());
    setStatus("success");
    setTimeout(() => router.push("/dashboard"), 1200);

    if (db) {
      const name    = form.name.trim();
      const email   = form.email.trim().toLowerCase();
      const company = form.company.trim();
      const firstName = name.split(" ")[0];

      addDoc(collection(db, "registrations"), {
        name, email, company, source: SOURCE, registeredAt: new Date().toISOString(),
      }).catch(err => console.warn("[Firebase] Registration save failed:", err));

      const courseUrl = "https://ai-builder-camp.alura.com.br/dashboard";
      const setupUrl  = "https://ai-builder-camp.alura.com.br/setup";

      addDoc(collection(db, "mail"), {
        to: [email],
        message: {
          subject: `${firstName}, seu acesso ao AI Builder Camp está liberado 🚀`,
          html: `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
<tr><td style="background:#0c0c0c;border-radius:0;padding:32px 40px;">
  <p style="margin:0 0 2px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#ff8e6c;">AI Day Caldeira 2026</p>
  <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#d1a476;">Alun Business</p>
  <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">AI Builder Camp</h1>
</td></tr>
<tr><td style="background:#ffffff;padding:40px;">
  <p style="margin:0 0 20px;font-size:16px;color:#334155;">Olá, <strong>${firstName}</strong> 👋</p>
  <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">Você chegou aqui pelo AI Day Caldeira — ótima escolha. Seu acesso ao AI Builder Camp está liberado.</p>
  <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#334155;">O camp tem 19 exercícios práticos para você aprender a usar IA como uma ferramenta real de trabalho — não como um chatbot, mas como um agente que trabalha dentro da sua empresa.</p>
  <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
    <tr><td style="background:#ff8e6c;border-radius:0;">
      <a href="${courseUrl}" style="display:block;padding:14px 28px;font-size:15px;font-weight:700;color:#000000;text-decoration:none;letter-spacing:0.02em;">Acessar o curso →</a>
    </td></tr>
  </table>
  <p style="margin:0 0 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#94a3b8;">O que você vai aprender</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
    <tr><td style="padding:12px 0;border-top:1px solid #f1f5f9;"><p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Ato I</p><p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#0f172a;">Entenda o poder dos Agentes</p><p style="margin:0;font-size:13px;color:#64748b;">6 exercícios práticos — de um produto digital ao briefing semanal automatizado.</p></td></tr>
    <tr><td style="padding:12px 0;border-top:1px solid #f1f5f9;"><p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Ato II</p><p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#0f172a;">Construa seu primeiro Agente</p><p style="margin:0;font-size:13px;color:#64748b;">Agentes autônomos que monitoram mercado, produzem conteúdo e fazem due diligence.</p></td></tr>
    <tr><td style="padding:12px 0;border-top:1px solid #f1f5f9;"><p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Ato III</p><p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#0f172a;">Conecte ao mundo real</p><p style="margin:0;font-size:13px;color:#64748b;">Agente com busca web, documentos do Drive e Slack — tudo integrado.</p></td></tr>
  </table>
  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:0;padding:20px;margin-bottom:28px;">
    <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#0f172a;">Antes de começar</p>
    <p style="margin:0 0 12px;font-size:13px;color:#64748b;line-height:1.5;">O curso usa ferramentas de IA em linha de comando. O guia leva menos de 20 minutos, Mac e Windows.</p>
    <a href="${setupUrl}" style="font-size:13px;color:#ff8e6c;text-decoration:none;font-weight:600;">Ver guia de instalação →</a>
  </div>
  <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">Qualquer dúvida, responda este email.<br>Bom curso,<br><strong style="color:#0f172a;">Equipe Alun Business</strong></p>
</td></tr>
<tr><td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
  <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">Você se cadastrou no AI Builder Camp pelo AI Day Caldeira 2026, uma iniciativa da Alun Business.</p>
</td></tr>
</table></td></tr></table>
</body></html>`,
        },
      }).catch(err => console.warn("[Firebase] Email trigger failed:", err));

      const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
      addDoc(collection(db, "mail"), {
        to: ["gluizpereira@gmail.com"],
        message: {
          subject: `Novo cadastro [AI Day Caldeira] — ${name}`,
          html: `<div style="font-family:sans-serif;max-width:480px;padding:24px;">
<p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#ff8e6c;">AI Day Caldeira 2026</p>
<p style="margin:0 0 16px;font-size:14px;color:#64748b;">AI Builder Camp — Novo cadastro</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;">
  <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;width:100px;">Nome</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-weight:600;">${name}</td></tr>
  <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${email}</td></tr>
  <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;">Empresa</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${company || "—"}</td></tr>
  <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;">Origem</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#ff8e6c;font-weight:600;">AI Day Caldeira 2026</td></tr>
  <tr><td style="padding:8px 0;color:#94a3b8;">Horário</td><td style="padding:8px 0;color:#0f172a;">${now}</td></tr>
</table></div>`,
        },
      }).catch(err => console.warn("[Firebase] Admin notification failed:", err));
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ minHeight: "100vh", background: C.offwhite, color: C.black, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>

      {/* Top bar */}
      <div style={{ borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-alun-dark.svg" alt="Alun" className="h-5 w-auto"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em", color: C.black }}>AI Builder Camp</span>
          </div>
          <div
            style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: C.salmon,
              padding: "4px 12px", border: `1px solid ${C.salmon}`,
            }}
          >
            AI Day Caldeira 2026
          </div>
        </div>
      </div>

      {/* Event context strip */}
      <div style={{ background: C.black, color: C.offwhite }}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.salmon, margin: 0 }}>
            Inteligência artificial na prática, entre pares.
          </p>
          <p style={{ fontSize: "12px", color: "rgba(247,248,241,0.5)", margin: 0, letterSpacing: "0.04em" }}>
            Instituto Caldeira · Navegantes, Porto Alegre · 01.12.26
          </p>
        </div>
      </div>

      {/* Hero + Form */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-10 grid md:grid-cols-2 gap-14 items-start">

        {/* Left — copy */}
        <div>
          {/* Kicker */}
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, marginBottom: "16px" }}>
            Acesso exclusivo para participantes do AI Day
          </p>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 800, lineHeight: 1.1, color: C.black, marginBottom: "20px", letterSpacing: "-0.02em" }}>
            O que você aprende hoje no AI Day,{" "}
            <span style={{ color: C.salmon }}>você pratica aqui.</span>
          </h1>

          <p style={{ fontSize: "15px", lineHeight: 1.6, color: C.muted, marginBottom: "8px" }}>
            19 exercícios para profissionais que querem sair do prompt solto e aprender a criar agentes,
            automações e workflows com IA aplicados ao negócio.
          </p>
          <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#9a9a94", marginBottom: "32px" }}>
            Funciona com <strong style={{ color: C.black }}>Claude, OpenAI ou Gemini</strong>. Em até 5 horas, sem escrever código.
          </p>

          {/* Stats */}
          <div
            className="grid grid-cols-2 gap-x-6 gap-y-4"
            style={{ paddingBottom: "32px", marginBottom: "32px", borderBottom: `1px solid ${C.line}` }}
          >
            {[
              { value: "19+", label: "exercícios no total" },
              { value: "4",   label: "atos progressivos" },
              { value: "5h",  label: "do zero à IA Agêntica" },
              { value: "3",   label: "ferramentas compatíveis" },
            ].map(({ value, label }) => (
              <div key={label}>
                <span style={{ fontSize: "22px", fontWeight: 800, color: C.black, display: "block", lineHeight: 1 }}>{value}</span>
                <span style={{ fontSize: "11px", letterSpacing: "0.06em", color: C.muted, textTransform: "uppercase", marginTop: "4px", display: "block" }}>{label}</span>
              </div>
            ))}
          </div>

          {/* What you'll build */}
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, marginBottom: "16px" }}>
            O que você vai conseguir fazer
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            {deliverables.map(({ label, detail }) => (
              <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <span style={{ color: C.salmon, fontWeight: 700, marginTop: "1px", flexShrink: 0 }}>→</span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: C.black, margin: 0 }}>{label}</p>
                  <p style={{ fontSize: "12px", color: C.muted, margin: "2px 0 0" }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Acts */}
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, marginBottom: "12px" }}>
            Estrutura do curso
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {acts.map((act, i) => (
              <div
                key={act.n}
                style={{
                  display: "flex", alignItems: "center", gap: "16px",
                  padding: "12px 0",
                  borderTop: i === 0 ? `1px solid ${C.line}` : "none",
                  borderBottom: `1px solid ${C.line}`,
                }}
              >
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: act.gold ? C.salmon : C.muted, width: "52px", flexShrink: 0 }}>{act.n}</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: C.black, flex: 1 }}>{act.title}</span>
                <span style={{ fontSize: "11px", color: act.gold ? C.salmon : C.muted, flexShrink: 0 }}>{act.time}</span>
              </div>
            ))}
          </div>

          {/* Alun proof */}
          <div
            style={{
              marginTop: "32px", padding: "20px",
              border: `1px solid ${C.line}`,
            }}
          >
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, marginBottom: "8px" }}>
              Apoio temático do AI Day Caldeira
            </p>
            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#4a4a44", marginBottom: "16px" }}>
              Uma experiência da <strong style={{ color: C.black }}>Alun Business</strong>, ecossistema formado por{" "}
              <strong style={{ color: C.black }}>Alura, FIAP, PM3 e StartSe</strong>.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { value: "6M+",   label: "pessoas impactadas" },
                { value: "13K+",  label: "empresas atendidas" },
                { value: "100K+", label: "treinadas em IA" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p style={{ fontSize: "16px", fontWeight: 800, color: C.black, margin: 0 }}>{value}</p>
                  <p style={{ fontSize: "11px", color: C.muted, margin: "2px 0 0", letterSpacing: "0.04em" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form card (dark) */}
        <div className="md:sticky md:top-10">
          <div style={{ background: C.dark, padding: "28px", border: `1px solid ${C.darkBorder}` }}>

            {(status === "success" || recoveryStatus === "found") ? (
              <div style={{ padding: "40px 0", textAlign: "center" }}>
                <div style={{ fontSize: "36px", color: C.salmon, marginBottom: "16px" }}>✓</div>
                <p style={{ color: "#fff", fontWeight: 600, marginBottom: "4px" }}>
                  {recoveryStatus === "found" ? "Acesso restaurado!" : "Acesso liberado!"}
                </p>
                <p style={{ fontSize: "13px", color: "rgba(247,248,241,0.4)" }}>Redirecionando…</p>
              </div>

            ) : mode === "recover" ? (
              <>
                <button
                  onClick={() => { setMode("register"); setRecoveryStatus("idle"); setRecoveryEmail(""); }}
                  style={{ fontSize: "12px", color: "rgba(247,248,241,0.4)", background: "none", border: "none", cursor: "pointer", marginBottom: "16px", padding: 0 }}
                >
                  ← Voltar ao cadastro
                </button>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>Recuperar acesso</p>
                <p style={{ fontSize: "13px", color: "rgba(247,248,241,0.5)", marginBottom: "20px" }}>
                  Digite o e-mail que usou no cadastro.
                </p>
                <form onSubmit={handleRecover} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(247,248,241,0.5)", marginBottom: "6px" }}>E-mail do cadastro</label>
                    <input
                      type="email" required placeholder="voce@empresa.com"
                      value={recoveryEmail}
                      onChange={(e) => { setRecoveryEmail(e.target.value); setRecoveryStatus("idle"); }}
                      style={{ width: "100%", padding: "10px 12px", fontSize: "14px", color: "#fff", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", outline: "none", boxSizing: "border-box" }}
                      onFocus={(e) => (e.target.style.borderColor = C.salmon)}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  {recoveryStatus === "notfound" && <p style={{ fontSize: "12px", color: "#f87171" }}>E-mail não encontrado. Verifique ou faça um novo cadastro.</p>}
                  {recoveryStatus === "error"    && <p style={{ fontSize: "12px", color: "#f87171" }}>Algo deu errado. Tente novamente.</p>}
                  <button
                    type="submit" disabled={recoveryStatus === "loading"}
                    style={{ padding: "12px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: C.salmon, color: C.black, border: "none", cursor: "pointer", opacity: recoveryStatus === "loading" ? 0.5 : 1 }}
                  >
                    {recoveryStatus === "loading" ? "Buscando…" : "Restaurar acesso →"}
                  </button>
                </form>
              </>

            ) : (
              <>
                {/* Event chip */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", paddingBottom: "20px", borderBottom: `1px solid ${C.darkBorder}` }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.salmon, padding: "3px 8px", border: `1px solid ${C.salmon}` }}>
                    AI Day Caldeira 2026
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(247,248,241,0.3)", letterSpacing: "0.06em" }}>acesso especial</span>
                </div>

                <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>Comece agora, é gratuito</p>
                <p style={{ fontSize: "13px", color: "rgba(247,248,241,0.45)", marginBottom: "20px" }}>
                  Preencha seus dados e acesse o curso na hora.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { key: "name",    label: "Nome completo",          type: "text",  placeholder: "Seu nome" },
                    { key: "email",   label: "E-mail profissional",    type: "email", placeholder: "voce@empresa.com" },
                    { key: "company", label: "Empresa / Organização",  type: "text",  placeholder: "Nome da empresa" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(247,248,241,0.45)", marginBottom: "6px" }}>{label}</label>
                      <input
                        type={type} required placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        style={{ width: "100%", padding: "10px 12px", fontSize: "14px", color: "#fff", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", outline: "none", boxSizing: "border-box" }}
                        onFocus={(e) => (e.target.style.borderColor = C.salmon)}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  ))}

                  <button
                    type="submit" disabled={status === "loading"}
                    style={{ padding: "13px", fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: C.salmon, color: C.black, border: "none", cursor: "pointer", opacity: status === "loading" ? 0.5 : 1, marginTop: "4px" }}
                  >
                    {status === "loading" ? "Enviando…" : "Acessar o curso gratuitamente →"}
                  </button>
                </form>

                <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: `1px solid ${C.darkBorder}`, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    "Acesso imediato após o cadastro",
                    "Sem cartão de crédito",
                    "Sem compromisso — avance no seu ritmo",
                  ].map((item) => (
                    <p key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "rgba(247,248,241,0.35)", margin: 0 }}>
                      <span style={{ color: C.salmon }}>✓</span> {item}
                    </p>
                  ))}
                  <button
                    onClick={() => setMode("recover")}
                    style={{ fontSize: "12px", color: "rgba(247,248,241,0.3)", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, marginTop: "4px" }}
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
      <div style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <p style={{ fontSize: "12px", color: C.muted, margin: 0 }}>
            Uma iniciativa da <strong style={{ color: C.black }}>Alun Business</strong> em parceria com o <strong style={{ color: C.black }}>Instituto Caldeira</strong>
          </p>
          <a href="/privacy" style={{ fontSize: "12px", color: C.muted, textDecoration: "none" }}>
            Política de Privacidade
          </a>
        </div>
      </div>

    </div>
  );
}
