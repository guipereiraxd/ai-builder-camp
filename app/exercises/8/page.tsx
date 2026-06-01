import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Command, OSTabs, Tip, Warning, Prompt, ExerciseHeader } from "../../components/ExerciseComponents";

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

export default function Exercise8() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato III — Conecte ao Mundo Real"
        number="8"
        title="Claude no Slack"
        duration="35 min"
        description="O último elo da cadeia: o Claude não só analisa e gera — ele entrega os resultados direto onde sua equipe trabalha. Neste exercício você configura o MCP do Slack e o briefing semanal passa a ser postado automaticamente no canal certo."
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O que você vai construir</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Um agente que combina os três MCPs do Ato III: busca notícias do mercado (Brave Search),
          lê os documentos de contexto da empresa (Google Drive) e posta o briefing
          direto no canal <code>#liderança</code> do Slack — tudo com um único prompt.
        </p>
      </div>

      <Step n={1} title="Crie um app no Slack">
        <p>
          Para o Claude postar no Slack, ele precisa de um "bot" — uma conta de app com permissão
          para ler e escrever em canais. Você cria isso no painel de desenvolvedores do Slack.
        </p>
        <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
          {[
            <>Acesse <a href="https://api.slack.com/apps" target="_blank" rel="noopener noreferrer">api.slack.com/apps</a> e clique em <strong className="text-white">Create New App</strong>.</>,
            <>Escolha <strong className="text-white">From scratch</strong>. Nome: <code>Claude Assistant</code>. Selecione seu workspace. Clique em <strong className="text-white">Create App</strong>.</>,
            <>No menu lateral, clique em <strong className="text-white">OAuth {"&"} Permissions</strong>.</>,
            <>Em <strong className="text-white">Bot Token Scopes</strong>, adicione estas permissões clicando em <strong className="text-white">Add an OAuth Scope</strong>:<br/>
              <code className="text-xs">channels:read</code> · <code className="text-xs">channels:history</code> · <code className="text-xs">chat:write</code> · <code className="text-xs">users:read</code></>,
            <>Suba a página e clique em <strong className="text-white">Install to Workspace</strong> → <strong className="text-white">Allow</strong>.</>,
            <>Copie o <strong className="text-white">Bot User OAuth Token</strong> (começa com <code>xoxb-</code>). Guarde com cuidado.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
            </div>
          ))}
        </div>
      </Step>

      <Step n={2} title="Encontre o Team ID do seu workspace">
        <p>
          O MCP precisa do ID do workspace (não o nome, mas um código como <code>T01AB2CD3</code>).
          É fácil de encontrar:
        </p>
        <div className="space-y-3 mt-3 p-4 rounded-lg" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
          {[
            <>Abra o Slack no navegador (não no app).</>,
            <>Olhe a URL: ela tem o formato <code>app.slack.com/client/<strong>TXXXXXXXX</strong>/...</code></>,
            <>O código começando com <strong className="text-white">T</strong> é o seu Team ID. Copie-o.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
            </div>
          ))}
        </div>
        <Tip>
          Alternativa: no Slack desktop, clique no nome do workspace (canto superior esquerdo)
          → <strong>Configurações {"&"} administração</strong> → <strong>Configurações do workspace</strong>.
          A URL que abrir no navegador contém o Team ID.
        </Tip>
      </Step>

      <Step n={3} title="Adicione o MCP do Slack ao settings.json">
        <p>Abra o settings.json e adicione o bloco do Slack dentro de <code>mcpServers</code>:</p>
        <OSTabs
          mac="code ~/.claude/settings.json"
          windows="code $HOME\.claude\settings.json"
        />
        <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid #33363e" }}>
          <div className="px-4 py-2" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid #33363e" }}>
            <span className="text-xs font-mono" style={{ color: "#64687a" }}>~/.claude/settings.json — adicione o bloco "slack"</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed" style={{ background: "#0d0d10", color: "#e8e8eb" }}>
            {MCP_CONFIG}
          </pre>
        </div>
        <p>Substitua <code>xoxb-seu-token-aqui</code> pelo Bot Token e <code>T00000000</code> pelo seu Team ID.</p>
        <Warning>
          O Bot Token começa com <code>xoxb-</code> e é longo. Se copiar errado, o MCP
          vai falhar silenciosamente. Verifique se copiou o token completo.
        </Warning>
      </Step>

      <Step n={4} title="Adicione o bot ao canal">
        <p>
          O bot precisa ser convidado para o canal onde vai postar — assim como você convida
          pessoas para um canal no Slack.
        </p>
        <div className="space-y-2 mt-3 p-4 rounded-lg" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
          {[
            <>Abra o canal onde o Claude vai postar (ex: <code>#liderança</code>).</>,
            <>Digite <code>/invite @Claude Assistant</code> e pressione Enter.</>,
            <>O Slack vai confirmar que o bot foi adicionado ao canal.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
            </div>
          ))}
        </div>
      </Step>

      <Step n={5} title="Teste a conexão">
        <OSTabs
          mac="cd ~/ai-builder-camp/ex-6 && claude"
          windows="cd $HOME\ai-builder-camp\ex-6; claude"
        />
        <Prompt>{`Liste os canais disponíveis no meu Slack e poste uma mensagem de teste no canal #geral dizendo "Conexão Claude ↔ Slack funcionando ✓"`}</Prompt>
        <p className="mt-2">
          Abra o Slack e confirme que a mensagem apareceu. Se sim, o MCP está funcionando.
        </p>
        <Tip>
          Se o Claude disser que não encontrou o canal, verifique se o bot foi convidado
          (passo 4) e se o nome do canal está exatamente igual — sem espaços, letras maiúsculas ou acentos.
        </Tip>
      </Step>

      <Step n={6} title="Orquestre os três MCPs juntos">
        <p>
          Este é o exercício final do curso. Vamos combinar busca web + Google Drive + Slack
          num único agente que trabalha do começo ao fim:
        </p>
        <Prompt>{`Execute o briefing semanal completo da empresa:

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

Quando eu aprovar, poste no canal #liderança com o título "📊 Briefing Semanal — [DATA DE HOJE]"`}</Prompt>
        <Tip>
          O checkpoint "aguarde minha confirmação" é proposital. Mesmo com MCPs conectados,
          você mantém controle editorial antes que qualquer coisa chegue ao time.
        </Tip>
      </Step>

      <div className="mt-8 p-6 rounded-xl" style={{ border: "1px solid rgba(209,164,118,0.3)", background: "rgba(209,164,118,0.06)" }}>
        <p className="font-semibold mb-3" style={{ color: "#d1a476" }}>Você concluiu o AI Builder Camp.</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#cfd2d8" }}>
          Em 8 exercícios, você foi de um prompt simples a um sistema completo que pesquisa
          na web, lê documentos no Drive e entrega resultados no Slack — com você como
          revisor final, não como executor.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "#64687a" }}>
          O próximo passo é identificar os 3 processos mais repetitivos e dolorosos da sua
          operação e aplicar o mesmo raciocínio: qual agente resolveria isso? Qual MCP
          conectaria o dado certo? Quem no time precisa receber o output?
        </p>
        <p className="text-sm mt-4 font-semibold" style={{ color: "#d1a476" }}>
          A IA não vai substituir sua capacidade de decisão. Vai amplificar a velocidade com que você age sobre ela.
        </p>
      </div>

      <div className="mt-6 flex justify-start">
        <Link href="/exercises/7" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#64687a" }}>← 7</Link>
      </div>
    </AppShell>
  );
}
