"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { editarSaida } from "./editar-saida.api";
import type { SaidaEditar } from "../types";

/** Hook para editar uma transação existente e invalidar a lista de saídas. */
export function useEditarSaida() {
  const { token } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uid, body }: { uid: string; body: SaidaEditar }) =>
      editarSaida(token, uid, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saidas"] });
    },
  });
}
