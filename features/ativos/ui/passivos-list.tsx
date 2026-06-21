import { formatCurrency } from "@/shared/helpers/format-currency";
import type { Ativo } from "../types";

interface PassivosListProps {
  itens: Ativo[];
  isLoading?: boolean;
}

function Row({ passivo }: { passivo: Ativo }) {
  return (
    <div className="fx-bem-row">
      <div
        className="fx-bem-icon"
        style={{ background: "var(--coral)" }}
      >
        <span>−</span>
      </div>
      <div>
        <div className="fx-bem-nome">{passivo.nome}</div>
        <div className="fx-bem-sub">
          {passivo.tipo?.nome ?? "Dívida"}
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontFeatureSettings: '"tnum" 1',
          fontWeight: 700,
          fontSize: 15,
          color: "var(--coral)",
        }}
      >
        −{formatCurrency(Math.abs(passivo.valor_atual))}
      </div>
    </div>
  );
}

/** Lista de dívidas / passivos em aberto. */
export function PassivosList({ itens, isLoading }: PassivosListProps) {
  if (isLoading) {
    return (
      <div
        className="card card-pad"
        style={{
          borderRadius: 18,
          padding: "20px 22px",
          color: "var(--ink-3)",
          fontSize: 14,
        }}
      >
        Carregando…
      </div>
    );
  }

  if (itens.length === 0) {
    return (
      <div
        className="card card-pad"
        style={{
          borderRadius: 18,
          padding: "20px 22px",
          color: "var(--ink-3)",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Sem dívidas em aberto.
      </div>
    );
  }

  return (
    <div
      className="card card-pad"
      style={{ borderRadius: 18, padding: "8px 22px" }}
    >
      {itens.map((p) => (
        <Row key={p.uid} passivo={p} />
      ))}
    </div>
  );
}
