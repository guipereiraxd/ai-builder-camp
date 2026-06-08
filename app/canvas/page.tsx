import Link from "next/link";
import AppShell from "../components/AppShell";

const LAYERS = [
  {
    label: "Camada 1 — Valor e trabalho real",
    color: "#4b6afc",
    bg: "rgba(75,106,252,0.08)",
    border: "rgba(75,106,252,0.2)",
    fields: [
      {
        n: 1,
        title: "Dor & oportunidade",
        purpose: "Define o motivo real para o agente existir — evita criar agente para uma dor pequena ou mal formulada.",
        questions: [
          "Qual problema, custo, atraso, risco ou fricção queremos resolver?",
          "O que hoje é repetitivo, lento, caro, inconsistente ou impossível de escalar?",
          "Se esse problema desaparecesse amanhã, qual seria o impacto real?",
        ],
      },
      {
        n: 2,
        title: "Usuário e job-to-be-done",
        purpose: "Identifica quem será ajudado e em qual momento do trabalho — o agente existe para alguém, não para a tecnologia.",
        questions: [
          "Quem sofre essa dor? Qual cargo, contexto, nível de expertise?",
          "O que essa pessoa está tentando concluir quando aciona o agente?",
          "Em que ponto do processo ela mais precisa de ajuda?",
        ],
      },
      {
        n: 3,
        title: "Resultado e KPI",
        purpose: "Conecta o agente a valor de negócio mensurável — sem métrica, não tem como saber se funcionou.",
        questions: [
          "Que indicador precisa mudar? Tempo de ciclo, produtividade, receita, qualidade?",
          "Qual é o baseline atual e qual seria o resultado esperado após 30/90 dias?",
          "Como vamos medir satisfação, compliance, risco, retrabalho ou adoção?",
        ],
      },
      {
        n: 4,
        title: "Escopo e fronteiras",
        purpose: "Define o que o agente faz e, principalmente, o que não faz — a fronteira do escopo é onde começam os problemas.",
        questions: [
          "O que está dentro do escopo? O que está explicitamente fora?",
          "Quando o agente deve parar, pedir ajuda, recusar ou escalar para um humano?",
          "Que tipos de input ou situação o agente não deve tentar resolver sozinho?",
        ],
      },
    ],
  },
  {
    label: "Camada 2 — Fluxo, contexto e ação",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.2)",
    fields: [
      {
        n: 5,
        title: "Gatilhos e entradas",
        purpose: "Define quando e como o agente começa a trabalhar — sem gatilho claro, o agente não sabe quando agir.",
        questions: [
          "O gatilho é uma mensagem, e-mail, formulário, ticket, evento em sistema ou rotina recorrente?",
          "Que informação mínima precisa chegar junto para o agente começar com contexto suficiente?",
          "O gatilho é humano (alguém pede) ou automático (sistema dispara)?",
        ],
      },
      {
        n: 6,
        title: "Fluxo humano + agente",
        purpose: "Redesenha o processo em vez de apenas encaixar IA no processo antigo — a maior armadilha é automatizar algo que deveria ser reformulado.",
        questions: [
          "Como o fluxo funciona hoje, passo a passo?",
          "Quais etapas passam para o agente? Quais continuam humanas?",
          "Onde há revisão, aprovação, exceção ou decisão que não pode ser delegada?",
        ],
      },
      {
        n: 7,
        title: "Dados, memória e contexto",
        purpose: "Mapeia o conhecimento necessário para o agente raciocinar bem — agente sem contexto é agente que alucina.",
        questions: [
          "Quais fontes de dados são confiáveis? O que está desatualizado ou incompleto?",
          "O que é sensível e não pode ser exposto ao modelo?",
          "O agente precisa lembrar histórico, políticas, preferências ou estado do processo entre sessões?",
        ],
      },
      {
        n: 8,
        title: "Ferramentas, ações e saída",
        purpose: "Define o que o agente pode consultar, produzir ou executar — a diferença entre um agente útil e um que só fala.",
        questions: [
          "Quais sistemas ele acessa? Pode apenas ler ou também escrever e acionar?",
          "Pode abrir chamado, atualizar CRM, enviar e-mail, gerar relatório, acionar workflow?",
          "Qual é o output final entregue para o usuário ou sistema?",
        ],
      },
    ],
  },
  {
    label: "Camada 3 — Autonomia, confiança e evolução",
    color: "#d1a476",
    bg: "rgba(209,164,118,0.08)",
    border: "rgba(209,164,118,0.2)",
    fields: [
      {
        n: 9,
        title: "Autonomia e handoffs",
        purpose: "Define o nível de delegação seguro para o momento atual — autonomia demais cedo gera erros; autonomia de menos elimina o valor.",
        questions: [
          "O agente apenas sugere? Prepara e pede aprovação? Executa sozinho em casos simples?",
          "Em quais situações o controle volta para o humano imediatamente?",
          "Qual é o nível de autonomia inicial e como ele evolui conforme o agente prova valor?",
        ],
      },
      {
        n: 10,
        title: "Riscos e guardrails",
        purpose: "Antecipa falhas técnicas, operacionais e reputacionais — um agente sem guardrails é um agente esperando para causar um problema.",
        questions: [
          "Quais riscos de erro, alucinação, vazamento ou ação indevida existem?",
          "O que acontece se o agente receber dados maliciosos (prompt injection)?",
          "Que bloqueios, limites e validações precisam existir antes de qualquer ação irreversível?",
        ],
      },
      {
        n: 11,
        title: "Avaliação e telemetria",
        purpose: "Define como saber se o agente funciona de verdade — sem métricas, não há como distinguir agente bom de agente confiante e errado.",
        questions: [
          "Quais cenários de teste cobrem os casos mais comuns e os mais críticos?",
          "O que será medido: acurácia, adoção, tempo salvo, falhas, escalations, retrabalho?",
          "Como os logs e o histórico de uso entram na melhoria contínua?",
        ],
      },
      {
        n: 12,
        title: "MVP e evolução",
        purpose: "Transforma a ideia em experimento mínimo e governável — o melhor agente é o que entrega valor rápido e tem dono claro.",
        questions: [
          "Qual piloto mínimo pode provar valor em 2 semanas?",
          "Quem é o dono do agente? Quem aprova mudanças? Qual é o ciclo de revisão?",
          "O que precisa acontecer para escalar do piloto para produção?",
        ],
      },
    ],
  },
];

