import { formatCurrency } from "@/shared/helpers/format-currency";
import type { Conta } from "../types";

interface ContasStripProps {
  contas: Conta[];
  isLoading?: boolean;
}

function ContaCard({ conta }: { conta: Conta }) {
  return (
    <div className="fx-conta-card">
      <span className="banco">{conta.banco?.nome ?? "Carteira"}</span>
      <span className="nome">{conta.nome}</span>
      <span className="saldo">{formatCurrency(conta.saldo_inicial)}</span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="fx-conta-card">
      <span
        style={{
          height: 10,
          width: 70,
          background: "var(--line-2)",
          borderRadius: 4,
          display: "block",
        }}
      />
      <span
        style={{
          height: 13,
          width: 110,
          background: "var(--line-2)",
          borderRadius: 4,
          display: "block",
          marginTop: 6,
        }}
      />
      <span
        style={{
          height: 20,
          width: 90,
          background: "var(--line-2)",
          borderRadius: 4,
          display: "block",
          marginTop: 6,
        }}
      />
    </div>
  );
}

/** Grade horizontal de contas — cada cartão é uma conta com banco, nome e saldo. */
export function ContasStrip({ contas, isLoading }: ContasStripProps) {
  if (isLoading) {
    return (
      <div className="fx-contas-strip">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (contas.length === 0) {
    return (
      <div
        style={{
          padding: "18px 4px",
          color: "var(--ink-3)",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Você ainda não cadastrou contas.
      </div>
    );
  }

  return (
    <div className="fx-contas-strip">
      {contas.map((c) => (
        <ContaCard key={c.uid} conta={c} />
      ))}
    </div>
  );
}
