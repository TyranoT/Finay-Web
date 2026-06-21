import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Categoria } from "../types";

/**
 * Busca a árvore de categorias com filtros opcionais por tipo.
 *
 * @param token - JWT do usuário autenticado
 * @returns Array de categorias com subcategorias
 * @throws {ApiResponseError} Quando a API retorna erro
 */
export async function fetchCategorias(token: string): Promise<Categoria[]> {
  const result = await fetcher.get<Categoria[]>("/categoria/listar", token);

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  return (result.data ?? result) as unknown as Categoria[];
}
