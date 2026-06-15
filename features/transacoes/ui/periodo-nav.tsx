interface PeriodoNavProps {
  label: string;
  onPrev: () => void;
  onNext: () => void;
}

function IconChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {direction === "left"
        ? <polyline points="15 18 9 12 15 6" />
        : <polyline points="9 18 15 12 9 6" />
      }
    </svg>
  );
}

/**
 * Navegador de período mensal com setas e rótulo central.
 */
export function PeriodoNav({ label, onPrev, onNext }: PeriodoNavProps) {
  return (
    <div
      className="row gap-2"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line-2)",
        borderRadius: 12,
        padding: "4px",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <button
        onClick={onPrev}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          width: 30,
          height: 30,
          borderRadius: 8,
          display: "grid",
          placeItems: "center",
          color: "var(--ink-3)",
        }}
        aria-label="Mês anterior"
      >
        <IconChevron direction="left" />
      </button>

      <span
        className="t-sm num"
        style={{ fontWeight: 700, minWidth: 130, textAlign: "center", color: "var(--ink)" }}
      >
        {label}
      </span>

      <button
        onClick={onNext}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          width: 30,
          height: 30,
          borderRadius: 8,
          display: "grid",
          placeItems: "center",
          color: "var(--ink-3)",
        }}
        aria-label="Próximo mês"
      >
        <IconChevron direction="right" />
      </button>
    </div>
  );
}
