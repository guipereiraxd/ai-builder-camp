"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AppShell from "../components/AppShell";
import { Step, Command, OSTabs, Tip, Warning, Prompt, OS_KEY, LLMSelector, LLMTabs, LLM_CONFIG, type LLMChoice } from "../components/ExerciseComponents";

const BORDER = "#33363e";
const BRAND = "#4b6afc";

function OSSelector() {
  const [os, setOs] = useState<"mac" | "windows" | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(OS_KEY);
    if (saved === "mac" || saved === "windows") setOs(saved);
  }, []);

  const select = (val: "mac" | "windows") => {
    setOs(val);
    localStorage.setItem(OS_KEY, val);
    // Dispatch a storage event so OSTabs components on the same page react
    window.dispatchEvent(new StorageEvent("storage", { key: OS_KEY, newValue: val }));
  };

  return (
    <div
      className="rounded-xl p-5 mb-10"
      style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}
    >
      <p className="text-sm font-semibold text-white mb-1">Qual é o seu sistema operacional?</p>
      <p className="text-xs mb-4" style={{ color: "#64687a" }}>
        Os comandos ao longo desta página vão se adaptar à sua escolha.
      </p>
      <div className="flex gap-3">
        {(["mac", "windows"] as const).map((val) => {
          const active = os === val;
          return (
            <button
              key={val}
              onClick={() => select(val)}
              className="flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              style={
                active
                  ? { background: "rgba(75,106,252,0.12)", border: `1px solid rgba(75,106,252,0.4)`, color: "#4b6afc" }
                  : { background: "transparent", border: `1px solid ${BORDER}`, color: "#64687a" }
              }
            >
              {val === "mac" ? (
                <>
                  <span className="text-base leading-none">⌘</span>
                  Mac / Linux
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="1" width="6.5" height="6.5" rx="0.5" fill="currentColor"/>
                    <rect x="8.5" y="1" width="6.5" height="6.5" rx="0.5" fill="currentColor"/>
                    <rect x="1" y="8.5" width="6.5" height="6.5" rx="0.5" fill="currentColor"/>
                    <rect x="8.5" y="8.5" width="6.5" height="6.5" rx="0.5" fill="currentColor"/>
                  </svg>
                  Windows
                </>
              )}
            </button>
          );
        })}
      </div>
      {os && (
        <p className="text-xs mt-3" style={{ color: "#64687a" }}>
          ✓ Mostrando instruções para <strong style={{ color: "#cfd2d8" }}>{os === "mac" ? "Mac / Linux" : "Windows"}</strong>.
          Você pode mudar a qualquer momento.
        </p>
      )}
    </div>
  );
}

