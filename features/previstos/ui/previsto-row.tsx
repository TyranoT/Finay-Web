import { formatCurrency } from "@/shared/helpers/format-currency";

const MES_CURTO = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function diaDoISO(iso: string): number {
  return Number(iso.split("-")[2]);
}

function mesCurtoDoISO(iso: string): string {
  const mes = Number(iso.split("-")[1]);
  return MES_CURTO[mes - 1] ?? "";
}

export type StatusKind = "pago" | "parcial" | "previsto" | "atrasado";

function statusKind(
  status: string | undefined,
  vencimento: string,
  hojeIso: string,
): StatusKind {
  if (status === "pago") return "pago";
  if (status === "parcial") return "parcial";
  if (vencimento < hojeIso) return "atrasado";
  return "previsto";
}

const STATUS_STYLE: Record<StatusKind, { bg: string; cor: string; label: string }> = {
  pago: { bg: "var(--jade-50)", cor: "var(--jade-600)", label: "Pago" },
  parcial: { bg: "var(--amber-50)", cor: "#B07A12", label: "Parcial" },
  previsto: { bg: "var(--indigo-50)", cor: "var(--indigo-600)", label: "Previsto" },
  atrasado: { bg: "var(--coral-50)", cor: "var(--coral)", label: "Atrasado" },
};

interface PrevistoRowProps {
  nome: string;
  data_vencimento: string;
  valor_total: number;
  valor_atual?: number;
  status?: string;
  categoria?: { nome: string };
  conta?: { nome: string };
  tipo: "saida" | "entrada";
}

export function PrevistoRow({
  nome,
  data_vencimento,
  valor_total,
  valor_atual,
  status,
  categoria,
  conta,
  tipo,
}: PrevistoRowProps) {
  const hojeIso = new Date().toISOString().slice(0, 10);
  const kind = statusKind(status, data_vencimento, hojeIso);
  const style = STATUS_STYLE[kind];

  const valorExibido = valor_atual ?? valor_total;
  const progresso =
    valor_total > 0 && valor_atual !== undefined
      ? Math.min(100, ((valor_total - valor_atual) / valor_total) * 100)
      : kind === "pago"
        ? 100
        : 0;

  const sufixoMeta = [categoria?.nome, conta?.nome].filter(Boolean).join(" · ");
  const valorCor = tipo === "entrada" ? "var(--jade-600)" : "var(--ink)";

  return (
    <div className="fx-prev-row">
      <div className="fx-prev-day">
        <strong>{diaDoISO(data_vencimento)}</strong>
        {mesCurtoDoISO(data_vencimento)}
      </div>
      <div>
        <div
          className="row"
          style={{ gap: 10, alignItems: "center", flexWrap: "wrap" }}
        >
          <span className="fx-prev-nome">{nome}</span>
          <span
            className="fx-prev-status"
            style={{ background: style.bg, color: style.cor }}
          >
            {style.label}
          </span>
        </div>
        {sufixoMeta && <div className="fx-prev-sub">{sufixoMeta}</div>}
        {valor_atual !== undefined && kind !== "pago" && (
          <div className="bar fx-prev-bar">
            <i
              style={{
                width: `${progresso}%`,
                background: kind === "atrasado" ? "var(--coral)" : "var(--amber)",
              }}
            />
          </div>
        )}
      </div>
      <div className="fx-prev-valor" style={{ color: valorCor }}>
        {tipo === "entrada" ? "+" : ""}
        {formatCurrency(valorExibido)}
      </div>
    </div>
  );
}
