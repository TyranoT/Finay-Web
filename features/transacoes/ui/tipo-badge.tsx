interface TipoBadgeProps {
  isEntrada: boolean;
}

/**
 * Badge que indica o tipo de transação (Entrada ou Saída).
 */
export function TipoBadge({ isEntrada }: TipoBadgeProps) {
  return (
    <span
      className="t-xs"
      style={{
        background: isEntrada ? "var(--jade-50)" : "var(--coral-50)",
        color: isEntrada ? "var(--jade-600)" : "var(--coral)",
        padding: "2px 8px",
        borderRadius: 99,
        fontWeight: 700,
      }}
    >
      {isEntrada ? "Entrada" : "Saída"}
    </span>
  );
}
