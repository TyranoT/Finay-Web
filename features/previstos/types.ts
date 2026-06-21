export type StatusPrevisto = "previsto" | "parcial" | "pago" | "atrasado";

export interface SaidaPrevista {
  uid: string;
  nome: string;
  valor_total: number;
  valor_atual?: number;
  data_vencimento: string;
  status?: StatusPrevisto | string;
  fatura?: boolean;
  categoria?: { uid?: string; nome: string };
  conta?: { uid?: string; nome: string };
}

export interface EntradaPrevista {
  uid: string;
  nome: string;
  valor_total: number;
  valor_atual?: number;
  data_vencimento: string;
  status?: StatusPrevisto | string;
  categoria?: { uid?: string; nome: string };
  conta?: { uid?: string; nome: string };
}
