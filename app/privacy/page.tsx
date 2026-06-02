import Link from "next/link";
import AppShell from "../components/AppShell";

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--text-5)" }}>Grupo Alun</p>
        <h1 className="text-2xl font-bold text-white mb-2">Política de Privacidade</h1>
        <p className="text-sm" style={{ color: "var(--text-4)" }}>Última atualização: junho de 2025</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>

        <section>
          <h2 className="text-base font-semibold text-white mb-3">1. Quem somos</h2>
          <p>
            O <strong className="text-white/80">AI Builder Camp</strong> é uma iniciativa do{" "}
            <strong className="text-white/80">Grupo Alun</strong>, empresa de educação e desenvolvimento
            profissional com foco em liderança, gestão e tecnologia aplicada. Para fins desta política,
            "nós", "nosso" e "Alun" referem-se ao Grupo Alun e seus produtos educacionais.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-3">2. Quais dados coletamos</h2>
          <p className="mb-3">Ao se cadastrar no AI Builder Camp, coletamos:</p>
          <ul className="space-y-1.5 ml-4">
            <li style={{ color: "var(--text-3)" }}>· <strong className="text-white/70">Nome completo</strong> — para personalizar sua experiência</li>
            <li style={{ color: "var(--text-3)" }}>· <strong className="text-white/70">Endereço de e-mail</strong> — para comunicação e acesso ao curso</li>
            <li style={{ color: "var(--text-3)" }}>· <strong className="text-white/70">Empresa ou organização</strong> — para entender o perfil dos nossos participantes</li>
            <li style={{ color: "var(--text-3)" }}>· <strong className="text-white/70">Data e hora do cadastro</strong> — registro automático para fins de segurança</li>
          </ul>
          <p className="mt-3">
            Não coletamos dados de navegação, cookies de rastreamento ou informações de pagamento.
            O curso é gratuito e não requer cartão de crédito.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-3">3. Como usamos seus dados</h2>
          <p className="mb-3">Utilizamos as informações coletadas para:</p>
          <ul className="space-y-1.5 ml-4">
            <li>· Liberar o acesso ao conteúdo do AI Builder Camp</li>
            <li>· Enviar comunicações relacionadas ao curso (atualizações, novos exercícios, melhorias)</li>
            <li>
              · Enviar comunicações de marketing do <strong className="text-white/70">Grupo Alun</strong>, incluindo
              informações sobre outros cursos, eventos, produtos e promoções que possam ser do seu interesse
            </li>
            <li>· Analisar o perfil dos participantes para melhorar o conteúdo do curso</li>
          </ul>
          <p className="mt-3">
            Você pode cancelar o recebimento de comunicações de marketing a qualquer momento clicando
            no link de descadastro presente em qualquer e-mail que enviarmos.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-3">4. Armazenamento e segurança</h2>
          <p>
            Seus dados são armazenados no{" "}
            <strong className="text-white/70">Firebase Firestore</strong> (Google Cloud), com acesso
            restrito à equipe do Grupo Alun. O banco de dados está configurado para permitir apenas
            a gravação de novos cadastros — nenhum dado de outros usuários é acessível pelo navegador.
            Utilizamos as práticas de segurança recomendadas pelo Google Firebase.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-3">5. Compartilhamento de dados</h2>
          <p>
            Não vendemos, alugamos nem compartilhamos seus dados pessoais com terceiros para fins
            comerciais. O único serviço externo que recebe seus dados é o Firebase (Google), utilizado
            exclusivamente para armazenamento. O Google possui sua própria{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4b6afc" }}
            >
              política de privacidade
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-3">6. Seus direitos (LGPD)</h2>
          <p className="mb-3">
            Em conformidade com a{" "}
            <strong className="text-white/70">Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>,
            você tem direito a:
          </p>
          <ul className="space-y-1.5 ml-4">
            <li>· Confirmar a existência de tratamento dos seus dados</li>
            <li>· Acessar seus dados que mantemos</li>
            <li>· Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>· Solicitar a anonimização, bloqueio ou eliminação dos seus dados</li>
            <li>· Revogar seu consentimento para o recebimento de comunicações de marketing</li>
          </ul>
          <p className="mt-3">
            Para exercer qualquer desses direitos, entre em contato pelo e-mail abaixo. Responderemos
            em até 15 dias úteis.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-3">7. Contato</h2>
          <p>
            Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato com o
            Grupo Alun pelo e-mail{" "}
            <a href="mailto:privacidade@alun.com.br" style={{ color: "#4b6afc" }}>
              privacidade@alun.com.br
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-white mb-3">8. Alterações nesta política</h2>
          <p>
            Podemos atualizar esta política periodicamente. Em caso de mudanças relevantes, notificaremos
            os participantes cadastrados por e-mail. O uso continuado do curso após a notificação
            implica a aceitação das alterações.
          </p>
        </section>

      </div>

      <div className="mt-12 pt-6" style={{ borderTop: "1px solid #1e2026" }}>
        <Link href="/" className="text-sm transition-colors" style={{ color: "var(--text-5)" }}>
          ← Voltar ao início
        </Link>
      </div>
    </AppShell>
  );
}
