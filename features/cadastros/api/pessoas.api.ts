import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Pessoa } from "../types";

function coerce(payload: unknown): Pessoa[] {
  if (Array.isArray(payload)) return payload as Pessoa[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["pessoas", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as Pessoa[];
    }
  }
  return [];
}

export async function fetchPessoas(
  token: string,
  grupoUid: string | null,
): Promise<Pessoa[]> {
  const params = new URLSearchParams({ pagina: "1", por_pagina: "200" });
  if (grupoUid) params.set("grupo_uid", grupoUid);
  try {
    const result = await fetcher.get<unknown>(
      `/pessoa/listar?${params.toString()}`,
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
