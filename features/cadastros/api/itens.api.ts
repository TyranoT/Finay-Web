import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Item } from "../types";

function coerce(payload: unknown): Item[] {
  if (Array.isArray(payload)) return payload as Item[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["itens", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as Item[];
    }
  }
  return [];
}

export async function fetchItens(
  token: string,
  grupoUid: string | null,
): Promise<Item[]> {
  const params = new URLSearchParams({ pagina: "1", por_pagina: "200" });
  if (grupoUid) params.set("grupo_uid", grupoUid);
  try {
    const result = await fetcher.get<unknown>(
      `/item/listar?${params.toString()}`,
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
