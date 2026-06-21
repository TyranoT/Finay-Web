# Contas

## Descrição
A feature `contas` exibe contas bancárias e cartões com detalhes financeiros, como saldo, limite, fatura e vencimentos.

## Estrutura
- `api/`: consulta de contas detalhadas.
- `components/`: composição da página.
- `hooks/`: cálculo de resumo das contas.
- `ui/`: tiles e frase principal.
- `types.ts`: contratos de conta e cartão.

## O que cada pasta contém
- `api` contém `contas.api` e `use-contas-detalhadas`.
- `components` contém `contas-page`.
- `hooks` contém `use-contas-resumo`.
- `ui` contém `conta-tile`, `cartao-tile` e `hero-sentence-contas`.

## Rotas utilizadas
- Rota Next.js: `/contas`, em `app/(app)/contas/page.tsx`.
- API HTTP: `GET /conta/listar`, com paginação e `grupo_uid` opcional.

## Qual o propósito
Centralizar a visão de contas e cartões para apoiar acompanhamento de saldo, crédito e obrigações próximas.

## Referências
- `app/(app)/contas/page.tsx`
- `features/contas/components/contas-page.tsx`
- `features/contas/api/contas.api.ts`
- `features/contas/hooks/use-contas-resumo.ts`
