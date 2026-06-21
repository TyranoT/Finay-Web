export interface TipoLoja {
  uid?: string;
  nome: string;
}

export interface Loja {
  uid: string;
  nome: string;
  tipo?: TipoLoja;
  nota?: number;
  avaliacoes?: number;
  favorita?: boolean;
}
