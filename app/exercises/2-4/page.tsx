import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Command, OSTabs, ExerciseHeader, AgentCommand, CopyContextFile, LLMTabs, CompletedButton } from "../../components/ExerciseComponents";

export default function Exercise24() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato I — Entenda o poder dos Agentes"
        number="2.4"
        title="Briefing semanal automatizado"
        duration="20 min"
        description="O briefing semanal é o ritual mais valioso de um executivo — e o que mais tempo consome para montar. Aqui você vai criar um comando que gera automaticamente seu briefing a partir de notas e dados dispersos."
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O conceito: automação de ritual</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Todo executivo tem inputs semanais: métricas, atualizações de times, prioridades.
          O problema não é falta de informação — é transformar informação em decisão rapidamente.
          Vamos criar um comando <code>/briefing</code> que faz esse trabalho.
        </p>
      </div>

      <Step n={1} title="Defina a estrutura do seu briefing ideal">
        <OSTabs
          mac="mkdir ~/ai-builder-camp/ex-2-4 && cd ~/ai-builder-camp/ex-2-4"
          windows="mkdir $HOME\ai-builder-camp\ex-2-4; cd $HOME\ai-builder-camp\ex-2-4"
        />
        <CopyContextFile />
        <AgentCommand />
        <p className="mt-3">Primeiro, vamos definir o que um briefing excelente contém:</p>
        <Prompt>{`Vou criar um briefing semanal executivo. Me ajude a definir a estrutura ideal.

Meu contexto: [DESCREVA sua função, tamanho do time que você lidera, e que decisões você tipicamente toma na semana]

Com base nisso, proponha uma estrutura de briefing semanal com no máximo 6 seções. Para cada seção, diga:
- Qual é o objetivo daquela seção
- Que inputs ela precisa (dados, narrativas, métricas)
- Qual deve ser o comprimento ideal
- O que "bom" se parece naquela seção

Depois vamos usar essa estrutura para criar o comando /briefing.`}</Prompt>
      </Step>

      <Step n={2} title="Crie os arquivos de input da semana">
        <p>
          Crie uma estrutura de pasta simples para organizar os inputs da semana.
          O agente vai ler todos eles:
        </p>
        <Command>mkdir semana-atual</Command>
        <p className="mt-3">Dentro da pasta, crie arquivos de texto com as atualizações da semana:</p>
        <div className="space-y-1 mt-2 text-sm font-mono text-white/50">
          <p><code>semana-atual/metricas.md</code> — KPIs e números da semana</p>
          <p><code>semana-atual/produto.md</code> — atualizações de produto/tech</p>
          <p><code>semana-atual/comercial.md</code> — pipeline, deals, conversas</p>
          <p><code>semana-atual/people.md</code> — time, contratações, issues</p>
          <p><code>semana-atual/pendencias.md</code> — o que ficou da semana anterior</p>
        </div>
        <p className="mt-3">Use dados fictícios ou reais (sem informações confidenciais). Não precisa ser formal — pode ser bullet points bagunçados. O agente vai organizar.</p>
        <Tip>
          A beleza desse sistema é que cada líder de área pode atualizar o arquivo da
          pasta dele ao longo da semana. Na sexta, você roda o comando e tem o briefing pronto.
        </Tip>
      </Step>

      <Step n={3} title="Crie o comando de briefing">
        <LLMTabs
          claude={<>
            <OSTabs mac="mkdir -p .claude/commands" windows="mkdir .claude\commands" />
            <Prompt>{`Crie o arquivo .claude/commands/briefing.md com as instruções para o comando /briefing.\n\nO comando deve:\n1. Ler todos os arquivos dentro da pasta semana-atual/\n2. Sintetizar as informações usando a estrutura que definimos\n3. Identificar automaticamente: o que avançou, o que está travado, o que precisa de decisão minha\n4. Calcular o "estado da empresa" nessa semana: Verde (no caminho), Amarelo (atenção), Vermelho (problema)\n5. Terminar com 3 decisões que preciso tomar nesta semana, ordenadas por urgência\n\nOutput: arquivo briefing-AAAA-MM-DD.md com a data de hoje`}</Prompt>
          </>}
          openai={<>
            <p>O Codex CLI não tem <code>/commands</code>. Adicione as instruções do briefing no <code>AGENTS.md</code> e dispare com um prompt direto:</p>
            <Prompt>{`Adicione ao AGENTS.md uma seção "## Briefing Semanal" com as instruções completas: ler pasta semana-atual/, sintetizar, identificar o que avançou/travou/precisa de decisão, calcular estado Verde/Amarelo/Vermelho e listar 3 decisões da semana. Output: briefing-AAAA-MM-DD.md.`}</Prompt>
          </>}
          gemini={<>
            <p>O Gemini CLI não tem <code>/commands</code>. Adicione as instruções do briefing no <code>GEMINI.md</code> e dispare com um prompt direto:</p>
            <Prompt>{`Adicione ao GEMINI.md uma seção "## Briefing Semanal" com as instruções completas: ler pasta semana-atual/, sintetizar, identificar o que avançou/travou/precisa de decisão, calcular estado Verde/Amarelo/Vermelho e listar 3 decisões da semana. Output: briefing-AAAA-MM-DD.md.`}</Prompt>
          </>}
        />
      </Step>

      <Step n={4} title="Execute o briefing">
        <LLMTabs
          claude={<p>Feche e reabra o Claude Code para carregar o novo comando:</p>}
          openai={<p>Abra uma nova sessão do Codex:</p>}
          gemini={<p>Abra uma nova sessão do Gemini:</p>}
        />
        <AgentCommand />
        <LLMTabs
          claude={<Prompt>{`/briefing`}</Prompt>}
          openai={<Prompt>{`Execute o briefing semanal conforme as instruções no AGENTS.md. Leia todos os arquivos de semana-atual/ e gere o relatório completo.`}</Prompt>}
          gemini={<Prompt>{`Execute o briefing semanal conforme as instruções no GEMINI.md. Leia todos os arquivos de semana-atual/ e gere o relatório completo.`}</Prompt>}
        />
        <p className="mt-3">
          O agente vai ler todos os arquivos, sintetizar e gerar o briefing formatado.
          Abra o arquivo gerado e avalie:
        </p>
        <ul className="space-y-1 mt-2 text-sm text-white/60">
          <li>· A síntese capturou o que é importante?</li>
          <li>· As decisões identificadas fazem sentido?</li>
          <li>· O nível de detalhe é adequado?</li>
        </ul>
      </Step>

      <Step n={5} title="Refine e itere">
        <Prompt>{`O briefing ficou bom, mas quero ajustar algumas coisas:
1. A seção de métricas precisa ser mais visual — use tabelas comparando semana atual vs. anterior
2. Adicione uma seção "O que o CEO precisa saber" no topo, com no máximo 5 bullet points — o resumo do resumo
3. Inclua um campo "Tom da semana" com uma frase que capture como está o momento da empresa

Atualize o arquivo .claude/commands/briefing.md com essas mudanças e rode novamente.`}</Prompt>
      </Step>

      <div className="mt-6 p-5 rounded-xl border border-white/10 bg-white/3">
        <p className="text-sm font-semibold text-white mb-2">Parabéns — você completou o Ato I.</p>
        <p className="text-sm text-white/50 leading-relaxed">
          Em 6 exercícios, você criou produtos digitais, análises, dashboards e automações
          de comunicação. Tudo sem código, em horas. O Ato II vai mais fundo:
          você vai construir agentes que trabalham de forma autônoma, com você apenas
          revisando e aprovando.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/2-3" className="inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">← 2.3</Link>
        <Link href="/exercises/3" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Começar Ato II: 3. Agente de monitoramento →
        </Link>
      </div>
    </AppShell>
  );
}
