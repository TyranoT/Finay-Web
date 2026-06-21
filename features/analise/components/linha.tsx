export function Linha({
    label,
    valor,
    cor,
}: {
    label: string;
    valor: string;
    cor: string;
}) {
    return (
        <div
            className="row"
            style={{
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid var(--line)",
            }}
        >
            <span className="t-sm" style={{ fontWeight: 600, color: "var(--ink-2)" }}>
                {label}
            </span>
            <span
                style={{
                    fontFamily: "var(--mono)",
                    fontFeatureSettings: '"tnum" 1',
                    fontWeight: 700,
                    fontSize: 15,
                    color: cor,
                }}
            >
                {valor}
            </span>
        </div>
    );
}