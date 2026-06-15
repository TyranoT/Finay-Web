import { forwardRef, type ReactNode } from "react";

function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <div
        className="fx-logo-mark"
        style={{ width: 34, height: 34, borderRadius: 11 }}
      >
        <span style={{ fontSize: 19 }}>f</span>
      </div>
      <span
        style={{
          fontSize: 21,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "#fff",
        }}
      >
        Finay
      </span>
    </div>
  );
}

function SpaceCard() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.16)",
        borderRadius: 20,
        padding: 18,
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,.2)",
      }}
    >
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div className="row gap-3">
          <div
            className="fx-logo-mark"
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg,#F25C9A,#F59E0B)",
              boxShadow: "none",
            }}
          >
            <span style={{ fontSize: 17 }}>🏡</span>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800 }}>Casa Martins</div>
            <div style={{ fontSize: 12.5, opacity: 0.85 }}>
              3 novidades desde sua última visita
            </div>
          </div>
        </div>
        <div
          className="av av-sm"
          style={{ background: "#00B894", border: "2px solid rgba(255,255,255,.3)" }}
        >
          RF
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,.2)", margin: "14px 0" }} />

      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12.5, opacity: 0.85, fontWeight: 600 }}>
          Saldo do caixa
        </span>
        <span
          style={{
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span style={{ fontSize: 12, opacity: 0.7, marginRight: 3 }}>R$</span>
          3.180
        </span>
      </div>
    </div>
  );
}

function FeaturesCard() {
  const items = [
    { icon: "💰", label: "Controle financeiro pessoal e em grupo" },
    { icon: "🤖", label: "IA para análises e sugestões inteligentes" },
    { icon: "📊", label: "Relatórios, metas e categorias automáticas" },
  ];

  return (
    <div
      style={{
        background: "rgba(255,255,255,.16)",
        borderRadius: 20,
        padding: 18,
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,.2)",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9, marginBottom: 14 }}>
        ✨ O que te espera no Finay
      </div>
      <div className="col gap-3">
        {items.map((item) => (
          <div key={item.label} className="row gap-3" style={{ alignItems: "center" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: "rgba(255,255,255,.12)",
                display: "grid",
                placeItems: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <span style={{ fontSize: 13, opacity: 0.9, fontWeight: 600, lineHeight: 1.35 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface BrandPanelProps {
  heading?: ReactNode;
  description?: string;
  footer?: ReactNode;
}

/**
 * Painel de marca (esquerdo) usado nas telas de auth.
 * Aceita heading, description e footer customizáveis — padrões são os do login.
 */
export const BrandPanel = forwardRef<HTMLDivElement, BrandPanelProps>(
  function BrandPanel(
    {
      heading = (
        <>
          Bem-vinda
          <br />
          de volta 👋
        </>
      ),
      description = "Suas finanças e as do seu espaço, num lugar só. A gente cuidou de tudo enquanto você esteve fora.",
      footer = <SpaceCard />,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className="grad-indigo-jade opacity-0"
        style={{
          flex: "0 0 42%",
          minWidth: 420,
          maxWidth: 640,
          padding: "40px 44px",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="blob"
          style={{ width: 320, height: 320, background: "rgba(255,255,255,.13)", top: -130, right: -90 }}
        />
        <div
          className="blob"
          style={{ width: 220, height: 220, background: "rgba(255,209,102,.38)", bottom: -60, left: -50 }}
        />

        <div style={{ position: "relative" }}>
          <Logo />
        </div>

        <div style={{ position: "relative", marginTop: 48 }}>
          <div
            style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08 }}
          >
            {heading}
          </div>
          <p style={{ fontSize: 15, opacity: 0.9, marginTop: 14, maxWidth: 360, lineHeight: 1.5 }}>
            {description}
          </p>
        </div>

        <div style={{ marginTop: "auto" }}>{footer}</div>
      </div>
    );
  }
);

export { FeaturesCard };
