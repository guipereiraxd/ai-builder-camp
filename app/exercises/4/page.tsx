// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Command, OSTabs, ExerciseHeader, AgentCommand, CopyContextFile, CompletedButton } from "../../components/ExerciseComponents";

export default function Exercise4() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato II — Construa o Agente"
        number="4"
        title="Pipeline de conteúdo com revisão humana"
        duration="35 min"
        description="IA sem supervisão humana é arriscado. IA com supervisão humana bem projetada é poderoso. Neste exercício você vai construir um pipeline que gera conteúdo, aguarda sua aprovação, e só então finaliza — com rastreabilidade completa."
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">Human-in-the-loop</p>
        <p className="text-sm text-white/70 leading-relaxed">
          O padrão mais seguro para IA em produção: o agente faz o trabalho pesado,
          mas pontos de decisão críticos passam por você. Você mantém controle sem
          perder o benefício da automação.
        </p>
      </div>

      <Step n={1} title="Defina o pipeline de conteúdo">
        <OSTabs
          mac="mkdir ~/ai-builder-camp/ex-4 && cd ~/ai-builder-camp/ex-4"
          windows="mkdir $HOME\ai-builder-camp\ex-4; cd $HOME\ai-builder-camp\ex-4"
        />
        <CopyContextFile />
        <p className="mt-3">
          Vamos criar um pipeline para o principal canal de conteúdo da maioria das empresas: LinkedIn.
          Crie o arquivo <code>pipeline-config.md</code>:
        </p>
        <Prompt>{`# Configuração do Pipeline de Conteúdo LinkedIn

## Objetivo
Produzir 3 posts por semana no LinkedIn do CEO com qualidade editorial consistente.

## Personas e formatos
Post tipo A — Insight de liderança
- Tom: reflexivo, baseado em experiência real
- Estrutura: hook (1 linha) → problema/observação → insight → chamada para reflexão
- Tamanho: 150-200 palavras
- Não usar listas. Texto corrido.

Post tipo B — Tendência de mercado
- Tom: analítico, baseado em dados
- Estrutura: dado surpreendente → contexto → o que isso muda → implicação para o setor
- Tamanho: 120-180 palavras
- Pode incluir 1 lista com no máximo 4 itens

Post tipo C — Bastidores/cultura
- Tom: humano, vulnerável sem ser piegas
- Estrutura: situação real → o que aprendi → como aplico → convite ao diálogo
- Tamanho: 100-150 palavras
- Terminar sempre com uma pergunta aberta

## Regras absolutas
- Nunca usar: "No mundo acelerado de hoje", "sinergias", "disruptivo", "jornada"
- Nunca abrir com "Eu" como primeira palavra
- Sempre terminar com algo que convide comentários
- Hashtags: máximo 3, no final, relevantes

## Inputs para geração
- Tema da semana: [CEO informa]
- Eventos recentes da empresa: [CEO informa]
- Qual tipo de post para cada dia: [definido no início da semana]`}</Prompt>
      </Step>

      <Step n={2} title="Construa o pipeline com checkpoint de aprovação">
        <AgentCommand />
        <Prompt>{`Vou te dar os inputs da semana. Você vai executar o pipeline de conteúdo em etapas, parando para minha aprovação antes de avançar.

INPUTS DESTA SEMANA:
- Tema: [ESCREVA O TEMA QUE VOCÊ QUER EXPLORAR ESTA SEMANA]
  Exemplo: "O erro que quase nos custou nosso maior cliente"
- Evento recente: [ALGO QUE ACONTECEU NA EMPRESA]
  Exemplo: "Fechamos nossa primeira parceria internacional"
- Posts desta semana: Segunda (Tipo A), Quarta (Tipo B), Sexta (Tipo C)

ETAPA 1 — RASCUNHOS:
Gere os 3 posts seguindo rigorosamente a configuração em pipeline-config.md.
Para cada post, gere 2 versões com abordagens levemente diferentes.

Quando terminar os rascunhos, PARE e aguarde minha avaliação antes de continuar.`}</Prompt>
        <Tip>
          O checkpoint explícito ("PARE e aguarde") é a instrução mais importante do pipeline.
          Ele garante que você tem controle editorial antes do output sair.
        </Tip>
      </Step>

      <Step n={3} title="Revise e forneça feedback estruturado">
        <p>
          Leia os rascunhos e responda com feedback. O agente vai aprender com seu padrão:
        </p>
        <Prompt>{`Avaliei os rascunhos. Meu feedback:

Post Segunda (Tipo A):
- Versão 1: [APROVADO / AJUSTAR: descreva o que mudar]
- Versão 2: [APROVADO / AJUSTAR: descreva o que mudar]
- Prefiro a versão [1 ou 2], mas com estas mudanças: [liste]

Post Quarta (Tipo B):
[mesmo formato]

Post Sexta (Tipo C):
[mesmo formato]

Com base nesse feedback, ajuste os posts aprovados e finalize. Salve a versão final de cada um em:
- posts/segunda-final.md
- posts/quarta-final.md
- posts/sexta-final.md

Depois me mostre os 3 posts finais lado a lado para aprovação final.`}</Prompt>
      </Step>

      <Step n={4} title="Feche o loop: aprenda com a performance">
        <Prompt>{`Agora vamos fechar o loop de aprendizado.

Crie o arquivo feedback-semana.md com:
1. Os 3 posts desta semana (título/tema apenas)
2. Campos para eu preencher: [Engajamento real], [O que funcionou], [O que não funcionou], [Ajuste para próxima semana]

Na próxima semana, vou alimentar esse arquivo antes de gerar novos posts — assim você vai melhorando a calibração ao longo do tempo.

Também atualize o pipeline-config.md com qualquer regra nova que surgiu do meu feedback desta sessão.`}</Prompt>
      </Step>

      <Step n={5} title="Generalize para outros canais">
        <Prompt>{`O pipeline que criamos funciona para LinkedIn, mas o padrão é reutilizável. Crie um documento pipeline-outros-canais.md adaptando o mesmo processo para:

1. Newsletter mensal (500-800 palavras, tom mais aprofundado)
2. Comunicado interno para o time (direto, transparente, sem eufemismos corporativos)
3. Proposta executiva para um prospect (1 página, focada em ROI e risco)

Para cada canal, adapte: tom, formato, regras absolutas, e o que constitui aprovação.`}</Prompt>
      </Step>

      <div className="mt-6 p-5 rounded-xl border border-white/10 bg-white/3">
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm text-white/50 leading-relaxed">
          Você construiu um sistema editorial que escala sem perder qualidade.
          O agente faz o trabalho pesado, você faz o julgamento final.
          Essa divisão de trabalho — IA executa, humano decide — é o padrão
          que define as empresas que vão ganhar com IA. No próximo exercício,
          vamos aprofundar isso com o caso de uso mais sofisticado do Ato II.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/3" className="inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">← 3</Link>
        <Link href="/exercises/5" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Próximo: 5. Research loop →
        </Link>
      </div>
    </AppShell>
  );
}
