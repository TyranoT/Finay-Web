"use client";

import { useTopbar } from "@/shared/hook/useTopbar";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { useContasDetalhadas } from "../api/use-contas-detalhadas";
import { useContasResumo } from "../hooks/use-contas-resumo";
import { ehCartao } from "../types";
import { HeroSentenceContas } from "../ui/hero-sentence-contas";
import { ContaTile } from "../ui/conta-tile";
import { CartaoTile } from "../ui/cartao-tile";
import { SectionEyebrow } from "@/features/dashboard/ui/section-eyebrow";

function SkeletonTile() {
  return (
    <div className="fx-conta-tile" aria-hidden="true">
      <div
        style={{
          height: 36,
          width: 36,
          background: "var(--line-2)",
          borderRadius: 11,
        }}
      />
      <div
        style={{
          height: 12,
          width: 90,
          background: "var(--line-2)",
          borderRadius: 4,
          marginTop: 10,
        }}
      />
      <div
        style={{
          height: 22,
          width: 130,
          background: "var(--line-2)",
          borderRadius: 5,
          marginTop: 8,
        }}
      />
    </div>
  );
}

/**
 * Página Contas & cartões — frase-tese consolidada, grid de contas
 * bancárias e bloco diferenciado para cartões de crédito.
 */
export function ContasPage() {
  const { escopo } = useGrupoAtivo();
  const { data: contas = [], isLoading } = useContasDetalhadas();
  const resumo = useContasResumo(contas);

  const cartoes = contas.filter(ehCartao);
  const bancarias = contas.filter((c) => !ehCartao(c));

  const sufixoEscopo =
    escopo.nome === "Pessoal" ? "contas pessoais" : `contas de ${escopo.nome}`;
  useTopbar({
    titulo: "Contas & cartões",
    subtitulo: sufixoEscopo,
  });

  return (
    <div className="fx-content col gap-6">
      <section className="col gap-4">
        <HeroSentenceContas resumo={resumo} isLoading={isLoading} />
      </section>

      <section className="col gap-3">
        <SectionEyebrow
          label="Suas contas"
          hint={`${bancarias.length} ${bancarias.length === 1 ? "conta" : "contas"} bancárias`}
        />
        {isLoading ? (
          <div className="fx-contas-grid">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonTile key={i} />
            ))}
          </div>
        ) : bancarias.length === 0 ? (
          <div
            className="card card-pad"
            style={{
              borderRadius: 18,
              color: "var(--ink-3)",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Nenhuma conta bancária cadastrada.
          </div>
        ) : (
          <div className="fx-contas-grid">
            {bancarias.map((c) => (
              <ContaTile key={c.uid} conta={c} />
            ))}
          </div>
        )}
      </section>

      <section className="col gap-3">
        <SectionEyebrow
          label="Cartões"
          hint={
            cartoes.length === 0
              ? "Nenhum cartão cadastrado"
              : `${cartoes.length} ${cartoes.length === 1 ? "cartão" : "cartões"}`
          }
        />
        {cartoes.length === 0 ? (
          <div
            className="card card-pad"
            style={{
              borderRadius: 18,
              color: "var(--ink-3)",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Sem cartões de crédito cadastrados.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {cartoes.map((c) => (
              <CartaoTile key={c.uid} conta={c} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
