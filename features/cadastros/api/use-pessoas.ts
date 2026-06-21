"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchPessoas } from "./pessoas.api";

export function usePessoas() {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();
  return useQuery({
    queryKey: ["pessoas", escopo.uid ?? "pessoal"],
    queryFn: () => fetchPessoas(token, escopo.uid),
    enabled: !!token,
    staleTime: 60_000,
  });
}
