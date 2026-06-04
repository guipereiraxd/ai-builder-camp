// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, AgentCommand, OSTabs, ExerciseHeader, LLMTabs, CompletedButton } from "../../components/ExerciseComponents";

export default function Mission7() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.3)" }}
        >
          ◈ Missão 07
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Ato IV — Continue Praticando</span>
      </div>

      <ExerciseHeader
        act="Ato IV — Continue Praticando"
        number="M7"
        title="AutoResearch Simples — agente de pesquisa autônoma"
        duration="25 min"
        description="Usando as ferramentas que você já tem no curso, vamos construir um agente que pesquisa, sintetiza e entrega relatórios completos — de forma autônoma, sem você precisar direcionar cada passo."
      />

      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.05)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "#fb923c" }}>O que torna essa abordagem "simples"</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Usamos a capacidade de busca web que o agente já tem — sem instalar nada novo.
          O que muda é o <strong style={{ color: "var(--text-2)" }}>protocolo de pesquisa</strong>: estruturamos os
          prompts para que o agente planeje, busque em múltiplas fontes, sintetize e entregue
          com o rigor de um pesquisador profissional. Funciona com Claude, OpenAI e Gemini.
        </p>
      </div>

      <Step n={1} title="Prepare o ambiente">
        <p>Certifique-se de que o agente tem acesso à web. Verifique o que foi configurado no Ato III:</p>
        <LLMTabs
          claude={
            <>
              <p>O Claude precisa do MCP do Brave Search configurado (exercício 6). Se já configurou, abra o agente:</p>
              <OSTabs
                mac="mkdir ~/ai-builder-camp/missao-7 && cd ~/ai-builder-camp/missao-7"
                windows="mkdir $HOME\ai-builder-camp\missao-7; cd $HOME\ai-builder-camp\missao-7"
              />
              <AgentCommand />
              <Prompt>{`Quais ferramentas de busca você tem disponíveis? Confirme que consegue pesquisar na web.`}</Prompt>
            </>
          }
          openai={
            <>
              <p>O Codex usa a busca web nativa da OpenAI — sem configuração adicional.</p>
              <OSTabs
                mac="mkdir ~/ai-builder-camp/missao-7 && cd ~/ai-builder-camp/missao-7"
                windows="mkdir $HOME\ai-builder-camp\missao-7; cd $HOME\ai-builder-camp\missao-7"
              />
              <AgentCommand />
              <Prompt>{`Confirme que você consegue pesquisar na web. Pesquise "últimas notícias sobre IA" e me dê 3 resultados recentes com data.`}</Prompt>
            </>
          }
          gemini={
            <>
              <p>O Gemini tem Google Search integrado — sem configuração adicional.</p>
              <OSTabs
                mac="mkdir ~/ai-builder-camp/missao-7 && cd ~/ai-builder-camp/missao-7"
                windows="mkdir $HOME\ai-builder-camp\missao-7; cd $HOME\ai-builder-camp\missao-7"
              />
              <AgentCommand />
              <Prompt>{`Confirme que você consegue pesquisar na web. Pesquise "últimas notícias sobre IA" e me dê 3 resultados recentes com data.`}</Prompt>
            </>
          }
        />
        <Tip>
          Se o Claude não confirmar acesso à web, volte ao exercício 6 e verifique se o MCP do Brave Search está configurado no <code>settings.json</code>.
        </Tip>
      </Step>

      <Step n={2} title="Execute a primeira pesquisa autônoma">
        <p>Este é o prompt central do AutoResearch Simples. Substitua a pergunta pelo seu tema real:</p>
        <Prompt>{`Você é um pesquisador sênior especializado em análise estratégica. Vou te dar uma pergunta de pesquisa. Conduza uma investigação autônoma seguindo exatamente estas fases:

FASE 1 — PLANEJAMENTO (me informe):
- Decomponha a pergunta em 5-7 sub-tópicos essenciais
- Para cada sub-tópico, identifique o tipo de fonte mais confiável
- Defina o ângulo de análise: dados quantitativos, casos, tendências ou opiniões de especialistas

FASE 2 — PESQUISA AUTÔNOMA (execute sem me interromper):
- Para cada sub-tópico, realize buscas específicas
- Priorize fontes recentes (últimos 12 meses) e de alta credibilidade
- Anote a fonte e data de cada informação relevante encontrada

FASE 3 — SÍNTESE (execute sem me interromper):
- Identifique os consensos entre as fontes
- Marque as divergências ou contradições encontradas
- Aponte as lacunas: o que as fontes não respondem

FASE 4 — RELATÓRIO FINAL:
Produza um relatório estruturado com:
## Executive Summary (5 bullets com os achados mais importantes)
## Análise por Sub-tópico (um bloco para cada tema investigado)
## Conclusões Estratégicas (o que isso significa para quem toma decisões)
## Próximos Passos Sugeridos (3 ações concretas baseadas nos achados)
## Fontes Consultadas (com URL e data)

Salve o relatório em pesquisa-[TEMA]-[DATA].md

---
PERGUNTA DE PESQUISA:
[SUBSTITUA AQUI — exemplos:
- "Qual é o estado atual da adoção de IA em empresas de médio porte no Brasil?"
- "Quais são os modelos de precificação de SaaS B2B mais usados em 2025?"
- "O que as maiores empresas do setor [SEU SETOR] estão fazendo com IA?"]

PROFUNDIDADE: [superficial / médio / profundo]
FOCO: [estratégico / operacional / técnico]`}</Prompt>
        <p className="mt-2">
          O agente vai trabalhar por alguns minutos. Deixe-o terminar todas as fases antes de intervir.
        </p>
      </Step>

      <Step n={3} title="Avalie e refine o relatório">
        <p>Com o relatório gerado, use o agente para aprofundar os pontos mais relevantes:</p>
        <Prompt>{`Leia o relatório que você acabou de gerar e me responda:

1. Qual das seções tem menor qualidade de fontes ou informações mais superficiais?
2. Quais sub-tópicos merecem uma pesquisa mais profunda para o meu contexto?
3. Há alguma perspectiva importante que ficou de fora?

Depois disso, aprofunde a seção mais fraca com uma nova rodada de pesquisas.`}</Prompt>
        <Tip>
          O relatório gerado automaticamente é um ponto de partida. A segunda rodada — pedindo ao agente que critique o próprio trabalho — geralmente entrega os insights mais valiosos.
        </Tip>
      </Step>

      <Step n={4} title="Crie um comando de pesquisa reutilizável">
        <p>Para pesquisas futuras com um único atalho:</p>
        <LLMTabs
          claude={
            <Prompt>{`Crie o arquivo .claude/commands/pesquisar.md com as instruções completas para o comando /pesquisar.

O comando deve executar automaticamente as 4 fases de AutoResearch para qualquer tema que eu fornecer:
planejamento → pesquisa autônoma → síntese → relatório final com fontes.

Adicione no comando: ao terminar, pergunte se devo aprofundar alguma seção específica.`}</Prompt>
          }
          openai={
            <Prompt>{`Adicione ao AGENTS.md uma seção "## AutoResearch" com as instruções completas:

Quando eu disser "pesquisar [tema]", execute automaticamente as 4 fases:
planejamento (5-7 sub-tópicos + fontes) → pesquisa autônoma → síntese → relatório final com fontes.
Salve o resultado com nome e data. Ao terminar, pergunte se preciso aprofundar algum ponto.`}</Prompt>
          }
          gemini={
            <Prompt>{`Adicione ao GEMINI.md uma seção "## AutoResearch" com as instruções completas:

Quando eu disser "pesquisar [tema]", execute automaticamente as 4 fases:
planejamento (5-7 sub-tópicos + fontes) → pesquisa autônoma → síntese → relatório final com fontes.
Salve o resultado com nome e data. Ao terminar, pergunte se preciso aprofundar algum ponto.`}</Prompt>
          }
        />
      </Step>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#fb923c" }}>✓ Missão 07 concluída</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-4)" }}>
          Você tem agora um agente de pesquisa autônoma que funciona com qualquer tema.
          Use para due diligence, análise competitiva, preparação para negociações e pesquisa de mercado.
          O que levaria dias de analista agora leva minutos de agente.
        </p>
        <Link href="/exercises/m8" className="text-sm font-medium" style={{ color: "#fb923c" }}>
          Pronto para o projeto real do Karpathy? Veja a Missão 08 →
        </Link>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/auto-research" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← O que é AutoResearch
        </Link>
        <Link href="/exercises/m8" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#fb923c" }}>
          M8 AutoResearch Karpathy →
        </Link>
      </div>
    </AppShell>
  );
}
