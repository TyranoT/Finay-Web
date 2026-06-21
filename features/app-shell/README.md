# App Shell

## Descrição
A feature `app-shell` define a moldura das páginas autenticadas: navegação lateral, topo, seletor de grupo e atalhos visuais persistentes.

## Estrutura
- `components/`: componentes estruturais do shell da aplicação.

## O que cada pasta contém
- `components` contém `app-shell`, `app-topbar`, `sidebar`, itens de navegação, ícones da sidebar, card de plano e seletor de grupo.

## Rotas utilizadas
- Rota Next.js: não possui rota própria.
- Layout Next.js: `app/(app)/layout.tsx`, aplicado às páginas autenticadas.
- API HTTP: não consome endpoint diretamente nesta feature.

## Qual o propósito
Padronizar navegação, contexto visual e troca de escopo entre área pessoal e grupos, evitando duplicação de layout nas páginas internas.

## Referências
- `app/(app)/layout.tsx`
- `features/app-shell/components/app-shell.tsx`
- `features/app-shell/components/sidebar.tsx`
- `shared/hook/useGrupoAtivo`
- `shared/hook/useTopbar`
