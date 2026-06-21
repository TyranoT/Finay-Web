export interface MembroGrupo {
  uid: string;
  nome: string;
  email?: string;
  admin_grupo?: boolean;
  permissoes?: string[];
}

export interface GrupoDetalhado {
  uid: string;
  nome: string;
  admin_grupo?: boolean;
  criado_em?: string;
  membros?: MembroGrupo[];
}
