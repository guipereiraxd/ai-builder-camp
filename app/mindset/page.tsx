import Link from "next/link";
import AppShell from "../components/AppShell";

const principles = [
  {
    n: "01",
    title: "Defina o problema antes da solução",
    body: `A maior causa de desperdício em projetos de IA é construir algo bem-feito para o problema errado. A pergunta certa não é "o que vou automatizar?" — é "que trabalho precisa mudar e por quê?"`,
    callout: {
      text: "Antes de construir qualquer agente, use o Canvas de Agente de IA para estruturar as 12 decisões que separam um agente que funciona de um que cria problemas.",
      link: "/canvas",
      label: "Ver Canvas de Agente de IA →",
    },
  },
  {
    n: "02",
    title: "Comece pelo menor escopo possível",
    body: `MVP não é sobre ser rápido — é sobre aprender rápido. O primeiro agente deve fazer uma coisa só, e bem. Expansão vem depois de validação. Um agente que responde e-mails de suporte é mais valioso do que um que "faz tudo" e nada direito.`,
  },
  {
    n: "03",
    title: "Teste antes de confiar",
    body: `Nunca coloque um agente em produção sem testá-lo com dados reais e casos extremos primeiro. "Funcionou no meu exemplo" não é o mesmo que "funciona". Crie um ambiente de teste, simule erros, tente quebrar antes que usuários reais quebrem.`,
  },
  {
    n: "04",
    title: "Mantenha humanos onde importa",
    body: `Automação deve amplificar julgamento humano, não substituí-lo em decisões de alto impacto. Um checkpoint explícito — "aguarde aprovação antes de executar" — não é fraqueza, é design correto. Saber onde colocar esse freio é uma das habilidades mais valiosas de quem constrói com IA.`,
  },
  {
    n: "05",
    title: "Segurança não é detalhe",
    body: `API keys, dados de clientes, acesso a sistemas — essas decisões moldam o que você pode construir sem criar risco. Tratar segurança como "resolve depois" é o caminho mais curto para um incidente. Ela precisa entrar no design desde o início.`,
    callout: {
      text: "A Secret Zone do curso tem os 8 tópicos essenciais de segurança para quem constrói com IA.",
      link: "/secret-zone",
      label: "Ver Secret Zone →",
    },
  },
  {
    n: "06",
    title: "Itere com feedback real",
    body: "Sua primeira versão vai estar errada em alguma coisa. O objetivo não é acertar de primeira — é aprender depressa o suficiente para corrigir. Ship, observe, melhore. Repita. Esse ciclo é mais valioso do que qualquer planejamento perfeito.",
  },
  {
    n: "07",
    title: "Documente enquanto constrói",
    body: `Não para o processo — para você mesmo daqui a três meses, e para o colega que vai precisar entender o que você fez. Um parágrafo de "por que fiz assim" vale mais do que dez de "como funciona". Conhecimento que só existe na sua cabeça não é um ativo — é um risco.`,
  },
];

export default function MindsetPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-5)" }}>
          Fundamentos
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-1)" }}>
          Product Thinking
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-5)" }}>
          7 princípios para construir com IA de forma responsável e eficaz
        </p>
        <div className="mt-6" style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* Flexport callout */}
      <div
        className="mb-10 p-5 rounded-xl"
        style={{ border: "1px solid rgba(75,106,252,0.2)", background: "rgba(75,106,252,0.05)" }}
      >
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-2)" }}>
          <em>"Treinamos pessoas de operações, RH e jurídico para criar automações — não ensinando código,
          mas ensinando a pensar como engenheiros de produto: testar o próprio trabalho, manter humanos
          no loop e tratar segurança como requisito, não como detalhe."</em>
        </p>
        <p className="text-xs" style={{ color: "var(--text-4)" }}>— Flexport, sobre seu programa interno de upskilling em IA</p>
      </div>

      <p className="text-sm leading-relaxed mb-10" style={{ color: "var(--text-3)" }}>
        Essa é a virada. Você não precisa aprender a programar para construir com IA.
        Você precisa aprender a pensar como alguém que constrói produtos —
        e os princípios são os mesmos, independente da ferramenta.
      </p>

      {/* Principles */}
      <div className="space-y-8">
        {principles.map(({ n, title, body, callout }) => (
          <div key={n} className="flex gap-5">
            {/* Number */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
              style={{ background: "rgba(75,106,252,0.1)", color: "#4b6afc", border: "1px solid rgba(75,106,252,0.15)" }}
            >
              {n}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-base font-semibold mb-2" style={{ color: "var(--text-1)" }}>
                {title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                {body}
              </p>
              {callout && (
                <div
                  className="mt-3 p-3 rounded-lg flex items-start gap-3"
                  style={{ background: "var(--tint-3)", border: "1px solid var(--border)" }}
                >
                  <span className="text-xs shrink-0 mt-0.5" style={{ color: "#4b6afc" }}>◈</span>
                  <div>
                    <p className="text-xs leading-relaxed mb-1" style={{ color: "var(--text-3)" }}>
                      {callout.text}
                    </p>
                    <Link
                      href={callout.link}
                      className="text-xs font-medium transition-opacity hover:opacity-80"
                      style={{ color: "#4b6afc" }}
                    >
                      {callout.label}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Closing */}
      <div
        className="mt-12 p-5 rounded-xl"
        style={{ border: "1px solid rgba(75,106,252,0.15)", background: "rgba(75,106,252,0.04)" }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Esses princípios não são regras — são lentes. Você vai usá-los sem perceber
          enquanto progride pelos exercícios do curso. Quando algo não funcionar como esperado,
          volte aqui. A resposta geralmente está num destes sete.
        </p>
      </div>
    </AppShell>
  );
}
