"use client";

interface TagItem {
  uid: string;
  nome: string;
}

interface TagCloudProps {
  itens: TagItem[];
  emptyLabel: string;
  isLoading?: boolean;
  onEdit?: (item: TagItem) => void;
  onDelete?: (item: TagItem) => void;
}

function Skeleton() {
  return (
    <div className="fx-tag-cloud">
      {[60, 80, 70, 100, 90, 75].map((w, i) => (
        <span
          key={i}
          className="tag"
          aria-hidden="true"
          style={{
            background: "var(--line-2)",
            border: "1px solid var(--line-2)",
            color: "transparent",
            minWidth: w,
          }}
        >
          —
        </span>
      ))}
    </div>
  );
}

/** Nuvem de tags neutras — usado pra lugares e itens, com ações inline. */
export function TagCloud({
  itens,
  emptyLabel,
  isLoading,
  onEdit,
  onDelete,
}: TagCloudProps) {
  if (isLoading) return <Skeleton />;

  if (itens.length === 0) {
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
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="fx-tag-cloud">
      {itens.map((it) => (
        <span key={it.uid} className="tag-wrap">
          <button
            type="button"
            className="tag"
            onClick={onEdit ? () => onEdit(it) : undefined}
            style={{
              cursor: onEdit ? "pointer" : "default",
              fontFamily: "inherit",
            }}
          >
            {it.nome}
          </button>
          {onDelete && (
            <button
              type="button"
              className="fx-tag-x"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(it);
              }}
              aria-label={`Excluir ${it.nome}`}
            >
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
