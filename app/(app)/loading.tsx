export default function AppLoading() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div
        style={{
          width: 260,
          flexShrink: 0,
          background: "#fff",
          borderRight: "1px solid #ECEFF4",
          height: "100vh",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ height: 34, width: 100, background: "#E2E8F0", borderRadius: 8, marginBottom: 24 }} />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ height: 40, background: "#E2E8F0", borderRadius: 10 }} />
        ))}
      </div>
      <main style={{ flex: 1, background: "#F6F7FB", padding: 28 }}>
        <div style={{ height: 32, width: 200, background: "#E2E8F0", borderRadius: 8, marginBottom: 24 }} />
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
      </main>
    </div>
  );
}
