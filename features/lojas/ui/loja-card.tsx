"use client";

import { useState } from "react";
import type { Loja } from "../types";

interface LojaCardProps {
  loja: Loja;
}

const CORES_TIPO: Record<string, string> = {
  mercado: "#00B894",
  supermercado: "#00B894",
  restaurante: "#FF8A5B",
  delivery: "#FF8A5B",
  food: "#FF8A5B",
  posto: "#F59E0B",
  combustivel: "#F59E0B",
  farmacia: "#14B8A6",
  saude: "#14B8A6",
  academia: "#5B5FEF",
  esporte: "#5B5FEF",
  cinema: "#7C3AED",
  entretenimento: "#7C3AED",
};

function corDoTipo(tipo: string | undefined): string {
  const t = (tipo ?? "").toLowerCase();
  for (const chave of Object.keys(CORES_TIPO)) {
    if (t.includes(chave)) return CORES_TIPO[chave];
  }
  return "var(--indigo)";
}

function inicial(nome: string): string {
  return nome.trim()[0]?.toUpperCase() ?? "?";
}

function IconHeart({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function LojaCard({ loja }: LojaCardProps) {
  const [favorita, setFavorita] = useState(loja.favorita === true);
  const cor = corDoTipo(loja.tipo?.nome);
  const nota = loja.nota ?? 0;
  const avals = loja.avaliacoes ?? 0;

  return (
    <div className="fx-loja-card">
      <div className="fx-loja-head">
        <div className="fx-loja-ico" style={{ background: cor }}>
          {inicial(loja.nome)}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="fx-loja-nome">{loja.nome}</div>
          <div className="fx-loja-tipo">{loja.tipo?.nome ?? "Estabelecimento"}</div>
        </div>
        <button
          type="button"
          className={`fx-loja-fav${favorita ? " on" : ""}`}
          onClick={() => setFavorita((v) => !v)}
          aria-label={favorita ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <IconHeart filled={favorita} />
        </button>
      </div>
      {(nota > 0 || avals > 0) && (
        <div className="fx-loja-rating">
          <span className="estrela">★</span>
          <span className="nota">{nota.toFixed(1).replace(".", ",")}</span>
          <span className="avals">· {avals} avaliações</span>
        </div>
      )}
    </div>
  );
}
