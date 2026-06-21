import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Ativo } from "../types";

function coerce(payload: unknown): Ativo[] {
  if (Array.isArray(payload)) return payload as Ativo[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["ativos", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as Ativo[];
    }
  }
  return [];
}

/**
 * Lista ativos (imóveis, veículos, joias) e potenciais dívidas vinculadas.
 *
 * Tolerante a shape: aceita array puro, `{ data: [...] }`, `{ ativos: [...] }`.
 */
export async function fetchAtivos(
  token: string,
  grupoUid: string | null,
): Promise<Ativo[]> {
  const params = new URLSearchParams({ pagina: "1", por_pagina: "200" });
  if (grupoUid) params.set("grupo_uid", grupoUid);

  try {
    const result = await fetcher.get<unknown>(
      `/ativo/listar?${params.toString()}`,
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
