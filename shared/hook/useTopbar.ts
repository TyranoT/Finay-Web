"use client";

import { useEffect } from "react";
import { useTopbarStore } from "@/global/states/topbar-store";

interface UseTopbarParams {
  titulo: string;
  subtitulo?: string;
}

/**
 * Atualiza o título do `AppTopbar` quando o componente monta.
 *
 * Reseta para o estado inicial ao desmontar para evitar título "preso"
 * em transições entre páginas.
 */
export function useTopbar({ titulo, subtitulo = "" }: UseTopbarParams): void {
  const setTopbar = useTopbarStore((s) => s.setTopbar);
  const reset = useTopbarStore((s) => s.reset);

  useEffect(() => {
    setTopbar(titulo, subtitulo);
    return () => reset();
  }, [titulo, subtitulo, setTopbar, reset]);
}
