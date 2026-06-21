"use client";

import { useMemo } from "react";
import type { Saida } from "@/features/dashboard/types";

export interface TotaisMes {
  entradas: number;
  saidas: number;
  saldoLiquido: number;
}

/**
 * Soma entradas e saídas do mês baseado na flag `opcao_entrada` da categoria.
 *
 * Memoizado para evitar recálculo a cada render do dashboard.
 */
export function useTotaisMes(transacoes: Saida[]): TotaisMes {
  return useMemo(() => {
    let entradas = 0;
    let saidas = 0;
    for (const t of transacoes) {
      if (t.categoria?.opcao_entrada) entradas += t.valor;
      else saidas += t.valor;
    }
    return { entradas, saidas, saldoLiquido: entradas - saidas };
  }, [transacoes]);
}
