// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Command, OSTabs, Tip, Warning, Prompt, ExerciseHeader, AgentCommand, LLMTabs, CompletedButton } from "../../components/ExerciseComponents";

const MCP_CONFIG = `{
  "mcpServers": {
    "brave-search": { ... },
    "gdrive": { ... },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-seu-token-aqui",
        "SLACK_TEAM_ID": "T00000000"
      }
    }
  }
}`;

const SHARED_ORCHESTRATION_CLAUDE = `Execute o briefing semanal completo da empresa:

FASE 1 — COLETA (execute sozinho):
- Pesquise notícias relevantes do nosso setor dos últimos 7 dias (use o Brave Search)
- Leia o arquivo de contexto da empresa no Google Drive (pasta: [NOME DA PASTA])
- Combine as informações externas com o contexto interno

FASE 2 — SÍNTESE (execute sozinho):
- Monte o briefing no formato que definimos no exercício 2.4
- Inclua: estado do mercado, movimentos de concorrentes, oportunidades da semana, 3 decisões prioritárias

FASE 3 — ENTREGA (pause e confirme comigo):
- Me mostre o briefing para eu revisar
- Aguarde minha confirmação antes de postar no Slack

Quando eu aprovar, poste no canal #liderança com o título "📊 Briefing Semanal — [DATA DE HOJE]"`;

const SHARED_ORCHESTRATION_OPENAI = `Execute o briefing semanal completo da empresa:

FASE 1 — COLETA (execute sozinho):
- Pesquise notícias relevantes do nosso setor dos últimos 7 dias (use sua capacidade de busca web)
- Leia os documentos de contexto da empresa na pasta docs/ deste projeto
- Combine as informações externas com o contexto interno

FASE 2 — SÍNTESE (execute sozinho):
- Monte o briefing no formato que definimos no exercício 2.4
- Inclua: estado do mercado, movimentos de concorrentes, oportunidades da semana, 3 decisões prioritárias

FASE 3 — ENTREGA (pause e confirme comigo):
- Me mostre o briefing para eu revisar
- Aguarde minha confirmação antes de enviar ao Slack

Quando eu aprovar, use o comando curl abaixo para postar no canal #liderança:
curl -X POST https://slack.com/api/chat.postMessage \\
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \\
  -H "Content-type: application/json" \\
  -d '{"channel":"#liderança","text":"📊 Briefing Semanal — [DATA DE HOJE]\\n\\n[BRIEFING AQUI]"}'`;

