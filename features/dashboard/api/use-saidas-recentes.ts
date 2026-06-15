"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchSaidasRecentes } from "./saidas-recentes.api";

/** Hook para buscar as últimas 8 transações do mês atual. */
export function useSaidasRecentes() {
  const { token } = useSession();

  return useQuery({
    queryKey: ["saidas", "recentes"],
    queryFn: () => fetchSaidasRecentes(token),
    enabled: !!token,
  });
}
