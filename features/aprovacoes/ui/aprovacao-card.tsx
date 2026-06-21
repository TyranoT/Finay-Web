"use client";

import { useAprovacaoAcao } from "../api/use-aprovacao-acao";

interface AprovacaoCardProps {
  uid: string;
  titulo: string;
  descricao: string;
  tempo?: string;
  icone?: string;
}

function buildDescricaoPorTipo(tipo: string | undefined): {
  titulo: string;
  icone: string;
} {
  const t = (tipo ?? "").toLowerCase();
  if (t.includes("vinculo") || t.includes("grupo")) {
    return { titulo: "Convite para grupo", icone: "👥" };
  }
  if (t.includes("amizade")) return { titulo: "Pedido de amizade", icone: "🤝" };
  if (t.includes("permis")) return { titulo: "Alteração de permissão", icone: "🔑" };
  if (t.includes("ativo") || t.includes("dono")) {
    return { titulo: "Co-propriedade de ativo", icone: "🏠" };
  }
  return { titulo: "Aprovação pendente", icone: "✉️" };
}

export function AprovacaoCard({
  uid,
  titulo,
  descricao,
  tempo,
  icone,
}: AprovacaoCardProps) {
  const mutation = useAprovacaoAcao();
  const isPending = mutation.isPending;

  return (
    <div className="fx-aprov-card">
      <div className="ico">{icone ?? "✉️"}</div>
      <div>
        <div className="fx-aprov-titulo">{titulo}</div>
        <div className="fx-aprov-sub">
          {descricao}
          {tempo && ` · ${tempo}`}
        </div>
      </div>
      <div className="fx-aprov-actions">
        <button
          type="button"
          className="fx-btn-recusar"
          onClick={() => mutation.mutate({ uid, acao: "rejeitar" })}
          disabled={isPending}
        >
          Recusar
        </button>
        <button
          type="button"
          className="fx-btn-aprovar"
          onClick={() => mutation.mutate({ uid, acao: "aceitar" })}
          disabled={isPending}
        >
          {isPending ? "..." : "Aprovar"}
        </button>
      </div>
    </div>
  );
}

export { buildDescricaoPorTipo };
