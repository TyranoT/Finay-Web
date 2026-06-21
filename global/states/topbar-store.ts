"use client";

import { create } from "zustand";

interface TopbarState {
  titulo: string;
  subtitulo: string;
  setTopbar: (titulo: string, subtitulo: string) => void;
  reset: () => void;
}

const INITIAL_TITULO = "Visão geral";
const INITIAL_SUBTITULO = "";

/**
 * Store global que sincroniza o título exibido no `AppTopbar`.
 *
 * Cada página chama `setTopbar(...)` em `useEffect` para alimentar o header
 * sem precisar lifting de estado pelo layout.
 */
export const useTopbarStore = create<TopbarState>((set) => ({
  titulo: INITIAL_TITULO,
  subtitulo: INITIAL_SUBTITULO,
  setTopbar: (titulo, subtitulo) => set({ titulo, subtitulo }),
  reset: () => set({ titulo: INITIAL_TITULO, subtitulo: INITIAL_SUBTITULO }),
}));
