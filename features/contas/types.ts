export type TipoConta = "corrente" | "poupanca" | "cartao" | "carteira" | string;

export interface Banco {
  uid: string;
  nome: string;
  codigo?: string;
}

export interface ContaDetalhada {
  uid: string;
  nome: string;
  banco?: Banco;
  tipo?: TipoConta;
  saldo_inicial: number;
  saldo_atual?: number;
  ativo: boolean;
  limite?: number;
  fatura_atual?: number;
  dia_vencimento?: number;
  dia_fechamento?: number;
}

export function ehCartao(conta: ContaDetalhada): boolean {
  const tipo = (conta.tipo ?? "").toLowerCase();
  if (tipo.includes("cart")) return true;
  if (conta.limite !== undefined && conta.limite > 0) return true;
  return false;
}
