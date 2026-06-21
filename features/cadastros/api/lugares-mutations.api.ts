import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";

export interface LugarInput {
  nome: string;
  cidade?: string;
  estado?: string;
}

function assertOk(result: unknown): void {
  if (result && typeof result === "object" && "errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }
}

export async function criarLugar(token: string, body: LugarInput) {
  const result = await fetcher.post<unknown, LugarInput>(
    "/lugar/criar",
    token,
    body,
  );
  assertOk(result);
  return result;
}

export async function editarLugar(
  token: string,
  uid: string,
  body: Partial<LugarInput>,
) {
  const result = await fetcher.patch<unknown, Partial<LugarInput>>(
    `/lugar/${uid}`,
    token,
    body,
  );
  assertOk(result);
  return result;
}

export async function deletarLugar(token: string, uid: string) {
  const result = await fetcher.delete<unknown>(`/lugar/${uid}`, token);
  assertOk(result);
  return result;
}
