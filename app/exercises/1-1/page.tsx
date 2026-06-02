import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Command, OSTabs, ExerciseHeader, AgentCommand, CopyContextFile } from "../../components/ExerciseComponents";

export default function Exercise11() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato I — Entenda o poder dos Agentes"
        number="1.1"
        title="Seu primeiro produto digital"
        duration="10 min"
        description="Você vai criar uma aplicação web funcional com um único prompt. Nenhum conhecimento de programação necessário. O objetivo é sentir o que é possível — e entender por que isso muda tudo."
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O que você vai construir</p>
        <p className="text-sm text-white/70">
          Um gerador de atas de reunião: você cola o texto bruto das notas,
          a ferramenta organiza tudo em uma ata profissional com decisões,
          responsáveis e próximos passos.
        </p>
      </div>

      <Step n={1} title="Abra o terminal e crie uma pasta de trabalho">
        <p>Todo exercício tem sua própria pasta. Isso ajuda o Claude Code a manter o contexto.</p>
        <OSTabs
          mac="mkdir ~/ai-builder-camp/ex-1-1 && cd ~/ai-builder-camp/ex-1-1"
          windows="mkdir $HOME\ai-builder-camp\ex-1-1; cd $HOME\ai-builder-camp\ex-1-1"
        />
        <AgentCommand />
      </Step>

      <Step n={2} title="Cole este prompt no Claude Code">
        <p>
          Copie o prompt abaixo e cole diretamente na interface do Claude Code
          (sem modificar nada primeiro). Observe o que acontece.
        </p>
        <Prompt>{`Crie uma aplicação web de página única (HTML + CSS + JavaScript, tudo em um único arquivo index.html) que funcione como um Gerador de Atas de Reunião.

A aplicação deve ter:
- Um campo de texto grande onde o usuário cola as notas brutas da reunião
- Um botão "Gerar Ata"
- Uma área de resultado que exibe a ata formatada com:
  - Título e data da reunião
  - Participantes (extraídos do texto)
  - Resumo executivo (2-3 linhas)
  - Decisões tomadas (lista)
  - Próximos passos com responsáveis e prazos (se mencionados)
  - Pendências em aberto
- Um botão "Copiar Ata" para copiar o resultado

Use um design escuro e profissional. A lógica de extração deve usar a API do Claude via fetch (deixe um comentário claro onde inserir a API key). Coloque um exemplo de notas no placeholder do campo de texto para eu poder testar imediatamente.`}</Prompt>

        <Tip>
          Enquanto o Claude Code trabalha, observe as etapas que ele executa: planejamento,
          criação de arquivo, escrita do código. Você está vendo um agente de IA em ação.
        </Tip>
      </Step>

      <Step n={3} title="Abra o arquivo gerado">
        <p>
          Quando o Claude Code terminar, ele vai ter criado um arquivo <code>index.html</code>.
          Abra-o no navegador:
        </p>
        <OSTabs mac="open index.html" windows="start index.html" />
        <p className="mt-1">Ou simplesmente navegue até a pasta e dê dois cliques no arquivo.</p>
      </Step>

      <Step n={4} title="Teste com um exemplo real">
        <p>Cole o texto abaixo no campo da aplicação e clique em "Gerar Ata":</p>
        <div className="mt-3 p-4 bg-[#0d1117] rounded-lg border border-white/10 text-sm text-white/60 font-mono leading-relaxed">
          {`reunião de planejamento q3 terça 14h
presentes: ana (produto), carlos (tech), beatriz (comercial), eu (ceo)
falamos sobre lançamento novo produto agosto
carlos disse que backend tá pronto mas falta testes
ana quer mais 2 semanas pra refinar ux
beatriz trouxe que 3 clientes grandes já pediram acesso antecipado
decidimos: lançar beta em 15/08 com esses 3 clientes
carlos fica responsável pelos testes até dia 8
ana entrega versão final da ux dia 10
beatriz vai confirmar com os clientes
próxima reunião semana que vem mesma hora`}
        </div>
      </Step>

      <Step n={5} title="Itere com linguagem natural">
        <p>
          Volte ao Claude Code (que ainda está aberto) e peça ajustes. Experimente:
        </p>
        <Prompt>{`Adicione um campo para o nome da empresa no topo do formulário, e inclua ele no cabeçalho da ata gerada. Também adicione a opção de exportar a ata como arquivo .txt.`}</Prompt>
        <p className="mt-2">
          Observe como o agente entende o contexto do que já foi feito e faz apenas as
          mudanças necessárias — sem quebrar o que estava funcionando.
        </p>
      </Step>

      <div className="mt-6 p-5 rounded-xl border border-white/10 bg-white/3">
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm text-white/50 leading-relaxed">
          Você acabou de criar um produto de software funcional em menos de 15 minutos,
          sem escrever uma linha de código. Agora pense: quais ferramentas internas da sua
          empresa poderiam ser construídas assim? No próximo exercício, você vai ensinar
          o agente sobre o contexto específico da sua empresa.
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          href="/exercises/1-2"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}
        >
          Próximo: 1.2 Com contexto da empresa →
        </Link>
      </div>
    </AppShell>
  );
}
