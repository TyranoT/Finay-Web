"use client";

import { useMemo } from "react";
import type { Saida } from "@/features/dashboard/types";
import type { SaidaPrevista } from "@/features/dashboard/api/previstos.api";
import { diaDoISO } from "../hooks/use-mes-resumo";

interface MonthRibbonProps {
  diaAtual: number;
  totalDias: number;
  saidas: Saida[];
  previstos: SaidaPrevista[];
}

interface DiaAtividade {
  entrada: number;
  saidaRealizada: number;
  prevista: number;
  previstaAtrasada: number;
}

const VIEW_W = 700;
const VIEW_H = 92;
const PAD_X = 16;
const BASE_Y = 46;
const STEM_MAX = 28;

function aggregateByDay(
  totalDias: number,
  saidas: Saida[],
  previstos: SaidaPrevista[],
  diaAtual: number,
): DiaAtividade[] {
  const acc: DiaAtividade[] = Array.from({ length: totalDias }, () => ({
    entrada: 0,
    saidaRealizada: 0,
    prevista: 0,
    previstaAtrasada: 0,
  }));

  for (const s of saidas) {
    const dia = diaDoISO(s.data);
    if (!dia || dia < 1 || dia > totalDias) continue;
    if (s.categoria?.opcao_entrada) acc[dia - 1].entrada += s.valor;
    else acc[dia - 1].saidaRealizada += s.valor;
  }

  for (const p of previstos) {
    if (p.status === "pago") continue;
    const dia = diaDoISO(p.data_vencimento);
    if (!dia || dia < 1 || dia > totalDias) continue;
    const valor = p.valor_atual ?? p.valor_total;
    if (dia < diaAtual) acc[dia - 1].previstaAtrasada += valor;
    else acc[dia - 1].prevista += valor;
  }

  return acc;
}

function findMaxValor(dias: DiaAtividade[]): number {
  let max = 1;
  for (const d of dias) {
    if (d.entrada > max) max = d.entrada;
    const baixoTotal = d.saidaRealizada + d.prevista + d.previstaAtrasada;
    if (baixoTotal > max) max = baixoTotal;
  }
  return max;
}

function pickDayLabels(totalDias: number, diaAtual: number): number[] {
  const candidatos = [1, 10, 20, totalDias];
  return candidatos.filter(
    (dia, idx, arr) => arr.indexOf(dia) === idx && Math.abs(dia - diaAtual) > 2,
  );
}

function xCoord(dia: number, totalDias: number): number {
  if (totalDias <= 1) return PAD_X;
  const usable = VIEW_W - PAD_X * 2;
  return PAD_X + ((dia - 1) * usable) / (totalDias - 1);
}

interface StemProps {
  x: number;
  baseY: number;
  altura: number;
  direcao: "up" | "down";
  cor: string;
  tracejado?: boolean;
}

function Stem({ x, baseY, altura, direcao, cor, tracejado }: StemProps) {
  const y1 = direcao === "up" ? baseY - 2 : baseY + 2;
  const y2 = direcao === "up" ? baseY - altura : baseY + altura;
  return (
    <line
      x1={x}
      y1={y1}
      x2={x}
      y2={y2}
      stroke={cor}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeDasharray={tracejado ? "2.5 2" : undefined}
    />
  );
}

/**
 * Fita horizontal do mês: cada coluna é um dia, com hastes verticais
 * mostrando entradas (jade, pra cima), saídas realizadas (indigo, pra baixo),
 * previstas futuras (âmbar pontilhado) e atrasados (coral). Marca o "HOJE"
 * com guia vertical sutil.
 *
 * É a peça de assinatura da Visão geral: o mês inteiro num único traço.
 */
