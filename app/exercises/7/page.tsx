import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Command, OSTabs, Tip, Warning, Prompt, ExerciseHeader, AgentCommand, CopyContextFile, LLMTabs } from "../../components/ExerciseComponents";

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

export default function Exercise7() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato III — Conecte ao Mundo Real"
        number="7"
        title="Claude no Google Drive"
        duration="30 min"
        description="Você tem documentos no Drive. O Claude tem inteligência para analisá-los. Neste exercício você conecta os dois — o Claude passa a ler contratos, relatórios e apresentações diretamente da sua pasta, sem você precisar copiar nada."
      />

      <LLMTabs
        claude={null}
        openai={
          <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid #2a3a4a", background: "rgba(16,163,127,0.05)" }}>
            <p className="text-sm font-semibold text-white mb-2">⚠️ Este exercício usa MCP — exclusivo do Claude Code</p>
            <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>
              A integração com Google Drive neste exercício usa o MCP do Claude Code. Para o OpenAI Codex CLI, a abordagem alternativa é usar a <strong className="text-white">Google Drive API</strong> diretamente ou configurar um <strong className="text-white">GPT Action</strong> com OAuth. Você pode acompanhar o exercício para entender o conceito.
            </p>
          </div>
        }
        gemini={
          <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid #2a3040", background: "rgba(138,180,248,0.05)" }}>
            <p className="text-sm font-semibold text-white mb-2">⚠️ Este exercício usa MCP — exclusivo do Claude Code</p>
            <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>
              A integração com Google Drive neste exercício usa o MCP do Claude Code. O Gemini tem acesso nativo ao Google Workspace via <strong className="text-white">Gemini for Workspace</strong> e <strong className="text-white">Google AI Studio</strong>, que são alternativas mais diretas para usuários Google. Você pode acompanhar o exercício para entender o conceito.
            </p>
          </div>
        }
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O que você vai fazer</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Conectar o Claude ao Google Drive via OAuth (a mesma autenticação do "Entrar com Google").
          Depois de configurado, o Claude pode ler qualquer arquivo que você compartilhar com ele —
          Docs, Sheets, PDFs, apresentações.
        </p>
      </div>

      <Warning>
        Este exercício tem mais passos de configuração que os anteriores. Cada passo é simples,
        mas precisa ser feito na ordem certa. Reserve 30 minutos sem pressa.
      </Warning>

      <Step n={1} title="Crie um projeto no Google Cloud">
        <p>
          O Google exige um "projeto" para liberar acesso à API. É gratuito e leva 3 minutos.
        </p>
        <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
          {[
            <>Acesse <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">console.cloud.google.com</a> com sua conta Google.</>,
            <>Clique em <strong className="text-white">Selecionar projeto</strong> (canto superior esquerdo) → <strong className="text-white">Novo projeto</strong>.</>,
            <>Dê o nome <strong className="text-white">ai-builder-camp</strong> e clique em <strong className="text-white">Criar</strong>.</>,
            <>Aguarde 30 segundos e selecione o projeto recém-criado.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
            </div>
          ))}
        </div>
      </Step>

      <Step n={2} title="Ative a API do Google Drive">
        <div className="space-y-3 mt-2 p-4 rounded-lg" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
          {[
            <>No menu lateral, clique em <strong className="text-white">APIs e serviços</strong> → <strong className="text-white">Biblioteca</strong>.</>,
            <>Pesquise por <strong className="text-white">Google Drive API</strong> e clique no resultado.</>,
            <>Clique em <strong className="text-white">Ativar</strong>. Aguarde alguns segundos.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
            </div>
          ))}
        </div>
      </Step>

      <Step n={3} title="Crie as credenciais OAuth">
        <p>
          As credenciais são o "crachá" que autoriza o Claude Code a acessar o Drive em seu nome.
        </p>
        <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
          {[
            <>Vá em <strong className="text-white">APIs e serviços</strong> → <strong className="text-white">Credenciais</strong> → <strong className="text-white">Criar credenciais</strong> → <strong className="text-white">ID do cliente OAuth</strong>.</>,
            <>Se aparecer "Configurar tela de consentimento", clique lá primeiro: escolha <strong className="text-white">Externo</strong>, preencha apenas o nome do app (<code>ai-builder-camp</code>) e seu email. Clique em <strong className="text-white">Salvar e continuar</strong> até o fim.</>,
            <>De volta em Criar credenciais: tipo de aplicativo → <strong className="text-white">App para computador</strong>. Nome: <code>claude-code</code>. Clique em <strong className="text-white">Criar</strong>.</>,
            <>Clique em <strong className="text-white">Baixar JSON</strong>. Salve o arquivo como <code>credentials.json</code>.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-3">Mova o arquivo para uma pasta segura e anote o caminho completo:</p>
        <OSTabs
          mac="mv ~/Downloads/credentials.json ~/.claude/gdrive-credentials.json"
          windows="move $HOME\Downloads\credentials.json $HOME\.claude\gdrive-credentials.json"
        />
      </Step>

      <Step n={4} title="Adicione o MCP do Google Drive ao settings.json">
        <p>Abra o settings.json e adicione o bloco do Google Drive <strong className="text-white">dentro</strong> de <code>mcpServers</code>, ao lado do Brave Search que já está lá:</p>
        <OSTabs
          mac="code ~/.claude/settings.json"
          windows="code $HOME\.claude\settings.json"
        />
        <p className="mt-3">Adicione o bloco <code>"gdrive"</code> — substituindo o caminho pelo caminho real do seu arquivo:</p>
        <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid #33363e" }}>
          <div className="px-4 py-2" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid #33363e" }}>
            <span className="text-xs font-mono" style={{ color: "#64687a" }}>Mac/Linux — ~/.claude/settings.json</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed" style={{ background: "#0d0d10", color: "#e8e8eb" }}>
            {MCP_CONFIG}
          </pre>
        </div>
        <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid #33363e" }}>
          <div className="px-4 py-2" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid #33363e" }}>
            <span className="text-xs font-mono" style={{ color: "#64687a" }}>Windows — %USERPROFILE%\.claude\settings.json</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed" style={{ background: "#0d0d10", color: "#e8e8eb" }}>
            {MCP_CONFIG_WIN}
          </pre>
        </div>
        <Tip>
          No caminho do Windows, use <code>\\</code> (barra dupla) dentro do JSON — o JSON
          usa <code>\</code> como caractere de escape, então cada <code>\</code> real precisa de <code>\\</code>.
        </Tip>
      </Step>

      <Step n={5} title="Autentique e teste a conexão">
        <p>Na primeira vez, o Claude Code vai abrir o navegador para você autorizar o acesso ao Drive.</p>
        <OSTabs
          mac="cd ~/ai-builder-camp/ex-6 && claude"
          windows="cd $HOME\ai-builder-camp\ex-6; claude"
        />
        <Prompt>{`Liste os arquivos e pastas disponíveis no meu Google Drive.`}</Prompt>
        <p className="mt-2">
          Se for a primeira vez, o terminal vai mostrar uma URL. Abra no navegador, faça login
          com sua conta Google e clique em <strong className="text-white">Permitir</strong>.
          Depois volte ao terminal — o Claude deve listar seus arquivos.
        </p>
        <Warning>
          O Google pode mostrar um aviso "app não verificado". Clique em{" "}
          <strong className="text-white">Avançado</strong> →{" "}
          <strong className="text-white">Ir para ai-builder-camp (não seguro)</strong>.
          Isso é esperado para apps em desenvolvimento — o app é seu, não tem risco.
        </Warning>
      </Step>

      <Step n={6} title="Teste: análise de documentos reais">
        <p>
          Com a conexão funcionando, compartilhe uma pasta com documentos relevantes
          e peça ao Claude para analisá-los:
        </p>
        <Prompt>{`Acesse a pasta [NOME DA PASTA] no meu Google Drive e:

1. Liste todos os documentos presentes
2. Para cada um, diga em uma linha do que se trata
3. Identifique se há algum documento desatualizado (mais de 6 meses sem edição) que deveria ser revisado
4. Aponte os 3 documentos mais importantes com base no título e conteúdo

Depois, pegue o documento mais recente e me faça um resumo executivo de 5 pontos.`}</Prompt>
        <Tip>
          Comece com uma pasta pequena (5–10 docs) para o primeiro teste. O Claude vai
          ler o conteúdo de cada arquivo — quanto mais arquivos, mais tempo leva.
        </Tip>
      </Step>

      <div className="mt-6 p-5 rounded-xl" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm leading-relaxed" style={{ color: "#64687a" }}>
          Você acabou de eliminar um dos maiores atritos do trabalho com IA: ter que copiar
          documentos manualmente. Agora o Claude acessa a fonte direta. No próximo exercício,
          vamos fechar o loop: os resultados saem direto para o Slack da sua equipe.
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/6" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#64687a" }}>← 6</Link>
        <Link href="/exercises/8" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Próximo: 8. Claude no Slack →
        </Link>
      </div>
    </AppShell>
  );
}
