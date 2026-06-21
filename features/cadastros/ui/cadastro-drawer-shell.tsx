"use client";

import type { ReactNode } from "react";

interface CadastroDrawerShellProps {
  titulo: string;
  onClose: () => void;
  children: ReactNode;
}

function Overlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,.42)",
        backdropFilter: "blur(2px)",
        zIndex: 40,
      }}
    />
  );
}

/**
 * Casca do drawer lateral usado por todos os forms de Cadastros.
 *
 * Mantém o estilo e o cabeçalho consistentes — a entidade específica
 * (categoria, lugar, pessoa, item) preenche o slot interior.
 */
export function CadastroDrawerShell({
  titulo,
  onClose,
  children,
}: CadastroDrawerShellProps) {
  return (
    <>
      <Overlay onClose={onClose} />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 440,
          background: "var(--surface)",
          boxShadow: "-20px 0 60px rgba(15,23,42,.22)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--font)",
          zIndex: 50,
        }}
      >
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            padding: "22px 26px 18px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="t-h2">{titulo}</div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid var(--line-2)",
              background: "var(--surface)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: "var(--ink-3)",
              fontSize: 20,
            }}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
