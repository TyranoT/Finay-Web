"use client";

import { useMemo } from "react";
import { useTopbar } from "@/shared/hook/useTopbar";
import { useGrupoAtivo } from "@/shared/hook/useGrupoAtivo";
import { getMonthRange, formatMonthYear } from "@/shared/helpers/format-date";
import { useSaidasPrevistas } from "../api/use-saidas-previstas";
import { useEntradasPrevistas } from "../api/use-entradas-previstas";
import { useCompromissosResumo } from "../hooks/use-compromissos-resumo";
import { HeroSentencePrevistos } from "../ui/hero-sentence-previstos";
import { CompromissosStrip } from "../ui/compromissos-strip";
import { PrevistoRow } from "../ui/previsto-row";
import { SectionEyebrow } from "@/features/dashboard/ui/section-eyebrow";

interface ListaProps {
  itens: Array<{
    uid: string;
    nome: string;
    valor_total: number;
    valor_atual?: number;
    data_vencimento: string;
    status?: string;
    categoria?: { nome: string };
    conta?: { nome: string };
  }>;
  tipo: "saida" | "entrada";
  isLoading?: boolean;
  emptyLabel: string;
}

function Lista({ itens, tipo, isLoading, emptyLabel }: ListaProps) {
  if (isLoading) {
    return (
      <div
        className="card card-pad"
        style={{ borderRadius: 18, padding: "8px 22px" }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="fx-prev-row"
            style={{ borderBottom: i === 3 ? 0 : undefined }}
          >
            <div
              style={{
                width: 48,
                height: 38,
                background: "var(--line-2)",
                borderRadius: 6,
              }}
            />
            <div>
              <div
                style={{
                  height: 14,
                  width: 180,
                  background: "var(--line-2)",
                  borderRadius: 5,
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  height: 11,
                  width: 110,
                  background: "var(--line-2)",
                  borderRadius: 5,
                }}
              />
            </div>
            <div
              style={{
                height: 14,
                width: 80,
                background: "var(--line-2)",
                borderRadius: 5,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (itens.length === 0) {
    return (
      <div
        className="card card-pad"
        style={{
          borderRadius: 18,
          padding: "20px 22px",
          color: "var(--ink-3)",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {emptyLabel}
      </div>
    );
  }

  return (
    <div
      className="card card-pad"
      style={{ borderRadius: 18, padding: "8px 22px" }}
    >
      <div className="fx-prev-list">
        {itens.map((it) => (
          <PrevistoRow
            key={it.uid}
            nome={it.nome}
            data_vencimento={it.data_vencimento}
            valor_total={it.valor_total}
            valor_atual={it.valor_atual}
            status={it.status}
            categoria={it.categoria}
            conta={it.conta}
            tipo={tipo}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Página Previstos & faturas — frase-tese, strip de compromissos e
 * listas editoriais de contas a pagar e a receber.
 */
export function PrevistosPage() {
  const { escopo } = useGrupoAtivo();
  const referencia = useMemo(() => new Date(), []);
  const { inicio, fim } = useMemo(() => getMonthRange(referencia), [referencia]);
  const mesNome = formatMonthYear(referencia).split(" ")[0];

  const { data: saidas = [], isLoading: loadSaidas } = useSaidasPrevistas({
    dataInicio: inicio,
    dataFim: fim,
  });
  const { data: entradas = [], isLoading: loadEntradas } = useEntradasPrevistas({
    dataInicio: inicio,
    dataFim: fim,
  });

  const resumo = useCompromissosResumo(saidas, entradas);

  const sufixoEscopo = escopo.nome === "Pessoal" ? "panorama pessoal" : `panorama de ${escopo.nome}`;
  useTopbar({
    titulo: "Previstos & faturas",
    subtitulo: `${sufixoEscopo} · ${mesNome}`,
  });

  return (
    <div className="fx-content col gap-6">
      <section className="col gap-4">
        <HeroSentencePrevistos
          mesNome={mesNome}
          resumo={resumo}
          isLoading={loadSaidas || loadEntradas}
        />
        <CompromissosStrip resumo={resumo} />
      </section>

      <section className="col gap-3">
        <SectionEyebrow
          label="A pagar"
          hint={`${resumo.qtdAPagar + resumo.qtdAtrasados} compromissos em aberto`}
        />
        <Lista
          itens={saidas}
          tipo="saida"
          isLoading={loadSaidas}
          emptyLabel="Sem contas a pagar lançadas para este mês."
        />
      </section>

      <section className="col gap-3">
        <SectionEyebrow
          label="A receber"
          hint={`${resumo.qtdReceber} recebíveis previstos`}
        />
        <Lista
          itens={entradas}
          tipo="entrada"
          isLoading={loadEntradas}
          emptyLabel="Sem recebíveis previstos para este mês."
        />
      </section>
    </div>
  );
}
