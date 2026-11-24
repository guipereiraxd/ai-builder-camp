// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, ExerciseHeader, CompletedButton } from "../../components/ExerciseComponents";

export default function CopilotCP3() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(0,120,212,0.15)", color: "#0078d4", border: "1px solid rgba(0,120,212,0.3)" }}
        >
          ◈ Copilot CP3
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Trilha Copilot 365</span>
      </div>

      <ExerciseHeader
        act="Trilha Copilot 365"
        number="CP3"
        title="Pesquisa e análise com Bing"
        duration="25 min"
        description="O Copilot no Microsoft 365 tem acesso direto ao Bing — o que significa que você pode pedir análises de mercado, monitoramento de concorrentes e pesquisas setoriais com dados de hoje, sem copiar e colar de outros sites."
      />

      {/* Context */}
      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>Copilot com web grounding</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          O Copilot pode usar duas fontes: seus dados internos do M365 (emails, documentos, reuniões) e a web via Bing.
          Neste exercício usamos a web. O resultado é similar ao exercício 2.1 e ao M7 desta trilha —
          mas sem configurar MCP ou API keys: o Bing já está integrado.
        </p>
      </div>

      <Step n={1} title="Abra o Copilot com acesso à web">
        <p>
          Acesse <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0078d4" }}>copilot.microsoft.com</a> ou
          abra o Copilot pelo Microsoft Edge (ícone no canto superior direito).
          Faça login com sua conta corporativa M365.
        </p>
        <p className="mt-3">
          Verifique se o ícone de busca web está ativo — deve aparecer como <strong style={{ color: "var(--text-1)" }}>Web</strong> ou um globo
          na barra de composição. Se não estiver, ative nas configurações do Copilot.
        </p>
        <Tip>
          O Copilot Business (corporativo) e o Copilot pessoal funcionam de formas diferentes.
          Este exercício usa o corporativo, acessado com conta M365 — ele não usa seus dados pessoais
          para treinar os modelos e é coberto pelo Data Protection Addendum da Microsoft.
        </Tip>
      </Step>

      <Step n={2} title="Pesquisa de concorrentes ao vivo">
        <p>
          Use o prompt abaixo para fazer uma análise competitiva estruturada.
          Substitua os campos em colchetes pelas informações do seu mercado:
        </p>
        <Prompt>{`Faça uma análise de mercado sobre [SEU SETOR/PRODUTO] no Brasil. Quero entender:

1. Principais players do mercado e seus posicionamentos atuais
2. Movimentações recentes nos últimos 3-6 meses (lançamentos, parcerias, aquisições)
3. Tendências que estão ganhando força
4. Gaps de mercado não atendidos

Use fontes recentes e cite de onde vieram as informações. Formate como um briefing executivo de 1 página.`}</Prompt>
        <p className="mt-3">
          O Copilot vai pesquisar no Bing e citar as fontes. Revise as fontes citadas para validar a confiabilidade.
        </p>
        <Warning>
          Sempre valide as fontes citadas antes de usar em decisões estratégicas.
          O Copilot pode citar corretamente, mas o conteúdo original pode ter sido atualizado.
          Use os links fornecidos para confirmar informações críticas.
        </Warning>
      </Step>

      <Step n={3} title="Monitoramento de um concorrente específico">
        <p>
          Para aprofundar em um concorrente específico:
        </p>
        <Prompt>{`Pesquise o que [NOME DO CONCORRENTE] fez nos últimos 60 dias. Quero saber:

- Novos produtos ou features lançados
- Comunicações de marketing relevantes
- Notícias em veículos de negócios (Exame, InfoMoney, Valor, etc.)
- Avaliações recentes de clientes no G2, Capterra ou Google

Depois me diga: o que eles estão priorizando? Qual é a narrativa que estão construindo?`}</Prompt>
        <Tip>
          Repita este prompt mensalmente para cada concorrente principal.
          O Copilot vai sempre buscar informações recentes — diferente de um documento estático
          que fica desatualizado.
        </Tip>
      </Step>

      <Step n={4} title="Análise setorial e tendências">
        <p>
          Para uma visão mais ampla do seu setor:
        </p>
        <Prompt>{`Quais são as tendências mais relevantes em [SEU SETOR] para os próximos 12 meses?

Pesquise relatórios recentes de consultorias (Gartner, McKinsey, IDC, KPMG), veículos especializados e publicações acadêmicas.

Para cada tendência identifique:
- Qual é a tendência e por que está ganhando força
- Empresas que já estão agindo sobre ela
- Risco de não agir: o que acontece com quem ignorar

Formato: lista ordenada por relevância, com fonte e data de cada afirmação.`}</Prompt>
      </Step>

      <Step n={5} title="Salve o resultado como Copilot Page">
        <p>
          O Copilot Pages é a forma de salvar e colaborar em outputs de pesquisa dentro do M365.
          Depois de gerar um resultado relevante:
        </p>
        <div className="space-y-2 mt-3">
          {[
            "Clique em Edit in Pages (ou o ícone de página) no canto do resultado.",
            "O conteúdo abre em uma página colaborativa — como um Notion integrado ao M365.",
            "Adicione contexto, anotações e ajustes direto na página.",
            "Compartilhe com o time clicando em Share — eles podem ver e editar juntos.",
            "A página fica salva no seu OneDrive e acessível pelo Teams.",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(0,120,212,0.15)", color: "#0078d4" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{step}</p>
            </div>
          ))}
        </div>
        <Tip>
          Copilot Pages substitui o hábito de copiar resultados para um documento Word ou Notion.
          A diferença: você pode continuar a conversa com o Copilot diretamente na página —
          peça refinamentos, adicione seções, compare com novas pesquisas.
        </Tip>
      </Step>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>✓ CP3 concluído</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-4)" }}>
          Você tem agora uma forma de fazer inteligência de mercado em minutos,
          com fontes citadas e resultado colaborativo. O próximo exercício conecta o agente
          que você criou no CP1 aos documentos internos da empresa via SharePoint.
        </p>
        <Link href="/exercises/cp4" className="text-sm font-medium" style={{ color: "#0078d4" }}>
          CP4: Base de conhecimento corporativa →
        </Link>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/cp2" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← CP2 Automatize reuniões
        </Link>
        <Link href="/exercises/cp4" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#0078d4" }}>
          CP4 Base de conhecimento →
        </Link>
      </div>
    </AppShell>
  );
}
