"use client";

import { useMemo } from "react";

export interface MesProjetado {
  mesIndex: number;
  principal: number;
  rendimento: number;
  total: number;
}

interface UseProjecaoParams {
  valorAtual: number;
  totalAportado: number;
  taxaMensal: number;
  aporteMensal?: number;
  meses?: number;
}

/**
 * Projeta o patrimônio investido ao longo dos próximos meses.
 *
 * @param valorAtual - Posição consolidada hoje
 * @param totalAportado - Total já aportado até agora
 * @param taxaMensal - Taxa média mensal (0.01 = 1%)
 * @param aporteMensal - Aporte planejado por mês (default 0)
 * @param meses - Janela da projeção (default 12)
 */
export function useProjecao12m({
  valorAtual,
  totalAportado,
  taxaMensal,
  aporteMensal = 0,
  meses = 12,
}: UseProjecaoParams): MesProjetado[] {
  return useMemo(() => {
    const out: MesProjetado[] = [];
    let principal = totalAportado;
    let total = valorAtual;

    for (let m = 1; m <= meses; m += 1) {
      total = total * (1 + taxaMensal) + aporteMensal;
      principal += aporteMensal;
      const rendimento = Math.max(0, total - principal);
      out.push({
        mesIndex: m,
        principal: Math.max(0, principal),
        rendimento,
        total,
      });
    }
    return out;
  }, [valorAtual, totalAportado, taxaMensal, aporteMensal, meses]);
}
