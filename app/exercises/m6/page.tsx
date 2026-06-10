// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, AgentCommand, OSTabs, ExerciseHeader, ExerciseStart, CompletedButton } from "../../components/ExerciseComponents";

export default function Mission6() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(6,182,212,0.15)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.3)" }}
        >
          ◈ Missão 06
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Ato IV — Continue Praticando</span>
      </div>

      <ExerciseHeader
        act="Ato IV — Continue Praticando"
        number="M6"
        title="Do zero ao SaaS — Gerador de OKRs no ar"
        duration="45 min"
        description="Você vai construir um produto real, colocar no ar com uma URL pública e compartilhar com quem quiser. Do prompt ao deploy, tudo com o agente. No final desta missão, você tem um SaaS funcionando."
      />

      <ExerciseStart folder="missao-6" />

      {/* SaaS context callout */}
      <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid rgba(6,182,212,0.2)", background: "rgba(6,182,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#22d3ee" }}>O que é um micro SaaS?</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-3)" }}>
          Um micro SaaS é um software como serviço pequeno, nichado e recorrente — normalmente criado
          por uma pessoa ou equipe pequena, para resolver um problema muito específico de um público bem definido.
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-3)" }}>
          Exemplo simples: em vez de criar "uma plataforma completa de RH", você cria um micro SaaS que
          gera descrições de vagas com IA para empresas de tecnologia. Em vez de criar "um CRM", você cria
          uma ferramenta que analisa propostas comerciais e sugere melhorias antes do envio.
        </p>
        <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.15)" }}>
          <p className="text-sm font-mono" style={{ color: "#22d3ee" }}>
            problema pequeno + público específico + solução simples + cobrança recorrente
          </p>
        </div>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-3)" }}>
          Com IA e vibe-coding, o tempo entre "tenho uma ideia" e "está no ar" caiu de meses para horas.
          Esta missão mostra exatamente esse caminho — usando um Gerador de OKRs como produto-exemplo.
        </p>
        <a
          href="https://www.hipsters.tech/o-saas-esta-morto-hipsters-ponto-tech-515/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: "#22d3ee" }}
        >
          🎙 Ouça: "O SaaS está morto?" — Hipsters.tech →
        </a>
      </div>

      {/* What we'll build */}
      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-1)" }}>O que vamos construir</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Um <strong style={{ color: "var(--text-2)" }}>Gerador de OKRs</strong> — a ferramenta preenche o contexto do time
          (nome, período, desafios, métricas atuais) e gera automaticamente 3 Objetivos com 3-4 Key Results cada,
          prontos para revisar e usar. Resultado: uma URL pública que você pode enviar para qualquer líder de time.
        </p>
      </div>

      <Step n={1} title="Defina e valide o produto antes de construir">
        <p>Antes de escrever uma linha de código, o agente ajuda a afiar a ideia:</p>
        <OSTabs
          mac="mkdir ~/ai-builder-camp/missao-6 && cd ~/ai-builder-camp/missao-6"
          windows="mkdir $HOME\ai-builder-camp\missao-6; cd $HOME\ai-builder-camp\missao-6"
        />
        <AgentCommand />
        <Prompt>{`Vou construir um Gerador de OKRs como SaaS mínimo. Antes de começar, me ajude a definir:

1. PROPOSTA DE VALOR em uma frase: para quem é, qual problema resolve, qual o resultado
2. INPUTS necessários: quais informações o usuário precisa fornecer
3. OUTPUTS esperados: o que a ferramenta vai gerar exatamente
4. DIFERENCIAIS: o que vai fazer este gerador ser melhor que uma planilha em branco
5. NOME E SLOGAN: 3 opções de nome para o produto

Seja específico — vamos construir exatamente o que você descrever aqui.`}</Prompt>
        <Tip>
          Esse passo parece opcional mas não é. Ter clareza sobre o produto antes de construir
          reduz retrabalho pela metade. O agente funciona muito melhor com especificação clara.
        </Tip>
      </Step>

      <Step n={2} title="Construa o produto com vibe-coding">
        <p>Com a especificação pronta, o agente constrói o produto completo:</p>
        <Prompt>{`Com base na especificação que definimos, construa o Gerador de OKRs completo em um único arquivo index.html.

ESTRUTURA DO APP:
Seção 1 — Formulário de inputs:
- Nome do time
- Período (ex: Q3 2025)
- Missão ou foco do time em 1-2 linhas
- Principais desafios ou problemas que enfrentam
- Métricas atuais (opcional — o que já medem hoje)
- Nível de ambição: conservador / equilibrado / agressivo

Seção 2 — OKRs gerados:
- 3 Objetivos claros e inspiradores (não mais que 1 frase cada)
- Para cada Objetivo: 3 Key Results mensuráveis com número, prazo e baseline
- Botão "Copiar tudo" para colar no Notion/Confluence
- Botão "Baixar como .txt"

DESIGN:
- Limpo, profissional, responsivo (mobile e desktop)
- Cores neutras com destaque em azul ou verde
- Parece um produto real que alguém pagaria para usar
- Header com nome e slogan do produto

LÓGICA:
- Gera os OKRs com JavaScript puro usando o contexto fornecido
- Quanto mais contexto o usuário der, melhores os OKRs gerados
- Inclui exemplos reais de OKRs no placeholder de cada campo para guiar o usuário

Salve como index.html.`}</Prompt>
        <p className="mt-3">Abra e teste no navegador:</p>
        <OSTabs mac="open index.html" windows="start index.html" />
        <p className="mt-2">Preencha com dados do seu time e veja os OKRs sendo gerados. Itere até ficar satisfeito.</p>
      </Step>

      <Step n={3} title="Suba para o GitHub">
        <p>
          Para publicar no Vercel, o código precisa estar no GitHub.
          Se você ainda não tem uma conta, crie em{" "}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com</a> — é gratuito.
        </p>
        <p className="mt-3">Peça ao agente para preparar o repositório:</p>
        <Prompt>{`Preciso publicar este projeto no GitHub para fazer o deploy. Me ajude a:

1. Criar um arquivo README.md simples descrevendo o produto (use o nome e slogan que definimos)
2. Criar um .gitignore básico para projetos web
3. Me dar os comandos exatos para inicializar o repositório Git, fazer o primeiro commit e conectar ao GitHub

Meu sistema operacional é [Mac/Windows — ajuste conforme o usuário].
Meu usuário do GitHub é [SEU-USUARIO-GITHUB].
O nome do repositório será: okr-generator`}</Prompt>
        <p className="mt-3">Execute os comandos que o agente gerar. O fluxo vai ser parecido com:</p>
        <OSTabs
          mac={`git init
git add .
git commit -m "feat: OKR generator v1"
gh repo create okr-generator --public --push --source=.`}
          windows={`git init
git add .
git commit -m "feat: OKR generator v1"
gh repo create okr-generator --public --push --source=.`}
        />
        <Tip>
          O comando <code>gh</code> é o GitHub CLI — já vem instalado com o Git na maioria dos sistemas.
          Se não funcionar, o agente te dá a alternativa manual pelo site do GitHub.
        </Tip>
      </Step>

      <Step n={4} title="Configure o Vercel e faça o deploy">
        <p>
          O Vercel é a plataforma que vai hospedar seu produto. Tem plano gratuito generoso
          e funciona com GitHub em poucos cliques.
        </p>
        <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            <><a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a> → <strong className="text-white">Sign Up</strong> → escolha <strong className="text-white">Continue with GitHub</strong> (usa a conta que você já criou).</>,
            <>Clique em <strong className="text-white">Add New Project</strong>.</>,
            <>Em <strong className="text-white">Import Git Repository</strong>, encontre o repositório <code>okr-generator</code> e clique em <strong className="text-white">Import</strong>.</>,
            <>Na próxima tela, deixe tudo no padrão — o Vercel detecta que é um site estático automaticamente. Clique em <strong className="text-white">Deploy</strong>.</>,
            <>Aguarde 30-60 segundos. O Vercel vai mostrar um link como <code>okr-generator.vercel.app</code>. Clique em <strong className="text-white">Visit</strong>.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(6,182,212,0.15)", color: "#22d3ee" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
            </div>
          ))}
        </div>
        <Warning>
          O Vercel cria uma URL pública acessível por qualquer pessoa.
          Não publique código com chaves de API ou dados confidenciais.
          Este projeto não tem back-end, então não há risco.
        </Warning>
      </Step>

      <Step n={5} title="Teste, itere e compartilhe">
        <p>
          Agora você tem um produto no ar. Abra a URL do Vercel e teste como se fosse um usuário novo:
        </p>
        <Prompt>{`Fiz o deploy do produto em [URL-DO-VERCEL]. Agora preciso melhorá-lo antes de compartilhar.

Por favor:
1. Me ajude a identificar o que pode parecer confuso para alguém que nunca usou a ferramenta
2. Sugira melhorias no texto das instruções e placeholders
3. Identifique se alguma funcionalidade importante está faltando para o MVP
4. Gere 3 exemplos de OKRs que a ferramenta deveria conseguir criar bem

Depois de listar, me pergunte o que quero ajustar e faremos as mudanças.`}</Prompt>
        <p className="mt-3">
          A cada mudança no código, basta fazer um novo commit e push — o Vercel
          re-deploya automaticamente em menos de 1 minuto:
        </p>
        <OSTabs
          mac="git add . && git commit -m 'fix: melhorias de UX' && git push"
          windows="git add . && git commit -m 'fix: melhorias de UX' && git push"
        />
        <Tip>
          O Vercel observa o repositório GitHub continuamente. Cada push = novo deploy automático.
          Você nunca mais precisa acessar o painel do Vercel para atualizar o produto.
        </Tip>
      </Step>

      <Step n={6} title="Próximos passos do produto">
        <p>
          Com o produto no ar, você tem a base de um negócio. O agente pode ajudar nos próximos passos:
        </p>
        <Prompt>{`Meu Gerador de OKRs está no ar em [URL]. Quero evoluir o produto. Me ajude a pensar:

1. MONETIZAÇÃO SIMPLES: como adicionar uma página de planos com link para pagamento (Stripe, Hotmart ou Lemon Squeezy) sem precisar de back-end
2. CAPTURA DE LEADS: como adicionar um formulário de email para quem quer acesso a funcionalidades premium
3. ANALYTICS: como adicionar Google Analytics ou Plausible para ver quantas pessoas usam
4. PRÓXIMA FEATURE: qual seria a funcionalidade mais valiosa para adicionar na V2 com base no que construímos

Para cada item, me dê o nível de esforço (alto/médio/baixo) e o impacto esperado.`}</Prompt>
      </Step>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(6,182,212,0.2)", background: "rgba(6,182,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#22d3ee" }}>✓ Missão 06 concluída</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-4)" }}>
          Você construiu e publicou um produto de software real — com URL pública, deploy contínuo
          e a capacidade de iterar em minutos. Isso levaria semanas com uma equipe de desenvolvimento
          tradicional. Você fez em menos de uma hora.
        </p>
        <p className="text-sm font-medium" style={{ color: "rgba(6,182,212,0.7)" }}>
          O SaaS não está morto — está mais acessível do que nunca.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/m5" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← M5 RAG Avançado
        </Link>
        <Link href="/auto-research" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#fb923c" }}>
          🔬 AutoResearch →
        </Link>
      </div>
    </AppShell>
  );
}
