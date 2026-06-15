export default function DashboardLoading() {
  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ height: 32, width: 240, background: "#E2E8F0", borderRadius: 8 }} />
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
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div
          style={{
            flex: "0 0 60%",
            height: 400,
            background: "#fff",
            borderRadius: 24,
            border: "1px solid #ECEFF4",
          }}
        />
        <div
          style={{
            flex: 1,
            height: 300,
            background: "#fff",
            borderRadius: 24,
            border: "1px solid #ECEFF4",
          }}
        />
      </div>
    </div>
  );
}
