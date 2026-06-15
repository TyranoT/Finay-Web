"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { criarSaida } from "./criar-saida.api";
import type { SaidaCriar } from "../types";

/** Hook para criar uma nova transação e invalidar a lista de saídas. */
export function useCriarSaida() {
  const { token } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: SaidaCriar) => criarSaida(token, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saidas"] });
    },
  });
}
