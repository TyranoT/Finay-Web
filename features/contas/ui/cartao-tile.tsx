import { formatCurrency } from "@/shared/helpers/format-currency";
import type { ContaDetalhada } from "../types";

interface CartaoTileProps {
  conta: ContaDetalhada;
}

function statusFatura(dia: number | undefined): string {
  if (!dia) return "Cartão de crédito";
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const venc = new Date(ano, mes, dia);
  if (venc < hoje) venc.setMonth(venc.getMonth() + 1);
  const dias = Math.ceil((venc.getTime() - hoje.getTime()) / 86_400_000);
  if (dias === 0) return "Vence hoje";
  if (dias === 1) return "Vence amanhã";
  return `Vence em ${dias} dias`;
}

/**
 * Card destacado para cartão de crédito: gradiente escuro, fatura,
 * limite, barra de uso e indicação de próximo vencimento.
 */
export function CartaoTile({ conta }: CartaoTileProps) {
  const fatura = conta.fatura_atual ?? 0;
  const limite = conta.limite ?? 0;
  const usoPct = limite > 0 ? Math.min(100, (fatura / limite) * 100) : 0;

  return (
    <div className="fx-cartao-tile">
      <span className="chip">{statusFatura(conta.dia_vencimento)}</span>
      <div className="banco">{conta.banco?.nome ?? "Cartão"}</div>
      <div className="nome">{conta.nome}</div>

      <div className="grid">
        <div>
          <div className="label">Fatura atual</div>
          <div className="valor">{formatCurrency(fatura)}</div>
        </div>
        <div>
          <div className="label">Limite</div>
          <div className="valor">{formatCurrency(limite)}</div>
        </div>
      </div>

      <div className="fx-cartao-bar-wrap">
        <div className="fx-cartao-bar">
          <i style={{ width: `${usoPct}%` }} />
        </div>
        <div className="fx-cartao-bar-foot">
          <span>Limite utilizado</span>
          <strong>{usoPct.toFixed(0)}%</strong>
        </div>
      </div>
    </div>
  );
}
