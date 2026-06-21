"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchAprovacoes } from "./aprovacoes.api";

/** Quantidade de aprovações pendentes, com refetch a cada minuto. */
export function useAprovacoesPendentes(): number {
  const { token } = useSession();

  const { data } = useQuery({
    queryKey: ["aprovacoes", "pendentes"],
    queryFn: () => fetchAprovacoes(token),
    enabled: !!token,
    refetchInterval: 60_000,
  });

  if (!Array.isArray(data)) return 0;
  return data.filter((a) => a.status === "pendente").length;
}
