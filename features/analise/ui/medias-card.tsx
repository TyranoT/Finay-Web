import { formatCurrency } from "@/shared/helpers/format-currency";
import type { AnaliseResumo } from "../hooks/use-analise-resumo";

interface MediasCardProps {
  resumo: AnaliseResumo;
}

function Linha({
  label,
  valor,
  cor,
}: {
  label: string;
  valor: string;
  cor: string;
}) {
  return (
    <div
      className="row"
      style={{
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <span className="t-sm" style={{ fontWeight: 600, color: "var(--ink-2)" }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontFeatureSettings: '"tnum" 1',
          fontWeight: 700,
          fontSize: 15,
          color: cor,
        }}
      >
        {valor}
      </span>
    </div>
  );
}

/** Cartão de médias e extremos dos 6 meses. */
export function MediasCard({ resumo }: MediasCardProps) {
  const ehPositivo = resumo.saldoTotal >= 0;
  return (
    <div className="card card-pad" style={{ borderRadius: 18 }}>
      <div className="card-head">
        <span className="card-title">Médias dos 6 meses</span>
      </div>
      <Linha
        label="Entrada média"
        valor={formatCurrency(resumo.mediaEntradas)}
        cor="var(--jade-600)"
      />
      <Linha
        label="Saída média"
        valor={formatCurrency(resumo.mediaSaidas)}
        cor="var(--ink)"
      />
      <Linha
        label="Melhor mês"
        valor={
          resumo.melhorMes
            ? `${resumo.melhorMes.rotuloCurto} · ${formatCurrency(resumo.melhorMes.saldo)}`
            : "—"
        }
        cor="var(--jade-600)"
      />
      <Linha
        label="Pior mês"
        valor={
          resumo.piorMes
            ? `${resumo.piorMes.rotuloCurto} · ${formatCurrency(resumo.piorMes.saldo)}`
            : "—"
        }
        cor={ehPositivo ? "var(--ink)" : "var(--coral)"}
      />
    </div>
  );
}
