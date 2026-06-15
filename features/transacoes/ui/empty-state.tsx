interface EmptyStateProps {
  onNova: () => void;
}

/**
 * Estado vazio exibido quando não há transações no período selecionado.
 */
export function EmptyState({ onNova }: EmptyStateProps) {
  return (
    <div
      style={{
        padding: "64px 24px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 40 }}>📋</div>
      <div className="t-h3" style={{ color: "var(--ink-2)" }}>Nenhuma transação</div>
      <div className="t-sm muted" style={{ maxWidth: 280 }}>
        Ainda não há registros neste período. Que tal adicionar a primeira?
      </div>
      <button
        onClick={onNova}
        className="btn btn-primary"
        style={{ marginTop: 8 }}
      >
        + Nova transação
      </button>
    </div>
  );
}