function TerminalHelp() {
  const [os, setOs] = useState<"mac" | "windows">("mac");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(OS_KEY);
    if (saved === "windows") setOs("windows");

    const handler = (e: StorageEvent) => {
      if (e.key === OS_KEY && (e.newValue === "mac" || e.newValue === "windows")) {
        setOs(e.newValue);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <div className="my-3 rounded-lg overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-white/5"
        style={{ background: "rgba(255,255,255,0.02)", color: "#cfd2d8" }}
      >
        <span>💡 Como abrir o terminal no {os === "mac" ? "Mac" : "Windows"}</span>
        <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "rgba(75,106,252,0.15)", color: "#8ba3ff" }}>
          {open ? "fechar ▲" : "ver ▼"}
        </span>
      </button>
      {open && (
        <div className="px-4 py-4 text-sm space-y-2" style={{ color: "#cfd2d8", background: "#0d0d10" }}>
          {os === "mac" ? (
            <>
              <p>O terminal no Mac se chama <strong className="text-white">Terminal</strong>. Para abri-lo:</p>
              <ol className="space-y-1.5 ml-4 list-decimal" style={{ color: "#cfd2d8" }}>
                <li>Pressione <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: BORDER, color: "#e8e8eb" }}>⌘ Cmd</kbd> + <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: BORDER, color: "#e8e8eb" }}>Espaço</kbd> para abrir o Spotlight</li>
                <li>Digite <strong className="text-white">Terminal</strong> e pressione Enter</li>
                <li>Uma janela escura vai abrir — esse é o terminal</li>
              </ol>
              <p className="mt-2 text-xs" style={{ color: "#64687a" }}>
                Alternativa: Finder → Aplicativos → Utilitários → Terminal
              </p>
            </>
          ) : (
            <>
              <p>No Windows, vamos usar o <strong className="text-white">PowerShell</strong>. Para abri-lo:</p>
              <ol className="space-y-1.5 ml-4 list-decimal" style={{ color: "#cfd2d8" }}>
                <li>Pressione <kbd className="px-1.5 py-0.5 rounded text-xs font-mono" style={{ background: BORDER, color: "#e8e8eb" }}>⊞ Win</kbd> e digite <strong className="text-white">PowerShell</strong></li>
                <li>Clique com o botão direito em <strong className="text-white">Windows PowerShell</strong></li>
                <li>Escolha <strong className="text-white">"Executar como administrador"</strong></li>
              </ol>
              <p className="mt-2 text-xs" style={{ color: "#64687a" }}>
                Rodar como administrador evita erros de permissão durante a instalação.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function SetupPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ color: BRAND, background: "rgba(75,106,252,0.1)" }}
          >
            Pré-requisito
          </span>
          <span style={{ color: BORDER }}>·</span>
          <span className="text-xs" style={{ color: "#64687a" }}>~20 min</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Configuração inicial</h1>
        <p className="text-base leading-relaxed" style={{ color: "#cfd2d8" }}>
          Você vai instalar três ferramentas: <strong className="text-white">Node.js</strong> (base técnica),{" "}
          <strong className="text-white">Claude Code</strong> (o agente que vamos usar) e configurar sua{" "}
          <strong className="text-white">chave de API</strong> da Anthropic. Leva cerca de 20 minutos.
        </p>

        {/* What you'll need */}
        <div className="grid grid-cols-3 gap-2 mt-6">
          {[
            { icon: "⬡", label: "Node.js", desc: "Base técnica" },
            { icon: "◈", label: "CLI de IA", desc: "O agente de IA" },
            { icon: "🔑", label: "API Key", desc: "Sua credencial" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 p-3 rounded-lg"
              style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-semibold text-white">{item.label}</span>
              <span className="text-xs" style={{ color: "#64687a" }}>{item.desc}</span>
            </div>
          ))}
        </div>

        <div className="mt-8" style={{ borderTop: `1px solid ${BORDER}` }} />
      </div>

      {/* OS Selector */}
      <OSSelector />

      {/* LLM Selector */}
      <LLMSelector />

      {/* Step 1 */}
      <Step n={1} title="Abra o terminal">
        <p>
          O terminal é uma janela de texto onde você digita comandos direto para o computador.
          Parece intimidador, mas você vai usar apenas 4 ou 5 comandos durante todo o curso.
        </p>
        <TerminalHelp />
        <p className="mt-2">
          Com o terminal aberto, verifique se o Node.js já está instalado:
        </p>
        <Command>node --version</Command>
        <p>
          Se aparecer algo como <code>v20.x.x</code>, pode pular para o{" "}
          <strong className="text-white">passo 3</strong>. Se aparecer erro ou "comando não encontrado",
          continue no passo 2.
        </p>
      </Step>

      {/* Step 2 */}
      <Step n={2} title="Instale o Node.js">
        <p>
          O Node.js é a "infraestrutura" que as ferramentas de IA precisam para rodar. Pense nele como
          o motor de um carro — você não interage com ele diretamente, mas tudo depende dele.
        </p>
        <p className="mt-3">
          Acesse{" "}
          <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">
            nodejs.org
          </a>{" "}
          e baixe a versão <strong className="text-white">LTS</strong> (a recomendada, mais estável).
          Ou instale direto pelo terminal:
        </p>
        <OSTabs
          mac="brew install node"
          windows="winget install OpenJS.NodeJS.LTS"
        />
        <Tip>
          <strong>Homebrew não instalado no Mac?</strong> Primeiro rode:{" "}
          <code>/bin/bash -c "$(curl -fsSL https://brew.sh/install.sh)"</code>
          <br />
          <strong>Windows sem winget?</strong> Baixe o instalador <code>.msi</code> direto em nodejs.org — é só clicar e avançar.
        </Tip>
        <Warning>
          <strong>Windows:</strong> após o comando acima terminar, <strong>feche o PowerShell e abra novamente</strong> antes de continuar.
          O Windows só reconhece o Node.js em sessões novas do terminal — na mesma janela, o comando vai dar erro mesmo a instalação tendo funcionado.
        </Warning>
        <p className="mt-3">Confirme que a instalação funcionou:</p>
        <Command>node --version</Command>
        <p>Deve aparecer um número de versão como <code>v22.x.x</code>. Se aparecer, avance para o passo 3.</p>
      </Step>

      {/* Step 3 */}
      <Step n={3} title="Instale a ferramenta de IA">
        <LLMTabs
          claude={<p>O <strong className="text-white">Claude Code</strong> da Anthropic transforma seu terminal em um agente que entende linguagem natural, lê arquivos e executa tarefas.</p>}
          openai={<p>O <strong className="text-white">OpenAI Codex CLI</strong> é a ferramenta agêntica open source da OpenAI — funciona de forma similar ao Claude Code, direto no terminal.</p>}
          gemini={<p>O <strong className="text-white">Gemini CLI</strong> do Google é a ferramenta agêntica lançada em 2025 — funciona de forma similar ao Claude Code, direto no terminal.</p>}
        />
        <p className="mt-3">
          Se estiver no <strong className="text-white">Windows</strong>, rode este comando primeiro para
          liberar a execução de scripts no PowerShell:
        </p>
        <OSTabs
          mac="# Não é necessário no Mac"
          windows="Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser"
        />
        <p className="mt-3">Instale a ferramenta:</p>
        <LLMTabs
          claude={<Command>npm install -g @anthropic-ai/claude-code</Command>}
          openai={<Command>npm install -g @openai/codex</Command>}
          gemini={<Command>npm install -g @google/gemini-cli</Command>}
        />
        <Warning>
          <strong>Windows:</strong> após a instalação terminar, <strong>feche e reabra o PowerShell</strong> antes de continuar.
          O terminal precisa de uma nova sessão para reconhecer o novo comando.
        </Warning>
        <p className="mt-3">Confirme que funcionou:</p>
        <LLMTabs
          claude={<Command>claude --version</Command>}
          openai={<Command>codex --version</Command>}
          gemini={<Command>gemini --version</Command>}
        />
        <Tip>
          <strong>Erro de permissão no Mac/Linux?</strong> Adicione <code>sudo</code> antes do comando de instalação.
          <br />
          <strong>Erro "scripts disabled" no Windows?</strong> Rode primeiro:{" "}
          <code>Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code>
        </Tip>
      </Step>

      {/* Step 4 */}
      <Step n={4} title="Crie sua conta e obtenha a API Key">
        <p>
          A API Key é como uma senha que identifica você para os servidores da IA.
          A ferramenta usa ela para fazer as chamadas. Você paga pelo uso —{" "}
          <LLMTabs
            claude={<span>o curso completo custa aproximadamente <strong className="text-white">$5–10</strong> na Anthropic.</span>}
            openai={<span>o custo é similar ao Claude para o curso completo na OpenAI.</span>}
            gemini={<span>o Google AI Studio tem um <strong className="text-white">plano gratuito generoso</strong> — suficiente para o curso inteiro.</span>}
          />
        </p>
        <LLMTabs
          claude={
            <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}>
              {[
                <><a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a> → crie uma conta.</>,
                <>Menu lateral → <strong className="text-white">API Keys</strong> → <strong className="text-white">Create Key</strong>.</>,
                <>Dê um nome (ex: <code>ai-builder-camp</code>). <strong className="text-white">Copie a chave agora</strong> — ela aparece só uma vez.</>,
                <><a href="https://console.anthropic.com/settings/billing" target="_blank" rel="noopener noreferrer">Billing</a> → adicione créditos. Mínimo recomendado: <strong className="text-white">$10</strong>.</>,
              ].map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: BRAND }}>{i + 1}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
                </div>
              ))}
            </div>
          }
          openai={
            <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}>
              {[
                <><a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer">platform.openai.com</a> → crie uma conta.</>,
                <>Menu lateral → <strong className="text-white">API Keys</strong> → <strong className="text-white">Create new secret key</strong>.</>,
                <>Dê um nome (ex: <code>ai-builder-camp</code>). <strong className="text-white">Copie a chave agora</strong> — ela aparece só uma vez.</>,
                <><a href="https://platform.openai.com/settings/organization/billing" target="_blank" rel="noopener noreferrer">Billing</a> → adicione créditos. Mínimo recomendado: <strong className="text-white">$10</strong>.</>,
              ].map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: BRAND }}>{i + 1}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
                </div>
              ))}
            </div>
          }
          gemini={
            <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}>
              {[
                <><a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">aistudio.google.com</a> → faça login com sua conta Google.</>,
                <>No topo da página → <strong className="text-white">Get API key</strong> → <strong className="text-white">Create API key</strong>.</>,
                <>Selecione ou crie um projeto. <strong className="text-white">Copie a chave gerada</strong> — ela aparece só uma vez.</>,
                <>O plano gratuito é suficiente para o curso. Você pode fazer upgrade em <a href="https://aistudio.google.com/plan_information" target="_blank" rel="noopener noreferrer">AI Studio</a> se precisar.</>,
              ].map((text, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: BRAND }}>{i + 1}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
                </div>
              ))}
            </div>
          }
        />
        <Warning>
          Nunca compartilhe sua API Key. Não coloque ela em e-mails, documentos compartilhados
          ou arquivos que vão para o Git. Trate como uma senha bancária.
        </Warning>
      </Step>

      {/* Step 5 */}
      <Step n={5} title="Configure a API Key no terminal">
        <p>
          A ferramenta de IA precisa encontrar sua chave automaticamente toda vez que você abre
          o terminal. Para isso, vamos salvá-la como uma{" "}
          <strong className="text-white">variável de ambiente</strong>.
        </p>
        <p className="mt-3">
          Substitua <code>sua-chave-aqui</code> pela chave que você copiou:
        </p>
        <LLMTabs
          claude={
            <OSTabs
              mac={`echo 'export ANTHROPIC_API_KEY="sua-chave-aqui"' >> ~/.zshrc && source ~/.zshrc`}
              windows={`[System.Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY","sua-chave-aqui","User")`}
            />
          }
          openai={
            <OSTabs
              mac={`echo 'export OPENAI_API_KEY="sua-chave-aqui"' >> ~/.zshrc && source ~/.zshrc`}
              windows={`[System.Environment]::SetEnvironmentVariable("OPENAI_API_KEY","sua-chave-aqui","User")`}
            />
          }
          gemini={
            <OSTabs
              mac={`echo 'export GEMINI_API_KEY="sua-chave-aqui"' >> ~/.zshrc && source ~/.zshrc`}
              windows={`[System.Environment]::SetEnvironmentVariable("GEMINI_API_KEY","sua-chave-aqui","User")`}
            />
          }
        />
        <Tip>
          <strong>Mac:</strong> se o seu terminal usar bash em vez de zsh, troque{" "}
          <code>~/.zshrc</code> por <code>~/.bashrc</code>.
          <br />
          <strong>Windows:</strong> após rodar o comando, feche e reabra o PowerShell para
          a variável entrar em vigor.
        </Tip>
      </Step>

      {/* Step 6 */}
      <Step n={6} title="Teste: abra o agente pela primeira vez">
        <p>Crie uma pasta para os exercícios e abra o agente:</p>
        <OSTabs
          mac="mkdir ~/ai-builder-camp && cd ~/ai-builder-camp"
          windows="mkdir $HOME\ai-builder-camp; cd $HOME\ai-builder-camp"
        />
        <LLMTabs
          claude={<Command>claude</Command>}
          openai={<Command>codex</Command>}
          gemini={<Command>gemini</Command>}
        />
        <p className="mt-2">
          O agente vai abrir uma interface interativa no terminal.
          Envie a mensagem abaixo para confirmar que está tudo funcionando:
        </p>
        <Prompt>{`Olá! Me diga em uma frase o que você consegue fazer por mim hoje.`}</Prompt>
        <p>
          Se você receber uma resposta, está pronto. Pressione{" "}
          <code>Ctrl+C</code> para sair.
        </p>
        <Tip>
          Nos exercícios, sempre abra o agente de dentro da pasta do projeto.
          O agente usa os arquivos presentes para entender o contexto do que você está construindo.
        </Tip>
      </Step>

      {/* Step 7 — optional */}
      <Step n={7} title="(Opcional) Instale o VS Code">
        <p>
          Para os exercícios do Ato II, vai ser útil ter um editor de código para
          ver os arquivos que o agente cria. O VS Code é gratuito, popular e funciona
          bem junto com os agentes de IA.
        </p>
        <p className="mt-2">
          Baixe em{" "}
          <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">
            code.visualstudio.com
          </a>
          . Após instalar, você pode abrir qualquer pasta com:
        </p>
        <Command>code .</Command>
      </Step>

      {/* Done */}
      <div
        className="mt-4 p-5 rounded-xl"
        style={{ border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.05)" }}
      >
        <p className="font-semibold text-sm mb-2" style={{ color: "#4ade80" }}>✓ Setup completo</p>
        <p className="text-sm leading-relaxed" style={{ color: "#64687a" }}>
          Você está pronto para começar. O primeiro exercício leva 15 minutos e você
          vai criar uma aplicação web funcional com um único prompt — sem escrever código.
        </p>
        <Link
          href="/exercises/1-1"
          className="inline-flex mt-4 items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90"
          style={{ background: "#4b6afc", color: "#ffffff" }}
        >
          Começar o exercício 1.1 →
        </Link>
      </div>
    </AppShell>
  );
}
