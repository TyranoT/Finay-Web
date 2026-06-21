"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchContasDetalhadas } from "./contas.api";

/** Contas detalhadas no escopo ativo. */
export function useContasDetalhadas() {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();

  return useQuery({
    queryKey: ["contas-detalhadas", escopo.uid ?? "pessoal"],
    queryFn: () => fetchContasDetalhadas(token, escopo.uid),
    enabled: !!token,
  });
}
