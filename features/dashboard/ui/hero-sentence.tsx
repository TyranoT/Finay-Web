import { formatCurrency } from "@/shared/helpers/format-currency";
import type { MesResumo } from "../hooks/use-mes-resumo";

interface HeroSentenceProps {
  mesNome: string;
  resumo: MesResumo;
  isLoading?: boolean;
}

function formatPluralContas(n: number, verbo: "vence" | "passou"): string {
  if (n === 1) {
    return verbo === "vence" ? "1 conta vence" : "1 conta passou do vencimento";
  }
  return verbo === "vence"
    ? `${n} contas vencem`
    : `${n} contas passaram do vencimento`;
}

function buildSituacao(resumo: MesResumo): string {
  if (resumo.atrasados > 0) {
    return `${formatPluralContas(resumo.atrasados, "passou")}.`;
  }
  if (resumo.vencemEstaSemana > 0) {
    return `${formatPluralContas(resumo.vencemEstaSemana, "vence")} esta semana.`;
  }
  if (resumo.proximoEmDias !== null && resumo.proximoEmDias <= 14) {
    const dias = resumo.proximoEmDias;
    if (dias === 0) return "Tem conta vencendo hoje.";
    if (dias === 1) return "Próximo vencimento é amanhã.";
    return `Próximo vencimento em ${dias} dias.`;
  }
  return "Sem contas a pagar nas próximas duas semanas.";
}

function signedAmount(valor: number): { sign: string; abs: string; cor: string } {
  if (valor < 0) {
    return {
      sign: "−",
      abs: formatCurrency(Math.abs(valor)),
      cor: "var(--coral)",
    };
  }
  if (valor > 0) {
    return {
      sign: "+",
      abs: formatCurrency(valor),
      cor: "var(--jade-600)",
    };
  }
  return { sign: "", abs: formatCurrency(0), cor: "var(--ink-2)" };
}

/**
 * Frase-tese da Visão geral: o mês inteiro destilado em uma sentença.
 *
 * Substitui a fileira de KPI cards porque um número solto não diz a história;
 * a sentença coloca o valor dentro de um contexto que o usuário consegue ler
 * sem decodificar.
 */
export function HeroSentence({ mesNome, resumo, isLoading }: HeroSentenceProps) {
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

  const { sign, abs, cor } = signedAmount(resumo.saldoLiquido);
  const situacao = buildSituacao(resumo);

  return (
    <h1 className="fx-hero">
      {mesNome} está{" "}
      <span className="fx-hero-num" style={{ color: cor }}>
        {sign}
        {abs}
      </span>{" "}
      no saldo.
      <span className="fx-hero-quiet">{situacao}</span>
    </h1>
  );
}
