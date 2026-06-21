"use client";

import { useTopbar } from "@/shared/hook/useTopbar";

interface EmBreveProps {
  titulo: string;
  descricao?: string;
}

/**
 * Placeholder visual para rotas ainda não implementadas.
 *
 * Define o título do topbar e mostra um card central explicando que
 * a feature está em construção, usando o design system atual.
 */
export function EmBreve({ titulo, descricao }: EmBreveProps) {
  useTopbar({
    titulo,
    subtitulo: "Em breve nesta versão",
  });

  return (
    <div className="fx-content">
      <div
        className="card card-pad"
        style={{
          maxWidth: 520,
          margin: "60px auto 0",
          textAlign: "center",
          padding: "44px 32px",
        }}
      >
        <div
          className="spark"
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            margin: "0 auto 18px",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div className="t-h2" style={{ marginBottom: 10 }}>
          {titulo}
        </div>
        <p className="t-sm muted" style={{ lineHeight: 1.6 }}>
          {descricao ??
            "Esta seção será liberada em uma próxima fase. Os dados já existem na API — estamos construindo a tela com carinho."}
        </p>
      </div>
    </div>
  );
}
