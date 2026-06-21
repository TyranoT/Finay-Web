"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { deletarSaida } from "./deletar-saida.api";

/** Hook para remover uma transação e invalidar a lista de saídas. */
export function useDeletarSaida() {
  const { token } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (uid: string) => deletarSaida(token, uid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saidas"] });
      queryClient.invalidateQueries({ queryKey: ["saldo"] });
      queryClient.invalidateQueries({ queryKey: ["historico"] });
    },
  });
}
