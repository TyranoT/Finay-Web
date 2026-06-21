import { formatCurrency } from "@/shared/helpers/format-currency";
import type { SaidaPrevista } from "../api/previstos.api";
import { diaDoISO } from "../hooks/use-mes-resumo";

interface ProximosVencimentosListProps {
  itens: SaidaPrevista[];
  isLoading?: boolean;
}

const MES_CURTO = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function mesCurtoDoISO(iso: string): string {
  const mes = Number(iso.split("-")[1]);
  return MES_CURTO[mes - 1] ?? "";
}

function PrevRow({ item }: { item: SaidaPrevista }) {
  const valor = item.valor_atual ?? item.valor_total;
  return (
    <div className="fx-prev-row">
      <div className="fx-prev-day">
        <strong>{diaDoISO(item.data_vencimento)}</strong>
        {mesCurtoDoISO(item.data_vencimento)}
      </div>
      <div>
        <div className="fx-prev-nome">{item.nome}</div>
        {item.categoria && (
          <div className="fx-prev-sub">{item.categoria.nome}</div>
        )}
      </div>
      <div className="fx-prev-valor">{formatCurrency(valor)}</div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="fx-prev-row">
      <div className="fx-prev-day">
        <strong style={{ background: "var(--line-2)", color: "transparent", borderRadius: 4 }}>
          00
        </strong>
        <span style={{ color: "var(--line-2)" }}>—</span>
      </div>
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
            width: 90,
            background: "var(--line-2)",
            borderRadius: 5,
          }}
        />
      </div>
      <div
        style={{
          height: 14,
          width: 80,
          background: "var(--line-2)",
          borderRadius: 5,
        }}
      />
    </div>
  );
}

/**
 * Lista vertical editorial de vencimentos próximos.
 *
 * Sem wrapper de card — o eyebrow da seção carrega a estrutura. Cada linha
 * mostra dia em destaque (numerais em mono), nome do compromisso e valor.
 */
export function ProximosVencimentosList({
  itens,
  isLoading,
}: ProximosVencimentosListProps) {
  if (isLoading) {
    return (
      <div className="fx-prev-list">
        {[1, 2, 3].map((i) => (
          <SkeletonRow key={i} />
        ))}
      </div>
    );
  }

  if (itens.length === 0) {
    return (
      <div
        style={{
          padding: "18px 4px",
          color: "var(--ink-3)",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Nada vence nas próximas duas semanas.
      </div>
    );
  }

  return (
    <div className="fx-prev-list">
      {itens.map((it) => (
        <PrevRow key={it.uid} item={it} />
      ))}
    </div>
  );
}
