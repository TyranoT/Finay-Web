"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchSaidas } from "./saidas.api";
import type { FiltroSaidas } from "../types";

/**
 * Hook para buscar transações filtradas por período.
 *
 * @param filtros - Período e opções de paginação
 */
export function useSaidas(filtros: FiltroSaidas) {
  const { token } = useSession();

  return useQuery({
    queryKey: ["saidas", filtros],
    queryFn: () => fetchSaidas(token, filtros),
    enabled: !!token,
  });
}
