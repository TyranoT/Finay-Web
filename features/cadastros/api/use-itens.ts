"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchItens } from "./itens.api";

export function useItens() {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();
  return useQuery({
    queryKey: ["itens", escopo.uid ?? "pessoal"],
    queryFn: () => fetchItens(token, escopo.uid),
    enabled: !!token,
  });
}
