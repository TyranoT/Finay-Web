import { formatCurrency } from "@/shared/helpers/format-currency";
import { TooltipPayloadItem } from "../type";

export function EvolutionTooltip({
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
                <i style={{ background: "var(--jade)" }} />
                <span>Entradas</span>
                <strong>{formatCurrency(dados.entradas)}</strong>
            </div>
            <div className="row">
                <i style={{ background: "var(--indigo)" }} />
                <span>Saídas</span>
                <strong>{formatCurrency(Math.abs(dados.saidas))}</strong>
            </div>
            <div className="row total">
                <span>Saldo</span>
                <strong>{formatCurrency(dados.saldo)}</strong>
            </div>
        </div>
    );
}