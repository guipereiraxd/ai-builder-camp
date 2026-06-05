// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, AgentCommand, OSTabs, ExerciseHeader, CompletedButton } from "../../components/ExerciseComponents";

export default function Mission2() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(209,164,118,0.15)", color: "#d1a476", border: "1px solid rgba(209,164,118,0.3)" }}
        >
          ◈ Missão 02
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Ato IV — Continue Praticando</span>
      </div>

      <ExerciseHeader
        act="Ato IV — Continue Praticando"
        number="M2"
        title="Crie um gerador de propostas da sua empresa"
        duration="25 min"
        description="Toda proposta comercial que sai da empresa começa do zero — e fica desigual dependendo de quem escreveu. Esta missão cria um app que gera propostas no tom e estrutura exatos da sua empresa, com um clique."
      />

      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(209,164,118,0.15)", background: "rgba(209,164,118,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#d1a476" }}>A diferença do exercício 1.1</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          No exercício 1.1 você viu que dá para criar um app com um prompt. Aqui você vai mais fundo:
          o agente usa o <strong style={{ color: "var(--text-2)" }}>contexto real da sua empresa</strong> para
          gerar algo que nenhuma outra empresa teria igual. E você aprende o processo completo —
          brief → construção → iteração → resultado final.
        </p>
      </div>

      <Step n={1} title="Adicione dados de proposta ao seu arquivo de contexto">
        <p>
          O app vai usar seu arquivo de contexto para pré-carregar tudo automaticamente.
          Abra o arquivo da pasta <code>ex-1-2</code> e adicione uma seção específica de proposta:
        </p>
        <OSTabs
          mac="cd ~/ai-builder-camp/ex-1-2 && claude"
          windows="cd $HOME\ai-builder-camp\ex-1-2; claude"
        />
        <Prompt>{`Adicione ao arquivo de contexto uma nova seção chamada "## Para propostas comerciais" com:

1. PRODUTOS/SERVIÇOS (liste cada um com nome, o que entrega e faixa de preço ou como é precificado)
2. ESTRUTURA PADRÃO DA NOSSA PROPOSTA (como você costuma organizar: capa, problema, solução, investimento, próximos passos...)
3. TOM E LINGUAGEM (como você escreve propostas: formal, direto, consultivo, etc.)
4. O QUE NUNCA COLOCAMOS (coisas que você evita: precificação por hora, determinados termos, etc.)
5. NOSSOS DIFERENCIAIS (por que clientes escolhem vocês)

Use informações reais. Pode ser bullet points simples — não precisa ser formal.`}</Prompt>
        <Tip>
          Quanto mais específico você for aqui, mais o app vai parecer feito sob medida para sua empresa.
          Se tiver uma proposta antiga que deu certo, peça ao agente para analisá-la e extrair o padrão.
        </Tip>
      </Step>

      <Step n={2} title="Construa a primeira versão do app">
        <OSTabs
          mac="mkdir ~/ai-builder-camp/missao-2 && cd ~/ai-builder-camp/missao-2"
          windows="mkdir $HOME\ai-builder-camp\missao-2; cd $HOME\ai-builder-camp\missao-2"
        />
        <OSTabs
          mac="cp ~/ai-builder-camp/ex-1-2/CLAUDE.md ."
          windows="copy $HOME\ai-builder-camp\ex-1-2\CLAUDE.md ."
        />
        <AgentCommand />
        <Prompt>{`Leia o arquivo de contexto e construa um Gerador de Proposta Comercial como um único arquivo HTML+CSS+JS.

O app deve ter dois painéis:
LEFT — formulário de entrada:
- Nome do cliente / empresa
- Problema ou necessidade que ele trouxe (campo de texto livre)
- Produto/serviço que vamos propor (dropdown com nossas opções)
- Valor estimado do projeto (campo livre)
- Prazo estimado
- Nome do responsável interno que assina a proposta

RIGHT — proposta gerada em tempo real:
- Atualiza enquanto o usuário preenche
- Usa exatamente o tom e estrutura que estão no contexto
- Formata como proposta pronta para enviar

Funcionalidades obrigatórias:
- Botão "Copiar proposta" (copia o texto para o clipboard)
- Botão "Baixar como .txt"
- Design profissional que representa bem nossa marca

Use as cores, o tom e a estrutura exatamente como estão no arquivo de contexto.
Salve como proposta.html`}</Prompt>
        <p className="mt-3">
          Abra o arquivo no navegador assim que o agente terminar:
        </p>
        <OSTabs mac="open proposta.html" windows="start proposta.html" />
        <p className="mt-2">
          Preencha com dados fictícios de um cliente imaginário e veja a proposta sendo gerada.
          O app já deve usar o tom e os produtos da sua empresa automaticamente.
        </p>
      </Step>

      <Step n={3} title="Primeira iteração: refine a estrutura">
        <p>
          Veja o que saiu e ajuste. Não tente corrigir tudo de uma vez — um pedido por vez
          é mais eficaz e você aprende a guiar o agente:
        </p>
        <Prompt>{`A proposta gerada ficou boa, mas quero ajustar algumas coisas:
[DESCREVA O QUE VOCÊ QUER MUDAR — exemplos:]

1. A seção de investimento precisa ter um breakdown mais detalhado, não só o valor total
2. Adicione uma seção "Por que nós?" que aparece automaticamente com nossos diferenciais do contexto
3. O rodapé deve ter os dados de contato da empresa

Faça essas mudanças no arquivo proposta.html.`}</Prompt>
        <Tip>
          Se o agente pedir para você especificar mais, especifique. Se ele alterar algo que não
          queria, peça para desfazer só aquele ponto. O processo é uma conversa, não um comando único.
        </Tip>
      </Step>

      <Step n={4} title="Segunda iteração: adicione inteligência">
        <p>
          Agora vamos além do template estático — o app vai gerar texto personalizado com base
          no problema que o cliente trouxe:
        </p>
        <Prompt>{`Quero que a proposta não seja apenas um template preenchido. Quando o usuário descrever o problema do cliente, a proposta deve gerar automaticamente:

1. Uma abertura personalizada que menciona o problema específico daquele cliente
2. Uma seção "Nossa abordagem" adaptada ao tipo de problema descrito
3. Um argumento de ROI estimado (baseado no valor do projeto e no problema resolvido)

O texto gerado deve sempre manter nosso tom de voz do contexto.
Mantenha tudo funcionando sem precisar de conexão com internet — use apenas lógica JavaScript local.`}</Prompt>
        <Warning>
          Esta etapa usa geração de texto via JavaScript puro — sem chamar nenhuma API externa.
          O agente vai criar a lógica de personalização localmente. Se quiser integrar uma IA de
          verdade para geração de texto, isso é possível mas requer uma API key e conexão.
        </Warning>
      </Step>

      <Step n={5} title="Terceira iteração: polimento visual">
        <p>
          Uma proposta precisa parecer profissional. Peça ao agente para elevar o visual:
        </p>
        <Prompt>{`Quero que a visualização da proposta (painel direito) pareça uma proposta real que eu enviaria para um cliente.

Melhore o design para:
1. Ter um cabeçalho com o nome da empresa em destaque (use as cores da nossa marca do contexto)
2. Usar tipografia profissional com hierarquia clara (títulos, subtítulos, corpo)
3. Ter espaçamento e margens adequados para parecer um documento
4. Adicionar um rodapé com os dados de contato
5. Quando impresso (Ctrl+P), o resultado deve ser um documento limpo de 1-2 páginas

Não mexa na estrutura do conteúdo — apenas melhore o visual.`}</Prompt>
      </Step>

      <Step n={6} title="Compartilhe com o time">
        <p>
          Um arquivo HTML funciona em qualquer navegador, sem instalação. Para que o time use:
        </p>
        <div className="space-y-3 mt-3 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            <>
              <strong style={{ color: "var(--text-1)" }}>Opção mais simples:</strong> envie o arquivo{" "}
              <code>proposta.html</code> por email ou Slack. Qualquer pessoa abre no navegador e usa.
            </>,
            <>
              <strong style={{ color: "var(--text-1)" }}>Para acesso pela equipe toda:</strong> suba o arquivo
              no Google Drive e compartilhe o link. Quem tiver acesso abre diretamente.
            </>,
            <>
              <strong style={{ color: "var(--text-1)" }}>Para um link permanente:</strong> coloque o arquivo em
              um repositório GitHub e habilite o GitHub Pages — fica acessível em uma URL pública.
            </>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
            </div>
          ))}
        </div>
        <Prompt>{`Antes de compartilhar, faça um teste completo do app:
1. Gere uma proposta para um cliente fictício de cada segmento que atendemos
2. Para cada proposta, verifique: o tom está certo? Os valores aparecem corretamente? A estrutura faz sentido?
3. Liste qualquer ajuste que você quer fazer antes de liberar para o time

Depois, crie um arquivo README.md explicando como o time deve usar o gerador (3-5 linhas, linguagem simples).`}</Prompt>
      </Step>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(209,164,118,0.2)", background: "rgba(209,164,118,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#d1a476" }}>✓ Missão 02 concluída</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-4)" }}>
          Você construiu um app de negócio real em menos de 30 minutos — algo que seria semanas
          de trabalho com desenvolvimento tradicional. E aprendeu o processo que se repete
          para qualquer app: contexto → primeira versão → iteração → entrega.
        </p>
        <p className="text-sm font-medium" style={{ color: "rgba(209,164,118,0.7)" }}>
          Próximo nível: o que mais sua equipe faz repetidamente que poderia ser um app assim?
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/m1" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← M1 Automatize uma reunião
        </Link>
        <Link href="/exercises" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          Ver todas as missões →
        </Link>
      </div>
    </AppShell>
  );
}
