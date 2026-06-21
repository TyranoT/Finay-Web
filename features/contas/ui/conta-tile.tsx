import { formatCurrency } from "@/shared/helpers/format-currency";
import type { ContaDetalhada } from "../types";

interface ContaTileProps {
  conta: ContaDetalhada;
}

const CORES_BANCO: Record<string, string> = {
  nubank: "#8A05BE",
  itau: "#EC7000",
  itaú: "#EC7000",
  bradesco: "#CC092F",
  santander: "#EC0000",
  caixa: "#0067B1",
  bb: "#FAE128",
  inter: "#FF7A00",
  c6: "#000000",
  carteira: "#7C6CF5",
};

function corDoBanco(banco?: string, nome?: string): string {
  const k = (banco ?? nome ?? "").toLowerCase();
  for (const chave of Object.keys(CORES_BANCO)) {
    if (k.includes(chave)) return CORES_BANCO[chave];
  }
  return "var(--indigo)";
}

function labelTipo(tipo: string | undefined): string {
  if (!tipo) return "Conta";
  const t = tipo.toLowerCase();
  if (t.includes("poupa")) return "Poupança";
  if (t.includes("corrente")) return "Conta corrente";
  if (t.includes("carteira")) return "Carteira";
  if (t.includes("cart")) return "Cartão";
  return tipo;
}

export function ContaTile({ conta }: ContaTileProps) {
  const cor = corDoBanco(conta.banco?.nome, conta.nome);
  const inicial =
    conta.banco?.nome?.[0]?.toUpperCase() ?? conta.nome[0]?.toUpperCase() ?? "?";
  const valor = conta.saldo_atual ?? conta.saldo_inicial;
  const ehNegativo = valor < 0;

  return (
    <div className="fx-conta-tile">
      <div className="head">
        <div className="ico" style={{ background: cor }}>
          {inicial}
        </div>
        <div>
          <div className="banco">{conta.banco?.nome ?? "Conta"}</div>
          <div className="nome">{conta.nome}</div>
        </div>
      </div>
      <div className="saldo-rot">{labelTipo(conta.tipo)}</div>
      <div className="saldo" style={{ color: ehNegativo ? "var(--coral)" : "var(--ink)" }}>
        {formatCurrency(valor)}
      </div>
    </div>
  );
}
