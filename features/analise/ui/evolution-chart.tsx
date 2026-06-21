"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MES_CURTO } from "../constants/mes_curto";
import { EvolutionChartProps, PontoEvolucaoChart, TooltipPayloadItem } from "../type";
import { EvolutionTooltip } from "../components/evolution-tooltip";


/**
 * Chart de evolução em 6 meses com barras opostas para entradas e saídas.
 */
export function EvolutionChart({ meses }: EvolutionChartProps) {
  const data = useMemo<PontoEvolucaoChart[]>(() => {
    const ultimoIdx = meses.length - 1;

    return meses.map((mes, idx) => ({
      id: `${mes.ano}-${mes.mes}`,
      rotulo: mes.rotuloCurto || MES_CURTO[mes.mes] || "",
      entradas: Math.round(mes.entradas),
      saidas: -Math.round(mes.saidas),
      saldo: Math.round(mes.saldo),
      isAtual: idx === ultimoIdx,
    }));
  }, [meses]);

  if (meses.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--ink-3)" }}>
        Sem dados suficientes para análise.
      </div>
    );
  }

  return (
    <div
      className="fx-evolution"
      role="img"
      aria-label={`Gráfico de evolução de ${meses.length} meses`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barGap={4}
          barCategoryGap="38%"
          margin={{ top: 18, right: 8, bottom: 4, left: 8 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--line)"
            strokeDasharray="3 4"
          />
          <ReferenceLine y={0} stroke="var(--line-2)" strokeWidth={1} />
          <XAxis
            dataKey="rotulo"
            axisLine={false}
            tickLine={false}
            tick={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              fontWeight: 500,
              fill: "var(--ink-4)",
            }}
          />
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Tooltip
            cursor={{ fill: "var(--indigo-50)", opacity: 0.35 }}
            content={<EvolutionTooltip />}
          />
          <Bar dataKey="entradas" radius={[6, 6, 0, 0]}>
            {data.map((ponto) => (
              <Cell
                key={`entradas-${ponto.id}`}
                fill="var(--jade)"
                opacity={ponto.isAtual ? 1 : 0.78}
              />
            ))}
          </Bar>
          <Bar dataKey="saidas" radius={[0, 0, 6, 6]}>
            {data.map((ponto) => (
              <Cell
                key={`saidas-${ponto.id}`}
                fill="var(--indigo)"
                opacity={ponto.isAtual ? 1 : 0.78}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
