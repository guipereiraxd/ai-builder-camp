import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Command, OSTabs, Tip, Warning, Prompt, ExerciseHeader } from "../../components/ExerciseComponents";

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

const SETTINGS_WIN = `{
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

export default function Exercise6() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato III — Conecte ao Mundo Real"
        number="6"
        title="Busca em tempo real com Brave Search"
        duration="20 min"
        description="Até agora, o Claude trabalhava só com o que você colava e com o que ele já sabia — dados de treinamento de meses atrás. Neste exercício você conecta o agente à internet e ele passa a pesquisar agora, em tempo real."
      />

      {/* MCP explainer */}
      <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
        <p className="text-sm font-semibold text-white mb-2">O que é um MCP?</p>
        <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>
          MCP (Model Context Protocol) é um conector que dá ao Claude acesso a ferramentas externas.
          Pense como uma tomada: você encaixa o conector certo e o Claude passa a "enxergar"
          e agir dentro daquela ferramenta — busca web, Google Drive, Slack, CRM.
        </p>
        <p className="text-sm leading-relaxed mt-2" style={{ color: "#cfd2d8" }}>
          A configuração é feita uma vez. Depois disso, o Claude usa a ferramenta automaticamente
          quando precisar — você não precisa fazer nada diferente nos prompts.
        </p>
      </div>

      {/* MCP registry callout */}
      <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid #2a3a2a", background: "rgba(75,200,100,0.04)" }}>
        <p className="text-sm font-semibold text-white mb-2">Atalho: o Claude já tem conectores prontos para centenas de ferramentas</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#cfd2d8" }}>
          Antes de configurar qualquer MCP manualmente, vale checar se já existe um conector
          pronto para a ferramenta que você usa. O ecossistema de MCPs cresceu rápido —
          hoje há conectores oficiais e da comunidade para Notion, HubSpot, Salesforce, Jira,
          Linear, GitHub, Figma, Airtable, Stripe, e dezenas de outros softwares de mercado.
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#cfd2d8" }}>
          Se a ferramenta mais importante para você está nessa lista, pode pular direto para ela
          em vez de seguir a trilha do Ato III. O processo de configuração é sempre o mesmo:
          encontrar o conector, adicionar ao <code>settings.json</code>, reiniciar o Claude Code.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Notion", "HubSpot", "Salesforce", "GitHub", "Linear", "Jira", "Figma", "Airtable", "Stripe", "Postgres", "MongoDB", "Zapier"].map(tool => (
            <span key={tool} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(75,106,252,0.12)", color: "#8ba3ff", border: "1px solid rgba(75,106,252,0.2)" }}>
              {tool}
            </span>
          ))}
          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.05)", color: "#64687a", border: "1px solid rgba(255,255,255,0.08)" }}>
            + muito mais
          </span>
        </div>
        <a
          href="https://www.claudemcp.com/servers"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-80"
          style={{ background: "rgba(75,106,252,0.15)", color: "#8ba3ff", border: "1px solid rgba(75,106,252,0.25)" }}
        >
          Explorar conectores disponíveis →
        </a>
      </div>

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O que muda no Ato III</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Ato I: você trouxe dados para o Claude. Ato II: o Claude trabalhou de forma autônoma.
          Ato III: o Claude vai buscar os dados onde eles estão — web, Drive, Slack — sem você
          precisar copiar nada.
        </p>
      </div>

      <Step n={1} title="Crie uma conta e obtenha a chave do Brave Search">
        <p>
          O Brave Search oferece uma API de busca web. O plano gratuito inclui{" "}
          <strong className="text-white">2.000 buscas por mês</strong> — suficiente para o curso inteiro.
        </p>
        <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
          {[
            <>Acesse <a href="https://api.search.brave.com" target="_blank" rel="noopener noreferrer">api.search.brave.com</a> e clique em <strong className="text-white">Get Started</strong>.</>,
            <>Crie uma conta (pode usar Google ou email).</>,
            <>No painel, clique em <strong className="text-white">Subscriptions</strong> → escolha o plano <strong className="text-white">Free</strong>.</>,
            <>Vá em <strong className="text-white">API Keys</strong> → <strong className="text-white">Add Key</strong>. Dê um nome (ex: <code>ai-builder-camp</code>) e copie a chave gerada.</>,
          ].map((text, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(75,106,252,0.15)", color: "#4b6afc" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "#cfd2d8" }}>{text}</p>
            </div>
          ))}
        </div>
        <Warning>
          Guarde essa chave — você vai precisar dela no próximo passo. Se perder, pode gerar uma nova no mesmo painel.
        </Warning>
      </Step>

      <Step n={2} title="Abra o arquivo de configuração do Claude Code">
        <p>
          O Claude Code tem um arquivo <code>settings.json</code> onde você registra os MCPs.
          É um arquivo de texto simples — vamos abri-lo agora.
        </p>
        <p className="mt-3">Primeiro, verifique se o arquivo já existe:</p>
        <OSTabs
          mac="cat ~/.claude/settings.json"
          windows="type $HOME\.claude\settings.json"
        />
        <p className="mt-3">
          Se aparecer <em style={{ color: "#64687a" }}>"No such file"</em> ou erro, o arquivo ainda não existe — tudo bem, vamos criá-lo.
          Se já existir, <strong className="text-white">não apague o conteúdo</strong> — vamos apenas adicionar dentro dele.
        </p>
        <p className="mt-3">Abra o arquivo para editar:</p>
        <OSTabs
          mac="code ~/.claude/settings.json"
          windows="code $HOME\.claude\settings.json"
        />
        <Tip>
          Não tem VS Code instalado? Use qualquer editor de texto:{" "}
          <strong>Mac:</strong> <code>open -e ~/.claude/settings.json</code> abre no TextEdit.{" "}
          <strong>Windows:</strong> <code>notepad $HOME\.claude\settings.json</code> abre no Bloco de Notas.
        </Tip>
      </Step>

      <Step n={3} title="Adicione o MCP do Brave Search">
        <p>
          Cole o conteúdo abaixo no arquivo. Substitua <code>sua-chave-aqui</code> pela chave que você copiou.
        </p>
        <p className="mt-2 text-sm" style={{ color: "#64687a" }}>
          Se o arquivo já tinha conteúdo, adicione apenas o bloco <code>"mcpServers"</code> dentro das chaves existentes — não crie duas chaves abertas.
        </p>
        <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid #33363e" }}>
          <div className="flex items-center justify-between px-4 py-2" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid #33363e" }}>
            <span className="text-xs font-mono" style={{ color: "#64687a" }}>~/.claude/settings.json</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed" style={{ background: "#0d0d10", color: "#e8e8eb" }}>
            {SETTINGS_MAC}
          </pre>
        </div>
        <p>Salve o arquivo (<code>Ctrl+S</code> ou <code>⌘S</code>).</p>
      </Step>

      <Step n={4} title="Reinicie o Claude Code e confirme a conexão">
        <p>Feche qualquer sessão do Claude Code aberta e inicie novamente:</p>
        <OSTabs
          mac="mkdir ~/ai-builder-camp/ex-6 && cd ~/ai-builder-camp/ex-6"
          windows="mkdir $HOME\ai-builder-camp\ex-6; cd $HOME\ai-builder-camp\ex-6"
        />
        <Command>claude</Command>
        <p className="mt-2">Confirme que o MCP foi reconhecido:</p>
        <Prompt>{`Quais ferramentas você tem disponíveis agora? Liste os MCPs conectados.`}</Prompt>
        <p className="mt-2">
          O Claude deve mencionar o <strong className="text-white">Brave Search</strong> na lista de ferramentas. Se não aparecer, volte ao passo 3 e verifique se o JSON está correto (sem vírgulas extras, chaves fechadas).
        </p>
        <Tip>
          Erro comum: vírgula no final do último item do JSON. JSON não aceita vírgula
          antes de {"}"} ou {"]"}. Se o Claude não reconhecer o MCP, verifique isso primeiro.
        </Tip>
      </Step>

      <Step n={5} title="Teste: análise de concorrentes com dados de hoje">
        <p>
          Agora refaça o exercício 2.1 — mas desta vez o Claude vai pesquisar na internet,
          não depender do que já sabia. A diferença é enorme.
        </p>
        <Prompt>{`Pesquise na internet os 3 principais concorrentes da [NOME DA SUA EMPRESA] e me dê:

