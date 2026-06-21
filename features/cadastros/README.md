# Cadastros

## Descrição
A feature `cadastros` reúne entidades auxiliares usadas para classificar e contextualizar transações, como pessoas, lugares, itens e categorias.

## Estrutura
- `api/`: consultas de pessoas, lugares e itens.
- `components/`: composição da página.
- `ui/`: grades, árvores e nuvens visuais.
- `types.ts`: contratos das entidades cadastrais.

## O que cada pasta contém
- `api` contém hooks e clients para `pessoas`, `lugares` e `itens`.
- `components` contém `cadastros-page`.
- `ui` contém `pessoas-grid`, `tag-cloud` e `categoria-tree`.

## Rotas utilizadas
- Rota Next.js: `/cadastros`, em `app/(app)/cadastros/page.tsx`.
- API HTTP: `GET /pessoa/listar`, com paginação e `grupo_uid` opcional.
- API HTTP: `GET /lugar/listar`, com paginação e `grupo_uid` opcional.
- API HTTP: `GET /item/listar`, com paginação e `grupo_uid` opcional.

## Qual o propósito
Organizar cadastros de apoio para melhorar categorização, filtros e leitura das movimentações financeiras.

## Referências
- `app/(app)/cadastros/page.tsx`
- `features/cadastros/components/cadastros-page.tsx`
- `features/cadastros/api/pessoas.api.ts`
- `features/cadastros/api/lugares.api.ts`
- `features/cadastros/api/itens.api.ts`
