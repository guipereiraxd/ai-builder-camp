// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, AgentCommand, OSTabs, ExerciseHeader, LLMTabs, CompletedButton } from "../../components/ExerciseComponents";

const EXAMPLE_NOTES = `reunião de planejamento q3 — terça 15h
presentes: ana (produto), carlos (tech), beatriz (comercial), renata (ceo)

falamos sobre o lançamento do novo módulo em agosto
carlos disse que backend tá pronto mas faltam os testes de integração, calcula 1 semana
ana quer mais 10 dias pra refinar o fluxo de onboarding, achei que ainda tá confuso
beatriz trouxe que 2 clientes enterprise perguntaram sobre o módulo, temos pressão de mercado
renata bateu o martelo: lançamos em 20/08, beta fechado com esses 2 clientes
carlos fica responsável pelos testes, entregar até dia 12
ana entrega o onboarding revisado dia 10, vai alinhar com carlos antes
beatriz confirma com os clientes ainda essa semana e faz o contrato de beta
ficou em aberto: precificação do módulo — renata vai pensar e decidir até dia 5
próxima reunião: quinta 15h pra check-in dos entregáveis`;

export default function Mission1() {
  return (
    <AppShell>
      {/* Mission badge — shown above ExerciseHeader */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(209,164,118,0.15)", color: "#d1a476", border: "1px solid rgba(209,164,118,0.3)" }}
        >
          ◈ Missão 01
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Ato IV — Continue Praticando</span>
      </div>

      <ExerciseHeader
        act="Ato IV — Continue Praticando"
        number="M1"
        title="Automatize uma reunião"
        duration="15 min"
        description="Você sai de toda reunião com notas bagunçadas. Esta missão transforma qualquer rascunho em ata profissional, lista de próximos passos e donos por tarefa — em segundos."
      />

      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(209,164,118,0.15)", background: "rgba(209,164,118,0.04)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "#d1a476" }}>O que é uma Missão?</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Missões são exercícios complementares que você pode fazer a qualquer momento —
          não seguem a ordem dos Atos e não têm pré-requisito além do setup.
          Cada uma resolve um problema real e concreto do dia a dia executivo.
          Novas missões são adicionadas ao longo do tempo.
        </p>
      </div>

      <Step n={1} title="Prepare o ambiente">
        <OSTabs
          mac="mkdir ~/ai-builder-camp/missao-1 && cd ~/ai-builder-camp/missao-1"
          windows="mkdir $HOME\ai-builder-camp\missao-1; cd $HOME\ai-builder-camp\missao-1"
        />
        <AgentCommand />
        <p className="mt-2">
          Crie um arquivo <code>notas.md</code> e cole suas notas brutas de uma reunião real.
          Ou use o exemplo abaixo para testar agora:
        </p>
        <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between px-4 py-2" style={{ background: "var(--tint-3)", borderBottom: "1px solid var(--border)" }}>
            <span className="text-xs font-mono" style={{ color: "var(--text-4)" }}>exemplo — notas.md</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed whitespace-pre-wrap" style={{ background: "var(--code-bg)", color: "var(--text-3)" }}>
            {EXAMPLE_NOTES}
          </pre>
        </div>
        <Tip>
          Quanto mais brutas as notas, mais impressionante o resultado.
          Pode ser stream of consciousness, bullet points sem formatação, até frases incompletas.
          O agente vai organizar tudo.
        </Tip>
      </Step>

      <Step n={2} title="Transforme em ata profissional">
        <Prompt>{`Leia o arquivo notas.md e transforme em uma ata de reunião profissional com exatamente esta estrutura:

# Ata de Reunião — [ASSUNTO]
**Data:** [data]  **Hora:** [hora]  **Local/Formato:** [presencial/remoto]
**Participantes:** [lista com nome e cargo]

## Contexto
[2-3 linhas sobre o objetivo e resultado geral da reunião]

## Decisões Tomadas
1. [Decisão concreta — quem decidiu, o que foi decidido]
2. ...

## Próximos Passos
| Ação | Responsável | Prazo |
|------|------------|-------|
| ... | ... | ... |

## Pendências em Aberto
- [Item que ficou sem resolução e precisa de acompanhamento]

---
*Ata gerada em [data de hoje]. Revisão necessária antes de distribuir.*

Regras:
- Use APENAS o que está nas notas — não invente informações
- Se data, hora ou participantes não estiverem explícitos, deixe [a preencher]
- Se não houver prazo para uma ação, coloque [sem prazo definido]
- Tom direto e objetivo — sem floreios
- Salve o resultado em ata-[DATA].md`}</Prompt>
        <p className="mt-2">
          Abra o arquivo gerado. Em menos de 30 segundos, suas notas bagunçadas viraram
          um documento que você pode enviar para todos os participantes.
        </p>
      </Step>

      <Step n={3} title="Extraia só os próximos passos (versão rápida)">
        <p>
          Para reuniões rápidas onde você quer apenas o checklist de tarefas, use esta versão enxuta:
        </p>
        <Prompt>{`Das notas em notas.md, extraia APENAS os próximos passos em formato de checklist para o Slack ou email:

- [ ] [Ação clara e objetiva] — @[Responsável] — até [Prazo]

Se houver prazo, coloque. Se não houver, não invente. Ordene por urgência (prazo mais próximo primeiro).`}</Prompt>
        <Tip>
          Este formato é ótimo para colar diretamente no canal do time no Slack logo após a reunião.
          As pessoas sabem exatamente o que precisam fazer, sem ter que ler a ata completa.
        </Tip>
      </Step>

      <Step n={4} title="Crie um comando reutilizável">
        <p>
          Para não precisar digitar o prompt toda vez, vamos transformar isso em um comando que funciona
          com um único atalho:
        </p>
        <LLMTabs
          claude={
            <Prompt>{`Crie o arquivo .claude/commands/reuniao.md com as instruções completas para o comando /reuniao.

O comando deve:
1. Ler o arquivo notas.md da pasta atual (ou pedir o caminho se não existir)
2. Gerar a ata completa com os 5 blocos: cabeçalho, contexto, decisões, próximos passos, pendências
3. Salvar em ata-AAAA-MM-DD.md com a data de hoje
4. Gerar também um resumo-rapido-AAAA-MM-DD.md com apenas o checklist de próximos passos
5. Ao final, mostrar uma prévia de ambos os arquivos e perguntar se há algo para ajustar

O tom deve ser sempre direto e profissional. Não adicionar informações que não estejam nas notas originais.`}</Prompt>
          }
          openai={
            <Prompt>{`Adicione ao AGENTS.md uma seção "## Automatização de Reunião" com as instruções completas:

Quando eu disser "processar reunião" ou "transformar notas", leia o arquivo notas.md e:
1. Gere a ata completa com: cabeçalho, contexto, decisões, próximos passos (tabela com dono e prazo), pendências em aberto
2. Gere também um checklist rápido com apenas os próximos passos para o Slack
3. Salve ambos com data de hoje no nome
4. Mostre uma prévia antes de finalizar

Tom direto, sem floreios. Não inventar informações que não estejam nas notas.`}</Prompt>
          }
          gemini={
            <Prompt>{`Adicione ao GEMINI.md uma seção "## Automatização de Reunião" com as instruções completas:

Quando eu disser "processar reunião" ou "transformar notas", leia o arquivo notas.md e:
1. Gere a ata completa com: cabeçalho, contexto, decisões, próximos passos (tabela com dono e prazo), pendências em aberto
2. Gere também um checklist rápido com apenas os próximos passos para o Slack
3. Salve ambos com data de hoje no nome
4. Mostre uma prévia antes de finalizar

Tom direto, sem floreios. Não inventar informações que não estejam nas notas.`}</Prompt>
          }
        />
        <p className="mt-3">
          Da próxima reunião em diante, o fluxo é simplesmente:
        </p>
        <LLMTabs
          claude={
            <div className="mt-2 p-3 rounded-lg font-mono text-sm" style={{ background: "var(--code-bg)", border: "1px solid var(--border)", color: "var(--text-2)" }}>
              1. Crie <code>notas.md</code> com suas notas brutas<br />
              2. <code className="text-blue-400">claude</code><br />
              3. <code style={{ color: "#d1a476" }}>/reuniao</code>
            </div>
          }
          openai={
            <div className="mt-2 p-3 rounded-lg font-mono text-sm" style={{ background: "var(--code-bg)", border: "1px solid var(--border)", color: "var(--text-2)" }}>
              1. Crie <code>notas.md</code> com suas notas brutas<br />
              2. <code className="text-green-400">codex</code><br />
              3. <code style={{ color: "#d1a476" }}>processar reunião</code>
            </div>
          }
          gemini={
            <div className="mt-2 p-3 rounded-lg font-mono text-sm" style={{ background: "var(--code-bg)", border: "1px solid var(--border)", color: "var(--text-2)" }}>
              1. Crie <code>notas.md</code> com suas notas brutas<br />
              2. <code style={{ color: "#8ab4f8" }}>gemini</code><br />
              3. <code style={{ color: "#d1a476" }}>processar reunião</code>
            </div>
          }
        />
      </Step>

      <Step n={5} title="Bônus: transcrição de áudio">
        <p>
          Se seu time grava as reuniões, você pode eliminar até a etapa de tomar notas.
          O fluxo fica:
        </p>
        <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            <>Grave a reunião (Zoom, Meet, Teams — todos têm gravação nativa).</>,
            <>Transcreva o áudio com <a href="https://otter.ai" target="_blank" rel="noopener noreferrer">Otter.ai</a>, <a href="https://fireflies.ai" target="_blank" rel="noopener noreferrer">Fireflies</a> ou <a href="https://whisper.openai.com" target="_blank" rel="noopener noreferrer">Whisper (OpenAI)</a> — todos têm plano gratuito.</>,
            <>Exporte a transcrição como texto e cole em <code>notas.md</code>.</>,
            <>Rode o comando de reunião — o agente vai lidar com transcrições longas e filtrar o que importa.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
            </div>
          ))}
        </div>
        <Warning>
          Transcrições automáticas têm erros — nomes próprios e termos técnicos costumam sair errados.
          Sempre revise a ata antes de enviar, especialmente os nomes dos responsáveis pelas tarefas.
        </Warning>
      </Step>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(209,164,118,0.2)", background: "rgba(209,164,118,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#d1a476" }}>✓ Missão 01 concluída</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
          Você tem agora um sistema de reunião completo: notas brutas entram, ata profissional
          e checklist saem. Aplique na próxima reunião real e compartilhe o resultado com o time.
          Novas missões são adicionadas periodicamente — volte sempre.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex justify-start">
        <Link href="/exercises" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← Ver todos os exercícios
        </Link>
      </div>
    </AppShell>
  );
}
