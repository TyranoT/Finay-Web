import { formatCurrency } from "@/shared/helpers/format-currency";
import type { Investimento } from "../types";

interface CarteiraListProps {
  itens: Investimento[];
  isLoading?: boolean;
}

function calcRendimento(inv: Investimento): { abs: number; pct: number } {
  const atual = inv.valor_atual ?? inv.valor_aporte;
  const abs = atual - inv.valor_aporte;
  const pct = inv.valor_aporte > 0 ? (abs / inv.valor_aporte) * 100 : 0;
  return { abs, pct };
}

function formatPct(pct: number): string {
  const sign = pct >= 0 ? "+" : "−";
  return `${sign}${Math.abs(pct).toFixed(1).replace(".", ",")}%`;
}

function InvestimentoRow({ inv }: { inv: Investimento }) {
  const atual = inv.valor_atual ?? inv.valor_aporte;
  const { abs, pct } = calcRendimento(inv);
  const corRend = abs >= 0 ? "var(--jade-600)" : "var(--coral)";
  const sinal = abs >= 0 ? "+" : "−";

  return (
    <div className="fx-carteira-row">
      <div>
        <div className="fx-carteira-nome">{inv.nome}</div>
        <div className="fx-carteira-sub">
          {inv.tipo?.nome ?? "Investimento"} · Aporte{" "}
          {formatCurrency(inv.valor_aporte)}
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
          {formatCurrency(atual)}
        </div>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontFeatureSettings: '"tnum" 1',
            fontWeight: 700,
            fontSize: 12,
            color: corRend,
            marginTop: 2,
          }}
        >
          {sinal}
          {formatCurrency(Math.abs(abs))} · {formatPct(pct)}
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="fx-carteira-row">
      <div>
        <div style={{ height: 14, width: 140, background: "var(--line-2)", borderRadius: 5, marginBottom: 6 }} />
        <div style={{ height: 11, width: 100, background: "var(--line-2)", borderRadius: 5 }} />
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ height: 14, width: 90, background: "var(--line-2)", borderRadius: 5, marginBottom: 4, marginLeft: "auto" }} />
        <div style={{ height: 11, width: 70, background: "var(--line-2)", borderRadius: 5, marginLeft: "auto" }} />
      </div>
    </div>
  );
}

/**
 * Lista editorial da carteira — sem cabeçalhos de tabela, cada linha
 * é um investimento com nome, tipo e desempenho.
 */
export function CarteiraList({ itens, isLoading }: CarteiraListProps) {
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
        Você ainda não cadastrou investimentos.
      </div>
    );
  }

  return (
    <div
      className="card card-pad"
      style={{ borderRadius: 18, padding: "8px 22px" }}
    >
      {itens.map((inv) => (
        <InvestimentoRow key={inv.uid} inv={inv} />
      ))}
    </div>
  );
}
