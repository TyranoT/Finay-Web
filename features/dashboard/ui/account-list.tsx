import { formatCurrency } from "@/shared/helpers/format-currency";
import type { Conta } from "../types";

interface AccountListProps {
  contas: Conta[];
  isLoading?: boolean;
}

function SkeletonRow() {
  return (
    <div className="row" style={{ padding: "12px 0", gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--line-2)", flexShrink: 0 }} />
      <div className="grow">
        <div style={{ height: 12, width: 100, background: "var(--line-2)", borderRadius: 5, marginBottom: 6 }} />
        <div style={{ height: 11, width: 70, background: "var(--line-2)", borderRadius: 5 }} />
      </div>
      <div style={{ height: 16, width: 70, background: "var(--line-2)", borderRadius: 5 }} />
    </div>
  );
}

function AccountRow({ conta }: { conta: Conta }) {
  const initials = conta.nome.slice(0, 2).toUpperCase();

  return (
    <div
      className="row"
      style={{ padding: "12px 0", gap: 12, borderBottom: "1px solid var(--line)", cursor: "default" }}
    >
      <div
        className="av av-md"
        style={{ background: "var(--indigo)", borderRadius: 10, border: "none", fontSize: 12 }}
      >
        {initials}
      </div>
      <div className="grow">
        <div className="t-body" style={{ fontWeight: 600 }}>{conta.nome}</div>
        {conta.banco && (
          <div className="t-xs muted-2">{conta.banco.nome}</div>
        )}
      </div>
      <div className="num t-sm" style={{ fontWeight: 700 }}>
        {formatCurrency(conta.saldo_inicial)}
      </div>
    </div>
  );
}

/**
 * Lista de contas bancárias com saldo inicial.
 */
export function AccountList({ contas, isLoading }: AccountListProps) {
  if (isLoading) {
    return (
      <div>
        {[1, 2, 3].map((i) => <SkeletonRow key={i} />)}
      </div>
    );
  }

  if (!contas.length) {
    return (
      <div style={{ padding: "24px 0", textAlign: "center" }}>
        <div className="t-sm muted-2">Nenhuma conta cadastrada</div>
      </div>
    );
  }

  return (
    <div>
      {contas.map((conta) => (
        <AccountRow key={conta.uid} conta={conta} />
      ))}
    </div>
  );
}
