import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { ContaDetalhada, TipoConta } from "../types";

export interface ContaInput {
  nome: string;
  tipo: TipoConta;
  saldo_inicial: number;
  grupo_uid?: string;
  limite?: number;
  dia_vencimento?: number;
  dia_fechamento?: number;
}

function assertContaResult(result: unknown): ContaDetalhada {
  if (result && typeof result === "object" && "errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  const wrapper = result as { data?: ContaDetalhada };
  return (wrapper.data ?? result) as ContaDetalhada;
}

/** Cria uma conta bancária ou cartão no escopo informado. */
export async function criarConta(
  token: string,
  body: ContaInput,
): Promise<ContaDetalhada> {
  const result = await fetcher.post<ContaDetalhada, ContaInput>(
    "/conta/criar",
    token,
    body,
  );

  return assertContaResult(result);
}
