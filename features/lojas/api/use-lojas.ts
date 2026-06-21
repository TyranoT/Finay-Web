"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { fetchLojas } from "./lojas.api";

export function useLojas() {
  const { token } = useSession();
  return useQuery({
    queryKey: ["lojas"],
    queryFn: () => fetchLojas(token),
    enabled: !!token,
  });
}
