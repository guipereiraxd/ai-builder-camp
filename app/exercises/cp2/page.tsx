// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, ExerciseHeader, CompletedButton } from "../../components/ExerciseComponents";

export default function CopilotCP2() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(0,120,212,0.15)", color: "#0078d4", border: "1px solid rgba(0,120,212,0.3)" }}
        >
          ◈ Copilot CP2
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Trilha Copilot 365</span>
      </div>

      <ExerciseHeader
        act="Trilha Copilot 365"
        number="CP2"
        title="Automatize reuniões no Teams"
        duration="20 min"
        description="O Copilot no Teams transcreve, resume e extrai ações de qualquer reunião — automaticamente. Neste exercício você aprende a configurar, usar e distribuir o output de reuniões para o time sem esforço manual."
      />

      {/* Context */}
      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>O que muda com o Copilot em reuniões</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Sem Copilot: alguém precisa tomar notas, lembrar o que foi decidido e criar ata depois.
          Com Copilot: a transcrição é automática, o resumo é gerado em segundos e os próximos passos aparecem com dono e prazo.
          O equivalente à Missão M1 desta trilha — mas sem nenhum terminal ou prompt manual.
        </p>
      </div>

      <Step n={1} title="Ative o Copilot na reunião">
        <p>
          Antes de começar uma reunião no Teams, verifique se o Copilot está disponível na sua conta.
          Ele aparece como ícone na barra de ferramentas da reunião.
        </p>
        <p className="mt-3">Durante uma reunião ativa:</p>
        <div className="space-y-2 mt-3">
          {[
            "Na barra superior da reunião, clique em More (…) → Copilot.",
            "Se for a primeira vez, aceite os termos de uso.",
            "O painel do Copilot abre à direita da reunião.",
            "Clique em Start transcription para ativar a transcrição — necessária para o Copilot funcionar.",
            "Uma notificação será enviada a todos os participantes informando que a reunião está sendo transcrita.",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(0,120,212,0.15)", color: "#0078d4" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{step}</p>
            </div>
          ))}
        </div>
        <Warning>
          Sempre informe os participantes que a reunião está sendo transcrita. Além de ser uma boa prática,
          é requisito legal em muitos contextos corporativos e o Teams faz isso automaticamente.
        </Warning>
      </Step>

      <Step n={2} title="Faça perguntas durante a reunião">
        <p>
          Com o painel do Copilot aberto, você pode fazer perguntas em tempo real —
          sem interromper a reunião. Experimente estes prompts enquanto a conversa acontece:
        </p>
        <Prompt>{`Quais pontos já foram discutidos até agora?`}</Prompt>
        <Prompt>{`Quais decisões foram tomadas?`}</Prompt>
        <Prompt>{`Liste os próximos passos mencionados e quem ficou responsável por cada um.`}</Prompt>
        <Prompt>{`Alguém mencionou um prazo? Quando?`}</Prompt>
        <Tip>
          Use o Copilot para "pegar o fio" quando entrar em uma reunião que já começou.
          Pergunte: "O que foi discutido nos últimos 10 minutos?" — o resumo aparece em segundos.
        </Tip>
      </Step>

      <Step n={3} title="Gere o resumo pós-reunião">
        <p>
          Após o encerramento da reunião, acesse a aba <strong style={{ color: "var(--text-1)" }}>Recap</strong> no chat da reunião no Teams.
          O Copilot gera automaticamente:
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Summary", desc: "Resumo dos principais pontos discutidos" },
            { label: "Action items", desc: "Lista de tarefas com responsáveis identificados" },
            { label: "Mentions", desc: "Todos os momentos em que seu nome foi citado" },
            { label: "Transcript", desc: "Transcrição completa com atribuição por speaker" },
          ].map(({ label, desc }) => (
            <div key={label} className="p-3 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
              <p className="text-xs font-bold mb-1" style={{ color: "#0078d4" }}>{label}</p>
              <p className="text-xs" style={{ color: "var(--text-4)" }}>{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-3">
          No painel Recap, peça ao Copilot um resumo formatado para distribuir ao time:
        </p>
        <Prompt>{`Crie uma ata executiva desta reunião com:
1. Objetivo da reunião (1 linha)
2. Principais decisões tomadas (bullets)
3. Próximos passos com responsável e prazo (tabela)
4. Pontos em aberto que precisam de acompanhamento

Formato adequado para colar no email ou canal do Teams.`}</Prompt>
      </Step>

      <Step n={4} title="Distribua para o time">
        <p>Com a ata gerada, você tem duas formas de distribuir:</p>
        <div className="space-y-3 mt-3">
          <div className="p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>Via Teams (mais rápido)</p>
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              Copie o texto gerado pelo Copilot e cole diretamente no canal do projeto no Teams.
              Os action items ficam visíveis para todo o time sem precisar abrir outro app.
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>Via Outlook (mais formal)</p>
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              Use o Copilot no Outlook para transformar a ata em um email formatado.
              No campo de composição, clique em Copilot → Draft with Copilot e cole o conteúdo como contexto.
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>Via Loop ou Planner</p>
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              O Teams pode exportar os action items diretamente para o Microsoft Planner como tarefas.
              No Recap, clique em "Create tasks" para transferir automaticamente os próximos passos.
            </p>
          </div>
        </div>
        <Tip>
          Configure uma rotina de envio: ao final de cada reunião importante, 2 minutos no Recap + copiar
          para o canal do time. Em semanas, você vai sentir a diferença no alinhamento do time.
        </Tip>
      </Step>

      <Step n={5} title="Para reuniões que você não participou">
        <p>
          Se você recebeu o convite mas não pôde comparecer, o Copilot ainda pode ajudar.
          Acesse o evento no calendário do Teams ou o chat da reunião gravada:
        </p>
        <Prompt>{`Resuma esta reunião em 5 bullets. Me diga: o que foi decidido, quais são minhas ações pendentes e se há algo urgente que eu preciso responder hoje.`}</Prompt>
        <Prompt>{`Em algum momento foi mencionado [TEMA ESPECÍFICO]? Se sim, o que foi dito e por quem?`}</Prompt>
        <Tip>
          Funciona com reuniões que tiveram transcrição ativada. Reuniões sem transcrição não ficam disponíveis
          para análise posterior — mais um motivo para sempre ativar a transcrição no começo.
        </Tip>
      </Step>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>✓ CP2 concluído</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-4)" }}>
          Reuniões que antes geravam horas de follow-up agora geram atas em segundos.
          O próximo exercício ensina a usar o Copilot para pesquisa e inteligência de mercado —
          com acesso à web em tempo real.
        </p>
        <Link href="/exercises/cp3" className="text-sm font-medium" style={{ color: "#0078d4" }}>
          CP3: Pesquisa e análise com Bing →
        </Link>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/cp1" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← CP1 Configure seu agente
        </Link>
        <Link href="/exercises/cp3" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#0078d4" }}>
          CP3 Pesquisa e análise →
        </Link>
      </div>
    </AppShell>
  );
}
