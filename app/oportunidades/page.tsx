import Link from "next/link";
import AppShell from "../components/AppShell";

const criteria = [
  { label: "Frequência", desc: "Acontece toda semana ou todo dia?", weight: "Alto" },
  { label: "Impacto", desc: "Afeta diretamente resultado ou cliente?", weight: "Alto" },
  { label: "Viabilidade", desc: "Tem dados e contexto suficientes para um agente trabalhar?", weight: "Médio" },
  { label: "Autonomia", desc: "Você controla o processo — não depende de outro sistema ou equipe?", weight: "Médio" },
];

export default function OportunidadesPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-5)" }}>
          Fundamentos
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-1)" }}>
          Como identificar 3 oportunidades de IA no seu time
        </h1>
        <p className="text-sm" style={{ color: "var(--text-5)" }}>
          O diagnóstico que vem antes de qualquer ferramenta ou exercício
        </p>
        <div className="mt-6" style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* Intro */}
      <div className="mb-10 space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
        <p>
          A maioria das empresas não falta tecnologia — falta diagnóstico.
          Antes de perguntar <em>"qual agente vou criar?"</em>, a pergunta certa é:{" "}
          <strong style={{ color: "var(--text-1)" }}>onde o meu time perde tempo, energia ou qualidade repetidamente?</strong>
        </p>
        <p>
          Este guia te ajuda a encontrar 3 oportunidades reais — não teóricas — antes de tocar em qualquer ferramenta.
          No final, você vai para o{" "}
          <Link href="/canvas" style={{ color: "#4b6afc" }}>Canvas de Agente de IA</Link>{" "}
          com material concreto para estruturar cada uma.
        </p>
      </div>

      {/* Method 1 */}
      <div className="mb-10">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "rgba(75,106,252,0.12)", color: "#4b6afc", border: "1px solid rgba(75,106,252,0.2)" }}>
            1
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>O inventário de dores</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>Individual · 15 minutos por pessoa</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
          Pergunte a cada membro do time — incluindo você mesmo. As respostas mais honestas geralmente vêm das pessoas
          que executam os processos, não de quem os desenhou.
        </p>
        <div className="space-y-2">
          {[
            "O que você faz toda semana que parece desnecessariamente manual?",
            "Onde você copia informação de um lugar para outro sem agregar valor nenhum?",
            "O que você deixa de fazer por falta de tempo, mas sabe que geraria resultado se fosse feito?",
            "Em que tarefa você sente que um resultado consistente depende demais de quem está fazendo?",
          ].map((q, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-lg" style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}>
              <span className="text-xs shrink-0 mt-0.5 font-bold" style={{ color: "#4b6afc" }}>→</span>
              <p className="text-sm" style={{ color: "var(--text-2)" }}>{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Method 2 */}
      <div className="mb-10">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "rgba(75,106,252,0.12)", color: "#4b6afc", border: "1px solid rgba(75,106,252,0.2)" }}>
            2
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>O mapeamento de fluxo</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>Por processo · 30 minutos</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
          Escolha 2 ou 3 processos-chave do time. Para cada um, mapeie:
        </p>
        <div className="mb-4 p-4 rounded-xl flex items-center justify-center gap-3 flex-wrap" style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}>
          {["Entrada", "Processamento", "Saída"].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="text-sm font-semibold px-3 py-1.5 rounded-lg" style={{ background: "rgba(75,106,252,0.1)", color: "#4b6afc" }}>{step}</span>
              {i < 2 && <span style={{ color: "var(--text-5)" }}>→</span>}
            </div>
          ))}
        </div>
        <p className="text-sm mb-3" style={{ color: "var(--text-3)" }}>Para cada etapa, pergunte:</p>
        <div className="space-y-2">
          {[
            "Onde um humano agrega menos valor relativo neste fluxo?",
            "Onde a qualidade varia mais dependendo de quem executa?",
            "Qual etapa poderia ser executada com mais velocidade sem perda de qualidade?",
            "Onde a informação fica presa esperando alguém processar manualmente?",
          ].map((q, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-lg" style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}>
              <span className="text-xs shrink-0 mt-0.5 font-bold" style={{ color: "#4b6afc" }}>→</span>
              <p className="text-sm" style={{ color: "var(--text-2)" }}>{q}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Method 3 */}
      <div className="mb-10">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "rgba(75,106,252,0.12)", color: "#4b6afc", border: "1px solid rgba(75,106,252,0.2)" }}>
            3
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>A entrevista de 5 minutos</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>Diagnóstico rápido · Uma conversa por área</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
          Três perguntas. Cinco minutos. Faça com cada líder de área. As respostas revelam
          o que os processos documentados escondem.
        </p>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { n: "1", q: "O que é repetitivo?", desc: "Tarefas que qualquer pessoa do time poderia executar no piloto automático." },
            { n: "2", q: "O que demora mais do que deveria?", desc: "Processos onde o tempo investido é desproporcional ao valor gerado." },
            { n: "3", q: "O que só uma pessoa sabe fazer?", desc: "Conhecimento que seria um problema se quem o tem saísse amanhã." },
          ].map(({ n, q, desc }) => (
            <div key={n} className="p-4 rounded-xl" style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{n}</span>
                <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{q}</p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-4)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prioritization criteria */}
      <div className="mb-10">
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text-1)" }}>
          Como escolher as 3 melhores oportunidades
        </h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-3)" }}>
          Depois dos 3 métodos, você provavelmente terá 10 ou 15 ideias. Use esses critérios para priorizar:
        </p>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-widest px-4 py-2.5" style={{ background: "var(--tint-3)", borderBottom: "1px solid var(--border)", color: "var(--text-5)" }}>
            <div>Critério</div>
            <div>Pergunta-guia</div>
            <div>Peso</div>
          </div>
          {criteria.map(({ label, desc, weight }, i) => (
            <div key={label} className="grid grid-cols-3 px-4 py-3 text-sm" style={{ borderBottom: i < criteria.length - 1 ? "1px solid var(--border)" : "none", background: i % 2 === 0 ? "transparent" : "var(--tint-2)" }}>
              <div className="font-medium" style={{ color: "var(--text-1)" }}>{label}</div>
              <div style={{ color: "var(--text-3)" }}>{desc}</div>
              <div>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{
                  background: weight === "Alto" ? "rgba(75,106,252,0.1)" : "var(--tint-3)",
                  color: weight === "Alto" ? "#4b6afc" : "var(--text-4)"
                }}>
                  {weight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection to Canvas */}
      <div
        className="mb-8 p-5 rounded-xl"
        style={{ border: "1px solid rgba(75,106,252,0.2)", background: "rgba(75,106,252,0.05)" }}
      >
        <p className="text-sm font-semibold mb-2" style={{ color: "#8ba3ff" }}>
          Próximo passo: estruture cada oportunidade com o Canvas
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-3)" }}>
          Para cada uma das 3 oportunidades escolhidas, abra o Canvas de Agente de IA e preencha os 12 campos.
          Comece pelo Campo 1 (Dor & Oportunidade) — você acabou de fazer o trabalho de diagnóstico
          que a maioria das pessoas pula.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/canvas"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "#4b6afc", color: "#ffffff" }}
          >
            Abrir o Canvas de Agente de IA →
          </Link>
          <Link
            href="/exercises"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: "var(--tint-4)", color: "var(--text-3)", border: "1px solid var(--border)" }}
          >
            Ver os exercícios
          </Link>
        </div>
      </div>

      {/* Closing */}
      <div className="p-4 rounded-lg" style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}>
        <p className="text-xs leading-relaxed" style={{ color: "var(--text-4)" }}>
          <strong style={{ color: "var(--text-3)" }}>Regra prática:</strong> uma boa oportunidade de IA é qualquer processo que acontece
          toda semana, segue sempre o mesmo padrão e ocupa tempo de alguém inteligente — tempo que poderia estar
          sendo usado para decisões que realmente exigem julgamento humano.
        </p>
      </div>
    </AppShell>
  );
}
