export interface Conta {
  uid: string;
  nome: string;
  banco?: { nome: string };
  saldo_inicial: number;
  ativo: boolean;
}

export interface Categoria {
  uid: string;
  nome: string;
  opcao_entrada: boolean;
  opcao_saida: boolean;
  subcategorias?: Categoria[];
}

export interface Saida {
  uid: string;
  nome: string;
  valor: number;
  data: string;
  descricao?: string;
  categoria?: Categoria;
  conta?: Conta;
}

export interface SaidaCriar {
  nome: string;
  valor: number;
  data: string;
  categoria_uid: string;
  conta_uid: string;
  descricao?: string;
}

export interface SaidaEditar {
  nome?: string;
  valor?: number;
  data?: string;
  categoria_uid?: string;
  conta_uid?: string;
  descricao?: string;
}

export interface SaldoItem {
  total: number;
  moeda_uid?: string;
  moeda?: { simbolo: string; nome: string };
}

export interface SaidasListaResponse {
  saidas: Saida[];
  total: number;
  pagina: number;
  por_pagina: number;
}

export interface FiltroSaidas {
  data_inicio: string;
  data_fim: string;
  pagina?: number;
  por_pagina?: number;
  grupo_uid?: string | null;
}
