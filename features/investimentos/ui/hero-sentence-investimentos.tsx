import { formatCurrency } from "@/shared/helpers/format-currency";
import type { CarteiraResumo } from "../hooks/use-carteira-resumo";

interface HeroProps {
  resumo: CarteiraResumo;
  projecaoFinal: number;
  isLoading?: boolean;
}

function formatPct(pct: number): string {
  const sign = pct >= 0 ? "+" : "−";
  return `${sign}${Math.abs(pct).toFixed(1).replace(".", ",")}%`;
}

function buildSituacao(resumo: CarteiraResumo, projecaoFinal: number): string {
  if (resumo.qtdAtivos === 0) {
    return "Cadastre seus investimentos para projetar o crescimento.";
  }
  if (projecaoFinal <= resumo.valorAtual) {
    return "Sem aportes adicionais a carteira segue rendendo no ritmo médio.";
  }
  return `Em 12 meses, projeção é ${formatCurrency(projecaoFinal)} mantendo o ritmo.`;
}

export function HeroSentenceInvestimentos({
  resumo,
  projecaoFinal,
  isLoading,
}: HeroProps) {
  if (isLoading) {
    return (
      <h1 className="fx-hero" aria-busy="true">
        <span
          style={{
            display: "inline-block",
            width: 360,
            height: 28,
            background: "var(--line-2)",
            borderRadius: 6,
          }}
        />
      </h1>
    );
  }

  const corRend =
    resumo.rendimento >= 0 ? "var(--jade-600)" : "var(--coral)";
  const sinal = resumo.rendimento >= 0 ? "+" : "−";

  return (
    <h1 className="fx-hero">
      Você aportou{" "}
      <span className="fx-hero-num" style={{ color: "var(--indigo-600)" }}>
        {formatCurrency(resumo.totalAportado)}
      </span>{" "}
      e a carteira está hoje em{" "}
      <span className="fx-hero-num" style={{ color: "var(--ink)" }}>
        {formatCurrency(resumo.valorAtual)}
      </span>
      .
      <span className="fx-hero-quiet">
        Rendimento de{" "}
        <span style={{ color: corRend, fontWeight: 700 }}>
          {sinal}
          {formatCurrency(Math.abs(resumo.rendimento))} ({formatPct(resumo.rendimentoPct)})
        </span>
        . {buildSituacao(resumo, projecaoFinal)}
      </span>
    </h1>
  );
}
