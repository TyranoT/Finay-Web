import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Saida, FiltroSaidas } from "../types";

/**
 * Busca a lista de transações com filtros de data e paginação.
 *
 * @param token - JWT do usuário autenticado
 * @param filtros - Período e opções de paginação
 * @returns Array de saídas
 * @throws {ApiResponseError} Quando a API retorna erro
 */
export async function fetchSaidas(
  token: string,
  filtros: FiltroSaidas
): Promise<Saida[]> {
  const params = new URLSearchParams({
    data_inicio: filtros.data_inicio,
    data_fim: filtros.data_fim,
    pagina: String(filtros.pagina ?? 1),
    por_pagina: String(filtros.por_pagina ?? 50),
  });

  const result = await fetcher.get<Saida[] | { saidas: Saida[] }>(
    `/saida/listar?${params.toString()}`,
    token
  );

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  const data = (result.data ?? result) as unknown as Saida[] | { saidas: Saida[] };

  if (Array.isArray(data)) return data;
  if ("saidas" in data) return data.saidas;
  return [];
}
