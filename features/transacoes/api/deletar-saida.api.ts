import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";

/**
 * Remove (soft delete) uma transação pelo seu identificador.
 *
 * @param token - JWT do usuário autenticado
 * @param uid - Identificador da transação
 * @throws {ApiResponseError} Quando a API retorna erro
 */
export async function deletarSaida(token: string, uid: string): Promise<void> {
  const result = await fetcher.delete<void>(`/saida/${uid}`, token);

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }
}
