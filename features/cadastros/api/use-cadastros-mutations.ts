"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/shared/hook/useSession";
import {
  criarCategoria,
  editarCategoria,
  deletarCategoria,
  type CategoriaInput,
} from "./categorias-mutations.api";
import {
  criarLugar,
  editarLugar,
  deletarLugar,
  type LugarInput,
} from "./lugares-mutations.api";
import {
  criarPessoa,
  editarPessoa,
  deletarPessoa,
  type PessoaInput,
} from "./pessoas-mutations.api";
import {
  criarItem,
  editarItem,
  deletarItem,
  type ItemInput,
} from "./itens-mutations.api";

const INVALIDATION_KEYS = {
  categoria: ["categorias"],
  lugar: ["lugares"],
  pessoa: ["pessoas"],
  item: ["itens"],
} as const;

function useInvalidate(tipo: keyof typeof INVALIDATION_KEYS) {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: INVALIDATION_KEYS[tipo] });
}

interface MutationVars<T> {
  uid?: string;
  body: T;
}

export function useCriarCategoria() {
  const { token } = useSession();
  const invalidate = useInvalidate("categoria");
  return useMutation({
    mutationFn: (body: CategoriaInput) => criarCategoria(token, body),
    onSuccess: invalidate,
  });
}

export function useEditarCategoria() {
  const { token } = useSession();
  const invalidate = useInvalidate("categoria");
  return useMutation({
    mutationFn: ({ uid, body }: { uid: string; body: Partial<CategoriaInput> }) =>
      editarCategoria(token, uid, body),
    onSuccess: invalidate,
  });
}

export function useDeletarCategoria() {
  const { token } = useSession();
  const invalidate = useInvalidate("categoria");
  return useMutation({
    mutationFn: (uid: string) => deletarCategoria(token, uid),
    onSettled: invalidate,
  });
}

export function useCriarLugar() {
  const { token } = useSession();
  const invalidate = useInvalidate("lugar");
  return useMutation({
    mutationFn: (body: LugarInput) => criarLugar(token, body),
    onSuccess: invalidate,
  });
}

export function useEditarLugar() {
  const { token } = useSession();
  const invalidate = useInvalidate("lugar");
  return useMutation({
    mutationFn: ({ uid, body }: MutationVars<Partial<LugarInput>>) =>
      editarLugar(token, uid as string, body),
    onSuccess: invalidate,
  });
}

export function useDeletarLugar() {
  const { token } = useSession();
  const invalidate = useInvalidate("lugar");
  return useMutation({
    mutationFn: (uid: string) => deletarLugar(token, uid),
    onSettled: invalidate,
  });
}

export function useCriarPessoa() {
  const { token } = useSession();
  const invalidate = useInvalidate("pessoa");
  return useMutation({
    mutationFn: (body: PessoaInput) => criarPessoa(token, body),
    onSuccess: invalidate,
  });
}

export function useEditarPessoa() {
  const { token } = useSession();
  const invalidate = useInvalidate("pessoa");
  return useMutation({
    mutationFn: ({ uid, body }: MutationVars<Partial<PessoaInput>>) =>
      editarPessoa(token, uid as string, body),
    onSuccess: invalidate,
  });
}

export function useDeletarPessoa() {
  const { token } = useSession();
  const invalidate = useInvalidate("pessoa");
  return useMutation({
    mutationFn: (uid: string) => deletarPessoa(token, uid),
    onSettled: invalidate,
  });
}

export function useCriarItem() {
  const { token } = useSession();
  const invalidate = useInvalidate("item");
  return useMutation({
    mutationFn: (body: ItemInput) => criarItem(token, body),
    onSuccess: invalidate,
  });
}

export function useEditarItem() {
  const { token } = useSession();
  const invalidate = useInvalidate("item");
  return useMutation({
    mutationFn: ({ uid, body }: MutationVars<Partial<ItemInput>>) =>
      editarItem(token, uid as string, body),
    onSuccess: invalidate,
  });
}

export function useDeletarItem() {
  const { token } = useSession();
  const invalidate = useInvalidate("item");
  return useMutation({
    mutationFn: (uid: string) => deletarItem(token, uid),
    onSettled: invalidate,
  });
}
