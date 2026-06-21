"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchContasTransacoes } from "./contas.api";

/** Hook para buscar contas disponíveis para seleção em transações. */
export function useContasTransacoes() {
  const { token } = useSession();

  return useQuery({
    queryKey: ["contas"],
    queryFn: () => fetchContasTransacoes(token),
    enabled: !!token,
  });
}
