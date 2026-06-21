"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { criarConta, type ContaInput } from "./contas-mutations.api";

function useInvalidateContas() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["contas-detalhadas"] });
    queryClient.invalidateQueries({ queryKey: ["contas"] });
    queryClient.invalidateQueries({ queryKey: ["saldo"] });
  };
}

/** Cria conta no escopo ativo e atualiza as listas dependentes. */
export function useCriarConta() {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();
  const invalidate = useInvalidateContas();

  return useMutation({
    mutationFn: (body: Omit<ContaInput, "grupo_uid">) =>
      criarConta(token, {
        ...body,
        grupo_uid: escopo.uid ?? undefined,
      }),
    onSuccess: invalidate,
  });
}
