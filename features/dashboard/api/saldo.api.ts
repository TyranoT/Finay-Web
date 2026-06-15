import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { SaldoItem } from "@/features/dashboard/types";

/**
 * Busca a lista de saldos realizados do usuário.
 *
 * @param token - JWT do usuário autenticado
 * @returns Array de saldos por moeda
 * @throws {ApiResponseError} Quando a API retorna erro
 */
export async function fetchSaldo(token: string): Promise<SaldoItem[]> {
  const result = await fetcher.get<SaldoItem[]>("/saldo/listar", token);

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  return (result.data ?? result) as unknown as SaldoItem[];
}
