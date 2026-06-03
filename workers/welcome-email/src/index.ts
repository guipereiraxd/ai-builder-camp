export interface Env {
  RESEND_API_KEY: string;
}

const ALLOWED_ORIGINS = [
  "https://guipereiraxd.github.io",
  "http://localhost:3000", // dev
];

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function buildEmail(name: string, company: string): string {
  const firstName = name.split(" ")[0];
  const courseUrl = "https://guipereiraxd.github.io/ai-builder-camp/dashboard";
  const setupUrl  = "https://guipereiraxd.github.io/ai-builder-camp/setup";

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Header -->
        <tr><td style="background:#0f0f0f;border-radius:12px 12px 0 0;padding:32px 40px;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#d1a476;">Alun Business</p>
          <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">AI Builder Camp</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px;">

          <p style="margin:0 0 20px;font-size:16px;color:#334155;">Olá, <strong>${firstName}</strong> 👋</p>

          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
            Seu acesso ao AI Builder Camp está liberado. Você está prestes a aprender a usar IA
            como uma ferramenta real de trabalho — não como um chatbot, mas como um agente que
            trabalha dentro da sua empresa.
          </p>

          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
            <tr><td style="background:#4b6afc;border-radius:8px;">
              <a href="${courseUrl}" style="display:block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">
                Acessar o curso →
              </a>
            </td></tr>
          </table>

          <!-- What you'll learn -->
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">O que você vai aprender</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ${[
              ["Ato I", "Entenda o poder dos Agentes", "6 exercícios práticos — de um produto digital ao briefing semanal automatizado."],
              ["Ato II", "Construa seu primeiro Agente", "Agentes autônomos que monitoram mercado, produzem conteúdo e fazem due diligence."],
              ["Ato III", "Conecte ao mundo real", "Agente com busca web, documentos do Drive e Slack — tudo integrado."],
            ].map(([act, title, desc]) => `
            <tr><td style="padding:12px 0;border-top:1px solid #f1f5f9;">
              <p style="margin:0 0 2px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">${act}</p>
              <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#0f172a;">${title}</p>
              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">${desc}</p>
            </td></tr>`).join("")}
          </table>

          <!-- Setup reminder -->
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:28px;">
            <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#0f172a;">Antes de começar</p>
            <p style="margin:0 0 12px;font-size:13px;color:#64748b;line-height:1.5;">
              O curso usa ferramentas de IA em linha de comando (Claude, OpenAI ou Gemini).
              O guia de instalação leva menos de 20 minutos e cobre Mac e Windows.
            </p>
            <a href="${setupUrl}" style="font-size:13px;color:#4b6afc;text-decoration:none;font-weight:600;">
              Ver guia de instalação →
            </a>
          </div>

          <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">
            Qualquer dúvida, responda este email.<br>
            Bom curso,<br>
            <strong style="color:#0f172a;">Equipe Alun</strong>
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8fafc;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
            Você está recebendo este email porque se cadastrou no AI Builder Camp.
            ${company ? `Empresa: ${company}.` : ""}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const headers = corsHeaders(origin);

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers });
    }

    let name = "", email = "", company = "";
    try {
      const body = await request.json() as { name?: string; email?: string; company?: string };
      name    = (body.name    ?? "").trim();
      email   = (body.email   ?? "").trim().toLowerCase();
      company = (body.company ?? "").trim();
    } catch {
      return new Response("Invalid JSON", { status: 400, headers });
    }

    if (!name || !email || !email.includes("@")) {
      return new Response("Missing required fields", { status: 422, headers });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AI Builder Camp <onboarding@resend.dev>",
        to:   email,
        subject: `${name.split(" ")[0]}, seu acesso ao AI Builder Camp está liberado`,
        html:    buildEmail(name, company),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response("Email send failed", { status: 502, headers });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  },
};
