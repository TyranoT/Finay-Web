"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSession } from "@/shared/hook/useSession";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { useTopbar } from "@/shared/hook/useTopbar";
import { formatMonthYear } from "@/shared/helpers/format-date";
import { useSaldo } from "../api/use-saldo";
import { useSaidasMes } from "../api/use-saidas-mes";
import { useSaidasRecentes } from "../api/use-saidas-recentes";
import { useContas } from "../api/use-contas";
import { useProximosVencimentos } from "../api/use-proximos-vencimentos";
import { useMesResumo } from "../hooks/use-mes-resumo";
import { useGastosPorCategoria } from "../hooks/use-gastos-por-categoria";
import { HeroSentence } from "../ui/hero-sentence";
import { MonthRibbon, MonthRibbonLegend } from "../ui/month-ribbon";
import { SectionEyebrow } from "../ui/section-eyebrow";
import { CatBarsCard } from "../ui/cat-bars-card";
import { ProximosVencimentosList } from "../ui/proximos-vencimentos-list";
import { ContasStrip } from "../ui/contas-strip";
import { TransactionFeed } from "../ui/transaction-feed";
import { formatCurrency } from "@/shared/helpers/format-currency";

const SEMANA = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

const MES_LONGO = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function buildTopbarSubtitulo(nome: string, escopoNome: string): string {
  const primeiro = nome.split(" ")[0] || nome;
  const hoje = new Date();
  const dia = hoje.getDate();
  const mes = MES_LONGO[hoje.getMonth()];
  const semana = SEMANA[hoje.getDay()];
  const sufixo = escopoNome === "Pessoal" ? "" : ` · ${escopoNome}`;
  return `Oi, ${primeiro} — ${semana}, ${dia} de ${mes}${sufixo}.`;
}

function buildSemanaIntervalo(): string {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const ate = Math.min(totalDias, hoje.getDate() + 13);
  return `${hoje.getDate()} a ${ate} de ${MES_LONGO[mes]}`;
}

/**
 * Visão geral — frase-tese do mês, fita do mês, panorama e o que vem.
 */
export function DashboardPage() {
  const { session } = useSession();
  const { escopo } = useGrupoAtivo();
  const { data: saldos } = useSaldo();
  const { data: saidasMes = [], isLoading: isLoadingMes } = useSaidasMes();
  const { data: saidasRecentes = [], isLoading: isLoadingRecentes } =
    useSaidasRecentes();
  const { data: contas = [], isLoading: isLoadingContas } = useContas();
  const { data: proximos = [], isLoading: isLoadingProximos } =
    useProximosVencimentos(6);

  const mesNome = formatMonthYear(new Date()).split(" ")[0];
  const subtitulo = buildTopbarSubtitulo(
    session?.nome ?? "usuário",
    escopo.nome,
  );

  useTopbar({ titulo: "Visão geral", subtitulo });

  const resumo = useMesResumo(saidasMes, proximos);
  const gastosPorCategoria = useGastosPorCategoria(saidasMes, 6);
  const saldoBancario = saldos?.[0]?.total ?? 0;

  const proximosNoMes = useMemo(
    () =>
      proximos.filter((p) => {
        const m = Number(p.data_vencimento.split("-")[1]);
        return m === new Date().getMonth() + 1;
      }),
    [proximos],
  );

  const ribbonFlags = useMemo(() => {
    const hasEntradas = saidasMes.some((s) => s.categoria?.opcao_entrada);
    const hasSaidas = saidasMes.some((s) => !s.categoria?.opcao_entrada);
    const hasPrevistos = resumo.proximoEmDias !== null;
    const hasAtrasados = resumo.atrasados > 0;
    return { hasEntradas, hasSaidas, hasPrevistos, hasAtrasados };
  }, [saidasMes, resumo]);

  return (
    <div className="fx-content col gap-6">
      <section className="col gap-4">
        <HeroSentence
          mesNome={mesNome}
          resumo={resumo}
          isLoading={isLoadingMes || isLoadingProximos}
        />

        <div className="fx-ribbon-wrap">
          <MonthRibbon
            diaAtual={resumo.diaAtual}
            totalDias={resumo.totalDias}
            saidas={saidasMes}
            previstos={proximosNoMes}
          />
          <MonthRibbonLegend {...ribbonFlags} />
        </div>
      </section>

      <section className="col gap-3">
        <SectionEyebrow label="Este mês" hint="Panorama de saídas e entradas" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          <CatBarsCard
            gastos={gastosPorCategoria}
            isLoading={isLoadingMes}
          />

          <div className="card card-pad" style={{ borderRadius: 18 }}>
            <div className="card-head">
              <span className="card-title">Movimentações recentes</span>
              <Link
                href="/transacoes"
                className="more t-sm"
                style={{ color: "var(--indigo-600)", fontWeight: 700 }}
              >
                Ver todas
              </Link>
            </div>
            <TransactionFeed
              saidas={saidasRecentes}
              isLoading={isLoadingRecentes}
            />
          </div>
        </div>
      </section>

      <section className="col gap-3">
        <SectionEyebrow label="À frente" hint={buildSemanaIntervalo()} />
        <div
          className="card card-pad"
          style={{ borderRadius: 18, padding: "8px 22px" }}
        >
          <ProximosVencimentosList
            itens={proximos}
            isLoading={isLoadingProximos}
          />
        </div>
      </section>

      <section className="col gap-3">
        <SectionEyebrow
          label="Suas contas"
          hint={`Saldo bancário atual · ${formatCurrency(saldoBancario)}`}
        />
        <ContasStrip contas={contas} isLoading={isLoadingContas} />
      </section>
    </div>
  );
}
