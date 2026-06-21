import type { Mensagem } from "../types";

interface ChatMensagensProps {
  mensagens: Mensagem[];
  isPensando: boolean;
}

export function ChatMensagens({ mensagens, isPensando }: ChatMensagensProps) {
  return (
    <>
      {mensagens.map((msg) => (
        <div key={msg.id} className={`fx-chat-bubble ${msg.autor}`}>
          {msg.texto}
        </div>
      ))}
      {isPensando && (
        <div className="fx-chat-bubble thinking">Pensando…</div>
      )}
    </>
  );
}
