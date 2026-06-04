import Link from "next/link";
import AppShell from "../components/AppShell";

export default function AutoResearchPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-5)" }}>
          Fundamentos
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "var(--text-1)" }}>
          AutoResearch — pesquisa autônoma com IA
        </h1>
        <p className="text-sm" style={{ color: "var(--text-5)" }}>
          O conceito que muda como executivos fazem due diligence, análise competitiva e pesquisa estratégica
        </p>
        <div className="mt-6" style={{ borderTop: "1px solid var(--border)" }} />
      </div>

      {/* Karpathy context */}
      <div className="mb-8 p-5 rounded-xl" style={{ border: "1px solid rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.05)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#fb923c" }}>O que é AutoResearch</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-2)" }}>
          Andrej Karpathy — ex-OpenAI, criador do termo "vibe-coding" — lançou o AutoResearch:
          um agente que recebe uma pergunta, planeja uma estratégia de busca, pesquisa em múltiplas
          fontes de forma autônoma, lê e sintetiza o conteúdo, e entrega um relatório completo com citações.
          Tudo sem você ter que direcionar cada passo.
        </p>
        <a
          href="https://github.com/karpathy/autoresearch"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: "#fb923c" }}
        >
          Ver repositório no GitHub →
        </a>
      </div>

      {/* What it does */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-5)" }}>
          O que o AutoResearch faz
        </p>
        <div className="space-y-3">
          {[
            { n: "1", label: "Recebe a pergunta", desc: "Você define o tema e o nível de profundidade desejado." },
            { n: "2", label: "Planeja a busca", desc: "Decompõe a pergunta em sub-tópicos e define as fontes mais relevantes para cada um." },
            { n: "3", label: "Pesquisa autonomamente", desc: "Busca, lê e extrai informações de múltiplas fontes sem intervenção sua." },
            { n: "4", label: "Sintetiza", desc: "Combina os achados, identifica consensos, divergências e lacunas." },
            { n: "5", label: "Entrega o relatório", desc: "Executive summary, análise por tópico, conclusões e fontes citadas." },
          ].map(({ n, label, desc }) => (
            <div key={n} className="flex gap-4 items-start p-3 rounded-lg" style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c" }}>{n}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-4)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business value */}
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-5)" }}>
          Por que importa para executivos
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { label: "Due diligence em horas", desc: "Análise de parceiros, fornecedores e mercados que levaria dias de analista." },
            { label: "Inteligência competitiva profunda", desc: "Muito além do monitoramento — compreensão real do movimento dos concorrentes." },
            { label: "Pesquisa para negociações", desc: "Chegar preparado com dados, precedentes e contexto de mercado." },
            { label: "Análise de tendências", desc: "Entender onde um setor está indo antes de tomar decisões estratégicas." },
          ].map(({ label, desc }) => (
            <div key={label} className="p-4 rounded-lg" style={{ background: "var(--tint-2)", border: "1px solid var(--border)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "#fb923c" }}>{label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub intro */}
      <div className="mb-10 p-5 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-1)" }}>
          O que é GitHub — e por que vamos usá-lo
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-3)" }}>
          GitHub é onde desenvolvedores e pesquisadores compartilham código e ferramentas publicamente.
          Pense como um "Google Drive técnico": projetos ficam disponíveis para qualquer pessoa baixar e usar.
          É lá que o Karpathy publicou o AutoResearch.
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-3)" }}>
          Na Missão 8, vamos <strong style={{ color: "var(--text-2)" }}>clonar</strong> (baixar) o projeto
          do Karpathy diretamente do GitHub para a nossa máquina — exatamente como se fosse um download,
          mas com a vantagem de receber atualizações automáticas quando o autor melhora a ferramenta.
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-3)" }}>
          Na Missão 6 você já usou o GitHub para publicar o gerador de OKRs. Se fez aquela missão,
          já tem conta e já conhece o básico. Se ainda não tem conta, o guia abaixo leva menos de 5 minutos.
        </p>
        <Link
          href="/github"
          className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: "#fb923c" }}
        >
          📋 Guia: como criar sua conta no GitHub →
        </Link>
      </div>

      {/* CTAs */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/exercises/m7"
          className="p-5 rounded-xl transition-opacity hover:opacity-80"
          style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#fb923c" }}>◈ Missão 07</p>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>AutoResearch Simples</p>
          <p className="text-xs" style={{ color: "var(--text-4)" }}>
            Usando as ferramentas do curso — sem dependências novas. Resultado imediato para qualquer agente.
          </p>
        </Link>
        <Link
          href="/exercises/m8"
          className="p-5 rounded-xl transition-opacity hover:opacity-80"
          style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#fb923c" }}>◈ Missão 08</p>
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-1)" }}>AutoResearch Karpathy</p>
          <p className="text-xs" style={{ color: "var(--text-4)" }}>
            O projeto real do Karpathy via GitHub. Python + clone do repositório + configuração completa.
          </p>
        </Link>
      </div>
    </AppShell>
  );
}
