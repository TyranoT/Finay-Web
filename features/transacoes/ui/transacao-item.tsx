import { formatCurrency } from "@/shared/helpers/format-currency";
import { formatDate } from "@/shared/helpers/format-date";
import { TipoBadge } from "./tipo-badge";
import type { Saida } from "../types";

interface TransacaoItemProps {
  saida: Saida;
  onEdit: (saida: Saida) => void;
  onDelete: (uid: string) => void;
}

/**
 * Linha de uma transação na listagem de Entrada/Saída.
 */
export function TransacaoItem({ saida, onEdit, onDelete }: TransacaoItemProps) {
  const isEntrada = saida.categoria?.opcao_entrada === true;
  const initials = saida.nome.slice(0, 2).toUpperCase();

  return (
    <div
      className="row"
      style={{
        padding: "13px 16px",
        borderBottom: "1px solid var(--line)",
        gap: 12,
        transition: "background .1s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          background: isEntrada ? "var(--jade-50)" : "var(--coral-50)",
          display: "grid",
          placeItems: "center",
          fontSize: 12,
          fontWeight: 700,
          color: isEntrada ? "var(--jade)" : "var(--coral)",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>

      <div className="grow">
        <div className="row gap-2" style={{ alignItems: "center", flexWrap: "wrap" }}>
          <span className="t-body" style={{ fontWeight: 600 }}>{saida.nome}</span>
          <TipoBadge isEntrada={isEntrada} />
          {saida.categoria && (
            <span
              className="t-xs muted-2"
              style={{
                background: "var(--line)",
                padding: "1px 7px",
                borderRadius: 99,
              }}
            >
              {saida.categoria.nome}
            </span>
          )}
        </div>
        {saida.descricao && (
          <div className="t-xs muted" style={{ marginTop: 2 }}>{saida.descricao}</div>
        )}
      </div>

      <div className="col" style={{ alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
        <span
          className="num t-sm"
          style={{ fontWeight: 700, color: isEntrada ? "var(--jade)" : "var(--ink-2)" }}
        >
          {isEntrada ? "+" : "−"}{formatCurrency(saida.valor)}
        </span>
        <span className="t-xs muted-2">{formatDate(saida.data)}</span>
      </div>

      <div className="row gap-2" style={{ flexShrink: 0, opacity: 0 }} data-actions>
        <button
          onClick={() => onEdit(saida)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 8,
            color: "var(--ink-3)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(saida.uid)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: 8,
            color: "var(--coral)",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
