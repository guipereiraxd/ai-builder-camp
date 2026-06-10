// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, AgentCommand, OSTabs, ExerciseHeader, ExerciseStart, LLMTabs, CompletedButton } from "../../components/ExerciseComponents";

export default function Mission5() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(109,40,217,0.15)", color: "#a78bfa", border: "1px solid rgba(109,40,217,0.3)" }}
        >
          ◈ Missão 05
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Ato IV — Continue Praticando</span>
      </div>

      <ExerciseHeader
        act="Ato IV — Continue Praticando"
        number="M5"
        title="RAG Avançado — assistente escalável com busca vetorial"
        duration="35 min"
        description="Quando a base de conhecimento cresce demais para caber no contexto, é hora de usar busca vetorial real. Esta missão cria um assistente que indexa seus documentos e busca apenas o que é relevante para cada pergunta."
      />

      <ExerciseStart folder="missao-5" />

      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(109,40,217,0.2)", background: "rgba(109,40,217,0.05)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "#a78bfa" }}>Por que avançar do RAG Simples</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Na Missão 4, carregamos todos os documentos no contexto de uma vez. Isso funciona até um limite.
          Aqui usamos <strong style={{ color: "var(--text-2)" }}>busca vetorial</strong>: os documentos são
          indexados matematicamente, e para cada pergunta o sistema busca apenas os trechos mais relevantes.
          Resultado: escala para milhares de documentos, respostas mais precisas e citação de fontes.
        </p>
      </div>

      {/* LLM-specific note */}
      <LLMTabs
        claude={
          <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>Nota para usuários Claude</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
              Esta missão usa a <strong style={{ color: "var(--text-2)" }}>API de Assistants da OpenAI</strong> que tem
              busca vetorial nativa. Para Claude, a equivalente seria usar o{" "}
              <strong style={{ color: "var(--text-2)" }}>Claude via API com ferramentas de busca</strong> ou
              soluções como <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener noreferrer" style={{ color: "#4b6afc" }}>Claude.ai Projects</a>.
              Você pode seguir este exercício para entender o conceito e configurar a infraestrutura OpenAI como alternativa.
            </p>
          </div>
        }
        openai={null}
        gemini={
          <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>Nota para usuários Gemini</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
              Esta missão usa a <strong style={{ color: "var(--text-2)" }}>API de Assistants da OpenAI</strong>.
              Para Gemini, o equivalente é o <strong style={{ color: "var(--text-2)" }}>Vertex AI Search</strong> ou
              o <strong style={{ color: "var(--text-2)" }}>Gemini via Google AI Studio</strong> com
              grounding em documentos. Siga o exercício para entender a arquitetura — os conceitos são os mesmos.
            </p>
          </div>
        }
      />

      <Step n={1} title="Crie um Assistente no painel da OpenAI">
        <p>
          A OpenAI tem um painel visual para criar assistentes com busca vetorial — sem escrever código:
        </p>
        <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            <><a href="https://platform.openai.com/assistants" target="_blank" rel="noopener noreferrer">platform.openai.com/assistants</a> → clique em <strong className="text-white">Create assistant</strong>.</>,
            <>Dê um nome ao assistente (ex: <code>Assistente da [Sua Empresa]</code>).</>,
            <>Em <strong className="text-white">Instructions</strong>, escreva o comportamento: <em>"Você é o assistente especialista da [empresa]. Responda com base apenas nos documentos disponíveis. Cite sempre a fonte. Se não encontrar a informação, diga claramente."</em></>,
            <>Ative <strong className="text-white">File search</strong> (busca em arquivos) nas ferramentas.</>,
            <>Clique em <strong className="text-white">Save</strong>.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
            </div>
          ))}
        </div>
      </Step>

      <Step n={2} title="Crie um Vector Store e faça upload dos documentos">
        <p>O Vector Store é o banco de busca vetorial que o assistente vai consultar:</p>
        <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            <>No painel do assistente, clique em <strong className="text-white">Add vector store</strong> → <strong className="text-white">Create vector store</strong>.</>,
            <>Dê um nome (ex: <code>knowledge-empresa</code>).</>,
            <>Clique em <strong className="text-white">Upload files</strong> e suba os documentos da empresa: PDFs, .docx, .txt ou os arquivos .md da Missão 4.</>,
            <>Aguarde o processamento (pode levar 1-2 minutos dependendo do volume).</>,
            <>Confirme que os arquivos aparecem como <strong className="text-white">Completed</strong>.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
            </div>
          ))}
        </div>
        <Tip>
          Formatos suportados: PDF, .docx, .txt, .md, .html, .csv e outros.
          Você pode subir os arquivos da pasta <code>knowledge/</code> criada na Missão 4 diretamente.
        </Tip>
      </Step>

      <Step n={3} title="Teste no playground da OpenAI">
        <p>
          Antes de integrar em qualquer sistema, teste diretamente no playground:
        </p>
        <div className="space-y-2 mt-3 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
          {[
            <>No painel do assistente, clique em <strong className="text-white">Test</strong> (canto superior direito).</>,
            <>Faça as mesmas perguntas que testou na Missão 4.</>,
            <>Observe: o assistente cita os trechos e arquivos de onde tirou cada resposta.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
            </div>
          ))}
        </div>
        <Prompt>{`[Teste com perguntas que exigem buscar em múltiplos documentos:]

1. Compare os produtos X e Y — quais são as principais diferenças?
2. O que está descrito na política de reembolso para o caso de [situação específica]?
3. Qual é o processo completo desde a venda até a entrega?
4. Quais são os casos de uso mais comuns do produto Z segundo nossa base de conhecimento?`}</Prompt>
      </Step>

      <Step n={4} title="Integre o assistente via API">
        <p>
          Com o assistente configurado e testado, o agente pode ajudar a criar uma interface simples
          para que seu time use sem precisar do painel da OpenAI:
        </p>
        <OSTabs
          mac="mkdir ~/ai-builder-camp/missao-5 && cd ~/ai-builder-camp/missao-5"
          windows="mkdir $HOME\ai-builder-camp\missao-5; cd $HOME\ai-builder-camp\missao-5"
        />
        <AgentCommand />
        <Prompt>{`Preciso criar uma interface simples para o assistente RAG que configurei na OpenAI.

O assistente tem ID: [cole o ID do assistente — aparece no painel como asst_XXXXX]
A OPENAI_API_KEY está como variável de ambiente.

Crie um arquivo chat.html que:
1. Tem um campo de pergunta e um botão de enviar
2. Chama a API de Threads da OpenAI para criar uma conversa com o assistente
3. Exibe a resposta com as citações de fonte
4. Mantém o histórico da conversa na tela
5. Design limpo e profissional

Use JavaScript puro com fetch — sem frameworks externos.`}</Prompt>
        <Tip>
          O ID do assistente aparece no painel da OpenAI como <code>asst_</code> seguido de letras e números.
          Você pode passá-lo diretamente no código ou como variável de ambiente.
        </Tip>
      </Step>

      <Step n={5} title="Mantenha a base atualizada">
        <p>
          O grande diferencial do RAG avançado é que atualizar o conhecimento é simples:
          basta fazer upload de novos arquivos no Vector Store.
        </p>
        <Prompt>{`Crie um processo de manutenção do nosso assistente RAG. O documento deve cobrir:

1. Quando fazer upload de novos documentos (mudanças de produto, novas políticas, novos processos)
2. Como verificar se uma informação no Vector Store está desatualizada
3. Como testar se o assistente continua respondendo corretamente após atualizações
4. Quem é o responsável por manter a base de conhecimento

Gere um checklist mensal de manutenção.`}</Prompt>
      </Step>

      <Warning>
        O uso da API de Assistants da OpenAI tem custo de acordo com o volume de perguntas
        e o tamanho da base. Para um time pequeno com uso moderado, o custo mensal tende a ser
        de poucos dólares. Monitore o uso no painel da OpenAI para evitar surpresas.
      </Warning>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(109,40,217,0.2)", background: "rgba(109,40,217,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#a78bfa" }}>✓ Missão 05 concluída</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
          Você tem agora um assistente RAG real — com busca vetorial, citação de fontes e escalabilidade
          para milhares de documentos. Este é o coração dos produtos de IA que as empresas mais avançadas
          estão construindo hoje. Você acabou de construir o seu.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/m4" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← M4 RAG Simples
        </Link>
        <Link href="/exercises/m6" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#22d3ee" }}>
          M6 Do zero ao SaaS →
        </Link>
      </div>
    </AppShell>
  );
}
