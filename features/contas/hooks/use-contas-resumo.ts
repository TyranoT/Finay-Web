"use client";

import { useMemo } from "react";
import { ehCartao, type ContaDetalhada } from "../types";

export interface ContasResumo {
  totalDisponivel: number;
  totalFatura: number;
  totalLimite: number;
  limiteUtilizadoPct: number;
  qtdContas: number;
  qtdCartoes: number;
  proximoVencimento: { conta: ContaDetalhada; emDias: number } | null;
}

function saldo(conta: ContaDetalhada): number {
  return conta.saldo_atual ?? conta.saldo_inicial;
}

function diasAteDia(diaAlvo: number): number {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const candidato = new Date(ano, mes, diaAlvo);
  if (candidato < hoje) candidato.setMonth(candidato.getMonth() + 1);
  return Math.ceil((candidato.getTime() - hoje.getTime()) / 86_400_000);
}

/** Consolidação de contas + cartões para a frase-tese da página. */
export function useContasResumo(contas: ContaDetalhada[]): ContasResumo {
  return useMemo(() => {
    let totalDisponivel = 0;
    let totalFatura = 0;
    let totalLimite = 0;
    let qtdCartoes = 0;
    let proximoVencimento: ContasResumo["proximoVencimento"] = null;

    for (const c of contas) {
      if (ehCartao(c)) {
        qtdCartoes += 1;
        totalFatura += c.fatura_atual ?? 0;
        totalLimite += c.limite ?? 0;
        if (c.dia_vencimento) {
          const dias = diasAteDia(c.dia_vencimento);
          if (!proximoVencimento || dias < proximoVencimento.emDias) {
            proximoVencimento = { conta: c, emDias: dias };
          }
        }
      } else {
        totalDisponivel += saldo(c);
      }
    }

    const limiteUtilizadoPct =
      totalLimite > 0 ? (totalFatura / totalLimite) * 100 : 0;

    return {
      totalDisponivel,
      totalFatura,
      totalLimite,
      limiteUtilizadoPct,
      qtdContas: contas.length - qtdCartoes,
      qtdCartoes,
      proximoVencimento,
    };
  }, [contas]);
}
