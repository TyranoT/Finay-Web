# Ativos

## Descrição
A feature `ativos` apresenta bens patrimoniais, passivos relacionados e a composição do patrimônio bruto do escopo ativo.

## Estrutura
- `api/`: consulta de ativos.
- `components/`: composição da página.
- `hooks/`: cálculo do resumo patrimonial.
- `ui/`: listas, frase principal e gráfico de composição.
- `types.ts`: contratos de ativos e estruturas de resumo.

## O que cada pasta contém
- `api` contém `ativos.api` e `use-ativos`, que carregam ativos do usuário ou grupo.
- `components` contém `ativos-page`, que organiza a experiência da rota.
- `hooks` contém `use-patrimonio-resumo`, que calcula totais e percentuais.
- `ui` contém `bens-list`, `passivos-list`, `hero-sentence-ativos` e `composicao-donut`.

## Rotas utilizadas
- Rota Next.js: `/ativos`, em `app/(app)/ativos/page.tsx`.
- API HTTP: `GET /ativo/listar`, com paginação e `grupo_uid` opcional.

## Qual o propósito
Mostrar a composição do patrimônio e apoiar a leitura de bens, dívidas e distribuição patrimonial.

## Referências
- `app/(app)/ativos/page.tsx`
- `features/ativos/components/ativos-page.tsx`
- `features/ativos/api/ativos.api.ts`
- `features/ativos/hooks/use-patrimonio-resumo.ts`
