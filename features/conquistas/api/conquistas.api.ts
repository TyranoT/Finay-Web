import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Conquista } from "../types";

function coerce(payload: unknown): Conquista[] {
  if (Array.isArray(payload)) return payload as Conquista[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["conquistas", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as Conquista[];
    }
  }
  return [];
}

export async function fetchConquistas(
  token: string,
  grupoUid: string | null,
): Promise<Conquista[]> {
  const params = new URLSearchParams({ pagina: "1", por_pagina: "200" });
  if (grupoUid) params.set("grupo_uid", grupoUid);
  try {
    const result = await fetcher.get<unknown>(
      `/conquista/listar?${params.toString()}`,
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
