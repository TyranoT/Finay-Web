import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Saida, SaidaEditar } from "../types";

/**
 * Atualiza campos de uma transação existente.
 *
 * @param token - JWT do usuário autenticado
 * @param uid - Identificador da transação
 * @param body - Campos a atualizar
 * @returns Saída atualizada
 * @throws {ApiResponseError} Quando a API retorna erro
 */
export async function editarSaida(
  token: string,
  uid: string,
  body: SaidaEditar
): Promise<Saida> {
  const result = await fetcher.patch<Saida, SaidaEditar>(
    `/saida/${uid}`,
    token,
    body
  );

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  return (result.data ?? result) as unknown as Saida;
}
