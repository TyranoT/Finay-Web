"use client";

import { useTopbar } from "@/shared/hook/useTopbar";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { useInvestimentos } from "../api/use-investimentos";
import { useCarteiraResumo } from "../hooks/use-carteira-resumo";
import { useProjecao12m } from "../hooks/use-projecao-12m";
import { HeroSentenceInvestimentos } from "../ui/hero-sentence-investimentos";
import { ProjectionChart } from "../ui/projection-chart";
import { CarteiraList } from "../ui/carteira-list";
import { SectionEyebrow } from "@/features/dashboard/ui/section-eyebrow";

const APORTE_MENSAL_PLACEHOLDER = 0;

/**
 * Página Investimentos — frase-tese da carteira, projeção 12 meses e
 * lista editorial dos investimentos.
 */
export function InvestimentosPage() {
  const { escopo } = useGrupoAtivo();
  const { data: investimentos = [], isLoading } = useInvestimentos();

  const resumo = useCarteiraResumo(investimentos);
  const projecao = useProjecao12m({
    valorAtual: resumo.valorAtual,
    totalAportado: resumo.totalAportado,
    taxaMensal: resumo.taxaMensalEstimada,
    aporteMensal: APORTE_MENSAL_PLACEHOLDER,
    meses: 12,
  });

  const projecaoFinal = projecao[projecao.length - 1]?.total ?? resumo.valorAtual;

  const sufixoEscopo =
    escopo.nome === "Pessoal" ? "carteira pessoal" : `carteira de ${escopo.nome}`;
  useTopbar({
    titulo: "Investimentos",
    subtitulo: `${sufixoEscopo} · ${resumo.qtdAtivos} ${resumo.qtdAtivos === 1 ? "ativo" : "ativos"}`,
  });

  return (
    <div className="fx-content col gap-6">
      <section className="col gap-4">
        <HeroSentenceInvestimentos
          resumo={resumo}
          projecaoFinal={projecaoFinal}
          isLoading={isLoading}
        />
        <div className="fx-evolution-card">
          <ProjectionChart projecao={projecao} />
          <div className="fx-evolution-legend">
            <span className="swatch">
              <i style={{ background: "var(--indigo)" }} /> Principal
            </span>
            <span className="swatch">
              <i style={{ background: "var(--jade)" }} /> Rendimento projetado
            </span>
          </div>
        </div>
      </section>

      <section className="col gap-3">
        <SectionEyebrow
          label="Sua carteira"
          hint={`${resumo.qtdAtivos} ${resumo.qtdAtivos === 1 ? "ativo cadastrado" : "ativos cadastrados"}`}
        />
        <CarteiraList itens={investimentos} isLoading={isLoading} />
      </section>
    </div>
  );
}
