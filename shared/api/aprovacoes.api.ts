import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";

export interface AprovacaoResumo {
  uid: string;
  status: string;
  tipo?: string;
  criada_em?: string;
}

function coerceAprovacoes(payload: unknown): AprovacaoResumo[] {
  if (Array.isArray(payload)) return payload as AprovacaoResumo[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["aprovacoes", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as AprovacaoResumo[];
    }
  }
  return [];
}

/**
 * Lista aprovações do usuário autenticado (qualquer status).
 *
 * Tolerante a falha: retorna `[]` quando o endpoint não responde
 * ou retorna um shape inesperado, para que o badge no sidebar nunca
 * quebre o shell.
 */
export async function fetchAprovacoes(token: string): Promise<AprovacaoResumo[]> {
  try {
    const result = await fetcher.get<unknown>("/aprovacao/listar", token);
    if (result && typeof result === "object" && "errors" in result) {
      throw new ApiResponseError(result as ResponseErrorType);
    }
    const wrapper = result as { data?: unknown };
    return coerceAprovacoes(wrapper.data ?? result);
  } catch {
    return [];
  }
}
