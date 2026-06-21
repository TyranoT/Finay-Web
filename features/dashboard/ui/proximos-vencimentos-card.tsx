import { formatCurrency } from "@/shared/helpers/format-currency";
import { formatDate } from "@/shared/helpers/format-date";
import type { SaidaPrevista } from "../api/previstos.api";

interface ProximosVencimentosCardProps {
  itens: SaidaPrevista[];
  isLoading?: boolean;
}

function ItemRow({ item }: { item: SaidaPrevista }) {
  const valor = item.valor_atual ?? item.valor_total;
  return (
    <div
      className="row"
      style={{
        padding: "12px 0",
        gap: 12,
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "var(--amber-50)",
          display: "grid",
          placeItems: "center",
          color: "#B07A12",
          flexShrink: 0,
          fontWeight: 800,
        }}
      >
        {item.nome[0]?.toUpperCase() ?? "?"}
      </div>
      <div className="grow">
        <div className="t-body" style={{ fontWeight: 600 }}>
          {item.nome}
        </div>
        <div className="t-xs muted-2">
          Vence {formatDate(item.data_vencimento)}
          {item.categoria && ` · ${item.categoria.nome}`}
        </div>
      </div>
      <div className="num t-sm" style={{ fontWeight: 700 }}>
        {formatCurrency(valor)}
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="row" style={{ padding: "12px 0", gap: 12 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "var(--line-2)",
          flexShrink: 0,
        }}
      />
      <div className="grow">
        <div
          style={{
            height: 12,
            width: 130,
            background: "var(--line-2)",
            borderRadius: 5,
            marginBottom: 6,
          }}
        />
        <div
          style={{
            height: 11,
            width: 80,
            background: "var(--line-2)",
            borderRadius: 5,
          }}
        />
      </div>
      <div
        style={{
          height: 16,
          width: 70,
          background: "var(--line-2)",
          borderRadius: 5,
        }}
      />
    </div>
  );
}

/** Card "Próximos vencimentos" do dashboard. */
export function ProximosVencimentosCard({
  itens,
  isLoading,
}: ProximosVencimentosCardProps) {
  return (
    <div className="card card-pad" style={{ borderRadius: 24 }}>
      <div className="card-head">
        <span className="card-title">Próximos vencimentos</span>
      </div>
      {renderBody()}
    </div>
  );

  function renderBody() {
    if (isLoading) {
      return (
        <div>
          {[1, 2, 3].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      );
    }
    if (itens.length === 0) {
      return (
        <div style={{ padding: "20px 0", textAlign: "center" }}>
          <div className="t-sm muted-2">Nenhum vencimento próximo</div>
        </div>
      );
    }
    return (
      <div>
        {itens.map((it) => (
          <ItemRow key={it.uid} item={it} />
        ))}
      </div>
    );
  }
}
