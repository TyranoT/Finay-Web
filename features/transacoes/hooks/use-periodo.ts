"use client";

import { useState, useCallback } from "react";
import { getMonthRange, formatMonthYear } from "@/shared/helpers/format-date";
import type { FiltroSaidas } from "../types";

interface UsePeriodoReturn {
  periodoLabel: string;
  filtros: FiltroSaidas;
  avancarMes: () => void;
  voltarMes: () => void;
}

/**
 * Controla a navegação por mês para filtro de transações.
 *
 * @returns Rótulo do mês atual, filtros de data e funções de navegação
 */
export function usePeriodo(): UsePeriodoReturn {
  const [referencia, setReferencia] = useState<Date>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );

  const avancarMes = useCallback(() => {
    setReferencia((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const voltarMes = useCallback(() => {
    setReferencia((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const { inicio, fim } = getMonthRange(referencia);

  return {
    periodoLabel: formatMonthYear(referencia),
    filtros: { data_inicio: inicio, data_fim: fim },
    avancarMes,
    voltarMes,
  };
}
