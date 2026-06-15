"use client";

import Link from "next/link";
import { useSession } from "@/shared/hook/useSession";
import { useSaldo } from "../api/use-saldo";
import { useSaidasRecentes } from "../api/use-saidas-recentes";
import { TransactionFeed } from "../ui/transaction-feed";
import { formatCurrency } from "@/shared/helpers/format-currency";
import { formatMonthYear } from "@/shared/helpers/format-date";
import type { Saida } from "../types";

function buildSaudacao(nome: string): string {
  const hora = new Date().getHours();
  const primeiro = nome.split(" ")[0];
  if (hora < 12) return `Bom dia, ${primeiro} 👋`;
  if (hora < 18) return `Oi, ${primeiro} 👋`;
  return `Boa noite, ${primeiro} 👋`;
}

function calcularTotais(saidas: Saida[]) {
  let entradas = 0;
  let saidasTotal = 0;
  for (const s of saidas) {
    if (s.categoria?.opcao_entrada) entradas += s.valor;
    else saidasTotal += s.valor;
  }
  return { entradas, saidasTotal };
}

const CAT_COLORS = [
  "#FF8A5B", "#00B894", "#5B5FEF", "#7C6CF5",
  "#F25C9A", "#F59E0B", "#14B8A6", "#16A34A",
];

const CAT_KEYWORDS: [string, string][] = [
  ["alimenta", "#FF8A5B"], ["comida", "#FF8A5B"], ["delivery", "#FF8A5B"], ["restaurante", "#FF8A5B"],
  ["mercado", "#00B894"], ["supermercado", "#00B894"],
  ["transporte", "#5B5FEF"], ["uber", "#5B5FEF"],
  ["casa", "#7C6CF5"], ["moradia", "#7C6CF5"], ["aluguel", "#7C6CF5"],
  ["lazer", "#F25C9A"], ["entretenimento", "#F25C9A"],
  ["saúde", "#14B8A6"], ["saude", "#14B8A6"], ["farmácia", "#14B8A6"],
  ["assinatura", "#F59E0B"], ["streaming", "#F59E0B"],
  ["renda", "#16A34A"], ["salário", "#16A34A"],
];

function catColor(nome: string, idx: number): string {
  const lower = nome.toLowerCase();
  for (const [key, color] of CAT_KEYWORDS) {
    if (lower.includes(key)) return color;
  }
  return CAT_COLORS[idx % CAT_COLORS.length];
}

interface CatGasto {
  uid: string;
  nome: string;
  total: number;
  color: string;
}

function calcularGastosPorCategoria(saidas: Saida[]): CatGasto[] {
  const mapa = new Map<string, CatGasto>();
  let idx = 0;
  for (const s of saidas) {
    if (!s.categoria?.opcao_entrada && s.categoria) {
      const uid = s.categoria.uid;
      if (mapa.has(uid)) {
        mapa.get(uid)!.total += s.valor;
      } else {
        mapa.set(uid, {
          uid,
          nome: s.categoria.nome,
          total: s.valor,
          color: catColor(s.categoria.nome, idx++),
        });
      }
    }
  }
  return [...mapa.values()].sort((a, b) => b.total - a.total).slice(0, 4);
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CatBar({ gasto, max }: { gasto: CatGasto; max: number }) {
  const pct = Math.min(100, max > 0 ? (gasto.total / max) * 100 : 0);
  return (
    <div className="row gap-3">
      <div
        className="cat cat-sm"
        style={{ background: gasto.color, flexShrink: 0 }}
      >
        <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>
          {gasto.nome[0].toUpperCase()}
        </span>
      </div>
      <div className="grow">
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
          <span className="t-sm" style={{ fontWeight: 700 }}>{gasto.nome}</span>
          <span className="t-xs num muted">{formatCurrency(gasto.total)}</span>
        </div>
        <div className="bar" style={{ height: 7 }}>
          <i style={{ width: `${pct}%`, background: gasto.color }} />
        </div>
      </div>
    </div>
  );
}

function SkeletonCatBar() {
  return (
    <div className="row gap-3">
      <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--line-2)", flexShrink: 0 }} />
      <div className="grow">
        <div style={{ height: 12, width: 90, background: "var(--line-2)", borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 7, background: "var(--line-2)", borderRadius: 99 }} />
      </div>
    </div>
  );
}

/**
 * Dashboard principal — saldo, transações recentes e gastos por categoria.
 */
