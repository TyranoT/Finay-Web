"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchLugares } from "./lugares.api";

export function useLugares() {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();
  return useQuery({
    queryKey: ["lugares", escopo.uid ?? "pessoal"],
    queryFn: () => fetchLugares(token, escopo.uid),
    enabled: !!token,
    staleTime: 60_000,
  });
}
