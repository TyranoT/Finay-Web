export interface TipoAtivo {
  uid?: string;
  nome: string;
}

export interface Ativo {
  uid: string;
  nome: string;
  valor_compra: number;
  valor_atual: number;
  data_aquisicao?: string;
  tipo?: TipoAtivo;
}
