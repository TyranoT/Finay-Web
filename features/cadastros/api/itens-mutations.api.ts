import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";

export interface ItemInput {
  nome: string;
  tipo_uid?: string;
}

function assertOk(result: unknown): void {
  if (result && typeof result === "object" && "errors" in result) {
    throw new ApiResponseError(result as ResponseErrorType);
  }
}

export async function criarItem(token: string, body: ItemInput) {
  const result = await fetcher.post<unknown, ItemInput>(
    "/item/criar",
    token,
    body,
  );
  assertOk(result);
  return result;
}

export async function editarItem(
  token: string,
  uid: string,
  body: Partial<ItemInput>,
) {
  const result = await fetcher.patch<unknown, Partial<ItemInput>>(
    `/item/${uid}`,
    token,
    body,
  );
  assertOk(result);
  return result;
}

export async function deletarItem(token: string, uid: string) {
  const result = await fetcher.delete<unknown>(`/item/${uid}`, token);
  assertOk(result);
  return result;
}
