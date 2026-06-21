import type { Conquista, Raridade } from "../types";

interface ConquistaCardProps {
  conquista: Conquista;
}

const RARIDADE_STYLE: Record<
  Raridade,
  { medal: string; tag: string; tagCor: string; rotulo: string }
> = {
  comum: {
    medal: "linear-gradient(135deg, #94A3B8, #64748B)",
    tag: "#F1F5F9",
    tagCor: "#334155",
    rotulo: "Comum",
  },
  raro: {
    medal: "linear-gradient(135deg, #5B5FEF, #4A4FE0)",
    tag: "var(--indigo-50)",
    tagCor: "var(--indigo-600)",
    rotulo: "Raro",
  },
  epico: {
    medal: "linear-gradient(135deg, #C026A8, #8B5CF6)",
    tag: "#FCE7F3",
    tagCor: "#86198F",
    rotulo: "Épico",
  },
  lendario: {
    medal: "linear-gradient(135deg, #F59E0B, #EF4444)",
    tag: "var(--amber-50)",
    tagCor: "#B07A12",
    rotulo: "Lendário",
  },
};

function normRaridade(r: string | undefined): Raridade {
  const v = (r ?? "comum").toLowerCase();
  if (v.includes("lend")) return "lendario";
  if (v.includes("ep")) return "epico";
  if (v.includes("raro")) return "raro";
  return "comum";
}

export function ConquistaCard({ conquista }: ConquistaCardProps) {
  const raridade = normRaridade(conquista.nivel_raridade);
  const style = RARIDADE_STYLE[raridade];
  const desbloqueada = conquista.desbloqueada === true;

  return (
    <div className={`fx-conq-card${desbloqueada ? "" : " locked"}`}>
      <span
        className="fx-conq-raridade"
        style={{ background: style.tag, color: style.tagCor }}
      >
        {style.rotulo}
      </span>
      <div
        className="fx-conq-medal"
        style={{ background: style.medal }}
        aria-hidden="true"
      >
        {conquista.icone ?? (desbloqueada ? "🏆" : "🔒")}
      </div>
      <div className="fx-conq-titulo">{conquista.nome}</div>
      {conquista.descricao && (
        <div className="fx-conq-desc">{conquista.descricao}</div>
      )}
    </div>
  );
}
