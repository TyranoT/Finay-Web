"use client";

import { useMemo } from "react";
import type { MesAgregado } from "../api/saidas-mes.api";

interface EvolutionChartProps {
  meses: MesAgregado[];
}

const VIEW_W = 700;
const VIEW_H = 240;
const PAD_X = 28;
const BASE_Y = 130;
const STEM_UP_MAX = 92;
const STEM_DOWN_MAX = 72;
const BAR_W = 28;

function calcEscala(meses: MesAgregado[]): number {
  let max = 1;
  for (const m of meses) {
    if (m.entradas > max) max = m.entradas;
    if (m.saidas > max) max = m.saidas;
  }
  return max;
}

function xCenter(idx: number, totalCols: number): number {
  const usable = VIEW_W - PAD_X * 2;
  const colW = usable / totalCols;
  return PAD_X + colW * idx + colW / 2;
}

interface BarProps {
  x: number;
  baseY: number;
  altura: number;
  direcao: "up" | "down";
  cor: string;
  realcado?: boolean;
}

function Bar({ x, baseY, altura, direcao, cor, realcado }: BarProps) {
  const y = direcao === "up" ? baseY - altura : baseY;
  return (
    <rect
      x={x - BAR_W / 2}
      y={y}
      width={BAR_W}
      height={altura}
      rx={6}
      fill={cor}
      opacity={realcado ? 1 : 0.78}
    />
  );
}

/**
 * Chart de evolução em 6 meses: barras opostas mostrando entradas (jade
 * para cima) e saídas (indigo para baixo). O mês corrente fica em tom
 * cheio, os anteriores em opacidade reduzida — guia o olho pro presente.
 */
export function EvolutionChart({ meses }: EvolutionChartProps) {
  const escala = useMemo(() => calcEscala(meses), [meses]);

  if (meses.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--ink-3)" }}>
        Sem dados suficientes para análise.
      </div>
    );
  }

  const ultimoIdx = meses.length - 1;
  const hValor = (v: number, direcao: "up" | "down") => {
    if (v <= 0 || escala <= 0) return 0;
    const limit = direcao === "up" ? STEM_UP_MAX : STEM_DOWN_MAX;
    return Math.max(4, (v / escala) * limit);
  };

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="fx-evolution"
      role="img"
      aria-label={`Gráfico de evolução de ${meses.length} meses`}
    >
      <line
        x1={PAD_X}
        y1={BASE_Y}
        x2={VIEW_W - PAD_X}
        y2={BASE_Y}
        stroke="var(--line-2)"
        strokeWidth="1"
      />

      {meses.map((m, idx) => {
        const x = xCenter(idx, meses.length);
        const realcado = idx === ultimoIdx;
        return (
          <g key={`${m.ano}-${m.mes}`}>
            <Bar
              x={x}
              baseY={BASE_Y}
              altura={hValor(m.entradas, "up")}
              direcao="up"
              cor="var(--jade)"
              realcado={realcado}
            />
            <Bar
              x={x}
              baseY={BASE_Y}
              altura={hValor(m.saidas, "down")}
              direcao="down"
              cor="var(--indigo)"
              realcado={realcado}
            />
            <text
              x={x}
              y={VIEW_H - 14}
              textAnchor="middle"
              style={{
                font: realcado ? "700 11px var(--mono)" : "500 11px var(--mono)",
                fill: realcado ? "var(--ink)" : "var(--ink-4)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {m.rotuloCurto}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
