import Link from "next/link";
import AppShell from "../components/AppShell";
import { Step, Command, Tip, Warning, Prompt } from "../components/ExerciseComponents";

export default function SetupPage() {
  return (
    <AppShell>
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-white/40 bg-white/5 px-2.5 py-1 rounded-full">
            Pré-requisito
          </span>
          <span className="text-xs text-white/30">·</span>
          <span className="text-xs text-white/40">~20 min</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Setup</h1>
        <p className="text-white/60 text-lg leading-relaxed">
          Antes de começar os exercícios, você precisa instalar três coisas: Node.js,
          o Claude Code e configurar sua chave de API. Siga os passos abaixo.
        </p>
        <div className="mt-6 border-t border-white/10" />
      </div>

      <Step n={1} title="Instale o Node.js">
        <p>
          O Claude Code roda sobre Node.js. Se você já tem o Node instalado (versão 18 ou
          superior), pode pular este passo.
        </p>
        <p className="mt-2">
          Verifique se já está instalado abrindo o terminal e rodando:
        </p>
        <Command>node --version</Command>
        <p>
          Se aparecer um número como <code>v20.x.x</code>, pode avançar para o passo 2.
          Se aparecer erro, acesse{" "}
          <a
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            nodejs.org
          </a>{" "}
          e baixe a versão LTS (recomendada).
        </p>
        <Tip>
          No Mac, a forma mais fácil é via Homebrew: <code>brew install node</code>
        </Tip>
      </Step>

      <Step n={2} title="Instale o Claude Code">
        <p>
          O Claude Code é o ambiente principal que vamos usar em todos os exercícios.
          É uma ferramenta de linha de comando que transforma o terminal em um agente de IA.
        </p>
        <p className="mt-2">Instale globalmente via npm:</p>
        <Command>npm install -g @anthropic-ai/claude-code</Command>
        <p>Confirme que funcionou:</p>
        <Command>claude --version</Command>
        <Tip>
          Se aparecer erro de permissão no Mac, tente com <code>sudo npm install -g @anthropic-ai/claude-code</code>
        </Tip>
      </Step>

      <Step n={3} title="Crie uma conta na Anthropic e obtenha sua API Key">
        <p>
          O Claude Code usa a API da Anthropic para funcionar. Você vai precisar de uma conta
          e de uma chave de API.
        </p>

        <div className="space-y-3 mt-3">
          <div className="flex gap-3">
            <span className="text-white/30 font-mono text-sm w-5">1.</span>
            <p>
              Acesse{" "}
              <a
                href="https://console.anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                console.anthropic.com
              </a>{" "}
              e crie uma conta (ou faça login se já tiver).
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-white/30 font-mono text-sm w-5">2.</span>
            <p>
              No menu lateral, clique em <strong className="text-white">API Keys</strong> →{" "}
              <strong className="text-white">Create Key</strong>.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-white/30 font-mono text-sm w-5">3.</span>
            <p>
              Dê um nome para a chave (ex: <code>ai-builder-camp</code>) e copie o valor
              gerado. <strong className="text-white">Você só vai ver essa chave uma vez.</strong>
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-white/30 font-mono text-sm w-5">4.</span>
            <p>
              Certifique-se de ter créditos em{" "}
              <a
                href="https://console.anthropic.com/settings/billing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Billing
              </a>
              . Mínimo recomendado: $10 para o curso completo.
            </p>
          </div>
        </div>

        <Warning>
          Nunca compartilhe sua API Key publicamente. Não faça commit dela no Git.
          Trate como uma senha.
        </Warning>
      </Step>

      <Step n={4} title="Configure a API Key no terminal">
        <p>
          O Claude Code precisa encontrar sua chave de API. A forma mais simples é
          definir como variável de ambiente.
        </p>

        <p className="mt-2">
          <strong className="text-white">Mac/Linux</strong> — adicione ao seu{" "}
          <code>~/.zshrc</code> ou <code>~/.bashrc</code>:
        </p>
        <Command>{`echo 'export ANTHROPIC_API_KEY="sua-chave-aqui"' >> ~/.zshrc && source ~/.zshrc`}</Command>

        <p className="mt-3">
          <strong className="text-white">Windows</strong> — no PowerShell como administrador:
        </p>
        <Command>[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY","sua-chave-aqui","User")</Command>

        <p className="mt-3">Substitua <code>sua-chave-aqui</code> pela chave que você copiou no passo anterior.</p>
      </Step>

      <Step n={5} title="Verifique a instalação">
        <p>
          Crie uma pasta para os seus experimentos e abra o Claude Code pela primeira vez:
        </p>
        <Command>mkdir ~/ai-builder-camp && cd ~/ai-builder-camp</Command>
        <Command>claude</Command>
        <p className="mt-2">
          Se tudo estiver configurado, o Claude Code vai abrir uma interface interativa
          no terminal. Digite a mensagem abaixo para confirmar que está funcionando:
        </p>
        <Prompt>{`Olá! Me diga em uma frase o que você consegue fazer por mim hoje.`}</Prompt>
        <p>
          Se você receber uma resposta, está tudo pronto. Pressione{" "}
          <code>Ctrl+C</code> para sair.
        </p>
        <Tip>
          Durante os exercícios, sempre abra o Claude Code dentro da pasta do projeto
          que você está trabalhando. O contexto do agente muda conforme os arquivos presentes.
        </Tip>
      </Step>

      <Step n={6} title="(Opcional) Instale o VS Code">
        <p>
          Para os exercícios do Ato II, vai ser útil ter um editor de código para
          visualizar os arquivos gerados. O VS Code é gratuito e funciona bem com o Claude Code.
        </p>
        <p className="mt-2">
          Baixe em{" "}
          <a
            href="https://code.visualstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            code.visualstudio.com
          </a>
          . Após instalar, você pode abrir qualquer pasta com:
        </p>
        <Command>code .</Command>
      </Step>

      <div className="mt-4 p-5 rounded-xl border border-green-500/20 bg-green-500/5">
        <p className="text-green-400 font-semibold text-sm mb-2">✓ Setup completo</p>
        <p className="text-white/50 text-sm leading-relaxed">
          Você está pronto para começar. O primeiro exercício leva 15 minutos e você
          vai criar uma aplicação web funcional com um único prompt.
        </p>
        <Link
          href="/exercises/1-1"
          className="inline-flex mt-3 items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors border border-white/10"
        >
          Ir para o exercício 1.1 →
        </Link>
      </div>
    </AppShell>
  );
}
