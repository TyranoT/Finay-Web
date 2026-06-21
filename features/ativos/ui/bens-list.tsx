import { formatCurrency } from "@/shared/helpers/format-currency";
import type { Ativo } from "../types";

interface BensListProps {
  itens: Ativo[];
  isLoading?: boolean;
}

const ICONES: Array<{ chave: string; cor: string; emoji: string }> = [
  { chave: "imov", cor: "#5B5FEF", emoji: "🏠" },
  { chave: "apart", cor: "#5B5FEF", emoji: "🏠" },
  { chave: "casa", cor: "#5B5FEF", emoji: "🏠" },
  { chave: "ve", cor: "#7C6CF5", emoji: "🚗" },
  { chave: "reserva", cor: "#FFD166", emoji: "💎" },
  { chave: "joia", cor: "#FFD166", emoji: "💎" },
];

function iconePorTipo(tipo: string | undefined): { cor: string; inicial: string } {
  const t = (tipo ?? "").toLowerCase();
  for (const ic of ICONES) {
    if (t.includes(ic.chave)) return { cor: ic.cor, inicial: ic.emoji };
  }
  return { cor: "#94A3B8", inicial: (tipo ?? "?").slice(0, 1).toUpperCase() };
}

function calcValorizacao(ativo: Ativo): { abs: number; pct: number } {
  const abs = ativo.valor_atual - ativo.valor_compra;
  const pct = ativo.valor_compra > 0 ? (abs / ativo.valor_compra) * 100 : 0;
  return { abs, pct };
}

function Row({ ativo }: { ativo: Ativo }) {
  const { cor, inicial } = iconePorTipo(ativo.tipo?.nome);
  const { abs, pct } = calcValorizacao(ativo);
  const corVal = abs >= 0 ? "var(--jade-600)" : "var(--coral)";
  const sinal = abs >= 0 ? "+" : "−";

  return (
    <div className="fx-bem-row">
      <div className="fx-bem-icon" style={{ background: cor }}>
        <span>{inicial}</span>
      </div>
      <div>
        <div className="fx-bem-nome">{ativo.nome}</div>
        <div className="fx-bem-sub">
          {ativo.tipo?.nome ?? "Ativo"} · Compra {formatCurrency(ativo.valor_compra)}
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontFeatureSettings: '"tnum" 1',
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {formatCurrency(ativo.valor_atual)}
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontFeatureSettings: '"tnum" 1',
            fontWeight: 700,
            fontSize: 12,
            color: corVal,
            marginTop: 2,
          }}
        >
          {sinal}
          {formatCurrency(Math.abs(abs))} · {sinal}
          {Math.abs(pct).toFixed(1).replace(".", ",")}%
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="fx-bem-row">
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          background: "var(--line-2)",
        }}
      />
      <div>
        <div
          style={{
            height: 14,
            width: 160,
            background: "var(--line-2)",
            borderRadius: 5,
            marginBottom: 6,
          }}
        />
        <div
          style={{
            height: 11,
            width: 110,
            background: "var(--line-2)",
            borderRadius: 5,
          }}
        />
      </div>
      <div
        style={{
          height: 14,
          width: 90,
          background: "var(--line-2)",
          borderRadius: 5,
        }}
      />
    </div>
  );
}

/** Lista editorial de bens. */
export function BensList({ itens, isLoading }: BensListProps) {
  if (isLoading) {
    return (
      <div
        className="card card-pad"
        style={{ borderRadius: 18, padding: "8px 22px" }}
      >
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} />
        ))}
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
        Você ainda não cadastrou bens.
      </div>
    );
  }

  return (
    <div
      className="card card-pad"
      style={{ borderRadius: 18, padding: "8px 22px" }}
    >
      {itens.map((a) => (
        <Row key={a.uid} ativo={a} />
      ))}
    </div>
  );
}
