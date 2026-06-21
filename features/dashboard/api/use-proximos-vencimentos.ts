"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchProximasPrevistas } from "./previstos.api";

/** Próximas saídas previstas (contas a pagar) no escopo ativo. */
export function useProximosVencimentos(limite = 4) {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();

  return useQuery({
    queryKey: ["saidas-previstas", "proximas", escopo.uid ?? "pessoal", limite],
    queryFn: () => fetchProximasPrevistas(token, escopo.uid, limite),
    enabled: !!token,
    retry: false,
  });
}
