// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, ExerciseHeader, CompletedButton } from "../../components/ExerciseComponents";

export default function CopilotCP4() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(0,120,212,0.15)", color: "#0078d4", border: "1px solid rgba(0,120,212,0.3)" }}
        >
          ◈ Copilot CP4
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Trilha Copilot 365</span>
      </div>

      <ExerciseHeader
        act="Trilha Copilot 365"
        number="CP4"
        title="Base de conhecimento corporativa"
        duration="35 min"
        description="Conecte o agente do Copilot Studio aos documentos internos da empresa via SharePoint. O resultado: um assistente que responde com informações reais do seu negócio — contratos, processos, políticas, apresentações — sem precisar copiar e colar nada."
      />

      {/* Context */}
      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>RAG dentro do M365</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Este exercício é o equivalente M365 das missões M4 e M5 desta trilha (RAG Simples e RAG Avançado).
          A diferença: em vez de arquivos <code>.md</code> ou uma base vetorial customizada,
          você usa o <strong style={{ color: "var(--text-2)" }}>SharePoint como fonte de conhecimento</strong> —
          onde os documentos da empresa já estão. O Copilot Studio indexa e busca automaticamente.
        </p>
      </div>

      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--tint-2)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-1)" }}>Pré-requisito</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Você precisa ter concluído o <strong style={{ color: "var(--text-2)" }}>CP1</strong> — o agente criado lá será expandido aqui.
          Também precisa de acesso a um site SharePoint com documentos relevantes.
          Se não tiver um site, o IT da empresa pode criar um em minutos.
        </p>
      </div>

      <Step n={1} title="Volte ao agente no Copilot Studio">
        <p>
          Acesse <a href="https://copilotstudio.microsoft.com" target="_blank" rel="noopener noreferrer" style={{ color: "#0078d4" }}>copilotstudio.microsoft.com</a> e
          abra o agente que você criou no CP1.
        </p>
        <p className="mt-3">
          No menu lateral do agente, clique em <strong style={{ color: "var(--text-1)" }}>Knowledge</strong>.
          Esta seção controla quais fontes de dados o agente pode consultar ao responder perguntas.
        </p>
        <Tip>
          Pense no Knowledge como a "gaveta de arquivos" do agente.
          As Instructions (CP1) definem a personalidade e as regras.
          O Knowledge define os documentos que o agente pode consultar.
        </Tip>
      </Step>

      <Step n={2} title="Adicione o SharePoint como fonte de conhecimento">
        <p>
          Clique em <strong style={{ color: "var(--text-1)" }}>Add knowledge</strong> → <strong style={{ color: "var(--text-1)" }}>SharePoint</strong>.
        </p>
        <p className="mt-3">Cole a URL do seu site SharePoint no campo que aparece. Exemplos de formatos aceitos:</p>
        <div className="mt-2 p-3 rounded-lg font-mono text-xs" style={{ background: "var(--tint-2)", border: "1px solid var(--border)", color: "var(--text-3)" }}>
          <p>https://suaempresa.sharepoint.com/sites/NomeDaArea</p>
          <p className="mt-1">https://suaempresa.sharepoint.com/sites/Processos/Shared%20Documents</p>
        </div>
        <p className="mt-3">
          Clique em <strong style={{ color: "var(--text-1)" }}>Add</strong>. O Studio vai iniciar a indexação dos documentos.
          Dependendo do volume, pode levar alguns minutos.
        </p>
        <Warning>
          O agente só acessa documentos que o usuário que configurou o Knowledge tem permissão de leitura.
          Documentos confidenciais em pastas restritas não serão expostos a usuários sem permissão.
          O controle de acesso do SharePoint é respeitado pelo Copilot Studio.
        </Warning>
      </Step>

      <Step n={3} title="Configure o escopo dos documentos">
        <p>
          Após adicionar o SharePoint, você pode refinar quais documentos o agente usa.
          Clique na fonte adicionada e configure:
        </p>
        <div className="mt-3 space-y-3">
          {[
            { label: "Description", value: "Descreva o que há neste SharePoint", desc: "Ajuda o agente a saber quando usar esta fonte vs. outras" },
            { label: "Advanced", value: "File types: PDF, DOCX, PPTX, XLSX", desc: "Restrinja a tipos de arquivo se necessário" },
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
        <Tip>
          Adicione múltiplas fontes de SharePoint — por exemplo, um site para Processos e outro para Contratos.
          O agente busca em todas as fontes ao mesmo tempo e indica de onde veio cada informação.
        </Tip>
      </Step>

      <Step n={4} title="Teste com perguntas reais">
        <p>
          Use o painel de teste à direita para verificar se o agente está acessando os documentos corretamente.
          Faça perguntas que você sabe que estão respondidas em algum documento do SharePoint:
        </p>
        <Prompt>{`Qual é a política de [ASSUNTO QUE ESTÁ NUM DOCUMENTO]?`}</Prompt>
        <Prompt>{`Me resuma o documento [NOME OU TIPO DE DOCUMENTO].`}</Prompt>
        <Prompt>{`Quais são os passos para [PROCESSO QUE ESTÁ DOCUMENTADO]?`}</Prompt>
        <p className="mt-3">
          O agente deve responder com base no conteúdo dos documentos e citar a fonte (nome do arquivo).
          Se não encontrar, ele dirá que não tem informação sobre aquele tema.
        </p>
        <div className="mt-3 p-3 rounded-lg" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#0078d4" }}>Se o agente não encontrar o documento</p>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            Verifique: (1) a indexação terminou? Aguarde mais alguns minutos. (2) Você tem permissão de leitura
            para aquele arquivo no SharePoint? (3) O arquivo é de um tipo suportado? PDF, DOCX, PPTX e XLSX
            funcionam. Arquivos ZIP, imagens e vídeos não são indexados.
          </p>
        </div>
      </Step>

      <Step n={5} title="Adicione ao Teams e compartilhe com o time">
        <p>
          Com o Knowledge configurado, republique o agente (Publish → Confirm) e compartilhe com o time no Teams.
        </p>
        <p className="mt-3">Para disponibilizar para toda a empresa:</p>
        <div className="space-y-2 mt-3">
          {[
            "No Studio, vá em Channels → Microsoft Teams → Edit details.",
            "Preencha a descrição pública que o time vai ver no Teams.",
            "Clique em Share to organization — o agente fica disponível para todos que tiverem licença.",
            "Ou compartilhe com um grupo específico: Availability → Specific people/groups.",
            "No Teams, o time pode adicionar o agente como um app e usá-lo em qualquer conversa.",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(0,120,212,0.15)", color: "#0078d4" }}>{i + 1}</span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{step}</p>
            </div>
          ))}
        </div>
        <Tip>
          Este agente é o equivalente a ter um analista que leu todos os documentos internos
          e está disponível 24h para responder perguntas da equipe. Quanto mais bem organizados
          os documentos no SharePoint, mais precisas as respostas.
        </Tip>
      </Step>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(0,120,212,0.2)", background: "rgba(0,120,212,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#0078d4" }}>✓ CP4 concluído</p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-4)" }}>
          Seu agente agora responde com base nos documentos reais da empresa — não em conhecimento genérico.
          O último exercício da trilha mostra como usar o Copilot diretamente no Word, Excel e PowerPoint
          para acelerar a produção de conteúdo no seu dia a dia.
        </p>
        <Link href="/exercises/cp5" className="text-sm font-medium" style={{ color: "#0078d4" }}>
          CP5: Copilot no Word, Excel e PowerPoint →
        </Link>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/cp3" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← CP3 Pesquisa e análise
        </Link>
        <Link href="/exercises/cp5" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#0078d4" }}>
          CP5 Word, Excel e PowerPoint →
        </Link>
      </div>
    </AppShell>
  );
}
