import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";

export interface SaidaPrevista {
  uid: string;
  nome: string;
  valor_total: number;
  valor_atual?: number;
  data_vencimento: string;
  status?: string;
  categoria?: { nome: string };
}

/**
 * Lista as próximas saídas previstas (contas a pagar) no escopo ativo.
 *
 * @param limite - Quantidade máxima a retornar (default 5).
 */
export async function fetchProximasPrevistas(
  token: string,
  grupoUid: string | null,
  limite = 5,
): Promise<SaidaPrevista[]> {
  const params = new URLSearchParams({
    pagina: "1",
    por_pagina: String(limite),
    ordenar: "data_vencimento",
  });
  if (grupoUid) params.set("grupo_uid", grupoUid);

  const result = await fetcher.get<
    SaidaPrevista[] | { saidas_previstas: SaidaPrevista[] }
  >(`/saida-prevista/listar?${params.toString()}`, token);

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  const data = (result.data ?? result) as unknown as
    | SaidaPrevista[]
    | { saidas_previstas: SaidaPrevista[] };
  if (Array.isArray(data)) return data;
  if ("saidas_previstas" in data) return data.saidas_previstas;
  return [];
}
