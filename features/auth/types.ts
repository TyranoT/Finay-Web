export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface AuthUser {
  uid: string;
  nome: string;
  email: string;
  ativo: boolean;
  admin_global: boolean;
  admin_grupo: boolean;
  grupo_uid: string | null;
  plano_uid: string | null;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  usuario_uid: string;
}

export interface RegisterCredentials {
  nome: string;
  email: string;
  senha: string;
  numero_telefone?: string;
}

export interface RegisterResponse {
  uid: string;
  email: string;
  nome: string;
  numero_telefone: string | null;
  ativo: boolean;
  admin_global: boolean;
  admin_grupo: boolean;
  grupo_uid: string | null;
  plano_uid: string | null;
  quantidade_usos_ia: number;
}
