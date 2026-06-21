"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchInvestimentos } from "./investimentos.api";

/** Investimentos do escopo ativo. */
export function useInvestimentos() {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();

  return useQuery({
    queryKey: ["investimentos", escopo.uid ?? "pessoal"],
    queryFn: () => fetchInvestimentos(token, escopo.uid),
    enabled: !!token,
    staleTime: 60_000,
  });
}
