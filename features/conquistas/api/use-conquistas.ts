"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchConquistas } from "./conquistas.api";

export function useConquistas() {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();
  return useQuery({
    queryKey: ["conquistas", escopo.uid ?? "pessoal"],
    queryFn: () => fetchConquistas(token, escopo.uid),
    enabled: !!token,
  });
}
