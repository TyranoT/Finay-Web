"use client";

import { useMemo } from "react";
import type { Investimento } from "../types";

export interface CarteiraResumo {
  totalAportado: number;
  valorAtual: number;
  rendimento: number;
  rendimentoPct: number;
  qtdAtivos: number;
  taxaMensalEstimada: number;
}

function estimarTaxaMensal(itens: Investimento[]): number {
  const itensComFator = itens.filter(
    (i) => typeof i.fator_rendimento === "number" && i.fator_rendimento > 0,
  );
  if (itensComFator.length === 0) return 0.008;
  const soma = itensComFator.reduce(
    (acc, i) => acc + (i.fator_rendimento ?? 0),
    0,
  );
  const media = soma / itensComFator.length;
  if (media > 0.5) return media / 100;
  return media;
}

/**
 * Destila o estado consolidado da carteira: total aportado, valor atual,
 * rendimento absoluto e percentual.
 */
export function useCarteiraResumo(itens: Investimento[]): CarteiraResumo {
  return useMemo(() => {
    let totalAportado = 0;
    let valorAtual = 0;
    for (const i of itens) {
      totalAportado += i.valor_aporte;
      valorAtual += i.valor_atual ?? i.valor_aporte;
    }
    const rendimento = valorAtual - totalAportado;
    const rendimentoPct =
      totalAportado > 0 ? (rendimento / totalAportado) * 100 : 0;
    return {
      totalAportado,
      valorAtual,
      rendimento,
      rendimentoPct,
      qtdAtivos: itens.length,
      taxaMensalEstimada: estimarTaxaMensal(itens),
    };
  }, [itens]);
}
