# Grupos

## Descrição
A feature `grupos` apresenta informações de membros e contexto de colaboração financeira para o grupo ativo.

## Estrutura
- `api/`: consulta de membros do grupo.
- `components/`: composição da página.
- `ui/`: hero e lista de membros.
- `types.ts`: contrato de membro de grupo.

## O que cada pasta contém
- `api` contém `membros.api` e `use-membros-grupo`.
- `components` contém `grupos-page`.
- `ui` contém `grupo-hero` e `membros-lista`.

## Rotas utilizadas
- Rota Next.js: `/grupos`, em `app/(app)/grupos/page.tsx`.
- API HTTP: `GET /grupo/{grupoUid}/membros`.

## Qual o propósito
Mostrar quem participa do grupo financeiro e apoiar a navegação entre contexto pessoal e compartilhado.

## Referências
- `app/(app)/grupos/page.tsx`
- `features/grupos/components/grupos-page.tsx`
- `features/grupos/api/membros.api.ts`
- `shared/hook/useGrupoAtivo`
