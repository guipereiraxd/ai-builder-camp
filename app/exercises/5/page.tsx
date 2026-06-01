import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, Command, OSTabs, ExerciseHeader } from "../../components/ExerciseComponents";

export default function Exercise5() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato II — Construa o Agente"
        number="5"
        title="Research loop para due diligence"
        duration="45 min"
        description="O exercício mais avançado do curso. Você vai construir um agente de research que conduz uma due diligence completa de forma autônoma — o tipo de análise que uma consultoria cobraria R$50.000 para fazer."
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O que é um research loop</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Um research loop é um agente que itera: pesquisa → encontra lacunas → pesquisa mais →
          sintetiza → avalia qualidade → refina. Não é um único prompt. É um processo que continua
          até atingir um padrão de qualidade que você define.
        </p>
      </div>

      <Step n={1} title="Defina o escopo da due diligence">
        <OSTabs
          mac="mkdir ~/ai-builder-camp/ex-5 && cd ~/ai-builder-camp/ex-5"
          windows="mkdir $HOME\ai-builder-camp\ex-5; cd $HOME\ai-builder-camp\ex-5"
        />
        <OSTabs
          mac="cp ~/ai-builder-camp/ex-1-2/CLAUDE.md ."
          windows="copy $HOME\ai-builder-camp\ex-1-2\CLAUDE.md ."
        />
        <p className="mt-3">
          Escolha um alvo para a due diligence. Pode ser:
          um potencial parceiro, um fornecedor crítico, uma empresa para aquisição,
          ou um mercado para expansão. Crie o arquivo <code>alvo-dd.md</code>:
        </p>
        <Prompt>{`# Briefing de Due Diligence

## Alvo
Nome: [EMPRESA / MERCADO / OPORTUNIDADE]
Tipo de análise: [Parceria / Fornecedor / Aquisição / Expansão de mercado]

## Contexto da decisão
Por que estamos considerando isso: [CONTEXTO]
Prazo para decisão: [DATA]
Quem decide: [NOME / CARGO]
Budget disponível (se aplicável): [VALOR ou "não definido"]

## O que precisamos saber para decidir
1. [PERGUNTA CRÍTICA 1]
2. [PERGUNTA CRÍTICA 2]
3. [PERGUNTA CRÍTICA 3]

## Critérios de aprovação
Para seguir em frente, precisamos de:
- [CRITÉRIO 1]: sim/não
- [CRITÉRIO 2]: sim/não
- [CRITÉRIO 3]: abaixo de X / acima de Y

## Red flags que encerram a análise
- [RED FLAG 1]
- [RED FLAG 2]`}</Prompt>
        <Tip>
          Se não tiver um caso real, use um fictício mas realista — por exemplo:
          "Avaliar parceria com empresa de logística para expansão no Nordeste".
          O processo funciona igualmente.
        </Tip>
      </Step>

      <Step n={2} title="Inicie o research loop">
        <Command>claude</Command>
        <Prompt>{`Vamos executar um research loop de due diligence sobre o alvo descrito em alvo-dd.md.

Siga este processo iterativo:

FASE 1 — MAPEAMENTO (execute sozinho, sem me interromper):
- Liste tudo que você já sabe sobre o alvo
- Identifique as lacunas críticas de informação
- Priorize: o que precisamos descobrir primeiro para a decisão
- Crie um "mapa de hipóteses": o que presumimos e o que precisa ser verificado
- Salve em research/fase1-mapeamento.md

FASE 2 — ANÁLISE PROFUNDA (execute sozinho):
- Para cada dimensão crítica (mercado, financeiro, operacional, riscos, pessoas), pesquise o que você sabe
- Avalie cada critério de aprovação que definimos
- Documente evidências para cada avaliação
- Sinalize claramente: o que é fato, o que é estimativa, o que é incerto
- Salve em research/fase2-analise.md

FASE 3 — VERIFICAÇÃO DE LACUNAS (pause aqui):
- Liste o que você conseguiu cobrir e o que ainda está em aberto
- Para cada lacuna, sugira: como poderíamos preencher essa informação? (ligação com quem, pesquisa onde, documento que precisaríamos)
- Dê uma recomendação preliminar: seguir / não seguir / precisamos de mais X antes de decidir

Quando terminar as fases 1 e 2, PAUSE na fase 3 e me apresente o status.`}</Prompt>
      </Step>

      <Step n={3} title="Alimente com dados externos">
        <p>
          Com o mapeamento em mãos, você pode pesquisar ativamente e trazer dados para o agente:
        </p>
        <Prompt>{`Coletei as seguintes informações adicionais sobre o alvo:

[COLE AQUI: notícias, dados do LinkedIn, site da empresa, relatórios públicos, conversas que você teve, etc.]

Com esses novos dados:
1. Atualize os arquivos de research existentes
2. Reclassifique as lacunas: quais foram preenchidas, quais ainda estão em aberto
3. Atualize a avaliação de cada critério
4. Me avise se algum red flag foi encontrado — neste caso, pare a análise e recomende abortar

Se não houver red flags, continue para a fase de síntese.`}</Prompt>
        <Warning>
          Due diligence real requer verificação de informações críticas por fontes primárias.
          O agente sintetiza e organiza — mas ligações, contratos e auditorias financeiras
          precisam de verificação humana.
        </Warning>
      </Step>

      <Step n={4} title="Gere o relatório final de DD">
        <Prompt>{`Com toda a análise feita, produza o relatório final de due diligence.

O relatório deve ter:

1. EXECUTIVE SUMMARY (meia página)
   - Recomendação: SEGUIR / NÃO SEGUIR / SEGUIR COM CONDIÇÕES
   - Nível de confiança: Alto / Médio / Baixo
   - Justificativa em 3 bullets

2. ANÁLISE DO MERCADO
   - Tamanho e crescimento
   - Dinâmica competitiva
   - Posição do alvo no mercado

3. ANÁLISE DO ALVO
   - Pontos fortes (evidenciados)
   - Pontos fracos (evidenciados)
   - Oportunidades que a parceria/aquisição abre
   - Riscos específicos

4. AVALIAÇÃO DOS CRITÉRIOS
   - Para cada critério definido: resultado (passou/não passou/incerto) + evidência

5. RED FLAGS IDENTIFICADOS
   - Lista com nível de severidade e recomendação para cada um

6. PRÓXIMOS PASSOS
   - Se recomendação é SEGUIR: o que acontece agora, com quem e até quando
   - Se é NÃO SEGUIR: critérios que precisariam mudar para reconsiderar
   - Se é CONDICIONADO: quais condições precisam ser cumpridas

7. LACUNAS REMANESCENTES
   - O que não foi possível verificar e por quê importa

Salve em relatorio-final-dd.md. Depois me dê um briefing verbal de 5 linhas como se fosse apresentar para o board.`}</Prompt>
      </Step>

      <Step n={5} title="Construa o processo para sua equipe">
        <Prompt>{`Este processo de research loop pode ser replicado para qualquer due diligence futura. Crie um documento processo-dd.md que ensine um analista a usar este sistema para conduzir DDs futuras de forma autônoma.

O documento deve cobrir:
1. Quando usar este processo (tipos de decisão que se beneficiam de DD formal)
2. Como configurar o alvo-dd.md de forma eficaz (erros comuns e como evitar)
3. Como alimentar o agente com dados externos (o que coletar, em que formato)
4. Como interpretar o relatório e onde aplicar ceticismo
5. Quando a IA não é suficiente e você precisa de especialistas humanos

Tom: prático, sem jargão. Deve funcionar para um analista de 25 anos ou para o próprio CEO.`}</Prompt>
      </Step>

      <div className="mt-8 p-6 rounded-xl border border-white/10 bg-white/3">
        <p className="text-sm font-semibold text-white mb-2">Você concluiu o Ato II.</p>
        <p className="text-white/60 text-sm leading-relaxed mb-4">
          Em 5 exercícios, você construiu agentes autônomos com revisão humana, pipelines de
          conteúdo e due diligence de qualidade consultoria. Tudo sem código — só prompts bem estruturados.
        </p>
        <p className="text-white/40 text-sm leading-relaxed">
          No Ato III, o Claude vai além do seu computador: conectamos ele à internet,
          aos seus documentos no Drive e ao canal do seu time no Slack.
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/4" className="inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">← 4</Link>
        <Link href="/exercises/6" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Começar Ato III: 6. Busca em tempo real →
        </Link>
      </div>
    </AppShell>
  );
}
