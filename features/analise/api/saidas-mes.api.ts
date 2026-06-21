import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Saida } from "@/features/dashboard/types";
import { getMonthRange } from "@/shared/helpers/format-date";

export interface MesAgregado {
  ano: number;
  mes: number;
  rotuloCurto: string;
  entradas: number;
  saidas: number;
  saldo: number;
}

const MES_CURTO = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function coerce(payload: unknown): Saida[] {
  if (Array.isArray(payload)) return payload as Saida[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["saidas", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as Saida[];
    }
  }
  return [];
}

/**
 * Agrega entradas e saídas de um mês específico em uma só requisição.
 *
 * Usa o flag `categoria.opcao_entrada` para separar receitas de despesas
 * dentro do payload de `/saida/listar`.
 */
export async function fetchMesAgregado(
  token: string,
  ano: number,
  mes: number,
  grupoUid: string | null,
): Promise<MesAgregado> {
  const referencia = new Date(ano, mes, 1);
  const { inicio, fim } = getMonthRange(referencia);
  const params = new URLSearchParams({
    data_inicio: inicio,
    data_fim: fim,
    pagina: "1",
    por_pagina: "500",
  });
  if (grupoUid) params.set("grupo_uid", grupoUid);

  const vazio: MesAgregado = {
    ano,
    mes,
    rotuloCurto: MES_CURTO[mes] ?? "",
    entradas: 0,
    saidas: 0,
    saldo: 0,
  };

  try {
    const result = await fetcher.get<unknown>(
      `/saida/listar?${params.toString()}`,
      token,
    );
    if (result && typeof result === "object" && "errors" in result) {
      throw new ApiResponseError(result as ResponseErrorType);
    }
    const wrapper = result as { data?: unknown };
    const saidas = coerce(wrapper.data ?? result);

    let entradas = 0;
    let despesas = 0;
    for (const s of saidas) {
      if (s.categoria?.opcao_entrada) entradas += s.valor;
      else despesas += s.valor;
    }
    return {
      ano,
      mes,
      rotuloCurto: MES_CURTO[mes] ?? "",
      entradas,
      saidas: despesas,
      saldo: entradas - despesas,
    };
  } catch {
    return vazio;
  }
}
