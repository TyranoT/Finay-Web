"use client";

import { useMemo } from "react";
import type { SaidaPrevista, EntradaPrevista } from "../types";

export interface CompromissosResumo {
  total: number;
  pago: number;
  parcial: number;
  aPagar: number;
  atrasado: number;
  qtdAtrasados: number;
  qtdTotal: number;
  qtdAPagar: number;
  totalReceber: number;
  receberJa: number;
  qtdReceber: number;
}

function ehAtrasado(p: SaidaPrevista, hojeIso: string): boolean {
  if (p.status === "pago") return false;
  return p.data_vencimento < hojeIso;
}

/**
 * Destila as métricas dos compromissos do mês para a frase-tese e a strip.
 *
 * Considera o `valor_atual` quando presente (status parcial) e cai para
 * `valor_total` no fluxo normal.
 */
export function useCompromissosResumo(
  saidas: SaidaPrevista[],
  entradas: EntradaPrevista[],
): CompromissosResumo {
  return useMemo(() => {
    const hojeIso = new Date().toISOString().slice(0, 10);

    let total = 0;
    let pago = 0;
    let parcial = 0;
    let aPagar = 0;
    let atrasado = 0;
    let qtdAtrasados = 0;
    let qtdAPagar = 0;

    for (const p of saidas) {
      const valor = p.valor_total;
      const ja = (p.valor_total ?? 0) - (p.valor_atual ?? p.valor_total);
      total += valor;
      if (p.status === "pago") {
        pago += valor;
      } else if (p.status === "parcial") {
        parcial += ja;
        if (ehAtrasado(p, hojeIso)) {
          atrasado += p.valor_atual ?? 0;
          qtdAtrasados += 1;
        } else {
          aPagar += p.valor_atual ?? 0;
          qtdAPagar += 1;
        }
      } else if (ehAtrasado(p, hojeIso)) {
        atrasado += valor;
        qtdAtrasados += 1;
      } else {
        aPagar += valor;
        qtdAPagar += 1;
      }
    }

    let totalReceber = 0;
    let receberJa = 0;
    for (const e of entradas) {
      totalReceber += e.valor_total;
      if (e.status === "pago") receberJa += e.valor_total;
    }

    return {
      total,
      pago,
      parcial,
      aPagar,
      atrasado,
      qtdAtrasados,
      qtdTotal: saidas.length,
      qtdAPagar,
      totalReceber,
      receberJa,
      qtdReceber: entradas.length,
    };
  }, [saidas, entradas]);
}