1. O que cada um lançou ou anunciou nos últimos 3 meses
2. Mudanças de preço ou posicionamento recentes
3. Qualquer contratação relevante ou mudança de liderança
4. O que estão dizendo nas redes sociais sobre eles (sentimento geral)

Para cada informação, cite a fonte e a data aproximada. Ao final, diga qual é o movimento competitivo mais importante que eu preciso ter no radar esta semana.`}</Prompt>
        <Tip>
          Observe algo diferente: o Claude vai usar a ferramenta <code>brave_web_search</code>
          automaticamente durante a resposta. Você verá ele "pesquisando" antes de responder —
          isso é o MCP em ação.
        </Tip>
      </Step>

      <Step n={6} title="Vá além: pesquisa contínua">
        <p>Com acesso à internet, o Claude pode monitorar qualquer coisa em tempo real. Experimente:</p>
        <Prompt>{`Pesquise notícias do setor de [SEU SETOR] dos últimos 7 dias. Filtre apenas o que é relevante para uma empresa do nosso perfil (use o CLAUDE.md como referência). Para cada notícia relevante, diga: o que aconteceu, por que importa para nós, e se exige alguma ação nossa.`}</Prompt>
      </Step>

      <div className="mt-6 p-5 rounded-xl" style={{ border: "1px solid #33363e", background: "rgba(255,255,255,0.02)" }}>
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm leading-relaxed" style={{ color: "#64687a" }}>
          Com um arquivo JSON e uma chave de API, você eliminou a principal limitação do Claude:
          dados desatualizados. Nos próximos exercícios, vamos conectar ele aos documentos
          da sua empresa (Google Drive) e ao canal da sua equipe (Slack).
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/5" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#64687a" }}>← 5</Link>
        <Link href="/exercises/7" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Próximo: 7. Claude no Google Drive →
        </Link>
      </div>
    </AppShell>
  );
}
