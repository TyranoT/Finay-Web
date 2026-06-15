"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchSaldo } from "./saldo.api";

/** Hook para buscar saldos realizados do usuário autenticado. */
export function useSaldo() {
  const { token } = useSession();

  return useQuery({
    queryKey: ["saldo"],
    queryFn: () => fetchSaldo(token),
    enabled: !!token,
  });
}
