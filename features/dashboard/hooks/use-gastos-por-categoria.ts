"use client";

import { useMemo } from "react";
import type { Saida } from "@/features/dashboard/types";

const CAT_PALETTE = [
  "#FF8A5B",
  "#00B894",
  "#5B5FEF",
  "#7C6CF5",
  "#F25C9A",
  "#F59E0B",
  "#14B8A6",
  "#16A34A",
];

const CAT_KEYWORDS: ReadonlyArray<readonly [string, string]> = [
  ["alimenta", "#FF8A5B"],
  ["comida", "#FF8A5B"],
  ["delivery", "#FF8A5B"],
  ["restaurante", "#FF8A5B"],
  ["mercado", "#00B894"],
  ["supermercado", "#00B894"],
  ["transporte", "#5B5FEF"],
  ["uber", "#5B5FEF"],
  ["casa", "#7C6CF5"],
  ["moradia", "#7C6CF5"],
  ["aluguel", "#7C6CF5"],
  ["lazer", "#F25C9A"],
  ["entretenimento", "#F25C9A"],
  ["saúde", "#14B8A6"],
  ["saude", "#14B8A6"],
  ["farmácia", "#14B8A6"],
  ["assinatura", "#F59E0B"],
  ["streaming", "#F59E0B"],
  ["renda", "#16A34A"],
  ["salário", "#16A34A"],
];

function pickColor(nome: string, idx: number): string {
  const lower = nome.toLowerCase();
  for (const [key, color] of CAT_KEYWORDS) {
    if (lower.includes(key)) return color;
  }
  return CAT_PALETTE[idx % CAT_PALETTE.length];
}

export interface GastoPorCategoria {
  uid: string;
  nome: string;
  total: number;
  color: string;
}

/**
 * Agrega saídas do mês por categoria, ordenadas por total decrescente.
 *
 * @param saidas - Lista bruta do mês corrente
 * @param topN - Quantidade máxima de categorias retornadas
 */
export function useGastosPorCategoria(
  saidas: Saida[],
  topN = 6,
): GastoPorCategoria[] {
  return useMemo(() => {
    const mapa = new Map<string, GastoPorCategoria>();
    let idx = 0;
    for (const s of saidas) {
      const cat = s.categoria;
      if (!cat || cat.opcao_entrada) continue;
      const existente = mapa.get(cat.uid);
      if (existente) {
        existente.total += s.valor;
      } else {
        mapa.set(cat.uid, {
          uid: cat.uid,
          nome: cat.nome,
          total: s.valor,
          color: pickColor(cat.nome, idx++),
        });
      }
    }
    return [...mapa.values()]
      .sort((a, b) => b.total - a.total)
      .slice(0, topN);
  }, [saidas, topN]);
}
