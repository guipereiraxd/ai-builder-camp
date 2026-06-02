import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Command, OSTabs, ExerciseHeader, AgentCommand, CopyContextFile, CompletedButton } from "../../components/ExerciseComponents";

export default function Exercise21() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato I — Entenda o poder dos Agentes"
        number="2.1"
        title="Análise de concorrentes ao vivo"
        duration="15 min"
        description="Monitorar concorrentes é crítico mas consome tempo. Neste exercício você vai criar um pipeline que pesquisa, sintetiza e formata uma análise competitiva completa — o tipo de trabalho que levaria horas de um analista."
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O que você vai construir</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Um script que recebe uma lista de concorrentes e produz um relatório estruturado
          com posicionamento, diferenciais, pontos fracos e movimentos recentes —
          pronto para distribuir para o time.
        </p>
      </div>

      <Step n={1} title="Prepare o ambiente">
        <OSTabs
          mac="mkdir ~/ai-builder-camp/ex-2-1 && cd ~/ai-builder-camp/ex-2-1"
          windows="mkdir $HOME\ai-builder-camp\ex-2-1; cd $HOME\ai-builder-camp\ex-2-1"
        />
        <p className="mt-2">
          Copie o arquivo de contexto do exercício anterior para esta pasta — assim
          o agente já conhece o contexto da sua empresa:
        </p>
        <CopyContextFile />
        <AgentCommand />
      </Step>

      <Step n={2} title="Crie o template de análise competitiva">
        <p>
          Primeiro, vamos ensinar o agente o formato que queremos para o relatório:
        </p>
        <Prompt>{`Crie um arquivo chamado template-analise-competitiva.md com um template estruturado para análise de concorrentes. O template deve ter estas seções para cada concorrente:

1. Perfil rápido (fundação, tamanho, segmento, modelo de negócio)
2. Posicionamento e proposta de valor
3. Produtos/Serviços principais com preços (se públicos)
4. Pontos fortes
5. Pontos fracos e vulnerabilidades
6. Movimentos recentes (últimos 6 meses)
7. Como nos diferenciar deles
8. Nível de ameaça: Baixo / Médio / Alto

No final, inclua uma seção de "Síntese Estratégica" comparando todos os concorrentes analisados.

O tom deve ser analítico e direto. Sem opiniões sem dados.`}</Prompt>
      </Step>

      <Step n={3} title="Execute a análise competitiva">
        <p>
          Agora substitua os nomes pelos seus concorrentes reais. Se preferir usar
          exemplos públicos para praticar, use os sugeridos:
        </p>
        <Prompt>{`Usando o template que acabamos de criar, faça uma análise competitiva completa dos seguintes concorrentes:

[SUBSTITUA COM SEUS CONCORRENTES REAIS]
Exemplo se você não tiver concorrentes em mente agora:
- Concorrente A: HubSpot
- Concorrente B: Pipedrive
- Concorrente C: RD Station

Nossa empresa é [DESCREVA SUA EMPRESA ou use o arquivo de contexto da empresa].

Para cada concorrente:
1. Pesquise o que você sabe sobre eles até sua data de corte
2. Preencha todas as seções do template
3. Seja específico: prefira dados concretos a generalizações

Salve o resultado em relatorio-competitivo.md`}</Prompt>
        <Tip>
          O agente tem conhecimento até a data de corte do modelo. Para dados mais recentes,
          você pode colar manualmente informações de sites, LinkedIn ou press releases
          e pedir para ele incorporar na análise.
        </Tip>
      </Step>

      <Step n={4} title="Adicione inteligência de mercado externa">
        <p>
          Abra o site de um concorrente, copie a página de preços ou a homepage
          e cole no agente para enriquecer a análise:
        </p>
        <Prompt>{`Acabei de visitar o site do [Concorrente X] e copiei as informações abaixo.
Incorpore esses dados no relatório que já criamos, atualizando as seções relevantes:

[COLE AQUI O TEXTO COPIADO DO SITE]

Depois me diga quais seções foram atualizadas e se há alguma inconsistência com o que já tínhamos.`}</Prompt>
      </Step>

      <Step n={5} title="Gere o resumo executivo para o board">
        <Prompt>{`Com base no relatório completo, crie uma versão executiva de no máximo meia página (formato para apresentar em reunião de board) com:

- Panorama competitivo em 3 linhas
- Nosso maior diferencial vs. o campo
- Principal ameaça e como mitigá-la
- Recomendação estratégica única para os próximos 90 dias

Salve como resumo-executivo.md`}</Prompt>
      </Step>

      <div className="mt-6 p-5 rounded-xl border border-white/10 bg-white/3">
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm text-white/50 leading-relaxed">
          Você acabou de criar um processo de análise competitiva que pode ser repetido mensalmente
          em minutos. No próximo exercício, vamos usar o agente para automatizar
          a comunicação externa — com o tom exato da sua empresa.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/1-2" className="inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">← 1.2</Link>
        <Link href="/exercises/2-2" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Próximo: 2.2 Email com tom da empresa →
        </Link>
      </div>
    </AppShell>
  );
}
