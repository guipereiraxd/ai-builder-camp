// Static exercise content — edit the JSX directly to update text, prompts, and steps.
import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, AgentCommand, OSTabs, ExerciseHeader, LLMTabs, CompletedButton } from "../../components/ExerciseComponents";

const EXAMPLE_CONTRACT = `ACORDO DE CONFIDENCIALIDADE (NDA)

Celebrado entre:
CONTRATANTE: XYZ Tecnologia Ltda., CNPJ 00.000.000/0001-00, doravante "Empresa".
CONTRATADO: João da Silva, CPF 000.000.000-00, doravante "Colaborador".

1. OBJETO
O Colaborador terá acesso a informações confidenciais da Empresa, incluindo mas não limitado a: estratégia comercial, base de clientes, código-fonte, processos internos e dados financeiros.

2. OBRIGAÇÕES
O Colaborador se compromete a: (a) não divulgar quaisquer informações confidenciais a terceiros; (b) utilizar as informações exclusivamente para fins da relação contratual; (c) notificar imediatamente a Empresa em caso de vazamento ou acesso não autorizado.

3. PRAZO
Este acordo vigorará pelo período de 5 (cinco) anos após o término da relação contratual, independente do motivo do encerramento.

4. PENALIDADES
O descumprimento de qualquer cláusula deste acordo sujeitará o Colaborador ao pagamento de multa equivalente a R$ 500.000,00 (quinhentos mil reais), além de indenização por perdas e danos apurados judicialmente, sem prejuízo de medidas criminais cabíveis.

5. PROPRIEDADE INTELECTUAL
Toda e qualquer produção intelectual, criação, invenção ou desenvolvimento realizado pelo Colaborador durante a vigência do contrato, ainda que fora do horário de trabalho e com recursos próprios, pertencerá exclusivamente à Empresa.

6. NÃO CONCORRÊNCIA
O Colaborador se compromete a não trabalhar, prestar serviços ou ter participação em empresas concorrentes pelo período de 3 (três) anos após o encerramento do vínculo, em todo o território nacional.

7. FORO
Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias.`;

