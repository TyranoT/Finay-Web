export type Raridade = "comum" | "raro" | "epico" | "lendario";

export interface Conquista {
  uid: string;
  nome: string;
  descricao?: string;
  nivel_raridade?: Raridade | string;
  desbloqueada?: boolean;
  desbloqueada_em?: string;
  icone?: string;
}
