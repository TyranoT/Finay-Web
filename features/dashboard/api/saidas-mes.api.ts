import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { Saida } from "@/features/dashboard/types";
import { getMonthRange } from "@/shared/helpers/format-date";

/**
 * Lista todas as transações do mês corrente para análises agregadas.
 *
 * Usa um `por_pagina` alto para garantir uma única chamada — o backend
 * retorna `{ saidas, total }` ou um array puro dependendo da rota.
 */
export async function fetchSaidasMes(
  token: string,
  grupoUid: string | null,
): Promise<Saida[]> {
  const { inicio, fim } = getMonthRange(new Date());
  const params = new URLSearchParams({
    data_inicio: inicio,
    data_fim: fim,
    pagina: "1",
    por_pagina: "500",
  });
  if (grupoUid) params.set("grupo_uid", grupoUid);

  const result = await fetcher.get<Saida[] | { saidas: Saida[] }>(
    `/saida/listar?${params.toString()}`,
    token,
  );

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  const data = (result.data ?? result) as unknown as Saida[] | { saidas: Saida[] };
  if (Array.isArray(data)) return data;
  if ("saidas" in data) return data.saidas;
  return [];
}
