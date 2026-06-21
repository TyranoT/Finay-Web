"use client";

import { useMemo } from "react";
import { MesAgregado } from "../type";

export interface AnaliseResumo {
  mediaEntradas: number;
  mediaSaidas: number;
  saldoTotal: number;
  melhorMes: MesAgregado | null;
  piorMes: MesAgregado | null;
  deltaUltimoVsAnterior: number;
  ultimoSaldo: number;
}

/**
 * Destila estatísticas dos últimos N meses para alimentar a frase-tese
 * e os cartões secundários da página de Análise.
 */
export function useAnaliseResumo(meses: MesAgregado[]): AnaliseResumo {
  return useMemo(() => {
    
    if (meses.length === 0) {
      return {
        mediaEntradas: 0,
        mediaSaidas: 0,
        saldoTotal: 0,
        melhorMes: null,
        piorMes: null,
        deltaUltimoVsAnterior: 0,
        ultimoSaldo: 0,
      };
    }

    let somaEntradas = 0;
    let somaSaidas = 0;
    let saldoTotal = 0;
    let melhorMes: MesAgregado | null = null;
    let piorMes: MesAgregado | null = null;

    for (const m of meses) {
      somaEntradas += m.entradas;
      somaSaidas += m.saidas;
      saldoTotal += m.saldo;
      if (!melhorMes || m.saldo > melhorMes.saldo) melhorMes = m;
      if (!piorMes || m.saldo < piorMes.saldo) piorMes = m;
    }

    const ultimoSaldo = meses[meses.length - 1].saldo;
    const anteriorSaldo = meses.length > 1 ? meses[meses.length - 2].saldo : 0;

    return {
      mediaEntradas: somaEntradas / meses.length,
      mediaSaidas: somaSaidas / meses.length,
      saldoTotal,
      melhorMes,
      piorMes,
      deltaUltimoVsAnterior: ultimoSaldo - anteriorSaldo,
      ultimoSaldo,
    };
  }, [meses]);
}
