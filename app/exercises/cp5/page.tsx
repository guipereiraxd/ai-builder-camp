// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, ExerciseHeader, CompletedButton } from "../../components/ExerciseComponents";

export default function CopilotCP5() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(0,120,212,0.15)", color: "#0078d4", border: "1px solid rgba(0,120,212,0.3)" }}
        >
          ◈ Copilot CP5
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Trilha Copilot 365</span>
      </div>

      <ExerciseHeader
        act="Trilha Copilot 365"
        number="CP5"
        title="Copilot no Word, Excel e PowerPoint"
        duration="25 min"
        description="O Copilot está integrado em todos os apps do Microsoft 365. Neste exercício você aprende os prompts mais úteis para acelerar sua produção de documentos, análises e apresentações no dia a dia."
      />

      {/* Context */}
      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>Copilot no contexto certo</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Diferente do Copilot Studio (que você configura para o time), os Copilots no Word, Excel e PowerPoint
          são pessoais — cada pessoa usa no seu próprio arquivo, com acesso ao seu contexto do M365.
          O foco aqui é praticidade imediata: prompts que funcionam hoje no seu fluxo de trabalho.
        </p>
      </div>

      {/* Word section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: "rgba(33,115,228,0.15)", color: "#2173e4" }}>W</div>
          <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>Word — Documentos</h2>
        </div>

        <Step n={1} title="Draft de documento do zero">
          <p>
            No Word, clique no ícone do Copilot (ou <strong style={{ color: "var(--text-1)" }}>Home → Copilot</strong>).
            Se o documento estiver em branco, o Copilot abre o modo Draft automaticamente.
          </p>
          <p className="mt-3">Use estes prompts para criar documentos completos em segundos:</p>
          <Prompt>{`Crie uma proposta comercial para [CLIENTE/SETOR] oferecendo [PRODUTO/SERVIÇO].
Inclua: resumo executivo, problema que resolvemos, nossa abordagem, investimento estimado e próximos passos.
Tom: profissional e direto. Extensão: 2 páginas.`}</Prompt>
          <Prompt>{`Escreva um relatório executivo sobre [TEMA] para a liderança da empresa.
Baseie-se nas seguintes informações: [COLE SEUS DADOS/BULLETS AQUI]
Inclua: contexto, situação atual, recomendações e riscos.`}</Prompt>
          <Tip>
            Depois que o Copilot gerar o draft, você pode pedir ajustes diretamente: "Torne o tom mais formal",
            "Reduza para 1 página", "Adicione uma seção sobre riscos". Cada pedido refina o documento em tempo real.
          </Tip>
        </Step>

        <Step n={2} title="Reescrever e melhorar texto existente">
          <p>
            Selecione um trecho do documento, clique no ícone do Copilot que aparece na seleção
            e escolha <strong style={{ color: "var(--text-1)" }}>Rewrite</strong>. Ou use estes prompts específicos:
          </p>
          <Prompt>{`[SELECIONE O TRECHO]
Reescreva este parágrafo de forma mais clara e direta, sem perder as informações principais.`}</Prompt>
          <Prompt>{`[SELECIONE O TRECHO]
Este texto vai para o CEO. Adapte o tom para ser mais executivo, focado em impacto de negócio.`}</Prompt>
          <Prompt>{`Revise o documento inteiro. Identifique: inconsistências de tom, partes confusas e informações que podem ser cortadas sem perda de sentido.`}</Prompt>
        </Step>
      </div>

      {/* Excel section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: "rgba(33,135,80,0.15)", color: "#217346" }}>X</div>
          <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>Excel — Análise de dados</h2>
        </div>

        <Step n={3} title="Analise dados e identifique padrões">
          <p>
            Abra uma planilha com dados (vendas, operações, financeiro). Clique em
            <strong style={{ color: "var(--text-1)" }}> Home → Copilot</strong> para abrir o painel.
          </p>
          <p className="mt-3">O Copilot analisa os dados da planilha ativa. Experimente:</p>
          <Prompt>{`Analise estes dados e me diga:
1. Quais são os 3 principais insights?
2. Há alguma anomalia ou dado fora do padrão?
3. Qual coluna tem maior correlação com [MÉTRICA PRINCIPAL]?`}</Prompt>
          <Prompt>{`Crie um resumo executivo destes dados em 5 bullets — como se fosse para apresentar na reunião de board.`}</Prompt>
          <Prompt>{`Qual fórmula devo usar para calcular [O QUE VOCÊ PRECISA]? Me explique passo a passo e escreva a fórmula pronta para colar na célula.`}</Prompt>
          <Tip>
            O Copilot no Excel pode criar gráficos, aplicar fórmulas e gerar colunas novas —
            tudo com linguagem natural. Se tiver muitas linhas, peça filtros: "Mostre apenas os dados de SP do último trimestre".
          </Tip>
        </Step>

        <Step n={4} title="Crie visualizações com linguagem natural">
          <p>
            Em vez de configurar gráficos manualmente, peça ao Copilot para criá-los:
          </p>
          <Prompt>{`Crie um gráfico de barras comparando [COLUNA A] por [COLUNA B]. Use as cores da empresa se possível.`}</Prompt>
          <Prompt>{`Qual é o melhor tipo de gráfico para visualizar estes dados? Crie ele para mim.`}</Prompt>
          <Prompt>{`Adicione uma coluna nova calculando [O QUE VOCÊ PRECISA] e explique a lógica usada.`}</Prompt>
        </Step>
      </div>

      {/* PowerPoint section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: "rgba(210,54,0,0.15)", color: "#d24726" }}>P</div>
          <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>PowerPoint — Apresentações</h2>
        </div>

        <Step n={5} title="Crie uma apresentação a partir de texto">
          <p>
            Abra o PowerPoint e clique em <strong style={{ color: "var(--text-1)" }}>Home → Copilot → Create presentation from…</strong>.
            Você pode criar a partir de:
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Outline", desc: "Liste os tópicos e o Copilot cria os slides" },
              { label: "Word file", desc: "Cole o link de um documento Word do OneDrive" },
              { label: "Description", desc: "Descreva o que você quer apresentar" },
            ].map(({ label, desc }) => (
              <div key={label} className="p-3 rounded-lg text-center" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
                <p className="text-xs font-bold mb-1" style={{ color: "#d24726" }}>{label}</p>
                <p className="text-xs" style={{ color: "var(--text-4)" }}>{desc}</p>
              </div>
            ))}
          </div>
          <Prompt>{`Crie uma apresentação de 10 slides sobre [TEMA] para [AUDIÊNCIA].
Slide 1: Título e agenda
Slides 2-8: Conteúdo com dados e exemplos
Slide 9: Recomendações
Slide 10: Próximos passos e Q&A`}</Prompt>
          <Tip>
            O Copilot aplica automaticamente o tema da sua empresa se você tiver um template padrão
            configurado no PowerPoint. Para garantir, abra um arquivo com o template antes de pedir ao Copilot.
          </Tip>
        </Step>

        <Step n={6} title="Melhore slides existentes">
          <p>
            Com a apresentação aberta, selecione um slide ou peça melhorias globais:
          </p>
          <Prompt>{`Revise esta apresentação e sugira melhorias nos títulos — eles devem ser afirmações impactantes, não apenas tópicos.`}</Prompt>
          <Prompt>{`O slide [NÚMERO] está muito cheio de texto. Reescreva para ter no máximo 3 bullets com 1 linha cada.`}</Prompt>
          <Prompt>{`Adicione notas de apresentador em cada slide — devem incluir o ponto principal a dizer, dados de apoio e sugestão de transição para o próximo slide.`}</Prompt>
        </Step>
      </div>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>✓ CP5 concluído — Trilha Copilot 365 completa</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-4)" }}>
          Você passou por toda a trilha: criou um agente no Copilot Studio, automatizou reuniões,
          fez pesquisa com web grounding, conectou documentos internos e acelerou sua produção nos apps do Office.
          Use o agente do CP1+CP4 como ponto de partida para expandir para outros times e casos de uso da empresa.
        </p>
        <Link href="/exercises" className="text-sm font-medium" style={{ color: "#0078d4" }}>
          ← Voltar ao índice do curso
        </Link>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/cp4" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← CP4 Base de conhecimento
        </Link>
        <Link href="/exercises" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          Ver todos os exercícios →
        </Link>
      </div>
    </AppShell>
  );
}