export function MonthRibbon({
  diaAtual,
  totalDias,
  saidas,
  previstos,
}: MonthRibbonProps) {
  const dias = useMemo(
    () => aggregateByDay(totalDias, saidas, previstos, diaAtual),
    [totalDias, saidas, previstos, diaAtual],
  );
  const max = useMemo(() => findMaxValor(dias), [dias]);
  const dayLabels = useMemo(
    () => pickDayLabels(totalDias, diaAtual),
    [totalDias, diaAtual],
  );

  const xHoje = xCoord(diaAtual, totalDias);
  const scale = (valor: number) => (valor > 0 ? Math.max(3, (valor / max) * STEM_MAX) : 0);

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="fx-ribbon"
      role="img"
      aria-label={`Fita do mês com ${totalDias} dias, hoje é dia ${diaAtual}`}
    >
      <line
        x1={PAD_X}
        y1={BASE_Y}
        x2={VIEW_W - PAD_X}
        y2={BASE_Y}
        stroke="var(--line-2)"
        strokeWidth="1"
      />

      {dias.map((_, idx) => {
        const x = xCoord(idx + 1, totalDias);
        return (
          <line
            key={`bt-${idx}`}
            x1={x}
            y1={BASE_Y - 2}
            x2={x}
            y2={BASE_Y + 2}
            stroke="var(--line-2)"
            strokeWidth="1"
          />
        );
      })}

      {dias.map((d, idx) => {
        const dia = idx + 1;
        const x = xCoord(dia, totalDias);
        return (
          <g key={`stems-${dia}`}>
            {d.entrada > 0 && (
              <Stem
                x={x}
                baseY={BASE_Y}
                altura={scale(d.entrada)}
                direcao="up"
                cor="var(--jade)"
              />
            )}
            {d.saidaRealizada > 0 && (
              <Stem
                x={x}
                baseY={BASE_Y}
                altura={scale(d.saidaRealizada)}
                direcao="down"
                cor="var(--indigo)"
              />
            )}
            {d.prevista > 0 && (
              <Stem
                x={x}
                baseY={BASE_Y}
                altura={scale(d.prevista)}
                direcao="down"
                cor="var(--amber)"
                tracejado
              />
            )}
            {d.previstaAtrasada > 0 && (
              <Stem
                x={x}
                baseY={BASE_Y}
                altura={scale(d.previstaAtrasada)}
                direcao="down"
                cor="var(--coral)"
              />
            )}
          </g>
        );
      })}

      <line
        x1={xHoje}
        y1={8}
        x2={xHoje}
        y2={VIEW_H - 14}
        stroke="var(--ink)"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <text
        x={xHoje}
        y={VIEW_H - 2}
        textAnchor="middle"
        style={{
          font: "700 9px var(--mono)",
          fill: "var(--ink-2)",
          letterSpacing: "0.06em",
        }}
      >
        HOJE · {diaAtual}
      </text>

      {dayLabels.map((dia) => (
        <text
          key={`label-${dia}`}
          x={xCoord(dia, totalDias)}
          y={VIEW_H - 2}
          textAnchor="middle"
          style={{
            font: "500 9px var(--mono)",
            fill: "var(--ink-4)",
          }}
        >
          {dia}
        </text>
      ))}
    </svg>
  );
}

interface MonthRibbonLegendProps {
  hasEntradas: boolean;
  hasSaidas: boolean;
  hasPrevistos: boolean;
  hasAtrasados: boolean;
}

/** Legenda compacta abaixo do ribbon — mostra só o que existe nos dados. */
export function MonthRibbonLegend({
  hasEntradas,
  hasSaidas,
  hasPrevistos,
  hasAtrasados,
}: MonthRibbonLegendProps) {
  return (
    <div className="fx-ribbon-legend">
      {hasEntradas && (
        <span className="swatch">
          <i style={{ background: "var(--jade)" }} /> Entradas
        </span>
      )}
      {hasSaidas && (
        <span className="swatch">
          <i style={{ background: "var(--indigo)" }} /> Saídas
        </span>
      )}
      {hasPrevistos && (
        <span className="swatch">
          <i
            style={{
              background:
                "repeating-linear-gradient(90deg, var(--amber) 0 3px, transparent 3px 5px)",
            }}
          />{" "}
          Previstos
        </span>
      )}
      {hasAtrasados && (
        <span className="swatch">
          <i style={{ background: "var(--coral)" }} /> Atrasados
        </span>
      )}
    </div>
  );
}
