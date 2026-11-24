// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, ExerciseHeader, CompletedButton } from "../../components/ExerciseComponents";

export default function CopilotCP1() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(0,120,212,0.15)", color: "#0078d4", border: "1px solid rgba(0,120,212,0.3)" }}
        >
          ◈ Copilot CP1
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Trilha Copilot 365</span>
      </div>

      <ExerciseHeader
        act="Trilha Copilot 365"
        number="CP1"
        title="Configure seu agente no Copilot Studio"
        duration="30 min"
        description="O Copilot Studio é onde você cria agentes personalizados dentro do ecossistema Microsoft 365. Neste exercício você cria seu primeiro agente, escreve as instruções que definem seu comportamento e o publica no Teams — sem nenhuma linha de código."
      />

      {/* Context */}
      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>Copilot Studio vs. Copilot no M365</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          O <strong style={{ color: "var(--text-2)" }}>Copilot Studio</strong> é a plataforma para construir agentes personalizados —
          equivalente ao Claude Code ou Codex CLI, mas via interface visual.
          O <strong style={{ color: "var(--text-2)" }}>Copilot no M365</strong> (Teams, Word, Excel) é o assistente embutido nos apps
          do Office. Nesta trilha, usamos os dois: o Studio para construir, os apps para usar.
        </p>
      </div>

      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-1)" }}>Pré-requisito</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Você precisa de uma conta Microsoft 365 com acesso ao Copilot Studio. Os planos <strong style={{ color: "var(--text-2)" }}>E3/E5 + licença Copilot</strong> ou
          o <strong style={{ color: "var(--text-2)" }}>Copilot Studio Pay-as-you-go</strong> incluem acesso.
          Peça ao time de TI se não tiver — ou use a trial de 30 dias em <code>aka.ms/copilotstudio</code>.
        </p>
      </div>

      <Step n={1} title="Acesse o Copilot Studio">
        <p>
          Abra <a href="https://copilotstudio.microsoft.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0078d4" }}>copilotstudio.microsoft.com</a> no
          navegador e faça login com sua conta corporativa M365.
        </p>
        <p className="mt-3">Na tela inicial, clique em <strong style={{ color: "var(--text-1)" }}>Create</strong> → <strong style={{ color: "var(--text-1)" }}>New agent</strong>.</p>
        <p className="mt-2">
          O Studio vai oferecer criação por descrição (modo chat) ou configuração manual.
          Para este exercício, escolha <strong style={{ color: "var(--text-1)" }}>Skip to configure</strong> — é mais didático ver cada campo separado.
        </p>
        <Tip>
          A interface está em inglês por padrão. Você pode alterar para português em Settings → Language, mas
          os exercícios desta trilha usam nomes de campos em inglês para facilitar a localização.
        </Tip>
      </Step>

      <Step n={2} title="Defina a identidade do agente">
        <p>Preencha os campos básicos do agente. Use os valores abaixo como ponto de partida — adapte para sua empresa:</p>
        <div className="mt-3 space-y-3">
          {[
            { label: "Name", value: "Assistente [Sua Empresa]", desc: "Nome que aparece no Teams e em outros canais" },
            { label: "Description", value: "Assistente interno da [Empresa] para perguntas sobre processos, produtos e clientes.", desc: "Descrição interna — ajuda o Studio a sugerir comportamentos" },
            { label: "Instructions", value: "Ver passo 3", desc: "O prompt principal — define personalidade e regras" },
          ].map(({ label, value, desc }) => (
            <div key={label} className="p-3 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
              <div className="flex items-baseline gap-2 mb-1">
                <code className="text-xs font-bold" style={{ color: "#0078d4" }}>{label}</code>
                <span className="text-xs" style={{ color: "var(--text-5)" }}>{desc}</span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-2)" }}>{value}</p>
            </div>
          ))}
        </div>
      </Step>

      <Step n={3} title="Escreva as Instructions (o prompt principal)">
        <p>
          O campo <strong style={{ color: "var(--text-1)" }}>Instructions</strong> é o coração do agente —
          equivale ao arquivo de contexto da empresa que você criou no exercício 1.2.
          Cole o texto abaixo e substitua os campos em colchetes pelas informações reais da sua empresa:
        </p>
        <Prompt>{`Você é o assistente oficial da [NOME DA EMPRESA], uma empresa de [SETOR/DESCRIÇÃO BREVE].

## Sua função
Responder perguntas de colaboradores sobre processos internos, produtos, clientes e informações gerais da empresa.

## Tom e comportamento
- Responda sempre em português
- Use linguagem profissional mas acessível — como um colega experiente
- Seja direto: comece pela resposta, depois a explicação
- Se não souber algo, diga claramente e sugira onde buscar a resposta

## O que você sabe sobre a empresa
[COPIE AQUI AS INFORMAÇÕES DO SEU ARQUIVO DE CONTEXTO — produtos, processos, estrutura, etc.]

## O que você NÃO deve fazer
- Não inventar informações sobre a empresa
- Não compartilhar dados de clientes ou informações confidenciais com terceiros
- Não executar ações que não foram solicitadas`}</Prompt>
        <Tip>
          Se você já fez o exercício 1.2 desta trilha e tem um arquivo de contexto, copie o conteúdo dele
          aqui. O agente do Copilot Studio usa as Instructions da mesma forma que o Claude Code usa o CLAUDE.md.
        </Tip>
      </Step>

      <Step n={4} title="Teste no painel de teste">
        <p>
          À direita da tela de configuração há um painel de teste em tempo real.
          Faça perguntas para verificar se o agente está respondendo conforme esperado:
        </p>
        <Prompt>{`Qual é o foco principal da [Sua Empresa]?`}</Prompt>
        <Prompt>{`Como você pode me ajudar no dia a dia de trabalho?`}</Prompt>
        <Prompt>{`Me dê um exemplo de como você responderia a uma dúvida de processo interno.`}</Prompt>
        <p className="mt-3">
          Se as respostas estiverem genéricas demais, volte ao campo Instructions e adicione mais detalhes
          sobre a empresa. Quanto mais contexto específico, mais útil o agente se torna.
        </p>
        <Warning>
          Não adicione dados de clientes, informações financeiras confidenciais ou credenciais nas Instructions.
          O texto do campo é acessível a qualquer pessoa que tenha permissão para editar o agente.
        </Warning>
      </Step>

      <Step n={5} title="Publique no Microsoft Teams">
        <p>
          Clique em <strong style={{ color: "var(--text-1)" }}>Publish</strong> no canto superior direito.
          O Studio vai compilar o agente e disponibilizar os canais de publicação.
        </p>
        <p className="mt-3">Para publicar no Teams:</p>
        <div className="space-y-2 mt-3">
          {[
            "Clique em Publish → Confirm.",
            "No menu lateral, vá em Channels → Microsoft Teams.",
            "Clique em Turn on Teams e confirme.",
            "Em alguns minutos o agente aparecerá na lista de bots do Teams.",
            "Abra o Teams, procure pelo nome do agente na barra de busca e inicie uma conversa.",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(0,120,212,0.15)", color: "#0078d4" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{step}</p>
            </div>
          ))}
        </div>
        <Tip>
          A publicação pode demorar 5-10 minutos para aparecer no Teams. Se não aparecer, tente
          buscar pelo nome do agente ou reinstale o app via Apps no Teams.
        </Tip>
      </Step>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>✓ CP1 concluído</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-4)" }}>
          Você criou seu primeiro agente no Copilot Studio — com identidade, instruções e publicado no Teams.
          O próximo exercício adiciona dados reais da empresa a esse agente via SharePoint,
          para que ele responda com informações específicas do seu negócio.
        </p>
        <Link href="/exercises/cp2" className="text-sm font-medium" style={{ color: "#0078d4" }}>
          CP2: Automatize reuniões no Teams →
        </Link>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← Voltar ao índice
        </Link>
        <Link href="/exercises/cp2" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#0078d4" }}>
          CP2 Automatize reuniões →
        </Link>
      </div>
    </AppShell>
  );
}
