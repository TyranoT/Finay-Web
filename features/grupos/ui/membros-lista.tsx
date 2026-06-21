import type { MembroGrupo } from "../types";

interface MembrosListaProps {
  membros: MembroGrupo[];
  isLoading?: boolean;
}

const CORES = [
  "#5B3BE8",
  "#C026A8",
  "#0B63D6",
  "#E8643B",
  "#16A34A",
  "#7C3AED",
];

function inicial(nome: string): string {
  const partes = nome.trim().split(" ");
  const a = partes[0]?.[0] ?? "";
  const b = partes.length > 1 ? partes[partes.length - 1]?.[0] ?? "" : "";
  return (a + b).toUpperCase() || "?";
}

function Row({ membro, idx }: { membro: MembroGrupo; idx: number }) {
  const cor = CORES[idx % CORES.length];
  const ehAdmin = membro.admin_grupo === true;
  const tagBg = ehAdmin ? "var(--indigo-50)" : "var(--bg)";
  const tagCor = ehAdmin ? "var(--indigo-600)" : "var(--ink-3)";
  return (
    <div className="fx-membro-row">
      <div className="fx-membro-av" style={{ background: cor }}>
        {inicial(membro.nome)}
      </div>
      <div>
        <div className="fx-membro-nome">{membro.nome}</div>
        {membro.email && (
          <div className="fx-membro-sub">{membro.email}</div>
        )}
      </div>
      <span
        className="fx-membro-tag"
        style={{ background: tagBg, color: tagCor }}
      >
        {ehAdmin ? "Admin" : "Membro"}
      </span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="fx-membro-row" aria-hidden="true">
      <div style={{ width: 44, height: 44, borderRadius: 99, background: "var(--line-2)" }} />
      <div>
        <div style={{ height: 14, width: 140, background: "var(--line-2)", borderRadius: 5, marginBottom: 6 }} />
        <div style={{ height: 11, width: 180, background: "var(--line-2)", borderRadius: 5 }} />
      </div>
      <div style={{ height: 22, width: 70, background: "var(--line-2)", borderRadius: 99 }} />
    </div>
  );
}

export function MembrosLista({ membros, isLoading }: MembrosListaProps) {
  if (isLoading) {
    return (
      <div className="card card-pad" style={{ borderRadius: 18, padding: "8px 22px" }}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (membros.length === 0) {
    return (
      <div
        className="card card-pad"
        style={{
          borderRadius: 18,
          padding: "20px 22px",
          color: "var(--ink-3)",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        Nenhum membro no grupo.
      </div>
    );
  }

  return (
    <div className="card card-pad" style={{ borderRadius: 18, padding: "8px 22px" }}>
      {membros.map((m, idx) => (
        <Row key={m.uid} membro={m} idx={idx} />
      ))}
    </div>
  );
}
