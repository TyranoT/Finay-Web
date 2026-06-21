"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchEntradasPrevistas } from "./entradas-previstas.api";

interface UseParams {
  dataInicio: string;
  dataFim: string;
}

/** Entradas previstas no período + escopo ativo. */
export function useEntradasPrevistas({ dataInicio, dataFim }: UseParams) {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();

  return useQuery({
    queryKey: ["entradas-previstas", dataInicio, dataFim, escopo.uid ?? "pessoal"],
    queryFn: () =>
      fetchEntradasPrevistas(token, {
        data_inicio: dataInicio,
        data_fim: dataFim,
        grupoUid: escopo.uid,
      }),
    enabled: !!token,
  });
}
