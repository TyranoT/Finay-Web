import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";

interface AcaoResultado {
  ok: boolean;
  msg?: string;
}

async function executar(
  token: string,
  path: string,
): Promise<AcaoResultado> {
  try {
    const result = await fetcher.post<unknown, Record<string, unknown>>(
      path,
      token,
      {},
    );
    if (result && typeof result === "object" && "errors" in result) {
      throw new ApiResponseError(result as ResponseErrorType);
    }
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      msg: e instanceof Error ? e.message : "Falha ao processar",
    };
  }
}

export function aceitarAprovacao(token: string, uid: string) {
  return executar(token, `/aprovacao/${uid}/aceitar`);
}

export function rejeitarAprovacao(token: string, uid: string) {
  return executar(token, `/aprovacao/${uid}/rejeitar`);
}
