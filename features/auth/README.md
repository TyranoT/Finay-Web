# Autenticação

## Descrição
A feature `auth` reúne telas, componentes, hooks e chamadas HTTP para login e cadastro de usuários.

## Estrutura
- `api/`: requests e mutations de autenticação.
- `components/`: formulários de login e cadastro.
- `hooks/`: comportamento visual auxiliar.
- `ui/`: componentes visuais reutilizados nos formulários.
- `types.ts`: contratos de credenciais e respostas.

## O que cada pasta contém
- `api` contém `auth.api`, `register.api`, `use-login` e `use-register`.
- `components` contém `login-form` e `register-form`.
- `hooks` contém `use-login-animation`.
- `ui` contém `brand-panel`, `input-field` e `login-icon`.

## Rotas utilizadas
- Rota Next.js: `/`, em `app/page.tsx`, para login.
- Rota Next.js: `/register`, em `app/register/page.tsx`, para cadastro.
- API HTTP: `POST /auth/login`.
- API HTTP: `POST /auth/register`.

## Qual o propósito
Controlar a entrada do usuário no sistema, criar novas contas e disponibilizar token de sessão para as demais features.

## Referências
- `app/page.tsx`
- `app/register/page.tsx`
- `features/auth/components/login-form.tsx`
- `features/auth/components/register-form.tsx`
- `shared/hook/useSession`
