/**
 * Representa um grupo (família, casa compartilhada, time) ao qual o usuário pertence.
 *
 * O backend trata Pessoal como ausência de `grupo_uid` na requisição —
 * `null` no contexto frontend significa "modo Pessoal".
 */
export interface Grupo {
  uid: string;
  nome: string;
  admin_grupo?: boolean;
}

/** Escopo ativo no app: Pessoal (null) ou um grupo específico. */
export interface EscopoAtivo {
  uid: string | null;
  nome: string;
}

export const ESCOPO_PESSOAL: EscopoAtivo = { uid: null, nome: "Pessoal" };
