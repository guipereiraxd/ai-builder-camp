import Link from "next/link";
import AppShell from "../components/AppShell";

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color }}>
        {title}
      </p>
      {children}
    </div>
  );
}

export default function RAGPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-5)" }}>
          Fundamentos
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "var(--text-1)" }}>
          O que é RAG — e por que importa para empresas
        </h1>
        <p className="text-sm" style={{ color: "var(--text-5)" }}>
          Retrieval-Augmented Generation — em linguagem de negócios
        </p>
        <div className="mt-6" style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* Intro */}
      <div
        className="mb-10 p-5 rounded-xl"
        style={{ background: "rgba(109,40,217,0.06)", border: "1px solid rgba(109,40,217,0.2)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
          <strong style={{ color: "#a78bfa" }}>RAG</strong> é um sistema que combina três capacidades:
          {" "}<strong style={{ color: "#a78bfa" }}>encontrar</strong> informações relevantes na sua base de dados,
          {" "}<strong style={{ color: "#a78bfa" }}>interpretar e enriquecer</strong> esse contexto e
          {" "}<strong style={{ color: "#a78bfa" }}>gerar</strong> uma resposta completa e precisa.
          É como dar memória e conhecimento específico a um modelo de IA — sem precisar re-treiná-lo.
        </p>
      </div>

      {/* The problem RAG solves */}
      <Section title="O problema que o RAG resolve" color="#a78bfa">
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
          Modelos de linguagem como Claude, ChatGPT e Gemini foram treinados com dados até uma certa data.
          Eles não sabem nada sobre sua empresa, seus produtos, seus processos ou seus clientes.
          Quando você pergunta algo específico, eles inventam — com confiança.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
          RAG resolve isso: em vez de o modelo "lembrar" de uma resposta do treinamento,
          ele <strong style={{ color: "var(--text-1)" }}>busca a resposta nos seus documentos reais</strong> e
          usa esses trechos para gerar uma resposta precisa e fundamentada.
        </p>
      </Section>

      {/* The 3 steps */}
      <Section title="As 3 etapas do RAG" color="#a78bfa">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {[
            {
              n: "1", icon: "🔍", label: "Retrieval", color: "#a78bfa",
              desc: "Busca os trechos mais relevantes na sua base de conhecimento — manuais, FAQs, documentos, histórico de atendimento.",
            },
            {
              n: "2", icon: "⚡", label: "Augmented", color: "#f59e0b",
              desc: "Enriquece o contexto do modelo com as informações recuperadas — o modelo agora tem acesso ao conhecimento real da sua empresa.",
            },
            {
              n: "3", icon: "💬", label: "Generation", color: "#10a37f",
              desc: "Gera uma resposta precisa, baseada nos seus dados reais — com muito menos chance de alucinação.",
            },
          ].map(({ n, icon, label, color, desc }) => (
            <div
              key={n}
              className="p-4 rounded-xl"
              style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: `${color}18`, color }}
                >
                  {n}
                </span>
                <span className="text-lg">{icon}</span>
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-1)" }}>{label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Why use RAG */}
      <Section title="Por que usar RAG?" color="#a78bfa">
        <div className="grid md:grid-cols-2 gap-3">
          {[
            {
              label: "Sem alucinações", color: "#a78bfa",
              desc: "A IA responde com base nos seus documentos, não em suposições. Cada resposta é fundamentada em fontes reais.",
            },
            {
              label: "Conhecimento atualizado", color: "#10a37f",
              desc: "Não depende da data de corte do modelo — usa a sua base atual. Atualizar o conhecimento é só atualizar os arquivos.",
            },
            {
              label: "Especialização", color: "#f59e0b",
              desc: "Transforma um modelo genérico em especialista no seu negócio — produtos, processos, clientes, histórico.",
            },
            {
              label: "Mais barato", color: "#4b6afc",
              desc: "Não precisa re-treinar o modelo — só conectar sua base de dados. O custo é a indexação e as chamadas de API.",
            },
          ].map(({ label, color, desc }) => (
            <div
              key={label}
              className="p-4 rounded-lg"
              style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                <p className="text-sm font-semibold" style={{ color }}>{label}</p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Full flow */}
      <Section title="Fluxo completo" color="#a78bfa">
        <div
          className="p-5 rounded-xl"
          style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}
        >
          <div className="flex flex-wrap items-center gap-2 justify-center">
            {[
              { label: "Seus docs", icon: "📄", color: "var(--text-3)" },
              { label: "→", icon: null, color: "var(--text-5)" },
              { label: "Indexação", icon: null, color: "#a78bfa" },
              { label: "→", icon: null, color: "var(--text-5)" },
              { label: "Busca", icon: null, color: "#a78bfa" },
              { label: "→", icon: null, color: "var(--text-5)" },
              { label: "RAG", icon: null, color: "#a78bfa" },
              { label: "→", icon: null, color: "var(--text-5)" },
              { label: "Modelo", icon: "🤖", color: "var(--text-3)" },
              { label: "→", icon: null, color: "var(--text-5)" },
              { label: "Resposta", icon: "💬", color: "var(--text-3)" },
            ].map(({ label, icon, color }, i) => (
              <span key={i} className="text-sm font-medium" style={{ color }}>
                {icon ? `${icon} ${label}` : label}
              </span>
            ))}
          </div>
        </div>
        <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--text-4)" }}>
          <strong style={{ color: "var(--text-3)" }}>RAG simples</strong> (Missão 4) usa o contexto do modelo diretamente —
          funciona bem para bases de até algumas centenas de páginas.{" "}
          <strong style={{ color: "var(--text-3)" }}>RAG real</strong> (Missão 5) usa um banco vetorial para indexar e buscar
          com precisão — escala para milhares de documentos.
        </p>
      </Section>

      {/* CTAs */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/exercises/m4"
          className="p-5 rounded-xl transition-opacity hover:opacity-80"
          style={{ background: "rgba(109,40,217,0.08)", border: "1px solid rgba(109,40,217,0.2)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#a78bfa" }}>◈ Missão 04</p>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>RAG Simples</p>
          <p className="text-xs" style={{ color: "var(--text-4)" }}>Base de conhecimento em arquivos .md — funciona com qualquer agente. Resultado imediato.</p>
        </Link>
        <Link
          href="/exercises/m5"
          className="p-5 rounded-xl transition-opacity hover:opacity-80"
          style={{ background: "rgba(109,40,217,0.08)", border: "1px solid rgba(109,40,217,0.2)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#a78bfa" }}>◈ Missão 05</p>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>RAG Avançado</p>
          <p className="text-xs" style={{ color: "var(--text-4)" }}>Busca vetorial com OpenAI Assistants — escalável, com citação de fontes. Recomenda M4 antes.</p>
        </Link>
      </div>
    </AppShell>
  );
}