const AUTONOMY = [
  { level: "A0", name: "Assistente",                color: "#64748b", desc: "Ajuda a pensar, resumir, redigir ou analisar. Não executa nenhuma ação em sistemas externos." },
  { level: "A1", name: "Copiloto",                  color: "#4b6afc", desc: "Recomenda próximos passos e prepara artefatos prontos para usar. O humano decide e executa." },
  { level: "A2", name: "Executor com aprovação",    color: "#8b5cf6", desc: "Executa ações depois de validação humana explícita ou dentro de regras pré-aprovadas e claras." },
  { level: "A3", name: "Executor supervisionado",   color: "#d1a476", desc: "Age sozinho em casos de baixo risco e escala automaticamente quando encontra exceções." },
  { level: "A4", name: "Orquestrador",              color: "#ef4444", desc: "Coordena múltiplos agentes, ferramentas e fluxos com monitoramento contínuo e auditoria." },
];

export default function CanvasPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-5)" }}>
          Fundamentos
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text-1)" }}>
          Canvas de Agente de IA
        </h1>
        <p className="text-sm mb-1" style={{ color: "var(--text-5)" }}>
          Do problema de negócio ao fluxo de trabalho humano + máquina
        </p>
        <div className="mt-6" style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* Oportunidades callout */}
      <div
        className="mb-8 p-4 rounded-lg flex items-start gap-3"
        style={{ background: "rgba(75,106,252,0.06)", border: "1px solid rgba(75,106,252,0.15)" }}
      >
        <span className="text-base shrink-0">🎯</span>
        <div>
          <p className="text-sm font-semibold mb-0.5" style={{ color: "#8ba3ff" }}>Ainda não sabe qual oportunidade priorizar?</p>
          <p className="text-xs leading-relaxed mb-1.5" style={{ color: "var(--text-3)" }}>
            Antes de preencher o Canvas, use o guia de diagnóstico para identificar as 3 melhores oportunidades de IA no seu time.
          </p>
          <Link href="/oportunidades" className="text-xs font-medium" style={{ color: "#4b6afc" }}>
            Como identificar 3 oportunidades de IA →
          </Link>
        </div>
      </div>

      {/* Intro */}
      <div className="mb-10 space-y-4 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
        <p>
          Um agente não é um chatbot sofisticado. É um sistema que planeja, age, observa resultados
          e decide o próximo passo — repetindo esse ciclo até completar um trabalho de múltiplas etapas.
        </p>
        <p>
          A distinção que mais importa na prática: um <strong style={{ color: "var(--text-1)" }}>workflow agentic</strong>{" "}
          segue caminhos pré-definidos — você decide o processo, o agente executa. Um{" "}
          <strong style={{ color: "var(--text-1)" }}>agente autônomo</strong> decide o processo por conta própria.
          A recomendação é sempre começar pelo arranjo mais simples e só aumentar a autonomia quando houver ganho demonstrável.
        </p>
        <p>
          O Canvas abaixo cobre as <strong style={{ color: "var(--text-1)" }}>12 decisões</strong> que separam um agente
          que funciona de um que parece funcionar mas cria problemas. Use-o antes de escrever o primeiro prompt —
          ou antes de contratar o primeiro desenvolvedor.
        </p>
        <div
          className="p-4 rounded-lg"
          style={{ background: "rgba(75,106,252,0.06)", border: "1px solid rgba(75,106,252,0.15)" }}
        >
          <p style={{ color: "#8ba3ff" }}>
            <strong>Antes de perguntar "qual agente vamos criar?"</strong>, pergunte:{" "}
            <em>que trabalho precisa mudar, onde a IA entra, o que ela pode decidir, o que ela pode executar
            e onde o humano continua indispensável?</em>
          </p>
        </div>
      </div>

      {/* Layers and Fields */}
      {LAYERS.map((layer) => (
        <div key={layer.label} className="mb-12">
          {/* Layer header */}
          <div
            className="flex items-center gap-3 mb-6 px-4 py-3 rounded-lg"
            style={{ background: layer.bg, border: `1px solid ${layer.border}` }}
          >
            <div className="w-3 h-3 rounded-full shrink-0" style={{ background: layer.color }} />
            <p className="text-sm font-semibold" style={{ color: layer.color }}>{layer.label}</p>
          </div>

          {/* Fields grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {layer.fields.map((field) => (
              <div
                key={field.n}
                className="p-5 rounded-xl"
                style={{ background: "var(--tint-2)", border: `1px solid var(--border)` }}
              >
                {/* Field number + title */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: layer.bg, color: layer.color, border: `1px solid ${layer.border}` }}
                  >
                    {field.n}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{field.title}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-4)" }}>{field.purpose}</p>
                  </div>
                </div>

                {/* Questions */}
                <div className="space-y-2 ml-10">
                  {field.questions.map((q, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-xs mt-0.5 shrink-0" style={{ color: layer.color }}>→</span>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Autonomy ruler */}
      <div className="mb-10">
        <h2 className="text-base font-semibold mb-2" style={{ color: "var(--text-1)" }}>Régua de autonomia</h2>
        <p className="text-sm mb-5" style={{ color: "var(--text-4)" }}>
          Para ambientes corporativos, o caminho recomendado é provar valor em{" "}
          <strong style={{ color: "var(--text-2)" }}>A1 ou A2</strong> — com telemetria, aprovação humana e critérios
          claros de expansão — antes de avançar para níveis maiores de autonomia.
        </p>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {AUTONOMY.map((a, i) => (
            <div
              key={a.level}
              className="flex items-start gap-4 p-4"
              style={{
                borderBottom: i < AUTONOMY.length - 1 ? "1px solid var(--border)" : "none",
                background: i % 2 === 0 ? "var(--tint-2)" : "transparent",
              }}
            >
              <div
                className="text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5"
                style={{ background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}30` }}
              >
                {a.level}
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-1)" }}>{a.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="p-5 rounded-xl"
        style={{ border: "1px solid rgba(75,106,252,0.2)", background: "rgba(75,106,252,0.05)" }}
      >
        <p className="text-sm font-semibold mb-1" style={{ color: "#8ba3ff" }}>Pronto para construir?</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-3)" }}>
          Use este canvas como referência antes de começar o Ato II. O exercício 3 — Agente de monitoramento
          de mercado — é um bom primeiro teste para aplicar os campos 1 a 8.
        </p>
        <Link
          href="/exercises/3"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: "rgba(75,106,252,0.15)", color: "#8ba3ff", border: "1px solid rgba(75,106,252,0.25)" }}
        >
          Ir para o exercício 3 →
        </Link>
      </div>
    </AppShell>
  );
}
