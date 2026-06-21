import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";

export interface PessoaInput {
  nome: string;
  email?: string;
  cpf_cnpj?: string;
}

function assertOk(result: unknown): void {
  if (result && typeof result === "object" && "errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }
}

export async function criarPessoa(token: string, body: PessoaInput) {
  const result = await fetcher.post<unknown, PessoaInput>(
    "/pessoa/criar",
    token,
    body,
  );
  assertOk(result);
  return result;
}

export async function editarPessoa(
  token: string,
  uid: string,
  body: Partial<PessoaInput>,
) {
  const result = await fetcher.patch<unknown, Partial<PessoaInput>>(
    `/pessoa/${uid}`,
    token,
    body,
  );
  assertOk(result);
  return result;
}

export async function deletarPessoa(token: string, uid: string) {
  const result = await fetcher.delete<unknown>(`/pessoa/${uid}`, token);
  assertOk(result);
  return result;
}