export default function Exercise8() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato III — Conecte ao Mundo Real"
        number="8"
        title="Agente no Slack"
        duration="35 min"
        description="O último elo da cadeia: o agente não só analisa e gera — ele entrega os resultados direto onde sua equipe trabalha. Neste exercício você conecta o agente ao Slack e o briefing semanal passa a ser postado automaticamente no canal certo."
      />

      {/* Context box per LLM */}
      <LLMTabs
        claude={
          <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
            <p className="text-sm text-white/50 font-medium mb-1">O que você vai construir</p>
            <p className="text-sm text-white/70 leading-relaxed">
              Um agente que combina os três MCPs do Ato III: busca notícias do mercado (Brave Search),
              lê os documentos de contexto da empresa (Google Drive) e posta o briefing
              direto no canal <code>#liderança</code> do Slack — tudo com um único prompt.
            </p>
          </div>
        }
        openai={
          <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid #2a3a4a", background: "rgba(16,163,127,0.05)" }}>
            <p className="text-sm font-semibold text-white mb-1">Abordagem para OpenAI Codex</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
              Sem o MCP do Slack, o Codex vai interagir com o Slack via <strong className="text-white">comandos curl</strong>
              — chamadas diretas à API do Slack. O agente gera e executa esses comandos automaticamente.
              O resultado final é o mesmo: mensagens postadas no canal certo, com aprovação sua antes de enviar.
            </p>
          </div>
        }
        gemini={
          <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid #2a3040", background: "rgba(138,180,248,0.05)" }}>
            <p className="text-sm font-semibold text-white mb-1">Abordagem para Gemini CLI</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
              Sem o MCP do Slack, o Gemini vai interagir com o Slack via <strong className="text-white">comandos curl</strong>
              — chamadas diretas à API do Slack. O agente gera e executa esses comandos automaticamente.
              O resultado final é o mesmo: mensagens postadas no canal certo, com aprovação sua antes de enviar.
            </p>
          </div>
        }
      />

      {/* Slack bot setup — shared steps 1-2 are the same for all LLMs */}
      <Step n={1} title="Crie um app no Slack">
        <p>
          Para o agente postar no Slack, ele precisa de um bot — uma conta de app com permissão
          para ler e escrever em canais. O processo de criação é idêntico para Claude, OpenAI e Gemini.
        </p>
        <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            <><a href="https://api.slack.com/apps" target="_blank" rel="noopener noreferrer">api.slack.com/apps</a> → <strong className="text-white">Create New App</strong>.</>,
            <>Escolha <strong className="text-white">From scratch</strong>. Nome: <code>AI Assistant</code>. Selecione seu workspace.</>,
            <>Menu lateral → <strong className="text-white">OAuth {"&"} Permissions</strong>.</>,
            <>Em <strong className="text-white">Bot Token Scopes</strong>, adicione: <code className="text-xs">channels:read</code> · <code className="text-xs">channels:history</code> · <code className="text-xs">chat:write</code> · <code className="text-xs">users:read</code></>,
            <><strong className="text-white">Install to Workspace</strong> → <strong className="text-white">Allow</strong>.</>,
            <>Copie o <strong className="text-white">Bot User OAuth Token</strong> (começa com <code>xoxb-</code>).</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
            </div>
          ))}
        </div>
      </Step>

      <Step n={2} title="Adicione o bot ao canal">
        <p>O bot precisa ser convidado para o canal onde vai postar.</p>
        <div className="space-y-2 mt-3 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            <>Abra o canal onde o agente vai postar (ex: <code>#liderança</code>).</>,
            <>Digite <code>/invite @AI Assistant</code> e pressione Enter.</>,
            <>O Slack vai confirmar que o bot foi adicionado.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
            </div>
          ))}
        </div>
      </Step>

      {/* Configuration steps — different per LLM */}
      <LLMTabs
        claude={
          <>
            <Step n={3} title="Encontre o Team ID do workspace">
              <div className="space-y-3 mt-3 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
                {[
                  <>Abra o Slack no <strong className="text-white">navegador</strong> (não no app).</>,
                  <>URL: <code>app.slack.com/client/<strong>TXXXXXXXX</strong>/...</code> — o código com <strong className="text-white">T</strong> é o Team ID.</>,
                  <>Copie-o.</>,
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
                  </div>
                ))}
              </div>
            </Step>

            <Step n={4} title="Adicione o MCP do Slack ao settings.json">
              <OSTabs mac="code ~/.claude/settings.json" windows="code $HOME\.claude\settings.json" />
              <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="px-4 py-2" style={{ background: "var(--tint-3)", borderBottom: "1px solid var(--border)" }}>
                  <span className="text-xs font-mono" style={{ color: "var(--text-4)" }}>~/.claude/settings.json — adicione o bloco "slack"</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed" style={{ background: "var(--code-bg)", color: "var(--code-text)" }}>{MCP_CONFIG}</pre>
              </div>
              <p>Substitua <code>xoxb-seu-token-aqui</code> pelo Bot Token e <code>T00000000</code> pelo seu Team ID.</p>
              <Warning>
                O Bot Token começa com <code>xoxb-</code> e é longo. Verifique se copiou o token completo.
              </Warning>
            </Step>

            <Step n={5} title="Teste a conexão">
              <OSTabs mac="cd ~/ai-builder-camp/ex-6 && claude" windows="cd $HOME\ai-builder-camp\ex-6; claude" />
              <Prompt>{`Liste os canais disponíveis no meu Slack e poste uma mensagem de teste no canal #geral dizendo "Conexão Agente ↔ Slack funcionando ✓"`}</Prompt>
              <p className="mt-2">Abra o Slack e confirme que a mensagem apareceu.</p>
              <Tip>
                Se o agente não encontrar o canal, verifique se o bot foi convidado (passo 2) e se o
                nome do canal está exatamente igual — sem espaços ou letras maiúsculas.
              </Tip>
            </Step>
          </>
        }
        openai={
          <Step n={3} title="Configure o token como variável de ambiente">
            <p>
              Para que o agente acesse a API do Slack, o token precisa estar disponível
              como variável de ambiente no terminal.
            </p>
            <OSTabs
              mac={`echo 'export SLACK_BOT_TOKEN="xoxb-seu-token-aqui"' >> ~/.zshrc && source ~/.zshrc`}
              windows={`[System.Environment]::SetEnvironmentVariable("SLACK_BOT_TOKEN","xoxb-seu-token-aqui","User")`}
            />
            <p className="mt-3">Abra o agente e teste a conexão:</p>
            <OSTabs
              mac="cd ~/ai-builder-camp/ex-7 && codex"
              windows="cd $HOME\ai-builder-camp\ex-7; codex"
            />
            <Prompt>{`Use curl para postar uma mensagem de teste no Slack. O token está na variável $SLACK_BOT_TOKEN. O canal é #geral. A mensagem deve ser: "Conexão Agente ↔ Slack funcionando ✓"`}</Prompt>
            <p className="mt-2">Abra o Slack e confirme que a mensagem apareceu.</p>
            <Tip>
              O agente vai gerar e executar o comando curl automaticamente. Você vai ver
              o curl sendo chamado — isso é o agente orquestrando uma API via shell.
            </Tip>
          </Step>
        }
        gemini={
          <Step n={3} title="Configure o token como variável de ambiente">
            <p>
              Para que o agente acesse a API do Slack, o token precisa estar disponível
              como variável de ambiente no terminal.
            </p>
            <OSTabs
              mac={`echo 'export SLACK_BOT_TOKEN="xoxb-seu-token-aqui"' >> ~/.zshrc && source ~/.zshrc`}
              windows={`[System.Environment]::SetEnvironmentVariable("SLACK_BOT_TOKEN","xoxb-seu-token-aqui","User")`}
            />
            <p className="mt-3">Abra o agente e teste a conexão:</p>
            <OSTabs
              mac="cd ~/ai-builder-camp/ex-7 && gemini"
              windows="cd $HOME\ai-builder-camp\ex-7; gemini"
            />
            <Prompt>{`Use curl para postar uma mensagem de teste no Slack. O token está na variável $SLACK_BOT_TOKEN. O canal é #geral. A mensagem deve ser: "Conexão Agente ↔ Slack funcionando ✓"`}</Prompt>
            <p className="mt-2">Abra o Slack e confirme que a mensagem apareceu.</p>
            <Tip>
              O agente vai gerar e executar o comando curl automaticamente. Você vai ver
              o curl sendo chamado — isso é o agente orquestrando uma API via shell.
            </Tip>
          </Step>
        }
      />

      {/* Final orchestration step — adapted per LLM */}
      <Step n={6} title="Orquestre tudo junto — o exercício final">
        <p>
          Este é o exercício final do curso. Vamos combinar busca web + documentos + Slack
          num único agente que trabalha do começo ao fim:
        </p>
        <LLMTabs
          claude={<Prompt>{SHARED_ORCHESTRATION_CLAUDE}</Prompt>}
          openai={<Prompt>{SHARED_ORCHESTRATION_OPENAI}</Prompt>}
          gemini={<Prompt>{SHARED_ORCHESTRATION_OPENAI.replace(/codex/g, "gemini")}</Prompt>}
        />
        <Tip>
          O checkpoint "aguarde minha confirmação" é proposital. Mesmo com tudo conectado,
          você mantém controle editorial antes que qualquer coisa chegue ao time.
        </Tip>
      </Step>

      <div className="mt-8 p-6 rounded-xl" style={{ border: "1px solid rgba(209,164,118,0.3)", background: "rgba(209,164,118,0.06)" }}>
        <p className="font-semibold mb-3" style={{ color: "#d1a476" }}>Você concluiu o AI Builder Camp.</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
          Em 8 exercícios, você foi de um prompt simples a um sistema completo que pesquisa
          na web, lê documentos e entrega resultados no Slack — com você como
          revisor final, não como executor.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
          O próximo passo é identificar os 3 processos mais repetitivos e dolorosos da sua
          operação e aplicar o mesmo raciocínio: qual agente resolveria isso? Qual ferramenta
          conectaria o dado certo? Quem no time precisa receber o output?
        </p>
        <p className="text-sm mt-4 font-semibold" style={{ color: "#d1a476" }}>
          A IA não vai substituir sua capacidade de decisão. Vai amplificar a velocidade com que você age sobre ela.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex justify-start">
        <Link href="/exercises/7" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>← 7</Link>
      </div>
    </AppShell>
  );
}
