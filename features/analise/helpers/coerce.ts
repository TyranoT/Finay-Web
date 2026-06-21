import { Saida } from "@/features/transacoes/types";

/**
 * Função Auxiliar de Correção
 * 
 * @param payload 
 * @returns 
 */
export function coerce(payload: unknown): Saida[] {
    if (Array.isArray(payload)) return payload as Saida[];
    if (payload && typeof payload === "object") {
        const obj = payload as Record<string, unknown>;
        for (const chave of ["saidas", "items", "data"]) {
            if (Array.isArray(obj[chave])) return obj[chave] as Saida[];
        }
    }
    return [];
}