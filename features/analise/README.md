# Análise

## Descrição
A feature `analise` apresenta uma leitura consolidada dos últimos meses financeiros, combinando entradas, saídas, saldo líquido, médias, extremos e evolução histórica.

## Estrutura
- `api/`: consultas agregadas por mês, principalmente a composição de entradas e saídas a partir de transações.
- `components/`: composição da página e componentes auxiliares de apresentação.
- `constants/`: listas e valores fixos usados pela feature, como rótulos curtos de mês.
- `helpers/`: normalização de payloads e construção de períodos de referência.
- `hooks/`: cálculos derivados para resumo financeiro.
- `ui/`: elementos visuais reutilizáveis da tela, como gráfico, frase principal e cartões de médias.
- `type.ts`: contrato de dados agregados por mês.
- `index.ts`: ponto de exportação da feature quando aplicável.

## O que cada pasta contém
- `api` contém `use-historico-6-meses` e `saidas-mes.api`, responsáveis por buscar o histórico mensal no escopo ativo.
- `components` contém `analise-page`, que monta a experiência da rota.
- `constants` contém `mes_curto`, usado em rótulos de eixo e fallback visual.
- `helpers` contém funções puras para montar meses de referência e adaptar diferentes formatos de resposta.
- `hooks` contém `use-analise-resumo`, que transforma os meses em indicadores.
- `ui` contém peças visuais sem responsabilidade de busca de dados.

## Rotas utilizadas
- Rota Next.js: `/analise`, em `app/(app)/analise/page.tsx`.
- API HTTP: `GET /saida/listar`, com filtros de período, paginação e `grupo_uid` opcional.

## Qual o propósito
Dar ao usuário uma visão analítica de tendência financeira, destacando se o período recente melhorou ou piorou e quais meses explicam esse comportamento.

## Referências
- `app/(app)/analise/page.tsx`
- `features/analise/components/analise-page.tsx`
- `features/analise/api/saidas-mes.api.ts`
- `features/dashboard/api/use-saidas-mes.ts`
- `features/dashboard/hooks/use-gastos-por-categoria.ts`
