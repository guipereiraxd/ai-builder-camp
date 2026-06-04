// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, AgentCommand, OSTabs, ExerciseHeader, CompletedButton } from "../../components/ExerciseComponents";

export default function Mission8() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.3)" }}
        >
          ◈ Missão 08
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Ato IV — Continue Praticando</span>
      </div>

      <ExerciseHeader
        act="Ato IV — Continue Praticando"
        number="M8"
        title="AutoResearch Karpathy — o projeto real no ar"
        duration="40 min"
        description="Instale e rode o AutoResearch original do Andrej Karpathy. Esta missão envolve Python, GitHub e configuração do projeto — é a versão mais poderosa e a que mais se aproxima do estado da arte em agentes de pesquisa."
      />

      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.05)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "#fb923c" }}>Pré-requisitos desta missão</p>
        <div className="space-y-1 mt-2">
          {[
            "Conta no GitHub (se ainda não tem, criamos no passo 1)",
            "Chave de API da Anthropic ou OpenAI (já configurada no Setup do curso)",
            "Missão 07 concluída — o contexto ajuda a entender o que o projeto faz",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-xs mt-0.5 shrink-0" style={{ color: "#fb923c" }}>✓</span>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>{item}</p>
            </div>
          ))}
        </div>
      </div>

      <Step n={1} title="Crie ou acesse sua conta no GitHub">
        <p>
          Se você fez a Missão 6 (Do zero ao SaaS), já tem conta. Pule para o passo 2.
          Se não tem ainda:
        </p>
        <div className="space-y-3 mt-3 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            <><a href="https://github.com/signup" target="_blank" rel="noopener noreferrer">github.com/signup</a> → crie uma conta gratuita com seu email.</>,
            <>Escolha um nome de usuário simples e profissional — vai aparecer nas URLs dos seus projetos.</>,
            <>Verifique o email e conclua o cadastro.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
            </div>
          ))}
        </div>
      </Step>

      <Step n={2} title="Instale o Python">
        <p>
          O AutoResearch do Karpathy é escrito em Python. Verifique se você já tem instalado:
        </p>
        <OSTabs mac="python3 --version" windows="python --version" />
        <p className="mt-3">
          Se aparecer um número como <code>Python 3.11.x</code>, pode pular para o passo 3.
          Se der erro, instale agora:
        </p>
        <OSTabs
          mac="brew install python3"
          windows="winget install Python.Python.3.12"
        />
        <Tip>
          <strong>Mac sem Homebrew?</strong> Baixe o instalador em <a href="https://python.org/downloads" target="_blank" rel="noopener noreferrer">python.org/downloads</a>.{" "}
          <strong>Windows:</strong> após o <code>winget install</code>, feche e reabra o terminal antes de continuar.
        </Tip>
      </Step>

      <Step n={3} title="Clone o repositório do Karpathy">
        <p>
          Clonar significa baixar o projeto inteiro para a sua máquina — igual a um download,
          mas com histórico e possibilidade de receber atualizações futuras.
        </p>
        <OSTabs
          mac="cd ~/ai-builder-camp && git clone https://github.com/karpathy/autoresearch && cd autoresearch"
          windows="cd $HOME\ai-builder-camp && git clone https://github.com/karpathy/autoresearch && cd autoresearch"
        />
        <p className="mt-3">Confirme que o download funcionou:</p>
        <OSTabs mac="ls" windows="dir" />
        <p className="mt-2" style={{ color: "var(--text-3)" }}>
          Você deve ver os arquivos do projeto — incluindo o <code>README.md</code> e o script principal.
        </p>
      </Step>

      <Step n={4} title="Crie o ambiente virtual e instale as dependências">
        <p>
          Ambiente virtual isola as dependências do projeto para não conflitar com outros programas Python:
        </p>
        <OSTabs
          mac={`python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt`}
          windows={`python -m venv venv
venv\\Scripts\\activate
pip install -r requirements.txt`}
        />
        <p className="mt-3">
          O terminal deve mostrar <code>(venv)</code> no início da linha, confirmando que o ambiente está ativo.
          A instalação das dependências pode levar 1-2 minutos.
        </p>
        <Tip>
          Sempre que voltar a usar o AutoResearch em uma sessão nova, ative o ambiente virtual primeiro
          com <code>source venv/bin/activate</code> (Mac) ou <code>venv\Scripts\activate</code> (Windows).
        </Tip>
      </Step>

      <Step n={5} title="Configure a chave de API">
        <p>
          O AutoResearch precisa de uma chave de API para usar o modelo de IA. Leia o README
          para ver qual modelo o projeto usa por padrão e configure a variável de ambiente:
        </p>
        <OSTabs
          mac={`# Para Anthropic (Claude):
export ANTHROPIC_API_KEY="sua-chave-aqui"

# Para OpenAI:
export OPENAI_API_KEY="sua-chave-aqui"`}
          windows={`# Para Anthropic (Claude):
$env:ANTHROPIC_API_KEY="sua-chave-aqui"

# Para OpenAI:
$env:OPENAI_API_KEY="sua-chave-aqui"`}
        />
        <p className="mt-3">
          Use a mesma chave que você configurou no Setup do curso. Se tiver dúvida sobre qual usar,
          leia o arquivo <code>README.md</code> do projeto — ele especifica o modelo padrão.
        </p>
        <AgentCommand />
        <Prompt>{`Leia o arquivo README.md do projeto AutoResearch e me explique:
1. Qual modelo de IA ele usa por padrão?
2. Como se executa o script principal?
3. Quais são os parâmetros disponíveis?
4. Há alguma configuração adicional necessária além da API key?`}</Prompt>
      </Step>

      <Step n={6} title="Execute o primeiro AutoResearch">
        <p>
          Com tudo configurado, rode o projeto. O comando exato pode variar — verifique o README,
          mas geralmente é algo como:
        </p>
        <OSTabs
          mac={`python autoresearch.py "Qual é o estado atual da adoção de IA em PMEs no Brasil?"`}
          windows={`python autoresearch.py "Qual é o estado atual da adoção de IA em PMEs no Brasil?"`}
        />
        <p className="mt-3">
          O agente vai trabalhar por alguns minutos — pesquisando, lendo e sintetizando.
          Acompanhe o progresso no terminal e aguarde o relatório final.
        </p>
        <Tip>
          Comece com uma pergunta relativamente simples para o primeiro teste. Depois que confirmar que funciona,
          use perguntas mais complexas e específicas para o seu setor.
        </Tip>
      </Step>

      <Step n={7} title="Experimente com perguntas estratégicas reais">
        <p>
          Com o projeto rodando, teste com perguntas de alto valor para o seu negócio:
        </p>
        <div className="space-y-2 mt-3 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            "Quais são os principais players do mercado de [SEU SETOR] e o que os diferencia em 2025?",
            "Quais tendências tecnológicas vão impactar [SEU SETOR] nos próximos 2 anos?",
            "Quais são os modelos de negócio mais bem-sucedidos em [ÁREA DE INTERESSE]?",
            "O que as pesquisas mais recentes dizem sobre [DECISÃO ESTRATÉGICA QUE VOCÊ ENFRENTA]?",
          ].map((q, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-xs mt-0.5 shrink-0" style={{ color: "#fb923c" }}>→</span>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>{q}</p>
            </div>
          ))}
        </div>
      </Step>

      <Warning>
        O AutoResearch do Karpathy é um projeto em desenvolvimento ativo — o código pode mudar.
        Se encontrar erros após o clone, leia o README atualizado do repositório. O agente pode
        ajudar a diagnosticar erros: cole a mensagem de erro e peça ajuda.
      </Warning>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#fb923c" }}>✓ Missão 08 concluída</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
          Você instalou e rodou uma das ferramentas de pesquisa autônoma mais avançadas disponíveis hoje.
          Clonando diretamente do Karpathy, você recebe melhorias automáticas sempre que ele atualizar o projeto.
          Cada vez que precisar de uma pesquisa profunda, é só rodar o script com sua pergunta.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/m7" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← M7 AutoResearch Simples
        </Link>
        <Link href="/exercises" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          Ver todas as missões →
        </Link>
      </div>
    </AppShell>
  );
}
