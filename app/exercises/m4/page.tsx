// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, AgentCommand, OSTabs, ExerciseHeader, ExerciseStart, LLMTabs, CompletedButton } from "../../components/ExerciseComponents";

export default function Mission4() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(109,40,217,0.15)", color: "#a78bfa", border: "1px solid rgba(109,40,217,0.3)" }}
        >
          ◈ Missão 04
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Ato IV — Continue Praticando</span>
      </div>

      <ExerciseHeader
        act="Ato IV — Continue Praticando"
        number="M4"
        title="RAG Simples — agente com a memória da empresa"
        duration="25 min"
        description="Toda empresa tem conhecimento espalhado em documentos que ninguém lê. Esta missão organiza esse conhecimento e cria um agente que responde perguntas com base nele — sem alucinação, sem esquecer."
      />

      <ExerciseStart folder="missao-4" />

      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(109,40,217,0.2)", background: "rgba(109,40,217,0.05)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "#a78bfa" }}>Como funciona esta abordagem</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Usamos o <strong style={{ color: "var(--text-2)" }}>contexto grande do modelo</strong> como memória:
          carregamos todos os documentos relevantes no início da conversa e o agente os usa para responder.
          Funciona muito bem para bases de até algumas centenas de páginas.
          Para bases maiores, veja a <Link href="/exercises/m5" style={{ color: "#a78bfa" }}>Missão 5 — RAG Avançado</Link>.
        </p>
      </div>

      <Step n={1} title="Estruture os documentos">
        <p>Na pasta que você já abriu acima, crie uma subpasta para os documentos de conhecimento:</p>
        <OSTabs
          mac="mkdir knowledge"
          windows="mkdir knowledge"
        />
        <p className="mt-3">
          Dentro da pasta <code>knowledge/</code>, crie arquivos <code>.md</code> com o conhecimento da empresa.
          Cada arquivo deve cobrir um tema específico. Exemplos de estrutura:
        </p>
        <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <div className="px-4 py-2" style={{ background: "var(--tint-3)", borderBottom: "1px solid var(--border)" }}>
            <span className="text-xs font-mono" style={{ color: "var(--text-4)" }}>estrutura sugerida</span>
          </div>
          <pre className="p-4 text-sm font-mono leading-relaxed" style={{ background: "var(--code-bg)", color: "var(--text-3)" }}>{`knowledge/
├── produtos.md        → catálogo, preços, diferenciais
├── processos.md       → como a empresa funciona, fluxos
├── faq.md             → perguntas frequentes de clientes
├── politicas.md       → reembolso, SLA, garantias
└── historia.md        → sobre a empresa, valores, cases`}</pre>
        </div>
        <Tip>
          Não precisa ser perfeito na primeira versão. Comece com 2-3 arquivos sobre os temas
          que mais geram dúvidas — de clientes, de colaboradores novos ou do próprio time.
        </Tip>
      </Step>

      <Step n={2} title="Alimente os arquivos com conhecimento real">
        <p>Abra o agente e peça ajuda para estruturar o conteúdo:</p>
        <AgentCommand />
        <Prompt>{`Vou criar uma base de conhecimento da empresa. Me ajude a estruturar o arquivo knowledge/produtos.md.

Com base no arquivo de contexto da empresa (CLAUDE.md ou equivalente), crie um documento com:
1. Lista de todos os produtos/serviços com descrição detalhada
2. Para cada produto: o que resolve, quem usa, qual o resultado esperado
3. Perguntas frequentes específicas de cada produto
4. O que diferencia cada produto da concorrência

Depois vamos fazer o mesmo para os outros arquivos da pasta knowledge/.`}</Prompt>
        <Tip>
          Se tiver documentos existentes (PDFs, Google Docs, apresentações), peça ao agente
          para extrair o conteúdo e reorganizar no formato .md. Cole o texto bruto, ele organiza.
        </Tip>
      </Step>

      <Step n={3} title="Teste o agente com a base de conhecimento">
        <p>
          Com os arquivos criados, veja o agente usando o conhecimento para responder:
        </p>
        <Prompt>{`Leia todos os arquivos dentro da pasta knowledge/ e me responda como se você fosse um especialista na nossa empresa.

Quando eu fizer uma pergunta, você deve:
1. Buscar a informação nos arquivos de knowledge/ antes de responder
2. Citar o arquivo e a seção onde encontrou a informação
3. Ser preciso — se não encontrar a resposta, dizer "não encontrei essa informação na base de conhecimento" em vez de inventar
4. Sugerir qual arquivo deveria ser atualizado quando uma informação estiver faltando

Pronto para responder perguntas sobre a empresa.`}</Prompt>
        <p className="mt-3">Agora faça perguntas reais — as mesmas que clientes ou novos colaboradores fazem:</p>
        <Prompt>{`[Faça 3-5 perguntas reais sobre sua empresa, como:]
- Qual é o prazo de entrega do produto X?
- Qual é a política de reembolso?
- Como funciona o processo de onboarding de um novo cliente?
- Qual é a diferença entre os planos A e B?`}</Prompt>
      </Step>

      <Step n={4} title="Crie um comando reutilizável">
        <p>Para não precisar dar o contexto toda vez, crie um atalho:</p>
        <LLMTabs
          claude={
            <Prompt>{`Crie o arquivo .claude/commands/perguntar.md com as instruções para o comando /perguntar.

O comando deve:
1. Ler automaticamente todos os arquivos dentro de knowledge/
2. Responder como especialista da empresa, citando as fontes
3. Quando a resposta não estiver na base, dizer explicitamente e sugerir qual arquivo atualizar
4. Manter um tom profissional mas acessível

Use este comando toda vez que alguém precisar de informação sobre a empresa.`}</Prompt>
          }
          openai={
            <Prompt>{`Adicione ao AGENTS.md uma seção "## Base de Conhecimento" com as instruções:

Quando eu disser "perguntar sobre [tema]" ou "/perguntar [pergunta]", leia todos os arquivos da pasta knowledge/ e responda como especialista da empresa, citando as fontes. Se não encontrar a informação, diga explicitamente e sugira qual arquivo deveria ser atualizado.`}</Prompt>
          }
          gemini={
            <Prompt>{`Adicione ao GEMINI.md uma seção "## Base de Conhecimento" com as instruções:

Quando eu disser "perguntar sobre [tema]" ou "/perguntar [pergunta]", leia todos os arquivos da pasta knowledge/ e responda como especialista da empresa, citando as fontes. Se não encontrar a informação, diga explicitamente e sugira qual arquivo deveria ser atualizado.`}</Prompt>
          }
        />
      </Step>

      <Step n={5} title="Amplie e mantenha a base atualizada">
        <p>O valor da base cresce com o tempo. Use o agente para mantê-la:</p>
        <Prompt>{`Analise os arquivos da pasta knowledge/ e me diga:

1. Quais tópicos estão bem cobertos
2. Quais perguntas comuns de clientes provavelmente não têm resposta na base
3. O que deveria ser adicionado ou atualizado com prioridade
4. Sugira 5 perguntas que um novo colaborador faria e que a base não consegue responder bem

Gere um plano de melhoria da base de conhecimento.`}</Prompt>
        <Tip>
          Uma boa cadência: revise os arquivos da knowledge/ uma vez por mês ou sempre que houver
          mudanças de produto, política ou processo. O agente pode ajudar a identificar o que está
          desatualizado.
        </Tip>
      </Step>

      <Warning>
        Esta abordagem tem um limite prático: quando a base de conhecimento ficar grande demais
        (centenas de arquivos ou documentos longos), o contexto do modelo vai estourar.
        Se você chegar nesse ponto, é sinal de que precisa da{" "}
        <strong>Missão 5 — RAG Avançado</strong> com busca vetorial real.
      </Warning>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(109,40,217,0.2)", background: "rgba(109,40,217,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#a78bfa" }}>✓ Missão 04 concluída</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-4)" }}>
          Você tem agora um agente que conhece sua empresa. Qualquer colaborador pode perguntar sobre
          produtos, processos ou políticas — e receber uma resposta precisa, baseada em fontes reais.
        </p>
        <Link
          href="/exercises/m5"
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: "#a78bfa" }}
        >
          Pronto para escalar? Veja a Missão 05 — RAG Avançado →
        </Link>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/m3" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← M3 Analise um contrato
        </Link>
        <Link href="/exercises/m5" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          M5 RAG Avançado →
        </Link>
      </div>
    </AppShell>
  );
}
