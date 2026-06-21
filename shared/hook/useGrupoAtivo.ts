"use client";

import { useGrupoContext } from "@/global/context/grupo_context";

/**
 * Acesso ergonômico ao escopo (Pessoal ou Grupo) ativo no app.
 *
 * @example
 * const { escopo, setEscopo } = useGrupoAtivo();
 * if (escopo.uid) { fetcher.get(`/saldo/listar?grupo_uid=${escopo.uid}`, token) }
 */
export const useGrupoAtivo = () => {
  const { escopo, grupos, isLoadingGrupos, setEscopo } = useGrupoContext();
  return {
    escopo,
    grupos,
    isLoadingGrupos,
    setEscopo,
    /** `true` quando um grupo (não Pessoal) está ativo. */
    isGrupo: escopo.uid !== null,
  };
};
