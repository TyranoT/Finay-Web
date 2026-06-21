import { formatCurrency } from "@/shared/helpers/format-currency";
import type { GastoPorCategoria } from "../hooks/use-gastos-por-categoria";

interface CatBarsCardProps {
  gastos: GastoPorCategoria[];
  isLoading?: boolean;
}

function CatBar({ gasto, max }: { gasto: GastoPorCategoria; max: number }) {
  const pct = Math.min(100, max > 0 ? (gasto.total / max) * 100 : 0);
  return (
    <div className="row gap-3">
      <div
        className="cat cat-sm"
        style={{ background: gasto.color, flexShrink: 0 }}
      >
        <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>
          {gasto.nome[0]?.toUpperCase()}
        </span>
      </div>
      <div className="grow">
        <div
          className="row"
          style={{ justifyContent: "space-between", marginBottom: 6 }}
        >
          <span className="t-sm" style={{ fontWeight: 700 }}>
            {gasto.nome}
          </span>
          <span className="t-xs num muted">{formatCurrency(gasto.total)}</span>
        </div>
        <div className="bar" style={{ height: 7 }}>
          <i style={{ width: `${pct}%`, background: gasto.color }} />
        </div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="row gap-3">
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 11,
          background: "var(--line-2)",
          flexShrink: 0,
        }}
      />
      <div className="grow">
        <div
          style={{
            height: 12,
            width: 110,
            background: "var(--line-2)",
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <div
          style={{ height: 7, background: "var(--line-2)", borderRadius: 99 }}
        />
      </div>
    </div>
  );
}

/** Card "Gastos por categoria" do dashboard. */
export function CatBarsCard({ gastos, isLoading }: CatBarsCardProps) {
  const max = gastos[0]?.total ?? 1;
  return (
    <div className="card card-pad" style={{ borderRadius: 24 }}>
      <div className="card-head">
        <span className="card-title">Gastos por categoria</span>
      </div>
      <div className="col gap-5">
        {renderBody()}
      </div>
    </div>
  );

  function renderBody() {
    if (isLoading) {
      return [1, 2, 3, 4].map((i) => <SkeletonRow key={i} />);
    }
    if (gastos.length === 0) {
      return (
        <div className="t-sm muted">Nenhuma saída registrada este mês.</div>
      );
    }
    return gastos.map((g) => <CatBar key={g.uid} gasto={g} max={max} />);
  }
}
