interface StatCardProps {
  label: string;
  value: string;
  color?: "default" | "jade" | "coral";
  icon: React.ReactNode;
  isLoading?: boolean;
}

function SkeletonStatCard() {
  return (
    <div className="card card-pad" style={{ flex: 1 }}>
      <div style={{ height: 13, width: 80, background: "var(--line-2)", borderRadius: 6, marginBottom: 16 }} />
      <div style={{ height: 32, width: 140, background: "var(--line-2)", borderRadius: 8 }} />
    </div>
  );
}

/**
 * Card de estatística com rótulo, valor e ícone.
 *
 * @param color - Cor do valor: "default" (tinta), "jade" (verde), "coral" (vermelho)
 */
export function StatCard({ label, value, color = "default", icon, isLoading }: StatCardProps) {
  if (isLoading) return <SkeletonStatCard />;

  const colorMap = {
    default: "var(--ink)",
    jade: "var(--jade)",
    coral: "var(--coral)",
  };

  return (
    <div className="card card-pad" style={{ flex: 1 }}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 10 }}>{label}</div>
          <div
            className="num"
            style={{
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: colorMap[color],
            }}
          >
            {value}
          </div>
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: color === "jade" ? "var(--jade-50)" : color === "coral" ? "var(--coral-50)" : "var(--indigo-50)",
            display: "grid",
            placeItems: "center",
            color: color === "jade" ? "var(--jade)" : color === "coral" ? "var(--coral)" : "var(--indigo)",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
