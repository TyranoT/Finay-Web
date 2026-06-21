import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";

export interface CategoriaInput {
  nome: string;
  opcao_entrada: boolean;
  opcao_saida: boolean;
  categoria_pai_uid?: string | null;
}

function assertOk(result: unknown): void {
  if (result && typeof result === "object" && "errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }
}

export async function criarCategoria(token: string, body: CategoriaInput) {
  const result = await fetcher.post<unknown, CategoriaInput>(
    "/categoria/criar",
    token,
    body,
  );
  assertOk(result);
  return result;
}

export async function editarCategoria(
  token: string,
  uid: string,
  body: Partial<CategoriaInput>,
) {
  const result = await fetcher.patch<unknown, Partial<CategoriaInput>>(
    `/categoria/${uid}`,
    token,
    body,
  );
  assertOk(result);
  return result;
}

export async function deletarCategoria(token: string, uid: string) {
  const result = await fetcher.delete<unknown>(`/categoria/${uid}`, token);
  assertOk(result);
  return result;
}
