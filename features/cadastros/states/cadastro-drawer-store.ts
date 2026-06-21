"use client";

import { create } from "zustand";
import type { Categoria } from "@/features/transacoes/types";
import type { Lugar, Pessoa, Item } from "../types";

export type CadastroTipo = "categoria" | "lugar" | "pessoa" | "item";

type Editando = Categoria | Lugar | Pessoa | Item | null;

interface DrawerState {
  isOpen: boolean;
  tipo: CadastroTipo | null;
  editando: Editando;
  abrir: (tipo: CadastroTipo, editando?: Editando) => void;
  fechar: () => void;
}

/**
 * Store global do drawer de Cadastros.
 *
 * Mantém qual tipo de entidade está sendo cadastrada/editada e o item
 * em edição (quando aplicável).
 */
export const useCadastroDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  tipo: null,
  editando: null,
  abrir: (tipo, editando = null) => set({ isOpen: true, tipo, editando }),
  fechar: () => set({ isOpen: false, tipo: null, editando: null }),
}));
