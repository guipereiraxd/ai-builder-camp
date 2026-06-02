import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Command, OSTabs, Tip, Warning, Prompt, ExerciseHeader, AgentCommand, LLMTabs, CompletedButton } from "../../components/ExerciseComponents";

const MCP_CONFIG = `{
  "mcpServers": {
    "brave-search": { ... },
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GDRIVE_CREDENTIALS_PATH": "/caminho/para/credentials.json"
      }
    }
  }
}`;

const MCP_CONFIG_WIN = `{
  "mcpServers": {
    "brave-search": { ... },
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GDRIVE_CREDENTIALS_PATH": "C:\\\\Users\\\\SeuNome\\\\credentials.json"
      }
    }
  }
}`;

const SHARED_PROMPT_ANALYZE = `Analise os documentos na pasta [NOME DA PASTA / caminho local]:

1. Liste todos os documentos presentes
2. Para cada um, diga em uma linha do que se trata
3. Identifique documentos desatualizados (mais de 6 meses sem edição) que deveriam ser revisados
4. Aponte os 3 documentos mais importantes com base no título e conteúdo

Depois, pegue o documento mais recente e me faça um resumo executivo de 5 pontos.`;

export default function Exercise7() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato III — Conecte ao Mundo Real"
        number="7"
        title="Agente com seus documentos"
        duration="30 min"
        description="Você tem documentos espalhados. O agente tem inteligência para analisá-los. Neste exercício você conecta os dois — o agente passa a ler contratos, relatórios e apresentações sem você precisar copiar nada."
      />

      {/* Context box per LLM */}
      <LLMTabs
        claude={
          <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
            <p className="text-sm text-white/50 font-medium mb-1">O que você vai fazer</p>
            <p className="text-sm text-white/70 leading-relaxed">
              Conectar o Claude ao Google Drive via OAuth (a mesma autenticação do "Entrar com Google").
              Depois de configurado, o Claude pode ler qualquer arquivo que você compartilhar —
              Docs, Sheets, PDFs, apresentações.
            </p>
          </div>
        }
        openai={
          <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid #2a3a4a", background: "rgba(16,163,127,0.05)" }}>
            <p className="text-sm font-semibold text-white mb-1">Abordagem para OpenAI Codex</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
              O Codex CLI não tem integração direta com Google Drive. A abordagem prática é exportar
              os documentos-chave do Drive para uma pasta local e apontar o agente para essa pasta.
              O resultado analítico é o mesmo — só o processo de sincronização é manual.
            </p>
          </div>
        }
        gemini={
          <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid #2a3040", background: "rgba(138,180,248,0.05)" }}>
            <p className="text-sm font-semibold text-white mb-1">Abordagem para Gemini CLI</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
              O Gemini CLI não tem integração automática com Google Drive. A abordagem prática é
              exportar os documentos-chave para uma pasta local e apontar o agente para essa pasta.
              Como o Gemini conhece bem os formatos Google (Docs, Sheets), a análise é excelente.
            </p>
          </div>
        }
      />

      {/* Setup steps per LLM */}
      <LLMTabs
        claude={
          <>
            <Warning>
              Este exercício tem mais passos de configuração que os anteriores. Cada passo é simples,
              mas precisa ser feito na ordem certa. Reserve 30 minutos sem pressa.
            </Warning>

            <Step n={1} title="Crie um projeto no Google Cloud">
              <p>O Google exige um "projeto" para liberar acesso à API. É gratuito e leva 3 minutos.</p>
              <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
                {[
                  <><a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">console.cloud.google.com</a> com sua conta Google.</>,
                  <>Clique em <strong className="text-white">Selecionar projeto</strong> → <strong className="text-white">Novo projeto</strong>.</>,
                  <>Nome: <strong className="text-white">ai-builder-camp</strong> → <strong className="text-white">Criar</strong>.</>,
                  <>Aguarde 30 segundos e selecione o projeto criado.</>,
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
                  </div>
                ))}
              </div>
            </Step>

            <Step n={2} title="Ative a API do Google Drive">
              <div className="space-y-3 mt-2 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
                {[
                  <>Menu lateral → <strong className="text-white">APIs e serviços</strong> → <strong className="text-white">Biblioteca</strong>.</>,
                  <>Pesquise por <strong className="text-white">Google Drive API</strong> e clique no resultado.</>,
                  <>Clique em <strong className="text-white">Ativar</strong>.</>,
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
                  </div>
                ))}
              </div>
            </Step>

            <Step n={3} title="Crie as credenciais OAuth">
              <p>As credenciais autorizam o Claude a acessar o Drive em seu nome.</p>
              <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
                {[
                  <><strong className="text-white">APIs e serviços</strong> → <strong className="text-white">Credenciais</strong> → <strong className="text-white">Criar credenciais</strong> → <strong className="text-white">ID do cliente OAuth</strong>.</>,
                  <>Se pedir "Configurar tela de consentimento": escolha <strong className="text-white">Externo</strong>, preencha nome do app (<code>ai-builder-camp</code>) e email. Avance até o fim.</>,
                  <>Tipo de aplicativo → <strong className="text-white">App para computador</strong>. Nome: <code>ai-builder-camp</code>. Criar.</>,
                  <>Clique em <strong className="text-white">Baixar JSON</strong>. Salve como <code>credentials.json</code>.</>,
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3">Mova o arquivo para uma pasta segura:</p>
              <OSTabs
                mac="mv ~/Downloads/credentials.json ~/.claude/gdrive-credentials.json"
                windows="move $HOME\Downloads\credentials.json $HOME\.claude\gdrive-credentials.json"
              />
            </Step>

            <Step n={4} title="Adicione o MCP do Google Drive ao settings.json">
              <OSTabs mac="code ~/.claude/settings.json" windows="code $HOME\.claude\settings.json" />
              <p className="mt-3">Adicione o bloco <code>"gdrive"</code> dentro de <code>mcpServers</code>, substituindo o caminho real:</p>
              <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="px-4 py-2" style={{ background: "var(--tint-3)", borderBottom: "1px solid var(--border)" }}>
                  <span className="text-xs font-mono" style={{ color: "var(--text-4)" }}>Mac/Linux — ~/.claude/settings.json</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed" style={{ background: "var(--code-bg)", color: "var(--code-text)" }}>{MCP_CONFIG}</pre>
              </div>
              <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="px-4 py-2" style={{ background: "var(--tint-3)", borderBottom: "1px solid var(--border)" }}>
                  <span className="text-xs font-mono" style={{ color: "var(--text-4)" }}>Windows — %USERPROFILE%\.claude\settings.json</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed" style={{ background: "var(--code-bg)", color: "var(--code-text)" }}>{MCP_CONFIG_WIN}</pre>
              </div>
              <Tip>No Windows, use <code>\\</code> (barra dupla) dentro do JSON — cada <code>\</code> real precisa de <code>\\</code>.</Tip>
            </Step>

            <Step n={5} title="Autentique e teste a conexão">
              <p>Na primeira vez, o Claude vai abrir o navegador para você autorizar o acesso ao Drive.</p>
              <OSTabs mac="cd ~/ai-builder-camp/ex-6 && claude" windows="cd $HOME\ai-builder-camp\ex-6; claude" />
              <Prompt>{`Liste os arquivos e pastas disponíveis no meu Google Drive.`}</Prompt>
              <p className="mt-2">Se for a primeira vez, o terminal mostrará uma URL. Abra no navegador, faça login e clique em <strong className="text-white">Permitir</strong>.</p>
              <Warning>
                O Google pode mostrar "app não verificado". Clique em{" "}
                <strong className="text-white">Avançado</strong> →{" "}
                <strong className="text-white">Ir para ai-builder-camp (não seguro)</strong>.
                O app é seu — não há risco.
              </Warning>
            </Step>
          </>
        }
        openai={
          <>
            <Step n={1} title="Prepare uma pasta com seus documentos-chave">
              <p>
                Exporte do Google Drive os documentos mais importantes para uma pasta local.
                Formatos recomendados: <code>.pdf</code>, <code>.txt</code>, <code>.docx</code> ou <code>.md</code>.
              </p>
              <OSTabs
                mac="mkdir ~/ai-builder-camp/ex-7 && mkdir ~/ai-builder-camp/ex-7/docs"
                windows="mkdir $HOME\ai-builder-camp\ex-7; mkdir $HOME\ai-builder-camp\ex-7\docs"
              />
              <p className="mt-3">Coloque os documentos exportados dentro de <code>ex-7/docs/</code>. Comece com 5-10 arquivos.</p>
              <Tip>
                No Google Drive, você pode exportar Docs como PDF clicando em <strong>Arquivo → Fazer download → PDF</strong>.
                Para Sheets, exporte como CSV ou PDF.
              </Tip>
            </Step>
            <Step n={2} title="Abra o agente na pasta dos documentos">
              <OSTabs
                mac="cd ~/ai-builder-camp/ex-7"
                windows="cd $HOME\ai-builder-camp\ex-7"
              />
              <AgentCommand />
              <p className="mt-2">Confirme que o agente pode ler os arquivos:</p>
              <Prompt>{`Liste todos os arquivos na pasta docs/ e diga em uma linha do que se trata cada um.`}</Prompt>
            </Step>
          </>
        }
        gemini={
          <>
            <Step n={1} title="Prepare uma pasta com seus documentos-chave">
              <p>
                Exporte do Google Drive os documentos mais importantes para uma pasta local.
                O Gemini entende bem os formatos Google — <code>.pdf</code>, <code>.txt</code> e <code>.docx</code> funcionam muito bem.
              </p>
              <OSTabs
                mac="mkdir ~/ai-builder-camp/ex-7 && mkdir ~/ai-builder-camp/ex-7/docs"
                windows="mkdir $HOME\ai-builder-camp\ex-7; mkdir $HOME\ai-builder-camp\ex-7\docs"
              />
              <p className="mt-3">Coloque os documentos exportados dentro de <code>ex-7/docs/</code>. Comece com 5-10 arquivos.</p>
              <Tip>
                No Google Drive, exporte Docs como PDF: <strong>Arquivo → Fazer download → PDF</strong>.
                O Gemini analisa PDFs com muito boa qualidade.
              </Tip>
            </Step>
            <Step n={2} title="Abra o agente na pasta dos documentos">
              <OSTabs
                mac="cd ~/ai-builder-camp/ex-7"
                windows="cd $HOME\ai-builder-camp\ex-7"
              />
              <AgentCommand />
              <p className="mt-2">Confirme que o agente pode ler os arquivos:</p>
              <Prompt>{`Liste todos os arquivos na pasta docs/ e diga em uma linha do que se trata cada um.`}</Prompt>
            </Step>
          </>
        }
      />

      {/* Shared analysis steps */}
      <Step n={6} title="Análise de documentos reais">
        <LLMTabs
          claude={<p>Com a conexão funcionando, peça ao Claude para analisar uma pasta do Drive:</p>}
          openai={<p>Com os arquivos na pasta local, peça ao Codex para analisá-los:</p>}
          gemini={<p>Com os arquivos na pasta local, peça ao Gemini para analisá-los:</p>}
        />
        <Prompt>{SHARED_PROMPT_ANALYZE}</Prompt>
        <Tip>
          Comece com uma pasta pequena (5–10 docs) para o primeiro teste.
          O agente vai ler o conteúdo de cada arquivo — quanto mais arquivos, mais tempo leva.
        </Tip>
      </Step>

      <div className="mt-6 p-5 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
          Você acabou de dar ao agente acesso ao conhecimento acumulado da sua empresa.
          Relatórios, contratos, apresentações — tudo vira contexto que ele pode usar.
          No próximo exercício, vamos fechar o loop: os resultados saem direto para o Slack da sua equipe.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/6" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>← 6</Link>
        <Link href="/exercises/8" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Próximo: 8. Agente no Slack →
        </Link>
      </div>
    </AppShell>
  );
}
