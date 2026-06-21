"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchAtivos } from "./ativos.api";

/** Ativos do escopo ativo. */
export function useAtivos() {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();

  return useQuery({
    queryKey: ["ativos", escopo.uid ?? "pessoal"],
    queryFn: () => fetchAtivos(token, escopo.uid),
    enabled: !!token,
  });
}
