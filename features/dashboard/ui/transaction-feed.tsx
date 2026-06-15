import { formatCurrency } from "@/shared/helpers/format-currency";
import { formatDate } from "@/shared/helpers/format-date";
import type { Saida } from "../types";

interface TransactionFeedProps {
  saidas: Saida[];
  isLoading?: boolean;
}

function SkeletonRow() {
  return (
    <div className="row" style={{ padding: "12px 0", gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--line-2)", flexShrink: 0 }} />
      <div className="grow">
        <div style={{ height: 12, width: 120, background: "var(--line-2)", borderRadius: 5, marginBottom: 6 }} />
        <div style={{ height: 11, width: 80, background: "var(--line-2)", borderRadius: 5 }} />
      </div>
      <div className="col" style={{ alignItems: "flex-end", gap: 4 }}>
        <div style={{ height: 14, width: 80, background: "var(--line-2)", borderRadius: 5 }} />
        <div style={{ height: 11, width: 50, background: "var(--line-2)", borderRadius: 5 }} />
      </div>
    </div>
  );
}

function TransactionRow({ saida }: { saida: Saida }) {
  const isEntrada = saida.categoria?.opcao_entrada === true;
  const categoriaLabel = saida.categoria?.nome ?? "—";
  const initials = saida.nome.slice(0, 2).toUpperCase();

  return (
    <div
      className="row"
      style={{ padding: "12px 0", gap: 12, borderBottom: "1px solid var(--line)" }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
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
        <div className="t-body" style={{ fontWeight: 600 }}>{saida.nome}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span
            className="t-xs"
            style={{
              background: isEntrada ? "var(--jade-50)" : "var(--indigo-50)",
              color: isEntrada ? "var(--jade-600)" : "var(--indigo-600)",
              padding: "1px 7px",
              borderRadius: 99,
            }}
          >
            {categoriaLabel}
          </span>
        </div>
      </div>
      <div className="col" style={{ alignItems: "flex-end", gap: 2 }}>
        <span
          className="num t-sm"
          style={{ fontWeight: 700, color: isEntrada ? "var(--jade)" : "var(--ink-2)" }}
        >
          {isEntrada ? "+" : "−"}{formatCurrency(saida.valor)}
        </span>
        <span className="t-xs muted-2">{formatDate(saida.data)}</span>
      </div>
    </div>
  );
}

/**
 * Feed de transações recentes para o dashboard.
 */
export function TransactionFeed({ saidas, isLoading }: TransactionFeedProps) {
  if (isLoading) {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((i) => <SkeletonRow key={i} />)}
      </div>
    );
  }

  if (!saidas.length) {
    return (
      <div style={{ padding: "32px 0", textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>📭</div>
        <div className="t-sm muted-2">Nenhuma transação este mês</div>
      </div>
    );
  }

  return (
    <div>
      {saidas.map((saida) => (
        <TransactionRow key={saida.uid} saida={saida} />
      ))}
    </div>
  );
}
