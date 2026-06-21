"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import {
  aceitarAprovacao,
  rejeitarAprovacao,
} from "./aprovacoes-acoes.api";

type Acao = "aceitar" | "rejeitar";

interface MutationArgs {
  uid: string;
  acao: Acao;
}

/**
 * Mutation única para aceitar ou rejeitar uma aprovação.
 *
 * Ao sucesso invalida `["aprovacoes"]` e o contador `["aprovacoes","pendentes"]`
 * para que o sidebar e a listagem se refresquem.
 */
export function useAprovacaoAcao() {
  const { token } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uid, acao }: MutationArgs) =>
      acao === "aceitar"
        ? aceitarAprovacao(token, uid)
        : rejeitarAprovacao(token, uid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aprovacoes"] });
    },
  });
}
