import { formatCurrency } from "@/shared/helpers/format-currency";
import type { AnaliseResumo } from "../hooks/use-analise-resumo";
import type { MesAgregado } from "../api/saidas-mes.api";

const MES_LONGO = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

interface HeroProps {
  resumo: AnaliseResumo;
  isLoading?: boolean;
}

function buildClausulaMelhorMes(mes: MesAgregado | null): string {
  if (!mes || mes.saldo <= 0) return "";
  return ` ${MES_LONGO[mes.mes]} foi seu melhor mês.`;
}

function buildClausulaTendencia(delta: number): string {
  if (delta === 0) return "";
  if (delta > 0) {
    return ` Você terminou o mês passado ${formatCurrency(delta)} acima do anterior.`;
  }
  return ` Você terminou o mês passado ${formatCurrency(Math.abs(delta))} abaixo do anterior.`;
}

export function HeroSentenceAnalise({ resumo, isLoading }: HeroProps) {
  if (isLoading) {
    return (
      <h1 className="fx-hero" aria-busy="true">
        <span
          style={{
            display: "inline-block",
            width: 380,
            height: 28,
            background: "var(--line-2)",
            borderRadius: 6,
          }}
        />
      </h1>
    );
  }

  const corSaldo =
    resumo.saldoTotal >= 0 ? "var(--jade-600)" : "var(--coral)";
  const sinal = resumo.saldoTotal >= 0 ? "+" : "−";
  const segunda =
    buildClausulaMelhorMes(resumo.melhorMes) +
    buildClausulaTendencia(resumo.deltaUltimoVsAnterior);

  return (
    <h1 className="fx-hero">
      Nos últimos 6 meses, o saldo líquido foi{" "}
      <span className="fx-hero-num" style={{ color: corSaldo }}>
        {sinal}
        {formatCurrency(Math.abs(resumo.saldoTotal))}
      </span>
      .
      <span className="fx-hero-quiet">
        {segunda ||
          ` Média de ${formatCurrency(resumo.mediaEntradas)} entrando e ${formatCurrency(resumo.mediaSaidas)} saindo por mês.`}
      </span>
    </h1>
  );
}
