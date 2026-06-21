"use client";

import { useMemo, useState } from "react";
import { useTopbar } from "@/shared/hook/useTopbar";
import { useLojas } from "../api/use-lojas";
import { LojaCard } from "../ui/loja-card";

function SkeletonCard() {
  return (
    <div className="fx-loja-card" aria-hidden="true">
      <div className="fx-loja-head">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            background: "var(--line-2)",
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              height: 14,
              width: 120,
              background: "var(--line-2)",
              borderRadius: 5,
              marginBottom: 6,
            }}
          />
          <div
            style={{
              height: 11,
              width: 80,
              background: "var(--line-2)",
              borderRadius: 5,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Página Lojas — marketplace com grid de estabelecimentos, busca local
 * e favoritar.
 */
export function LojasPage() {
  const { data: lojas = [], isLoading } = useLojas();
  const [busca, setBusca] = useState("");

  const filtradas = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return lojas;
    return lojas.filter(
      (l) =>
        l.nome.toLowerCase().includes(q) ||
        (l.tipo?.nome ?? "").toLowerCase().includes(q),
    );
  }, [lojas, busca]);

  useTopbar({
    titulo: "Lojas",
    subtitulo: isLoading
      ? "Carregando…"
      : `${lojas.length} ${lojas.length === 1 ? "estabelecimento" : "estabelecimentos"}`,
  });

  return (
    <div className="fx-content col gap-5">
      <input
        type="search"
        placeholder="Buscar por nome ou tipo…"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          fontFamily: "var(--font)",
          fontSize: 14,
          background: "var(--surface)",
          border: "1px solid var(--line-2)",
          borderRadius: 14,
          padding: "11px 16px",
          outline: "none",
          maxWidth: 380,
        }}
      />

      {isLoading ? (
        <div className="fx-loja-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtradas.length === 0 ? (
        <div className="fx-zero-state">
          <div className="ico">🛍️</div>
          <h2>{busca ? "Nenhuma loja encontrada" : "Marketplace vazio"}</h2>
          <p>
            {busca
              ? "Tente outro termo. Talvez você queira cadastrar uma nova loja."
              : "Em breve você poderá descobrir e avaliar estabelecimentos por aqui."}
          </p>
        </div>
      ) : (
        <div className="fx-loja-grid">
          {filtradas.map((l) => (
            <LojaCard key={l.uid} loja={l} />
          ))}
        </div>
      )}
    </div>
  );
}
