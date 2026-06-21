"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchSaidas } from "./saidas.api";
import type { FiltroSaidas } from "../types";

/**
 * Hook para buscar transações filtradas por período no escopo ativo.
 *
 * @param filtros - Período e opções de paginação (escopo de grupo é
 *   injetado automaticamente do contexto).
 */
export function useSaidas(filtros: FiltroSaidas) {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();
  const filtrosComEscopo: FiltroSaidas = { ...filtros, grupo_uid: escopo.uid };

  return useQuery({
    queryKey: ["saidas", filtrosComEscopo],
    queryFn: () => fetchSaidas(token, filtrosComEscopo),
    enabled: !!token,
  });
}
