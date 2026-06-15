import { fetcher, ApiResponseError, type ResponseErrorType } from "@/shared/http/fetcher";
import type { RegisterCredentials, RegisterResponse } from "../types";

/**
 * Cria uma nova conta de usuário.
 *
 * @throws {ApiResponseError} Quando e-mail já está em uso ou dados inválidos
 */
export async function registerUser(credentials: RegisterCredentials): Promise<RegisterResponse> {
  const result = await fetcher.post<RegisterResponse, RegisterCredentials>(
    "/auth/register",
    "",
    credentials
  );

  if ("errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }

  // /auth/register retorna os dados do usuário diretamente (sem wrapper .data)
  return (result.data ?? result) as unknown as RegisterResponse;
}
