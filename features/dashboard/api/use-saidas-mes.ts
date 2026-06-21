"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchSaidasMes } from "./saidas-mes.api";

/** Todas as saídas do mês atual no escopo ativo (Pessoal ou Grupo). */
export function useSaidasMes() {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();

  return useQuery({
    queryKey: ["saidas", "mes", escopo.uid ?? "pessoal"],
    queryFn: () => fetchSaidasMes(token, escopo.uid),
    enabled: !!token,
  });
}
