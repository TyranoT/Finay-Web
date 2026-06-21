# Previstos

## Descrição
A feature `previstos` organiza entradas e saídas futuras para apresentar compromissos, recebíveis e projeção de caixa.

## Estrutura
- `api/`: consultas de entradas e saídas previstas.
- `components/`: composição da página.
- `hooks/`: resumo de compromissos.
- `ui/`: faixa de compromissos, linhas e frase principal.
- `types.ts`: contratos de previstos.

## O que cada pasta contém
- `api` contém `entradas-previstas.api`, `saidas-previstas.api` e seus hooks.
- `components` contém `previstos-page`.
- `hooks` contém `use-compromissos-resumo`.
- `ui` contém `compromissos-strip`, `previsto-row` e `hero-sentence-previstos`.

## Rotas utilizadas
- Rota Next.js: `/previstos`, em `app/(app)/previstos/page.tsx`.
- API HTTP: `GET /entrada-prevista/listar`, com filtros de período, paginação, ordenação e `grupo_uid` opcional.
- API HTTP: `GET /saida-prevista/listar`, com filtros de período, paginação, ordenação e `grupo_uid` opcional.

## Qual o propósito
Antecipar obrigações e recebimentos para que o usuário enxergue o fluxo financeiro antes que ele aconteça.

## Referências
- `app/(app)/previstos/page.tsx`
- `features/previstos/components/previstos-page.tsx`
- `features/previstos/api/entradas-previstas.api.ts`
- `features/previstos/api/saidas-previstas.api.ts`
