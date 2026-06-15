"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchCategorias } from "./categorias.api";

/** Hook para buscar todas as categorias disponíveis. */
export function useCategorias() {
  const { token } = useSession();

  return useQuery({
    queryKey: ["categorias"],
    queryFn: () => fetchCategorias(token),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
}
