"use client";

import { useNovoLancamentoStore } from "@/global/states/novo-lancamento-store";
import { TransacaoForm } from "./transacao-form";

/**
 * Drawer global de "Novo lançamento".
 *
 * Reaproveita o `TransacaoForm` (mesmo formulário usado para editar) e
 * conecta o ciclo de abertura ao store Zustand. Quando o usuário fecha
 * ou conclui o submit, o store é resetado.
 */
export function NovoLancamentoDrawer() {
  const isOpen = useNovoLancamentoStore((s) => s.isOpen);
  const close = useNovoLancamentoStore((s) => s.close);

  if (!isOpen) return null;

  return <TransacaoForm onClose={close} />;
}
