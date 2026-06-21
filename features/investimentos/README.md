# Investimentos

## Descrição
A feature `investimentos` exibe carteira, rendimento projetado e evolução esperada dos investimentos do escopo ativo.

## Estrutura
- `api/`: consulta de investimentos.
- `components/`: composição da página.
- `hooks/`: resumo da carteira e projeção.
- `ui/`: lista, frase principal e gráfico de projeção.
- `types.ts`: contrato de investimento.

## O que cada pasta contém
- `api` contém `investimentos.api` e `use-investimentos`.
- `components` contém `investimentos-page`.
- `hooks` contém `use-carteira-resumo` e `use-projecao-12m`.
- `ui` contém `carteira-list`, `hero-sentence-investimentos` e `projection-chart`.

## Rotas utilizadas
- Rota Next.js: `/investimentos`, em `app/(app)/investimentos/page.tsx`.
- API HTTP: `GET /investimento/listar`, com paginação e `grupo_uid` opcional.

## Qual o propósito
Acompanhar composição da carteira e projetar crescimento para apoiar decisões financeiras de médio prazo.

## Referências
- `app/(app)/investimentos/page.tsx`
- `features/investimentos/components/investimentos-page.tsx`
- `features/investimentos/api/investimentos.api.ts`
- `features/investimentos/hooks/use-projecao-12m.ts`
