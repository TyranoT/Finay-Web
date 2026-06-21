import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Loja } from "../types";

function coerce(payload: unknown): Loja[] {
  if (Array.isArray(payload)) return payload as Loja[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["lojas", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as Loja[];
    }
  }
  return [];
}

export async function fetchLojas(token: string): Promise<Loja[]> {
  try {
    const result = await fetcher.get<unknown>(
      `/loja/listar?pagina=1&por_pagina=200`,
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
