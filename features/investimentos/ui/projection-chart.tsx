"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/shared/helpers/format-currency";
import type { MesProjetado } from "../hooks/use-projecao-12m";

interface ProjectionChartProps {
  projecao: MesProjetado[];
}

const MES_CURTO = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function rotuloMes(offset: number): string {
  const ref = new Date();
  const d = new Date(ref.getFullYear(), ref.getMonth() + offset, 1);
  return MES_CURTO[d.getMonth()] ?? "";
}

interface PontoChart {
  rotulo: string;
  principal: number;
  rendimento: number;
  total: number;
}

interface TooltipPayloadItem {
  payload?: PontoChart;
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const dados = payload[0]?.payload;
  if (!dados) return null;
  return (
    <div className="fx-chart-tip">
      <div className="rot">{dados.rotulo}</div>
      <div className="row">
        <i style={{ background: "var(--indigo)" }} />
        <span>Principal</span>
        <strong>{formatCurrency(dados.principal)}</strong>
      </div>
      <div className="row">
        <i style={{ background: "var(--jade)" }} />
        <span>Rendimento</span>
        <strong>{formatCurrency(dados.rendimento)}</strong>
      </div>
      <div className="row total">
        <span>Total</span>
        <strong>{formatCurrency(dados.total)}</strong>
      </div>
    </div>
  );
}

/**
 * Chart de projeção 12 meses construído com Recharts.
 *
 * Cada coluna empilha principal (indigo) embaixo e rendimento projetado
 * (jade) no topo. O último mês ganha realce — guia o olho até a projeção
 * final.
 */
export function ProjectionChart({ projecao }: ProjectionChartProps) {
  if (projecao.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "var(--ink-3)" }}>
        Sem projeção disponível.
      </div>
    );
  }

  const data: PontoChart[] = projecao.map((p, idx) => ({
    rotulo: rotuloMes(idx + 1),
    principal: Math.round(p.principal),
    rendimento: Math.round(p.rendimento),
    total: Math.round(p.total),
  }));

  const ultimoIdx = data.length - 1;

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 16, right: 8, bottom: 4, left: 8 }}>
        <CartesianGrid
          vertical={false}
          stroke="var(--line)"
          strokeDasharray="3 4"
        />
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
        <YAxis
          width={56}
          axisLine={false}
          tickLine={false}
          tick={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            fill: "var(--ink-4)",
          }}
          tickFormatter={(v: number) =>
            v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
          }
        />
        <Tooltip
          cursor={{ fill: "var(--indigo-50)", opacity: 0.4 }}
          content={<ChartTooltip />}
        />
        <Bar dataKey="principal" stackId="a" radius={[0, 0, 6, 6]}>
          {data.map((_, idx) => (
            <Cell
              key={`p-${idx}`}
              fill="var(--indigo)"
              opacity={idx === ultimoIdx ? 1 : 0.85}
            />
          ))}
        </Bar>
        <Bar dataKey="rendimento" stackId="a" radius={[6, 6, 0, 0]}>
          {data.map((_, idx) => (
            <Cell
              key={`r-${idx}`}
              fill="var(--jade)"
              opacity={idx === ultimoIdx ? 1 : 0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
