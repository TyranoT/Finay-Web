"use client";

import { useState } from "react";
import { useSaidas } from "../api/use-saidas";
import { useDeletarSaida } from "../api/use-deletar-saida";
import { usePeriodo } from "../hooks/use-periodo";
import { TransacaoForm } from "./transacao-form";
import { TransacaoItem } from "../ui/transacao-item";
import { PeriodoNav } from "../ui/periodo-nav";
import { EmptyState } from "../ui/empty-state";
import { StatCard } from "@/features/dashboard/ui/stat-card";
import { formatCurrency } from "@/shared/helpers/format-currency";
import type { Saida } from "../types";

type FiltroTipo = "todas" | "entradas" | "saidas";

function calcularResumo(saidas: Saida[]) {
  let entradas = 0;
  let saidasTotal = 0;

  for (const s of saidas) {
    if (s.categoria?.opcao_entrada) {
      entradas += s.valor;
    } else {
      saidasTotal += s.valor;
    }
  }

  return { entradas, saidasTotal, saldo: entradas - saidasTotal };
}

function filtrarPorTipo(saidas: Saida[], tipo: FiltroTipo): Saida[] {
  if (tipo === "entradas") return saidas.filter((s) => s.categoria?.opcao_entrada);
  if (tipo === "saidas") return saidas.filter((s) => !s.categoria?.opcao_entrada);
  return saidas;
}

function SkeletonList() {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="row" style={{ padding: "13px 16px", gap: 12, borderBottom: "1px solid var(--line)" }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--line-2)", flexShrink: 0 }} />
          <div className="grow">
            <div style={{ height: 13, width: 140, background: "var(--line-2)", borderRadius: 5, marginBottom: 6 }} />
            <div style={{ height: 11, width: 90, background: "var(--line-2)", borderRadius: 5 }} />
          </div>
          <div className="col" style={{ alignItems: "flex-end", gap: 4 }}>
            <div style={{ height: 14, width: 80, background: "var(--line-2)", borderRadius: 5 }} />
            <div style={{ height: 11, width: 50, background: "var(--line-2)", borderRadius: 5 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function IconTrendUp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function IconTrendDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function IconBalance() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

const TIPO_TABS: { value: FiltroTipo; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "entradas", label: "Entradas" },
  { value: "saidas", label: "Saídas" },
];

/**
 * Página de listagem e gestão de transações (Entrada/Saída).
 */
export function TransacoesPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [saidaEditando, setSaidaEditando] = useState<Saida | undefined>();
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("todas");

  const { periodoLabel, filtros, avancarMes, voltarMes } = usePeriodo();
  const { data: saidas, isLoading } = useSaidas(filtros);
  const deletarSaida = useDeletarSaida();

  const todasSaidas = saidas ?? [];
  const { entradas, saidasTotal, saldo } = calcularResumo(todasSaidas);
  const saidasFiltradas = filtrarPorTipo(todasSaidas, filtroTipo);

  function abrirNova() {
    setSaidaEditando(undefined);
    setModalAberto(true);
  }

  function abrirEditar(saida: Saida) {
    setSaidaEditando(saida);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setSaidaEditando(undefined);
  }

  function handleDeletar(uid: string) {
    if (!confirm("Excluir esta transação?")) return;
    deletarSaida.mutate(uid);
  }

  return (
    <>
      {/* Top bar */}
      <div className="fx-topbar">
        <div>
          <div className="fx-greeting-h">Transações</div>
          <div className="fx-greeting-s">Entradas e saídas do período</div>
        </div>
        <div className="fx-topbar-actions">
          <PeriodoNav label={periodoLabel} onPrev={voltarMes} onNext={avancarMes} />
          <button onClick={abrirNova} className="btn btn-primary">
            + Nova transação
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="fx-content col gap-5">
        {/* Stat cards */}
        <div className="row gap-4" style={{ alignItems: "stretch" }}>
          <StatCard
            label="Total Entradas"
            value={formatCurrency(entradas)}
            color="jade"
            icon={<IconTrendUp />}
            isLoading={isLoading}
          />
          <StatCard
            label="Total Saídas"
            value={formatCurrency(saidasTotal)}
            color="coral"
            icon={<IconTrendDown />}
            isLoading={isLoading}
          />
          <StatCard
            label="Saldo do Período"
            value={formatCurrency(saldo)}
            color={saldo >= 0 ? "jade" : "coral"}
            icon={<IconBalance />}
            isLoading={isLoading}
          />
        </div>

        {/* Transaction list */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div
            className="row"
            style={{ padding: "4px 4px", background: "var(--bg)", borderBottom: "1px solid var(--line)", gap: 2 }}
          >
            {TIPO_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFiltroTipo(tab.value)}
                style={{
                  padding: "7px 16px", border: "none", borderRadius: 9, cursor: "pointer",
                  fontSize: 13, fontWeight: 700, fontFamily: "inherit",
                  background: filtroTipo === tab.value ? "var(--surface)" : "transparent",
                  color: filtroTipo === tab.value ? "var(--ink)" : "var(--ink-3)",
                  boxShadow: filtroTipo === tab.value ? "var(--sh-1)" : "none",
                  transition: "background .12s, color .12s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {isLoading && <SkeletonList />}

          {!isLoading && saidasFiltradas.length === 0 && (
            <EmptyState onNova={abrirNova} />
          )}

          {!isLoading && saidasFiltradas.length > 0 && (
            <div>
              {saidasFiltradas.map((saida) => (
                <TransacaoItem
                  key={saida.uid}
                  saida={saida}
                  onEdit={abrirEditar}
                  onDelete={handleDeletar}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {modalAberto && (
        <TransacaoForm saida={saidaEditando} onClose={fecharModal} />
      )}
    </>
  );
}
