import Link from "next/link";
import AppShell from "../../components/AppShell";
import { Step, Prompt, Tip, Command, OSTabs, ExerciseHeader } from "../../components/ExerciseComponents";

export default function Exercise22() {
  return (
    <AppShell>
      <ExerciseHeader
        act="Ato I — Sinta o Poder"
        number="2.2"
        title="Email com tom da empresa"
        duration="20 min"
        description="Escrever bem e rápido é uma vantagem competitiva. Neste exercício você vai criar um comando personalizado que gera emails no tom exato da sua empresa — e que qualquer pessoa do time pode usar."
      />

      <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/8">
        <p className="text-sm text-white/50 font-medium mb-1">O conceito: slash commands</p>
        <p className="text-sm text-white/70 leading-relaxed">
          O Claude Code permite criar comandos personalizados com <code>/</code>.
          Um <code>/email</code> pode virar um atalho que já conhece seu tom de voz,
          suas saudações padrão e suas regras de comunicação — sem você precisar
          explicar tudo de novo cada vez.
        </p>
      </div>

      <Step n={1} title="Prepare o ambiente e defina o tom de voz">
        <OSTabs
          mac="mkdir ~/ai-builder-camp/ex-2-2 && cd ~/ai-builder-camp/ex-2-2"
          windows="mkdir $HOME\ai-builder-camp\ex-2-2; cd $HOME\ai-builder-camp\ex-2-2"
        />
        <OSTabs
          mac="cp ~/ai-builder-camp/ex-1-2/CLAUDE.md ."
          windows="copy $HOME\ai-builder-camp\ex-1-2\CLAUDE.md ."
        />
        <p className="mt-3">
          Primeiro, vamos criar um arquivo com exemplos reais de emails bons da sua empresa.
          Crie um arquivo <code>exemplos-email.md</code> e cole 2-3 emails que você considera
          representativos do seu estilo de comunicação (pode anonimizar os dados).
        </p>
        <Prompt>{`Analisei os emails que estão no arquivo exemplos-email.md e identifiquei o padrão de tom de voz da nossa empresa. Liste os 10 principais atributos do nosso estilo de escrita — o que fazemos, o que evitamos, e 2-3 exemplos de frases típicas vs. frases que nunca usaríamos.`}</Prompt>
        <Tip>
          Se não tiver emails para copiar, use o prompt sem a primeira instrução e descreva seu tom
          verbalmente. O resultado será menos preciso, mas ainda útil.
        </Tip>
      </Step>

      <Step n={2} title="Crie o comando /email">
        <p>
          Comandos personalizados ficam na pasta <code>.claude/commands/</code>. Vamos criar o nosso:
        </p>
        <OSTabs
          mac="mkdir -p .claude/commands"
          windows="mkdir .claude\commands"
        />
        <Prompt>{`Crie o arquivo .claude/commands/email.md com as instruções para o comando /email.

O comando deve:
1. Receber como input: [destinatário], [objetivo do email], [contexto relevante]
2. Gerar um email completo com assunto, corpo e assinatura
3. Usar o tom de voz identificado nos exemplos
4. Ter 3 variações de extensão: curto (3 parágrafos), médio (5 parágrafos), longo (detalhado)
5. Por padrão, gerar a versão curta e oferecer as outras

Inclua no arquivo as regras de tom que identificamos, para que o comando funcione mesmo sem os exemplos.`}</Prompt>
      </Step>

      <Step n={3} title="Teste o comando com casos reais">
        <p>Feche e reabra o Claude Code para carregar o novo comando:</p>
        <Command>claude</Command>
        <p className="mt-3">Agora teste com situações que você enfrenta regularmente:</p>
        <Prompt>{`/email

Destinatário: João, CEO de uma empresa de 200 pessoas que demonstrou interesse no nosso produto mas sumiu há 3 semanas depois da demo
Objetivo: Retomar a conversa sem soar desesperado
Contexto: Ele mencionou que estava avaliando outras opções. Temos um case de sucesso novo com uma empresa similar à dele.`}</Prompt>
      </Step>

      <Step n={4} title="Crie variações para diferentes situações">
        <p>Teste o comando em outros contextos comuns:</p>
        <Prompt>{`/email

Destinatário: Time interno (40 pessoas)
Objetivo: Comunicar uma mudança de processo que vai exigir adaptação de todos
Contexto: A partir da próxima semana, todas as aprovações de budget acima de R$5k precisam passar pelo CFO antes de ser executadas. Antes só precisava de aprovação do gestor direto.`}</Prompt>
        <p className="mt-3">E um mais difícil:</p>
        <Prompt>{`/email

Destinatário: Cliente importante que está insatisfeito após um problema técnico que causou 2 horas de downtime
Objetivo: Pedir desculpas, explicar o que aconteceu e reconquistar a confiança
Contexto: O problema foi causado por uma atualização nossa. Já está resolvido. Cliente é estratégico (R$15k/mês).`}</Prompt>
      </Step>

      <Step n={5} title="Compartilhe com o time">
        <p>
          O poder real desse comando é quando qualquer pessoa do time pode usá-lo.
          Vamos criar uma versão portável:
        </p>
        <Prompt>{`Crie um arquivo README.md explicando como qualquer pessoa do time pode usar o comando /email. Inclua:
- Como instalar (copiar a pasta .claude para o projeto deles)
- Exemplos de uso com os 5 situações mais comuns na nossa empresa
- Como atualizar o tom de voz se necessário

O README deve ser acessível para alguém não-técnico.`}</Prompt>
      </Step>

      <div className="mt-6 p-5 rounded-xl border border-white/10 bg-white/3">
        <p className="text-sm font-semibold text-white mb-2">Reflexão</p>
        <p className="text-sm text-white/50 leading-relaxed">
          Você acabou de criar um ativo de comunicação reutilizável. Imagine toda a sua equipe
          gerando comunicações consistentes, no tom correto, em segundos. No próximo exercício,
          vamos transformar dados brutos em um dashboard visual — sem uma linha de SQL.
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <Link href="/exercises/2-1" className="inline-flex items-center gap-2 px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">← 2.1</Link>
        <Link href="/exercises/2-3" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-opacity hover:opacity-90" style={{ background: "#4b6afc", color: "#ffffff" }}>
          Próximo: 2.3 Dashboard executivo →
        </Link>
      </div>
    </AppShell>
  );
}
