import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Grupo } from "@/shared/types/grupo.type";

/**
 * Lista os grupos dos quais o usuário autenticado faz parte.
 *
 * @param token - JWT do usuário autenticado
 * @throws {ApiResponseError} Quando a API retorna erro
 */
export async function fetchGrupos(token: string): Promise<Grupo[]> {
  const result = await fetcher.get<Grupo[]>("/grupo/listar", token);

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  return (result.data ?? result) as unknown as Grupo[];
}
