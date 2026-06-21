"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchMembrosGrupo } from "./membros.api";

export function useMembrosGrupo(grupoUid: string | null) {
  const { token } = useSession();
  return useQuery({
    queryKey: ["grupo-membros", grupoUid],
    queryFn: () => fetchMembrosGrupo(token, grupoUid as string),
    enabled: !!token && !!grupoUid,
  });
}
