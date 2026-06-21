import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";

interface PerguntaPayload {
  pergunta: string;
  grupo_uid?: string | null;
}

interface RespostaAssistente {
  resposta?: string;
  mensagem?: string;
  texto?: string;
}

function extrairResposta(payload: unknown): string {
  if (typeof payload === "string") return payload;
  if (payload && typeof payload === "object") {
    const obj = payload as RespostaAssistente & { data?: unknown };
    if (typeof obj.resposta === "string") return obj.resposta;
    if (typeof obj.mensagem === "string") return obj.mensagem;
    if (typeof obj.texto === "string") return obj.texto;
    if (obj.data) return extrairResposta(obj.data);
  }
  return "Não consegui processar agora. Tente reformular a pergunta.";
}

/**
 * Envia uma pergunta para o assistente financeiro.
 *
 * Tolerante a shape: aceita string pura, `{resposta}`, `{mensagem}`,
 * `{texto}` ou `{data: ...}`.
 */
export async function perguntarAssistente(
  token: string,
  pergunta: string,
  grupoUid: string | null,
): Promise<string> {
  const body: PerguntaPayload = { pergunta };
  if (grupoUid) body.grupo_uid = grupoUid;

  try {
    const result = await fetcher.post<unknown, PerguntaPayload>(
      "/assistente/analise-financeira",
      token,
      body,
    );
    if (result && typeof result === "object" && "errors" in result) {
      throw new ApiResponseError(result as ResponseErrorType);
    }
    return extrairResposta(result);
  } catch {
    return "O assistente está indisponível no momento. Tente daqui a pouco.";
  }
}
