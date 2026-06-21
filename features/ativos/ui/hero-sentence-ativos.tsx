import { formatCurrency } from "@/shared/helpers/format-currency";
import type { PatrimonioResumo } from "../hooks/use-patrimonio-resumo";

interface HeroProps {
  resumo: PatrimonioResumo;
  isLoading?: boolean;
}

function buildSegunda(resumo: PatrimonioResumo): string {
  const principal = resumo.composicao[0];
  if (principal && principal.pct > 30) {
    return `${principal.rotulo} representam ${principal.pct.toFixed(0)}% do bruto.`;
  }
  if (resumo.totalPassivos > 0) {
    return `${formatCurrency(resumo.totalBens + resumo.totalInvestimentos + resumo.totalReserva)} em bens e ${formatCurrency(resumo.totalPassivos)} em dívidas em aberto.`;
  }
  return `${formatCurrency(resumo.patrimonioBruto)} distribuídos em ${resumo.composicao.length} ${resumo.composicao.length === 1 ? "categoria" : "categorias"}.`;
}

export function HeroSentenceAtivos({ resumo, isLoading }: HeroProps) {
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

  const cor =
    resumo.patrimonioLiquido >= 0 ? "var(--indigo-600)" : "var(--coral)";
  const sinal = resumo.patrimonioLiquido >= 0 ? "" : "−";

  return (
    <h1 className="fx-hero">
      Seu patrimônio líquido soma{" "}
      <span className="fx-hero-num" style={{ color: cor }}>
        {sinal}
        {formatCurrency(Math.abs(resumo.patrimonioLiquido))}
      </span>
      .<span className="fx-hero-quiet">{buildSegunda(resumo)}</span>
    </h1>
  );
}
