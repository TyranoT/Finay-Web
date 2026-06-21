"use client";

import { useTopbar } from "@/shared/hook/useTopbar";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { useSaidasMes } from "@/features/dashboard/api/use-saidas-mes";
import { useGastosPorCategoria } from "@/features/dashboard/hooks/use-gastos-por-categoria";
import { CatBarsCard } from "@/features/dashboard/ui/cat-bars-card";
import { SectionEyebrow } from "@/features/dashboard/ui/section-eyebrow";
import { useHistorico6Meses } from "../api/use-historico-6-meses";
import { useAnaliseResumo } from "../hooks/use-analise-resumo";
import { HeroSentenceAnalise } from "../ui/hero-sentence-analise";
import { EvolutionChart } from "../ui/evolution-chart";
import { MediasCard } from "../ui/medias-card";

/**
 * Página Análise financeira — frase-tese sobre 6 meses, gráfico de
 * evolução (assinatura) e cartões de médias + categorias.
 */
export function AnalisePage() {
  const { escopo } = useGrupoAtivo();
  const { meses, isLoading: isLoadingHist } = useHistorico6Meses(6);
  const { data: saidasMes = [], isLoading: isLoadingMes } = useSaidasMes();

  const resumo = useAnaliseResumo(meses);
  const gastosPorCategoria = useGastosPorCategoria(saidasMes, 6);

  const sufixoEscopo =
    escopo.nome === "Pessoal" ? "panorama pessoal" : `panorama de ${escopo.nome}`;
  useTopbar({
    titulo: "Análise financeira",
    subtitulo: `${sufixoEscopo} · últimos 6 meses`,
  });

  return (
    <div className="fx-content col gap-6">
      <section className="col gap-4">
        <HeroSentenceAnalise resumo={resumo} isLoading={isLoadingHist} />
        <div className="fx-evolution-card">
          <EvolutionChart meses={meses} />
          <div className="fx-evolution-legend">
            <span className="swatch">
              <i style={{ background: "var(--jade)" }} /> Entradas
            </span>
            <span className="swatch">
              <i style={{ background: "var(--indigo)" }} /> Saídas
            </span>
          </div>
        </div>
      </section>

      <section className="col gap-3">
        <SectionEyebrow label="Médias e extremos" hint="Como cada mês contribuiu" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          <MediasCard resumo={resumo} />
          <CatBarsCard gastos={gastosPorCategoria} isLoading={isLoadingMes} />
        </div>
      </section>
    </div>
  );
}
