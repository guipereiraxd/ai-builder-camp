import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Warning, Command, OSTabs, ExerciseHeader, AgentCommand, CopyContextFile } from "../../components/ExerciseComponents";

const SAMPLE_CSV = `data,produto,regiao,vendedor,valor,status
2025-07-01,Plano Pro,Sul,Maria,4800,fechado
2025-07-02,Plano Starter,Sudeste,João,1200,fechado
2025-07-03,Plano Enterprise,Norte,Ana,15000,em_negociacao
2025-07-05,Plano Pro,Nordeste,Carlos,4800,fechado
2025-07-08,Plano Starter,Sudeste,Maria,1200,perdido
2025-07-10,Plano Enterprise,Sul,João,15000,fechado
2025-07-12,Plano Pro,Centro-Oeste,Ana,4800,em_negociacao
2025-07-15,Plano Starter,Norte,Carlos,1200,fechado
2025-07-18,Plano Enterprise,Sudeste,Maria,15000,fechado
2025-07-20,Plano Pro,Sul,João,4800,fechado`;

export default function Exercise23() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato I — Entenda o poder dos Agentes"
        number="2.3"
        title="Dashboard executivo"
        duration="20 min"
        description="Dados em planilha não comunicam. Neste exercício você vai transformar dados brutos em um dashboard interativo e visual — sem depender de IT, BI ou Tableau. Em 30 minutos."
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O que você vai construir</p>
        <p className="text-sm text-white/70 leading-relaxed">
          Um dashboard HTML com gráficos interativos, KPIs em destaque, filtros por período
          e visualizações que você pode enviar para qualquer pessoa — sem precisar de login,
          servidor ou instalação.
        </p>
      </div>

      <Step n={1} title="Prepare os dados">
        <OSTabs
          mac="mkdir ~/ai-builder-camp/ex-2-3 && cd ~/ai-builder-camp/ex-2-3"
          windows="mkdir $HOME\ai-builder-camp\ex-2-3; cd $HOME\ai-builder-camp\ex-2-3"
        />
        <p className="mt-3">
          Crie um arquivo <code>dados.csv</code> com seus dados reais. Se não tiver dados
          disponíveis agora, use o exemplo abaixo (copie e salve como <code>dados.csv</code>):
        </p>
        <div className="my-3 p-4 bg-[#0d1117] rounded-lg border border-white/10 text-xs text-white/60 font-mono leading-relaxed overflow-x-auto">
          {SAMPLE_CSV}
        </div>
        <Warning>
          Use apenas dados de exemplo ou dados não-confidenciais. Nunca insira dados
          de clientes reais, informações financeiras sensíveis ou dados pessoais.
        </Warning>
      </Step>

      <Step n={2} title="Abra o Claude Code e analise os dados">
        <AgentCommand />
        <p className="mt-3">Primeiro, peça ao agente para entender os dados:</p>
        <Prompt>{`Leia o arquivo dados.csv e me dê:
1. Um resumo do que temos: quantas linhas, quais colunas, que período cobre
2. Os 3 insights mais relevantes que você consegue extrair imediatamente
3. As 5 perguntas de negócio mais importantes que esses dados podem responder
4. Sugestões de quais gráficos seriam mais úteis para um CEO visualizar`}</Prompt>
      </Step>

      <Step n={3} title="Construa o dashboard">
        <Prompt>{`Agora crie um dashboard executivo completo em um único arquivo index.html usando os dados do CSV.

O dashboard deve ter:
- Header com nome da empresa, período e data de atualização
- 4 KPI cards no topo: Receita Total, Ticket Médio, Taxa de Conversão, Deals em Negociação
- Gráfico de barras: Receita por Mês
- Gráfico de pizza: Distribuição por Produto
- Gráfico de linha: Evolução de Vendas no Período
- Tabela: Top 5 Deals por Valor
- Filtros: por Região e por Vendedor

Tecnicamente:
- Use Chart.js via CDN (não instalar nada)
- Os dados do CSV devem ser embutidos diretamente no HTML (não precisa carregar arquivo externo)
- Design escuro e profissional, responsivo
- Cores: azul para destaques, cinza para secundários

Salve tudo em index.html e diga quando terminar.`}</Prompt>
        <Tip>
          O Claude Code vai criar o arquivo completo. Enquanto ele trabalha,
          observe como ele estrutura o raciocínio: primeiro planeja, depois executa seção por seção.
        </Tip>
      </Step>

      <Step n={4} title="Abra e itere">
        <OSTabs mac="open index.html" windows="start index.html" />
        <p className="mt-3">
          Visualize o dashboard e peça ajustes. Experimente:
        </p>
        <Prompt>{`Adicione um gráfico de barras horizontais mostrando o ranking de vendedores por receita total. Posicione-o depois dos gráficos existentes. Também destaque em vermelho os deals com status "perdido" na tabela.`}</Prompt>
      </Step>

      <Step n={5} title="Adapte com seus dados reais">
        <p>
          Se você tem dados reais em uma planilha, exporte como CSV e substitua o arquivo
          <code>dados.csv</code>. Depois:
        </p>
        <Prompt>{`Atualizei o arquivo dados.csv com dados reais. Leia os novos dados e:
1. Atualize todos os gráficos e KPIs do dashboard
2. Ajuste os títulos e labels se as colunas tiverem nomes diferentes
3. Me avise se encontrar problemas nos dados (valores nulos, inconsistências, etc.)`}</Prompt>
      </Step>

      <div className="mt-6 p-5 rounded-xl border border-white/10 bg-white/3">
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm text-white/50 leading-relaxed">
          Um dashboard que antes levaria dias de BI está pronto em 30 minutos.
          E ele pode ser atualizado com novos dados em segundos.
          No próximo exercício, vamos automatizar o processo que mais rouba o tempo
          de executivos: o briefing semanal.
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/2-2" className="inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">← 2.2</Link>
        <Link href="/exercises/2-4" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Próximo: 2.4 Briefing semanal →
        </Link>
      </div>
    </AppShell>
  );
}
