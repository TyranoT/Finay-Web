import { fetcher, ApiResponseError, type ResponseErrorType } from "@/shared/http/fetcher";
import type { LoginCredentials, AuthTokenResponse } from "../types";

/**
 * Autentica o usuário com e-mail e senha.
 *
 * @throws {ApiResponseError} Quando a API retorna credenciais inválidas ou erros de validação
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthTokenResponse> {
  const result = await fetcher.post<AuthTokenResponse, LoginCredentials>(
    "/auth/login",
    "",
    credentials
  );

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  // /auth/login retorna os campos diretamente (sem wrapper .data)
  return (result.data ?? result) as unknown as AuthTokenResponse;
}
