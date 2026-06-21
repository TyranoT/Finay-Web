export type AutorMensagem = "user" | "ai";

export interface Mensagem {
  id: string;
  autor: AutorMensagem;
  texto: string;
  pensando?: boolean;
}
