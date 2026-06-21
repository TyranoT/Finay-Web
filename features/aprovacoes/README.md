# Aprovações

## Descrição
A feature `aprovacoes` concentra ações de aceitar ou rejeitar solicitações pendentes relacionadas ao fluxo financeiro ou colaborativo.

## Estrutura
- `api/`: mutations para executar ações de aprovação.
- `components/`: composição da página de aprovações.
- `ui/`: cards e elementos visuais da listagem.

## O que cada pasta contém
- `api` contém `aprovacoes-acoes.api` e `use-aprovacao-acao`, que enviam a decisão do usuário e invalidam a listagem.
- `components` contém `aprovacoes-page`, responsável pela tela da rota.
- `ui` contém `aprovacao-card`, responsável por exibir cada item acionável.

## Rotas utilizadas
- Rota Next.js: `/aprovacoes`, em `app/(app)/aprovacoes/page.tsx`.
- API HTTP: `POST /aprovacao/{uid}/aceitar`.
- API HTTP: `POST /aprovacao/{uid}/rejeitar`.

## Qual o propósito
Permitir que o usuário revise pendências e registre decisões de aprovação ou rejeição de forma centralizada.

## Referências
- `app/(app)/aprovacoes/page.tsx`
- `features/aprovacoes/components/aprovacoes-page.tsx`
- `features/aprovacoes/api/aprovacoes-acoes.api.ts`
- `features/aprovacoes/api/use-aprovacao-acao.ts`
