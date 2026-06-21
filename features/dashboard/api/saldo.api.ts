import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { SaldoItem } from "@/features/dashboard/types";

function coerce(payload: unknown): SaldoItem[] {
  if (Array.isArray(payload)) return payload as SaldoItem[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["saldos", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as SaldoItem[];
    }
    if (typeof obj.total === "number") return [obj as unknown as SaldoItem];
  }
  return [];
}

/**
 * Busca os saldos realizados do usuário, tolerando shapes diferentes
 * (array puro, `{data: [...]}`, `{saldos: [...]}`, ou objeto único).
 *
 * @param token - JWT do usuário autenticado
 */
export async function fetchSaldo(token: string): Promise<SaldoItem[]> {
  try {
    const result = await fetcher.get<unknown>("/saldo/listar", token);
    if (result && typeof result === "object" && "errors" in result) {
      throw new ApiResponseError(result as ResponseErrorType);
    }
    const wrapper = result as { data?: unknown };
    return coerce(wrapper.data ?? result);
  } catch {
    return [];
  }
}
