import { formatCurrency } from "@/shared/helpers/format-currency";
import type { AnaliseResumo } from "../hooks/use-analise-resumo";
import { Linha } from "../components/linha";

interface MediasCardProps {
  resumo: AnaliseResumo;
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
