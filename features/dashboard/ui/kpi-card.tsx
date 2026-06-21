import { formatCurrency } from "@/shared/helpers/format-currency";

interface KpiCardProps {
  label: string;
  valor: number;
  hint?: string;
  hero?: boolean;
  isLoading?: boolean;
}

/**
 * Cartão de KPI usado na linha de métricas do dashboard.
 *
 * @param hero - Quando `true`, renderiza com gradiente de destaque (Indigo→Jade).
 */
export function KpiCard({ label, valor, hint, hero, isLoading }: KpiCardProps) {
  const classes = ["kpi-card"];
  if (hero) classes.push("kpi-card-hero");

  return (
    <div className={classes.join(" ")}>
      <div className="label">{label}</div>
      <div className="value">{isLoading ? "—" : formatCurrency(valor)}</div>
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}
