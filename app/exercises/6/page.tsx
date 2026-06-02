import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Command, OSTabs, Tip, Warning, Prompt, ExerciseHeader, AgentCommand, LLMTabs } from "../../components/ExerciseComponents";

const SETTINGS_MAC = `{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "sua-chave-aqui"
      }
    }
  }
}`;

const SHARED_PROMPT_COMPETITORS = `Pesquise na internet os 3 principais concorrentes da [NOME DA SUA EMPRESA] e me dê:

1. O que cada um lançou ou anunciou nos últimos 3 meses
2. Mudanças de preço ou posicionamento recentes
3. Qualquer contratação relevante ou mudança de liderança
4. O que estão dizendo nas redes sociais sobre eles (sentimento geral)

Para cada informação, cite a fonte e a data aproximada. Ao final, diga qual é o movimento competitivo mais importante que eu preciso ter no radar esta semana.`;

const SHARED_PROMPT_SECTOR = `Pesquise notícias do setor de [SEU SETOR] dos últimos 7 dias. Filtre apenas o que é relevante para uma empresa do nosso perfil (use o arquivo de contexto da empresa como referência). Para cada notícia relevante, diga: o que aconteceu, por que importa para nós, e se exige alguma ação nossa.`;

export default function Exercise6() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato III — Conecte ao Mundo Real"
        number="6"
        title="Busca em tempo real"
        duration="20 min"
        description="Até agora, o agente trabalhava só com o que você colava e com o que ele já sabia. Neste exercício você conecta o agente à internet — ele passa a pesquisar agora, em tempo real."
      />

      {/* Context box — adapts per LLM */}
      <LLMTabs
        claude={
          <>
            <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
              <p className="text-sm font-semibold text-white mb-2">O que é um MCP?</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                MCP (Model Context Protocol) é um conector que dá ao Claude acesso a ferramentas externas.
                Pense como uma tomada: você encaixa o conector certo e o Claude passa a "enxergar"
                e agir dentro daquela ferramenta — busca web, Google Drive, Slack, CRM.
              </p>
              <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--text-2)" }}>
                A configuração é feita uma vez. Depois disso, o Claude usa a ferramenta automaticamente
                quando precisar — você não precisa fazer nada diferente nos prompts.
              </p>
            </div>
            <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid #2a3a2a", background: "rgba(75,200,100,0.04)" }}>
              <p className="text-sm font-semibold text-white mb-2">Atalho: o Claude já tem conectores prontos para centenas de ferramentas</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
                Antes de configurar qualquer MCP manualmente, vale checar se já existe um conector
                pronto. O ecossistema cresceu rápido — há conectores para Notion, HubSpot, Salesforce,
                Jira, GitHub, Figma, Airtable, Stripe e dezenas de outros.
              </p>
              <a href="https://www.claudemcp.com/servers" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
                style={{ background: "rgba(75,106,252,0.15)", color: "#8ba3ff", border: "1px solid rgba(75,106,252,0.25)" }}>
                Explorar conectores disponíveis →
              </a>
            </div>
          </>
        }
        openai={
          <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid #2a3a4a", background: "rgba(16,163,127,0.05)" }}>
            <p className="text-sm font-semibold text-white mb-2">✓ OpenAI Codex tem busca web nativa</p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-2)" }}>
              Os modelos recentes da OpenAI (GPT-4o e superiores) têm acesso à internet integrado.
              O <code>codex</code> usa esses modelos — você não precisa configurar nada adicional.
              Basta pedir uma pesquisa e o agente faz.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
              Diferente do Claude (que usa o protocolo MCP), o Codex CLI usa a capacidade de
              busca nativa da API da OpenAI. O resultado prático é o mesmo: pesquisas em tempo real.
            </p>
          </div>
        }
        gemini={
          <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid #2a3040", background: "rgba(138,180,248,0.05)" }}>
            <p className="text-sm font-semibold text-white mb-2">✓ Gemini tem Google Search integrado</p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--text-2)" }}>
              O Gemini CLI usa o Google Search diretamente — sem configuração adicional.
              É uma das maiores vantagens do Gemini: acesso nativo e atualizado à web do Google,
              com resultados mais frescos que qualquer outra ferramenta.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
              Enquanto o Claude precisa de um MCP separado para pesquisar, o Gemini já vem com
              busca embutida. Para este exercício, você só precisa abrir o agente e pedir.
            </p>
          </div>
        }
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O que muda no Ato III</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Ato I: você trouxe dados para o agente. Ato II: o agente trabalhou de forma autônoma.
          Ato III: o agente vai buscar os dados onde eles estão — sem você precisar copiar nada.
        </p>
      </div>

      {/* Setup steps — different per LLM */}
      <LLMTabs
        claude={
          <>
            <Step n={1} title="Crie uma conta e obtenha a chave do Brave Search">
              <p>
                O Brave Search oferece uma API de busca web. O plano gratuito inclui{" "}
                <strong className="text-white">2.000 buscas por mês</strong> — suficiente para o curso inteiro.
              </p>
              <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
                {[
                  <><a href="https://api.search.brave.com" target="_blank" rel="noopener noreferrer">api.search.brave.com</a> → clique em <strong className="text-white">Get Started</strong>.</>,
                  <>Crie uma conta (pode usar Google ou email).</>,
                  <><strong className="text-white">Subscriptions</strong> → plano <strong className="text-white">Free</strong>.</>,
                  <><strong className="text-white">API Keys</strong> → <strong className="text-white">Add Key</strong>. Nomeie e copie a chave gerada.</>,
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{text}</p>
                  </div>
                ))}
              </div>
              <Warning>Guarde essa chave — você vai precisar dela no próximo passo.</Warning>
            </Step>

            <Step n={2} title="Configure o MCP no settings.json">
              <p>Verifique e abra o arquivo de configuração do Claude Code:</p>
              <OSTabs mac="code ~/.claude/settings.json" windows="code $HOME\.claude\settings.json" />
              <p className="mt-3">Cole o conteúdo abaixo, substituindo <code>sua-chave-aqui</code> pela chave copiada:</p>
              <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                <div className="px-4 py-2" style={{ background: "var(--tint-3)", borderBottom: "1px solid var(--border)" }}>
                  <span className="text-xs font-mono" style={{ color: "var(--text-4)" }}>~/.claude/settings.json</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed" style={{ background: "var(--code-bg)", color: "var(--code-text)" }}>{SETTINGS_MAC}</pre>
              </div>
              <Tip>
                Se o arquivo já tinha conteúdo, adicione apenas o bloco <code>"mcpServers"</code> dentro das chaves existentes.
                Erro comum: vírgula no final do último item. JSON não aceita vírgula antes de {"}"}.
              </Tip>
            </Step>

            <Step n={3} title="Reinicie e confirme a conexão">
              <OSTabs
                mac="mkdir ~/ai-builder-camp/ex-6 && cd ~/ai-builder-camp/ex-6"
                windows="mkdir $HOME\ai-builder-camp\ex-6; cd $HOME\ai-builder-camp\ex-6"
              />
              <AgentCommand />
              <Prompt>{`Quais ferramentas você tem disponíveis agora? Liste os MCPs conectados.`}</Prompt>
              <p className="mt-2">O Claude deve mencionar o <strong className="text-white">Brave Search</strong> na lista.</p>
            </Step>
          </>
        }
        openai={
          <Step n={1} title="Abra o Codex — nenhuma configuração necessária">
            <p>A busca web já está disponível. Abra o agente na pasta do exercício:</p>
            <OSTabs
              mac="mkdir ~/ai-builder-camp/ex-6 && cd ~/ai-builder-camp/ex-6"
              windows="mkdir $HOME\ai-builder-camp\ex-6; cd $HOME\ai-builder-camp\ex-6"
            />
            <AgentCommand />
            <p className="mt-3">Confirme que a busca web está funcionando:</p>
            <Prompt>{`Pesquise o que aconteceu nos últimos 7 dias com as principais empresas de tecnologia do Brasil. Cite as fontes e datas.`}</Prompt>
            <p className="mt-2">
              Se o Codex retornar resultados com fontes e datas recentes, a busca está ativa.
            </p>
            <Tip>
              Se o agente responder sem citar fontes ou com dados muito antigos, pode ser que o modelo
              configurado não tenha busca web habilitada. Verifique se está usando <code>gpt-4o</code>
              ou superior, que têm acesso à internet por padrão.
            </Tip>
          </Step>
        }
        gemini={
          <Step n={1} title="Abra o Gemini — o Google Search já está integrado">
            <p>Nenhuma configuração necessária. Abra o agente na pasta do exercício:</p>
            <OSTabs
              mac="mkdir ~/ai-builder-camp/ex-6 && cd ~/ai-builder-camp/ex-6"
              windows="mkdir $HOME\ai-builder-camp\ex-6; cd $HOME\ai-builder-camp\ex-6"
            />
            <AgentCommand />
            <p className="mt-3">Confirme que a busca está funcionando:</p>
            <Prompt>{`Pesquise o que aconteceu nos últimos 7 dias com as principais empresas de tecnologia do Brasil. Cite as fontes e datas.`}</Prompt>
            <p className="mt-2">
              O Gemini vai usar o Google Search automaticamente e retornar resultados com fontes.
              Você deve ver referências a notícias recentes.
            </p>
          </Step>
        }
      />

      {/* Shared use-case steps for all LLMs */}
      <Step n={4} title="Análise de concorrentes com dados de hoje">
        <p>
          Refaça o exercício 2.1 — mas agora o agente pesquisa na internet em vez de usar só o que já sabia.
          A diferença é enorme.
        </p>
        <Prompt>{SHARED_PROMPT_COMPETITORS}</Prompt>
        <Tip>
          Observe o processo: o agente vai pesquisar antes de responder — você vai ver ele buscando
          informações em tempo real antes de montar a análise.
        </Tip>
      </Step>

      <Step n={5} title="Vá além: monitoramento contínuo do setor">
        <p>Com acesso à internet, o agente pode monitorar qualquer coisa. Experimente:</p>
        <Prompt>{SHARED_PROMPT_SECTOR}</Prompt>
      </Step>

      <div className="mt-6 p-5 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
          Você eliminou a principal limitação dos agentes de IA: dados desatualizados.
          Nos próximos exercícios, vamos conectar o agente aos documentos da sua empresa
          e ao canal da sua equipe.
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/5" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>← 5</Link>
        <Link href="/exercises/7" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Próximo: 7. Agente com seus documentos →
        </Link>
      </div>
    </AppShell>
  );
}
