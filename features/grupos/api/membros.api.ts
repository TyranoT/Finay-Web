import {
  fetcher,
  ApiResponseError,
  type ResponseErrorType,
} from "@/shared/http/fetcher";
import type { MembroGrupo } from "../types";

function coerce(payload: unknown): MembroGrupo[] {
  if (Array.isArray(payload)) return payload as MembroGrupo[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const chave of ["membros", "usuarios", "items", "data"]) {
      if (Array.isArray(obj[chave])) return obj[chave] as MembroGrupo[];
    }
  }
  return [];
}

/**
 * Lista os membros de um grupo específico.
 *
 * @param grupoUid - UID do grupo cujos membros queremos listar
 */
export async function fetchMembrosGrupo(
  token: string,
  grupoUid: string,
): Promise<MembroGrupo[]> {
  try {
    const result = await fetcher.get<unknown>(
      `/grupo/${grupoUid}/membros`,
      token,
    );
    if (result && typeof result === "object" && "errors" in result) {
      throw new ApiResponseError(result as ResponseErrorType);
    }
    const wrapper = result as { data?: unknown };
    return coerce(wrapper.data ?? result);
  } catch {
    return [];
  }
}
