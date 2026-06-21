"use client";

import { useTopbar } from "@/shared/hook/useTopbar";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { useSaldo } from "@/features/dashboard/api/use-saldo";
import { useInvestimentos } from "@/features/investimentos/api/use-investimentos";
import { useAtivos } from "../api/use-ativos";
import { usePatrimonioResumo } from "../hooks/use-patrimonio-resumo";
import { HeroSentenceAtivos } from "../ui/hero-sentence-ativos";
import { ComposicaoDonut } from "../ui/composicao-donut";
import { BensList } from "../ui/bens-list";
import { PassivosList } from "../ui/passivos-list";
import { SectionEyebrow } from "@/features/dashboard/ui/section-eyebrow";

/**
 * Página Ativos & patrimônio — frase-tese do líquido, donut de composição
 * e listas editoriais de bens e dívidas.
 */
export function AtivosPage() {
  const { escopo } = useGrupoAtivo();
  const { data: ativos = [], isLoading: loadAtivos } = useAtivos();
  const { data: investimentos = [], isLoading: loadInv } = useInvestimentos();
  const { data: saldos = [], isLoading: loadSaldo } = useSaldo();

  const isLoading = loadAtivos || loadInv || loadSaldo;
  const resumo = usePatrimonioResumo(ativos, investimentos, saldos ?? []);

  const sufixoEscopo =
    escopo.nome === "Pessoal" ? "patrimônio pessoal" : `patrimônio de ${escopo.nome}`;
  useTopbar({
    titulo: "Ativos & patrimônio",
    subtitulo: sufixoEscopo,
  });

  return (
    <div className="fx-content col gap-6">
      <section className="col gap-4">
        <HeroSentenceAtivos resumo={resumo} isLoading={isLoading} />
        <ComposicaoDonut resumo={resumo} />
      </section>

      <section className="col gap-3">
        <SectionEyebrow
          label="Seus bens"
          hint={`${resumo.bens.length} ${resumo.bens.length === 1 ? "item" : "itens"} cadastrados`}
        />
        <BensList itens={resumo.bens} isLoading={loadAtivos} />
      </section>

      <section className="col gap-3">
        <SectionEyebrow
          label="Dívidas em aberto"
          hint={
            resumo.totalPassivos > 0
              ? `Total em aberto`
              : "Nenhuma dívida cadastrada"
          }
        />
        <PassivosList itens={resumo.passivos} isLoading={loadAtivos} />
      </section>
    </div>
  );
}
