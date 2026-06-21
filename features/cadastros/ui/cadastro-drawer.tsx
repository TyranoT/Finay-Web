"use client";

import type { Categoria } from "@/features/transacoes/types";
import { useCadastroDrawerStore } from "../states/cadastro-drawer-store";
import { CategoriaForm } from "./forms/categoria-form";
import { LugarForm } from "./forms/lugar-form";
import { PessoaForm } from "./forms/pessoa-form";
import { ItemForm } from "./forms/item-form";
import type { Lugar, Pessoa, Item } from "../types";

/**
 * Drawer global de Cadastros — escolhe o form correto baseado no tipo
 * armazenado no store. Render no AppShell ou na própria página.
 */
export function CadastroDrawer() {
  const { isOpen, tipo, editando, fechar } = useCadastroDrawerStore();

  if (!isOpen || !tipo) return null;

  if (tipo === "categoria") {
    return <CategoriaForm editando={editando as Categoria | null} onClose={fechar} />;
  }
  if (tipo === "lugar") {
    return <LugarForm editando={editando as Lugar | null} onClose={fechar} />;
  }
  if (tipo === "pessoa") {
    return <PessoaForm editando={editando as Pessoa | null} onClose={fechar} />;
  }
  return <ItemForm editando={editando as Item | null} onClose={fechar} />;
}