export function DashboardPage() {
  const { session } = useSession();
  const { data: saldos, isLoading: isLoadingSaldo } = useSaldo();
  const { data: saidas, isLoading: isLoadingSaidas } = useSaidasRecentes();

  const nome = session?.nome ?? "usuário";
  const saudacao = buildSaudacao(nome);
  const mesAtual = formatMonthYear(new Date());

  const saldoTotal = saldos?.[0]?.total ?? 0;
  const { entradas, saidasTotal } = calcularTotais(saidas ?? []);
  const gastosPorCategoria = calcularGastosPorCategoria(saidas ?? []);
  const maxGasto = gastosPorCategoria[0]?.total ?? 1;

  return (
    <>
      {/* Top bar */}
      <div className="fx-topbar">
        <div>
          <div className="fx-greeting-h">{saudacao}</div>
          <div className="fx-greeting-s">Bora ver como tá o mês?</div>
        </div>
        <div className="fx-topbar-actions">
          <span className="t-sm muted">{mesAtual}</span>
        </div>
      </div>

      {/* Content */}
      <div className="fx-content col gap-5">
        {/* Gradient hero */}
        <div
          className="grad-indigo-jade"
          style={{ borderRadius: 28, padding: 28, color: "#fff", position: "relative", overflow: "hidden" }}
        >
          <div className="blob" style={{ width: 240, height: 240, background: "rgba(255,255,255,.16)", top: -90, right: -40 }} />
          <div className="blob" style={{ width: 160, height: 160, background: "rgba(255,209,102,.35)", bottom: -70, right: 160 }} />
          <div style={{ position: "relative" }}>
            <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9, letterSpacing: ".04em", textTransform: "uppercase" }}>
                  Saldo disponível
                </div>
                <div
                  style={{
                    margin: "8px 0 2px",
                    fontWeight: 800,
                    fontSize: 42,
                    letterSpacing: "-0.03em",
                    fontVariantNumeric: "tabular-nums",
                    color: "#fff",
                  }}
                >
                  {isLoadingSaldo ? "—" : formatCurrency(saldoTotal)}
                </div>
              </div>
              <span
                className="tag"
                style={{ background: "rgba(255,255,255,.22)", color: "#fff", backdropFilter: "blur(4px)" }}
              >
                ✨ tá indo bem
              </span>
            </div>

            <div className="row gap-3" style={{ marginTop: 26, flexWrap: "wrap" }}>
              <div style={{ background: "rgba(255,255,255,.16)", borderRadius: 18, padding: "12px 16px", backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 600 }}>Entrou</div>
                <div style={{ fontWeight: 800, fontSize: 19, fontVariantNumeric: "tabular-nums", color: "#fff" }}>
                  {isLoadingSaidas ? "—" : formatCurrency(entradas)}
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,.16)", borderRadius: 18, padding: "12px 16px", backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 600 }}>Saiu</div>
                <div style={{ fontWeight: 800, fontSize: 19, fontVariantNumeric: "tabular-nums", color: "#fff" }}>
                  {isLoadingSaidas ? "—" : formatCurrency(saidasTotal)}
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <Link href="/transacoes" style={{ textDecoration: "none" }}>
                <button className="btn btn-lg" style={{ background: "#fff", color: "var(--indigo-600)" }}>
                  <IconArrowRight />
                  Movimentar
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Two-column: left (AI + txns) | right (onde foi) */}
        <div className="row gap-4" style={{ alignItems: "flex-start" }}>
          <div className="col gap-4 grow">
            {/* AI insight */}
            <div className="ai-card card-pad" style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div className="spark" style={{ width: 46, height: 46, borderRadius: 15, flexShrink: 0 }}>
                <IconSpark />
              </div>
              <div className="grow">
                <div className="t-eyebrow" style={{ color: "var(--indigo)" }}>Insight do Finay</div>
                <div className="t-h3" style={{ marginTop: 4 }}>
                  Registre transações e <span style={{ color: "var(--jade-600)" }}>a IA identifica padrões</span> pra você 🎯
                </div>
                <div className="t-sm muted" style={{ marginTop: 4 }}>
                  Quanto mais você registra, mais inteligentes ficam os insights.
                </div>
              </div>
            </div>

            {/* Recent transactions */}
            <div className="card card-pad" style={{ borderRadius: 24 }}>
              <div className="card-head">
                <span className="card-title">Movimentações recentes</span>
                <Link href="/transacoes" className="more t-sm" style={{ color: "var(--indigo-600)", fontWeight: 700 }}>
                  Ver tudo
                </Link>
              </div>
              <TransactionFeed saidas={saidas ?? []} isLoading={isLoadingSaidas} />
            </div>
          </div>

          {/* "Onde foi o dinheiro" */}
          <div className="card card-pad" style={{ width: 310, flexShrink: 0, borderRadius: 24 }}>
            <div className="card-head">
              <span className="card-title">Onde foi o dinheiro</span>
            </div>
            <div className="col gap-5">
              {isLoadingSaidas
                ? [1, 2, 3].map((i) => <SkeletonCatBar key={i} />)
                : gastosPorCategoria.length === 0
                ? (
                  <div className="t-sm muted">Nenhuma saída registrada este mês.</div>
                )
                : gastosPorCategoria.map((g) => (
                  <CatBar key={g.uid} gasto={g} max={maxGasto} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
