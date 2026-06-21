# Lojas

## Descrição
A feature `lojas` lista estabelecimentos ou fornecedores relacionados às movimentações financeiras.

## Estrutura
- `api/`: consulta de lojas.
- `components/`: composição da página.
- `ui/`: card de loja.
- `types.ts`: contrato de loja.

## O que cada pasta contém
- `api` contém `lojas.api` e `use-lojas`.
- `components` contém `lojas-page`.
- `ui` contém `loja-card`.

## Rotas utilizadas
- Rota Next.js: `/lojas`, em `app/(app)/lojas/page.tsx`.
- API HTTP: `GET /loja/listar`, com paginação.

## Qual o propósito
Facilitar a identificação de locais de consumo e apoiar análises futuras por estabelecimento.

## Referências
- `app/(app)/lojas/page.tsx`
- `features/lojas/components/lojas-page.tsx`
- `features/lojas/api/lojas.api.ts`
- `features/lojas/ui/loja-card.tsx`
