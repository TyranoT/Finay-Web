"use client";

import { useMemo } from "react";
import type { Saida } from "@/features/dashboard/types";
import type { SaidaPrevista } from "@/features/dashboard/api/previstos.api";

export type DirecaoSaldo = "positivo" | "negativo" | "zerado";

export interface MesResumo {
  diaAtual: number;
  totalDias: number;
  diasRestantes: number;
  entradas: number;
  saidas: number;
  saldoLiquido: number;
  direcao: DirecaoSaldo;
  vencemEstaSemana: number;
  atrasados: number;
  proximoEmDias: number | null;
  proximoNome: string | null;
}

const MS_DIA = 86_400_000;

function diaDoISO(iso: string): number {
  return Number(iso.split("-")[2]);
}

/**
 * Destila as métricas necessárias para a frase-tese da Visão geral.
 *
 * Trabalha em memória sobre as listas já carregadas — não dispara fetches.
 *
 * @param saidas - Lançamentos do mês (entradas e saídas misturados, separados pela flag `categoria.opcao_entrada`)
 * @param previstos - Próximas saídas previstas ordenadas por vencimento
 */
export function useMesResumo(
  saidas: Saida[],
  previstos: SaidaPrevista[],
): MesResumo {
  return useMemo(() => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    const diasRestantes = Math.max(0, totalDias - diaAtual);

    let entradas = 0;
    let despesas = 0;
    for (const s of saidas) {
      if (s.categoria?.opcao_entrada) entradas += s.valor;
      else despesas += s.valor;
    }
    const saldoLiquido = entradas - despesas;
    const direcao: DirecaoSaldo =
      saldoLiquido > 0 ? "positivo" : saldoLiquido < 0 ? "negativo" : "zerado";

    const hojeInicio = new Date(ano, mes, diaAtual).getTime();
    let vencemEstaSemana = 0;
    let atrasados = 0;
    let proximoEmDias: number | null = null;
    let proximoNome: string | null = null;

    for (const p of previstos) {
      if (p.status === "pago") continue;
      const venc = new Date(p.data_vencimento).getTime();
      const dias = Math.round((venc - hojeInicio) / MS_DIA);
      if (dias < 0) {
        atrasados += 1;
        continue;
      }
      if (dias <= 7) vencemEstaSemana += 1;
      if (proximoEmDias === null || dias < proximoEmDias) {
        proximoEmDias = dias;
        proximoNome = p.nome;
      }
    }

    return {
      diaAtual,
      totalDias,
      diasRestantes,
      entradas,
      saidas: despesas,
      saldoLiquido,
      direcao,
      vencemEstaSemana,
      atrasados,
      proximoEmDias,
      proximoNome,
    };
  }, [saidas, previstos]);
}

export { diaDoISO };
