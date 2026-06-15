export interface ISetor {
  setor: string;
}

export interface ISessionValue {
  uid: string;
  nome: string;
  email: string;
  ativo: boolean;
  admin_global: boolean;
  admin_grupo: boolean;
  grupo_uid: string | null;
  plano_uid: string | null;
  setor: ISetor[];
  exp?: number;
  iat?: number;
  sub?: string;
}

export interface ISessionContext {
  session: ISessionValue | null;
  token: string;
  status: "authenticated" | "loading" | "unauthenticated";
  setor: string;
  setSessionData: (data: ISessionValue, token: string) => void;
  clearSession: () => void;
  setStatus: (status: "authenticated" | "loading" | "unauthenticated") => void;
  signIn: (accessToken: string) => void;
}
