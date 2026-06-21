interface TagCloudProps {
  itens: Array<{ uid: string; nome: string }>;
  emptyLabel: string;
  isLoading?: boolean;
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

/** Nuvem de tags neutras — usado pra lugares e itens. */
export function TagCloud({ itens, emptyLabel, isLoading }: TagCloudProps) {
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
        <span key={it.uid} className="tag">
          {it.nome}
        </span>
      ))}
    </div>
  );
}
