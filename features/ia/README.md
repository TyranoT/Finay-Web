# IA

## Descrição
A feature `ia` disponibiliza um assistente financeiro conversacional para responder perguntas sobre o contexto financeiro do usuário ou grupo.

## Estrutura
- `api/`: envio de perguntas ao assistente.
- `components/`: composição da página de chat.
- `hooks/`: estado e fluxo de mensagens.
- `ui/`: renderização de mensagens e estado vazio.
- `types.ts`: contratos do chat.

## O que cada pasta contém
- `api` contém `assistente.api`, que chama o backend do assistente.
- `components` contém `ia-page`.
- `hooks` contém `use-chat-ia`.
- `ui` contém `chat-mensagens` e `chat-empty`.

## Rotas utilizadas
- Rota Next.js: `/ia`, em `app/(app)/ia/page.tsx`.
- API HTTP: `POST /assistente/analise-financeira`.

## Qual o propósito
Permitir que o usuário investigue dados financeiros por perguntas em linguagem natural, mantendo o escopo ativo quando houver grupo selecionado.

## Referências
- `app/(app)/ia/page.tsx`
- `features/ia/components/ia-page.tsx`
- `features/ia/api/assistente.api.ts`
- `features/ia/hooks/use-chat-ia.ts`
