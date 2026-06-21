# Transações

## Descrição
A feature `transacoes` lista, cria, edita e remove lançamentos financeiros dentro de um período selecionado.

## Estrutura
- `api/`: consultas e mutations de transações, contas e categorias.
- `components/`: página, formulário e drawer de novo lançamento.
- `hooks/`: controle de período ativo.
- `ui/`: itens, badges, navegação de período e estado vazio.
- `types.ts`: contratos de transações, filtros, contas e categorias.

## O que cada pasta contém
- `api` contém clients para listar, criar, editar e deletar saídas, além de buscar contas e categorias.
- `components` contém `transacoes-page`, `transacao-form` e `novo-lancamento-drawer`.
- `hooks` contém `use-periodo`.
- `ui` contém `transacao-item`, `tipo-badge`, `periodo-nav` e `empty-state`.

## Rotas utilizadas
- Rota Next.js: `/transacoes`, em `app/(app)/transacoes/page.tsx`.
- API HTTP: `GET /saida/listar`, com filtros de período, paginação e `grupo_uid` opcional.
- API HTTP: `POST /saida/criar`.
- API HTTP: `PATCH /saida/{uid}`.
- API HTTP: `DELETE /saida/{uid}`.
- API HTTP: `GET /conta/listar`.
- API HTTP: `GET /categoria/listar`, com filtros de entrada e saída.

## Qual o propósito
Ser a área operacional para manutenção do extrato financeiro, garantindo que lançamentos alimentem dashboard, análise e previsões.

## Referências
- `app/(app)/transacoes/page.tsx`
- `features/transacoes/components/transacoes-page.tsx`
- `features/transacoes/components/transacao-form.tsx`
- `features/transacoes/api`
- `features/transacoes/hooks/use-periodo.ts`
