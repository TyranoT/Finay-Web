"use client";

import type { Pessoa } from "../types";
import { RowActions } from "./row-actions";

interface PessoasGridProps {
  pessoas: Pessoa[];
  isLoading?: boolean;
  onEdit?: (p: Pessoa) => void;
  onDelete?: (p: Pessoa) => void;
}

const CORES = [
  "#5B3BE8",
  "#C026A8",
  "#0B63D6",
  "#E8643B",
  "#16A34A",
  "#7C3AED",
  "#14B8A6",
  "#F59E0B",
];

function inicialDoNome(nome: string): string {
  const partes = nome.trim().split(" ");
  const a = partes[0]?.[0] ?? "";
  const b = partes.length > 1 ? partes[partes.length - 1]?.[0] ?? "" : "";
  return (a + b).toUpperCase() || "?";
}

interface TileProps {
  pessoa: Pessoa;
  idx: number;
  onEdit?: (p: Pessoa) => void;
  onDelete?: (p: Pessoa) => void;
}

function Tile({ pessoa, idx, onEdit, onDelete }: TileProps) {
  const cor = CORES[idx % CORES.length];
  const meta = pessoa.usuario_uid
    ? "Membro"
    : pessoa.email
      ? "Externo"
      : "Terceiro";
  return (
    <div className="fx-pessoa-tile fx-row-hover" style={{ position: "relative" }}>
      <div className="av" style={{ background: cor }}>
        {inicialDoNome(pessoa.nome)}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          className="nome"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {pessoa.nome}
        </div>
        <div className="meta">{meta}</div>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <RowActions
          onEdit={onEdit ? () => onEdit(pessoa) : undefined}
          onDelete={onDelete ? () => onDelete(pessoa) : undefined}
        />
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="fx-pessoa-tile" aria-hidden="true">
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 99,
          background: "var(--line-2)",
        }}
      />
      <div>
        <div
          style={{
            height: 12,
            width: 100,
            background: "var(--line-2)",
            borderRadius: 4,
            marginBottom: 6,
          }}
        />
        <div
          style={{
            height: 10,
            width: 60,
            background: "var(--line-2)",
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
}

export function PessoasGrid({
  pessoas,
  isLoading,
  onEdit,
  onDelete,
}: PessoasGridProps) {
  if (isLoading) {
    return (
      <div className="fx-pessoa-grid">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (pessoas.length === 0) {
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
        Sem pessoas cadastradas.
      </div>
    );
  }

  return (
    <div className="fx-pessoa-grid">
      {pessoas.map((p, idx) => (
        <Tile
          key={p.uid}
          pessoa={p}
          idx={idx}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
