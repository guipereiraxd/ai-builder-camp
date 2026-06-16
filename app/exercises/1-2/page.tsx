// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, AgentCommand, OSTabs, ExerciseHeader, ExerciseStart, LLMTabs, ContextFileName, CompletedButton } from "../../components/ExerciseComponents";

export default function Exercise12() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato I — Entenda o poder dos Agentes"
        number="1.2"
        title="Com contexto da sua empresa"
        duration="20 min"
        description="Um agente sem contexto é genérico. Um agente com contexto é seu. Neste exercício você vai criar o arquivo de contexto do agente — a memória permanente — e ver como isso transforma completamente a qualidade das respostas."
      />

      <ExerciseStart folder="ex-1-2" />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O conceito central</p>
        <LLMTabs
          claude={<p className="text-sm text-white/70 leading-relaxed">O <code>CLAUDE.md</code> é um arquivo de texto que o Claude Code lê automaticamente ao ser iniciado em uma pasta. Tudo que você colocar lá — tom de voz, regras, contexto da empresa — fica disponível para o agente em todas as conversas daquela pasta. É como briefar um funcionário novo uma única vez.</p>}
          openai={<p className="text-sm text-white/70 leading-relaxed">O <code>AGENTS.md</code> é o arquivo de contexto do OpenAI Codex CLI. Ele funciona da mesma forma: coloque ali o tom de voz, regras e contexto da empresa e o agente vai ler tudo automaticamente ao ser iniciado na pasta. É como briefar um funcionário novo uma única vez.</p>}
          gemini={<p className="text-sm text-white/70 leading-relaxed">O <code>GEMINI.md</code> é o arquivo de contexto do Gemini CLI. Ele funciona da mesma forma: coloque ali o tom de voz, regras e contexto da empresa e o agente vai ler tudo automaticamente ao ser iniciado na pasta. É como briefar um funcionário novo uma única vez.</p>}
        />
      </div>

      {/* Markdown explainer */}
      <details className="mb-8 group">
        <summary className="cursor-pointer list-none flex items-center justify-between p-4 rounded-lg border border-white/8 bg-white/3 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>Leitura complementar</span>
            <span className="text-sm font-semibold text-white">Por que usamos arquivos <code>.md</code>? Como ler e escrever Markdown</span>
          </div>
          <span className="text-white/30 text-xs group-open:hidden">▼ expandir</span>
          <span className="text-white/30 text-xs hidden group-open:inline">▲ recolher</span>
        </summary>

        <div className="mt-3 rounded-lg border border-white/8 overflow-hidden">

          {/* Intro */}
          <div className="p-5 border-b border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
            <p className="text-sm text-white/70 leading-relaxed mb-3">
              Os arquivos <code>.md</code> funcionam como uma <strong className="text-white/90">ponte universal entre a linguagem humana e os sistemas de computação</strong>.
              Eles estruturam textos simples para que qualquer plataforma — incluindo IAs — entenda a hierarquia e o propósito de cada frase, sem a poluição visual de formatos complexos.
            </p>
            <p className="text-sm text-white/60 leading-relaxed mb-3">
              Pense no <code>.md</code> como um <strong className="text-white/80">contrato de comunicação clara</strong> com a IA. Quando você envia texto comum, ela precisa adivinhar o que é título, lista ou instrução. Com Markdown, você elimina a ambiguidade:
            </p>
            <ul className="space-y-1.5 text-sm text-white/60">
              <li className="flex gap-2"><span style={{ color: "#4b6afc" }}>✓</span> <span><strong className="text-white/80">Fim da ambiguidade:</strong> a IA não confunde lista com parágrafo corrido.</span></li>
              <li className="flex gap-2"><span style={{ color: "#4b6afc" }}>✓</span> <span><strong className="text-white/80">Economia de tokens:</strong> diferente de <code>.docx</code> ou <code>.pdf</code> (cheios de metadados invisíveis), o <code>.md</code> entrega só o conteúdo puro — respostas mais rápidas e precisas.</span></li>
              <li className="flex gap-2"><span style={{ color: "#4b6afc" }}>✓</span> <span><strong className="text-white/80">Portabilidade total:</strong> abre igual no Bloco de Notas, no GitHub, no Notion ou em qualquer API de IA.</span></li>
            </ul>
          </div>

          {/* Syntax guide */}
          <div className="p-5 space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-4)" }}>Guia de sintaxe — os formatos que você vai usar</p>

            {/* 1. Títulos */}
            <div>
              <p className="text-sm font-semibold text-white mb-2">1. Títulos e hierarquia</p>
              <p className="text-xs text-white/50 mb-2">Use <code>#</code> seguido de espaço. Mais hashtags = título menor.</p>
              <pre className="text-xs"><code>{`# Título Principal (H1 — tema geral)
## Subtítulo (H2 — seções)
### Tópico Específico (H3 — subseções)`}</code></pre>
            </div>

            {/* 2. Ênfase */}
            <div>
              <p className="text-sm font-semibold text-white mb-2">2. Ênfase no texto</p>
              <p className="text-xs text-white/50 mb-2">Destaque termos importantes sem precisar de barra de ferramentas.</p>
              <pre className="text-xs"><code>{`*itálico*
**negrito**
***negrito e itálico***
~~riscado~~`}</code></pre>
            </div>

            {/* 3. Listas */}
            <div>
              <p className="text-sm font-semibold text-white mb-2">3. Listas</p>
              <p className="text-xs text-white/50 mb-2">Ideal para passar instruções passo a passo ou listar requisitos para a IA.</p>
              <pre className="text-xs"><code>{`# Lista não ordenada
* Item A
* Item B

# Lista ordenada
1. Primeiro passo
2. Segundo passo`}</code></pre>
            </div>

            {/* 4. Blocos de código */}
            <div>
              <p className="text-sm font-semibold text-white mb-2">4. Blocos de código</p>
              <p className="text-xs text-white/50 mb-2">Essencial para isolar prompts ou instruções operacionais do resto do texto. Use três crases.</p>
              <pre className="text-xs"><code>{`\`\`\`python
# A IA entenderá estritamente como código executável
print("Olá, Mundo!")
\`\`\``}</code></pre>
            </div>

            {/* 5. Links */}
            <div>
              <p className="text-sm font-semibold text-white mb-2">5. Links e imagens</p>
              <pre className="text-xs"><code>{`[Texto do link](https://exemplo.com)
![Texto alternativo](imagem.jpg)`}</code></pre>
            </div>

            {/* 6. Citações */}
            <div>
              <p className="text-sm font-semibold text-white mb-2">6. Citações (blockquotes)</p>
              <p className="text-xs text-white/50 mb-2">Use para destacar avisos, regras ou instruções que a IA não deve ignorar.</p>
              <pre className="text-xs"><code>{`> **Regra do contrato:** a IA nunca deve alterar os dados históricos desta seção.`}</code></pre>
            </div>

          </div>
        </div>
      </details>

      <Step n={1} title="Crie o arquivo de contexto">
        <p>Na pasta que você já abriu acima, crie o arquivo <ContextFileName />.
        Use o template abaixo como ponto de partida — e customize com informações reais da sua empresa:</p>
        <Prompt>{`# Contexto da Empresa

## Sobre a empresa
Nome: [Nome da sua empresa]
Segmento: [Ex: Software B2B para RH / Consultoria financeira / E-commerce de moda]
Tamanho: [Ex: 80 pessoas, sendo 20 em tecnologia]
Estágio: [Ex: Série A / Bootstrapped / Empresa estabelecida há 15 anos]

## Tom de voz e comunicação
- Comunicação direta e sem rodeios
- Usamos "você" (não "tu" ou "senhor/senhora")
- Evitamos jargão técnico com clientes não-técnicos
- Relatórios internos são objetivos: problema → dado → decisão recomendada
- E-mails externos são profissionais mas humanos, sem floreios

## Nosso cliente ideal
[Descreva em 2-3 linhas quem é seu cliente: cargo, tamanho de empresa, principais dores]

## Produtos/Serviços principais
- [Produto 1]: [O que resolve]
- [Produto 2]: [O que resolve]

## Regras importantes
- Nunca mencionar concorrentes pelo nome em comunicações externas
- Dados financeiros internos são confidenciais — não incluir em outputs públicos
- Sempre incluir próximos passos claros em qualquer documento

## Contexto atual (Q3 2025)
- Foco principal: [Ex: Expansão para mercado enterprise]
- Meta do trimestre: [Ex: 30 novos clientes mid-market]
- Desafio principal: [Ex: Ciclo de vendas longo, média 45 dias]`}</Prompt>
        <Tip>
          Quanto mais específico você for, melhor. O agente usa esse contexto para
          calibrar o tom, a profundidade e o foco de tudo que produz.
        </Tip>
      </Step>

      <Step n={2} title="Abra o agente na pasta">
        <AgentCommand />
        <p className="mt-3">
          O agente vai ler o <ContextFileName /> automaticamente.
          Para confirmar, pergunte:
        </p>
        <Prompt>{`O que você sabe sobre nossa empresa?`}</Prompt>
        <p className="mt-2">
          O agente deve responder com o que está no arquivo — mostrando que absorveu o contexto.
        </p>
      </Step>

      <Step n={3} title="Veja a diferença na prática">
        <p>
          Agora peça a mesma tarefa do exercício anterior, mas sem dar nenhum detalhe extra:
        </p>
        <Prompt>{`Crie um template de ata de reunião para nossas reuniões internas de time.`}</Prompt>
        <p className="mt-3">
          Compare com o resultado do exercício 1.1. Desta vez o agente vai usar o tom de voz
          correto, o formato que faz sentido para o seu contexto, e detalhes específicos
          da sua operação — sem você precisar explicar nada.
        </p>
      </Step>

      <Step n={4} title="Adicione uma instrução de comportamento">
        <p>
          Além de contexto sobre a empresa, o arquivo <ContextFileName /> pode conter regras
          de comportamento do agente. Adicione ao final do arquivo:
        </p>
        <Prompt>{`## Instruções para o agente

Ao receber qualquer pedido:
1. Se o pedido for ambíguo, pergunte UMA clarificação antes de começar
2. Sempre entregue uma versão "pronta para usar", não um rascunho para editar
3. Ao final de cada tarefa, sugira uma próxima ação relacionada
4. Se detectar que estou pedindo algo que pode ser automatizado, me avise`}</Prompt>
        <p className="mt-3">
          Salve o arquivo e reinicie o agente (<code>Ctrl+C</code> e depois <AgentCommand /> novamente).
          Agora teste um pedido ambíguo:
        </p>
        <Prompt>{`Preciso de um relatório sobre nossa performance.`}</Prompt>
        <p className="mt-2">
          O agente deve pedir uma clarificação antes de sair fazendo — porque você instruiu isso.
        </p>
        <Warning>
          O arquivo de contexto é lido por qualquer pessoa que abrir o agente nessa pasta.
          Não inclua senhas, chaves de API ou dados confidenciais nele.
        </Warning>
      </Step>

      <Step n={5} title="Refine o arquivo de contexto do seu projeto real">
        <p>
          Este é o exercício mais importante do Ato I. Reserve 5 minutos para refinar
          seu arquivo de contexto com informações reais. Quanto mais você investir aqui, mais
          úteis serão todos os próximos exercícios.
        </p>
        <Prompt>{`Revise o meu arquivo de contexto e me faça 5 perguntas para torná-lo mais útil para um assistente de IA executivo.`}</Prompt>
      </Step>

      <div className="mt-6 p-5 rounded-xl border border-white/10 bg-white/3">
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm text-white/50 leading-relaxed">
          O arquivo de contexto transforma um assistente genérico em um colaborador que entende
          o seu negócio. Nos próximos exercícios, vamos continuar usando esse contexto
          para produzir outputs cada vez mais específicos e úteis.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex justify-between">
        <Link
          href="/exercises/1-1"
          className="inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors"
        >
          ← 1.1
        </Link>
        <Link
          href="/exercises/2-1"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}
        >
          Próximo: 2.1 Análise de concorrentes →
        </Link>
      </div>
    </AppShell>
  );
}
