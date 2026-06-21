import { formatCurrency } from "@/shared/helpers/format-currency";
import type { CompromissosResumo } from "../hooks/use-compromissos-resumo";

interface CompromissosStripProps {
  resumo: CompromissosResumo;
}

interface Segmento {
  pct: number;
  cor: string;
  label: string;
  valor: number;
}

function buildSegmentos(r: CompromissosResumo): Segmento[] {
  if (r.total <= 0) return [];
  const pct = (v: number) => (v / r.total) * 100;
  return [
    { pct: pct(r.pago), cor: "var(--jade)", label: "Pago", valor: r.pago },
    { pct: pct(r.parcial), cor: "var(--amber)", label: "Parcial", valor: r.parcial },
    { pct: pct(r.aPagar), cor: "var(--indigo)", label: "A pagar", valor: r.aPagar },
    { pct: pct(r.atrasado), cor: "var(--coral)", label: "Atrasado", valor: r.atrasado },
  ].filter((s) => s.valor > 0);
}

/**
 * Barra horizontal segmentada com os compromissos do mês.
 *
 * Mostra em uma linha só o quanto já saiu, o quanto está pendente
 * e o quanto está atrasado — uma leitura instantânea da situação.
 */
export function CompromissosStrip({ resumo }: CompromissosStripProps) {
  const segmentos = buildSegmentos(resumo);

  if (segmentos.length === 0) {
    return (
      <div
        style={{
          padding: "18px 4px",
          color: "var(--ink-3)",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Sem compromissos lançados para este mês.
      </div>
    );
  }

  return (
    <div className="fx-comp-wrap">
      <div className="fx-comp-bar" role="img" aria-label="Barra de compromissos do mês">
        {segmentos.map((s) => (
          <span
            key={s.label}
            className="fx-comp-seg"
            title={`${s.label} · ${formatCurrency(s.valor)}`}
            style={{ width: `${s.pct}%`, background: s.cor }}
          />
        ))}
      </div>
      <div className="fx-comp-legend">
        {segmentos.map((s) => (
          <span key={s.label} className="swatch">
            <i style={{ background: s.cor }} />
            <strong>{s.label}</strong>
            <span className="val">{formatCurrency(s.valor)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
