"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchGrupos } from "./grupos.api";

/** Hook para buscar os grupos do usuário autenticado. */
export function useGrupos() {
  const { token } = useSession();

  return useQuery({
    queryKey: ["grupos"],
    queryFn: () => fetchGrupos(token),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
}
