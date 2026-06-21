"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/shared/helpers/format-currency";
import type {
  ComposicaoSegmento,
  PatrimonioResumo,
} from "../hooks/use-patrimonio-resumo";

interface ComposicaoDonutProps {
  resumo: PatrimonioResumo;
}

interface TooltipPayloadItem {
  payload?: ComposicaoSegmento;
}

function DonutTooltip({
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
    <div className="fx-chart-tip" style={{ minWidth: 200 }}>
      <div className="rot">{dados.rotulo}</div>
      <div className="row">
        <i style={{ background: dados.cor }} />
        <span>Valor</span>
        <strong>{formatCurrency(dados.valor)}</strong>
      </div>
      <div className="row total">
        <span>Participação</span>
        <strong>{dados.pct.toFixed(1).replace(".", ",")}%</strong>
      </div>
    </div>
  );
}

function Legenda({ segmentos }: { segmentos: ComposicaoSegmento[] }) {
  return (
    <div className="fx-donut-legend">
      {segmentos.map((s) => (
        <div key={s.rotulo} className="seg">
          <span className="swatch" style={{ background: s.cor }} />
          <span className="rot">{s.rotulo}</span>
          <span className="pct">{s.pct.toFixed(0)}%</span>
          <span className="val">{formatCurrency(s.valor)}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Bloco de composição do patrimônio: donut Recharts à esquerda com o
 * patrimônio bruto no centro, legenda detalhada à direita.
 */
export function ComposicaoDonut({ resumo }: ComposicaoDonutProps) {
  if (resumo.composicao.length === 0) {
    return (
      <div
        style={{
          padding: 28,
          textAlign: "center",
          color: "var(--ink-3)",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 18,
        }}
      >
        Cadastre bens, investimentos ou contas para ver a composição.
      </div>
    );
  }

  return (
    <div className="fx-patrim-hero">
      <div className="fx-donut-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={resumo.composicao}
              dataKey="valor"
              nameKey="rotulo"
              innerRadius="68%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
              stroke="var(--surface)"
              strokeWidth={3}
              isAnimationActive={false}
            >
              {resumo.composicao.map((s) => (
                <Cell key={s.rotulo} fill={s.cor} />
              ))}
            </Pie>
            <Tooltip content={<DonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="fx-donut-center">
          <div className="label">Patrimônio bruto</div>
          <div className="valor">{formatCurrency(resumo.patrimonioBruto)}</div>
        </div>
      </div>
      <Legenda segmentos={resumo.composicao} />
    </div>
  );
}
