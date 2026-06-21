"use client";

import type { Categoria } from "@/features/transacoes/types";
import { RowActions } from "./row-actions";

interface CategoriaTreeProps {
  categorias: Categoria[];
  isLoading?: boolean;
  onEdit?: (cat: Categoria) => void;
  onDelete?: (cat: Categoria) => void;
}

const PALETTE = [
  "#FF8A5B",
  "#00B894",
  "#5B5FEF",
  "#7C6CF5",
  "#F25C9A",
  "#F59E0B",
  "#14B8A6",
  "#16A34A",
];

function corCategoria(idx: number): string {
  return PALETTE[idx % PALETTE.length];
}

function tagFluxo(cat: Categoria): string {
  if (cat.opcao_entrada && cat.opcao_saida) return "Entrada · Saída";
  if (cat.opcao_entrada) return "Entrada";
  if (cat.opcao_saida) return "Saída";
  return "Inativa";
}

interface NodeProps {
  cat: Categoria;
  idx: number;
  child?: boolean;
  onEdit?: (cat: Categoria) => void;
  onDelete?: (cat: Categoria) => void;
}

function Node({ cat, idx, child, onEdit, onDelete }: NodeProps) {
  const cor = corCategoria(idx);
  const inicial = cat.nome[0]?.toUpperCase() ?? "?";
  return (
    <>
      <div
        className={`fx-tree-node fx-row-hover${child ? " child" : ""}`}
        style={{ gridTemplateColumns: child ? "28px 1fr auto" : "36px 1fr auto" }}
      >
        <div className="fx-tree-marker marker" style={{ background: cor }}>
          {inicial}
        </div>
        <div>
          <div className="fx-tree-nome">{cat.nome}</div>
          <div className="fx-tree-sub">{tagFluxo(cat)}</div>
        </div>
        <RowActions
          onEdit={onEdit ? () => onEdit(cat) : undefined}
          onDelete={onDelete ? () => onDelete(cat) : undefined}
        />
      </div>
      {cat.subcategorias?.map((sub, i) => (
        <Node
          key={sub.uid}
          cat={sub}
          idx={idx + i + 1}
          child
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}

function Skeleton() {
  return (
    <div className="fx-tree-node" aria-hidden="true">
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          background: "var(--line-2)",
        }}
      />
      <div>
        <div
          style={{
            height: 14,
            width: 160,
            background: "var(--line-2)",
            borderRadius: 5,
            marginBottom: 6,
          }}
        />
        <div
          style={{
            height: 11,
            width: 70,
            background: "var(--line-2)",
            borderRadius: 5,
          }}
        />
      </div>
    </div>
  );
}

export function CategoriaTree({
  categorias,
  isLoading,
  onEdit,
  onDelete,
}: CategoriaTreeProps) {
  if (isLoading) {
    return (
      <div
        className="card card-pad"
        style={{ borderRadius: 18, padding: "8px 22px" }}
      >
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (categorias.length === 0) {
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
        Sem categorias cadastradas.
      </div>
    );
  }

  return (
    <div className="card card-pad" style={{ borderRadius: 18, padding: "8px 22px" }}>
      <div className="fx-tree">
        {categorias.map((cat, idx) => (
          <Node
            key={cat.uid}
            cat={cat}
            idx={idx}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