export default function Mission3() {
  return (
    <AppShell>
      {/* Mission badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full tracking-wide uppercase"
          style={{ background: "rgba(209,164,118,0.15)", color: "#d1a476", border: "1px solid rgba(209,164,118,0.3)" }}
        >
          ◈ Missão 03
        </span>
        <span className="text-xs" style={{ color: "var(--text-5)" }}>Ato IV — Continue Praticando</span>
      </div>

      <ExerciseHeader
        act="Ato IV — Continue Praticando"
        number="M3"
        title="Analise um contrato em minutos"
        duration="20 min"
        description="NDAs, contratos de fornecedor, acordos de parceria — você recebe, não entende metade, e assina assim mesmo. Esta missão transforma qualquer contrato em linguagem simples, com red flags destacados e pontos de negociação prontos."
      />

      <div className="mb-8 p-4 rounded-lg" style={{ border: "1px solid rgba(209,164,118,0.15)", background: "rgba(209,164,118,0.04)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "#d1a476" }}>Quando usar esta missão</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
          Sempre que receber um contrato para assinar antes de enviar para o jurídico — ou quando não tiver jurídico.
          O agente não substitui um advogado, mas te prepara para a conversa:
          você chega sabendo o que perguntar e o que negociar.
        </p>
      </div>

      <Step n={1} title="Prepare o ambiente e cole o contrato">
        <p>Crie uma pasta para a análise e abra o agente:</p>
        <OSTabs
          mac="mkdir ~/ai-builder-camp/missao-3 && cd ~/ai-builder-camp/missao-3"
          windows="mkdir $HOME\ai-builder-camp\missao-3; cd $HOME\ai-builder-camp\missao-3"
        />
        <AgentCommand />
        <p className="mt-3">
          Crie um arquivo <code>contrato.md</code> e cole o texto completo do contrato.
          Ou use o exemplo abaixo para testar agora — é um NDA com algumas cláusulas problemáticas propositais:
        </p>
        <div className="my-4 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between px-4 py-2" style={{ background: "var(--tint-3)", borderBottom: "1px solid var(--border)" }}>
            <span className="text-xs font-mono" style={{ color: "var(--text-4)" }}>exemplo — contrato.md</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto m-0 font-mono leading-relaxed whitespace-pre-wrap" style={{ background: "var(--code-bg)", color: "var(--text-3)", maxHeight: "220px" }}>
            {EXAMPLE_CONTRACT}
          </pre>
        </div>
        <Tip>
          Funciona com qualquer formato de contrato: NDA, SaaS, fornecedor, parceria, trabalho, franquia.
          Cole o texto direto — PDF? Copie o texto do PDF e cole no arquivo.
        </Tip>
      </Step>

      <Step n={2} title="Análise completa do contrato">
        <p>Este é o prompt principal. Entrega tudo de uma vez:</p>
        <Prompt>{`Leia o arquivo contrato.md e produza uma análise completa em 5 blocos:

## 1. RESUMO EXECUTIVO
Em até 5 linhas: o que este contrato faz, quem são as partes e qual o prazo principal.
Escreva em linguagem simples — como se explicasse para alguém que nunca viu contratos.

## 2. CLÁUSULAS PRINCIPAIS
Liste as obrigações mais importantes de cada parte.
Para cada uma: o que diz em linguagem jurídica → o que significa na prática.

## 3. RED FLAGS 🚩
Identifique cláusulas problemáticas, abusivas, vagas ou que criam risco desproporcional.
Para cada red flag: qual é o problema, qual o risco real e o que você deveria pedir para mudar.

## 4. PONTOS DE NEGOCIAÇÃO
Liste de 3 a 5 cláusulas que você deveria tentar negociar antes de assinar.
Para cada uma: o que está no contrato → o que você deveria pedir → por que é razoável pedir.

## 5. RECOMENDAÇÃO FINAL
Assinar como está / Negociar antes de assinar / Não assinar sem consulta jurídica.
Justifique em 2-3 linhas.

Seja direto e prático. Este documento vai para um executivo que precisa decidir em 10 minutos.`}</Prompt>
        <p className="mt-2">
          Salve o resultado em <code>analise-contrato.md</code> para guardar o histórico.
        </p>
      </Step>

      <Step n={3} title="Análise rápida de red flags (versão express)">
        <p>
          Para contratos longos onde você só quer saber o que está errado antes de ler tudo:
        </p>
        <Prompt>{`Do contrato em contrato.md, extraia APENAS os red flags em ordem de severidade:

🔴 CRÍTICO — risco alto, não assinar sem mudança
🟡 ATENÇÃO — cláusula problemática, negociar
🟢 OBSERVAR — não é urgente mas vale monitorar

Para cada item: cite a cláusula, explique o problema em uma linha, sugira a alteração.
Seja direto — sem introdução, sem conclusão longa.`}</Prompt>
        <Tip>
          Use esta versão quando receber um contrato de última hora e tiver 5 minutos.
          Os 🔴 são o que importa — se tiver algum, não assine sem negociar.
        </Tip>
      </Step>

      <Step n={4} title="Gere o brief de negociação">
        <p>
          Antes de uma reunião com a outra parte, peça o brief de negociação:
        </p>
        <Prompt>{`Com base na análise do contrato, prepare um brief de negociação de uma página.

O brief deve ter:

POSIÇÃO DE ABERTURA: o que pedir em cada ponto, começando pelo mais importante
MÍNIMO ACEITÁVEL: até onde você pode ceder em cada ponto sem criar risco
ARGUMENTOS: por que cada pedido é razoável (use precedentes de mercado quando possível)
O QUE NÃO CEDER: cláusulas onde você não pode abrir mão de mudança
TÁTICAS: como apresentar os pedidos sem criar atrito desnecessário

Tom: prático e objetivo, como um briefing para reunião.`}</Prompt>
      </Step>

      <Step n={5} title="Crie um comando reutilizável">
        <p>
          Para usar essa análise em qualquer contrato futuro com um único comando:
        </p>
        <LLMTabs
          claude={
            <>
              <OSTabs
                mac="mkdir -p ~/ai-builder-camp/missao-3/.claude/commands"
                windows="mkdir $HOME\ai-builder-camp\missao-3\.claude\commands"
              />
              <Prompt>{`Crie o arquivo .claude/commands/contrato.md com as instruções para o comando /contrato.

O comando deve:
1. Ler o arquivo contrato.md da pasta atual (ou pedir o caminho se não existir)
2. Executar automaticamente os 3 passos: análise completa, red flags e brief de negociação
3. Salvar cada resultado em arquivo separado com data: analise-AAAA-MM-DD.md, redflags-AAAA-MM-DD.md, brief-negociacao-AAAA-MM-DD.md
4. Ao final, mostrar um resumo com a recomendação e os red flags críticos

A análise deve ser sempre em linguagem executiva — clara, direta, sem juridiquês.`}</Prompt>
              <p className="mt-3">Próximo contrato: abra o agente na pasta, coloque o contrato.md e rode:</p>
              <div className="mt-2 p-3 rounded-lg font-mono text-sm" style={{ background: "var(--code-bg)", border: "1px solid var(--border)", color: "var(--text-2)" }}>
                <span style={{ color: "#4b6afc" }}>$</span> claude<br />
                <span style={{ color: "#d1a476" }}>/contrato</span>
              </div>
            </>
          }
          openai={
            <>
              <p>Adicione ao <code>AGENTS.md</code> as instruções para análise de contratos:</p>
              <Prompt>{`Adicione ao AGENTS.md uma seção "## Análise de Contrato" com as instruções completas:

Quando eu disser "analisar contrato" ou "revisar contrato", leia o arquivo contrato.md e execute em sequência:
1. Análise completa (resumo executivo, cláusulas principais, red flags, pontos de negociação, recomendação final)
2. Lista de red flags por severidade (🔴 Crítico / 🟡 Atenção / 🟢 Observar)
3. Brief de negociação com posição de abertura, mínimo aceitável e argumentos

Salve cada resultado em arquivo separado com data no nome.
Linguagem sempre executiva — clara, direta, sem juridiquês.`}</Prompt>
              <p className="mt-3">Próximo contrato: coloque o contrato.md na pasta, abra o agente e diga:</p>
              <div className="mt-2 p-3 rounded-lg font-mono text-sm" style={{ background: "var(--code-bg)", border: "1px solid var(--border)", color: "var(--text-2)" }}>
                <span style={{ color: "#10a37f" }}>$</span> codex<br />
                <span style={{ color: "#d1a476" }}>analisar contrato</span>
              </div>
            </>
          }
          gemini={
            <>
              <p>Adicione ao <code>GEMINI.md</code> as instruções para análise de contratos:</p>
              <Prompt>{`Adicione ao GEMINI.md uma seção "## Análise de Contrato" com as instruções completas:

Quando eu disser "analisar contrato" ou "revisar contrato", leia o arquivo contrato.md e execute em sequência:
1. Análise completa (resumo executivo, cláusulas principais, red flags, pontos de negociação, recomendação final)
2. Lista de red flags por severidade (🔴 Crítico / 🟡 Atenção / 🟢 Observar)
3. Brief de negociação com posição de abertura, mínimo aceitável e argumentos

Salve cada resultado em arquivo separado com data no nome.
Linguagem sempre executiva — clara, direta, sem juridiquês.`}</Prompt>
              <p className="mt-3">Próximo contrato: coloque o contrato.md na pasta, abra o agente e diga:</p>
              <div className="mt-2 p-3 rounded-lg font-mono text-sm" style={{ background: "var(--code-bg)", border: "1px solid var(--border)", color: "var(--text-2)" }}>
                <span style={{ color: "#8ab4f8" }}>$</span> gemini<br />
                <span style={{ color: "#d1a476" }}>analisar contrato</span>
              </div>
            </>
          }
        />
      </Step>

      <Warning>
        O agente identifica riscos com precisão surpreendente, mas <strong>não substitui um advogado</strong>.
        Use esta análise para: entender o que está assinando, preparar perguntas, negociar com mais segurança.
        Para contratos de alto valor ou alto risco, leve a análise para um especialista — ela vai economizar horas do advogado também.
      </Warning>

      <div className="mt-8 p-5 rounded-xl" style={{ border: "1px solid rgba(209,164,118,0.2)", background: "rgba(209,164,118,0.04)" }}>
        <p className="text-sm font-semibold mb-2" style={{ color: "#d1a476" }}>✓ Missão 03 concluída</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-4)" }}>
          Você tem agora um sistema de revisão de contratos que leva minutos, não horas.
          Teste com o exemplo do NDA — note as cláusulas de propriedade intelectual e não-concorrência:
          são exatamente o tipo de coisa que passa despercebida e cria problemas meses depois.
        </p>
      </div>

      <CompletedButton />

      <div className="mt-6 flex items-center justify-between">
        <Link href="/exercises/m2" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "var(--text-4)" }}>
          ← M2 Gerador de propostas
        </Link>
        <Link href="/rag" className="inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors" style={{ color: "#a78bfa" }}>
          🧠 O que é RAG →
        </Link>
      </div>
    </AppShell>
  );
}
