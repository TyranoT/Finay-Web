import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Saida, SaidaCriar } from "../types";

/**
 * Cria uma nova transação (saída ou entrada).
 *
 * @param token - JWT do usuário autenticado
 * @param body - Dados da transação a criar
 * @returns Saída criada
 * @throws {ApiResponseError} Quando a API retorna erro de validação
 */
export async function criarSaida(
  token: string,
  body: SaidaCriar
): Promise<Saida> {
  const result = await fetcher.post<Saida, SaidaCriar>("/saida/criar", token, body);

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  return (result.data ?? result) as unknown as Saida;
}
