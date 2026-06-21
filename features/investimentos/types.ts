export interface TipoInvestimento {
  uid?: string;
  nome: string;
}

export interface Investimento {
  uid: string;
  nome: string;
  valor_aporte: number;
  valor_atual?: number;
  fator_rendimento?: number;
  prazo_maximo?: string;
  tipo?: TipoInvestimento;
}
