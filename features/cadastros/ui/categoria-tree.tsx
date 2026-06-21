import type { Categoria } from "@/features/transacoes/types";

interface CategoriaTreeProps {
  categorias: Categoria[];
  isLoading?: boolean;
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

function Node({ cat, idx, child }: { cat: Categoria; idx: number; child?: boolean }) {
  const cor = corCategoria(idx);
  const inicial = cat.nome[0]?.toUpperCase() ?? "?";
  return (
    <>
      <div className={`fx-tree-node${child ? " child" : ""}`}>
        <div className="fx-tree-marker marker" style={{ background: cor }}>
          {inicial}
        </div>
        <div>
          <div className="fx-tree-nome">{cat.nome}</div>
          <div className="fx-tree-sub">{tagFluxo(cat)}</div>
        </div>
      </div>
      {cat.subcategorias?.map((sub, i) => (
        <Node key={sub.uid} cat={sub} idx={idx + i + 1} child />
      ))}
    </>
  );
}

function Skeleton() {
  return (
    <div className="fx-tree-node" aria-hidden="true">
      <div style={{ width: 36, height: 36, borderRadius: 12, background: "var(--line-2)" }} />
      <div>
        <div style={{ height: 14, width: 160, background: "var(--line-2)", borderRadius: 5, marginBottom: 6 }} />
        <div style={{ height: 11, width: 70, background: "var(--line-2)", borderRadius: 5 }} />
      </div>
    </div>
  );
}

/**
 * Árvore de categorias com indent visual para subcategorias.
 *
 * Cada categoria-pai recebe uma cor da paleta e seu marcador colorido;
 * subcategorias herdam a hierarquia visualmente sem repetir a cor.
 */
export function CategoriaTree({ categorias, isLoading }: CategoriaTreeProps) {
  if (isLoading) {
    return (
      <div className="card card-pad" style={{ borderRadius: 18, padding: "8px 22px" }}>
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
          <Node key={cat.uid} cat={cat} idx={idx} />
        ))}
      </div>
    </div>
  );
}
