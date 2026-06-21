"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { parseCookies, setCookie } from "nookies";
import { useGrupos } from "@/shared/api/use-grupos";
import {
  ESCOPO_PESSOAL,
  type EscopoAtivo,
  type Grupo,
} from "@/shared/types/grupo.type";

const COOKIE_KEY = "finay.grupo_uid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

interface IGrupoContext {
  escopo: EscopoAtivo;
  grupos: Grupo[];
  isLoadingGrupos: boolean;
  setEscopo: (uid: string | null) => void;
}

const GrupoContext = createContext<IGrupoContext | undefined>(undefined);

function readEscopoCookie(): string | null {
  if (typeof window === "undefined") return null;
  const cookies = parseCookies();
  const valor = cookies[COOKIE_KEY];
  return valor && valor.length > 0 ? valor : null;
}

function subscribeCookie(): () => void {
  return () => {};
}

function getServerSnapshot(): string | null {
  return null;
}

/**
 * Resolve o escopo ativo a partir do UID persistido e da lista de grupos.
 *
 * Quando o UID não pertence mais à lista (grupo removido, troca de conta etc.),
 * cai para Pessoal silenciosamente.
 */
function resolveEscopo(uid: string | null, grupos: Grupo[]): EscopoAtivo {
  if (!uid) return ESCOPO_PESSOAL;
  const grupo = grupos.find((g) => g.uid === uid);
  return grupo ? { uid: grupo.uid, nome: grupo.nome } : ESCOPO_PESSOAL;
}

export const GrupoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: grupos = [], isLoading: isLoadingGrupos } = useGrupos();

  const escopoUidFromCookie = useSyncExternalStore(
    subscribeCookie,
    readEscopoCookie,
    getServerSnapshot,
  );
  const [override, setOverride] = useState<{ uid: string | null } | null>(null);

  const escopoUid = override ? override.uid : escopoUidFromCookie;

  const setEscopo = useCallback((uid: string | null) => {
    setOverride({ uid });
    setCookie(null, COOKIE_KEY, uid ?? "", {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
  }, []);

  const escopo = useMemo(
    () => resolveEscopo(escopoUid, grupos),
    [escopoUid, grupos],
  );

  return (
    <GrupoContext.Provider
      value={{ escopo, grupos, isLoadingGrupos, setEscopo }}
    >
      {children}
    </GrupoContext.Provider>
  );
};

export const useGrupoContext = (): IGrupoContext => {
  const context = useContext(GrupoContext);
  if (!context) {
    throw new Error(
      "useGrupoContext deve ser usado dentro de um GrupoProvider",
    );
  }
  return context;
};
