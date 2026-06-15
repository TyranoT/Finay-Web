import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Saida } from "@/features/dashboard/types";
import { getMonthRange, toISODate } from "@/shared/helpers/format-date";

/**
 * Busca as transações recentes do mês atual (máx. 8).
 *
 * @param token - JWT do usuário autenticado
 * @returns Array de saídas recentes
 * @throws {ApiResponseError} Quando a API retorna erro
 */
export async function fetchSaidasRecentes(token: string): Promise<Saida[]> {
  const { inicio, fim } = getMonthRange(new Date());
  const params = new URLSearchParams({
    data_inicio: inicio,
    data_fim: fim,
    pagina: "1",
    por_pagina: "8",
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
