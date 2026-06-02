import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, Command, OSTabs, ExerciseHeader, AgentCommand, CopyContextFile, CompletedButton } from "../../components/ExerciseComponents";

export default function Exercise3() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato II — Construa o Agente"
        number="3"
        title="Agente de monitoramento de mercado"
        duration="30 min"
        description="Até agora, você deu um prompt e recebeu um resultado. Agora vamos construir algo diferente: um agente que executa múltiplos passos de forma autônoma, toma pequenas decisões sozinho, e entrega um relatório completo sem intervenção a cada etapa."
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O que muda no Ato II</p>
        <p className="text-sm text-white/70 leading-relaxed">
          No Ato I, você orquestrava cada passo. No Ato II, você define o objetivo e as regras —
          o agente cuida do resto. Você passa de executor para arquiteto.
          O resultado é trabalho de qualidade que você aprova, não que você faz.
        </p>
      </div>

      <Step n={1} title="Configure o ambiente do Ato II">
        <OSTabs
          mac="mkdir ~/ai-builder-camp/ex-3 && cd ~/ai-builder-camp/ex-3"
          windows="mkdir $HOME\ai-builder-camp\ex-3; cd $HOME\ai-builder-camp\ex-3"
        />
        <CopyContextFile />
        <p className="mt-3">
          Antes de abrir o agente, vamos criar o arquivo de configuração.
          Crie um arquivo <code>config-agente.md</code>:
        </p>
        <Prompt>{`# Configuração do Agente de Monitoramento de Mercado

## Missão
Produzir um relatório semanal de inteligência de mercado que permita ao CEO tomar decisões informadas em menos de 10 minutos de leitura.

## Fontes a monitorar
- Movimentos de concorrentes (novos produtos, contratações, preços, parcerias)
- Tendências do setor (regulação, tecnologia, comportamento de clientes)
- Oportunidades de mercado (segmentos não atendidos, necessidades emergentes)
- Ameaças (novos entrantes, mudanças regulatórias, shifts de tecnologia)

## Concorrentes a monitorar
[LISTE SEUS 3-5 PRINCIPAIS CONCORRENTES]

## Regras de operação
1. Priorizar informação acionável sobre informação interessante
2. Cada insight deve ter: o fato, a implicação para nós, e uma ação sugerida
3. Classificar relevância: Alta / Média / Baixa
4. Sinalizar quando há urgência (algo que precisa de resposta em menos de 7 dias)
5. Máximo: 2 páginas. Se houver mais, priorizar e cortar.

## Formato de output
- Header com data e "estado do mercado" (Estável / Em movimento / Turbulento)
- Seção 1: Alertas urgentes (se houver)
- Seção 2: Movimentos de concorrentes
- Seção 3: Tendências e oportunidades
- Seção 4: Recomendações para a semana`}</Prompt>
      </Step>

      <Step n={2} title="Construa o agente em modo autônomo">
        <AgentCommand />
        <Prompt>{`Leia o arquivo config-agente.md e execute o processo de monitoramento de mercado completo.

Etapas que você deve executar autonomamente:
1. Sintetize todo o conhecimento que você tem sobre cada concorrente listado e o setor
2. Identifique os movimentos e tendências mais relevantes dos últimos 6 meses
3. Avalie o impacto de cada item para a nossa empresa especificamente
4. Gere o relatório completo seguindo o formato definido
5. Salve em relatorio-mercado-HOJE.md (use a data atual no nome)
6. Ao final, me dê um sumário de 3 linhas do que é mais urgente

Execute cada etapa e me informe quando avançar para a próxima. Se precisar de uma decisão minha, pare e pergunte. Caso contrário, continue até o relatório estar completo.`}</Prompt>
        <Tip>
          Observe a diferença em relação ao Ato I: você não está microgerenciando cada passo.
          O agente planeja, executa e reporta. Sua função é revisar o output, não produzir.
        </Tip>
      </Step>

      <Step n={3} title="Adicione inteligência de fontes externas">
        <p>
          O agente trabalhou com seu conhecimento interno. Agora vamos alimentá-lo com
          dados reais. Abra o LinkedIn, Google News ou qualquer fonte relevante,
          copie artigos ou posts recentes e cole:
        </p>
        <Prompt>{`Aqui estão atualizações recentes que coletei de fontes externas esta semana:

---
[COLE AQUI: artigos de news, posts do LinkedIn, press releases, etc.]
---

Analise essas informações e:
1. Identifique o que é relevante para nossa empresa (ignore o resto)
2. Para cada item relevante, diga: o que aconteceu, o que significa para nós, o que devemos fazer
3. Atualize o relatório que já criamos incorporando esses novos dados
4. Se algum item mudar a classificação de urgência, me avise explicitamente`}</Prompt>
      </Step>

      <Step n={4} title="Crie o loop de atualização contínua">
        <Prompt>{`Agora quero tornar isso um processo repetível. Crie o arquivo processo-monitoramento.md documentando:

1. O que fazer toda semana (checklist de 5 passos)
2. Quais fontes verificar e com que frequência
3. Como alimentar o agente com novos dados (o formato exato para colar)
4. Como interpretar o relatório e o que fazer com cada tipo de alerta
5. Como o processo evolui: o que vai melhorar com o tempo à medida que o agente aprende mais sobre nosso setor

O documento deve ser seguível por qualquer membro do time de estratégia.`}</Prompt>
      </Step>

      <Warning>
        No Ato II, o agente tem mais autonomia — mas você continua como revisor final.
        Nunca tome decisões baseadas em relatórios do agente sem verificar pelo menos
        os dados mais críticos. A IA sintetiza, você decide.
      </Warning>

      <div className="mt-6 p-5 rounded-xl border border-white/10 bg-white/3">
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm text-white/50 leading-relaxed">
          Você acabou de construir o que seria equivalente a contratar um analista
          de inteligência competitiva — que trabalha toda semana, sem reclamar,
          no formato exato que você quer. No próximo exercício, vamos criar
          um pipeline de conteúdo completo com revisão humana no meio.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/2-4" className="inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">← 2.4</Link>
        <Link href="/exercises/4" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Próximo: 4. Pipeline com revisão humana →
        </Link>
      </div>
    </AppShell>
  );
}
