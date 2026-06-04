import Link from "next/link";
import AppShell from "../components/AppShell";
import { OSTabs, Tip, Warning } from "../components/ExerciseComponents";

export default function GitHubPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-5)" }}>
          Guia
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: "var(--text-1)" }}>
          Como criar sua conta no GitHub
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-5)" }}>
          Pré-requisito para usar o AutoResearch do Karpathy e projetos open source
        </p>
        <div className="mt-6" style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* What is GitHub */}
      <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.05)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#fb923c" }}>O que é GitHub</p>
        <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-2)" }}>
          GitHub é a maior plataforma do mundo para compartilhar código e ferramentas.
          É como um Google Drive técnico — mas público e colaborativo. Pesquisadores, empresas
          e desenvolvedores publicam projetos aqui para que qualquer pessoa possa baixar e usar.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          O projeto AutoResearch do Karpathy está no GitHub. Para baixá-lo e rodar na sua máquina,
          você precisa de uma conta — e é completamente gratuito.
        </p>
      </div>

      {/* Step 1: Create account */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>1</div>
          <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>Crie a conta no GitHub</h2>
        </div>
        <div className="ml-11 space-y-4">
          <div className="space-y-3 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
            {[
              <><a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" style={{ color: "#fb923c" }}>github.com/signup</a> — clique em <strong style={{ color: "var(--text-1)" }}>Sign up</strong>.</>,
              <>Digite seu <strong style={{ color: "var(--text-1)" }}>e-mail</strong> e clique em <strong style={{ color: "var(--text-1)" }}>Continue</strong>.</>,
              <>Crie uma <strong style={{ color: "var(--text-1)" }}>senha</strong> forte (pelo menos 15 caracteres).</>,
              <>Escolha um <strong style={{ color: "var(--text-1)" }}>nome de usuário</strong> — vai aparecer no endereço dos seus projetos. Use algo simples e profissional, como seu nome.</>,
              <>Responda se quer receber atualizações por email (pode pular com <strong style={{ color: "var(--text-1)" }}>n</strong>).</>,
              <>Resolva o puzzle de verificação e clique em <strong style={{ color: "var(--text-1)" }}>Create account</strong>.</>,
              <>Verifique o email com o código que chegou na sua caixa de entrada.</>,
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>{i + 1}</span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
              </div>
            ))}
          </div>
          <Tip>
            Escolha bem o nome de usuário — é difícil mudar depois. Evite números aleatórios ou underscores excessivos. <strong>Nome.Sobrenome</strong> ou <strong>PrimeiroNome</strong> funcionam bem.
          </Tip>
        </div>
      </div>

      {/* Step 2: Install Git */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>2</div>
          <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>Instale o Git na sua máquina</h2>
        </div>
        <div className="ml-11 space-y-4">
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Git é a ferramenta que permite baixar (clonar) projetos do GitHub. Verifique se já está instalado:
          </p>
          <OSTabs mac="git --version" windows="git --version" />
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Se aparecer algo como <code>git version 2.x.x</code>, está pronto — pule para o passo 3.
            Se der erro, instale agora:
          </p>
          <OSTabs
            mac="brew install git"
            windows="winget install Git.Git"
          />
          <Tip>
            <strong>Mac sem Homebrew?</strong> Baixe em <a href="https://git-scm.com/download/mac" target="_blank" rel="noopener noreferrer">git-scm.com/download/mac</a>.{" "}
            <strong>Windows:</strong> após instalar, feche e reabra o terminal.
          </Tip>
        </div>
      </div>

      {/* Step 3: Configure Git */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>3</div>
          <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>Configure seu nome e email no Git</h2>
        </div>
        <div className="ml-11 space-y-4">
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Isso identifica quem fez cada alteração nos projetos. Substitua pelos seus dados:
          </p>
          <OSTabs
            mac={`git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"`}
            windows={`git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"`}
          />
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Use o mesmo email que você usou para criar a conta no GitHub.
          </p>
        </div>
      </div>

      {/* Step 4: Test with a clone */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>4</div>
          <h2 className="text-base font-semibold" style={{ color: "var(--text-1)" }}>Teste: clone um repositório</h2>
        </div>
        <div className="ml-11 space-y-4">
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Clonar significa baixar um projeto do GitHub para a sua máquina. Teste com o próprio AutoResearch:
          </p>
          <OSTabs
            mac="git clone https://github.com/karpathy/autoresearch"
            windows="git clone https://github.com/karpathy/autoresearch"
          />
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Se baixar uma pasta chamada <code>autoresearch</code> com arquivos dentro, está tudo funcionando.
          </p>
          <Warning>
            Você <strong>não precisa</strong> estar logado no GitHub para clonar repositórios públicos.
            Só precisa de conta para criar e publicar seus próprios projetos.
          </Warning>
        </div>
      </div>

      {/* Glossary */}
      <div className="mb-10 p-5 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
        <p className="text-sm font-semibold mb-4" style={{ color: "var(--text-1)" }}>Glossário rápido</p>
        <div className="space-y-3">
          {[
            { term: "Repositório (repo)", def: "Uma pasta de projeto no GitHub com todo o histórico de alterações." },
            { term: "Clone", def: "Baixar um repositório do GitHub para a sua máquina local." },
            { term: "Commit", def: "Salvar e registrar um conjunto de alterações com uma mensagem descritiva." },
            { term: "Push", def: "Enviar commits locais para o repositório remoto no GitHub." },
            { term: "Pull", def: "Baixar as atualizações mais recentes do GitHub para a sua máquina." },
            { term: "Fork", def: "Criar uma cópia pessoal de um repositório para modificar sem alterar o original." },
          ].map(({ term, def }) => (
            <div key={term} className="flex gap-3">
              <code className="text-xs shrink-0 mt-0.5 font-semibold" style={{ color: "#fb923c", minWidth: "160px" }}>{term}</code>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{def}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/auto-research"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90"
          style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.25)" }}
        >
          ← Voltar ao AutoResearch
        </Link>
        <Link
          href="/exercises/m8"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90"
          style={{ background: "#fb923c", color: "#ffffff" }}
        >
          Ir para a Missão 08 — AutoResearch Karpathy →
        </Link>
      </div>
    </AppShell>
  );
}
