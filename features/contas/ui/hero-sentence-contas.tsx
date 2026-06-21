import { formatCurrency } from "@/shared/helpers/format-currency";
import type { ContasResumo } from "../hooks/use-contas-resumo";

interface HeroProps {
  resumo: ContasResumo;
  isLoading?: boolean;
}

function buildSegunda(resumo: ContasResumo): string {
  if (resumo.qtdCartoes === 0) {
    if (resumo.qtdContas === 0) return "Cadastre suas contas para começar.";
    return `Sem cartões cadastrados — só contas bancárias.`;
  }

  if (resumo.proximoVencimento) {
    const { conta, emDias } = resumo.proximoVencimento;
    const valor = formatCurrency(conta.fatura_atual ?? 0);
    const quando =
      emDias === 0 ? "hoje" : emDias === 1 ? "amanhã" : `em ${emDias} dias`;
    return `Próxima fatura: ${valor} no ${conta.nome} ${quando}.`;
  }

  return `${formatCurrency(resumo.totalFatura)} em faturas em aberto.`;
}

export function HeroSentenceContas({ resumo, isLoading }: HeroProps) {
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

  return (
    <h1 className="fx-hero">
      Você tem{" "}
      <span className="fx-hero-num" style={{ color: "var(--indigo-600)" }}>
        {formatCurrency(resumo.totalDisponivel)}
      </span>{" "}
      disponíveis em {resumo.qtdContas}{" "}
      {resumo.qtdContas === 1 ? "conta" : "contas"}.
      <span className="fx-hero-quiet">{buildSegunda(resumo)}</span>
    </h1>
  );
}
