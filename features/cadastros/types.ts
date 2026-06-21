export interface Lugar {
  uid: string;
  nome: string;
  cidade?: string;
  estado?: string;
}

export interface Pessoa {
  uid: string;
  nome: string;
  email?: string;
  cpf_cnpj?: string;
  usuario_uid?: string;
}

export interface Item {
  uid: string;
  nome: string;
  tipo?: { nome: string };
}
