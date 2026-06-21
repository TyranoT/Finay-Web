import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Investimento } from "../types";

function coerce(payload: unknown): Investimento[] {
  if (Array.isArray(payload)) return payload as Investimento[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["investimentos", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as Investimento[];
    }
  }
  return [];
}

/**
 * Lista os investimentos do usuário ou grupo ativo.
 *
 * Tolerante a shape: aceita array puro, `{ data: [...] }`, `{ investimentos: [...] }`.
 */
export async function fetchInvestimentos(
  token: string,
  grupoUid: string | null,
): Promise<Investimento[]> {
  const params = new URLSearchParams({ pagina: "1", por_pagina: "200" });
  if (grupoUid) params.set("grupo_uid", grupoUid);

  try {
    const result = await fetcher.get<unknown>(
      `/investimento/listar?${params.toString()}`,
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
