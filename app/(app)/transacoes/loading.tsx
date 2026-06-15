export default function TransacoesLoading() {
  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ height: 32, width: 180, background: "#E2E8F0", borderRadius: 8 }} />
        <div style={{ height: 40, width: 150, background: "#E2E8F0", borderRadius: 12 }} />
      </div>
      <div style={{ height: 42, width: 220, background: "#E2E8F0", borderRadius: 12 }} />
      <div style={{ display: "flex", gap: 16 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 100,
              background: "#fff",
              borderRadius: 24,
              border: "1px solid #ECEFF4",
            }}
          />
        ))}
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          border: "1px solid #ECEFF4",
          overflow: "hidden",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "13px 16px",
              borderBottom: "1px solid #ECEFF4",
              alignItems: "center",
            }}
          >
            <div style={{ width: 38, height: 38, borderRadius: 11, background: "#E2E8F0", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 13, width: 140, background: "#E2E8F0", borderRadius: 5, marginBottom: 6 }} />
              <div style={{ height: 11, width: 90, background: "#E2E8F0", borderRadius: 5 }} />
            </div>
            <div style={{ height: 14, width: 80, background: "#E2E8F0", borderRadius: 5 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
