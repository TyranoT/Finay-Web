import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Conta } from "../types";

/**
 * Busca as contas bancárias do usuário logado.
 *
 * @param token - JWT do usuário autenticado
 * @returns Array de contas
 * @throws {ApiResponseError} Quando a API retorna erro
 */
export async function fetchContasTransacoes(token: string): Promise<Conta[]> {
  const result = await fetcher.get<Conta[]>("/conta/listar", token);

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  return (result.data ?? result) as unknown as Conta[];
}
