# Conquistas

## Descrição
A feature `conquistas` apresenta metas, marcos ou realizações financeiras vinculadas ao escopo ativo.

## Estrutura
- `api/`: consulta de conquistas.
- `components/`: composição da página.
- `ui/`: cards de conquista.
- `types.ts`: contrato de conquista.

## O que cada pasta contém
- `api` contém `conquistas.api` e `use-conquistas`.
- `components` contém `conquistas-page`.
- `ui` contém `conquista-card`.

## Rotas utilizadas
- Rota Next.js: `/conquistas`, em `app/(app)/conquistas/page.tsx`.
- API HTTP: `GET /conquista/listar`, com paginação e `grupo_uid` opcional.

## Qual o propósito
Dar visibilidade a objetivos ou marcos financeiros e reforçar progresso dentro do produto.

## Referências
- `app/(app)/conquistas/page.tsx`
- `features/conquistas/components/conquistas-page.tsx`
- `features/conquistas/api/conquistas.api.ts`
- `features/conquistas/ui/conquista-card.tsx`
