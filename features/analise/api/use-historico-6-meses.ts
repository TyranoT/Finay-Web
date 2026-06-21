"use client";

import { useQueries } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { fetchMesAgregado } from "./saidas-mes.api";
import { MesAgregado } from "../type";
import { buildMesesReferencia } from "../helpers/build-meses-referencia";

interface HistoricoResultado {
  meses: MesAgregado[];
  isLoading: boolean;
}


/**
 * Busca em paralelo entradas/saídas dos últimos N meses (default 6).
 *
 * Cada mês vira sua própria query React Query — o cache é independente
 * e a UI pode renderizar o que já chegou enquanto o resto carrega.
 */
export function useHistoricoSeisMeses(qtd = 6): HistoricoResultado {
  const { token } = useSession();
  const { escopo } = useGrupoAtivo();
  const referencias = buildMesesReferencia(qtd);

  const queries = useQueries({
    queries: referencias.map(({ ano, mes }) => ({
      queryKey: ["historico", ano, mes, escopo.uid ?? "pessoal"],
      queryFn: () => fetchMesAgregado(token, ano, mes, escopo.uid),
      enabled: !!token,
    })),
  });

  const meses: MesAgregado[] = referencias.map((ref, idx) => {
    const data = queries[idx].data;
    if (data) return data;
    return {
      ano: ref.ano,
      mes: ref.mes,
      rotuloCurto: "",
      entradas: 0,
      saidas: 0,
      saldo: 0,
    };
  });

  const isLoading = queries.some((q) => q.isLoading);
  return { meses, isLoading };
}
