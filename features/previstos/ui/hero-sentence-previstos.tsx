import { formatCurrency } from "@/shared/helpers/format-currency";
import type { CompromissosResumo } from "../hooks/use-compromissos-resumo";

interface HeroSentenceProps {
  mesNome: string;
  resumo: CompromissosResumo;
  isLoading?: boolean;
}

function buildPrimeira(mesNome: string, total: number): React.ReactNode {
  return (
    <>
      {mesNome} tem{" "}
      <span className="fx-hero-num" style={{ color: "var(--indigo-600)" }}>
        {formatCurrency(total)}
      </span>{" "}
      em compromissos.
    </>
  );
}

function buildSegunda(resumo: CompromissosResumo): string {
  const restante = resumo.aPagar + resumo.atrasado;

  if (resumo.qtdAtrasados > 0) {
    const valor = formatCurrency(resumo.atrasado);
    if (resumo.qtdAtrasados === 1) {
      return `Uma conta no valor de ${valor} já passou do vencimento.`;
    }
    return `${resumo.qtdAtrasados} contas (${valor}) já passaram do vencimento.`;
  }

  if (restante > 0 && resumo.pago > 0) {
    return `${formatCurrency(resumo.pago)} já saíram, ${formatCurrency(restante)} vencem ainda.`;
  }

  if (restante > 0) {
    return `${formatCurrency(restante)} vencem até o fim do mês.`;
  }

  if (resumo.pago > 0) {
    return "Tudo já foi pago neste mês.";
  }

  return "Sem contas pendentes para este mês.";
}

/**
 * Frase-tese da página Previstos: tamanho do mês + situação dos compromissos.
 */
export function HeroSentencePrevistos({
  mesNome,
  resumo,
  isLoading,
}: HeroSentenceProps) {
  if (isLoading) {
    return (
      <h1 className="fx-hero" aria-busy="true">
        <span
          style={{
            display: "inline-block",
            width: 320,
            height: 28,
            background: "var(--line-2)",
            borderRadius: 6,
          }}
        />
      </h1>
    );
  }

  return (
    <h1 className="fx-hero">
      {buildPrimeira(mesNome, resumo.total)}
      <span className="fx-hero-quiet">{buildSegunda(resumo)}</span>
    </h1>
  );
}
