# AI Builder Camp

Plataforma de aprendizagem para executivos que querem construir com IA. O curso guia participantes do primeiro prompt ao deploy de agentes autônomos, sem pressupor conhecimento técnico prévio.

**Estrutura pedagógica:** 3 Atos + Missões avançadas, 20 exercícios no total. O Ato I cobre o básico de agentic prompting; o Ato II ensina a construir agentes autônomos com configuração explícita; o Ato III conecta agentes ao mundo real (Slack, busca em tempo real, RAG). As Missões são problemas empresariais reais — contratos, propostas, due diligence.

## Stack

- **Next.js** (static export) + **React 19** + **TypeScript**
- **Tailwind CSS** — tema dark/light via CSS custom properties em `app/globals.css`
- **Firebase / Firestore** — cadastro de participantes e trigger de e-mail de boas-vindas via Firebase Extension
- Deploy como site estático — qualquer servidor de arquivos (GitHub Pages, S3, Nginx)

## Setup local

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um `.env.local` na raiz com as credenciais do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Encontre esses valores em **Firebase Console → Project Settings → General → Your apps**.

> O site funciona sem Firebase — o formulário de cadastro silenciosamente não persiste, mas todo o conteúdo do curso fica acessível.

### 3. Configure o hash de admin

A página `/admin` autentica por senha inteiramente no browser (sem servidor). Para gerar o hash SHA-256 da sua senha:

```bash
echo -n "sua-senha" | openssl dgst -sha256 | awk '{print $2}'
```

Adicione ao `.env.local`:

```env
NEXT_PUBLIC_ADMIN_HASH=<hash gerado acima>
```

Em produção, adicione como secret no GitHub Actions ou Vercel em vez de commitar no repositório.

### 4. Suba o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build e deploy

O projeto gera um site estático completo (sem servidor Node em produção):

```bash
npm run build   # gera a pasta out/
```

Copie `out/` para qualquer servidor estático. Exemplo via GitHub Pages:

```bash
npx gh-pages -d out
```

As variáveis `NEXT_PUBLIC_*` são embutidas no bundle durante o build — defina-as no ambiente de CI antes de rodar `npm run build`.

## Estrutura do projeto

```
app/
├── page.tsx                        # Landing page com formulário de cadastro
├── dashboard/page.tsx              # Painel do participante (progresso, próximo exercício)
├── exercises/
│   ├── page.tsx                    # Listagem de todos os exercícios por ato
│   ├── 1-1/page.tsx               # Exercício 1.1 — Seu primeiro produto digital
│   └── ...                        # Um diretório por exercício (total: 20)
├── components/
│   ├── AppShell.tsx               # Layout + gate de registro (redireciona não-cadastrados)
│   ├── Sidebar.tsx                # Navegação lateral + seletor de LLM + indicadores de progresso
│   ├── ExerciseComponents.tsx     # Componentes de UI dos exercícios + hooks de progresso/LLM
│   ├── MobileHeader.tsx           # Header mobile com menu drawer
│   └── ThemeToggle.tsx            # Toggle dark/light com persistência em localStorage
├── admin/page.tsx                 # Dashboard administrativo (lista de cadastros, export CSV)
lib/
└── firebase.ts                    # Inicialização fault-tolerant do Firebase
```

## Como editar exercícios

Cada exercício é um componente React estático em `app/exercises/<id>/page.tsx`. Para editar o conteúdo:

1. Abra o arquivo do exercício correspondente.
2. Edite o JSX — use os componentes `<Step>`, `<Prompt>`, `<Tip>`, `<Warning>`, `<Command>` de `ExerciseComponents.tsx`.
3. Não há CMS nem banco de dados; salvar o arquivo já atualiza o conteúdo.

Para **adicionar** um exercício novo:
1. Crie `app/exercises/<id>/page.tsx` seguindo o padrão de qualquer exercício existente.
2. Adicione a entrada em `ALL_EXERCISES` em `app/dashboard/page.tsx` (a ordem define o caminho sugerido no dashboard).
3. Adicione a entrada na lista em `app/exercises/page.tsx`.
4. Se o exercício pertence a um novo ato, atualize o array `ACTS` em `app/dashboard/page.tsx` também (incluindo o campo `total`).
