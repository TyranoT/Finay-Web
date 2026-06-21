# Dashboard

## Descrição
A feature `dashboard` é a visão inicial autenticada, reunindo indicadores, saldos, transações recentes, categorias, contas e próximos vencimentos.

## Estrutura
- `api/`: consultas de saldo, contas, saídas e previstos.
- `components/`: composição da página principal.
- `hooks/`: agregações e cálculos derivados.
- `ui/`: cards, listas, ribbons e blocos visuais.
- `types.ts`: contratos usados pela visão resumida.

## O que cada pasta contém
- `api` contém clients e hooks para saldo, contas, saídas recentes, saídas do mês e previstos.
- `components` contém `dashboard-page`.
- `hooks` contém `use-totais-mes`, `use-mes-resumo` e `use-gastos-por-categoria`.
- `ui` contém os blocos visuais da tela, como KPIs, feed de transações, barras por categoria e vencimentos.

## Rotas utilizadas
- Rota Next.js: `/dashboard`, em `app/(app)/dashboard/page.tsx`.
- API HTTP: `GET /saldo/listar`.
- API HTTP: `GET /conta/listar`.
- API HTTP: `GET /saida/listar`, com filtros de período e paginação.
- API HTTP: `GET /saida-prevista/listar`, com paginação, ordenação e `grupo_uid` opcional.

## Qual o propósito
Oferecer uma leitura rápida da situação financeira atual e orientar o usuário para áreas que exigem atenção.

## Referências
- `app/(app)/dashboard/page.tsx`
- `features/dashboard/components/dashboard-page.tsx`
- `features/dashboard/api`
- `features/dashboard/hooks`
- `features/dashboard/ui`
