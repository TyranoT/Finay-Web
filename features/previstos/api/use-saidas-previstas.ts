"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchSaidasPrevistas } from "./saidas-previstas.api";

interface UseParams {
  dataInicio: string;
  dataFim: string;
}

/** Saídas previstas no período + escopo ativo. */
export function useSaidasPrevistas({ dataInicio, dataFim }: UseParams) {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();

  return useQuery({
    queryKey: ["saidas-previstas", dataInicio, dataFim, escopo.uid ?? "pessoal"],
    queryFn: () =>
      fetchSaidasPrevistas(token, {
        data_inicio: dataInicio,
        data_fim: dataFim,
        grupoUid: escopo.uid,
      }),
    enabled: !!token,
  });
}
