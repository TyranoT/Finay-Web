"use client";

import { useMemo } from "react";
import type { Ativo } from "../types";
import type { Investimento } from "@/features/investimentos/types";
import type { SaldoItem } from "@/features/dashboard/types";

const PALAVRAS_PASSIVO = [
  "passivo",
  "divida",
  "dívida",
  "financiamento",
  "emprestimo",
  "empréstimo",
];

function ehPassivo(ativo: Ativo): boolean {
  const tipo = ativo.tipo?.nome?.toLowerCase() ?? "";
  if (PALAVRAS_PASSIVO.some((p) => tipo.includes(p))) return true;
  return ativo.valor_atual < 0;
}

export interface PatrimonioResumo {
  bens: Ativo[];
  passivos: Ativo[];
  totalBens: number;
  totalPassivos: number;
  totalInvestimentos: number;
  totalReserva: number;
  patrimonioBruto: number;
  patrimonioLiquido: number;
  valorizacao: number;
  composicao: ComposicaoSegmento[];
}

export interface ComposicaoSegmento {
  rotulo: string;
  valor: number;
  pct: number;
  cor: string;
}

const CORES_COMPOSICAO: Record<string, string> = {
  Imóveis: "#5B5FEF",
  Veículos: "#7C6CF5",
  Investimentos: "#00B894",
  Reserva: "#FFD166",
  Outros: "#94A3B8",
};

function classificarBem(ativo: Ativo): keyof typeof CORES_COMPOSICAO {
  const tipo = ativo.tipo?.nome?.toLowerCase() ?? "";
  if (tipo.includes("imóv") || tipo.includes("imov") || tipo.includes("apart") || tipo.includes("casa")) {
    return "Imóveis";
  }
  if (tipo.includes("ve") && tipo.includes("c")) return "Veículos";
  return "Outros";
}

/**
 * Destila a composição patrimonial a partir de ativos, investimentos
 * e reserva bancária (saldos consolidados).
 */
export function usePatrimonioResumo(
  ativos: Ativo[],
  investimentos: Investimento[],
  saldos: SaldoItem[],
): PatrimonioResumo {
  return useMemo(() => {
    const bens: Ativo[] = [];
    const passivos: Ativo[] = [];
    for (const a of ativos) {
      if (ehPassivo(a)) passivos.push(a);
      else bens.push(a);
    }

    const buckets: Record<string, number> = {
      Imóveis: 0,
      Veículos: 0,
      Investimentos: 0,
      Reserva: 0,
      Outros: 0,
    };

    let totalBens = 0;
    for (const b of bens) {
      const valor = b.valor_atual;
      totalBens += valor;
      const grupo = classificarBem(b);
      buckets[grupo] += valor;
    }

    let totalValorCompra = 0;
    for (const b of bens) totalValorCompra += b.valor_compra;
    const valorizacao = totalBens - totalValorCompra;

    let totalInvestimentos = 0;
    for (const i of investimentos) {
      totalInvestimentos += i.valor_atual ?? i.valor_aporte;
    }
    buckets.Investimentos = totalInvestimentos;

    let totalReserva = 0;
    if (Array.isArray(saldos)) {
      for (const s of saldos) totalReserva += s.total;
    }
    buckets.Reserva = Math.max(0, totalReserva);

    const totalPassivos = passivos.reduce(
      (acc, p) => acc + Math.abs(p.valor_atual),
      0,
    );

    const patrimonioBruto =
      totalBens + totalInvestimentos + Math.max(0, totalReserva);
    const patrimonioLiquido = patrimonioBruto - totalPassivos;

    const composicao: ComposicaoSegmento[] = Object.entries(buckets)
      .filter(([, v]) => v > 0)
      .map(([rotulo, valor]) => ({
        rotulo,
        valor,
        pct: patrimonioBruto > 0 ? (valor / patrimonioBruto) * 100 : 0,
        cor: CORES_COMPOSICAO[rotulo] ?? "#94A3B8",
      }))
      .sort((a, b) => b.valor - a.valor);

    return {
      bens,
      passivos,
      totalBens,
      totalPassivos,
      totalInvestimentos,
      totalReserva: Math.max(0, totalReserva),
      patrimonioBruto,
      patrimonioLiquido,
      valorizacao,
      composicao,
    };
  }, [ativos, investimentos, saldos]);
}
