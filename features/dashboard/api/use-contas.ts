"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchContas } from "./contas.api";

/** Hook para buscar contas bancárias do usuário autenticado. */
export function useContas() {
  const { token } = useSession();

  return useQuery({
    queryKey: ["contas"],
    queryFn: () => fetchContas(token),
    enabled: !!token,
  });
}
