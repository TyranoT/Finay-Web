"use client";

import { create } from "zustand";

interface NovoLancamentoState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

/**
 * Store global que controla a abertura do drawer "Novo lançamento".
 *
 * O botão no `AppTopbar` chama `open()`; o drawer fecha-se chamando `close()`.
 */
export const useNovoLancamentoStore = create<NovoLancamentoState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
