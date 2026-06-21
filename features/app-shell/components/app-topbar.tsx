"use client";

import { useTopbarStore } from "@/global/states/topbar-store";
import { useNovoLancamentoStore } from "@/global/states/novo-lancamento-store";
import { GrupoSelector } from "./grupo-selector";
import { IconPlus } from "./sidebar-icons";

/**
 * Topbar fixo do app autenticado: título da página, seletor de grupo e
 * botão global de "Novo lançamento".
 *
 * Título é alimentado pelo hook `useTopbar` em cada página.
 */
export function AppTopbar() {
  const titulo = useTopbarStore((s) => s.titulo);
  const subtitulo = useTopbarStore((s) => s.subtitulo);
  const openNovoLancamento = useNovoLancamentoStore((s) => s.open);

  return (
    <div className="fx-topbar">
      <div style={{ minWidth: 0 }}>
        <div className="fx-greeting-h">{titulo}</div>
        {subtitulo && <div className="fx-greeting-s">{subtitulo}</div>}
      </div>
      <div className="fx-topbar-actions">
        <GrupoSelector />
        <button
          type="button"
          className="btn btn-primary"
          onClick={openNovoLancamento}
          style={{ paddingLeft: 14, paddingRight: 18 }}
        >
          <IconPlus />
          Novo lançamento
        </button>
      </div>
    </div>
  );
}
