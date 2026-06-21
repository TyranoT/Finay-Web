import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { ContaDetalhada } from "../types";

function coerce(payload: unknown): ContaDetalhada[] {
  if (Array.isArray(payload)) return payload as ContaDetalhada[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["contas", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as ContaDetalhada[];
    }
  }
  return [];
}

/**
 * Lista todas as contas (correntes, poupanças, cartões) com detalhes
 * estendidos como limite, fatura e datas de vencimento/fechamento.
 */
export async function fetchContasDetalhadas(
  token: string,
  grupoUid: string | null,
): Promise<ContaDetalhada[]> {
  const params = new URLSearchParams({ pagina: "1", por_pagina: "200" });
  if (grupoUid) params.set("grupo_uid", grupoUid);

  try {
    const result = await fetcher.get<unknown>(
      `/conta/listar?${params.toString()}`,
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
