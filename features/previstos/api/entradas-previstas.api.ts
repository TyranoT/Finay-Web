import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { EntradaPrevista } from "../types";

interface FiltroPrevistos {
  data_inicio: string;
  data_fim: string;
  grupoUid: string | null;
}

function coerce(payload: unknown): EntradaPrevista[] {
  if (Array.isArray(payload)) return payload as EntradaPrevista[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["entradas_previstas", "previstas", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as EntradaPrevista[];
    }
  }
  return [];
}

/**
 * Lista entradas previstas (recebíveis, salários futuros) no período informado.
 */
export async function fetchEntradasPrevistas(
  token: string,
  filtros: FiltroPrevistos,
): Promise<EntradaPrevista[]> {
  const params = new URLSearchParams({
    data_inicio: filtros.data_inicio,
    data_fim: filtros.data_fim,
    pagina: "1",
    por_pagina: "200",
    ordenar: "data_vencimento",
  });
  if (filtros.grupoUid) params.set("grupo_uid", filtros.grupoUid);

  try {
    const result = await fetcher.get<unknown>(
      `/entrada-prevista/listar?${params.toString()}`,
      token,
    );
    if (result && typeof result === "object" && "errors" in result) {
      throw new ApiResponseError(result as ResponseErrorType);
    }
    const wrapper = result as { data?: unknown };
    return coerce(wrapper.data ?? result);
  } catch {
    return [];
  }
}
